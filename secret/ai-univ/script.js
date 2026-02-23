// Access global data from data.js

const state = {
    activeTrack: null,
    activeMD: null, // MD index
    activeGroup: null, // similar_id
    activeLayer: null, // 'L1', 'L2', 'L3', 'L4'
    activeLayerTag: null, // 'literacy', 'core', 'app' (Optional sub-filter)
    showNew: true, // Default: show suggested
    similarityMode: true, // Always on
    viewMode: 'all' // 'all', 'ai', 'ax'
};

// DOM Elements
const trackContainer = document.getElementById('track-filters');
const mdContainer = document.getElementById('md-filters');
const tableContainer = document.getElementById('roadmap-table');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('courseModal');

// Hash-based routing helpers
const VALID_VIEWS = ['all', 'ai', 'ax', 'tracks', 'faculty'];
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

// 1. Render Top Filters
function renderFilters() {
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


    // Tracks
    // Tracks — grouped by department (2 tracks each)
    trackContainer.innerHTML = '';
    trackContainer.style.flexDirection = 'row';
    trackContainer.style.alignItems = 'center';
    trackContainer.style.flexWrap = 'wrap';
    trackContainer.style.gap = '6px';

    // Group tracks by dept
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
            const btn = document.createElement('div');
            btn.className = 'filter-chip track-filter-chip';
            const tColor = track.color || '#3b82f6';
            btn.style.borderColor = tColor;
            btn.style.color = tColor;
            btn.innerHTML = `<span style="font-weight:800; margin-right:3px; font-size:0.7rem;">T${track.group_number}</span>${track.title}`;
            btn.onclick = () => {
                if (state.activeTrack === track.id) state.activeTrack = null;
                else {
                    state.activeTrack = track.id;
                    state.activeMD = null;
                    state.activeLayer = null;
                    state.activeLayerTag = null;
                    state.activeGroup = null;
                }
                updateFilterState();
                updateHighlights();
            };
            groupWrap.appendChild(btn);
        });
        trackContainer.appendChild(groupWrap);
    });

    // Micro Degrees

    // Micro Degrees
    mdContainer.innerHTML = '';
    microDegrees.forEach((md, idx) => {
        const btn = document.createElement('div');
        btn.className = 'filter-chip';
        btn.textContent = md.title;
        btn.onclick = () => {
            if (state.activeMD === idx) state.activeMD = null;
            else {
                state.activeMD = idx;
                state.activeTrack = null; 
                state.activeLayer = null; 
                state.activeLayerTag = null;
                state.activeGroup = null;
            }
            updateFilterState();
            updateHighlights();
        };
        mdContainer.appendChild(btn);
    });

    // --- Controls Container ---
    let controlsContainer = document.getElementById('header-controls-right');
    if (!controlsContainer) {
        controlsContainer = document.createElement('div');
        controlsContainer.id = 'header-controls-right';
        controlsContainer.className = 'controls';
        controlsContainer.style.marginLeft = 'auto'; 
        controlsContainer.style.display = 'flex';
        controlsContainer.style.gap = '16px';
        controlsContainer.style.alignItems = 'center';

        document.querySelector('.controls-wrapper').appendChild(controlsContainer);
    }
    
    // Clear & Rebuild
    controlsContainer.innerHTML = '';

    // Show New Courses Toggle
    const newToggleLabel = document.createElement('label');
    newToggleLabel.style.display = 'flex';
    newToggleLabel.style.alignItems = 'center';
    newToggleLabel.style.gap = '6px';
    newToggleLabel.style.fontSize = '0.85rem';
    newToggleLabel.style.fontWeight = '600';
    newToggleLabel.style.color = '#475569';
    newToggleLabel.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = state.showNew;
    checkbox.onchange = (e) => {
        state.showNew = e.target.checked;
        renderTable(); 
    };

    newToggleLabel.appendChild(checkbox);
    newToggleLabel.appendChild(document.createTextNode('Show New Courses (AI+X)'));
    controlsContainer.appendChild(newToggleLabel);

    // View Mode Controls
    const viewGroup = document.createElement('div');
    viewGroup.className = 'view-mode-group';
    viewGroup.style.display = 'flex';
    viewGroup.style.gap = '8px';
    viewGroup.style.marginLeft = '16px';
    viewGroup.style.paddingLeft = '16px';
    viewGroup.style.borderLeft = '1px solid #cbd5e1';

    const modes = [
        { id: 'all', label: 'Full View' },
        { id: 'ai', label: 'AI Majors' },
        { id: 'ax', label: 'AX Majors' },
        { id: 'tracks', label: '전공 트랙 체계' },
        { id: 'faculty', label: '참여 교수진' }
    ];

    modes.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'view-btn';
        if (state.viewMode === m.id) btn.classList.add('active');
        btn.textContent = m.label;
        btn.style.padding = '4px 12px';
        btn.style.borderRadius = '6px';
        btn.style.border = '1px solid #e2e8f0';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '0.85rem';
        btn.style.fontWeight = '600';
        
        // Active Style
        if (state.viewMode === m.id) {
            btn.style.background = '#0f172a';
            btn.style.color = '#fff';
            btn.style.borderColor = '#0f172a';
        } else {
            btn.style.background = '#fff';
            btn.style.color = '#64748b';
        }

        btn.onclick = () => {
            state.viewMode = m.id;
            history.pushState(null, '', '#' + m.id);
            renderFilters();
            renderTable();
        };
        viewGroup.appendChild(btn);
    });

    controlsContainer.appendChild(viewGroup);
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
                btn.style.backgroundColor = lc;
                btn.style.borderColor = lc;
                btn.style.color = '#fff';
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
            chip.style.backgroundColor = tColor;
            chip.style.color = '#fff';
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

// Helper: hex color to rgba string
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// Apply category-based style to a course chip element
function applyCourseCatStyle(el, cat, trackColor) {
    el.classList.add('course-chip', `cat-${cat}`);
    if (cat === 'track') {
        el.style.background = hexToRgba(trackColor, 0.12);
        el.style.borderColor = hexToRgba(trackColor, 0.45);
        el.style.color = trackColor;
    }
}

// 2b. Render Faculty View
function renderFacultyView() {
    tableContainer.innerHTML = '';
    tableContainer.classList.add('track-overview-mode');

    const wrapper = document.createElement('div');
    wrapper.className = 'faculty-wrapper';

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'faculty-header';
    hdr.innerHTML = `
        <div class="track-overview-title">
            <h2>참여 교수진 <span class="track-overview-badge">'26 제안서 기준</span></h2>
            <p>AI융합대학 및 AX 협력학과 교수진 현황입니다. 정보통신공학과(ICE)는 일부 교원만 포함되어 있으며 순차적으로 업데이트될 예정입니다.</p>
        </div>
    `;
    wrapper.appendChild(hdr);

    // Group faculty by dept, in a specific order
    // AI Majors follow tracks order (CSE→ICE→LAI→AID→FAI→SSAI), then AX partners
    const deptOrder = ['CSE','ICE','LAI','AID','FAI','SSAI','ELLT','MEDIA','IME'];
    const grouped = {};
    deptOrder.forEach(d => grouped[d] = []);
    facultyData.forEach(f => { if (grouped[f.dept]) grouped[f.dept].push(f); });

    deptOrder.forEach(deptId => {
        const members = grouped[deptId];
        if (!members.length) return;

        const dept = departments.find(d => d.id === deptId);
        const deptColor = dept ? dept.color : '#64748b';
        const deptName  = dept ? dept.name  : deptId;
        const isAI = dept && dept.group === 'AI';

        const section = document.createElement('div');
        section.className = 'faculty-section';

        const secHdr = document.createElement('div');
        secHdr.className = 'faculty-section-header';
        secHdr.innerHTML = `
            <div class="faculty-dept-badge" style="background:${deptColor}">${isAI ? 'AI 전공' : 'AX 협력'}</div>
            <h3 class="faculty-dept-name" style="color:${deptColor}">${deptName}</h3>
            <span class="faculty-dept-count">${members.length}명</span>
        `;
        section.appendChild(secHdr);

        const grid = document.createElement('div');
        grid.className = 'faculty-grid';

        members.forEach(f => {
            const card = document.createElement('div');
            card.className = 'faculty-card';
            card.style.setProperty('--fc-color', deptColor);

            const posColor = f.position === '교수' ? '#1e293b' : f.position === '부교수' ? '#334155' : '#475569';

            card.innerHTML = `
                <div class="faculty-card-top">
                    <div class="faculty-avatar" style="background:${deptColor}22; color:${deptColor}; border:2px solid ${deptColor}44">
                        ${f.name.charAt(0)}
                    </div>
                    <div class="faculty-card-info">
                        <div class="faculty-name">${f.name}${f.role ? ` <span class="faculty-role-badge">${f.role}</span>` : ''}</div>
                        <div class="faculty-pos" style="color:${posColor}">${f.position}</div>
                        ${f.deptNote ? `<div class="faculty-dept-note">${f.deptNote}</div>` : ''}
                    </div>
                </div>
                ${f.major ? `<div class="faculty-major"><span class="faculty-major-label">전공</span> ${f.major}</div>` : ''}
                ${f.keywords && f.keywords.length ? `<div class="faculty-keywords">${f.keywords.map(k => `<span class="faculty-kw" style="background:${deptColor}12; color:${deptColor}; border-color:${deptColor}33">${k}</span>`).join('')}</div>` : ''}
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        wrapper.appendChild(section);
    });

    tableContainer.appendChild(wrapper);
}

// 2a. Render Track Overview
function renderTrackOverview() {
    tableContainer.innerHTML = '';
    tableContainer.style.removeProperty('--col-count');
    tableContainer.classList.add('track-overview-mode');

    const wrapper = document.createElement('div');
    wrapper.className = 'track-overview-wrapper';

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'track-overview-header';
    hdr.innerHTML = `
        <div class="track-overview-title">
            <h2>AI 전공 트랙 체계 <span class="track-overview-badge">'26 제안서</span></h2>
            <p>AI 기술 분야에 전문성을 갖춘 인재 양성 목적의 트랙별 특화교육 과정입니다.</p>
        </div>
        <div class="track-cat-legend">
            <span class="legend-chip cat-bsm">기초/교양</span>
            <span class="legend-chip cat-req">전공필수</span>
            <span class="legend-chip cat-common">전공선택 공통</span>
            <span class="legend-chip cat-track-demo">전공선택 트랙별</span>
            <span class="legend-chip cat-cap">캡스톤/PBL</span>
        </div>
        <div class="track-overview-meta">
            <span>📌 전공세부트랙 30학점 이상 이수 시 졸업증명서 또는 성적증명서에 기재</span>
            <span>📌 2개 이상 트랙 이수 가능</span>
        </div>
    `;
    wrapper.appendChild(hdr);

    // Track number overview bar
    const overviewBar = document.createElement('div');
    overviewBar.className = 'track-number-bar';
    departmentTracks.forEach(dept => {
        const cell = document.createElement('div');
        cell.className = 'track-number-cell';
        cell.style.borderColor = dept.color;
        cell.innerHTML = `
            <div class="track-number-header" style="background:${dept.color}">
                <span class="track-numbers">${dept.tracks.map(t => `T${t.number} ${t.name}`).join('<br>')}</span>
            </div>
            <div class="track-number-dept">${dept.deptName}</div>
            <div class="track-number-ax">
                <span class="ax-label">AX협력</span>
                ${dept.axPartners.join(' · ')}
            </div>
        `;
        cell.style.cursor = 'pointer';
        cell.onclick = () => {
            const target = document.getElementById(`track-dept-${dept.dept}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        overviewBar.appendChild(cell);
    });
    wrapper.appendChild(overviewBar);

    // Department sections
    departmentTracks.forEach(deptData => {
        const section = document.createElement('div');
        section.className = 'track-dept-section';
        section.id = `track-dept-${deptData.dept}`;

        // Department header
        const deptHdr = document.createElement('div');
        deptHdr.className = 'track-dept-header';
        deptHdr.innerHTML = `
            <div class="track-dept-badge" style="background:${deptData.color}">AI 전공</div>
            <h3 class="track-dept-name">${deptData.deptName}</h3>
        `;
        section.appendChild(deptHdr);

        // AX Partners — shown ABOVE track cards
        const axRow = document.createElement('div');
        axRow.className = 'track-ax-row';
        axRow.innerHTML = `
            <span class="track-ax-label">AX 협력전공</span>
            <div class="track-ax-partners">
                ${deptData.axPartners.map(p => `<span class="track-ax-chip">${p}</span>`).join('')}
            </div>
        `;
        section.appendChild(axRow);

        // Build grade/semester lookup from courseData
        const byDeptName = new Map();
        const byNameOnly = new Map();
        courseData.forEach(c => {
            byDeptName.set(`${c.dept}:${c.name}`, { grade: c.grade, semester: c.semester });
            if (!byNameOnly.has(c.name)) byNameOnly.set(c.name, { grade: c.grade, semester: c.semester });
        });

        // Track cards grid
        const cardsRow = document.createElement('div');
        cardsRow.className = 'track-cards-row';

        deptData.tracks.forEach(track => {
            const card = document.createElement('div');
            card.className = 'track-card';
            card.style.setProperty('--track-color', deptData.color);

            // Card header
            const cardHdr = document.createElement('div');
            cardHdr.className = 'track-card-header';
            cardHdr.style.background = deptData.color;
            cardHdr.innerHTML = `
                <span class="track-card-number">T${track.number}</span>
                <span class="track-card-name">${track.name}</span>
            `;
            card.appendChild(cardHdr);

            // Description
            const desc = document.createElement('p');
            desc.className = 'track-card-desc';
            desc.textContent = track.description;
            card.appendChild(desc);

            // Build 4×2 semester grid
            const semMap = {};
            for (let g = 1; g <= 4; g++)
                for (let s = 1; s <= 2; s++)
                    semMap[`${g}-${s}`] = [];

            track.courses.forEach(course => {
                const info = byDeptName.get(`${deptData.dept}:${course.name}`) || byNameOnly.get(course.name);
                const key = info ? `${info.grade}-${info.semester}` : '3-1';
                semMap[key].push(course);
            });

            const grid = document.createElement('div');
            grid.className = 'track-semester-grid';

            // Column headers
            const cornerEl = document.createElement('div');
            grid.appendChild(cornerEl);
            ['1학기', '2학기'].forEach(label => {
                const h = document.createElement('div');
                h.className = 'track-semester-col-header';
                h.textContent = label;
                grid.appendChild(h);
            });

            // Year rows
            for (let g = 1; g <= 4; g++) {
                const lbl = document.createElement('div');
                lbl.className = 'track-grade-label';
                lbl.textContent = `${g}학년`;
                grid.appendChild(lbl);

                for (let s = 1; s <= 2; s++) {
                    const cell = document.createElement('div');
                    cell.className = 'track-semester-cell';
                    semMap[`${g}-${s}`].forEach(course => {
                        const chip = document.createElement('span');
                        chip.textContent = course.name;
                        applyCourseCatStyle(chip, course.cat, deptData.color);
                        cell.appendChild(chip);
                    });
                    grid.appendChild(cell);
                }
            }
            card.appendChild(grid);

            cardsRow.appendChild(card);
        });

        section.appendChild(cardsRow);
        wrapper.appendChild(section);
    });

    tableContainer.appendChild(wrapper);
}

// 2. Render Roadmap Table
function renderTable() {
    tableContainer.classList.remove('track-overview-mode');
    tableContainer.innerHTML = '';

    // -- Track overview mode --
    if (state.viewMode === 'tracks') {
        renderTrackOverview();
        return;
    }

    // -- Faculty view --
    if (state.viewMode === 'faculty') {
        renderFacultyView();
        return;
    }

    // -- Header Row --
    const headerRow = document.createElement('div');
    headerRow.className = 'table-header';

    const emptyCell = document.createElement('div');
    emptyCell.className = 'col-header semester-col';
    emptyCell.textContent = 'Sem';
    headerRow.appendChild(emptyCell);

    // Department Columns - Filtering & Sorting
    let displayDepts = departments;

    // 1. Filter by View Mode
    if (state.viewMode === 'ai') {
        displayDepts = departments.filter(d => d.group === 'AI' || d.group === 'General');
    } else if (state.viewMode === 'ax') {
        displayDepts = departments.filter(d => d.group === 'AX_A' || d.group === 'AX_B' || d.group === 'General');
    }

    // 2. Sort Order: General -> AI -> AX_A -> AX_B
    const groupOrder = { 'General': 0, 'AI': 1, 'AX_A': 2, 'AX_B': 3 };
    displayDepts.sort((a,b) => {
        const ga = groupOrder[a.group] || 99;
        const gb = groupOrder[b.group] || 99;
        return ga - gb;
    });

    displayDepts.forEach(dept => {
        const cell = document.createElement('div');
        cell.className = 'col-header';
        cell.innerHTML = `<div class="col-color-indicator" style="background:${dept.color}"></div> ${dept.name}`;
        cell.title = `Website: ${dept.url}`;
        cell.onclick = () => window.open(dept.url, '_blank');
        headerRow.appendChild(cell);
    });
    // -- Grid Setup --
    // We update the CSS variable for grid columns
    tableContainer.style.setProperty('--col-count', displayDepts.length);

    tableContainer.appendChild(headerRow);

    // -- Body Rows (Semesters) --
    // We need a slightly more complex render process for "God View" Sorting
    // 1. Prepare Course Lists per Cell
    const cellMap = new Map(); // "dept_idx,sem_g,sem_s" -> [courses]

    const semesters = [
        {g:1, s:1}, {g:1, s:2},
        {g:2, s:1}, {g:2, s:2},
        {g:3, s:1}, {g:3, s:2},
        {g:4, s:1}, {g:4, s:2}
    ];

    // Populate Cell Map first
    displayDepts.forEach((dept, colIdx) => {
        semesters.forEach(sem => {
            const key = `${dept.id},${sem.g},${sem.s}`;
            const courses = courseData.filter(c => {
                if (c.dept !== dept.id) return false;
                if (c.grade !== sem.g || c.semester !== sem.s) return false;
                if (!state.showNew && c.suggested) return false;
                return true;
            });
            cellMap.set(key, courses);
        });
    });

    // 2. God View Sort (Heuristic: 3-Pass "Gravity")
    // We want to pull connected courses closer to their neighbors.
    // Pass 1: Downward (Propagate influence from Top)
    // Pass 2: Upward (Propagate influence from Bottom)
    // Pass 3: Final Downward Polish
    
    const applyGravitySort = (direction) => {
        // direction: 1 for Top->Bottom, -1 for Bottom->Top
        const start = direction === 1 ? 0 : semesters.length - 1;
        const end = direction === 1 ? semesters.length : -1;
        const step = direction;

        displayDepts.forEach((dept) => {
            for (let i = start; i !== end; i += step) {
                const sem = semesters[i];
                const currentKey = `${dept.id},${sem.g},${sem.s}`;
                const courses = cellMap.get(currentKey);
                if (!courses || courses.length < 2) continue;

                // Neighbors
                const prevSem = i > 0 ? semesters[i-1] : null;
                const nextSem = i < semesters.length - 1 ? semesters[i+1] : null;
                
                const prevKey = prevSem ? `${dept.id},${prevSem.g},${prevSem.s}` : null;
                const nextKey = nextSem ? `${dept.id},${nextSem.g},${nextSem.s}` : null;

                // For "Gravity", we look at WHERE the connected course is in the neighbor cell.
                // But simplified: just presence is enough to pull to edge.
                
                const prevCourses = prevKey ? cellMap.get(prevKey) : [];
                const nextCourses = nextKey ? cellMap.get(nextKey) : [];
                
                // Get sets of IDs in neighbors
                const prevSims = new Set(prevCourses.map(c => c.similar_id).filter(Boolean));
                const nextSims = new Set(nextCourses.map(c => c.similar_id).filter(Boolean));

                courses.sort((a, b) => {
                    let scoreA = 0; 
                    let scoreB = 0;

                    // Base: Category Order (Weakened to allow Gravity override)
                    // We want Gravity to break Category order if necessary.
                    // Range: -100 to 100
                    const orderScore = { "BSM": -50, "Major_Req": -20, "Major_Sel": 0, "Capstone": 50 }; 
                    scoreA += orderScore[a.category] || 0;
                    scoreB += orderScore[b.category] || 0;

                    // Gravity Weights (Stronger)
                    // Connected to UP -> Pull to Top (Decrease Score)
                    if (a.similar_id && prevSims.has(a.similar_id)) scoreA -= 100;
                    if (b.similar_id && prevSims.has(b.similar_id)) scoreB -= 100;

                    // Connected to DOWN -> Pull to Bottom (Increase Score)
                    if (a.similar_id && nextSims.has(a.similar_id)) scoreA += 100;
                    if (b.similar_id && nextSims.has(b.similar_id)) scoreB += 100;
                    
                    // If connected to BOTH? cancelling out? 
                    // No, -100 + 100 = 0. It stays in middle. Correct.
                    
                    return scoreA - scoreB;
                });
            }
        });
    };

    // Execute Passes
    applyGravitySort(1);  // Down
    applyGravitySort(-1); // Up
    applyGravitySort(1);  // Down Again

    // --- HORIZONTAL SYNCHRONIZATION (New) ---
    // Ensure consistent internal ordering within rows.
    // If "AI Math" is generally at the top, it should be at the top in ALL columns.
    
    semesters.forEach(sem => {
        // 1. Calculate Average Rank for each similar_id in this row
        const rankSum = {}; // sid -> sum of indices
        const rankCount = {}; // sid -> count
        
        displayDepts.forEach(dept => {
            const key = `${dept.id},${sem.g},${sem.s}`;
            const courses = cellMap.get(key) || [];
            courses.forEach((c, idx) => {
                const sid = c.similar_id || `nosim_${c.name}`; // Treat non-sim as unique items
                if (!rankSum[sid]) { rankSum[sid] = 0; rankCount[sid] = 0; }
                rankSum[sid] += idx;
                rankCount[sid]++;
            });
        });
        
        const avgRank = {};
        Object.keys(rankSum).forEach(sid => {
            avgRank[sid] = rankSum[sid] / rankCount[sid];
        });
        
        // 2. Re-Sort each cell based on Average Rank
        displayDepts.forEach(dept => {
            const key = `${dept.id},${sem.g},${sem.s}`;
            const courses = cellMap.get(key);
            if (courses && courses.length > 1) {
                courses.sort((a, b) => {
                    const sidA = a.similar_id || `nosim_${a.name}`;
                    const sidB = b.similar_id || `nosim_${b.name}`;
                    const rankA = avgRank[sidA] !== undefined ? avgRank[sidA] : 999;
                    const rankB = avgRank[sidB] !== undefined ? avgRank[sidB] : 999;
                    return rankA - rankB;
                });
            }
        });
    });

    // 3. Render Rows (Compact - No Spacers)
    semesters.forEach(sem => {
        const row = document.createElement('div');
        row.className = 'table-row';

        // Row Label
        const label = document.createElement('div');
        label.className = 'row-label';
        label.textContent = `${sem.g}-${sem.s}`;
        row.appendChild(label);

        // Dept Cells
        displayDepts.forEach((dept, colIdx) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            // GRID COORDINATES
            const rowIdx = (sem.g - 1) * 2 + (sem.s - 1); 
            cell.dataset.row = rowIdx;
            cell.dataset.col = colIdx;

            const key = `${dept.id},${sem.g},${sem.s}`;
            const courses = cellMap.get(key) || [];

            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.textContent = course.name;
                card.dataset.cat = course.category;
                card.dataset.similar = course.similar_id || "";
                
                // Add Layer Data Attributes
                card.dataset.layer = course.layer || "";
                card.dataset.layerTag = course.layer_tag || "";

                // --- Track & Similarity Badges ---
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'track-badges';
                
                // 1. Similarity Group Badge
                if (course.similar_id && simNumberMap.has(course.similar_id)) {
                    const simNum = simNumberMap.get(course.similar_id);
                    const color = simColorMap.get(course.similar_id);
                    
                    const badge = document.createElement('span');
                    badge.className = 'track-badge sim-badge';
                    badge.textContent = simNum;
                    badge.style.backgroundColor = color;
                    badge.style.color = '#fff'; 
                    badge.style.borderColor = color;
                    badge.title = `Similarity Group ${simNum} (Click to Filter)`;
                    
                    badge.style.cursor = 'pointer';
                    badge.onclick = (e) => {
                        e.stopPropagation();
                        // Toggle Filter Logic...
                        if (state.activeGroup === course.similar_id) {
                            state.activeGroup = null;
                        } else {
                            state.activeGroup = course.similar_id;
                            state.activeTrack = null;
                            state.activeMD = null;
                            state.activeLayer = null;
                            state.activeLayerTag = null;
                        }
                        updateFilterState();
                        updateHighlights();
                    };

                    badgeContainer.appendChild(badge);
                }

                // 2. Track Badges
                if (course.similar_id) {
                    const matchingTracks = tracks.filter(t => t.required_similars.includes(course.similar_id));
                    if (matchingTracks.length > 0) {
                        matchingTracks.sort((a,b) => a.group_number - b.group_number);
                        
                        matchingTracks.forEach(t => {
                            const badge = document.createElement('span');
                            badge.className = 'track-badge';
                            badge.textContent = `T${t.group_number}`; 
                            badge.title = t.title; 
                            
                            if (state.activeTrack === t.id) {
                                badge.style.background = 'var(--accent-color)';
                                badge.style.color = 'white';
                                badge.style.borderColor = 'var(--accent-color)';
                            }

                            badgeContainer.appendChild(badge);
                        });
                    }
                }
                
                if (badgeContainer.hasChildNodes()) {
                    card.appendChild(badgeContainer);
                }
                
                // --- Add Suggested Class ---
                if (course.suggested) {
                    card.classList.add('suggested');
                }
                
                card.onclick = () => openModal(course, dept);

                cell.appendChild(card);
                
                // Grid Attributes for SVG logic (Post-render)
                const rowIdx = (sem.g - 1) * 2 + (sem.s - 1); 
                card.dataset.gridR = rowIdx;
                card.dataset.gridC = colIdx;
            });

            row.appendChild(cell);
        });

        tableContainer.appendChild(row);
    });

    updateHighlights();
    
    // Defer SVG drawing to ensure layout is complete
    requestAnimationFrame(() => {
        drawSvgOverlay();
    });
    
    // Also redraw on resize
    window.removeEventListener('resize', drawSvgOverlay);
    window.addEventListener('resize', drawSvgOverlay);
}

function drawSvgOverlay() {
    // 1. Setup SVG Container
    let svg = document.getElementById('roadmap-svg');
    if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = 'roadmap-svg';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none'; // Click-through
        svg.style.zIndex = '0'; // Behind everything? No, needs to be visible. 
        // We will place it at z-index 0. 
        // Table content (text) is z-index 1. Cell backgrounds are hidden logic.
        
        tableContainer.style.position = 'relative'; 
        tableContainer.appendChild(svg);
    } else {
        // Clear paths
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
    }

    // -- GOOEY FILTER DEFINITION --
    // This creates the "Organic Blob" effect by blurring then thresholding alpha.
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
    `;
    svg.appendChild(defs);
    
    // Ensure SVG size matches table scroll size
    const mw = tableContainer.scrollWidth;
    const mh = tableContainer.scrollHeight;
    svg.setAttribute('width', mw);
    svg.setAttribute('height', mh);

    // 2. Clear Old Styles (Reset cells/cards)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(c => {
        c.style.background = '';
        c.style.border = ''; 
    });
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(c => {
        c.style.background = ''; 
        c.style.borderColor = '';
    });

    // 3. Identify Groups
    const groupMap = new Map(); // similar_id -> [cards]
    cards.forEach(card => {
        const sid = card.dataset.similar;
        if (sid) {
            if (!groupMap.has(sid)) groupMap.set(sid, []);
            groupMap.get(sid).push(card);
        }
    });

    // 4. Draw Layers
    const TABLE_RECT = tableContainer.getBoundingClientRect();

    groupMap.forEach((groupCards, sid) => {
        const color = simColorMap.get(sid) || '#cbd5e1';
        
        // Group Container with Filter
        // We draw in two passes:
        // 1. A "Base" layer for the colors (with filter)
        // 2. Optional text/interactions are already on top in DOM.
        
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.style.filter = "url(#goo)"; // Apply Gooey Filter
        g.setAttribute("fill", hexToRgba(color, 0.4)); // More opaque for the blur/threshold to work well
        // We will reduce opacity of the whole group if needed, or rely on the thresholded alpha.
        // Actually, for "Layer" look, we might want flat colors.
        
        // Draw Connected Blobs
        groupCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            
            const x = rect.left - TABLE_RECT.left + tableContainer.scrollLeft;
            const y = rect.top - TABLE_RECT.top + tableContainer.scrollTop;
            const w = rect.width;
            const h = rect.height;
            
            // Draw a padded rect around the card
            const PAD = 10;
            const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            r.setAttribute("x", x - PAD);
            r.setAttribute("y", y - PAD/2);
            r.setAttribute("width", w + PAD*2);
            r.setAttribute("height", h + PAD);
            r.setAttribute("rx", "10"); // Rounded corners
            r.setAttribute("fill", color);
            g.appendChild(r);
        });

        // Draw connections to merge them
        groupCards.forEach(cardA => {
             const rA = parseInt(cardA.dataset.gridR);
             const cA = parseInt(cardA.dataset.gridC);
             const rectA = cardA.getBoundingClientRect();
             const cxA = (rectA.left + rectA.right)/2 - TABLE_RECT.left + tableContainer.scrollLeft;
             const cyA = (rectA.top + rectA.bottom)/2 - TABLE_RECT.top + tableContainer.scrollTop;

             groupCards.forEach(cardB => {
                 if (cardA === cardB) return;
                 const rB = parseInt(cardB.dataset.gridR);
                 const cB = parseInt(cardB.dataset.gridC);
                 
                 // Distance check
                 const dR = Math.abs(rA - rB);
                 const dC = Math.abs(cA - cB);
                 
                 // Standard Neighbor: (dR + dC === 1)
                 // Gap Bridging: 
                 // Allow vertical gap of 1 (dR <= 2) if in same column (dC === 0)
                 // Allow slight diagonal gap? (dR <= 1, dC <= 1) -> Dist 2.
                 
                 let shouldConnect = false;
                 
                 if (dR + dC === 1) {
                     shouldConnect = true; // Direct neighbor
                 } else if (dC === 0 && dR <= 2) {
                     shouldConnect = true; // Vertical Gap of 1 cell (e.g. Sem 1 -> Sem 3)
                 }

                 if (shouldConnect) { 
                     const rectB = cardB.getBoundingClientRect();
                     const cxB = (rectB.left + rectB.right)/2 - TABLE_RECT.left + tableContainer.scrollLeft;
                     const cyB = (rectB.top + rectB.bottom)/2 - TABLE_RECT.top + tableContainer.scrollTop;
                     
                     const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                     line.setAttribute("x1", cxA);
                     line.setAttribute("y1", cyA);
                     line.setAttribute("x2", cxB);
                     line.setAttribute("y2", cyB);
                     // Very thick stroke to merge
                     // Slightly thinner for long bridges to look elegant?
                     // No, needs to match blob width to be "part of the layer"
                     line.setAttribute("stroke-width", "50"); 
                     line.setAttribute("stroke", color);
                     g.appendChild(line);
                 }
             });
        });
        
        // Set Opacity of the whole blobs
        g.setAttribute("opacity", "0.25"); 
        
        svg.appendChild(g);
    });
}

// 3. Logic & Highlights
const simColorMap = new Map();
const simNumberMap = new Map(); 
const similarityColors = [
    '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#818CF8', '#A78BFA', '#F472B6'
];

function calculateSimilarityColors() {
    simColorMap.clear();
    simNumberMap.clear();
    
    const coursesWithSim = courseData.filter(c => c.similar_id);
    const counts = {};
    
    coursesWithSim.forEach(c => {
        const sid = c.similar_id;
        counts[sid] = (counts[sid] || 0) + 1;
    });

    let colorIdx = 0;
    let numIdx = 1;

    Object.keys(counts).sort().forEach(sid => {
        if (counts[sid] > 1) {
            simColorMap.set(sid, similarityColors[colorIdx % similarityColors.length]);
            simNumberMap.set(sid, numIdx++);
            colorIdx++;
        }
    });
}


function updateHighlights() {
    const cards = document.querySelectorAll('.course-card');
    
    // Check active requirements
    let targetSimilars = new Set();
    const hasActiveFilter = state.activeTrack || state.activeMD !== null || state.activeGroup || state.activeLayer;

    if (state.activeGroup) {
        // Direct group selection
        targetSimilars.add(state.activeGroup);
    } else if (state.activeTrack) {
        const t = tracks.find(tr => tr.id === state.activeTrack);
        if(t) targetSimilars = new Set(t.required_similars);
    } else if (state.activeMD !== null) {
        const md = microDegrees[state.activeMD];
        if(md) targetSimilars = new Set(md.courses);
    } 
    // Layer filter uses dataset

    cards.forEach(card => {
        const sid = card.dataset.similar;
        const layer = card.dataset.layer;
        const layerTag = card.dataset.layerTag;

        // Reset visual state
        card.classList.remove('highlighted', 'dimmed', 'similar');
        card.style.backgroundColor = '';
        card.style.borderColor = ''; 
        
        // 1. Filter Logic
        if (hasActiveFilter) {
            let match = false;
            
            if (state.activeLayer) {
                // Layer-based match
                // Must match BOTH layer and tag (if tag is refined)
                match = (layer === state.activeLayer);
                if (match && state.activeLayerTag) {
                     match = (layerTag === state.activeLayerTag);
                }
            } else if (state.activeGroup) {
                // Similarity Group match
                match = (sid === state.activeGroup);
            } else {
                // Track/MD match via similars
                match = (sid && targetSimilars.has(sid));
            }

            if (match) {
                card.classList.add('highlighted');
            } else {
                card.classList.add('dimmed');
            }
        } 
        
        // 2. Similarity Logic
        if (!hasActiveFilter && sid && simColorMap.has(sid)) {
            card.classList.add('similar');
            // Tint background
            const color = simColorMap.get(sid);
            card.style.backgroundColor = hexToRgba(color, 0.1); 
            card.style.borderColor = color;
        }
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

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

init();
