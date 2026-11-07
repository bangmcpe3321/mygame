/**
 * HỆ THỐNG ĐỒ HỌA SỬ THI HY LẠP: TRANH DÃ SỬ AI ĐA KHUNG HÌNH (2-3 ACTION FRAMES)
 * - Sử dụng tranh minh họa AI sắc nét, phân chia thành 2-3 khung hình (Comic Action Panels) độc lập.
 * - Khung hình không bị đè hay chèn vào nhau, hoàn toàn tách biệt khỏi khung câu hỏi.
 * - Hiệu ứng tương tác hành động giữa các khung hình: Mũi giáo lửa đâm xuyên, khiên sáp ong phản đòn, nhát chém sấm sét.
 * - Màn 3 hoàn toàn không có xoáy nước: Chiến thuyền Hy Lạp đối đầu trực tiếp Quái vật 6 đầu Scylla.
 */

class VisualEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStage = null;
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // ========================================================
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (2 KHUNG HÌNH HÀNH ĐỘNG)
    // ========================================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-panels-view" id="stage-cyclops">
            <!-- 2 KHUNG HÌNH TRANH AI TÁCH BIỆT RÕ RÀNG -->
            <div class="stage-frame-grid">
                <!-- FRAME 1 (TRÁI): ANH HÙNG ODYSSEUS & LIÊN QUÂN HY LẠP -->
                <div class="action-frame frame-left" id="frame-hero">
                    <div class="frame-media-wrap">
                        <img src="assets/odysseus_hero.jpg" alt="Vua Odysseus" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                        <div class="frame-aura-fx" id="aura-frame-hero"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">⚔️</span>
                        <span class="tag-text">ODYSSEUS & CHIẾN BINH</span>
                    </div>
                </div>

                <!-- KHU VỰC GIAO TRANH / ĐỐI ĐẦU Ở GIỮA -->
                <div class="frame-clash-divider" id="frame-clash-divider">
                    <div class="clash-icon">⚡</div>
                </div>

                <!-- FRAME 2 (PHẢI): GÃ KHỔNG LỒ CYCLOPS POLYPHEMUS -->
                <div class="action-frame frame-right" id="frame-monster">
                    <div class="frame-media-wrap">
                        <img src="assets/cyclops_polyphemus.jpg" alt="Cyclops Polyphemus" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                        <div class="cyclops-eye-glow-point" id="cyclops-eye-glow"></div>
                        <div class="frame-aura-fx" id="aura-frame-monster"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">👁️</span>
                        <span class="tag-text">KHỔNG LỒ POLYPHEMUS</span>
                    </div>
                </div>
            </div>

            <!-- LỚP TƯƠNG TÁC SVG NỐI GIỮA 2 KHUNG HÌNH (MŨI GIÁO LỬA LAO QUA & TIA LỬA) -->
            <svg class="frame-interactive-svg" viewBox="0 0 1000 480" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="spearLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#ffd700" stop-opacity="0.2"/>
                        <stop offset="60%" stop-color="#ff7b00" stop-opacity="0.9"/>
                        <stop offset="90%" stop-color="#ff2200"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                    <radialGradient id="bloodSparks" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="30%" stop-color="#ffff00"/>
                        <stop offset="60%" stop-color="#ff0000"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <!-- ĐƯỜNG PHÓNG CỌC GỖ NUNG ĐỎ XUYÊN QUA 2 KHUNG HÌNH -->
                <g id="cyclops-spear-beam" opacity="0">
                    <line x1="220" y1="230" x2="780" y2="180" stroke="url(#spearLaser)" stroke-width="8" stroke-linecap="round"/>
                    <line x1="220" y1="230" x2="780" y2="180" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="780" cy="180" r="18" fill="#ffffaa" filter="drop-shadow(0 0 15px #ffaa00)"/>
                </g>

                <!-- VẾT ĐÂM & CHỚP NỔ MẮT TRÊN FRAME 2 -->
                <g id="cyclops-hit-burst" opacity="0">
                    <circle cx="780" cy="180" r="60" fill="url(#bloodSparks)" />
                    <line x1="720" y1="180" x2="840" y2="180" stroke="#fff" stroke-width="5"/>
                    <line x1="780" y1="120" x2="780" y2="240" stroke="#fff" stroke-width="5"/>
                    <line x1="740" y1="140" x2="820" y2="220" stroke="#ffeb3b" stroke-width="4"/>
                    <line x1="740" y1="220" x2="820" y2="140" stroke="#ffeb3b" stroke-width="4"/>
                </g>

                <!-- SÓNG CHẤN ĐỘNG KHI CYCLOPS ĐẬP CHÙY XUỐNG -->
                <g id="cyclops-ground-shock" opacity="0">
                    <circle cx="780" cy="300" r="70" fill="none" stroke="#ff4500" stroke-width="6" class="wave-pulse"/>
                    <circle cx="780" cy="300" r="140" fill="none" stroke="#ffaa00" stroke-width="4" class="wave-pulse"/>
                </g>
            </svg>

            <!-- THANH TRẠNG THÁI HÀNH ĐỘNG -->
            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text-1" class="action-caption">Polyphemus đang chặn lối ra! Odysseus cùng các chiến binh giương cọc gỗ nung đỏ sẵn sàng tấn công!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerCyclopsCorrect() {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const beam = document.getElementById('cyclops-spear-beam');
        const burst = document.getElementById('cyclops-hit-burst');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Cọc gỗ nung đỏ đâm trúng mắt Cyclops! Polyphemus quằn quại gầm thét trong đau đớn!";
            text.className = "action-caption text-success";
        }

        if (frameHero) frameHero.classList.add('frame-active-strike');
        if (beam) beam.style.opacity = '1';

        setTimeout(() => {
            if (burst) burst.style.opacity = '1';
            if (frameMonster) frameMonster.classList.add('frame-damaged');
        }, 150);

        setTimeout(() => {
            if (beam) beam.style.opacity = '0';
            if (burst) burst.style.opacity = '0';
            if (frameHero) frameHero.classList.remove('frame-active-strike');
            if (frameMonster) frameMonster.classList.remove('frame-damaged');
        }, 1400);
    }

    triggerCyclopsWrong() {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const shock = document.getElementById('cyclops-ground-shock');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "💥 <strong>SAI RỒI!</strong> Polyphemus gầm lên long trời lở đất, vung chùy gỗ sồi quất mạnh làm rung chuyển cả hang!";
            text.className = "action-caption text-danger";
        }

        if (frameMonster) frameMonster.classList.add('frame-active-strike');
        if (shock) shock.style.opacity = '1';
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (frameHero) frameHero.classList.add('frame-damaged');
        }, 200);

        setTimeout(() => {
            if (frameMonster) frameMonster.classList.remove('frame-active-strike');
            if (frameHero) frameHero.classList.remove('frame-damaged');
            if (shock) shock.style.opacity = '0';
            this.container.classList.remove('screen-rumble');
        }, 1500);
    }

    triggerCyclopsFinalBlind(callback) {
        const frameMonster = document.getElementById('frame-monster');
        const frameHero = document.getElementById('frame-hero');
        const beam = document.getElementById('cyclops-spear-beam');
        const burst = document.getElementById('cyclops-hit-burst');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "🏆 <strong>ĐẠI THẮNG!</strong> Cọc gỗ nung đỏ đâm mù mắt quái thú! Đoàn người Odysseus an toàn trốn thoát!";
            text.className = "action-caption text-gold";
        }

        if (beam) beam.style.opacity = '1';
        if (burst) burst.style.opacity = '1';
        if (frameHero) frameHero.classList.add('frame-active-strike');
        if (frameMonster) frameMonster.classList.add('frame-defeated');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            this.container.classList.remove('screen-rumble');
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 2. THỬ THÁCH 2: ĐẢO ĐÁ SIRENS (2 KHUNG HÌNH HÀNH ĐỘNG)
    // ========================================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.clear();

        const html = `
        <div class="stage-view stage-panels-view" id="stage-sirens">
            <div class="stage-frame-grid">
                <!-- FRAME 1 (TRÁI): CHIẾN THUYỀN GREEK TRIREME & ODYSSEUS -->
                <div class="action-frame frame-left" id="frame-hero">
                    <div class="frame-media-wrap">
                        <img src="assets/greek_trireme.jpg" alt="Chiến thuyền Hy Lạp" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                        <div class="wax-shield-bubble" id="wax-shield-overlay"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">⛵</span>
                        <span class="tag-text">CHIẾN THUYỀN TRIREME</span>
                    </div>
                </div>

                <div class="frame-clash-divider">
                    <div class="clash-icon">🌊</div>
                </div>

                <!-- FRAME 2 (PHẢI): RẠN ĐÁ MA MỊ CỦA NÀNG TIÊN CÁ SIRENS -->
                <div class="action-frame frame-right" id="frame-monster">
                    <div class="frame-media-wrap">
                        <img src="assets/sirens_reef.jpg" alt="Rạn đá Sirens" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                        <div class="sirens-purple-mist" id="sirens-mist-overlay"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">🧜‍♀️</span>
                        <span class="tag-text">RẠN ĐÁ MA MỊ SIRENS</span>
                    </div>
                </div>
            </div>

            <!-- HIỆU ỨNG NỐT NHẠC TÍM VÀ LÁ CHẮN SÁP ONG XUYÊN KHUNG HÌNH -->
            <svg class="frame-interactive-svg" viewBox="0 0 1000 480" preserveAspectRatio="none">
                <!-- DÒNG NỐT NHẠC MA MỊ TỪ FRAME 2 BAY SANG FRAME 1 -->
                <g id="siren-sound-waves" class="siren-notes-stream">
                    <text x="750" y="160" font-size="28" fill="#e056fd" font-family="Cinzel, serif" opacity="0.85">♪</text>
                    <text x="620" y="210" font-size="34" fill="#be2edd" font-family="Cinzel, serif" opacity="0.9">♫</text>
                    <text x="490" y="170" font-size="30" fill="#f368e0" font-family="Cinzel, serif" opacity="0.8">♬</text>
                    <text x="360" y="220" font-size="38" fill="#e056fd" font-family="Cinzel, serif" opacity="0.85">𝄞</text>
                </g>

                <!-- LÁ CHẮN SÁP ONG VÀNG RỰC TRÊN FRAME 1 (KHI ĐÚNG) -->
                <g id="wax-shield-barrier" opacity="0">
                    <ellipse cx="260" cy="240" rx="200" ry="160" fill="none" stroke="#f1c40f" stroke-width="6" filter="drop-shadow(0 0 20px #f39c12)"/>
                    <ellipse cx="260" cy="240" rx="190" ry="150" fill="rgba(241, 196, 15, 0.15)"/>
                </g>

                <!-- TIA NƯỚC THỦY THỦ LAO XUỐNG BIỂN (KHI SAI) -->
                <g id="sailor-splash" opacity="0" transform="translate(320, 340)">
                    <path d="M-25,0 Q-15,-40 0,-10 Q15,-50 30,-5 Q45,-35 60,0 Z" fill="#ffffff" opacity="0.9"/>
                    <circle cx="-15" cy="-25" r="4" fill="#81ecec"/>
                    <circle cx="20" cy="-35" r="5" fill="#81ecec"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-sirens">VÙNG BIỂN TỬ THẦN SIRENS</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang vang vọng! Thủy thủ đoàn dùng sáp ong bịt tai, con thuyền quyết vượt qua rạn đá!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerSirensCorrect() {
        const frameHero = document.getElementById('frame-hero');
        const barrier = document.getElementById('wax-shield-barrier');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Sáp ong bảo vệ đôi tai thủy thủ! Lá chắn hoàng kim đẩy lùi khúc ca mê hoặc!";
            text.className = "action-caption text-success";
        }

        if (frameHero) frameHero.classList.add('frame-active-strike');
        if (barrier) {
            barrier.style.opacity = '1';
            barrier.classList.add('wax-shield-anim');
        }

        setTimeout(() => {
            if (barrier) barrier.style.opacity = '0';
            if (frameHero) frameHero.classList.remove('frame-active-strike');
        }, 1500);
    }

    triggerSirensWrong() {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const splash = document.getElementById('sailor-splash');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "❌ <strong>SAI RỒI!</strong> Tiếng hát mê hồn len lỏi vào tâm trí, một thủy thủ lao mình xuống làn sóng dữ!";
            text.className = "action-caption text-danger";
        }

        if (frameMonster) frameMonster.classList.add('frame-active-strike');
        if (frameHero) frameHero.classList.add('frame-damaged');

        setTimeout(() => {
            if (splash) splash.style.opacity = '1';
        }, 300);

        setTimeout(() => {
            if (frameMonster) frameMonster.classList.remove('frame-active-strike');
            if (frameHero) frameHero.classList.remove('frame-damaged');
            if (splash) splash.style.opacity = '0';
        }, 1500);
    }

    triggerSirensPassThrough(callback) {
        const frameHero = document.getElementById('frame-hero');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT QUA HIỂM NGUY!</strong> Tiếng hát Sirens xa dần sau làn sương, con thuyền vững vàng vượt qua bẫy đá!";
            text.className = "action-caption text-gold";
        }

        if (frameHero) frameHero.classList.add('frame-active-strike');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }

    // ========================================================
    // 3. THỬ THÁCH 3: EO BIỂN SCYLLA (HOÀN TOÀN KHÔNG CÓ XOÁY NƯỚC)
    // ========================================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-panels-view" id="stage-scylla">
            <div class="stage-frame-grid">
                <!-- FRAME 1 (TRÁI): CHIẾN THUYỀN VÀ ODYSSEUS TUỐT GƯƠM -->
                <div class="action-frame frame-left" id="frame-hero">
                    <div class="frame-media-wrap">
                        <img src="assets/greek_trireme.jpg" alt="Con tàu Odysseus" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">🛡️</span>
                        <span class="tag-text">CON TÀU ODYSSEUS</span>
                    </div>
                </div>

                <div class="frame-clash-divider">
                    <div class="clash-icon">⚔️</div>
                </div>

                <!-- FRAME 2 (PHẢI): QUÁI VẬT SÁU ĐẦU SCYLLA TỪ HANG NÚI - KHÔNG XOÁY NƯỚC -->
                <div class="action-frame frame-right" id="frame-monster">
                    <div class="frame-media-wrap">
                        <img src="assets/scylla_monster.jpg" alt="Quái vật Scylla" class="frame-art-img" />
                        <div class="frame-vignette"></div>
                    </div>
                    <div class="frame-header-tag">
                        <span class="tag-icon">🐉</span>
                        <span class="tag-text">QUÁI VẬT SÁU ĐẦU SCYLLA</span>
                    </div>
                </div>
            </div>

            <!-- HIỆU ỨNG NHÁT CHÉM SẤM SÉT VÀ ĐÒN TẤN CÔNG -->
            <svg class="frame-interactive-svg" viewBox="0 0 1000 480" preserveAspectRatio="none">
                <!-- NHÁT CHÉM SÁNG RỰC CỦA ODYSSEUS TỪ FRAME 1 CHÉM SANG FRAME 2 -->
                <g id="scylla-sword-slash" opacity="0">
                    <path d="M420,280 Q560,170 720,130" stroke="#00d2d3" stroke-width="9" stroke-linecap="round" fill="none" filter="drop-shadow(0 0 20px #54a0ff)"/>
                    <path d="M420,280 Q560,170 720,130" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
                    <!-- Chớp sáng khi chém trúng đầu rồng -->
                    <circle cx="720" cy="130" r="45" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 0 25px #00d2d3)"/>
                </g>

                <!-- ĐÒN ĐỚP MẠNH CỦA SCYLLA (KHI TRẢ LỜI SAI) -->
                <g id="scylla-bite-fx" opacity="0">
                    <circle cx="380" cy="240" r="50" fill="#e74c3c" opacity="0.85"/>
                    <line x1="330" y1="190" x2="430" y2="290" stroke="#fff" stroke-width="6"/>
                    <line x1="430" y1="190" x2="330" y2="290" stroke="#fff" stroke-width="6"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-scylla">EO BIỂN SCYLLA TỬ ĐỊA</span>
                <span id="stage-action-text-3" class="action-caption">Quái vật sáu đầu Scylla rình rập trên vách đá tăm tối! Odysseus tuốt gươm thép bảo vệ con thuyền!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerScyllaCorrect() {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const slash = document.getElementById('scylla-sword-slash');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Nhát kiếm thép sấm sét của Odysseus chém bật nhát cắn Scylla! Quái thú rụt đầu thét gào!";
            text.className = "action-caption text-success";
        }

        if (frameHero) frameHero.classList.add('frame-active-strike');
        if (slash) slash.style.opacity = '1';

        setTimeout(() => {
            if (frameMonster) frameMonster.classList.add('frame-damaged');
        }, 120);

        setTimeout(() => {
            if (slash) slash.style.opacity = '0';
            if (frameHero) frameHero.classList.remove('frame-active-strike');
            if (frameMonster) frameMonster.classList.remove('frame-damaged');
        }, 1300);
    }

    triggerScyllaWrong() {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const bite = document.getElementById('scylla-bite-fx');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "❌ <strong>SAI RỒI!</strong> Scylla bổ nhào xuống ngoạm nát mạn thuyền, rình rập thủy thủ đoàn!";
            text.className = "action-caption text-danger";
        }

        if (frameMonster) frameMonster.classList.add('frame-active-strike');
        if (bite) bite.style.opacity = '1';
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (frameHero) frameHero.classList.add('frame-damaged');
        }, 150);

        setTimeout(() => {
            if (bite) bite.style.opacity = '0';
            if (frameMonster) frameMonster.classList.remove('frame-active-strike');
            if (frameHero) frameHero.classList.remove('frame-damaged');
            this.container.classList.remove('screen-rumble');
        }, 1400);
    }

    triggerScyllaEscape(callback) {
        const frameHero = document.getElementById('frame-hero');
        const frameMonster = document.getElementById('frame-monster');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng xé sóng thoát khỏi Scylla, vươn mình ra biển lớn bình minh!";
            text.className = "action-caption text-gold";
        }

        if (frameHero) frameHero.classList.add('frame-active-strike');
        if (frameMonster) frameMonster.classList.add('frame-defeated');

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }
}
