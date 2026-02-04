// Access global data from data.js

const state = {
    activeTrack: null,
    activeMD: null, // MD index
    activeGroup: null, // similar_id
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
    renderTable();
    setupEvents();
}

// 1. Render Top Filters
function renderFilters() {
    // Tracks
    trackContainer.innerHTML = '';
    tracks.forEach(track => {
        const btn = document.createElement('div');
        btn.className = 'filter-chip';
        btn.innerHTML = `<span style="font-weight:800; margin-right:4px; color:var(--accent-color)">${track.group_number}</span> ${track.title}`; 
        btn.onclick = () => {
            if (state.activeTrack === track.id) state.activeTrack = null;
            else {
                state.activeTrack = track.id;
                state.activeMD = null; // Exclusive
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
                state.activeTrack = null; // Exclusive
            }
            updateFilterState();
            updateHighlights();
        };
        mdContainer.appendChild(btn);
    });

    // --- "Show New" Toggle ---
    let toggleContainer = document.getElementById('new-toggle-container');
    if (!toggleContainer) {
        toggleContainer = document.createElement('div');
        toggleContainer.id = 'new-toggle-container';
        toggleContainer.className = 'controls';
        toggleContainer.style.marginLeft = 'auto'; // Right align if possible
        
        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '6px';
        label.style.fontSize = '0.85rem';
        label.style.fontWeight = '600';
        label.style.color = '#475569';
        label.style.cursor = 'pointer';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = state.showNew;
        checkbox.onchange = (e) => {
            state.showNew = e.target.checked;
            renderTable(); // Re-render table to remove items
        };

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode('Show New Courses (AI+X)'));
        toggleContainer.appendChild(label);

        // Append to header controls
        document.querySelector('.controls').appendChild(toggleContainer);
    }
}

function updateFilterState() {
    const trackChips = trackContainer.querySelectorAll('.filter-chip');
    trackChips.forEach((chip, i) => {
        const track = tracks[i];
        if (track.id === state.activeTrack) chip.classList.add('active');
        else chip.classList.remove('active');
    });

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
    
    // Semester Label Header
    const emptyCell = document.createElement('div');
    emptyCell.className = 'col-header semester-col';
    emptyCell.textContent = 'Sem';
    headerRow.appendChild(emptyCell);

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

        // Label
        const label = document.createElement('div');
        label.className = 'row-label';
        label.textContent = `${sem.g}-${sem.s}`;
        row.appendChild(label);

        // Dept Cells
        departments.forEach(dept => {
            const cell = document.createElement('div');
            cell.className = 'cell';

            // Filter courses
            const courses = courseData.filter(c => 
                c.dept === dept.id && 
                c.grade === sem.g && 
                c.semester === sem.s &&
                (state.showNew || !c.suggested) // Visibility Check
            );

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

                // --- Track & Similarity Badges ---
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'track-badges';
                
                // 1. Similarity Group Badge (The "Color" Group)
                if (course.similar_id && simNumberMap.has(course.similar_id)) {
                    const simNum = simNumberMap.get(course.similar_id);
                    const color = simColorMap.get(course.similar_id);
                    
                    const badge = document.createElement('span');
                    badge.className = 'track-badge sim-badge';
                    badge.textContent = simNum;
                    badge.style.backgroundColor = color;
                    badge.style.color = '#fff'; // White text for colored badges
                    badge.style.borderColor = color;
                    badge.title = `Similarity Group ${simNum} (Click to Filter)`;
                    
                    // Interaction
                    badge.style.cursor = 'pointer';
                    badge.onclick = (e) => {
                        e.stopPropagation(); // Stop card click
                        if (state.activeGroup === course.similar_id) {
                            state.activeGroup = null;
                        } else {
                            state.activeGroup = course.similar_id;
                            state.activeTrack = null;
                            state.activeMD = null;
                        }
                        updateFilterState();
                        updateHighlights();
                    };

                    badgeContainer.appendChild(badge);
                }

                // 2. Track Badges (The "Curriculum" Tracks)
                if (course.similar_id) {
                    const matchingTracks = tracks.filter(t => t.required_similars.includes(course.similar_id));
                    if (matchingTracks.length > 0) {
                        matchingTracks.sort((a,b) => a.group_number - b.group_number);
                        
                        matchingTracks.forEach(t => {
                            const badge = document.createElement('span');
                            badge.className = 'track-badge';
                            badge.textContent = `T${t.group_number}`; // Distinguish Track (T1) from Group (1)
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

    // Determine Similarity Colors
    // calculateSimilarityColors(); // Moved to init
    updateHighlights();
}

// 3. Logic & Highlights
const simColorMap = new Map();
const simNumberMap = new Map(); // Store group numbers for similar_ids
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

    // Sort to ensure deterministic numbering
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
    let specificSimilar = null;
    const hasActiveFilter = state.activeTrack || state.activeMD !== null || state.activeGroup;

    if (state.activeGroup) {
        specificSimilar = state.activeGroup;
    } else if (state.activeTrack) {
        const t = tracks.find(tr => tr.id === state.activeTrack);
        if(t) targetSimilars = new Set(t.required_similars);
    } else if (state.activeMD !== null) {
        const md = microDegrees[state.activeMD];
        if(md) targetSimilars = new Set(md.courses);
    }

    cards.forEach(card => {
        const sid = card.dataset.similar;

        // Reset visual state (keep .suggested class though)
        card.classList.remove('highlighted', 'dimmed', 'similar');
        card.style.backgroundColor = '';
        card.style.borderColor = ''; 
        // Note: borderColor reset might remove default border for suggested?
        // Let's re-apply empty to let CSS take over, or specific.
        
        // 1. Filter Logic
        if (hasActiveFilter) {
            let match = false;
            
            if (state.activeGroup) {
                match = (sid === state.activeGroup);
            } else {
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
                li.textContent = `${d.name} : ${s.name} (${s.grade}-${s.semester})`;
                list.appendChild(li);
            });
        } else {
            list.innerHTML = '<li>연계된 타 학과 과목이 없거나 현재 표에 없습니다.</li>';
        }
    } else {
        list.innerHTML = '<li>연계된 타 학과 과목이 없습니다.</li>';
    }

    // Modal Description Update ? 
    // Maybe add logic to show if it is "Suggested / New".
    if(course.suggested) {
        document.getElementById('modalDesc').textContent = 
            `* 이 과목은 AI+X 융합 교육과정을 위해 신설이 제안된 과목입니다.`;
        document.getElementById('modalDesc').style.color = 'var(--accent-color)';
    } else {
        document.getElementById('modalDesc').textContent = 
            `이 과목은 해당 트랙의 핵심 교과목입니다.`;
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
