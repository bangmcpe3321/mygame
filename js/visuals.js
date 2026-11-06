/**
 * HỆ THỐNG HIỂN THỊ ĐỒ HỌA SỬ THI TẢ THỰC & CHIỀU SÂU SỐNG ĐỘNG
 * - Nhân vật có khuôn mặt, biểu cảm sống động, mắt cử động, râu tóc, mũ giáp Corinthian & ngọn giáo Hy Lạp chi tiết
 * - Đảo đá Siren với các mỏm đá rêu phong, sóng vỗ tung bọt trắng và hình hài Siren nửa người nửa chim
 * - Quái vật Cyclops và Scylla với cơ bắp, mạch máu, vảy sừng và chuyển động chân thực
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
    // 1. THỬ THÁCH 1: HANG ĐÁ POLYPHEMUS (CHIỀU SÂU & TẢ THỰC)
    // ========================================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops" id="stage-cyclops">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="torchGlowDeep" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffaa00" stop-opacity="0.95"/>
                        <stop offset="30%" stop-color="#ff5500" stop-opacity="0.5"/>
                        <stop offset="70%" stop-color="#3d1505" stop-opacity="0.15"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="caveDepth" cx="45%" cy="35%" r="75%">
                        <stop offset="0%" stop-color="#3b2b1e"/>
                        <stop offset="45%" stop-color="#1e150e"/>
                        <stop offset="85%" stop-color="#0d0906"/>
                        <stop offset="100%" stop-color="#040302"/>
                    </radialGradient>
                    <radialGradient id="cyclopsIris" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#ffeedd"/>
                        <stop offset="20%" stop-color="#ff9900"/>
                        <stop offset="60%" stop-color="#cc1100"/>
                        <stop offset="90%" stop-color="#550000"/>
                        <stop offset="100%" stop-color="#220000"/>
                    </radialGradient>
                    <linearGradient id="bronzeArmorGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#fff0b8"/>
                        <stop offset="25%" stop-color="#d4af37"/>
                        <stop offset="65%" stop-color="#996f18"/>
                        <stop offset="100%" stop-color="#4a3408"/>
                    </linearGradient>
                    <linearGradient id="spearWood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#8a5a36"/>
                        <stop offset="50%" stop-color="#57361d"/>
                        <stop offset="100%" stop-color="#361f0d"/>
                    </linearGradient>
                    <linearGradient id="cyclopsFlesh" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#9e7457"/>
                        <stop offset="50%" stop-color="#6e4d36"/>
                        <stop offset="100%" stop-color="#3d2719"/>
                    </linearGradient>
                </defs>

                <!-- KHÔNG GIAN HANG ĐÁ VỚI CHIỀU SÂU ĐA TẦNG -->
                <rect width="1200" height="500" fill="url(#caveDepth)" />

                <!-- TẦNG NHŨ ĐÁ XA (HẬU CẢNH) -->
                <path d="M0,0 L80,110 L130,0 L220,130 L290,0 L420,90 L480,0 L610,140 L690,0 L820,110 L890,0 L1020,130 L1100,0 L1200,90 L1200,0 Z" fill="#140e09" opacity="0.8"/>

                <!-- TẦNG NHŨ ĐÁ GẦN (TRUNG CẢNH GỒ GHỀ) -->
                <path d="M0,0 L50,170 L90,0 L160,190 L230,0 L350,150 L410,0 L530,180 L620,0 L740,210 L810,0 L950,160 L1010,0 L1150,180 L1200,120 L1200,0 Z" fill="#241910" />

                <!-- ĐỐNG LỬA TRẠI SÁNG RỰC GÓC HANG -->
                <circle cx="160" cy="270" r="180" fill="url(#torchGlowDeep)" class="torch-flicker" />
                <!-- Củi gỗ cháy đỏ hồng -->
                <line x1="120" y1="360" x2="200" y2="340" stroke="#33180c" stroke-width="12" stroke-linecap="round"/>
                <line x1="130" y1="335" x2="190" y2="365" stroke="#241007" stroke-width="12" stroke-linecap="round"/>
                <polygon points="135,350 160,280 185,350" fill="#ff4500" class="torch-flame" />
                <polygon points="145,348 160,300 175,348" fill="#ffbb00" class="torch-flame" />
                <circle cx="160" cy="340" r="15" fill="#ffffff" opacity="0.8"/>

                <!-- BÌNH GỐM RƯỢU HY LẠP BỊ ĐỔ VÀ VẾT RƯỢU VANG TRÊN SÀN ĐÁ -->
                <g transform="translate(240, 410)">
                    <ellipse cx="60" cy="40" rx="45" ry="15" fill="#5c0612" opacity="0.75" />
                    <ellipse cx="0" cy="25" rx="18" ry="26" fill="#80471c" stroke="#4a250a" stroke-width="2" transform="rotate(-65)" />
                    <!-- Quai bình gốm -->
                    <path d="M-15,10 Q-30,25 -10,35" stroke="#4a250a" stroke-width="4" fill="none"/>
                </g>

                <!-- ĐÀN CỪU LÔNG DÀY BÉO TRÒN CỦA POLYPHEMUS -->
                <g class="sheep-herd" opacity="0.85">
                    <ellipse cx="360" cy="450" rx="42" ry="26" fill="#ded7c5" stroke="#b0a894" stroke-width="2"/>
                    <circle cx="325" cy="445" r="16" fill="#2d2218" />
                    <circle cx="321" cy="442" r="2.5" fill="#fff" />
                    <ellipse cx="440" cy="460" rx="35" ry="22" fill="#c7beab" />
                    <circle cx="412" cy="455" r="14" fill="#2d2218" />
                </g>

                <!-- ============================================== -->
                <!-- CHIẾN BINH HY LẠP & ODYSSEUS (CHI TIẾT MẶT & GIÁP) -->
                <!-- ============================================== -->
                <g id="greek-phalanx" transform="translate(110, 240)">
                    <!-- BINH SĨ ĐỒNG ĐỘI VỚI KHIÊN HOPLON HOA VĂN HY LẠP -->
                    <g id="hoplyte-soldier" transform="translate(0, 50)">
                        <!-- Cơ thể & giáp ngực -->
                        <rect x="25" y="45" width="34" height="55" fill="url(#bronzeArmorGrad)" rx="3"/>
                        <path d="M20,95 L65,95 L60,135 L25,135 Z" fill="#691a1a" />
                        <!-- Bắp chân có giáp bảo vệ (Greaves) -->
                        <rect x="28" y="130" width="12" height="40" fill="url(#bronzeArmorGrad)" rx="3"/>
                        <rect x="46" y="130" width="12" height="40" fill="url(#bronzeArmorGrad)" rx="3"/>
                        
                        <!-- KHUÔN MẶT BINH SĨ CĂNG THẲNG -->
                        <circle cx="42" cy="28" r="18" fill="#d9ad7c" />
                        <!-- Mắt mở to lo âu -->
                        <ellipse cx="48" cy="26" rx="3.5" ry="2.5" fill="#fff" />
                        <circle cx="49" cy="26" r="1.5" fill="#111" />
                        <path d="M44,22 L52,24" stroke="#4a2e12" stroke-width="2" />
                        <!-- Miệng thở dốc -->
                        <ellipse cx="48" cy="36" rx="3" ry="2" fill="#3a1111" />

                        <!-- MŨ CORINTHIAN CỦA BINH SĨ -->
                        <path d="M26,24 Q42,-2 58,24 L56,40 L38,40 Z" fill="url(#bronzeArmorGrad)" stroke="#4a3408" stroke-width="1.5"/>
                        <path d="M40,-2 Q42,-20 44,-2" stroke="#8b0000" stroke-width="7" stroke-linecap="round" />

                        <!-- KHIÊN TRÒN LỚN (HOPLON) VỚI HOA VĂN GORGON MEDUSA -->
                        <circle cx="20" cy="75" r="36" fill="url(#bronzeArmorGrad)" stroke="#2b1c04" stroke-width="4"/>
                        <circle cx="20" cy="75" r="26" fill="#7a1a1a" />
                        <!-- Mặt quỷ bảo vệ trên khiên -->
                        <circle cx="20" cy="75" r="12" fill="#d4af37" />
                        <circle cx="16" cy="72" r="2.5" fill="#000" />
                        <circle cx="24" cy="72" r="2.5" fill="#000" />
                        <path d="M15,80 Q20,85 25,80" stroke="#000" stroke-width="2" fill="none" />

                        <!-- NGỌN GIÁO HY LẠP DÀI (DORY) SẮC BÉN VỚI MŨI HÌNH LÁ -->
                        <g id="soldier-spear">
                            <!-- Thân giáo gỗ tần bì -->
                            <line x1="15" y1="75" x2="220" y2="40" stroke="url(#spearWood)" stroke-width="5" stroke-linecap="round"/>
                            <!-- Mũi giáo đồng hình lá sáng bóng -->
                            <polygon points="220,40 248,35 224,45" fill="#fff3c4" stroke="#805b19" stroke-width="1.5"/>
                            <line x1="220" y1="40" x2="242" y2="37" stroke="#d4af37" stroke-width="2"/>
                            <!-- Chuôi nhọn phía sau (Sauroter) -->
                            <polygon points="15,75 0,78 12,80" fill="#d4af37"/>
                        </g>
                    </g>

                    <!-- ODYSSEUS - VỊ VUA VỚI BIỂU CẢM & GIÁP HOÀNG GIA -->
                    <g id="odysseus-hero" transform="translate(90, 15)">
                        <!-- Áo choàng đỏ thắm tung bay -->
                        <path d="M10,45 Q-15,90 -2,145 L40,145 Q50,90 35,45 Z" fill="#990000" stroke="#ffcc00" stroke-width="1"/>
                        <!-- Giáp ngực đồng Musculata tả thực cơ bụng sáu múi -->
                        <rect x="20" y="42" width="38" height="62" fill="url(#bronzeArmorGrad)" rx="4"/>
                        <!-- Vân dập nổi cơ bụng & ngực -->
                        <path d="M28,60 Q39,66 50,60 M39,64 L39,95 M28,75 Q39,78 50,75 M28,88 Q39,90 50,88" stroke="#5a3d07" stroke-width="2" fill="none" />

                        <!-- Váy chiến binh Pteruges bằng da viền đồng -->
                        <path d="M18,102 L60,102 L56,132 L22,132 Z" fill="#3a1c0d" />
                        <line x1="26" y1="102" x2="26" y2="132" stroke="#d4af37" stroke-width="2"/>
                        <line x1="34" y1="102" x2="34" y2="132" stroke="#d4af37" stroke-width="2"/>
                        <line x1="42" y1="102" x2="42" y2="132" stroke="#d4af37" stroke-width="2"/>
                        <line x1="50" y1="102" x2="50" y2="132" stroke="#d4af37" stroke-width="2"/>

                        <!-- KHUÔN MẶT CƯƠNG NGHỊ CỦA ODYSSEUS -->
                        <circle cx="39" cy="25" r="19" fill="#dfb382" />
                        <!-- Bộ râu quai nón uy quyền -->
                        <path d="M24,24 Q39,46 54,24 Q48,46 39,48 Q30,46 24,24 Z" fill="#2d190b" />
                        <!-- Mắt kiên định với lông mày nhíu lại -->
                        <ellipse cx="44" cy="22" rx="3.5" ry="2.2" fill="#fff" />
                        <circle cx="45" cy="22" r="1.6" fill="#1b0e07" />
                        <circle cx="45.5" cy="21.5" r="0.6" fill="#fff" />
                        <path d="M40,18 L48,20" stroke="#1f0f04" stroke-width="2.5" />
                        <!-- Sống mũi cao thẳng Hy Lạp -->
                        <line x1="42" y1="20" x2="44" y2="28" stroke="#a67749" stroke-width="2"/>

                        <!-- MŨ SẮT CORINTHIAN HOÀNG GIA DÁT VÀNG & CHÙM LÔNG ĐỎ -->
                        <path d="M22,18 Q39,-8 56,18 L54,34 L38,34 Z" fill="url(#bronzeArmorGrad)" stroke="#4a3408" stroke-width="2"/>
                        <!-- Chùm bờm ngựa đỏ cong vút kiêu hãnh -->
                        <path d="M37,-6 Q40,-35 43,-6" stroke="#c0392b" stroke-width="10" stroke-linecap="round" />
                        <path d="M43,-6 Q55,-30 65,-10" stroke="#c0392b" stroke-width="7" stroke-linecap="round" />

                        <!-- CUNG TÊN HOÀNG GIA DÁT VÀNG -->
                        <g id="odysseus-bow">
                            <path d="M65,-10 Q98,45 65,105" stroke="#4a250a" stroke-width="6" fill="none" />
                            <path d="M65,-10 Q98,45 65,105" stroke="#d4af37" stroke-width="2" stroke-dasharray="12 4" fill="none" />
                            <line x1="65" y1="-10" x2="65" y2="105" stroke="#f0e6d2" stroke-width="2" />
                            <!-- Mũi tên trên cung -->
                            <line id="loaded-arrow" x1="25" y1="45" x2="95" y2="45" stroke="#ffd700" stroke-width="3.5" />
                            <polygon points="95,41 108,45 95,49" fill="#e74c3c" />
                        </g>
                    </g>
                </g>

                <!-- ============================================== -->
                <!-- QUÁI VẬT CYCLOPS (POLYPHEMUS) KHỔNG LỒ & MẮT ĐỘNG -->
                <!-- ============================================== -->
                <g id="cyclops-monster" class="cyclops-idle" transform="translate(730, 60)">
                    <!-- Cơ thể đồ sộ khổng lồ -->
                    <path d="M30,170 Q-10,250 10,430 L310,430 Q330,250 280,170 Z" fill="url(#cyclopsFlesh)" />
                    <!-- Khối cơ bắp cuồn cuộn & gân máu -->
                    <path d="M40,230 Q110,270 175,255 Q240,270 290,230 L275,360 L35,360 Z" fill="#4d3220" opacity="0.85"/>
                    <line x1="90" y1="240" x2="140" y2="300" stroke="#7a1c1c" stroke-width="5" stroke-linecap="round"/>
                    <line x1="210" y1="250" x2="250" y2="290" stroke="#7a1c1c" stroke-width="4" stroke-linecap="round"/>

                    <!-- Tay phải cầm chùy gỗ sồi khổng lồ có gai -->
                    <g id="cyclops-club" transform="rotate(-15, 270, 220)">
                        <path d="M250,200 Q350,290 320,410 L280,420 Q280,310 210,220 Z" fill="#4a2e18" />
                        <path d="M290,160 L350,70 Q390,40 370,170 Z" fill="#2a1708" />
                        <!-- Gai nhọn xù xì -->
                        <polygon points="350,65 375,50 355,85" fill="#140a03" />
                        <polygon points="370,110 395,100 370,125" fill="#140a03" />
                    </g>

                    <!-- Đầu gã khổng lồ cơ bắp hung dữ -->
                    <circle cx="165" cy="145" r="95" fill="url(#cyclopsFlesh)" />
                    <polygon points="60,135 28,120 62,160" fill="#523521" />
                    <polygon points="265,135 295,120 263,160" fill="#523521" />
                    <!-- Bộ râu rậm xù xì -->
                    <path d="M80,185 Q165,290 250,185 Q205,305 165,315 Q125,305 80,185 Z" fill="#1c1108" />

                    <!-- MỒM GẦM THÉT NẰM DƯỚI CON MẮT -->
                    <g id="cyclops-mouth">
                        <path id="mouth-shape" d="M120,200 Q165,212 210,200 Q165,225 120,200 Z" fill="#140404" />
                        <polygon points="130,200 140,216 150,200" fill="#ede5d2" />
                        <polygon points="180,200 190,216 200,200" fill="#ede5d2" />
                    </g>

                    <!-- CON MẮT ĐƠN DUY NHẤT VỚI MẠCH MÁU & TRÒNG MẮT ĐỘNG -->
                    <g id="cyclops-eye-group">
                        <circle cx="165" cy="120" r="35" fill="#120803" />
                        <circle id="cyclops-eye-ball" cx="165" cy="120" r="29" fill="url(#cyclopsIris)" />
                        <!-- Mạng mao mạch đỏ chi tiết -->
                        <path d="M142,120 Q152,114 158,120 M185,112 Q176,118 172,120 M165,138 L165,130" stroke="#990000" stroke-width="2" fill="none"/>
                        <!-- Con ngươi ác độc co giãn -->
                        <ellipse id="cyclops-pupil" cx="165" cy="120" rx="8" ry="18" fill="#000000" />
                        <!-- Đốm sáng trên mắt -->
                        <circle cx="169" cy="114" r="3" fill="#ffffff" opacity="0.9" />
                        <!-- Mí mắt gồ ghề dày cộm nhiều nếp nhăn -->
                        <path d="M128,112 Q165,90 202,112" stroke="#2d1a0d" stroke-width="8" fill="none" />
                        <path d="M135,104 Q165,85 195,104" stroke="#4d3220" stroke-width="3" fill="none" />
                    </g>

                    <polygon points="158,136 172,136 165,170" fill="#422917" />
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM KHI SAI -->
                <g id="roar-waves" opacity="0">
                    <circle cx="890" cy="270" r="50" stroke="#ff3300" stroke-width="7" fill="none" class="wave-pulse"/>
                    <circle cx="890" cy="270" r="110" stroke="#ff8800" stroke-width="5" fill="none" class="wave-pulse"/>
                    <circle cx="890" cy="270" r="190" stroke="#ffcc00" stroke-width="3" fill="none" class="wave-pulse"/>
                </g>

                <!-- MŨI TÊN XÉ GIÓ KHI ĐÚNG -->
                <g id="arrow-flight" opacity="0">
                    <line x1="330" y1="310" x2="880" y2="200" stroke="#ffd700" stroke-width="6" stroke-dasharray="14 6" />
                    <polygon points="880,200 900,194 886,212" fill="#e74c3c" />
                </g>

                <!-- ĐÂM CỌC LỬA VÀO MẮT CUỐI MÀN -->
                <g id="blind-stake-effect" opacity="0">
                    <line x1="330" y1="310" x2="895" y2="180" stroke="#ff4500" stroke-width="16" stroke-linecap="round" />
                    <circle cx="895" cy="180" r="48" fill="#ffff00" opacity="0.9" />
                    <path d="M850,135 L940,225 M940,135 L850,225" stroke="#cc0000" stroke-width="9" />
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text" class="action-caption">Polyphemus đang chặn cửa hang! Hãy trả lời thật nhanh để nhận điểm tốc độ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerCyclopsWrong() {
        const monster = document.getElementById('cyclops-monster');
        const mouth = document.getElementById('mouth-shape');
        const waves = document.getElementById('roar-waves');
        const phalanx = document.getElementById('greek-phalanx');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Cyclops giáng chùy rống lên kinh thiên động địa, làm rung chuyển cửa hang!";
            text.className = "action-caption text-danger";
        }

        if (mouth) mouth.setAttribute('d', 'M105,185 Q165,260 225,185 Q165,275 105,185 Z');
        if (monster) {
            monster.classList.remove('cyclops-idle');
            monster.classList.add('cyclops-roaring');
        }
        if (waves) waves.style.opacity = '1';
        if (phalanx) phalanx.classList.add('soldiers-shaking');

        const stage = document.getElementById('stage-cyclops');
        if (stage) stage.classList.add('screen-rumble');

        setTimeout(() => {
            if (mouth) mouth.setAttribute('d', 'M120,200 Q165,212 210,200 Q165,225 120,200 Z');
            if (monster) {
                monster.classList.remove('cyclops-roaring');
                monster.classList.add('cyclops-idle');
            }
            if (waves) waves.style.opacity = '0';
            if (phalanx) phalanx.classList.remove('soldiers-shaking');
            if (stage) stage.classList.remove('screen-rumble');
        }, 1700);
    }

    triggerCyclopsCorrect() {
        const arrow = document.getElementById('arrow-flight');
        const monster = document.getElementById('cyclops-monster');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Một mũi tên xé gió cắm phập vào người Polyphemus!";
            text.className = "action-caption text-success";
        }

        if (arrow) {
            arrow.style.opacity = '1';
            arrow.classList.add('arrow-flying-anim');
        }

        setTimeout(() => {
            if (monster) monster.classList.add('monster-hit-anim');
        }, 200);

        setTimeout(() => {
            if (arrow) {
                arrow.style.opacity = '0';
                arrow.classList.remove('arrow-flying-anim');
            }
            if (monster) monster.classList.remove('monster-hit-anim');
        }, 1300);
    }

    triggerCyclopsFinalBlind(callback) {
        const blindEffect = document.getElementById('blind-stake-effect');
        const monster = document.getElementById('cyclops-monster');
        const eyeGroup = document.getElementById('cyclops-eye-group');
        const text = document.getElementById('stage-action-text');
        const stage = document.getElementById('stage-cyclops');

        if (text) {
            text.innerHTML = "🔥 <strong>CHIẾN TÍCH OANH LIỆT!</strong> Chiếc cọc lửa đâm thẳng vào mắt Cyclops mù lòa!";
            text.className = "action-caption text-gold";
        }

        if (blindEffect) blindEffect.style.opacity = '1';
        if (stage) stage.classList.add('screen-flash-red');

        setTimeout(() => {
            if (eyeGroup) {
                eyeGroup.innerHTML = `
                    <circle cx="165" cy="120" r="35" fill="#111" />
                    <line x1="130" y1="90" x2="200" y2="150" stroke="#990000" stroke-width="10"/>
                    <line x1="200" y1="90" x2="130" y2="150" stroke="#990000" stroke-width="10"/>
                `;
            }
            if (monster) monster.classList.add('cyclops-blinded-stumble');
        }, 400);

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 2. THỬ THÁCH 2: HÒN ĐẢO ĐÁ VÀ CÁC NÀNG SIREN NỬA NGƯỜI NỬA CHIM
    // ========================================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.sailorJumpCount = 0;
        this.clear();

        const html = `
        <div class="stage-view stage-sirens" id="stage-sirens">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="sirenOceanReal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#101924" />
                        <stop offset="40%" stop-color="#0a121c" />
                        <stop offset="100%" stop-color="#03060a" />
                    </linearGradient>
                    <linearGradient id="sirenMistReal" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.03"/>
                        <stop offset="50%" stop-color="#9fc8e3" stop-opacity="0.28"/>
                        <stop offset="100%" stop-color="#cae3f5" stop-opacity="0.55"/>
                    </linearGradient>
                    <linearGradient id="rockLayer" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#2c353d" />
                        <stop offset="60%" stop-color="#181e24" />
                        <stop offset="100%" stop-color="#0b0e12" />
                    </linearGradient>
                </defs>

                <!-- Bầu trời đêm trăng mờ đục và biển sâu -->
                <rect width="1200" height="500" fill="url(#sirenOceanReal)" />
                <circle cx="900" cy="80" r="55" fill="#eaf2f8" opacity="0.3" filter="blur(8px)" />
                <circle cx="900" cy="80" r="30" fill="#ffffff" opacity="0.6" />

                <!-- HÒN ĐẢO ĐÁ SIREN HIỂM TRỞ VỚI CÁC MỎM ĐÁ TẢ THỰC -->
                <g id="rocky-siren-island" transform="translate(700, 60)">
                    <!-- Các tầng mỏm đá xếp lớp có rêu phong -->
                    <polygon points="40,320 120,60 200,320" fill="url(#rockLayer)" />
                    <polygon points="160,320 260,90 380,320" fill="#13191f" />
                    <polygon points="300,320 390,120 480,320" fill="#0c1014" />
                    <!-- Tảng đá nhô ra sát mép nước biển -->
                    <polygon points="10,320 90,210 180,320" fill="#1d252c" />
                    <!-- Vết rêu xanh rêu phong trên vách đá -->
                    <path d="M120,120 Q140,160 135,210 M260,150 Q280,190 270,240" stroke="#253d2c" stroke-width="6" fill="none" opacity="0.8"/>
                    <!-- Bọt sóng bạc đầu đập vào chân đá -->
                    <path d="M0,320 Q50,305 100,320 T200,320 T300,320 T400,320 T500,320" stroke="#aeeeff" stroke-width="5" fill="none" opacity="0.75"/>
                    <ellipse cx="90" cy="318" rx="25" ry="6" fill="#ffffff" opacity="0.6"/>
                    <ellipse cx="260" cy="318" rx="35" ry="8" fill="#ffffff" opacity="0.7"/>

                    <!-- CÁC NÀNG SIREN NỬA NGƯỜI NỬA CHIM ĐẬU TRÊN ĐỈNH ĐÁ -->
                    <g id="siren-flock" class="sirens-floating">
                        <!-- SIREN 1: TRÊN MỎM ĐÁ CAO -->
                        <g id="siren-perched-1" transform="translate(105, 30)">
                            <!-- Đôi cánh lông vũ xòe rộng -->
                            <path d="M15,35 Q-30,5 -10,55 Q5,50 15,35 Z" fill="#2c2738" stroke="#16121f" stroke-width="1.5"/>
                            <path d="M35,35 Q80,5 60,55 Q45,50 35,35 Z" fill="#2c2738" stroke="#16121f" stroke-width="1.5"/>
                            <!-- Thân người thiếu nữ ma mị -->
                            <ellipse cx="25" cy="40" rx="12" ry="18" fill="#d0c2b2" />
                            <circle cx="25" cy="18" r="10" fill="#e0d4c5" />
                            <!-- Mái tóc dài đen bay bồng bềnh -->
                            <path d="M18,12 Q10,25 5,45 Q20,30 25,28" fill="#16111e" />
                            <path d="M32,12 Q40,25 45,45 Q30,30 25,28" fill="#16111e" />
                            <!-- Đôi mắt ngọc lam phát sáng ma quái -->
                            <circle cx="21" cy="17" r="2" fill="#00ffcc" class="siren-eye" />
                            <circle cx="28" cy="17" r="2" fill="#00ffcc" class="siren-eye" />
                            <!-- Móng vuốt chim bám chặt vào đá -->
                            <path d="M18,58 L14,68 M24,58 L24,70 M30,58 L34,68" stroke="#140f0c" stroke-width="3" stroke-linecap="round"/>
                        </g>

                        <!-- SIREN 2: TRÊN MỎM ĐÁ BÊN CẠNH -->
                        <g id="siren-perched-2" transform="translate(240, 60)">
                            <path d="M15,35 Q-25,8 -8,52 Z" fill="#241e30" />
                            <path d="M35,35 Q75,8 58,52 Z" fill="#241e30" />
                            <ellipse cx="25" cy="38" rx="11" ry="17" fill="#c4b4a3" />
                            <circle cx="25" cy="18" r="9" fill="#d9cbba" />
                            <circle cx="22" cy="17" r="2" fill="#ff00bb" class="siren-eye" />
                            <circle cx="28" cy="17" r="2" fill="#ff00bb" class="siren-eye" />
                            <path d="M20,55 L16,65 M26,55 L26,67 M32,55 L36,65" stroke="#140f0c" stroke-width="3" stroke-linecap="round"/>
                        </g>

                        <!-- CÁC NỐT NHẠC MA MỊ VÀ SÓNG ÂM UỐN LƯỢN -->
                        <g class="musical-whispers" opacity="0.75">
                            <text x="50" y="20" fill="#aeeeff" font-size="24">♬</text>
                            <text x="120" y="0" fill="#e2baff" font-size="20">♩</text>
                            <text x="180" y="30" fill="#aeeeff" font-size="26">♪</text>
                        </g>
                    </g>
                </g>

                <!-- MÀN SƯƠNG MÙ CUỘN TRÔI GIỮA CÁC TẢNG ĐÁ -->
                <rect x="550" y="50" width="650" height="340" fill="url(#sirenMistReal)" class="fog-drifting" />

                <!-- SÓNG BIỂN CUỒN CUỘN -->
                <path d="M0,350 Q300,330 600,350 T1200,350 L1200,500 L0,500 Z" fill="#0a1520" opacity="0.8"/>
                <path class="wave-anim" d="M0,370 Q300,390 600,370 T1200,370 L1200,500 L0,500 Z" fill="#050a0f" />

                <!-- CHIẾN THUYỀN HY LẠP CỦA ODYSSEUS -->
                <g id="greek-ship" class="ship-bobbing" transform="translate(160, 200)">
                    <path d="M40,160 Q200,180 380,150 Q430,130 460,80 L390,155 L70,155 Q20,110 0,60 Q10,130 40,160 Z" fill="#4d2f14" />
                    <!-- Mắt thuyền may mắn (Ophthalmoi) -->
                    <circle cx="430" cy="115" r="9" fill="#ffffff" />
                    <circle cx="430" cy="115" r="4.5" fill="#000000" />
                    
                    <!-- DÀN THỦY THỦ LỰC LƯỠNG BỊT TAI CHÈO THUYỀN -->
                    <g id="sailors-rowing">
                        <circle cx="140" cy="140" r="11" fill="#cca06e" />
                        <circle cx="190" cy="140" r="11" fill="#cca06e" />
                        <circle cx="240" cy="140" r="11" fill="#cca06e" />
                        <circle cx="290" cy="140" r="11" fill="#cca06e" />
                        <!-- Cục sáp ong vàng óng nhét tai -->
                        <circle cx="136" cy="140" r="3" fill="#ffd700" />
                        <circle cx="186" cy="140" r="3" fill="#ffd700" />
                        <circle cx="236" cy="140" r="3" fill="#ffd700" />
                        <circle cx="286" cy="140" r="3" fill="#ffd700" />
                    </g>

                    <line x1="220" y1="160" x2="220" y2="-45" stroke="#2c190a" stroke-width="9" />

                    <!-- ODYSSEUS BỊ TRÓI CHẶT VÀO CỘT BUỒM VỚI KHUÔN MẶT CẬN CẢNH -->
                    <g id="odysseus-tied" transform="translate(200, 5)">
                        <rect x="10" y="28" width="22" height="65" fill="#7a2e16" rx="3" />
                        <!-- Dây thừng quấn nhiều vòng siết chặt vào da thịt -->
                        <ellipse cx="21" cy="42" rx="16" ry="5" fill="#d2b48c" stroke="#6b4421" stroke-width="2.5"/>
                        <ellipse cx="21" cy="58" rx="16" ry="5" fill="#d2b48c" stroke="#6b4421" stroke-width="2.5"/>
                        <ellipse cx="21" cy="74" rx="16" ry="5" fill="#d2b48c" stroke="#6b4421" stroke-width="2.5"/>
                        
                        <!-- Khuôn mặt căng thẳng giãy giụa -->
                        <circle cx="21" cy="16" r="14" fill="#cca06e" />
                        <path d="M10,18 Q21,30 32,18" fill="#361f10" />
                        <!-- Miệng gào thét kêu xin -->
                        <ellipse cx="21" cy="22" rx="4" ry="3" fill="#330b0b" />
                        <!-- Dải vải trắng bịt mắt -->
                        <rect x="8" y="11" width="26" height="8" fill="#f8f8f8" rx="2" stroke="#bbb" stroke-width="1"/>
                    </g>

                    <!-- BONG BÓNG LỜI THOẠI CĂNG THẲNG -->
                    <g id="speech-bubble" opacity="0" transform="translate(150, -115)">
                        <path d="M0,0 L180,0 Q190,0 190,10 L190,65 Q190,75 180,75 L100,75 L80,100 L85,75 L0,75 Q-10,75 -10,65 L-10,10 Q-10,0 0,0 Z" fill="#ffffff" stroke="#333" stroke-width="3" />
                        <text id="bubble-text" x="90" y="32" font-size="12" font-weight="bold" fill="#cc0000" text-anchor="middle">
                            "THẢ TA RA! HÃY ĐỂ TA BƠI ĐẾN ĐÓ!"
                        </text>
                        <text x="90" y="54" font-size="11" font-weight="bold" fill="#111" text-anchor="middle">
                            "CẦU XIN CÁC NGƯƠI... THÁO DÂY CHO TA!"
                        </text>
                    </g>
                </g>

                <!-- THỦY THỦ NHẢY KHỎI THUYỀN VÀ BỌT NƯỚC BẮN TUNG TÓE -->
                <g id="jumping-soldier" opacity="0">
                    <circle id="jumper-body" cx="500" cy="340" r="11" fill="#1b120c" />
                    <g id="water-splash" opacity="0">
                        <ellipse cx="500" cy="400" rx="32" ry="12" fill="#aeeeff" />
                        <path d="M475,400 L465,365 M500,400 L500,355 M525,400 L535,365" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
                    </g>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-siren">EO BIỂN SIREN HUYỀN HOẶC</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang văng vẳng từ hòn đảo đá! Giữ vững tâm trí để cứu lấy đoàn thủy thủ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerSirensWrong() {
        this.sailorJumpCount++;
        const bubble = document.getElementById('speech-bubble');
        const tiedHero = document.getElementById('odysseus-tied');
        const jumper = document.getElementById('jumping-soldier');
        const jumperBody = document.getElementById('jumper-body');
        const splash = document.getElementById('water-splash');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = `⚠️ <strong>SAI RỒI!</strong> Odysseus gào thét trong cơn mê hoặc! Một thủy thủ không chịu nổi đã gieo mình xuống biển! (Đã mất: ${this.sailorJumpCount} lính)`;
            text.className = "action-caption text-danger";
        }

        if (bubble) bubble.style.opacity = '1';
        if (tiedHero) tiedHero.classList.add('hero-struggling');

        if (jumper && jumperBody && splash) {
            jumper.style.opacity = '1';
            jumperBody.setAttribute('cy', '330');
            jumperBody.setAttribute('cx', `${450 + (this.sailorJumpCount * 25)}`);
            
            setTimeout(() => {
                jumperBody.setAttribute('cy', '400');
                splash.setAttribute('transform', `translate(${this.sailorJumpCount * 25}, 0)`);
                splash.style.opacity = '1';
            }, 300);

            setTimeout(() => {
                jumper.style.opacity = '0';
                splash.style.opacity = '0';
            }, 1200);
        }

        setTimeout(() => {
            if (bubble) bubble.style.opacity = '0';
            if (tiedHero) tiedHero.classList.remove('hero-struggling');
        }, 2000);
    }

    triggerSirensCorrect() {
        const text = document.getElementById('stage-action-text-2');
        const sirens = document.getElementById('siren-flock');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "✨ <strong>CHÍNH XÁC!</strong> Toàn bộ thủy thủ đều an toàn, các nàng Siren trên đảo đá gào thét trong giận dữ!";
            text.className = "action-caption text-success";
        }

        if (sirens) {
            sirens.classList.remove('sirens-floating');
            sirens.classList.add('sirens-furious');
        }

        if (ship) ship.classList.add('ship-accelerating');

        setTimeout(() => {
            if (sirens) {
                sirens.classList.remove('sirens-furious');
                sirens.classList.add('sirens-floating');
            }
            if (ship) ship.classList.remove('ship-accelerating');
        }, 1500);
    }

    triggerSirensPassThrough(callback) {
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "🌊 <strong>VƯỢT QUA TỬ ĐỊA SIREN!</strong> Chiếc thuyền xé toạc làn sương mù dày đặc và vượt qua an toàn!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-escaping-fog');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }

    // ========================================================
    // 3. THỬ THÁCH 3: EO BIỂN QUÁI VẬT SCYLLA 6 ĐẦU
    // ========================================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-scylla" id="stage-scylla">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="whirlpoolGradReal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#020810"/>
                        <stop offset="50%" stop-color="#0b2c3f"/>
                        <stop offset="100%" stop-color="#145374"/>
                    </radialGradient>
                    <linearGradient id="scyllaSkinReal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#421a30"/>
                        <stop offset="50%" stop-color="#240e1b"/>
                        <stop offset="100%" stop-color="#0e060b"/>
                    </linearGradient>
                </defs>

                <rect width="1200" height="500" fill="#080c12" />
                <!-- Tia chớp xa giông bão -->
                <path d="M450,0 L440,90 L480,120 L430,230" stroke="#77aaff" stroke-width="2.5" opacity="0.45" fill="none"/>

                <!-- XOÁY NƯỚC KHỔNG LỒ CHARYBDIS -->
                <g id="charybdis-zone" transform="translate(180, 360)">
                    <ellipse cx="0" cy="0" rx="160" ry="70" fill="url(#whirlpoolGradReal)" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="115" ry="46" stroke="#4db8ff" stroke-width="3.5" stroke-dasharray="30 15" fill="none" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="60" ry="24" stroke="#aeeeff" stroke-width="4.5" stroke-dasharray="20 10" fill="none" class="whirlpool-spin-reverse" />
                    <ellipse cx="0" cy="0" rx="18" ry="7" fill="#000000" />
                </g>

                <!-- VÁCH ĐÁ TỬ ĐỊA MESSINA NƠI SCYLLA RÌNH RẬP -->
                <polygon points="780,0 1200,0 1200,500 700,500 810,280 740,160" fill="#16171a" />
                <ellipse cx="940" cy="140" rx="110" ry="85" fill="#060709" />

                <!-- QUÁI VẬT 6 ĐẦU SCYLLA VỚI VẢY SẮC BÓN & RĂNG NANH -->
                <g id="scylla-monster" transform="translate(820, 60)">
                    <g id="scylla-head-1" class="scylla-neck-idle">
                        <path d="M130,70 Q40,40 -30,10" stroke="url(#scyllaSkinReal)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <circle cx="-35" cy="10" r="20" fill="#4a2238" />
                        <circle cx="-38" cy="6" r="3.5" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-2" class="scylla-neck-idle" style="animation-delay: 0.3s">
                        <path d="M130,70 Q60,90 -60,50" stroke="url(#scyllaSkinReal)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-65" cy="50" r="19" fill="#4a2238" />
                        <circle cx="-68" cy="46" r="3.5" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-3" class="scylla-neck-idle" style="animation-delay: 0.6s">
                        <path d="M130,70 Q30,120 -100,100" stroke="url(#scyllaSkinReal)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <circle cx="-105" cy="100" r="20" fill="#4a2238" />
                        <circle cx="-108" cy="96" r="3.5" fill="#ff0055" />
                    </g>

                    <!-- ĐẦU BỔ NHÀO TẤN CÔNG CHÍNH -->
                    <g id="scylla-striking-head" class="scylla-neck-idle" style="animation-delay: 0.2s">
                        <path id="attack-neck-path" d="M130,70 Q10,160 -130,170" stroke="url(#scyllaSkinReal)" stroke-width="26" stroke-linecap="round" fill="none"/>
                        <g id="attack-jaw" transform="translate(-135, 170)">
                            <ellipse cx="0" cy="0" rx="26" ry="18" fill="#5c2645" />
                            <circle cx="-8" cy="-6" r="4.5" fill="#ff0000" />
                            <circle cx="-8" cy="-6" r="1.5" fill="#ffffff" />
                            <!-- 3 hàng răng nanh nhọn sắc -->
                            <polygon points="-28,4 -18,-3 -10,5 0,-3 10,5 18,-3" fill="#ffffff" />
                        </g>
                    </g>

                    <g id="scylla-head-5" class="scylla-neck-idle" style="animation-delay: 0.5s">
                        <path d="M130,70 Q40,190 -80,220" stroke="url(#scyllaSkinReal)" stroke-width="21" stroke-linecap="round" fill="none"/>
                        <circle cx="-85" cy="220" r="18" fill="#4a2238" />
                        <circle cx="-88" cy="216" r="3" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-6" class="scylla-neck-idle" style="animation-delay: 0.8s">
                        <path d="M130,70 Q50,230 -30,270" stroke="url(#scyllaSkinReal)" stroke-width="20" stroke-linecap="round" fill="none"/>
                        <circle cx="-35" cy="270" r="17" fill="#4a2238" />
                        <circle cx="-38" cy="266" r="3" fill="#ff0055" />
                    </g>
                </g>

                <!-- CON THUYỀN TIẾN GIỮA EO BIỂN -->
                <g id="scylla-ship" class="ship-in-strait" transform="translate(420, 240)">
                    <path d="M30,120 Q150,135 280,115 L320,65 L270,115 L50,115 Q15,80 0,40 Z" fill="#482910" />
                    <line x1="170" y1="115" x2="170" y2="-20" stroke="#2a1608" stroke-width="7" />

                    <!-- ODYSSEUS TUỐT GƯƠM CHIẾN ĐẤU TRÊN MŨI THUYỀN -->
                    <g id="odysseus-fighter" transform="translate(225, 25)">
                        <path d="M-10,35 Q-28,15 -38,55" stroke="#b22222" stroke-width="9" fill="none" />
                        <rect x="0" y="25" width="24" height="42" fill="#d4af37" rx="3" />
                        <circle cx="12" cy="14" r="13" fill="#cca06e" />
                        <!-- Mắt sắc bén nhìn quái vật -->
                        <circle cx="16" cy="13" r="1.8" fill="#000" />
                        <path d="M0,12 Q12,-6 24,12 Z" fill="#ffd700" />
                        <g id="odysseus-sword" transform="rotate(-30, 22, 35)">
                            <line x1="22" y1="35" x2="75" y2="8" stroke="#f4d03f" stroke-width="5.5" stroke-linecap="round" />
                            <polygon points="75,8 86,3 78,13" fill="#ffffff" />
                        </g>
                    </g>

                    <g id="panicked-crew" transform="translate(80, 60)">
                        <circle cx="20" cy="35" r="9" fill="#cca06e" />
                        <circle cx="48" cy="35" r="9" fill="#cca06e" />
                        <circle cx="76" cy="35" r="9" fill="#cca06e" />
                    </g>
                </g>

                <g id="slash-arc" opacity="0">
                    <path d="M620,240 Q680,205 720,270" stroke="#00ffff" stroke-width="9" stroke-linecap="round" fill="none" />
                    <circle cx="675" cy="240" r="22" fill="#ffffff" opacity="0.85" />
                </g>

                <g id="bite-impact" opacity="0">
                    <circle cx="710" cy="340" r="28" fill="#ff0000" opacity="0.65" />
                    <line x1="685" y1="330" x2="735" y2="355" stroke="#fff" stroke-width="4.5"/>
                    <line x1="735" y1="330" x2="685" y2="355" stroke="#fff" stroke-width="4.5"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-scylla">EO BIỂN MESSINA TỬ ĐỊA</span>
                <span id="stage-action-text-3" class="action-caption">Một bên là vực xoáy Charybdis, trước mặt là quái thú 6 đầu Scylla! Vung gươm bảo vệ con tàu!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerScyllaWrong() {
        const neck = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const bite = document.getElementById('bite-impact');
        const crew = document.getElementById('panicked-crew');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Đầu Scylla lao xuống ngoạm vỡ be thuyền! Thủy thủ đoàn hoảng loạn tột cùng!";
            text.className = "action-caption text-danger";
        }

        if (neck) neck.classList.add('scylla-dive-attack');
        if (bite) bite.style.opacity = '1';
        if (ship) ship.classList.add('ship-bitten-shake');
        if (crew) crew.classList.add('crew-panic-anim');

        setTimeout(() => {
            if (neck) neck.classList.remove('scylla-dive-attack');
            if (bite) bite.style.opacity = '0';
            if (ship) ship.classList.remove('ship-bitten-shake');
            if (crew) crew.classList.remove('crew-panic-anim');
        }, 1500);
    }

    triggerScyllaCorrect() {
        const sword = document.getElementById('odysseus-sword');
        const slash = document.getElementById('slash-arc');
        const head = document.getElementById('scylla-striking-head');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚔️ <strong>XUẤT SẮC!</strong> Odysseus tung mình chém đứt móng vuốt và đẩy lùi đầu Scylla!";
            text.className = "action-caption text-success";
        }

        if (sword) sword.classList.add('sword-slash-anim');
        if (slash) slash.style.opacity = '1';
        if (head) head.classList.add('scylla-head-recoil');

        setTimeout(() => {
            if (sword) sword.classList.remove('sword-slash-anim');
            if (slash) slash.style.opacity = '0';
            if (head) head.classList.remove('scylla-head-recoil');
        }, 1300);
    }

    triggerScyllaEscape(callback) {
        const text = document.getElementById('stage-action-text-3');
        const ship = document.getElementById('scylla-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng thoát khỏi Scylla và Charybdis, vươn mình ra biển khơi!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-full-escape');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }
}
