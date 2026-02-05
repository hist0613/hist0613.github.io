// Access global data from data.js

const state = {
    activeTrack: null,
    activeMD: null, // MD index
    activeGroup: null, // similar_id
    activeLayer: null, // 'L1', 'L2', 'L3', 'L4'
    activeLayerTag: null, // 'literacy', 'core', 'app' (Optional sub-filter)
    showNew: true, // Default: show suggested
    similarityMode: true // Always on
};

// DOM Elements
const trackContainer = document.getElementById('track-filters');
const mdContainer = document.getElementById('md-filters');
const tableContainer = document.getElementById('roadmap-table');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('courseModal');

// Init
function init() {
    calculateSimilarityColors(); // Calculate ID numbering first
    renderFilters();
    renderTable(); // Standard Semester Table
    setupEvents();
}

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
    
    layerButtons.forEach(btnDef => {
        const btn = document.createElement('div');
        btn.className = 'filter-chip layer-chip';
        // Add specific class for styling if needed
        btn.classList.add(btnDef.cls); 
        
        // Visual styling for Core vs App?
        // Let's just use text for now.
        btn.innerHTML = `<span style="font-weight:700;">${btnDef.label}</span>`;
        
        btn.onclick = () => {
            // Toggle Logic
            const isActive = (state.activeLayer === btnDef.layer && state.activeLayerTag === btnDef.tag);
            
            if (isActive) {
                state.activeLayer = null;
                state.activeLayerTag = null;
            } else {
                state.activeLayer = btnDef.layer;
                state.activeLayerTag = btnDef.tag;
                
                // Clear others
                state.activeTrack = null;
                state.activeMD = null;
                state.activeGroup = null; 
            }
            updateFilterState();
            updateHighlights();
        };
        layerContainer.appendChild(btn);
    });


    // Tracks
    tracks.forEach(track => {
        const btn = document.createElement('div');
        btn.className = 'filter-chip';
        // Add Track ID (T1..) badge inside
        btn.innerHTML = `<span style="font-weight:800; margin-right:4px; color:var(--accent-color)">T${track.group_number}</span> ${track.title}`; 
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
        trackContainer.appendChild(btn);
    });

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
        
        buttons.forEach((btn, i) => {
            const def = defs[i];
            if (def.layer === state.activeLayer && def.tag === state.activeLayerTag) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Tracks
    const trackChips = trackContainer.querySelectorAll('.filter-chip');
    trackChips.forEach((chip, i) => {
        const track = tracks[i];
        if (track.id === state.activeTrack) chip.classList.add('active');
        else chip.classList.remove('active');
    });

    // MD
    const mdChips = mdContainer.querySelectorAll('.filter-chip');
    mdChips.forEach((chip, i) => {
        if (i === state.activeMD) chip.classList.add('active');
        else chip.classList.remove('active');
    });
}

// 2. Render Roadmap Table
function renderTable() {
    tableContainer.innerHTML = '';

    // -- Header Row --
    const headerRow = document.createElement('div');
    headerRow.className = 'table-header';
    
    const emptyCell = document.createElement('div');
    emptyCell.className = 'col-header semester-col';
    emptyCell.textContent = 'Sem';
    headerRow.appendChild(emptyCell);

    // Department Columns
    departments.forEach(dept => {
        const cell = document.createElement('div');
        cell.className = 'col-header';
        cell.innerHTML = `<div class="col-color-indicator" style="background:${dept.color}"></div> ${dept.name}`;
        cell.title = `Website: ${dept.url}`;
        cell.onclick = () => window.open(dept.url, '_blank');
        headerRow.appendChild(cell);
    });
    tableContainer.appendChild(headerRow);

    // -- Body Rows (Semesters) --
    const semesters = [
        {g:1, s:1}, {g:1, s:2},
        {g:2, s:1}, {g:2, s:2},
        {g:3, s:1}, {g:3, s:2},
        {g:4, s:1}, {g:4, s:2}
    ];

    semesters.forEach(sem => {
        const row = document.createElement('div');
        row.className = 'table-row';

        // Row Label
        const label = document.createElement('div');
        label.className = 'row-label';
        label.textContent = `${sem.g}-${sem.s}`;
        row.appendChild(label);

        // Dept Cells
        departments.forEach(dept => {
            const cell = document.createElement('div');
            cell.className = 'cell';

            // Filter courses
            const courses = courseData.filter(c => {
                if (c.dept !== dept.id) return false;
                if (c.grade !== sem.g || c.semester !== sem.s) return false;
                if (!state.showNew && c.suggested) return false;
                return true;
            });

            // Sort: BSM -> Major_Req -> Major_Sel -> Capstone
            const orderScore = { "BSM": 1, "Major_Req": 2, "Major_Sel": 3, "Capstone": 10 }; 
            courses.sort((a,b) => {
                const sa = orderScore[a.category] || 5;
                const sb = orderScore[b.category] || 5;
                return sa - sb;
            });

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
            });

            row.appendChild(cell);
        });

        tableContainer.appendChild(row);
    });

    updateHighlights();
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
