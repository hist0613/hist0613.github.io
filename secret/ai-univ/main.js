// main.js — state, DOM refs, init, renderFilters, updateFilterState,
//           setupEvents, openModal
// Depends on: all other modules (courses.js, data.js, views.js, table.js)

// Access global data from data.js

const state = {
    activeTrack: null,
    activeMD: null, // MD index
    activeGroup: null, // similar_id
    activeLayer: null, // 'L1', 'L2', 'L3', 'L4'
    activeLayerTag: null, // 'literacy', 'core', 'app' (Optional sub-filter)
    showNew: true, // Default: show suggested
    similarityMode: true, // Always on
    viewMode: 'all', // 'all', 'ai', 'ax', 'tracks', 'pbl', 'faculty'
};

// DOM Elements
const trackContainer = document.getElementById('track-filters');
const mdContainer = document.getElementById('md-filters');
const tableContainer = document.getElementById('roadmap-table');
const resetBtn = document.getElementById('resetBtn');
const showNewCheckbox = document.getElementById('showNewCheckbox');
const modal = document.getElementById('courseModal');

// Hash-based routing helpers
const VALID_VIEWS = ['all', 'ai', 'ax', 'tracks', 'faculty', 'pbl'];
function applyHashToState() {
    const hash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.includes(hash)) state.viewMode = hash;
}

// Init
function init() {
    applyHashToState(); // Read URL hash before first render
    calculateSimilarityColors();
    renderFilters();
    renderTable();
    setupEvents();
}

window.addEventListener('hashchange', () => {
    applyHashToState();
    renderFilters();
    renderTable();
});

const CURRICULUM_VIEWS = ['all', 'ai', 'ax'];

function isCurriculumView() {
    return CURRICULUM_VIEWS.includes(state.viewMode);
}

function renderMainNav() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = '';

    const left = document.createElement('div');
    left.className = 'main-nav-left';

    // ── Top-level nav items ──
    const topItems = [
        { label: '커리큘럼', views: ['all', 'ai', 'ax'], defaultView: 'all' },
        { label: '전공 트랙 체계', views: ['tracks'], defaultView: 'tracks' },
        { label: 'PBL 교과목', views: ['pbl'], defaultView: 'pbl' },
        { label: '참여 교수진', views: ['faculty'], defaultView: 'faculty' },
    ];

    topItems.forEach(item => {
        const isActive = item.views.includes(state.viewMode);

        const navItem = document.createElement('div');
        navItem.className = 'nav-item' + (isActive ? ' active' : '');
        navItem.textContent = item.label;
        navItem.onclick = () => {
            if (!isActive) {
                state.viewMode = item.defaultView;
                history.pushState(null, '', '#' + item.defaultView);
                renderFilters();
                renderTable();
            }
        };
        left.appendChild(navItem);
    });

    nav.appendChild(left);

    // ── Sub-nav row (below main-nav, only for curriculum views) ──
    const subNav = document.getElementById('main-sub-nav');
    subNav.innerHTML = '';
    if (isCurriculumView()) {
        const subModes = [
            { id: 'all', label: 'Full View' },
            { id: 'ai',  label: 'AI Majors' },
            { id: 'ax',  label: 'AX Majors' },
        ];
        subModes.forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'nav-sub-btn' + (state.viewMode === m.id ? ' active' : '');
            btn.textContent = m.label;
            btn.onclick = () => {
                state.viewMode = m.id;
                history.pushState(null, '', '#' + m.id);
                renderFilters();
                renderTable();
            };
            subNav.appendChild(btn);
        });
    }

}

function renderFilters() {
    // Show/hide filter controls based on view
    document.querySelector('.controls-wrapper').classList.toggle('hidden', !isCurriculumView());

    // Tracks
    trackContainer.innerHTML = '';
    
    // -- Layer Filters (New / Refined) --
    // Definition of Filter Groups
    // Structure: [ { label: 'L1: Basics', filters: [{id:'L1', tag:'literacy', name:'AI 기초'}] } ... ]
    
    // We want a list of buttons that might be Grouped.
    // L1: [AI 기초]
    // L2: [AI 코어] [AI 활용]
    // ...
    
    // Let's manually build the layer buttons array
    const layerButtons = [
        { layer: 'L0', tag: 'literacy', label: 'L0: AI 기초', cls: 'layer-l0' },
        { layer: 'L1', tag: 'core', label: 'L1: AI 코어', cls: 'layer-core' },
        { layer: 'L1', tag: 'app', label: 'L1: AI 활용', cls: 'layer-app' },
        { layer: 'L2', tag: 'core', label: 'L2: AI 심화', cls: 'layer-core' },
        { layer: 'L2', tag: 'app', label: 'L2: AI 융합', cls: 'layer-app' },
        { layer: 'L3', tag: 'core', label: 'L3: AI 아키텍트', cls: 'layer-core' },
        { layer: 'L3', tag: 'app', label: 'L3: AI 리더십', cls: 'layer-app' }
    ];

    let layerContainer = document.getElementById('layer-filters');
    if (!layerContainer) {
        const wrapper = document.createElement('div');
        wrapper.className = 'controls';
        wrapper.id = 'layer-controls'; // wrapper
        
        const label = document.createElement('span');
        label.className = 'filter-label';
        label.textContent = 'Curriculum Layers:';
        wrapper.appendChild(label);

        layerContainer = document.createElement('div');
        layerContainer.id = 'layer-filters';
        layerContainer.className = 'chip-group';
        wrapper.appendChild(layerContainer);

        // Insert as first control
        const controlsWrapper = document.querySelector('.controls-wrapper');
        controlsWrapper.insertBefore(wrapper, controlsWrapper.firstChild); // Top
    }

    layerContainer.innerHTML = '';

    // Layer colors per level
    const layerColors = { L0: '#94a3b8', L1: '#64748b', L2: '#475569', L3: '#1e293b' };

    // Group: L0 alone, then L1/L2/L3 each as a pair
    const layerGroups = [
        { label: null, items: [layerButtons[0]] },           // L0 alone
        { label: 'L1', items: [layerButtons[1], layerButtons[2]] },
        { label: 'L2', items: [layerButtons[3], layerButtons[4]] },
        { label: 'L3', items: [layerButtons[5], layerButtons[6]] }
    ];

    layerGroups.forEach(group => {
        if (group.items.length === 1) {
            // Standalone (L0) — wrap in same structure as grouped to match height
            const btnDef = group.items[0];
            const groupWrap = document.createElement('div');
            groupWrap.style.display = 'flex';
            groupWrap.style.padding = '2px';
            groupWrap.style.borderRadius = '22px';
            groupWrap.style.background = '#f1f5f9';
            groupWrap.style.border = `1.5px solid ${layerColors[btnDef.layer]}33`;
            const btn = document.createElement('div');
            btn.className = 'filter-chip layer-chip layer-filter-chip';
            btn.classList.add(btnDef.cls);
            btn.style.borderColor = layerColors[btnDef.layer];
            btn.style.color = layerColors[btnDef.layer];
            btn.innerHTML = `<span style="font-weight:700;">${btnDef.label}</span>`;
            btn.onclick = () => {
                const isActive = (state.activeLayer === btnDef.layer && state.activeLayerTag === btnDef.tag);
                if (isActive) { state.activeLayer = null; state.activeLayerTag = null; }
                else { state.activeLayer = btnDef.layer; state.activeLayerTag = btnDef.tag;
                       state.activeTrack = null; state.activeMD = null; state.activeGroup = null; }
                updateFilterState(); updateHighlights();
            };
            groupWrap.appendChild(btn);
            layerContainer.appendChild(groupWrap);
        } else {
            // Grouped pill (L1, L2, L3)
            const color = layerColors[group.label];
            const groupWrap = document.createElement('div');
            groupWrap.className = 'layer-filter-group';
            groupWrap.style.display = 'flex';
            groupWrap.style.gap = '2px';
            groupWrap.style.padding = '2px';
            groupWrap.style.borderRadius = '22px';
            groupWrap.style.background = '#f1f5f9';
            groupWrap.style.border = `1.5px solid ${color}33`;

            group.items.forEach(btnDef => {
                const btn = document.createElement('div');
                btn.className = 'filter-chip layer-chip layer-filter-chip';
                btn.classList.add(btnDef.cls);
                btn.style.borderColor = color;
                btn.style.color = color;
                btn.innerHTML = `<span style="font-weight:700;">${btnDef.label}</span>`;
                btn.onclick = () => {
                    const isActive = (state.activeLayer === btnDef.layer && state.activeLayerTag === btnDef.tag);
                    if (isActive) { state.activeLayer = null; state.activeLayerTag = null; }
                    else { state.activeLayer = btnDef.layer; state.activeLayerTag = btnDef.tag;
                           state.activeTrack = null; state.activeMD = null; state.activeGroup = null; }
                    updateFilterState(); updateHighlights();
                };
                groupWrap.appendChild(btn);
            });
            layerContainer.appendChild(groupWrap);
        }
    });


    // Tracks — always visible, grouped by dept, using dept track color
    trackContainer.innerHTML = '';
    trackContainer.style.flexDirection = 'row';
    trackContainer.style.alignItems = 'center';
    trackContainer.style.flexWrap = 'wrap';
    trackContainer.style.gap = '6px';

    const deptGroups = {};
    tracks.forEach(track => {
        if (!deptGroups[track.dept]) deptGroups[track.dept] = [];
        deptGroups[track.dept].push(track);
    });
    Object.entries(deptGroups).forEach(([dept, deptTracks]) => {
        const groupWrap = document.createElement('div');
        groupWrap.className = 'track-filter-group';
        groupWrap.style.display = 'flex';
        groupWrap.style.gap = '3px';
        groupWrap.style.padding = '2px';
        groupWrap.style.borderRadius = '22px';
        groupWrap.style.background = '#f1f5f9';
        groupWrap.style.border = `1.5px solid ${deptTracks[0].color}22`;
        deptTracks.forEach(track => {
            const isActive = state.activeTrack === track.id;
            const btn = document.createElement('div');
            btn.className = 'filter-chip track-filter-chip' + (isActive ? ' active' : '');
            const tColor = track.color || '#3b82f6';
            btn.style.borderColor = tColor;
            btn.style.color = tColor;
            if (isActive) btn.style.backgroundColor = hexToRgba(tColor, 0.12);
            btn.innerHTML = `<span style="font-weight:800; margin-right:3px; font-size:0.7rem;">T${track.group_number}</span>${track.title}`;
            btn.onclick = () => {
                state.activeTrack = (state.activeTrack === track.id) ? null : track.id;
                if (state.activeTrack) { state.activeMD = null; state.activeLayer = null; state.activeLayerTag = null; state.activeGroup = null; }
                renderFilters();
                renderTable();
            };
            groupWrap.appendChild(btn);
        });
        trackContainer.appendChild(groupWrap);
    });

    // Micro Degrees — always visible, grouped by parent track (sharing track color)
    // context_non_ai = "C"  breadth = "B"
    // Selecting an MD filters displayDepts in renderTable() to only relevant departments
    mdContainer.innerHTML = '';
    const mdByFusion = {};
    microDegrees.forEach((md, idx) => {
        if (!mdByFusion[md.fusion]) mdByFusion[md.fusion] = [];
        mdByFusion[md.fusion].push({ md, idx });
    });
    Object.entries(mdByFusion).forEach(([fusionId, entries]) => {
        const fm = fusionMajors.find(f => f.id === fusionId);
        const track = fm ? tracks.find(t => t.id === fm.trackId) : null;
        const color = track ? track.color : '#6366f1';

        const groupWrap = document.createElement('div');
        groupWrap.style.display = 'flex';
        groupWrap.style.gap = '3px';
        groupWrap.style.padding = '2px';
        groupWrap.style.borderRadius = '22px';
        groupWrap.style.background = '#f1f5f9';
        groupWrap.style.border = `1.5px solid ${color}33`;

        entries.forEach(({ md, idx }) => {
            const isActive = state.activeMD === idx;
            const typeLabel = md.type === 'context_non_ai' ? 'C' : 'B';
            const btn = document.createElement('div');
            btn.className = 'filter-chip md-filter-chip' + (isActive ? ' active' : '');
            btn.style.setProperty('--md-color', color);
            btn.style.borderColor = isActive ? color : `${color}88`;
            btn.style.color = color;
            if (isActive) btn.style.backgroundColor = hexToRgba(color, 0.12);
            const badgeCls = md.type === 'breadth' ? 'md-type-badge breadth' : 'md-type-badge';
            btn.innerHTML = `<span class="${badgeCls}">${typeLabel}</span>${md.title}`;
            btn.onclick = () => {
                state.activeMD = (state.activeMD === idx) ? null : idx;
                if (state.activeMD !== null) { state.activeLayer = null; state.activeLayerTag = null; state.activeGroup = null; }
                renderFilters();
                renderTable();
            };
            groupWrap.appendChild(btn);
        });
        mdContainer.appendChild(groupWrap);
    });

    // Build main navigation bar
    renderMainNav();
}

function updateFilterState() {
    // Layers
    const layerContainer = document.getElementById('layer-filters');
    if(layerContainer) {
        // We know the order of buttons matches our definitions
        const buttons = layerContainer.querySelectorAll('.filter-chip');
        const defs = [
            { layer: 'L0', tag: 'literacy' },
            { layer: 'L1', tag: 'core' }, { layer: 'L1', tag: 'app' },
            { layer: 'L2', tag: 'core' }, { layer: 'L2', tag: 'app' },
            { layer: 'L3', tag: 'core' }, { layer: 'L3', tag: 'app' }
        ];
        
        const lColors = { L0: '#94a3b8', L1: '#64748b', L2: '#475569', L3: '#1e293b' };
        buttons.forEach((btn, i) => {
            const def = defs[i];
            const lc = lColors[def.layer];
            if (def.layer === state.activeLayer && def.tag === state.activeLayerTag) {
                btn.classList.add('active');
                btn.style.backgroundColor = hexToRgba(lc, 0.12);
                btn.style.borderColor = lc;
                btn.style.color = lc;
            } else {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
                btn.style.borderColor = lc;
                btn.style.color = lc;
            }
        });
    }

    // Tracks — match by data order (12 chips)
    const trackChips = trackContainer.querySelectorAll('.track-filter-chip');
    trackChips.forEach((chip, i) => {
        const track = tracks[i];
        if (!track) return;
        const tColor = track.color || '#3b82f6';
        if (track.id === state.activeTrack) {
            chip.classList.add('active');
            chip.style.backgroundColor = hexToRgba(tColor, 0.12);
            chip.style.color = tColor;
            chip.style.borderColor = tColor;
        } else {
            chip.classList.remove('active');
            chip.style.backgroundColor = 'transparent';
            chip.style.color = tColor;
            chip.style.borderColor = tColor;
        }
    });

    // MD
    const mdChips = mdContainer.querySelectorAll('.filter-chip');
    mdChips.forEach((chip, i) => {
        if (i === state.activeMD) chip.classList.add('active');
        else chip.classList.remove('active');
    });
}

function openModal(course, dept) {
    document.getElementById('modalTitle').textContent = course.name;
    document.getElementById('modalMeta').textContent = `${dept.name} | ${course.category} | ${course.credit}학점`;
    
    const list = document.getElementById('modalSimilars');
    list.innerHTML = '';
    
    if(course.similar_id) {
        const sisters = courseData.filter(c => c.similar_id === course.similar_id && c !== course);
        if(sisters.length > 0) {
            sisters.forEach(s => {
                const d = departments.find(dep => dep.id === s.dept);
                const li = document.createElement('li');
                li.textContent = `${d.name} : ${s.name} (${s.grade}-${s.semester}) [${s.layer || ''}]`;
                list.appendChild(li);
            });
        } else {
            list.innerHTML = '<li>연계된 타 학과 과목이 없거나 현재 표에 없습니다.</li>';
        }
    } else {
        list.innerHTML = '<li>연계된 타 학과 과목이 없습니다.</li>';
    }

    // Modal Description
    const layerInfo = `${course.layer || 'N/A'}-${course.layer_tag || ''}`;
    if(course.suggested) {
        document.getElementById('modalDesc').textContent = 
            `* 이 과목은 AI+X 융합 교육과정을 위해 신설이 제안된 과목입니다. (Layer: ${layerInfo})`;
        document.getElementById('modalDesc').style.color = 'var(--accent-color)';
    } else {
        document.getElementById('modalDesc').textContent = 
            `이 과목은 해당 트랙의 핵심 교과목입니다. (Layer: ${layerInfo})`;
        document.getElementById('modalDesc').style.color = '#334155';
    }

    modal.classList.add('visible');
}

// Helpers
function setupEvents() {
    showNewCheckbox.checked = state.showNew;
    showNewCheckbox.onchange = (e) => {
        state.showNew = e.target.checked;
        renderTable();
    };

    resetBtn.onclick = () => {
        state.activeTrack = null;
        state.activeMD = null;
        state.activeGroup = null;
        state.activeLayer = null;
        state.activeLayerTag = null;
        updateFilterState();
        updateHighlights();
    };

    document.querySelector('.close-btn').onclick = () => modal.classList.remove('visible');
    
    window.onclick = (e) => {
        if(e.target === modal) modal.classList.remove('visible');
    };
}

init();

// Expose for testing
window.state = state;
window.applyHashToState = applyHashToState;
window.renderFilters = renderFilters;
window.updateFilterState = updateFilterState;
window.openModal = openModal;
