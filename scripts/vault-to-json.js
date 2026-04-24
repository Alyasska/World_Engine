#!/usr/bin/env node
// vault-to-json.js — Phase 2B
// Parse vault Markdown YAML frontmatter → web/data/generated/*.json
//
// Usage:  node scripts/vault-to-json.js
// Output: web/data/generated/{places,characters,events,stories}.json
//
// No external dependencies. Built-in YAML parser handles the specific patterns
// used in this vault (see AD-010 in docs/ARCHITECTURE_DECISIONS.md).
//
// Limitations of the built-in parser:
//   - No multi-line block scalars (| or >)
//   - No inline flow tables ({key: value} syntax)
//   - No YAML anchors or aliases
//   - Inline comments stripped from unquoted values only
// These patterns are not used in this vault.

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const VAULT_ROOT = path.join(ROOT, 'vault');
const OUTPUT_DIR = path.join(ROOT, 'web', 'data', 'generated');

// ─── Source folders ────────────────────────────────────────────────────────────

const SOURCES = [
  { folder: 'Places',     type: 'place',     output: 'places.json'     },
  { folder: 'Characters', type: 'character', output: 'characters.json' },
  { folder: 'Events',     type: 'event',     output: 'events.json'     },
  { folder: 'Stories',    type: 'story',     output: 'stories.json'    },
];

// ─── Web-facing fields per type ────────────────────────────────────────────────
// Defined by docs/OBSIDIAN_DATA_CONTRACT.md.
// All other frontmatter fields are vault-only and dropped from output.

const WEB_FIELDS = {
  place: [
    'id', 'type', 'title', 'aliases', 'canonState',
    'placeType', 'region', 'faction', 'layer', 'description',
    'linkedCharacters', 'linkedEvents', 'linkedStories',
    // mapRef handled separately — cellId stripped, only x/y emitted
  ],
  character: [
    'id', 'type', 'title', 'aliases', 'canonState',
    'role', 'faction', 'species', 'birthPlace', 'currentPlace',
    'traits', 'arc', 'description',
    'linkedPlaces', 'linkedEvents', 'linkedStories',
  ],
  event: [
    'id', 'type', 'title', 'aliases', 'canonState',
    'era', 'date', 'chronoPosition',
    'eventType', 'scale', 'primaryPlace', 'linkedPlaces',
    'participants', 'description', 'consequences',
    'linkedStories', 'linkedEvents',
  ],
  story: [
    'id', 'type', 'title', 'aliases', 'canonState',
    'era', 'date', 'chronoPosition',
    'primaryPlace', 'linkedPlaces',
    'protagonists', 'participants',
    'logline', 'description',
    'linkedEvents', 'linkedCharacters', 'tags',
  ],
};

// ─── Minimal YAML frontmatter parser ──────────────────────────────────────────

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

    // Blank or comment-only line
    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }

    // Top-level key (no leading whitespace)
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:(.*)/);
    if (!m) { i++; continue; }

    const key  = m[1];
    const rest = safeStripComment(m[2]).trim();

    if (rest === '') {
      // Block value — scan ahead for array items or nested key:value pairs
      i++;
      const arrItems = [];
      const objMap   = {};
      let isArr = false;
      let isObj = false;

      while (i < lines.length) {
        const child = lines[i];

        // Non-indented non-empty line means we're back at top level
        if (child.trim() !== '' && !/^\s/.test(child)) break;

        // Blank or comment inside block
        if (!child.trim() || child.trim().startsWith('#')) { i++; continue; }

        if (/^\s+-/.test(child)) {
          // Array item: "  - value"
          isArr = true;
          arrItems.push(child.replace(/^\s+-\s*/, '').trim());
          i++;
        } else {
          // Nested key: "  subkey: value"
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

      if (isArr)       result[key] = arrItems;
      else if (isObj)  result[key] = objMap;
      else             result[key] = null;

    } else {
      result[key] = parseScalar(rest);
      i++;
    }
  }

  return result;
}

// Strip trailing inline comment from unquoted values only.
// Quoted strings (starting with " or ') are left untouched.
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

// ─── Field extraction ──────────────────────────────────────────────────────────

function extractWebFields(fm, type) {
  const fields = WEB_FIELDS[type] || [];
  const out = {};

  for (const f of fields) {
    out[f] = (f in fm) ? fm[f] : null;
  }

  // Places only: emit mapRef with x/y, drop cellId
  if (type === 'place') {
    const mr = fm.mapRef || {};
    out.mapRef = {
      x: typeof mr.x === 'number' ? mr.x : 0,
      y: typeof mr.y === 'number' ? mr.y : 0,
    };
  }

  return out;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function processFolder(folderName, type) {
  const dir = path.join(VAULT_ROOT, folderName);

  if (!fs.existsSync(dir)) {
    console.warn(`  [skip] vault/${folderName}/ not found`);
    return [];
  }

  const files   = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const entries = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const fm      = parseFrontmatter(content);

    if (!fm) {
      console.warn(`  [skip] ${file}: no YAML frontmatter found`);
      continue;
    }
    if (!fm.id) {
      console.warn(`  [skip] ${file}: missing required field 'id'`);
      continue;
    }
    if (fm.canonState === 'retired') {
      console.log(`  [skip] ${fm.id}: canonState=retired`);
      continue;
    }

    entries.push(extractWebFields(fm, type));
    console.log(`  [ok]   ${fm.id}`);
  }

  return entries;
}

function run() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`vault-to-json.js — Phase 2B`);
  console.log(`Output: web/data/generated/\n`);

  for (const { folder, type, output } of SOURCES) {
    console.log(`${folder}:`);
    const entries = processFolder(folder, type);
    const outPath = path.join(OUTPUT_DIR, output);
    fs.writeFileSync(outPath, JSON.stringify(entries, null, 2) + '\n', 'utf8');
    console.log(`  → ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'} → web/data/generated/${output}\n`);
  }

  console.log('Done. Review web/data/generated/ before promoting to web/data/.');
}

run();
