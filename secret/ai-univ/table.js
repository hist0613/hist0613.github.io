// table.js — renderTable, drawSvgOverlay, calculateSimilarityColors,
//            updateHighlights, hexToRgba, applyCourseCatStyle
// Depends on: state, tableContainer (main.js), courseData (courses.js),
//             tracks, microDegrees, fusionMajors, departments (data.js)
//             renderTrackOverview, renderFacultyView, renderPBLView (views.js)

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

    // -- PBL view --
    if (state.viewMode === 'pbl') {
        renderPBLView();
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

    // 2. If a Track or MD is selected, further filter to only relevant departments
    if (state.activeTrack) {
        const track = tracks.find(t => t.id === state.activeTrack);
        if (track) {
            // Show: track's own dept + any AX partner depts (from fusionMajors) + General
            const partnerDepts = new Set(
                fusionMajors.filter(f => f.trackId === track.id).map(f => f.axPartnerDept)
            );
            displayDepts = displayDepts.filter(d =>
                d.id === track.dept || partnerDepts.has(d.id) || d.group === 'General'
            );
        }
    } else if (state.activeMD !== null) {
        const md = microDegrees[state.activeMD];
        if (md) {
            const fm = fusionMajors.find(f => f.id === md.fusion);
            if (fm) {
                const track = tracks.find(t => t.id === fm.trackId);
                const aiDeptId = track ? track.dept : null;
                displayDepts = displayDepts.filter(d =>
                    d.id === fm.axPartnerDept || d.id === aiDeptId || d.group === 'General'
                );
            }
        }
    }

    // 3. Sort Order: General -> AI -> AX_A -> AX_B
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

    // Pre-compute course filter set (show set) for active track / MD
    let trackSimSet = null;   // Set<similar_id> — courses to show

    function buildTrackSimSet(trackId) {
        const t = tracks.find(tr => tr.id === trackId);
        if (!t) return null;
        const set = new Set(t.required_similars);
        fusionMajors.filter(f => f.trackId === t.id).forEach(fm => {
            fm.mds.forEach(mdId => {
                const md = microDegrees.find(m => m.id === mdId);
                if (md) md.courses.forEach(sid => set.add(sid));
            });
        });
        return set;
    }

    if (state.activeTrack) {
        trackSimSet = buildTrackSimSet(state.activeTrack);
    } else if (state.activeMD !== null) {
        // MD 단독: 연결된 Track 전체를 backdrop으로 보여주고 MD만 highlight
        const md = microDegrees[state.activeMD];
        if (md) {
            const fm = fusionMajors.find(f => f.id === md.fusion);
            if (fm) trackSimSet = buildTrackSimSet(fm.trackId);
        }
    }

    // Populate Cell Map first
    displayDepts.forEach((dept, colIdx) => {
        semesters.forEach(sem => {
            const key = `${dept.id},${sem.g},${sem.s}`;
            const courses = courseData.filter(c => {
                if (c.dept !== dept.id) return false;
                if (c.grade !== sem.g || c.semester !== sem.s) return false;
                if (!state.showNew && c.suggested) return false;
                if (trackSimSet) {
                    return trackSimSet.has(c.similar_id);
                }
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

    // 3. 컬럼별 최대 과목 수를 구해 2개 이상인 컬럼만 2배 너비로 확장
    const maxPerDept = displayDepts.map(dept => {
        let max = 0;
        semesters.forEach(sem => {
            const n = (cellMap.get(`${dept.id},${sem.g},${sem.s}`) || []).length;
            if (n > max) max = n;
        });
        return max;
    });

    tableContainer.style.removeProperty('gridTemplateColumns');

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

                const allBadges = [];

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
                    allBadges.push(badge);
                }

                // 2. Track Badges — 이 학과(dept.id) 소속 트랙만 표시
                if (course.similar_id) {
                    const matchingTracks = tracks.filter(t =>
                        t.required_similars.includes(course.similar_id) && t.dept === dept.id
                    );
                    matchingTracks.sort((a, b) => a.group_number - b.group_number);
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
                        allBadges.push(badge);
                    });
                }

                // Render: MAX_VISIBLE 초과 시 "+N" 펼치기 버튼
                const MAX_VISIBLE = 5;
                if (allBadges.length > MAX_VISIBLE) {
                    allBadges.slice(0, MAX_VISIBLE).forEach(b => badgeContainer.appendChild(b));
                    const moreBtn = document.createElement('span');
                    moreBtn.className = 'track-badge track-badge-more';
                    moreBtn.textContent = `+${allBadges.length - MAX_VISIBLE}`;
                    moreBtn.onclick = (e) => {
                        e.stopPropagation();
                        moreBtn.remove();
                        allBadges.slice(MAX_VISIBLE).forEach(b => badgeContainer.appendChild(b));
                        badgeContainer.classList.add('expanded');
                    };
                    badgeContainer.appendChild(moreBtn);
                } else {
                    allBadges.forEach(b => badgeContainer.appendChild(b));
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
    requestAnimationFrame(() => { drawSvgOverlay(); });
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

function updateHighlights() {
    const cards = document.querySelectorAll('.course-card');
    
    // Check active requirements
    let targetSimilars = new Set();
    const hasActiveFilter = state.activeTrack || state.activeMD !== null || state.activeGroup || state.activeLayer;

    // Determine highlight color (track color when track/MD active)
    let highlightColor = null;
    if (state.activeGroup) {
        targetSimilars.add(state.activeGroup);
    } else if (state.activeMD !== null) {
        // MD highlight — Track 위에 overlay (Track 선택 여부 무관)
        const md = microDegrees[state.activeMD];
        if (md) {
            targetSimilars = new Set(md.courses);
            const fm = fusionMajors.find(f => f.id === md.fusion);
            const relatedTrack = fm ? tracks.find(t => t.id === fm.trackId) : null;
            const colorSource = state.activeTrack
                ? tracks.find(t => t.id === state.activeTrack)
                : relatedTrack;
            highlightColor = colorSource ? colorSource.color : null;
        }
    } else if (state.activeTrack) {
        const t = tracks.find(tr => tr.id === state.activeTrack);
        if (t) { targetSimilars = new Set(t.required_similars); highlightColor = t.color; }
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
                match = (layer === state.activeLayer);
                if (match && state.activeLayerTag) match = (layerTag === state.activeLayerTag);
            } else if (state.activeGroup) {
                match = (sid === state.activeGroup);
            } else {
                match = (sid && targetSimilars.has(sid));
            }

            if (match) {
                card.classList.add('highlighted');
                if (highlightColor) {
                    card.style.backgroundColor = hexToRgba(highlightColor, 0.18);
                    card.style.borderColor = hexToRgba(highlightColor, 0.65);
                }
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

// Expose for testing
window.simColorMap = simColorMap;
window.simNumberMap = simNumberMap;
window.hexToRgba = hexToRgba;
window.calculateSimilarityColors = calculateSimilarityColors;
window.renderTable = renderTable;
window.drawSvgOverlay = drawSvgOverlay;
window.updateHighlights = updateHighlights;
