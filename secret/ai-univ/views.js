// views.js — renderTrackOverview, renderFacultyView, renderPBLView
// Depends on: state, tableContainer (main.js), courseData (courses.js),
//             departmentTracks, pblData, companyProfiles, departments, tracks (data.js)
//             applyCourseCatStyle (table.js)

function renderPBLView() {
    tableContainer.innerHTML = '';
    tableContainer.classList.add('track-overview-mode');

    const wrapper = document.createElement('div');
    wrapper.className = 'pbl-wrapper';

    const hdr = document.createElement('div');
    hdr.className = 'pbl-header';
    hdr.innerHTML = `
        <div class="track-overview-title">
            <h2>PBL 교과목 <span class="track-overview-badge">26년 기준</span></h2>
            <p>12개 트랙별 기업멘토 참여 산학협력 PBL 교과목입니다. 이수구분: 트랙 필수 (L2~L3, 3학점) | 트랙당 협력기업 2개사.</p>
        </div>
    `;
    wrapper.appendChild(hdr);

    departmentTracks.forEach(deptData => {
        const section = document.createElement('div');
        section.className = 'pbl-dept-section';

        const secHdr = document.createElement('div');
        secHdr.className = 'faculty-section-header';
        secHdr.innerHTML = `
            <div class="faculty-dept-badge" style="background:${deptData.color}">AI 전공</div>
            <h3 class="faculty-dept-name" style="color:${deptData.color}">${deptData.deptName}</h3>
        `;
        section.appendChild(secHdr);

        const grid = document.createElement('div');
        grid.className = 'pbl-cards-grid';

        deptData.tracks.forEach(track => {
            const pbl = pblData[track.number];
            if (!pbl) return;

            const card = document.createElement('div');
            card.className = 'pbl-card';
            card.style.setProperty('--pbl-color', deptData.color);

            const companiesHtml = pbl.companies.map(c => {
                const profile = companyProfiles[c] || '';
                const isMarumAI = c === '마음AI';
                return `<span class="pbl-card-company${isMarumAI ? ' pbl-company-highlight' : ''}" title="${profile}">
                    ${c}${isMarumAI ? ' <span class="pbl-worv-badge">WoRV</span>' : ''}
                </span>`;
            }).join('<span class="pbl-x">×</span>');

            card.innerHTML = `
                <div class="pbl-card-header" style="background:${deptData.color}">
                    <span class="pbl-track-num">T${track.number}</span>
                    <span class="pbl-track-name">${track.name}</span>
                </div>
                <div class="pbl-card-body">
                    <div class="pbl-course-name">${pbl.courseName}</div>
                    <div class="pbl-companies">${companiesHtml}</div>
                    <p class="pbl-objective">${pbl.objective}</p>
                    <details class="pbl-details">
                        <summary>교과목 내용 보기</summary>
                        <p class="pbl-content">${pbl.content}</p>
                    </details>
                </div>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        wrapper.appendChild(section);
    });

    tableContainer.appendChild(wrapper);
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
            <h2>참여 교수진 <span class="track-overview-badge">26년 기준</span></h2>
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

            card.innerHTML = `
                <div class="faculty-card-top">
                    <div class="faculty-avatar" style="background:${deptColor}22; color:${deptColor}; border:2px solid ${deptColor}44">
                        ${f.name.charAt(0)}
                    </div>
                    <div class="faculty-card-info">
                        <div class="faculty-name">${f.name}${f.role ? ` <span class="faculty-role-badge">${f.role}</span>` : ''}</div>
                        <div class="faculty-pos" style="color:#1e293b">${f.position}</div>
                        ${f.deptNote ? `<div class="faculty-dept-note">${f.deptNote}</div>` : ''}
                    </div>
                </div>
                ${f.major ? `<div class="faculty-major"><span class="faculty-major-label">전공</span> ${f.major}</div>` : ''}
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
            <h2>AI 전공 트랙 체계 <span class="track-overview-badge">26년 기준</span></h2>
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

            // PBL strip
            const pbl = pblData[track.number];
            if (pbl) {
                const strip = document.createElement('div');
                strip.className = 'track-pbl-strip';
                strip.innerHTML = `
                    <div class="pbl-strip-top">
                        <span class="pbl-strip-label">PBL</span>
                        <span class="pbl-strip-course">${pbl.courseName}</span>
                    </div>
                    <div class="pbl-strip-companies">
                        ${pbl.companies.map(c => `<span class="pbl-company-chip" title="${companyProfiles[c] || ''}">${c}</span>`).join('<span class="pbl-x">×</span>')}
                    </div>
                `;
                card.appendChild(strip);
            }

            cardsRow.appendChild(card);
        });

        section.appendChild(cardsRow);
        wrapper.appendChild(section);
    });

    tableContainer.appendChild(wrapper);
}

// Expose for testing
window.renderPBLView = renderPBLView;
window.renderFacultyView = renderFacultyView;
window.renderTrackOverview = renderTrackOverview;
