'use strict';

// ═══════════════════════════════════════════════════════════
// WORLD ENGINE — Phase 2 Interactive Engine
// Vanilla JS only. No external dependencies.
// Data loaded from web/data/generated/ (vault-to-json.js output).
// Works on GitHub Pages (/World_Engine/) and local server.
// Local file:// won't work due to fetch() — use VS Code Live Server.
// ═══════════════════════════════════════════════════════════

const ZOOM_MIN = 0.35;
const ZOOM_MAX = 4.5;

const state = {
  zoom: 1,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  panStartX: 0,
  panStartY: 0,
  activeLayers: new Set(['geography', 'political', 'narrative']),
  selectedId: null,
  detailMode: null,   // 'place' | 'event' | 'character' | 'story' | null
  activeEra: 'long-wars',
  data: { places: [], characters: [], events: [], stories: [] }
};

// ── DOM refs (set after DOMContentLoaded) ─────────────────
let mapViewport, mapCanvas, markersGroup, panelWelcome, panelDetail;
let chronoTrack, eraDisplay;

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
async function init() {
  mapViewport  = document.getElementById('mapViewport');
  mapCanvas    = document.getElementById('mapCanvas');
  markersGroup = document.getElementById('markersGroup');
  panelWelcome = document.getElementById('panelWelcome');
  panelDetail  = document.getElementById('panelDetail');
  chronoTrack  = document.getElementById('chronoTrack');
  eraDisplay   = document.getElementById('eraDisplay');

  await loadData();
  centerMap();
  renderMarkers();
  renderChronology();
  setupPanZoom();
  setupLayerToggles();
  setupZoomButtons();
  setupChronoEvents();
}

// ══════════════════════════════════════════════════════════
// DATA LOADING
// ══════════════════════════════════════════════════════════
async function loadData() {
  try {
    const [places, characters, events, stories] = await Promise.all([
      fetch('./data/generated/places.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch('./data/generated/characters.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch('./data/generated/events.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch('./data/generated/stories.json').then(r => { if (!r.ok) throw r; return r.json(); })
    ]);
    state.data = { places, characters, events, stories };
    document.getElementById('dataStatus').textContent = `${places.length} places · ${characters.length} characters · ${events.length} events · ${stories.length} stories · vault-generated`;
  } catch (err) {
    console.warn('[engine] Data fetch failed. Run via a local server (VS Code Live Server recommended).', err);
    document.getElementById('dataStatus').textContent = 'Data load failed — open via local server';
    document.getElementById('dataStatus').style.color = '#e07070';
  }
}

// ══════════════════════════════════════════════════════════
// PAN & ZOOM
// ══════════════════════════════════════════════════════════
function applyTransform() {
  mapCanvas.style.transform =
    `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
}

function centerMap() {
  const vp = mapViewport.getBoundingClientRect();
  // SVG canvas size: 1000 x 620
  state.panX = Math.round((vp.width  - 1000) / 2);
  state.panY = Math.round((vp.height - 620)  / 2);
  state.zoom = 1;
  applyTransform();
}

function zoomAt(clientX, clientY, newZoom) {
  const rect = mapViewport.getBoundingClientRect();
  const mx = clientX - rect.left;
  const my = clientY - rect.top;
  const ratio = newZoom / state.zoom;
  state.panX = mx - ratio * (mx - state.panX);
  state.panY = my - ratio * (my - state.panY);
  state.zoom = newZoom;
  applyTransform();
}

function setupPanZoom() {
  mapViewport.style.cursor = 'grab';

  // Mouse drag
  mapViewport.addEventListener('mousedown', e => {
    if (e.target.closest('[data-place-id]')) return;
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    state.panStartX  = state.panX;
    state.panStartY  = state.panY;
    mapViewport.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!state.isDragging) return;
    state.panX = state.panStartX + (e.clientX - state.dragStartX);
    state.panY = state.panStartY + (e.clientY - state.dragStartY);
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (!state.isDragging) return;
    state.isDragging = false;
    mapViewport.style.cursor = 'grab';
  });

  // Scroll zoom (towards cursor)
  mapViewport.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.14 : 0.88;
    const next   = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, state.zoom * factor));
    zoomAt(e.clientX, e.clientY, next);
  }, { passive: false });

  // Touch pan (single finger)
  let lastTouchX = 0, lastTouchY = 0;
  mapViewport.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
    }
  }, { passive: true });

  mapViewport.addEventListener('touchmove', e => {
    if (e.touches.length === 1) {
      state.panX += e.touches[0].clientX - lastTouchX;
      state.panY += e.touches[0].clientY - lastTouchY;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
      applyTransform();
    }
    e.preventDefault();
  }, { passive: false });
}

function setupZoomButtons() {
  document.getElementById('btnZoomIn').addEventListener('click', () => {
    const cx = mapViewport.getBoundingClientRect().width  / 2;
    const cy = mapViewport.getBoundingClientRect().height / 2;
    zoomAt(cx + mapViewport.getBoundingClientRect().left,
           cy + mapViewport.getBoundingClientRect().top,
           Math.min(ZOOM_MAX, state.zoom * 1.3));
  });

  document.getElementById('btnZoomOut').addEventListener('click', () => {
    const cx = mapViewport.getBoundingClientRect().width  / 2;
    const cy = mapViewport.getBoundingClientRect().height / 2;
    zoomAt(cx + mapViewport.getBoundingClientRect().left,
           cy + mapViewport.getBoundingClientRect().top,
           Math.max(ZOOM_MIN, state.zoom * 0.77));
  });

  document.getElementById('btnReset').addEventListener('click', () => {
    centerMap();
    clearDetail();
  });
}

// ══════════════════════════════════════════════════════════
// LAYER TOGGLES
// ══════════════════════════════════════════════════════════
function setupLayerToggles() {
  document.querySelectorAll('[data-layer]').forEach(btn => {
    const layer = btn.dataset.layer;

    // Chronology toggle controls the bar visibility
    if (layer === 'chronology') {
      btn.addEventListener('click', () => {
        const bar = document.getElementById('chronoBar');
        const on  = bar.classList.toggle('layer-hidden');
        btn.classList.toggle('active', !on);
        btn.setAttribute('aria-pressed', String(!on));
      });
      return;
    }

    btn.addEventListener('click', () => {
      const isActive = state.activeLayers.has(layer);
      if (isActive) {
        state.activeLayers.delete(layer);
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state.activeLayers.add(layer);
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      }

      // Toggle SVG groups
      document.querySelectorAll(`.svg-layer-${layer}`).forEach(g => {
        g.classList.toggle('layer-hidden', !state.activeLayers.has(layer));
      });

      // Also filter visible markers
      updateMarkerVisibility();
    });
  });
}

function updateMarkerVisibility() {
  document.querySelectorAll('[data-place-id]').forEach(el => {
    const layer = el.dataset.markerLayer;
    const visible = !layer || state.activeLayers.has(layer);
    el.classList.toggle('layer-hidden', !visible);
  });
}

// ══════════════════════════════════════════════════════════
// PLACE MARKERS
// ══════════════════════════════════════════════════════════
const PLACE_TYPE_ICON = {
  city:     { shape: 'circle', r: 7, ring: true  },
  fortress: { shape: 'diamond',        ring: false },
  town:     { shape: 'circle', r: 5, ring: false },
  ruins:    { shape: 'ruins',          ring: false },
  village:  { shape: 'circle', r: 3, ring: false },
  landmark: { shape: 'circle', r: 4, ring: false }
};

const FACTION_COLORS = {
  'northern-reach': '#6a9ac8',
  'the-compact':    '#c8a044',
  'free-coast':     '#6aaa88',
  'null':           '#7a7870'
};

// ── Phase 3E: local authoring links (?author=1 mode only) ─────────────────
const VAULT_ROOT = 'C:/mirror/мое/world_engine';

const ENTITY_VAULT_DIR    = { place: 'Places', character: 'Characters', event: 'Events', story: 'Stories' };
const ENTITY_ID_PREFIX    = { place: 'place-', character: 'char-',      event: 'event-', story: 'story-'  };

function isAuthorMode() {
  return new URLSearchParams(window.location.search).get('author') === '1';
}

// Returns an <a> tag pointing to the vault .md file in VS Code, or '' in public mode.
function authoringLinkHTML(entity) {
  if (!isAuthorMode()) return '';
  const folder = ENTITY_VAULT_DIR[entity.type];
  const prefix = ENTITY_ID_PREFIX[entity.type];
  if (!folder || !prefix) return '';
  const slug    = entity.id.startsWith(prefix) ? entity.id.slice(prefix.length) : entity.id;
  const relPath = `vault/${folder}/${slug}.md`;
  const uri     = `vscode://file/${encodeURI(VAULT_ROOT + '/' + relPath)}`;
  return `<a class="author-link" href="${uri}" title="${relPath}">Open in VS Code</a>`;
}
// ──────────────────────────────────────────────────────────────────────────

function markerColor(place) {
  if (!state.activeLayers.has('political') || !place.faction) return '#c8a96e';
  return FACTION_COLORS[place.faction] || '#c8a96e';
}

function renderMarkers() {
  markersGroup.innerHTML = '';
  state.data.places.forEach(place => {
    const { x, y } = place.mapRef;
    const icon = PLACE_TYPE_ICON[place.placeType] || PLACE_TYPE_ICON.village;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('data-place-id',     place.id);
    g.setAttribute('data-marker-layer', place.layer);
    g.setAttribute('class', `place-marker marker-${place.placeType}`);
    g.setAttribute('transform', `translate(${x},${y})`);
    g.style.cursor = 'pointer';

    const color = markerColor(place);

    if (icon.shape === 'circle') {
      if (icon.ring) {
        // Outer ring
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('r', String(icon.r + 4));
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', color);
        ring.setAttribute('stroke-width', '1.5');
        ring.setAttribute('opacity', '0.4');
        g.appendChild(ring);
      }
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', String(icon.r));
      dot.setAttribute('fill', color);
      dot.setAttribute('stroke', '#0d0e12');
      dot.setAttribute('stroke-width', '1');
      g.appendChild(dot);

    } else if (icon.shape === 'diamond') {
      const d = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      d.setAttribute('points', '0,-7 5,0 0,7 -5,0');
      d.setAttribute('fill', color);
      d.setAttribute('stroke', '#0d0e12');
      d.setAttribute('stroke-width', '1');
      g.appendChild(d);

    } else if (icon.shape === 'ruins') {
      // Broken X for ruins
      ['M -5,-5 L 5,5', 'M 5,-5 L -5,5'].forEach(dStr => {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        l.setAttribute('d', dStr);
        l.setAttribute('stroke', '#9a7a5a');
        l.setAttribute('stroke-width', '2');
        l.setAttribute('stroke-linecap', 'round');
        g.appendChild(l);
      });
      const rc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      rc.setAttribute('r', '3');
      rc.setAttribute('fill', 'none');
      rc.setAttribute('stroke', '#9a7a5a');
      rc.setAttribute('stroke-width', '1.5');
      rc.setAttribute('stroke-dasharray', '2,2');
      g.appendChild(rc);
    }

    // Invisible hit area (easier to click small markers)
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('r', '14');
    hit.setAttribute('fill', 'transparent');
    g.appendChild(hit);

    // Label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'marker-label');
    const labelY = (icon.ring ? 20 : 16);
    label.setAttribute('y', String(labelY));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', '#c8b898');
    label.setAttribute('font-size', place.placeType === 'city' ? '11' : '9.5');
    label.setAttribute('font-family', 'Georgia, serif');
    label.setAttribute('pointer-events', 'none');
    label.textContent = place.title;
    g.appendChild(label);

    g.addEventListener('click', e => {
      e.stopPropagation();
      showPlaceDetail(place.id);
    });

    // Tooltip on hover
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${place.title} (${place.placeType})`;
    g.appendChild(title);

    markersGroup.appendChild(g);
  });

  // Click on map background clears selection
  document.getElementById('worldSvg').addEventListener('click', e => {
    if (!e.target.closest('[data-place-id]')) clearDetail();
  });

  updateMarkerVisibility();
}

function updateMarkerSelection(id) {
  document.querySelectorAll('.place-marker').forEach(m => {
    m.classList.toggle('marker-selected', m.dataset.placeId === id);
  });
}

// ══════════════════════════════════════════════════════════
// DETAIL PANEL
// ══════════════════════════════════════════════════════════
function showPlaceDetail(placeId) {
  const place = state.data.places.find(p => p.id === placeId);
  if (!place) return;

  state.selectedId  = placeId;
  state.detailMode  = 'place';
  updateMarkerSelection(placeId);

  const linkedChars    = place.linkedCharacters
    ? state.data.characters.filter(c => place.linkedCharacters.includes(c.id))
    : [];
  const linkedEvts     = place.linkedEvents
    ? state.data.events.filter(e => place.linkedEvents.includes(e.id))
    : [];
  const linkedStories  = place.linkedStories
    ? state.data.stories.filter(s => place.linkedStories.includes(s.id))
    : [];

  const canonBadge = canonBadgeHTML(place.canonState);
  const factionLabel = place.faction
    ? `<span class="detail-faction" style="color:${FACTION_COLORS[place.faction]}">${factionName(place.faction)}</span>`
    : '<span class="detail-faction muted">Independent</span>';

  const eraText = place.chronology
    ? `<p class="detail-era">${place.chronology.status || ''} · ${place.chronology.founded || ''}</p>`
    : '';

  panelDetail.innerHTML = `
    <div class="detail-header">
      <h2 class="detail-title">${place.title}</h2>
      <div class="detail-meta">
        <span class="detail-type-badge badge-${place.placeType}">${placeTypeLabel(place.placeType)}</span>
        ${canonBadge}
      </div>
      ${factionLabel}
      ${eraText}
      ${authoringLinkHTML(place)}
    </div>
    <p class="detail-description">${place.description}</p>

    ${linkedChars.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Characters</h3>
      <ul class="detail-link-list">
        ${linkedChars.map(c => `
          <li class="detail-link-item" data-char-id="${c.id}">
            <span class="link-icon">👤</span>
            <span class="link-name">${c.title}</span>
            <span class="link-sub">${c.role}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedEvts.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Events</h3>
      <ul class="detail-link-list">
        ${linkedEvts.map(ev => `
          <li class="detail-link-item${ev.era === state.activeEra ? ' era-current' : ''}" data-event-id="${ev.id}">
            <span class="link-icon">⚡</span>
            <span class="link-name">${ev.title}</span>
            <span class="link-sub">${ev.date}</span>
            ${ev.era === state.activeEra ? '<span class="era-badge-active">now</span>' : ''}
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedStories.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Stories</h3>
      <ul class="detail-link-list">
        ${linkedStories.map(s => `
          <li class="detail-link-item" data-story-id="${s.id}">
            <span class="link-icon">📖</span>
            <span class="link-name">${s.title}</span>
            <span class="link-sub muted">${s.logline}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${place.aliases?.length ? `
    <div class="detail-section detail-aliases">
      <span class="muted">Also known as: </span>${place.aliases.join(' · ')}
    </div>` : ''}
  `;

  panelWelcome.hidden = true;
  panelDetail.hidden  = false;

  // Wire linked item clicks
  panelDetail.querySelectorAll('[data-event-id]').forEach(el => {
    el.addEventListener('click', () => showEventDetail(el.dataset.eventId));
  });
  panelDetail.querySelectorAll('[data-char-id]').forEach(el => {
    el.addEventListener('click', () => showCharacterDetail(el.dataset.charId));
  });
  panelDetail.querySelectorAll('[data-story-id]').forEach(el => {
    el.addEventListener('click', () => showStoryDetail(el.dataset.storyId));
  });
}

function showEventDetail(eventId) {
  const ev = state.data.events.find(e => e.id === eventId);
  if (!ev) return;
  state.detailMode = 'event';

  const linkedPlaces = ev.linkedPlaces
    ? state.data.places.filter(p => ev.linkedPlaces.includes(p.id))
    : [];
  const linkedChars  = ev.participants
    ? state.data.characters.filter(c => ev.participants.includes(c.id))
    : [];
  const linkedStories = ev.linkedStories
    ? state.data.stories.filter(s => ev.linkedStories.includes(s.id))
    : [];

  const canonBadge = canonBadgeHTML(ev.canonState);

  panelDetail.innerHTML = `
    <button class="detail-back" id="detailBack">← Back to place</button>
    <div class="detail-header">
      <h2 class="detail-title">${ev.title}</h2>
      <div class="detail-meta">
        <span class="detail-type-badge badge-event">${ev.eventType}</span>
        ${canonBadge}
      </div>
      <p class="detail-era">${ev.date} · ${eraLabel(ev.era)}</p>
      ${authoringLinkHTML(ev)}
    </div>
    <p class="detail-description">${ev.description}</p>

    ${ev.consequences?.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Consequences</h3>
      <ul class="detail-consequences">
        ${ev.consequences.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedChars.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Participants</h3>
      <ul class="detail-link-list">
        ${linkedChars.map(c => `
          <li class="detail-link-item" data-char-id="${c.id}">
            <span class="link-icon">👤</span>
            <span class="link-name">${c.title}</span>
            <span class="link-sub">${c.role}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedPlaces.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Locations</h3>
      <ul class="detail-link-list">
        ${linkedPlaces.map(p => `
          <li class="detail-link-item" data-place-id="${p.id}">
            <span class="link-icon">📍</span>
            <span class="link-name">${p.title}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedStories.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Stories</h3>
      <ul class="detail-link-list">
        ${linkedStories.map(s => `
          <li class="detail-link-item" data-story-id="${s.id}">
            <span class="link-icon">📖</span>
            <span class="link-name">${s.title}</span>
            <span class="link-sub muted">${s.logline || ''}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}
  `;

  document.getElementById('detailBack')?.addEventListener('click', () => {
    if (state.selectedId) showPlaceDetail(state.selectedId);
    else clearDetail();
  });

  panelDetail.querySelectorAll('[data-place-id]').forEach(el => {
    el.addEventListener('click', () => showPlaceDetail(el.dataset.placeId));
  });
  panelDetail.querySelectorAll('[data-char-id]').forEach(el => {
    el.addEventListener('click', () => showCharacterDetail(el.dataset.charId));
  });
  panelDetail.querySelectorAll('[data-story-id]').forEach(el => {
    el.addEventListener('click', () => showStoryDetail(el.dataset.storyId));
  });

  panelDetail.hidden  = false;
  panelWelcome.hidden = true;
}

function clearDetail() {
  state.selectedId  = null;
  state.detailMode  = null;
  updateMarkerSelection(null);
  panelDetail.hidden  = true;
  panelWelcome.hidden = false;
}

function showCharacterDetail(charId) {
  const char = state.data.characters.find(c => c.id === charId);
  if (!char) return;
  state.detailMode = 'character';
  // state.selectedId stays set so back button returns to the linked place

  const linkedPlaces = char.linkedPlaces
    ? state.data.places.filter(p => char.linkedPlaces.includes(p.id))
    : [];
  const linkedEvents = char.linkedEvents
    ? state.data.events.filter(e => char.linkedEvents.includes(e.id))
    : [];
  const linkedStories = char.linkedStories
    ? state.data.stories.filter(s => char.linkedStories.includes(s.id))
    : [];

  const canonBadge = canonBadgeHTML(char.canonState);
  const factionLabel = char.faction
    ? `<span class="detail-faction" style="color:${FACTION_COLORS[char.faction]}">${factionName(char.faction)}</span>`
    : '';

  panelDetail.innerHTML = `
    <button class="detail-back" id="detailBack">${state.selectedId ? '← Back to place' : '← Back'}</button>
    <div class="detail-header">
      <h2 class="detail-title">${char.title}</h2>
      <div class="detail-meta">
        <span class="detail-type-badge badge-character">${char.role || 'character'}</span>
        ${canonBadge}
      </div>
      ${factionLabel}
      ${authoringLinkHTML(char)}
    </div>
    ${char.description ? `<p class="detail-description">${char.description}</p>` : ''}

    ${char.traits?.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Traits</h3>
      <p class="detail-description muted">${char.traits.join(' · ')}</p>
    </div>` : ''}

    ${char.arc ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Arc</h3>
      <p class="detail-description">${char.arc}</p>
    </div>` : ''}

    ${linkedPlaces.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Places</h3>
      <ul class="detail-link-list">
        ${linkedPlaces.map(p => `
          <li class="detail-link-item" data-place-id="${p.id}">
            <span class="link-icon">📍</span>
            <span class="link-name">${p.title}</span>
            <span class="link-sub">${placeTypeLabel(p.placeType)}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedEvents.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Events</h3>
      <ul class="detail-link-list">
        ${linkedEvents.map(ev => `
          <li class="detail-link-item" data-event-id="${ev.id}">
            <span class="link-icon">⚡</span>
            <span class="link-name">${ev.title}</span>
            <span class="link-sub">${ev.date}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedStories.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Stories</h3>
      <ul class="detail-link-list">
        ${linkedStories.map(s => `
          <li class="detail-link-item" data-story-id="${s.id}">
            <span class="link-icon">📖</span>
            <span class="link-name">${s.title}</span>
            <span class="link-sub muted">${s.logline || ''}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${char.aliases?.length ? `
    <div class="detail-section detail-aliases">
      <span class="muted">Also known as: </span>${char.aliases.join(' · ')}
    </div>` : ''}
  `;

  panelDetail.hidden  = false;
  panelWelcome.hidden = true;
  panelDetail.scrollTop = 0;

  document.getElementById('detailBack')?.addEventListener('click', () => {
    if (state.selectedId) showPlaceDetail(state.selectedId);
    else clearDetail();
  });
  panelDetail.querySelectorAll('[data-place-id]').forEach(el => {
    el.addEventListener('click', () => showPlaceDetail(el.dataset.placeId));
  });
  panelDetail.querySelectorAll('[data-event-id]').forEach(el => {
    el.addEventListener('click', () => showEventDetail(el.dataset.eventId));
  });
  panelDetail.querySelectorAll('[data-story-id]').forEach(el => {
    el.addEventListener('click', () => showStoryDetail(el.dataset.storyId));
  });
}

function showStoryDetail(storyId) {
  const story = state.data.stories.find(s => s.id === storyId);
  if (!story) return;
  state.detailMode = 'story';

  const linkedPlaces = story.linkedPlaces
    ? state.data.places.filter(p => story.linkedPlaces.includes(p.id))
    : [];
  const linkedEvents = story.linkedEvents
    ? state.data.events.filter(e => story.linkedEvents.includes(e.id))
    : [];
  const linkedChars = story.linkedCharacters
    ? state.data.characters.filter(c => story.linkedCharacters.includes(c.id))
    : [];

  const canonBadge = canonBadgeHTML(story.canonState);

  panelDetail.innerHTML = `
    <button class="detail-back" id="detailBack">${state.selectedId ? '← Back to place' : '← Back'}</button>
    <div class="detail-header">
      <h2 class="detail-title">${story.title}</h2>
      <div class="detail-meta">
        <span class="detail-type-badge badge-story">${eraLabel(story.era)}</span>
        ${canonBadge}
      </div>
      ${story.date ? `<p class="detail-era">${story.date}</p>` : ''}
      ${authoringLinkHTML(story)}
    </div>
    ${story.logline ? `<p class="detail-description" style="font-style:italic">${story.logline}</p>` : ''}
    ${story.description ? `<p class="detail-description">${story.description}</p>` : ''}

    ${linkedPlaces.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Places</h3>
      <ul class="detail-link-list">
        ${linkedPlaces.map(p => `
          <li class="detail-link-item" data-place-id="${p.id}">
            <span class="link-icon">📍</span>
            <span class="link-name">${p.title}</span>
            <span class="link-sub">${placeTypeLabel(p.placeType)}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedEvents.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Events</h3>
      <ul class="detail-link-list">
        ${linkedEvents.map(ev => `
          <li class="detail-link-item" data-event-id="${ev.id}">
            <span class="link-icon">⚡</span>
            <span class="link-name">${ev.title}</span>
            <span class="link-sub">${ev.date}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${linkedChars.length ? `
    <div class="detail-section">
      <h3 class="detail-section-heading">Characters</h3>
      <ul class="detail-link-list">
        ${linkedChars.map(c => `
          <li class="detail-link-item" data-char-id="${c.id}">
            <span class="link-icon">👤</span>
            <span class="link-name">${c.title}</span>
            <span class="link-sub">${c.role}</span>
          </li>`).join('')}
      </ul>
    </div>` : ''}

    ${story.aliases?.length ? `
    <div class="detail-section detail-aliases">
      <span class="muted">Also known as: </span>${story.aliases.join(' · ')}
    </div>` : ''}
  `;

  panelDetail.hidden  = false;
  panelWelcome.hidden = true;
  panelDetail.scrollTop = 0;

  document.getElementById('detailBack')?.addEventListener('click', () => {
    if (state.selectedId) showPlaceDetail(state.selectedId);
    else clearDetail();
  });
  panelDetail.querySelectorAll('[data-place-id]').forEach(el => {
    el.addEventListener('click', () => showPlaceDetail(el.dataset.placeId));
  });
  panelDetail.querySelectorAll('[data-event-id]').forEach(el => {
    el.addEventListener('click', () => showEventDetail(el.dataset.eventId));
  });
  panelDetail.querySelectorAll('[data-char-id]').forEach(el => {
    el.addEventListener('click', () => showCharacterDetail(el.dataset.charId));
  });
}

// ══════════════════════════════════════════════════════════
// CHRONOLOGY BAR  (Phase 3A: draggable cursor)
// ══════════════════════════════════════════════════════════
const ERAS = [
  { id: 'age-founding', label: 'Age of Founding', start: 0,    end: 0.33, color: '#3a5070' },
  { id: 'long-wars',    label: 'The Long Wars',   start: 0.33, end: 0.72, color: '#503a3a', active: true },
  { id: 'post-collapse',label: 'Post-Collapse',   start: 0.72, end: 1.0,  color: '#2a3535' }
];

function renderChronology() {
  if (!chronoTrack) return;
  chronoTrack.innerHTML = '';

  // Era bands (click handled by track-level listener in setupChronoEvents)
  ERAS.forEach(era => {
    const band = document.createElement('div');
    band.className = `chrono-era${era.active ? ' active' : ''}`;
    band.style.left       = `${era.start * 100}%`;
    band.style.width      = `${(era.end - era.start) * 100}%`;
    band.style.background = era.color;
    band.dataset.eraId    = era.id;

    const label = document.createElement('span');
    label.className   = 'era-name';
    label.textContent = era.label;
    band.appendChild(label);
    chronoTrack.appendChild(band);
  });

  // Event dots
  state.data.events.forEach(ev => {
    const dot = document.createElement('div');
    dot.className = `chrono-event-dot chrono-era-${ev.era}`;
    dot.style.left = `${ev.chronoPosition * 100}%`;
    dot.setAttribute('title', `${ev.title} — ${ev.date}`);
    dot.dataset.eventId = ev.id;

    const tip = document.createElement('div');
    tip.className   = 'chrono-event-tip';
    tip.textContent = ev.title;
    dot.appendChild(tip);

    dot.addEventListener('click', e => {
      e.stopPropagation();
      showEventDetail(ev.id);
      panelDetail.scrollTop = 0;
    });

    chronoTrack.appendChild(dot);
  });

  // Draggable cursor (era-centered on init, transparent hit area via CSS)
  const cursor = document.createElement('div');
  cursor.id        = 'chronoCursor';
  cursor.className = 'chrono-cursor';
  chronoTrack.appendChild(cursor);

  // Set initial position at Long Wars midpoint
  moveCursorTo((ERAS[1].start + ERAS[1].end) / 2);
}

// Return the era that contains the given timeline fraction (0–1).
function eraAtPosition(fraction) {
  return ERAS.find(e => fraction >= e.start && fraction < e.end) || ERAS[ERAS.length - 1];
}

// Update era display, band highlights, dot dimming, map overlays, marker emphasis,
// and refresh the open detail panel if it is showing a place.
function applyEra(eraId) {
  state.activeEra = eraId;
  document.querySelectorAll('.chrono-era').forEach(el => {
    el.classList.toggle('active', el.dataset.eraId === eraId);
  });
  document.querySelectorAll('.chrono-event-dot').forEach(dot => {
    dot.classList.toggle('dot-inactive', dot.classList[1].replace('chrono-era-', '') !== eraId);
  });
  updateEraDisplay(eraId);
  applyEraOverlays(eraId);
  applyNarrativeFilter(eraId);
  refreshOpenPanel();
}

// Re-render the place detail panel so era badges reflect the current era.
// No-ops if the panel is closed or showing event, character, or story details.
function refreshOpenPanel() {
  if (state.detailMode === 'place' && state.selectedId) {
    showPlaceDetail(state.selectedId);
  }
}

// Emphasise place markers that have events in eraId; dim the rest.
// If the era has no events (e.g. post-collapse) all markers return to neutral.
function applyNarrativeFilter(eraId) {
  const activePlaceIds = new Set(
    state.data.events
      .filter(ev => ev.era === eraId)
      .flatMap(ev => ev.linkedPlaces || [])
  );

  document.querySelectorAll('[data-place-id]').forEach(marker => {
    if (activePlaceIds.size === 0) {
      marker.classList.remove('marker-era-active', 'marker-era-inactive');
      return;
    }
    const isActive = activePlaceIds.has(marker.dataset.placeId);
    marker.classList.toggle('marker-era-active',   isActive);
    marker.classList.toggle('marker-era-inactive', !isActive);
  });
}

// Switch the political layer's era class so CSS territory rules take effect.
function applyEraOverlays(eraId) {
  const layer = document.getElementById('layerPolitical');
  if (!layer) return;
  ERAS.forEach(e => layer.classList.remove('era-' + e.id));
  layer.classList.add('era-' + eraId);
}

// Move cursor to a fraction (0–1) and apply the corresponding era.
function moveCursorTo(fraction) {
  const cursor = document.getElementById('chronoCursor');
  if (cursor) cursor.style.left = `${fraction * 100}%`;
  applyEra(eraAtPosition(fraction).id);
}

// Click-based era selection: snap cursor to the center of the named era.
function selectEra(eraId) {
  const era = ERAS.find(e => e.id === eraId);
  if (era) moveCursorTo((era.start + era.end) / 2);
}

function updateEraDisplay(eraId) {
  if (!eraDisplay) return;
  const era = ERAS.find(e => e.id === eraId);
  eraDisplay.textContent = era ? era.label : '';
}

function setupChronoEvents() {
  const cursor = document.getElementById('chronoCursor');
  if (!cursor || !chronoTrack) return;

  let dragging = false;

  // Convert a clientX pixel to a 0–1 timeline fraction clamped to the track.
  function fractionAt(clientX) {
    const rect = chronoTrack.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }

  // ── Cursor drag (mouse) ──────────────────────────────────
  cursor.addEventListener('mousedown', e => {
    dragging = true;
    cursor.classList.add('dragging');
    e.preventDefault();
    e.stopPropagation();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    moveCursorTo(fractionAt(e.clientX));
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    cursor.classList.remove('dragging');
  });

  // ── Cursor drag (touch) ──────────────────────────────────
  cursor.addEventListener('touchstart', e => {
    dragging = true;
    cursor.classList.add('dragging');
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    moveCursorTo(fractionAt(e.touches[0].clientX));
  }, { passive: false });

  window.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    cursor.classList.remove('dragging');
  });

  // ── Click anywhere on track → move cursor there ──────────
  // Era band clicks bubble up here; event dot clicks are excluded.
  chronoTrack.addEventListener('click', e => {
    if (e.target === cursor) return;
    if (!e.target.closest('.chrono-event-dot')) {
      moveCursorTo(fractionAt(e.clientX));
    }
  });
}

// ══════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════
function placeTypeLabel(t) {
  return { city: 'City', fortress: 'Fortress', town: 'Town', ruins: 'Ruins', village: 'Village', landmark: 'Landmark' }[t] || t;
}

function eraLabel(eraId) {
  return { 'age-founding': 'Age of Founding', 'long-wars': 'The Long Wars', 'post-collapse': 'Post-Collapse' }[eraId] || eraId || '';
}

function factionName(f) {
  return { 'northern-reach': 'Northern Reach', 'the-compact': 'The Compact', 'free-coast': 'Free Coast' }[f] || f;
}

function canonBadgeHTML(state) {
  const map = { canon: ['canon-badge', 'Canon'], draft: ['draft-badge', 'Draft'], alt: ['alt-badge', 'Alt'], legend: ['legend-badge', 'Legend'] };
  const [cls, label] = map[state] || ['draft-badge', state];
  return `<span class="${cls}">${label}</span>`;
}

// ══════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);
