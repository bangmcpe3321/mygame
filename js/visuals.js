/**
 * HỆ THỐNG ĐỒ HỌA SỬ THI HY LẠP CAO CẤP (HIGH-RES HEROIC GRAPHIC NOVEL & LAYERED SPRITES)
 * - Tích hợp tranh minh họa dã sử kĩ thuật số chất lượng cao (nét vẽ dứt khoát, biểu cảm sống động).
 * - Nhân vật anh hùng Odysseus với dáng đứng chỉ huy, ngón tay trỏ dứt khoát theo phong cách tranh mẫu.
 * - Quái thú Cyclops Polyphemus đầy đủ cơ bắp, giải phẫu, sẹo chiến tích, mắt rực lửa và chùy gỗ sồi.
 * - Đảo đá Sirens với rạn đá hiểm trở, sóng bạc đầu và quái điểu Siren nửa người nửa chim.
 * - Eo biển Scylla và Charybdis với 6 đầu rồng mãng xà rình rập trên vách đá Messina.
 */

class VisualEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStage = null;
        this.sailorJumpCount = 0;
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // ========================================================
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (POLYPHEMUS & ODYSSEUS)
    // ========================================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops-hd" id="stage-cyclops">
            <!-- NỀN HANG ĐÁ VÀ KHỦNG BỐ CỦA POLYPHEMUS TẢ THỰC -->
            <div class="cyclops-art-backdrop">
                <!-- KHỔNG LỒ CYCLOPS BÊN PHẢI -->
                <div class="monster-art-wrapper" id="polyphemus-monster">
                    <img src="assets/cyclops_polyphemus.jpg" alt="Cyclops Polyphemus" class="art-img-cyclops" />
                    <div class="cyclops-eye-glow-point" id="cyclops-eye-glow"></div>
                    <div class="cyclops-shadow-overlay"></div>
                </div>

                <!-- ODYSSEUS & ĐOÀN CHIẾN BINH BÊN TRÁI -->
                <div class="hero-art-wrapper" id="odysseus-hero-panel">
                    <img src="assets/odysseus_hero.jpg" alt="Vua Odysseus" class="art-img-odysseus" />
                    <div class="hero-command-aura"></div>
                </div>
            </div>

            <!-- LỚP HIỆU ỨNG TƯƠNG TÁC (TÀN TRO, LỬA TRẠI, NGỌN GIÁO, SẤM CHỚP) -->
            <svg class="scene-interactive-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="torchGlowDeep" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffaa00" stop-opacity="0.85"/>
                        <stop offset="40%" stop-color="#ff5500" stop-opacity="0.4"/>
                        <stop offset="85%" stop-color="#3d1505" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="bloodGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="30%" stop-color="#ff3333"/>
                        <stop offset="70%" stop-color="#aa0000"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="spearGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#d4af37"/>
                        <stop offset="70%" stop-color="#fff5cc"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                </defs>

                <!-- KHÔNG GIAN TỐI BỐI CẢNH & NHŨ ĐÁ RƠI -->
                <path d="M0,0 L80,120 L150,0 L260,140 L350,0 L520,130 L640,0 L820,140 L950,0 L1100,120 L1200,0 Z" 
                      fill="#0c0806" opacity="0.8" />

                <!-- ĐỐNG LỬA TRẠI TRUNG TÂM -->
                <circle cx="580" cy="430" r="160" fill="url(#torchGlowDeep)" class="torch-flicker" />
                <polygon points="560,450 580,380 600,450" fill="#ff4500" class="torch-flame" />
                <polygon points="570,448 580,400 590,448" fill="#ffbb00" class="torch-flame" />

                <!-- NGỌN GIÁO TẦN BÌ CỦA ODYSSEUS PHÓNG TỚI MẮT CYCLOPS -->
                <g id="greek-spear-thrust" opacity="0">
                    <line x1="280" y1="280" x2="880" y2="175" stroke="#784212" stroke-width="8" stroke-linecap="round"/>
                    <line x1="280" y1="280" x2="880" y2="175" stroke="url(#spearGold)" stroke-width="4" stroke-linecap="round"/>
                    <polygon points="880,175 925,165 890,190" fill="#ffffff" stroke="#d4af37" stroke-width="2.5"/>
                    <circle cx="910" cy="170" r="15" fill="#ffea00" filter="drop-shadow(0 0 10px #ffaa00)"/>
                </g>

                <!-- HIỆU ỨNG TIA CHỚP LÓA KHI ĐÂM TRÚNG MẮT -->
                <g id="cyclops-hit-impact" opacity="0">
                    <circle cx="895" cy="170" r="65" fill="url(#bloodGlow)" />
                    <line x1="830" y1="170" x2="960" y2="170" stroke="#fff" stroke-width="5"/>
                    <line x1="895" y1="105" x2="895" y2="235" stroke="#fff" stroke-width="5"/>
                    <line x1="850" y1="125" x2="940" y2="215" stroke="#ffeb3b" stroke-width="4"/>
                    <line x1="850" y1="215" x2="940" y2="125" stroke="#ffeb3b" stroke-width="4"/>
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM CỦA QUÁI THÚ -->
                <g id="cyclops-soundwaves" opacity="0">
                    <circle cx="895" cy="210" r="60" fill="none" stroke="#ff3300" stroke-width="5" class="wave-pulse"/>
                    <circle cx="895" cy="210" r="120" fill="none" stroke="#ff8800" stroke-width="4" class="wave-pulse"/>
                </g>

                <!-- CHÙY GỖ SỒI QUENH XUỐNG ĐẤT KHI TRẢ LỜI SAI -->
                <g id="cyclops-club-slam" opacity="0">
                    <ellipse cx="620" cy="460" rx="90" ry="25" fill="#ff2200" opacity="0.6"/>
                    <line x1="530" y1="460" x2="710" y2="460" stroke="#fff" stroke-width="6"/>
                    <circle cx="620" cy="450" r="50" fill="none" stroke="#ffaa00" stroke-width="4" class="wave-pulse"/>
                </g>
            </svg>

            <!-- THANH TRẠNG THÁI VÀ LỜI DẪN TƯƠNG TÁC -->
            <div class="stage-status-overlay">
                <span class="badge badge-cave">HANG ĐÁ NÚI ETNA</span>
                <span id="stage-action-text-1" class="action-caption">Polyphemus hung bạo chặn kín cửa hang! Odysseus vươn tay chỉ huy các dũng sĩ chuẩn bị cọc gỗ sồi nung đỏ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerCyclopsCorrect() {
        const spear = document.getElementById('greek-spear-thrust');
        const impact = document.getElementById('cyclops-hit-impact');
        const monster = document.getElementById('polyphemus-monster');
        const eyeGlow = document.getElementById('cyclops-eye-glow');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Odysseus chỉ huy đâm trúng mắt Cyclops! Polyphemus gầm rú quằn quại trong đau đớn!";
            text.className = "action-caption text-success";
        }

        if (spear) spear.classList.add('spear-strike-anim');
        if (impact) impact.style.opacity = '1';
        if (monster) monster.classList.add('monster-recoil-anim');
        if (eyeGlow) eyeGlow.classList.add('eye-damage-pulse');

        setTimeout(() => {
            if (spear) spear.classList.remove('spear-strike-anim');
            if (impact) impact.style.opacity = '0';
            if (monster) monster.classList.remove('monster-recoil-anim');
            if (eyeGlow) eyeGlow.classList.remove('eye-damage-pulse');
        }, 1400);
    }

    triggerCyclopsWrong() {
        const waves = document.getElementById('cyclops-soundwaves');
        const clubSlam = document.getElementById('cyclops-club-slam');
        const monster = document.getElementById('polyphemus-monster');
        const heroPanel = document.getElementById('odysseus-hero-panel');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "💥 <strong>SAI RỒI!</strong> Polyphemus gầm lên kinh thiên động địa, quất mạnh chùy gỗ sồi làm rung chuyển vách đá!";
            text.className = "action-caption text-danger";
        }

        if (monster) monster.classList.add('cyclops-slam-anim');
        if (waves) waves.style.opacity = '1';
        if (clubSlam) clubSlam.style.opacity = '1';
        if (heroPanel) heroPanel.classList.add('hero-stumble-anim');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (monster) monster.classList.remove('cyclops-slam-anim');
            if (waves) waves.style.opacity = '0';
            if (clubSlam) clubSlam.style.opacity = '0';
            if (heroPanel) heroPanel.classList.remove('hero-stumble-anim');
            this.container.classList.remove('screen-rumble');
        }, 1500);
    }

    triggerCyclopsFinalBlind(callback) {
        const text = document.getElementById('stage-action-text-1');
        const monster = document.getElementById('polyphemus-monster');
        const spear = document.getElementById('greek-spear-thrust');
        const impact = document.getElementById('cyclops-hit-impact');

        if (text) {
            text.innerHTML = "🏆 <strong>ĐẠI THẮNG!</strong> Cọc gỗ sồi nung đỏ đã đâm mù hoàn toàn mắt quái thú! Đoàn người trốn thoát dưới bụng đàn cừu!";
            text.className = "action-caption text-gold";
        }

        if (spear) spear.style.opacity = '1';
        if (impact) impact.style.opacity = '1';
        if (monster) monster.classList.add('cyclops-defeated-anim');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            this.container.classList.remove('screen-rumble');
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 2. THỬ THÁCH 2: ĐẢO ĐÁ SIRENS (SÓNG BIỂN & TIẾNG HÁT MÊ HOẶC)
    // ========================================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.clear();

        const html = `
        <div class="stage-view stage-sirens-hd" id="stage-sirens">
            <!-- NỀN TRANH MINH HỌA ĐẢO ĐÁ VÀ QUÁI ĐIỂU SIREN -->
            <div class="sirens-art-backdrop">
                <img src="assets/sirens_reef.jpg" alt="Đảo đá Sirens" class="art-img-sirens" />
                <div class="sirens-vignette-overlay"></div>
            </div>

            <!-- SOÁI HẠM HY LẠP TIẾN GIỮA LÀN NƯỚC -->
            <div class="trireme-ship-container" id="greek-trireme-ship">
                <img src="assets/greek_trireme.jpg" alt="Chiến thuyền Hy Lạp" class="art-img-trireme" />
                <!-- LÁ CHẮN SÁP ONG BẢO VỆ THỦY THỦ ĐOÀN -->
                <div class="wax-shield-bubble" id="wax-shield"></div>
            </div>

            <!-- LỚP TƯƠNG TÁC: SƯƠNG MÙ, NỐT NHẠC MA QUÁI, SÓNG BIỂN -->
            <svg class="scene-interactive-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="sirenSongPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ff00ea" stop-opacity="0.9"/>
                        <stop offset="50%" stop-color="#9d4edd" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
                    </linearGradient>
                </defs>

                <!-- LÀN SƯƠNG MÙ HUYỀN ẢO RẬP RỜN -->
                <g class="fog-drifting" opacity="0.65">
                    <ellipse cx="300" cy="240" rx="260" ry="60" fill="#a0c4ff" filter="blur(30px)"/>
                    <ellipse cx="850" cy="200" rx="300" ry="80" fill="#c77dff" filter="blur(40px)"/>
                </g>

                <!-- CÁC NỐT NHẠC TIẾNG HÁT MA MỊ VỌNG TỪ MỎM ĐÁ -->
                <g id="siren-notes" class="siren-notes-float">
                    <!-- Âm phù 1 -->
                    <g transform="translate(820, 160)">
                        <ellipse cx="10" cy="15" rx="8" ry="6" fill="#f72585"/>
                        <line x1="17" y1="15" x2="17" y2="-15" stroke="#f72585" stroke-width="2.5"/>
                        <path d="M17,-15 Q28,-18 25,-5" stroke="#f72585" stroke-width="2.5" fill="none"/>
                    </g>
                    <!-- Âm phù 2 -->
                    <g transform="translate(680, 120)">
                        <ellipse cx="10" cy="15" rx="9" ry="7" fill="#7209b7"/>
                        <line x1="18" y1="15" x2="18" y2="-18" stroke="#7209b7" stroke-width="3"/>
                        <line x1="32" y1="11" x2="32" y2="-22" stroke="#7209b7" stroke-width="3"/>
                        <line x1="18" y1="-18" x2="32" y2="-22" stroke="#7209b7" stroke-width="3"/>
                    </g>
                    <!-- Sóng âm thanh mê hoặc -->
                    <path d="M900,180 Q750,110 550,220 T250,230" fill="none" stroke="url(#sirenSongPurple)" stroke-width="6" stroke-dasharray="10 5" class="song-wave-pulse"/>
                </g>

                <!-- TIA SÁNG SÁP ONG LÓA LÊN KHI TRẢ LỜI ĐÚNG -->
                <g id="wax-sparkle-burst" opacity="0">
                    <circle cx="480" cy="300" r="140" fill="none" stroke="#ffd700" stroke-width="5" class="wave-pulse"/>
                    <circle cx="480" cy="300" r="70" fill="#fff5cc" opacity="0.8" filter="blur(6px)"/>
                </g>

                <!-- BỌT NƯỚC BẮN TUNG TÓE KHI SAI -->
                <g id="sea-spray-burst" opacity="0">
                    <circle cx="480" cy="360" r="45" fill="#4cc9f0" opacity="0.8"/>
                    <line x1="450" y1="360" x2="400" y2="300" stroke="#fff" stroke-width="4"/>
                    <line x1="510" y1="360" x2="560" y2="290" stroke="#fff" stroke-width="4"/>
                </g>
            </svg>

            <!-- BẢNG TRẠNG THÁI & LỜI DẪN -->
            <div class="stage-status-overlay">
                <span class="badge badge-siren">RẠN ĐÁ SIRENS HUYỀN BÍ</span>
                <span id="stage-action-text-2" class="action-caption">Tiếng hát mê hồn vang vọng khắp biển sâu! Odysseus bị trói chặt vào cột buồm, các thủy thủ bịt tai bằng sáp ong!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerSirensCorrect() {
        const shield = document.getElementById('wax-shield');
        const sparkles = document.getElementById('wax-sparkle-burst');
        const ship = document.getElementById('greek-trireme-ship');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "✨ <strong>CHÍNH XÁC!</strong> Sáp ong bảo vệ vững vàng màng nhĩ thủy thủ đoàn! Con thuyền anh dũng chém sóng vượt qua ma âm!";
            text.className = "action-caption text-success";
        }

        if (shield) shield.classList.add('shield-glow-active');
        if (sparkles) sparkles.style.opacity = '1';
        if (ship) ship.classList.add('ship-accelerating-anim');

        setTimeout(() => {
            if (shield) shield.classList.remove('shield-glow-active');
            if (sparkles) sparkles.style.opacity = '0';
            if (ship) ship.classList.remove('ship-accelerating-anim');
        }, 1300);
    }

    triggerSirensWrong() {
        const notes = document.getElementById('siren-notes');
        const spray = document.getElementById('sea-spray-burst');
        const ship = document.getElementById('greek-trireme-ship');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "😱 <strong>SAI RỒI!</strong> Ma âm xuyên thấu tâm can! Odysseus vùng vẫy muốn nhảy xuống biển, con thuyền chao đảo!";
            text.className = "action-caption text-danger";
        }

        if (notes) notes.classList.add('sirens-frenzy-anim');
        if (spray) spray.style.opacity = '1';
        if (ship) ship.classList.add('ship-panic-anim');
        this.container.classList.add('screen-flash-purple');

        setTimeout(() => {
            if (notes) notes.classList.remove('sirens-frenzy-anim');
            if (spray) spray.style.opacity = '0';
            if (ship) ship.classList.remove('ship-panic-anim');
            this.container.classList.remove('screen-flash-purple');
        }, 1400);
    }

    triggerSirensPassThrough(callback) {
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-trireme-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT QUA HIỂM NGUY!</strong> Tiếng hát Sirens lùi xa phía sau làn sương mù, đoàn thuyền an toàn thoát khỏi bẫy đá!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-escaping-anim');

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 3. THỬ THÁCH 3: EO BIỂN MESSINA (SCYLLA & CHARYBDIS)
    // ========================================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-scylla-hd" id="stage-scylla">
            <!-- TRANH MINH HỌA NỀN EO BIỂN MESSINA VÀ QUÁI THÚ 6 ĐẦU SCYLLA -->
            <div class="scylla-art-backdrop">
                <img src="assets/scylla_monster.jpg" alt="Scylla và Charybdis" class="art-img-scylla" id="scylla-backdrop-img" />
                <div class="scylla-storm-overlay"></div>
            </div>

            <!-- CON THUYỀN CHIẾN ĐẤU GIỮA BÃO TỐ -->
            <div class="scylla-ship-wrapper" id="scylla-ship">
                <img src="assets/greek_trireme.jpg" alt="Con thuyền rẽ sóng" class="art-img-strait-ship" />
                <!-- ODYSSEUS TUỐT GƯƠM BẢO VỆ MẠN THUYỀN -->
                <div class="hero-sword-fighter" id="odysseus-fighter"></div>
            </div>

            <!-- LỚP TƯƠNG TÁC: SẤM CHỚP, ĐẦU SCYLLA LAO XUỐNG, ĐƯỜNG KIẾM RẠCH TRỜI -->
            <svg class="scene-interactive-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="lightningGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="60%" stop-color="#00ffff"/>
                        <stop offset="100%" stop-color="#0066ff"/>
                    </linearGradient>
                </defs>

                <!-- VỰC XOÁY CHARYBDIS CUỘN TRÒN Ở GÓC DƯỚI -->
                <g transform="translate(980, 410) scale(1.2)" class="whirlpool-spin">
                    <ellipse cx="0" cy="0" rx="90" ry="32" fill="none" stroke="#003366" stroke-width="12"/>
                    <ellipse cx="0" cy="0" rx="60" ry="20" fill="none" stroke="#00ffff" stroke-width="7"/>
                    <ellipse cx="0" cy="0" rx="28" ry="10" fill="#000015"/>
                </g>

                <!-- TIA CHỚP RẠCH NGANG TRỜI -->
                <path id="storm-lightning" d="M720,0 L680,110 L730,130 L670,250" 
                      stroke="url(#lightningGlow)" stroke-width="4.5" fill="none" opacity="0"/>

                <!-- ĐẦU QUÁI THÚ SCYLLA THỨ NHẤT LAO XUỐNG NGOẠM -->
                <g id="scylla-striking-head" opacity="0">
                    <path d="M960,80 Q840,140 760,260" stroke="#1f4434" stroke-width="26" stroke-linecap="round" fill="none"/>
                    <path d="M960,80 Q840,140 760,260" stroke="#489069" stroke-width="14" stroke-linecap="round" fill="none"/>
                    <!-- Đầu rồng quái vật răng nanh nhọn hoắt -->
                    <g transform="translate(740, 260) rotate(45)">
                        <polygon points="0,0 55,-25 75,0 55,25" fill="#1b3d2f" stroke="#0b1a14" stroke-width="3"/>
                        <circle cx="45" cy="-8" r="5" fill="#ff0000" filter="drop-shadow(0 0 6px #ff0000)"/>
                        <!-- Răng nanh sắc lẹm -->
                        <polygon points="50,-10 65,0 50,-5" fill="#fff"/>
                        <polygon points="50,10 65,0 50,5" fill="#fff"/>
                    </g>
                </g>

                <!-- ĐƯỜNG KIẾM TUỐT VÀNG SẮC LỌM CỦA ODYSSEUS -->
                <g id="slash-arc" opacity="0">
                    <path d="M640,320 Q730,220 830,280" stroke="#ffd700" stroke-width="10" stroke-linecap="round" fill="none"/>
                    <path d="M640,320 Q730,220 830,280" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none"/>
                    <circle cx="750" cy="260" r="30" fill="#ffffff" opacity="0.85" filter="blur(4px)"/>
                </g>

                <!-- ĐIỂM VA CHẠM CẮN XÉ KHI TRẢ LỜI SAI -->
                <g id="bite-impact" opacity="0">
                    <circle cx="720" cy="330" r="45" fill="#ff0000" opacity="0.7" filter="blur(5px)"/>
                    <line x1="680" y1="300" x2="760" y2="360" stroke="#fff" stroke-width="6"/>
                    <line x1="760" y1="300" x2="680" y2="360" stroke="#fff" stroke-width="6"/>
                </g>
            </svg>

            <!-- BẢNG TRẠNG THÁI & LỜI DẪN -->
            <div class="stage-status-overlay">
                <span class="badge badge-scylla">EO BIỂN MESSINA TỬ ĐỊA</span>
                <span id="stage-action-text-3" class="action-caption">Một bên là vực xoáy Charybdis cuồn cuộn, một bên là 6 đầu rồng Scylla rình rập! Vung gươm bảo vệ con tàu!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerScyllaWrong() {
        const head = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const bite = document.getElementById('bite-impact');
        const lightning = document.getElementById('storm-lightning');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Đầu Scylla lao xuống ngoạm vỡ mạn thuyền! Thủy thủ đoàn hoảng loạn tột cùng!";
            text.className = "action-caption text-danger";
        }

        if (head) {
            head.style.opacity = '1';
            head.classList.add('scylla-head-dive-anim');
        }
        if (bite) bite.style.opacity = '1';
        if (ship) ship.classList.add('ship-bitten-anim');
        if (lightning) lightning.style.opacity = '1';
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (head) {
                head.style.opacity = '0';
                head.classList.remove('scylla-head-dive-anim');
            }
            if (bite) bite.style.opacity = '0';
            if (ship) ship.classList.remove('ship-bitten-anim');
            if (lightning) lightning.style.opacity = '0';
            this.container.classList.remove('screen-rumble');
        }, 1500);
    }

    triggerScyllaCorrect() {
        const slash = document.getElementById('slash-arc');
        const head = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const lightning = document.getElementById('storm-lightning');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚔️ <strong>XUẤT SẮC!</strong> Odysseus vung gươm chém đứt nanh vuốt Scylla, bảo toàn mạng sống các chiến binh!";
            text.className = "action-caption text-success";
        }

        if (slash) slash.style.opacity = '1';
        if (lightning) lightning.style.opacity = '1';
        if (head) {
            head.style.opacity = '1';
            head.classList.add('scylla-head-recoil-anim');
        }
        if (ship) ship.classList.add('ship-surge-anim');

        setTimeout(() => {
            if (slash) slash.style.opacity = '0';
            if (lightning) lightning.style.opacity = '0';
            if (head) {
                head.style.opacity = '0';
                head.classList.remove('scylla-head-recoil-anim');
            }
            if (ship) ship.classList.remove('ship-surge-anim');
        }, 1300);
    }

    triggerScyllaEscape(callback) {
        const text = document.getElementById('stage-action-text-3');
        const ship = document.getElementById('scylla-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng thoát khỏi Scylla và Charybdis, vươn mình ra đại dương bao la!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-full-escape-anim');

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }
}
