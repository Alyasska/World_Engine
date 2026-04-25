#!/usr/bin/env node
// validate-vault.js — Phase 4B
// Validates vault Markdown YAML frontmatter before publishing.
// Mirrors the parser in vault-to-json.js (same frontmatter parsing logic, AD-010).
// See docs/ARCHITECTURE_DECISIONS.md AD-015 for design rationale.
//
// Usage:  node scripts/validate-vault.js
// Exit 0: all checks pass
// Exit 1: one or more errors found

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const VAULT_ROOT = path.join(ROOT, 'vault');

const SOURCES = [
  { folder: 'Places',     type: 'place'     },
  { folder: 'Characters', type: 'character' },
  { folder: 'Events',     type: 'event'     },
  { folder: 'Stories',    type: 'story'     },
];

const VALID_TYPES        = new Set(['place', 'character', 'event', 'story']);
const VALID_CANON_STATES = new Set(['canon', 'draft', 'alt', 'legend', 'retired']);
const VALID_ERAS         = new Set(['age-founding', 'long-wars', 'post-collapse']);

const ID_PREFIX = {
  place:     'place-',
  character: 'char-',
  event:     'event-',
  story:     'story-',
};

const XREF_FIELDS = ['linkedPlaces', 'linkedCharacters', 'linkedEvents', 'linkedStories'];

// ─── Frontmatter parser (mirrors vault-to-json.js exactly) ────────────────────

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) return null;
  const end = content.indexOf('\n---', 4);
  if (end === -1) return null;
  return parseSimpleYaml(content.slice(4, end));
}

function parseSimpleYaml(text) {
  const lines = text.split('\n');
  const result = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }

    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:(.*)/);
    if (!m) { i++; continue; }

    const key  = m[1];
    const rest = safeStripComment(m[2]).trim();

    if (rest === '') {
      i++;
      const arrItems = [];
      const objMap   = {};
      let isArr = false;
      let isObj = false;

      while (i < lines.length) {
        const child = lines[i];
        if (child.trim() !== '' && !/^\s/.test(child)) break;
        if (!child.trim() || child.trim().startsWith('#')) { i++; continue; }

        if (/^\s+-/.test(child)) {
          isArr = true;
          arrItems.push(child.replace(/^\s+-\s*/, '').trim());
          i++;
        } else {
          const cm = child.match(/^\s+([A-Za-z_][A-Za-z0-9_]*)\s*:(.*)/);
          if (cm) {
            isObj = true;
            objMap[cm[1]] = parseScalar(safeStripComment(cm[2]).trim());
            i++;
          } else {
            break;
          }
        }
      }

      if (isArr)      result[key] = arrItems;
      else if (isObj) result[key] = objMap;
      else            result[key] = null;
    } else {
      result[key] = parseScalar(rest);
      i++;
    }
  }

  return result;
}

function safeStripComment(str) {
  if (/^\s*["']/.test(str)) return str;
  const idx = str.search(/\s{2,}#/);
  return idx >= 0 ? str.slice(0, idx) : str;
}

function parseScalar(s) {
  if (s === '' || s === 'null' || s === '~') return null;
  if (s === 'true')  return true;
  if (s === 'false') return false;
  if (s === '[]')    return [];
  if (s === '{}')    return {};
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if ((s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  return s;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function run() {
  let errors = 0;
  const err = (relPath, msg) => { console.error(`${relPath}: ${msg}`); errors++; };

  // Pass 1 — collect all entities; skip template files (leading underscore)
  const entities = [];
  for (const { folder, type } of SOURCES) {
    const dir = path.join(VAULT_ROOT, folder);
    if (!fs.existsSync(dir)) {
      console.warn(`[warn] vault/${folder}/ not found — skipping`);
      continue;
    }
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && !f.startsWith('_'));
    for (const file of files) {
      const absPath = path.join(dir, file);
      const relPath = path.relative(ROOT, absPath).replace(/\\/g, '/');
      const content = fs.readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n');
      const fm      = parseFrontmatter(content);
      if (!fm) {
        err(relPath, 'no YAML frontmatter found');
        continue;
      }
      entities.push({ relPath, expectedType: type, fm });
    }
  }

  // Pass 2 — per-entity structural checks; build ID registry
  const idRegistry = new Map(); // id → relPath

  for (const { relPath, expectedType, fm } of entities) {
    // 1. Required fields
    for (const f of ['id', 'type', 'title', 'canonState']) {
      if (!fm[f]) err(relPath, `missing required field '${f}'`);
    }

    // No id means we cannot safely run the remaining checks
    if (!fm.id) continue;

    // 2. Duplicate IDs
    if (idRegistry.has(fm.id)) {
      err(relPath, `duplicate id '${fm.id}' (first seen at ${idRegistry.get(fm.id)})`);
    } else {
      idRegistry.set(fm.id, relPath);
    }

    // 3. Valid type
    if (fm.type && !VALID_TYPES.has(fm.type)) {
      err(relPath, `invalid type '${fm.type}' — must be one of: ${[...VALID_TYPES].join(', ')}`);
    }

    // 4. ID prefix matches folder type
    if (!fm.id.startsWith(ID_PREFIX[expectedType])) {
      err(relPath, `id '${fm.id}' must start with '${ID_PREFIX[expectedType]}' for folder '${expectedType}'`);
    }

    // 5. Declared type matches folder
    if (fm.type && fm.type !== expectedType) {
      err(relPath, `declared type '${fm.type}' does not match folder (expected '${expectedType}')`);
    }

    // 7. Event era — required and must be a known value
    if (expectedType === 'event') {
      if (!fm.era) {
        err(relPath, `event missing required field 'era'`);
      } else if (!VALID_ERAS.has(fm.era)) {
        err(relPath, `invalid era '${fm.era}' — must be one of: ${[...VALID_ERAS].join(', ')}`);
      }
    }

    // 8. canonState value
    if (fm.canonState && !VALID_CANON_STATES.has(fm.canonState)) {
      err(relPath, `invalid canonState '${fm.canonState}' — must be one of: ${[...VALID_CANON_STATES].join(', ')}`);
    }
  }

  // Pass 3 — cross-reference integrity (full ID registry is now available)
  for (const { relPath, fm } of entities) {
    for (const field of XREF_FIELDS) {
      const refs = fm[field];
      if (!Array.isArray(refs) || refs.length === 0) continue;
      for (const ref of refs) {
        if (!idRegistry.has(ref)) {
          err(relPath, `${field} references unknown id '${ref}'`);
        }
      }
    }
  }

  // Result
  if (errors === 0) {
    console.log(`validate-vault.js: all checks passed (${entities.length} entities)`);
    process.exit(0);
  } else {
    console.error(`\nvalidate-vault.js: ${errors} error${errors === 1 ? '' : 's'} found — fix before publishing`);
    process.exit(1);
  }
}

run();
