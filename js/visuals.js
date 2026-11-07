/**
 * HỆ THỐNG ĐỒ HỌA SỬ THI HY LẠP: STICKMAN CHI TIẾT (EPIC STICKMAN ART STYLE)
 * - 100% Vector SVG sắc nét, mượt mà, không bao giờ bị chèn hay tràn vào bảng câu hỏi.
 * - Nhân vật người que chiến binh Hy Lạp với đầy đủ chi tiết:
 *   + Mũ Corinthian mạ vàng mào lông đỏ, giáp ngực cơ bắp, áo choàng đỏ tung bay.
 *   + Biểu cảm khuôn mặt sống động (mắt rực lửa chiến trận, miệng gào thét xung trận / đau đớn).
 *   + Khiên tròn Hoplon chữ Lambda (Λ), giáo Dory mũi đồng và gươm Xiphos sáng loáng.
 * - Quái thú Cyclops Polyphemus khổng lồ với 1 mắt to rực lửa, mồm nanh gầm thét, chùy gai gỗ sồi.
 * - Đảo đá Sirens với mỹ nhân người que có cánh chim, nốt nhạc ma thuật tím, Odysseus bị trói cột buồm.
 * - Eo biển Scylla với quái vật 6 đầu rồng mãng xà rình mập vách đá (HOÀN TOÀN KHÔNG CÓ XOÁY NƯỚC).
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
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (POLYPHEMUS vs CHIẾN BINH NGƯỜI QUE)
    // ========================================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops-stickman" id="stage-cyclops">
            <svg class="scene-svg" viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <!-- Ánh lửa đuốc & đống lửa trại -->
                    <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffbb00" stop-opacity="0.9"/>
                        <stop offset="40%" stop-color="#ff4400" stop-opacity="0.4"/>
                        <stop offset="85%" stop-color="#1a0800" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="caveBackdrop" cx="50%" cy="40%" r="65%">
                        <stop offset="0%" stop-color="#2a2018"/>
                        <stop offset="60%" stop-color="#140f0c"/>
                        <stop offset="100%" stop-color="#080605"/>
                    </radialGradient>
                    <!-- Mắt đỏ rực của Cyclops -->
                    <radialGradient id="cyclopsEyeGrad" cx="45%" cy="45%" r="55%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="25%" stop-color="#ffea00"/>
                        <stop offset="65%" stop-color="#ff2200"/>
                        <stop offset="100%" stop-color="#550000"/>
                    </radialGradient>
                    <!-- Ánh kim loại giáp & khiên Hy Lạp -->
                    <linearGradient id="goldArmor" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#ffe066"/>
                        <stop offset="50%" stop-color="#d4af37"/>
                        <stop offset="100%" stop-color="#996515"/>
                    </linearGradient>
                    <linearGradient id="spearShaft" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#8b5a2b"/>
                        <stop offset="50%" stop-color="#cd853f"/>
                        <stop offset="100%" stop-color="#5c3a21"/>
                    </linearGradient>
                </defs>

                <!-- Vách hang đá tối sầm -->
                <rect width="1000" height="480" fill="url(#caveBackdrop)" />

                <!-- Nhũ đá nhọn hoắt trên trần hang -->
                <path d="M0,0 L50,90 L90,0 L160,120 L210,0 L310,85 L360,0 L480,110 L540,0 L660,130 L720,0 L850,95 L910,0 L1000,115 L1000,0 Z" fill="#18120e" />
                <path d="M30,0 L80,70 L110,0 L180,75 L220,0 L400,60 L440,0 L600,85 L640,0 L800,65 L840,0 Z" fill="#241b14" opacity="0.6"/>

                <!-- Đống lửa trại giữa hang -->
                <circle cx="500" cy="420" r="130" fill="url(#torchGlow)" class="torch-flicker" />
                <!-- Củi lửa -->
                <line x1="470" y1="440" x2="530" y2="425" stroke="#3d2314" stroke-width="8" stroke-linecap="round"/>
                <line x1="475" y1="425" x2="525" y2="440" stroke="#3d2314" stroke-width="8" stroke-linecap="round"/>
                <polygon points="485,435 500,385 515,435" fill="#ff4400" class="torch-flame" />
                <polygon points="492,435 500,400 508,435" fill="#ffcc00" class="torch-flame" />

                <!-- Đàn cừu người que đáng yêu ở góc hang -->
                <g class="sheep-herd" opacity="0.65">
                    <ellipse cx="260" cy="445" rx="28" ry="17" fill="#d0cbbe" />
                    <circle cx="238" cy="440" r="10" fill="#3a2e26" />
                    <line x1="248" y1="458" x2="248" y2="472" stroke="#3a2e26" stroke-width="3" />
                    <line x1="270" y1="458" x2="270" y2="472" stroke="#3a2e26" stroke-width="3" />

                    <ellipse cx="320" cy="455" rx="24" ry="14" fill="#beb8a8" />
                    <circle cx="300" cy="450" r="9" fill="#3a2e26" />
                    <line x1="310" y1="466" x2="310" y2="476" stroke="#3a2e26" stroke-width="3" />
                    <line x1="330" y1="466" x2="330" y2="476" stroke="#3a2e26" stroke-width="3" />
                </g>

                <!-- ============================================== -->
                <!-- QUÁI THÚ KHỔNG LỒ CYCLOPS POLYPHEMUS (BÊN PHẢI) -->
                <!-- ============================================== -->
                <g id="polyphemus-monster" class="cyclops-stick-idle" transform="translate(680, 70)">
                    <!-- Bóng đen cơ bắp quái vật -->
                    <!-- Thân người que khổng lồ -->
                    <line x1="120" y1="160" x2="120" y2="310" stroke="#2c1d14" stroke-width="18" stroke-linecap="round"/>
                    
                    <!-- Chân người que khổng lồ -->
                    <line x1="120" y1="310" x2="70" y2="400" stroke="#2c1d14" stroke-width="16" stroke-linecap="round"/>
                    <line x1="120" y1="310" x2="170" y2="400" stroke="#2c1d14" stroke-width="16" stroke-linecap="round"/>
                    <!-- Bàn chân to gồ ghề -->
                    <line x1="70" y1="400" x2="45" y2="400" stroke="#2c1d14" stroke-width="16" stroke-linecap="round"/>
                    <line x1="170" y1="400" x2="195" y2="400" stroke="#2c1d14" stroke-width="16" stroke-linecap="round"/>

                    <!-- Váy da thú / Loincloth che thân -->
                    <polygon points="75,290 165,290 145,345 95,345" fill="#4a3120" stroke="#1d120a" stroke-width="2"/>

                    <!-- Cánh tay trái giơ lên đe dọa -->
                    <line x1="120" y1="190" x2="50" y2="230" stroke="#2c1d14" stroke-width="14" stroke-linecap="round"/>
                    <line x1="50" y1="230" x2="30" y2="180" stroke="#2c1d14" stroke-width="14" stroke-linecap="round"/>

                    <!-- Cánh tay phải vung chùy gỗ gai khổng lồ -->
                    <g id="cyclops-club-arm" transform="rotate(-10, 120, 190)">
                        <line x1="120" y1="190" x2="190" y2="230" stroke="#2c1d14" stroke-width="14" stroke-linecap="round"/>
                        <line x1="190" y1="230" x2="225" y2="290" stroke="#2c1d14" stroke-width="14" stroke-linecap="round"/>
                        <!-- Chùy gỗ sồi to cộm có gai nhọn -->
                        <path d="M210,270 L250,380 Q255,400 240,405 Q225,400 215,380 L195,280 Z" fill="#543822" stroke="#26170c" stroke-width="3"/>
                        <!-- Gai trên chùy -->
                        <polygon points="252,320 270,315 250,330" fill="#26170c"/>
                        <polygon points="254,360 272,355 252,370" fill="#26170c"/>
                        <polygon points="200,340 180,345 202,355" fill="#26170c"/>
                    </g>

                    <!-- ĐẦU KHỔNG LỒ CYCLOPS VỚI BIỂU CẢM HUNG DỮ -->
                    <circle cx="120" cy="110" r="58" fill="#3d281c" stroke="#1f130b" stroke-width="4"/>
                    <!-- Râu ria xồm xoàm -->
                    <path d="M70,135 Q120,185 170,135 Q145,195 120,200 Q95,195 70,135 Z" fill="#22150d"/>

                    <!-- MIỆNG GẦM THÉT VỚI RĂNG NANH SẮC NHỌN -->
                    <g id="cyclops-mouth-group">
                        <path id="cyclops-mouth-path" d="M90,135 Q120,165 150,135 Q120,148 90,135 Z" fill="#150505" stroke="#4a1515" stroke-width="2"/>
                        <!-- Răng nanh lởm chởm -->
                        <polygon points="98,136 104,146 110,137" fill="#f5ecd5"/>
                        <polygon points="130,137 136,146 142,136" fill="#f5ecd5"/>
                    </g>

                    <!-- MẮT ĐƠN KHỔNG LỒ DUY NHẤT Ở GIỮA TRÁN -->
                    <g id="cyclops-single-eye">
                        <circle cx="120" cy="90" r="24" fill="#150a06" stroke="#4a2818" stroke-width="3"/>
                        <circle id="cyclops-eyeball" cx="120" cy="90" r="20" fill="url(#cyclopsEyeGrad)"/>
                        <!-- Con ngươi ác độc hình khe dọc -->
                        <ellipse id="cyclops-pupil" cx="120" cy="90" rx="5" ry="14" fill="#000000"/>
                        <!-- Ánh phản chiếu của lửa trại -->
                        <circle cx="114" cy="84" r="3" fill="#ffffff" opacity="0.8"/>
                        <!-- Mí mắt gồ ghề nhăn nhó giận dữ -->
                        <path d="M95,80 Q120,68 145,82" stroke="#22150d" stroke-width="5" fill="none" stroke-linecap="round"/>
                    </g>
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM CYCLOPS (KHI SAI) -->
                <g id="cyclops-soundwaves" opacity="0">
                    <circle cx="800" cy="200" r="45" fill="none" stroke="#ff3300" stroke-width="5" class="wave-pulse"/>
                    <circle cx="800" cy="200" r="95" fill="none" stroke="#ff7700" stroke-width="4" class="wave-pulse"/>
                    <circle cx="800" cy="200" r="150" fill="none" stroke="#ffbb00" stroke-width="3" class="wave-pulse"/>
                </g>

                <!-- ============================================== -->
                <!-- ODYSSEUS & ĐOÀN CHIẾN BINH NGƯỜI QUE HY LẠP (BÊN TRÁI) -->
                <!-- ============================================== -->
                <g id="greek-soldiers-squad" transform="translate(80, 220)">
                    
                    <!-- 1. CHIẾN BINH HOPLITE PHỤ (NGƯỜI QUE CẦM KHIÊN LAMBDA) -->
                    <g id="hoplite-soldier-1" transform="translate(10, 45)">
                        <!-- Cơ thể người que -->
                        <line x1="40" y1="50" x2="40" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>
                        <line x1="40" y1="120" x2="20" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
                        <line x1="40" y1="120" x2="55" y2="175" stroke="#111" stroke-width="6" stroke-linecap="round"/>
                        <!-- Giáp chân xà cạp đồng -->
                        <line x1="28" y1="145" x2="20" y2="175" stroke="#d4af37" stroke-width="4"/>
                        <line x1="49" y1="145" x2="55" y2="175" stroke="#d4af37" stroke-width="4"/>
                        <!-- Váy chiến binh Pteruges -->
                        <polygon points="28,110 52,110 48,135 32,135" fill="#805d26"/>

                        <!-- Giáp ngực đồng -->
                        <rect x="30" y="55" width="20" height="45" fill="url(#goldArmor)" rx="3"/>

                        <!-- Đầu người que & Mũ Spartan có mào lông đỏ -->
                        <circle cx="40" cy="35" r="14" fill="#e8c89b" stroke="#111" stroke-width="3"/>
                        <!-- Mắt chiến đấu kiên định -->
                        <ellipse cx="44" cy="34" rx="2.5" ry="3.5" fill="#111"/>
                        <!-- Mũ đồng che trán & mũi -->
                        <path d="M28,32 Q40,16 52,32 L46,42 L42,35 L38,42 Z" fill="url(#goldArmor)"/>
                        <!-- Mào lông đỏ rực rỡ -->
                        <path d="M35,16 Q40,-2 45,16" stroke="#c0392b" stroke-width="6" stroke-linecap="round"/>

                        <!-- Khiên tròn Hoplon chữ Lambda (Spartan shield) -->
                        <circle cx="25" cy="85" r="26" fill="url(#goldArmor)" stroke="#5c3f0b" stroke-width="3"/>
                        <circle cx="25" cy="85" r="22" fill="#8c6200"/>
                        <!-- Chữ Lambda 'Λ' kiêu hùng -->
                        <path d="M17,98 L25,72 L33,98" stroke="#f5d77f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

                        <!-- Ngọn giáo dài Dory chĩa thẳng về Polyphemus -->
                        <line x1="30" y1="80" x2="160" y2="60" stroke="url(#spearShaft)" stroke-width="4" stroke-linecap="round"/>
                        <polygon points="160,60 180,57 162,65" fill="#e0e0e0" stroke="#777" stroke-width="1"/>
                    </g>

                    <!-- 2. VUA ODYSSEUS - ANH HÙNG NGƯỜI QUE SỬ THI HY LẠP -->
                    <g id="odysseus-hero" class="hero-stickman" transform="translate(130, 20)">
                        <!-- Áo choàng đỏ uy quyền tung bay trong gió -->
                        <path id="odysseus-cape" d="M25,50 Q-15,95 0,140 Q25,120 30,55 Z" fill="#a91b0d" stroke="#5a0e06" stroke-width="2"/>

                        <!-- Thân mình người que vững chãi -->
                        <line x1="50" y1="50" x2="50" y2="125" stroke="#111" stroke-width="7" stroke-linecap="round"/>
                        <!-- Chân tấn công vững chãi -->
                        <line x1="50" y1="125" x2="25" y2="185" stroke="#111" stroke-width="7" stroke-linecap="round"/>
                        <line x1="50" y1="125" x2="80" y2="185" stroke="#111" stroke-width="7" stroke-linecap="round"/>
                        <!-- Giáp chân vàng hoàng gia -->
                        <line x1="36" y1="150" x2="25" y2="185" stroke="#ffd700" stroke-width="5"/>
                        <line x1="68" y1="150" x2="80" y2="185" stroke="#ffd700" stroke-width="5"/>

                        <!-- Giáp ngực cơ bắp hoàng gia bằng đồng vàng chạm khắc -->
                        <rect x="36" y="55" width="28" height="55" fill="url(#goldArmor)" rx="4" stroke="#7a5410" stroke-width="2"/>
                        <!-- Vạch cơ bụng dũng mãnh -->
                        <line x1="50" y1="65" x2="50" y2="95" stroke="#8a6114" stroke-width="2"/>
                        <line x1="42" y1="75" x2="58" y2="75" stroke="#8a6114" stroke-width="2"/>
                        <line x1="42" y1="88" x2="58" y2="88" stroke="#8a6114" stroke-width="2"/>
                        <!-- Váy chiến binh Pteruges da thuộc -->
                        <polygon points="36,110 64,110 60,135 40,135" fill="#66441b"/>

                        <!-- ĐẦU NGƯỜI QUE VỚI BIỂU CẢM CHỈ HUY QUẢ CẢM -->
                        <circle cx="50" cy="30" r="16" fill="#f2d2a9" stroke="#111" stroke-width="3"/>
                        <!-- Bộ râu quai nón vương giả -->
                        <path d="M38,32 Q50,48 62,32 Q58,45 50,46 Q42,45 38,32 Z" fill="#3b2413"/>
                        <!-- MẮT QUYẾT LIỆT & MIỆNG HÔ VANG HIỆU LỆNH -->
                        <ellipse cx="56" cy="28" rx="3.5" ry="4" fill="#ffffff"/>
                        <ellipse cx="57" cy="28" rx="2" ry="2.5" fill="#111"/>
                        <path d="M48,24 L60,26" stroke="#3b2413" stroke-width="2.5" stroke-linecap="round"/> <!-- Lông mày sắc -->
                        <path id="odysseus-mouth" d="M50,37 Q56,41 60,37" stroke="#111" stroke-width="2" fill="#500"/>

                        <!-- MŨ CORINTHIAN HOÀNG GIA LỘNG LẪY -->
                        <path d="M36,26 Q50,8 64,26 L62,35 L56,28 L50,36 L44,28 Z" fill="url(#goldArmor)" stroke="#7a5410" stroke-width="2"/>
                        <!-- Mào lông chim đỏ rực quyền uy -->
                        <path d="M48,8 Q50,-15 54,8" stroke="#c0392b" stroke-width="8" stroke-linecap="round"/>
                        <path d="M50,-12 Q65,-10 75,-2" stroke="#e74c3c" stroke-width="5" stroke-linecap="round"/>

                        <!-- CỌC GỖ NUNG ĐỎ / MŨI GIÁO CỦA ODYSSEUS -->
                        <g id="greek-spear-thrust">
                            <!-- Cánh tay người que cầm giáo -->
                            <line x1="50" y1="65" x2="90" y2="70" stroke="#111" stroke-width="6" stroke-linecap="round"/>
                            <line x1="90" y1="70" x2="120" y2="60" stroke="#111" stroke-width="6" stroke-linecap="round"/>

                            <!-- Thân cọc gỗ nung đỏ vĩ đại -->
                            <line x1="40" y1="75" x2="260" y2="40" stroke="url(#spearShaft)" stroke-width="7" stroke-linecap="round"/>
                            <!-- Đầu cọc vót nhọn rực lửa than hồng -->
                            <polygon points="260,40 305,33 268,48" fill="#ff4500" stroke="#ffcc00" stroke-width="2"/>
                            <!-- Đốm lửa & tàn tro đầu giáo -->
                            <circle cx="285" cy="37" r="10" fill="#ffdd00" opacity="0.8" class="torch-flame"/>
                            <circle cx="295" cy="35" r="5" fill="#ffffff" class="torch-flame"/>
                        </g>
                    </g>
                </g>

                <!-- HIỆU ỨNG TIA LỬA & ĐÂM TRÚNG MẮT (KHI ĐÚNG) -->
                <g id="cyclops-hit-impact" opacity="0">
                    <circle cx="800" cy="160" r="45" fill="url(#cyclopsEyeGrad)" opacity="0.9"/>
                    <line x1="740" y1="160" x2="860" y2="160" stroke="#fff" stroke-width="6"/>
                    <line x1="800" y1="100" x2="800" y2="220" stroke="#fff" stroke-width="6"/>
                    <line x1="755" y1="115" x2="845" y2="205" stroke="#ffeb3b" stroke-width="5"/>
                    <line x1="755" y1="205" x2="845" y2="115" stroke="#ffeb3b" stroke-width="5"/>
                </g>
            </svg>

            <!-- Chú thích tình huống màn 1 -->
            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text-1" class="action-caption">Polyphemus đang chặn lối ra! Odysseus cùng đoàn quân người que giương cọc gỗ nung đỏ sẵn sàng tấn công!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerCyclopsCorrect() {
        const spear = document.getElementById('greek-spear-thrust');
        const impact = document.getElementById('cyclops-hit-impact');
        const monster = document.getElementById('polyphemus-monster');
        const text = document.getElementById('stage-action-text-1');
        const mouth = document.getElementById('cyclops-mouth-path');
        const eyeball = document.getElementById('cyclops-eyeball');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Cọc gỗ nung đỏ đâm trúng mắt Cyclops! Polyphemus quằn quại gầm thét trong đau đớn!";
            text.className = "action-caption text-success";
        }

        if (spear) spear.classList.add('spear-strike-anim');
        if (impact) impact.style.opacity = '1';
        if (monster) monster.classList.add('monster-recoil-anim');
        if (mouth && typeof mouth.setAttribute === 'function') mouth.setAttribute('d', 'M85,130 Q120,185 155,130 Q120,150 85,130 Z');
        if (eyeball) eyeball.style.filter = "brightness(2) drop-shadow(0 0 15px red)";

        setTimeout(() => {
            if (spear) spear.classList.remove('spear-strike-anim');
            if (impact) impact.style.opacity = '0';
            if (monster) monster.classList.remove('monster-recoil-anim');
            if (mouth && typeof mouth.setAttribute === 'function') mouth.setAttribute('d', 'M90,135 Q120,165 150,135 Q120,148 90,135 Z');
            if (eyeball) eyeball.style.filter = "none";
        }, 1400);
    }

    triggerCyclopsWrong() {
        const waves = document.getElementById('cyclops-soundwaves');
        const monster = document.getElementById('polyphemus-monster');
        const squad = document.getElementById('greek-soldiers-squad');
        const text = document.getElementById('stage-action-text-1');

        if (text) {
            text.innerHTML = "💥 <strong>SAI RỒI!</strong> Polyphemus gầm lên long trời lở đất, quất chùy sồi làm rung chuyển vách đá!";
            text.className = "action-caption text-danger";
        }

        if (monster) monster.classList.add('cyclops-slam-anim');
        if (waves) waves.style.opacity = '1';
        if (squad) squad.classList.add('hero-stumble-anim');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (monster) monster.classList.remove('cyclops-slam-anim');
            if (waves) waves.style.opacity = '0';
            if (squad) squad.classList.remove('hero-stumble-anim');
            this.container.classList.remove('screen-rumble');
        }, 1500);
    }

    triggerCyclopsFinalBlind(callback) {
        const text = document.getElementById('stage-action-text-1');
        const monster = document.getElementById('polyphemus-monster');
        const spear = document.getElementById('greek-spear-thrust');
        const impact = document.getElementById('cyclops-hit-impact');

        if (text) {
            text.innerHTML = "🏆 <strong>ĐẠI THẮNG!</strong> Cọc gỗ nung đỏ đâm mù hoàn toàn mắt quái thú! Đoàn người que Odysseus trốn thoát dưới bụng cừu!";
            text.className = "action-caption text-gold";
        }

        if (spear) spear.classList.add('spear-strike-anim');
        if (impact) impact.style.opacity = '1';
        if (monster) monster.classList.add('cyclops-defeated-anim');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            this.container.classList.remove('screen-rumble');
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 2. THỬ THÁCH 2: ĐẢO ĐÁ SIRENS (ODYSSEUS BỊ TRÓI & QUÁI ĐIỂU SIREN)
    // ========================================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.clear();

        const html = `
        <div class="stage-view stage-sirens-stickman" id="stage-sirens">
            <svg class="scene-svg" viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <!-- Bầu trời & biển tím huyền bí -->
                    <linearGradient id="sirenSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#0e0720"/>
                        <stop offset="50%" stop-color="#210f3c"/>
                        <stop offset="100%" stop-color="#111936"/>
                    </linearGradient>
                    <linearGradient id="sirenOcean" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#16203d"/>
                        <stop offset="60%" stop-color="#0c1224"/>
                        <stop offset="100%" stop-color="#060913"/>
                    </linearGradient>
                    <radialGradient id="sirenPurpleGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#e056fd" stop-opacity="0.8"/>
                        <stop offset="50%" stop-color="#be2edd" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#130f40" stop-opacity="0"/>
                    </radialGradient>
                    <!-- Lá chắn sáp ong bảo vệ -->
                    <radialGradient id="waxShieldGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fff5cc" stop-opacity="0.9"/>
                        <stop offset="60%" stop-color="#f1c40f" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <!-- Bầu trời đêm & sương mù -->
                <rect width="1000" height="480" fill="url(#sirenSky)" />

                <!-- Rạn đá Sirens hiểm trở bên phải -->
                <path d="M680,480 L710,230 L760,160 L800,240 L850,140 L910,220 L960,110 L1000,180 L1000,480 Z" fill="#181326" stroke="#2d2244" stroke-width="2"/>
                <path d="M740,480 L780,260 L830,190 L880,280 L940,160 L1000,230 L1000,480 Z" fill="#251c3a" opacity="0.5"/>

                <!-- Làn sóng biển dập dềnh -->
                <rect y="280" width="1000" height="200" fill="url(#sirenOcean)" />
                <path d="M0,290 Q250,260 500,290 T1000,290 L1000,480 L0,480 Z" fill="#1b2a4a" opacity="0.4" class="ocean-wave-anim"/>
                <path d="M0,310 Q250,330 500,310 T1000,310 L1000,480 L0,480 Z" fill="#141e33" opacity="0.6"/>

                <!-- LÁ CHẮN SÁP ONG BẢO VỆ (HIỆN KHI TRẢ LỜI ĐÚNG) -->
                <ellipse id="wax-shield-bubble" cx="350" cy="280" rx="190" ry="140" fill="url(#waxShieldGlow)" stroke="#f39c12" stroke-width="3" opacity="0"/>

                <!-- ============================================== -->
                <!-- CHIẾN THUYỀN TRIREME VỚI ODYSSEUS BỊ TRÓI VÀO CỘT BUỒM -->
                <!-- ============================================== -->
                <g id="greek-trireme-ship" class="ship-rocking-anim" transform="translate(180, 160)">
                    <!-- Thân thuyền gỗ Hy Lạp cổ đại -->
                    <path d="M40,180 Q160,240 380,180 Q395,150 405,110 Q280,145 70,145 Q45,155 40,180 Z" fill="#6d4c2b" stroke="#3d2814" stroke-width="3"/>
                    <!-- Mũi thuyền nhọn hoắt có mỏ bọc đồng húc tàu (Battering ram) -->
                    <path d="M380,180 L425,185 L395,150 Z" fill="#d4af37" stroke="#8a6114" stroke-width="2"/>
                    <!-- Mắt thuyền thần thoại bảo vệ hoa tiêu (Ophthalmoi) -->
                    <ellipse cx="360" cy="160" rx="14" ry="9" fill="#fdfbf7" stroke="#111" stroke-width="2"/>
                    <circle cx="362" cy="160" r="5" fill="#1a5276"/>
                    <circle cx="364" cy="158" r="1.5" fill="#fff"/>

                    <!-- Dãy khiên đồng gắn dọc mạn thuyền -->
                    <circle cx="120" cy="160" r="13" fill="#d4af37" stroke="#5c3f0b" stroke-width="2"/>
                    <circle cx="160" cy="160" r="13" fill="#c0392b" stroke="#5c3f0b" stroke-width="2"/>
                    <circle cx="200" cy="160" r="13" fill="#d4af37" stroke="#5c3f0b" stroke-width="2"/>
                    <circle cx="240" cy="160" r="13" fill="#2980b9" stroke="#5c3f0b" stroke-width="2"/>
                    <circle cx="280" cy="160" r="13" fill="#d4af37" stroke="#5c3f0b" stroke-width="2"/>

                    <!-- CỘT BUỒM TRUNG TÂM -->
                    <line x1="210" y1="10" x2="210" y2="180" stroke="#4a3118" stroke-width="10" stroke-linecap="round"/>
                    <line x1="120" y1="40" x2="300" y2="40" stroke="#4a3118" stroke-width="6" stroke-linecap="round"/>
                    <!-- Buồm cuộn gọn lại để tránh gió bão -->
                    <path d="M125,40 Q210,55 295,40" stroke="#e8dfcb" stroke-width="8" fill="none" stroke-linecap="round"/>

                    <!-- THỦY THỦ NGƯỜI QUE ĐANG CHÈO THUYỀN (CÓ CỤC SÁP ONG VÀNG Ở TAI) -->
                    <!-- Người chèo 1 -->
                    <g transform="translate(130, 110)">
                        <circle cx="20" cy="15" r="9" fill="#e8c89b" stroke="#111" stroke-width="2"/>
                        <!-- Cục sáp ong vàng to ở tai bịt kín tiếng hát -->
                        <circle cx="14" cy="15" r="4" fill="#f39c12" stroke="#d68910" stroke-width="1"/>
                        <circle cx="26" cy="15" r="4" fill="#f39c12" stroke="#d68910" stroke-width="1"/>
                        <!-- Thân người que chèo -->
                        <line x1="20" y1="24" x2="25" y2="50" stroke="#111" stroke-width="4"/>
                        <!-- Mái chèo dài vươn xuống nước -->
                        <line x1="30" y1="35" x2="-20" y2="105" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
                    </g>
                    <!-- Người chèo 2 -->
                    <g transform="translate(250, 110)">
                        <circle cx="20" cy="15" r="9" fill="#e8c89b" stroke="#111" stroke-width="2"/>
                        <circle cx="14" cy="15" r="4" fill="#f39c12" stroke="#d68910" stroke-width="1"/>
                        <circle cx="26" cy="15" r="4" fill="#f39c12" stroke="#d68910" stroke-width="1"/>
                        <line x1="20" y1="24" x2="25" y2="50" stroke="#111" stroke-width="4"/>
                        <line x1="30" y1="35" x2="-20" y2="105" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
                    </g>

                    <!-- ODYSSEUS NGƯỜI QUE BỊ TRÓI CHẶT VÀO CỘT BUỒM (DÂY THỪNG QUẤN QUANH) -->
                    <g id="odysseus-tied-stickman" transform="translate(195, 30)">
                        <!-- Áo choàng đỏ bị trói chặt -->
                        <path d="M15,35 L0,90 L28,90 Z" fill="#c0392b"/>

                        <!-- Thân người que đứng sát cột buồm -->
                        <line x1="15" y1="30" x2="15" y2="95" stroke="#111" stroke-width="6"/>

                        <!-- CÁC VÒNG DÂY THỪNG QUẤN CHẶT QUANH NGƯỜI VÀ CỘT -->
                        <line x1="2" y1="45" x2="28" y2="45" stroke="#d4ac0d" stroke-width="4"/>
                        <line x1="2" y1="58" x2="28" y2="58" stroke="#d4ac0d" stroke-width="4"/>
                        <line x1="2" y1="72" x2="28" y2="72" stroke="#d4ac0d" stroke-width="4"/>
                        <line x1="2" y1="85" x2="28" y2="85" stroke="#d4ac0d" stroke-width="4"/>

                        <!-- ĐẦU ODYSSEUS GÀO THÉT ĐÒI MỞ TRÓI -->
                        <circle cx="15" cy="15" r="14" fill="#f2d2a9" stroke="#111" stroke-width="2.5"/>
                        <!-- Râu quai nón -->
                        <path d="M5,16 Q15,30 25,16" fill="#3b2413"/>
                        <!-- MẮT MÊ HOẶC BỞI TIẾNG HÁT & MIỆNG GÀO THÉT -->
                        <circle cx="21" cy="13" r="3" fill="#e056fd" class="eye-damage-pulse"/>
                        <path d="M12,20 Q18,28 22,20 Z" fill="#500" stroke="#111" stroke-width="1"/>
                        <!-- Mũ vương giả mạ vàng -->
                        <path d="M3,12 Q15,-4 27,12 Z" fill="#ffd700" stroke="#8a6114" stroke-width="1.5"/>
                        <path d="M15,-2 Q20,-15 25,-2" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>
                    </g>
                </g>

                <!-- ============================================== -->
                <!-- NHỮNG NÀNG TIÊN CÁ SIRENS NGƯỜI QUE CÓ CÁNH CHIM (BÊN PHẢI) -->
                <!-- ============================================== -->
                <g id="sirens-pack" transform="translate(730, 90)">
                    <!-- Siren 1 trên mỏm đá cao -->
                    <g id="siren-stick-1" class="sirens-hover-anim" transform="translate(60, 20)">
                        <!-- Đôi cánh chim lông vũ ma mị -->
                        <path d="M20,30 Q-30,-20 -50,40 Q-20,35 15,45 Z" fill="#8e44ad" stroke="#5b2c6f" stroke-width="2"/>
                        <path d="M35,30 Q85,-20 105,40 Q75,35 40,45 Z" fill="#8e44ad" stroke="#5b2c6f" stroke-width="2"/>

                        <!-- Thân người que Siren -->
                        <line x1="28" y1="25" x2="28" y2="75" stroke="#111" stroke-width="5"/>
                        <line x1="28" y1="75" x2="10" y2="110" stroke="#111" stroke-width="4"/>
                        <line x1="28" y1="75" x2="45" y2="110" stroke="#111" stroke-width="4"/>

                        <!-- Đầu người que & Mái tóc dài ma quái -->
                        <path d="M15,10 Q5,40 0,60 Q25,35 40,10 Z" fill="#5b2c6f"/>
                        <circle cx="28" cy="15" r="12" fill="#fadbd8" stroke="#111" stroke-width="2"/>
                        <!-- Mắt phát sáng tím quyến rũ -->
                        <circle cx="23" cy="14" r="2.5" fill="#e056fd"/>
                        <path d="M20,20 Q26,24 30,19" stroke="#922b21" stroke-width="2" fill="none"/>

                        <!-- Vòng tay gọi mời mê hồn -->
                        <line x1="28" y1="35" x2="-5" y2="25" stroke="#111" stroke-width="4" stroke-linecap="round"/>
                        <line x1="28" y1="35" x2="60" y2="30" stroke="#111" stroke-width="4" stroke-linecap="round"/>
                    </g>

                    <!-- Siren 2 trên mỏm đá thấp -->
                    <g id="siren-stick-2" class="sirens-hover-anim" transform="translate(140, 100)" style="animation-delay: 0.5s;">
                        <path d="M20,30 Q-25,-10 -40,35 Z" fill="#7d3c98"/>
                        <path d="M35,30 Q80,-10 95,35 Z" fill="#7d3c98"/>
                        <line x1="28" y1="25" x2="28" y2="70" stroke="#111" stroke-width="5"/>
                        <line x1="28" y1="70" x2="15" y2="105" stroke="#111" stroke-width="4"/>
                        <line x1="28" y1="70" x2="40" y2="105" stroke="#111" stroke-width="4"/>
                        <circle cx="28" cy="15" r="11" fill="#fadbd8" stroke="#111" stroke-width="2"/>
                        <circle cx="23" cy="14" r="2.5" fill="#e056fd"/>
                    </g>
                </g>

                <!-- CÁC NỐT NHẠC MA MỊ VÀ SÓNG ÂM TÍM BAY VỀ PHÍA THUYỀN -->
                <g id="siren-song-notes" class="siren-notes-stream">
                    <text x="680" y="160" font-size="28" fill="#e056fd" font-family="Cinzel, serif" opacity="0.85">♪</text>
                    <text x="590" y="210" font-size="34" fill="#be2edd" font-family="Cinzel, serif" opacity="0.9">♫</text>
                    <text x="500" y="170" font-size="30" fill="#f368e0" font-family="Cinzel, serif" opacity="0.8">♬</text>
                    <text x="420" y="230" font-size="38" fill="#e056fd" font-family="Cinzel, serif" opacity="0.85">𝄞</text>
                </g>

                <!-- THỦY THỦ BỊ MÊ HOẶC NHẢY XUỐNG BIỂN (KHI TRẢ LỜI SAI) -->
                <g id="jumping-sailor" opacity="0" transform="translate(380, 260)">
                    <circle cx="15" cy="15" r="8" fill="#e8c89b" stroke="#111" stroke-width="2"/>
                    <!-- Mắt xoáy ốc mê muội -->
                    <circle cx="17" cy="15" r="3" fill="#e056fd"/>
                    <line x1="15" y1="23" x2="25" y2="50" stroke="#111" stroke-width="4"/>
                    <line x1="25" y1="50" x2="10" y2="70" stroke="#111" stroke-width="4"/>
                    <line x1="25" y1="50" x2="40" y2="70" stroke="#111" stroke-width="4"/>
                </g>

                <!-- TIA NƯỚC BẮN TUNG TÓE -->
                <g id="water-splash" opacity="0" transform="translate(420, 360)">
                    <path d="M-20,0 Q-10,-40 0,-10 Q10,-50 20,-5 Q30,-35 40,0 Z" fill="#ffffff" opacity="0.8"/>
                    <circle cx="-15" cy="-25" r="3" fill="#81ecec"/>
                    <circle cx="10" cy="-35" r="4" fill="#81ecec"/>
                    <circle cx="25" cy="-20" r="3" fill="#81ecec"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-sirens">VÙNG BIỂN TỬ THẦN SIRENS</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang văng vẳng! Thủy thủ đoàn dùng sáp ong bịt tai, Odysseus kiên quyết bị trói vào cột buồm!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerSirensCorrect() {
        const shield = document.getElementById('wax-shield-bubble');
        const ship = document.getElementById('greek-trireme-ship');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Sáp ong bảo vệ đôi tai thủy thủ! Khiên thần thoại chặn đứng khúc ca quyến rũ!";
            text.className = "action-caption text-success";
        }

        if (shield) {
            shield.style.opacity = '1';
            shield.classList.add('wax-shield-anim');
        }
        if (ship) ship.classList.add('ship-surge-anim');

        setTimeout(() => {
            if (shield) shield.style.opacity = '0';
            if (ship) ship.classList.remove('ship-surge-anim');
        }, 1500);
    }

    triggerSirensWrong() {
        const jumping = document.getElementById('jumping-sailor');
        const splash = document.getElementById('water-splash');
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-trireme-ship');

        if (text) {
            text.innerHTML = "❌ <strong>SAI RỒI!</strong> Tiếng hát mê hồn len lỏi vào tâm trí, một thủy thủ lao mình xuống làn sóng dữ!";
            text.className = "action-caption text-danger";
        }

        if (ship) ship.classList.add('ship-panic-anim');
        if (jumping) {
            jumping.style.opacity = '1';
            jumping.classList.add('sailor-dive-anim');
        }

        setTimeout(() => {
            if (splash) splash.style.opacity = '1';
        }, 600);

        setTimeout(() => {
            if (jumping) {
                jumping.style.opacity = '0';
                jumping.classList.remove('sailor-dive-anim');
            }
            if (splash) splash.style.opacity = '0';
            if (ship) ship.classList.remove('ship-panic-anim');
        }, 1500);
    }

    triggerSirensPassThrough(callback) {
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-trireme-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT QUA HIỂM NGUY!</strong> Tiếng hát Sirens xa dần sau làn sương, con thuyền vững vàng vượt qua bẫy đá!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-escaping-anim');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }

    // ========================================================
    // 3. THỬ THÁCH 3: EO BIỂN SCYLLA (QUÁI VẬT 6 ĐẦU - HOÀN TOÀN KHÔNG CÓ XOÁY NƯỚC)
    // ========================================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-scylla-stickman" id="stage-scylla">
            <svg class="scene-svg" viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <!-- Bầu trời giông bão sấm sét -->
                    <linearGradient id="scyllaStormSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#05070d"/>
                        <stop offset="60%" stop-color="#10192e"/>
                        <stop offset="100%" stop-color="#0a1222"/>
                    </linearGradient>
                    <linearGradient id="stormSea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#0e1f38"/>
                        <stop offset="50%" stop-color="#081426"/>
                        <stop offset="100%" stop-color="#030810"/>
                    </linearGradient>
                    <!-- Ánh mắt vàng săn mồi của Scylla -->
                    <radialGradient id="scyllaEye" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="40%" stop-color="#ffee55"/>
                        <stop offset="80%" stop-color="#ff8800"/>
                        <stop offset="100%" stop-color="#aa2200"/>
                    </radialGradient>
                    <!-- Lưỡi gươm sáng loáng của Odysseus -->
                    <linearGradient id="bladeGleam" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="50%" stop-color="#99ccff"/>
                        <stop offset="100%" stop-color="#4682b4"/>
                    </linearGradient>
                </defs>

                <!-- Bầu trời bão tố đen kịt -->
                <rect width="1000" height="480" fill="url(#scyllaStormSky)" />

                <!-- Vách núi đá cao sừng sững bên phải (Hang ổ Scylla) -->
                <path d="M720,0 L680,180 L730,260 L690,360 L740,480 L1000,480 L1000,0 Z" fill="#0f1422" stroke="#1d263b" stroke-width="3"/>
                <!-- Miệng hang tối om trên vách đá nơi quái vật chui ra -->
                <path d="M760,60 Q820,30 920,80 Q940,180 870,220 Q780,210 760,140 Z" fill="#05080f"/>

                <!-- Biển cả bão tố - HOÀN TOÀN KHÔNG CÓ XOÁY NƯỚC -->
                <rect y="290" width="1000" height="190" fill="url(#stormSea)" />
                <!-- Sóng lừng dữ dội cuộn trào -->
                <path d="M0,300 Q150,265 300,300 T600,300 T900,300 T1000,300 L1000,480 L0,480 Z" fill="#142644" opacity="0.6" class="ocean-wave-anim"/>
                <path d="M0,320 Q200,350 400,320 T800,320 T1000,320 L1000,480 L0,480 Z" fill="#0c172a" opacity="0.8"/>

                <!-- Tia chớp rạch ngang trời -->
                <path id="scylla-lightning" d="M380,0 L350,90 L400,110 L360,220" stroke="#70a1ff" stroke-width="3" fill="none" opacity="0"/>

                <!-- ============================================== -->
                <!-- CHIẾN THUYỀN VÀ ODYSSEUS CẦM GƯƠM BẢO VỆ ĐOÀN QUÂN -->
                <!-- ============================================== -->
                <g id="scylla-ship" class="ship-in-strait-anim" transform="translate(180, 200)">
                    <!-- Thân thuyền Hy Lạp kiên cường -->
                    <path d="M30,170 Q160,225 380,170 Q395,140 405,100 Q280,135 60,135 Q35,145 30,170 Z" fill="#5c3f24" stroke="#2b1a0e" stroke-width="3"/>
                    <path d="M380,170 L425,175 L395,140 Z" fill="#d4af37" stroke="#7a5410" stroke-width="2"/>
                    <!-- Mắt thuyền kiên cường -->
                    <ellipse cx="360" cy="150" rx="14" ry="9" fill="#fdfbf7" stroke="#111" stroke-width="2"/>
                    <circle cx="362" cy="150" r="5" fill="#c0392b"/>

                    <!-- Mái chèo người que đạp sóng -->
                    <line x1="100" y1="165" x2="60" y2="235" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
                    <line x1="160" y1="165" x2="120" y2="235" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
                    <line x1="220" y1="165" x2="180" y2="235" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>

                    <!-- THỦY THỦ NGƯỜI QUE ĐANG NÉP KHIÊN BẢO VỆ -->
                    <g transform="translate(110, 85)">
                        <circle cx="20" cy="18" r="9" fill="#e8c89b" stroke="#111" stroke-width="2"/>
                        <line x1="20" y1="27" x2="20" y2="55" stroke="#111" stroke-width="4"/>
                        <!-- Khiên đồng giơ lên cao đỡ đòn -->
                        <circle cx="28" cy="20" r="18" fill="url(#goldArmor)" stroke="#5c3f0b" stroke-width="2"/>
                    </g>
                    <g transform="translate(170, 85)">
                        <circle cx="20" cy="18" r="9" fill="#e8c89b" stroke="#111" stroke-width="2"/>
                        <line x1="20" y1="27" x2="20" y2="55" stroke="#111" stroke-width="4"/>
                        <circle cx="28" cy="20" r="18" fill="url(#goldArmor)" stroke="#5c3f0b" stroke-width="2"/>
                    </g>

                    <!-- VUA ODYSSEUS TRÊN MŨI THUYỀN VUNG GƯƠM CHIẾN ĐẤU -->
                    <g id="odysseus-fighter" transform="translate(290, 40)">
                        <!-- Áo choàng đỏ hoàng gia bay phần phật -->
                        <path d="M15,45 Q-20,75 -10,120 Q15,100 25,50 Z" fill="#b01b0d"/>

                        <!-- Thân người que chiến đấu oai phong -->
                        <line x1="35" y1="45" x2="35" y2="105" stroke="#111" stroke-width="6"/>
                        <line x1="35" y1="105" x2="15" y2="155" stroke="#111" stroke-width="6"/>
                        <line x1="35" y1="105" x2="60" y2="155" stroke="#111" stroke-width="6"/>

                        <!-- Giáp ngực cơ bắp đồng vàng -->
                        <rect x="23" y="48" width="24" height="48" fill="url(#goldArmor)" rx="3"/>

                        <!-- Khiên tay trái giơ lên che chắn -->
                        <circle cx="15" cy="70" r="22" fill="url(#goldArmor)" stroke="#7a5410" stroke-width="2.5"/>
                        <path d="M8,82 L15,60 L22,82" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

                        <!-- ĐẦU VỚI MŨ SPARTAN HOÀNG GIA & GƯƠM XIPHOS -->
                        <circle cx="35" cy="25" r="14" fill="#f2d2a9" stroke="#111" stroke-width="2.5"/>
                        <ellipse cx="40" cy="23" rx="2.5" ry="3" fill="#111"/>
                        <!-- Miệng gầm thét quyết chiến -->
                        <path d="M34,31 Q40,36 44,31" stroke="#111" stroke-width="2" fill="#700"/>
                        <!-- Mũ đồng mào đỏ uy nghi -->
                        <path d="M23,22 Q35,4 47,22 Z" fill="url(#goldArmor)"/>
                        <path d="M35,6 Q38,-15 42,6" stroke="#c0392b" stroke-width="6" stroke-linecap="round"/>

                        <!-- CÁNH TAY PHẢI VUNG THANH GƯƠM THÉP SÁNG CHÓI -->
                        <g id="odysseus-sword-arm">
                            <line x1="35" y1="55" x2="65" y2="45" stroke="#111" stroke-width="5" stroke-linecap="round"/>
                            <!-- Chuôi kiếm mạ vàng -->
                            <line x1="60" y1="52" x2="70" y2="38" stroke="#d4af37" stroke-width="4"/>
                            <!-- Lưỡi gươm lá lúa Xiphos sắc bén -->
                            <polygon points="65,45 125,5 128,12 70,48" fill="url(#bladeGleam)" stroke="#ffffff" stroke-width="1"/>
                            <!-- Vệt sáng phản chiếu trên lưỡi gươm -->
                            <line x1="72" y1="42" x2="120" y2="9" stroke="#ffffff" stroke-width="1.5"/>
                        </g>
                    </g>
                </g>

                <!-- ============================================== -->
                <!-- QUÁI THÚ SCYLLA 6 ĐẦU RỒNG MÃNG XÀ (BÊN PHẢI) -->
                <!-- ============================================== -->
                <g id="scylla-monster-group" transform="translate(680, 40)">
                    <!-- 5 Đầu rắn phụ vươn ra từ hang gầm rống -->
                    <g class="scylla-neck-ambient">
                        <!-- Đầu 1 -->
                        <path d="M120,80 Q30,10 0,60" fill="none" stroke="#2d3748" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="0" cy="60" r="16" fill="#1a202c"/>
                        <circle cx="-5" cy="58" r="4" fill="url(#scyllaEye)"/>

                        <!-- Đầu 2 -->
                        <path d="M120,100 Q60,130 10,180" fill="none" stroke="#2d3748" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="10" cy="180" r="16" fill="#1a202c"/>
                        <circle cx="5" cy="178" r="4" fill="url(#scyllaEye)"/>

                        <!-- Đầu 3 -->
                        <path d="M120,60 Q80,-20 30,0" fill="none" stroke="#2d3748" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="30" cy="0" r="16" fill="#1a202c"/>
                        <circle cx="25" cy="-2" r="4" fill="url(#scyllaEye)"/>

                        <!-- Đầu 4 -->
                        <path d="M120,120 Q50,210 -20,250" fill="none" stroke="#2d3748" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="-20" cy="250" r="16" fill="#1a202c"/>
                        <circle cx="-25" cy="248" r="4" fill="url(#scyllaEye)"/>

                        <!-- Đầu 5 -->
                        <path d="M120,70 Q90,-40 50,-30" fill="none" stroke="#2d3748" stroke-width="14" stroke-linecap="round"/>
                        <circle cx="50" cy="-30" r="16" fill="#1a202c"/>
                        <circle cx="45" cy="-32" r="4" fill="url(#scyllaEye)"/>
                    </g>

                    <!-- ĐẦU THỨ 6: ĐẦU TẤN CÔNG CHÍNH CỰC LỚN LAO THẲNG XUỐNG THUYỀN -->
                    <g id="scylla-striking-head" transform="translate(120, 90)">
                        <!-- Cổ mãng xà khổng lồ dài ngoằn -->
                        <path id="scylla-neck-main" d="M0,0 Q-120,40 -200,120" fill="none" stroke="#374151" stroke-width="22" stroke-linecap="round"/>
                        <!-- Gai nhọn dọc sống cổ -->
                        <polygon points="-80,32 -85,15 -70,30" fill="#991b1b"/>
                        <polygon points="-130,65 -140,48 -120,62" fill="#991b1b"/>
                        <polygon points="-175,100 -190,85 -168,98" fill="#991b1b"/>

                        <!-- ĐẦU QUÁI VẬT RỒNG SCYLLA VỚI HÀM RĂNG TỬ THẦN -->
                        <g id="scylla-jaw" transform="translate(-200, 120)">
                            <!-- Sọ đầu -->
                            <path d="M15,-15 L-35,-20 L-65,0 L-40,15 L15,10 Z" fill="#1f2937" stroke="#111827" stroke-width="2"/>
                            <!-- Mắt vàng săn mồi rực lửa -->
                            <circle cx="-35" cy="-8" r="8" fill="url(#scyllaEye)"/>
                            <ellipse cx="-35" cy="-8" rx="2" ry="7" fill="#000"/>
                            <!-- Hàm trên đầy răng nhọn -->
                            <polygon points="-65,0 -40,10 -35,0" fill="#f8fafc"/>
                            <polygon points="-50,0 -30,12 -25,0" fill="#f8fafc"/>

                            <!-- Hàm dưới há to hung hãn -->
                            <path d="M10,12 L-30,35 L-55,20 L-10,8 Z" fill="#111827"/>
                            <polygon points="-50,18 -35,5 -30,22" fill="#f8fafc"/>
                            <polygon points="-35,22 -20,8 -15,25" fill="#f8fafc"/>
                        </g>
                    </g>
                </g>

                <!-- VỆT CHÉM SÁNG RỰC CỦA GƯƠM ODYSSEUS (KHI ĐÚNG) -->
                <g id="slash-arc" opacity="0">
                    <path d="M430,170 Q480,120 520,70" stroke="#00d2d3" stroke-width="8" stroke-linecap="round" fill="none" filter="drop-shadow(0 0 10px #54a0ff)"/>
                    <circle cx="480" cy="120" r="25" fill="#ffffff" opacity="0.9"/>
                </g>

                <!-- NHÁT CẮN CỦA SCYLLA (KHI SAI) -->
                <g id="bite-impact" opacity="0">
                    <circle cx="460" cy="180" r="35" fill="#e74c3c" opacity="0.8"/>
                    <line x1="430" y1="150" x2="490" y2="210" stroke="#fff" stroke-width="5"/>
                    <line x1="490" y1="150" x2="430" y2="210" stroke="#fff" stroke-width="5"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-scylla">EO BIỂN SCYLLA TỬ ĐỊA</span>
                <span id="stage-action-text-3" class="action-caption">Quái thú sáu đầu Scylla rình rập trên vách đá tăm tối! Odysseus tuốt gươm vàng bảo vệ chiến thuyền!</span>
            </div>
        </div>
        `;

        this.container.innerHTML = html;
    }

    triggerScyllaCorrect() {
        const slash = document.getElementById('slash-arc');
        const lightning = document.getElementById('scylla-lightning');
        const head = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Nhát kiếm sấm sét của Odysseus chém bật nhát cắn Scylla! Quái thú rụt đầu thét gào!";
            text.className = "action-caption text-success";
        }

        if (slash) slash.style.opacity = '1';
        if (lightning) lightning.style.opacity = '1';
        if (head) head.classList.add('scylla-head-recoil-anim');
        if (ship) ship.classList.add('ship-surge-anim');

        setTimeout(() => {
            if (slash) slash.style.opacity = '0';
            if (lightning) lightning.style.opacity = '0';
            if (head) head.classList.remove('scylla-head-recoil-anim');
            if (ship) ship.classList.remove('ship-surge-anim');
        }, 1300);
    }

    triggerScyllaWrong() {
        const bite = document.getElementById('bite-impact');
        const head = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "❌ <strong>SAI RỒI!</strong> Scylla bổ nhào xuống ngoạm nát mạn thuyền, rình rập thủy thủ đoàn!";
            text.className = "action-caption text-danger";
        }

        if (bite) bite.style.opacity = '1';
        if (head) head.classList.add('scylla-dive-anim');
        if (ship) ship.classList.add('ship-panic-anim');
        this.container.classList.add('screen-rumble');

        setTimeout(() => {
            if (bite) bite.style.opacity = '0';
            if (head) head.classList.remove('scylla-dive-anim');
            if (ship) ship.classList.remove('ship-panic-anim');
            this.container.classList.remove('screen-rumble');
        }, 1400);
    }

    triggerScyllaEscape(callback) {
        const text = document.getElementById('stage-action-text-3');
        const ship = document.getElementById('scylla-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng xé sóng thoát khỏi Scylla, vươn mình ra biển lớn bình minh!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-full-escape-anim');

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }
}
