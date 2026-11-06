/**
 * HỆ THỐNG HIỂN THỊ HÌNH ẢNH & HOẠT HỌA CHO CÁC THỬ THÁCH
 * Sử dụng SVG Vector đồ họa sắc nét, mượt mà và tương thích mọi màn hình.
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

    // ==========================================
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (POLYPHEMUS)
    // ==========================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops" id="stage-cyclops">
            <!-- Nền hang đá và ngọn đuốc -->
            <svg class="scene-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ff9900" stop-opacity="0.8"/>
                        <stop offset="50%" stop-color="#ff4500" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="caveShadow" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#2a221b"/>
                        <stop offset="60%" stop-color="#14100c"/>
                        <stop offset="100%" stop-color="#080705"/>
                    </radialGradient>
                    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffaa"/>
                        <stop offset="40%" stop-color="#ff3300"/>
                        <stop offset="100%" stop-color="#660000"/>
                    </radialGradient>
                </defs>

                <!-- Vách hang đá tối sầm -->
                <rect width="1000" height="500" fill="url(#caveShadow)" />
                
                <!-- Nhũ đá trên trần hang -->
                <path d="M0,0 L60,110 L100,0 L180,140 L230,0 L320,100 L390,0 L500,120 L570,0 L680,150 L750,0 L880,110 L940,0 L1000,130 L1000,0 Z" fill="#1b1612" />
                <path d="M40,0 L90,80 L130,0 L200,90 L240,0 L420,70 L460,0 L620,100 L650,0 L820,80 L860,0 Z" fill="#2b231c" opacity="0.6"/>

                <!-- Ánh lửa đuốc bập bùng góc hang -->
                <circle cx="120" cy="220" r="140" fill="url(#torchGlow)" class="torch-flicker" />
                <rect x="116" y="240" width="8" height="90" fill="#4a311b" rx="2" />
                <polygon points="110,240 130,240 120,200" fill="#ff7700" class="torch-flame" />

                <!-- Đàn cừu nhấp nhô dưới đáy hang -->
                <g class="sheep-herd" opacity="0.7">
                    <ellipse cx="280" cy="460" rx="35" ry="22" fill="#d8d3c5" />
                    <circle cx="255" cy="455" r="14" fill="#3a3028" />
                    <ellipse cx="340" cy="470" rx="30" ry="18" fill="#c4bfb0" />
                    <circle cx="318" cy="465" r="12" fill="#3a3028" />
                </g>

                <!-- KHỔNG LỒ CYCLOPS (POLYPHEMUS) -->
                <g id="cyclops-monster" class="cyclops-idle" transform="translate(620, 100)">
                    <!-- Thân hình đồ sộ cơ bắp -->
                    <path d="M40,160 Q10,230 20,380 L240,380 Q250,230 220,160 Z" fill="#755a43" />
                    <!-- Khối cơ bắp & lông da thú -->
                    <path d="M15,220 Q70,250 140,240 Q210,250 245,220 L230,320 L30,320 Z" fill="#523d2c" opacity="0.8"/>
                    
                    <!-- Tay phải cầm chùy gỗ khổng lồ -->
                    <g id="cyclops-club" transform="rotate(-15, 220, 200)">
                        <path d="M210,180 Q290,260 270,360 L240,370 Q240,280 180,210 Z" fill="#664d38" />
                        <path d="M250,150 L290,90 Q320,60 300,160 Z" fill="#443224" />
                    </g>

                    <!-- Đầu gã khổng lồ -->
                    <circle cx="130" cy="140" r="75" fill="#84654b" />
                    <!-- Tai nhọn xù xì -->
                    <polygon points="50,130 30,120 52,150" fill="#755a43" />
                    <polygon points="210,130 230,120 208,150" fill="#755a43" />
                    <!-- Bộ râu rậm xơ xác -->
                    <path d="M70,165 Q130,230 190,165 Q160,250 130,260 Q100,250 70,165 Z" fill="#36281e" />

                    <!-- MỒM GẦM THÉT (Biến đổi khi gầm) -->
                    <g id="cyclops-mouth">
                        <path id="mouth-shape" d="M95,175 Q130,185 165,175 Q130,195 95,175 Z" fill="#2b0e0e" />
                        <!-- Răng nanh lởm chởm -->
                        <polygon points="105,175 112,185 118,175" fill="#f0e6d2" />
                        <polygon points="142,175 148,185 155,175" fill="#f0e6d2" />
                    </g>

                    <!-- MẮT ĐƠN DUY NHẤT Ở GIỮA TRÁN -->
                    <g id="cyclops-eye-group">
                        <circle cx="130" cy="115" r="26" fill="#1a120c" />
                        <circle id="cyclops-eye-ball" cx="130" cy="115" r="22" fill="url(#eyeGlow)" />
                        <!-- Con ngươi ác độc -->
                        <ellipse id="cyclops-pupil" cx="130" cy="115" rx="6" ry="14" fill="#000000" />
                        <!-- Mí mắt gồ ghề -->
                        <path d="M102,110 Q130,95 158,110" stroke="#443224" stroke-width="6" fill="none" />
                    </g>

                    <!-- Mũi to gồ ghề -->
                    <polygon points="126,125 134,125 130,150" fill="#5c4533" />
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM CỦA CYCLOPS -->
                <g id="roar-waves" opacity="0">
                    <circle cx="750" cy="270" r="40" stroke="#ff3300" stroke-width="6" fill="none" class="wave-pulse"/>
                    <circle cx="750" cy="270" r="90" stroke="#ff8800" stroke-width="4" fill="none" class="wave-pulse"/>
                    <circle cx="750" cy="270" r="150" stroke="#ffcc00" stroke-width="2" fill="none" class="wave-pulse"/>
                </g>

                <!-- ODYSSEUS VÀ BINH LÍNH HY LẠP TẠI CỬA HANG (BÊN TRÁI) -->
                <g id="greek-soldiers" transform="translate(140, 270)">
                    <!-- Binh lính cầm khiên giáo -->
                    <g id="soldier-1" transform="translate(0, 50)">
                        <!-- Áo giáp đồng & váy chiến binh -->
                        <rect x="20" y="50" width="30" height="50" fill="#9e782f" rx="3"/>
                        <circle cx="35" cy="35" r="16" fill="#c49a45" />
                        <!-- Mũ sắt Hy Lạp có mào đỏ -->
                        <path d="M22,32 Q35,10 48,32 Z" fill="#a63a24" />
                        <!-- Khiên tròn Hy Lạp (Hoplon) -->
                        <circle cx="20" cy="70" r="28" fill="#b8860b" stroke="#5a3d00" stroke-width="3"/>
                        <circle cx="20" cy="70" r="18" fill="#8c6200"/>
                        <!-- Ngọn giáo chĩa về phía Cyclops -->
                        <line x1="25" y1="65" x2="160" y2="40" stroke="#d4af37" stroke-width="4"/>
                        <polygon points="160,40 175,37 160,45" fill="#f0f0f0"/>
                    </g>

                    <!-- ODYSSEUS - VỊ VUA ANH HÙNG (CẦM CUNG VÀNG) -->
                    <g id="odysseus-hero" transform="translate(70, 20)">
                        <!-- Áo choàng đỏ uy quyền -->
                        <path d="M15,40 Q-5,80 5,120 L45,120 Q55,80 40,40 Z" fill="#8b0000" />
                        <!-- Giáp ngực hoàng gia chạm khắc -->
                        <rect x="22" y="42" width="34" height="55" fill="#d4af37" rx="4"/>
                        <!-- Khuôn mặt cương nghị có râu -->
                        <circle cx="39" cy="25" r="18" fill="#e0b98d" />
                        <path d="M26,26 Q39,45 52,26" fill="#4a2e18" />
                        <!-- Mũ chiến binh mạ vàng lộng lẫy -->
                        <path d="M24,20 Q39,-5 54,20 Z" fill="#ffd700" />
                        <path d="M37,-4 Q39,-25 41,-4" stroke="#c0392b" stroke-width="8" stroke-linecap="round" />
                        
                        <!-- Cung tên chuẩn bị giương lên -->
                        <g id="odysseus-bow">
                            <path d="M60,0 Q85,45 60,90" stroke="#8b4513" stroke-width="5" fill="none" />
                            <line x1="60" y1="0" x2="60" y2="90" stroke="#f5f5dc" stroke-width="1.5" />
                            <!-- Mũi tên trên cung -->
                            <line id="loaded-arrow" x1="25" y1="45" x2="85" y2="45" stroke="#ffd700" stroke-width="3" />
                            <polygon points="85,42 95,45 85,48" fill="#e74c3c" />
                        </g>
                    </g>
                </g>

                <!-- MŨI TÊN BAY VÀ VẾT THƯƠNG -->
                <g id="arrow-flight" opacity="0">
                    <line x1="290" y1="335" x2="740" y2="215" stroke="#ffd700" stroke-width="5" stroke-dasharray="10 5" />
                    <polygon points="740,215 755,210 745,225" fill="#e74c3c" />
                </g>

                <!-- HIỆU ỨNG CHỌC MÙ MẮT CUỐI CÙNG -->
                <g id="blind-stake-effect" opacity="0">
                    <!-- Cọc gỗ cháy rực đâm thẳng vào mắt -->
                    <line x1="300" y1="330" x2="750" y2="215" stroke="#ff4500" stroke-width="12" stroke-linecap="round" />
                    <!-- Tia lửa & chớp mắt -->
                    <circle cx="750" cy="215" r="35" fill="#ffff00" opacity="0.9" />
                    <path d="M720,185 L780,245 M780,185 L720,245" stroke="#ff0000" stroke-width="6" />
                </g>
            </svg>

            <!-- Bảng trạng thái tình huống màn 1 -->
            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text" class="action-caption">Polyphemus đang chặn lối ra. Hãy trả lời chính xác để dẫn dắt binh sĩ tấn công!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    // Hoạt họa Cyclops khi TRẢ LỜI SAI (Cyclops gầm lên đe dọa nhóm lính)
    triggerCyclopsWrong() {
        const monster = document.getElementById('cyclops-monster');
        const mouth = document.getElementById('mouth-shape');
        const waves = document.getElementById('roar-waves');
        const soldiers = document.getElementById('greek-soldiers');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Cyclops rống lên kinh thiên động địa, vung chùy đe dọa cửa hang khiến binh lính khiếp sợ!";
            text.className = "action-caption text-danger";
        }

        // Cyclops gầm to: há to mồm, đổi màu mắt
        if (mouth) {
            mouth.setAttribute('d', 'M85,165 Q130,225 175,165 Q130,235 85,165 Z');
        }
        if (monster) {
            monster.classList.remove('cyclops-idle');
            monster.classList.add('cyclops-roaring');
        }
        if (waves) {
            waves.style.opacity = '1';
        }
        if (soldiers) {
            soldiers.classList.add('soldiers-shaking');
        }

        // Rung chuyển màn hình
        const stage = document.getElementById('stage-cyclops');
        if (stage) stage.classList.add('screen-rumble');

        setTimeout(() => {
            if (mouth) mouth.setAttribute('d', 'M95,175 Q130,185 165,175 Q130,195 95,175 Z');
            if (monster) {
                monster.classList.remove('cyclops-roaring');
                monster.classList.add('cyclops-idle');
            }
            if (waves) waves.style.opacity = '0';
            if (soldiers) soldiers.classList.remove('soldiers-shaking');
            if (stage) stage.classList.remove('screen-rumble');
        }, 1800);
    }

    // Hoạt họa Cyclops khi TRẢ LỜI ĐÚNG (Một mũi tên bắn trúng Cyclops)
    triggerCyclopsCorrect() {
        const arrow = document.getElementById('arrow-flight');
        const monster = document.getElementById('cyclops-monster');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Một mũi tên đồng xé gió cắm phập vào người Polyphemus!";
            text.className = "action-caption text-success";
        }

        if (arrow) {
            arrow.style.opacity = '1';
            arrow.classList.add('arrow-flying-anim');
        }

        setTimeout(() => {
            if (monster) {
                monster.classList.add('monster-hit-anim');
            }
        }, 200);

        setTimeout(() => {
            if (arrow) {
                arrow.style.opacity = '0';
                arrow.classList.remove('arrow-flying-anim');
            }
            if (monster) {
                monster.classList.remove('monster-hit-anim');
            }
        }, 1400);
    }

    // Hoạt họa KẾT THÚC THỬ THÁCH 1: Bắn cọc lửa vào mắt Cyclops mù lòa
    triggerCyclopsFinalBlind(callback) {
        const blindEffect = document.getElementById('blind-stake-effect');
        const monster = document.getElementById('cyclops-monster');
        const eyeGroup = document.getElementById('cyclops-eye-group');
        const text = document.getElementById('stage-action-text');
        const stage = document.getElementById('stage-cyclops');

        if (text) {
            text.innerHTML = "🔥 <strong>CHIẾN TÍCH OANH LIỆT!</strong> Odysseus và đồng đội dồn sức đâm thẳng chiếc cọc lửa vào con mắt duy nhất của Cyclops!";
            text.className = "action-caption text-gold";
        }

        if (blindEffect) {
            blindEffect.style.opacity = '1';
        }
        if (stage) stage.classList.add('screen-flash-red');

        setTimeout(() => {
            if (eyeGroup) {
                eyeGroup.innerHTML = `
                    <circle cx="130" cy="115" r="26" fill="#111" />
                    <line x1="105" y1="95" x2="155" y2="135" stroke="#990000" stroke-width="8"/>
                    <line x1="155" y1="95" x2="105" y2="135" stroke="#990000" stroke-width="8"/>
                `;
            }
            if (monster) {
                monster.classList.add('cyclops-blinded-stumble');
            }
        }, 400);

        setTimeout(() => {
            if (callback) callback();
        }, 2500);
    }

    // ==========================================
    // 2. THỬ THÁCH 2: VÙNG BIỂN SIREN MA MỊ
    // ==========================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.sailorJumpCount = 0;
        this.clear();

        const html = `
        <div class="stage-view stage-sirens" id="stage-sirens">
            <svg class="scene-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="fogSeaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#1a2634" />
                        <stop offset="40%" stop-color="#0f1923" />
                        <stop offset="100%" stop-color="#070c12" />
                    </linearGradient>
                    <linearGradient id="mistFog" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05"/>
                        <stop offset="60%" stop-color="#a0c0d6" stop-opacity="0.35"/>
                        <stop offset="100%" stop-color="#d0e5f5" stop-opacity="0.6"/>
                    </linearGradient>
                </defs>

                <!-- Bầu trời u ám và biển đêm mờ ảo -->
                <rect width="1000" height="500" fill="url(#fogSeaGradient)" />

                <!-- Ánh trăng mờ sau làn mây dày -->
                <circle cx="750" cy="90" r="50" fill="#eaf2f8" opacity="0.4" filter="blur(10px)" />
                <circle cx="750" cy="90" r="30" fill="#ffffff" opacity="0.6" />

                <!-- HÒN ĐẢO SIREN Ở PHÍA XA BỊ CHE PHỦ BỞI SƯƠNG MÙ VÀ ĐÁ NHỌN -->
                <g id="siren-island" transform="translate(620, 90)">
                    <!-- Vách đá nhọn hoắt cô độc -->
                    <polygon points="50,260 120,80 180,260" fill="#182026" />
                    <polygon points="140,260 220,110 320,260" fill="#131a20" />
                    <polygon points="250,260 310,140 370,260" fill="#0d1217" />

                    <!-- CÁC BÓNG ĐEN SIREN VỚI ĐÔI CÁNH VÀ DÁNG DẤP MA MỊ TRÊN ĐỈNH ĐÁ -->
                    <g id="siren-silhouettes" class="sirens-floating">
                        <!-- Siren 1 -->
                        <g id="siren-1" transform="translate(100, 50)">
                            <ellipse cx="20" cy="30" rx="10" ry="18" fill="#070a0d" />
                            <circle cx="20" cy="12" r="8" fill="#070a0d" />
                            <!-- Đôi cánh dơi/chim xòe rộng -->
                            <path d="M12,25 Q-15,5 0,40 Z" fill="#05070a" />
                            <path d="M28,25 Q55,5 40,40 Z" fill="#05070a" />
                            <!-- Mắt phát sáng le lói trong sương -->
                            <circle cx="17" cy="12" r="1.5" fill="#00ffcc" class="siren-eye" />
                            <circle cx="23" cy="12" r="1.5" fill="#00ffcc" class="siren-eye" />
                        </g>

                        <!-- Siren 2 -->
                        <g id="siren-2" transform="translate(200, 80)">
                            <ellipse cx="20" cy="30" rx="9" ry="16" fill="#070a0d" />
                            <circle cx="20" cy="14" r="7" fill="#070a0d" />
                            <path d="M12,25 Q-12,8 2,38 Z" fill="#05070a" />
                            <path d="M28,25 Q52,8 38,38 Z" fill="#05070a" />
                            <circle cx="18" cy="14" r="1.5" fill="#ff00bb" class="siren-eye" />
                            <circle cx="22" cy="14" r="1.5" fill="#ff00bb" class="siren-eye" />
                        </g>

                        <!-- Nốt nhạc ma mị uốn lượn bay ra từ hòn đảo -->
                        <g class="musical-whispers" opacity="0.6">
                            <text x="30" y="20" fill="#aeeeff" font-size="22">♬</text>
                            <text x="80" y="5" fill="#d2b4ff" font-size="18">♩</text>
                            <text x="140" y="30" fill="#aeeeff" font-size="26">♪</text>
                        </g>
                    </g>
                </g>

                <!-- LỚP SƯƠNG MÙ CHE PHỦ HÒN ĐẢO (MIST LAYER) -->
                <rect x="500" y="80" width="500" height="300" fill="url(#mistFog)" class="fog-drifting" />

                <!-- SÓNG BIỂN TRÙNG ĐIỆP -->
                <path d="M0,350 Q250,330 500,350 T1000,350 L1000,500 L0,500 Z" fill="#0b1723" opacity="0.8"/>
                <path class="wave-anim" d="M0,370 Q250,390 500,370 T1000,370 L1000,500 L0,500 Z" fill="#081018" />

                <!-- CHIẾC THUYỀN CHIẾN HY LẠP (BIREME) CỦA ODYSSEUS -->
                <g id="greek-ship" class="ship-bobbing" transform="translate(180, 200)">
                    <!-- Thân thuyền gỗ Hy Lạp với mũi nhọn đâm tàu -->
                    <path d="M40,160 Q180,180 340,150 Q390,130 420,80 L350,155 L60,155 Q20,110 0,60 Q10,130 40,160 Z" fill="#5c3818" />
                    <!-- Mắt thuyền may mắn (Ophthalmoi) vẽ trên mũi -->
                    <circle cx="390" cy="115" r="8" fill="#ffffff" />
                    <circle cx="390" cy="115" r="4" fill="#000000" />
                    
                    <!-- Mái chèo nhịp nhàng dọc thân thuyền -->
                    <g id="ship-oars">
                        <line x1="120" y1="160" x2="90" y2="230" stroke="#8b5a2b" stroke-width="4" />
                        <line x1="160" y1="160" x2="130" y2="230" stroke="#8b5a2b" stroke-width="4" />
                        <line x1="200" y1="160" x2="170" y2="230" stroke="#8b5a2b" stroke-width="4" />
                        <line x1="240" y1="160" x2="210" y2="230" stroke="#8b5a2b" stroke-width="4" />
                        <line x1="280" y1="160" x2="250" y2="230" stroke="#8b5a2b" stroke-width="4" />
                    </g>

                    <!-- HÀNG THỦY THỦ CHÈO THUYỀN VỚI SÁP BỊT TAI -->
                    <g id="sailors-rowing">
                        <circle cx="130" cy="140" r="10" fill="#cca06e" />
                        <circle cx="170" cy="140" r="10" fill="#cca06e" />
                        <circle cx="210" cy="140" r="10" fill="#cca06e" />
                        <circle cx="250" cy="140" r="10" fill="#cca06e" />
                        <!-- Cục sáp ong vàng bịt tai -->
                        <circle cx="127" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="167" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="207" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="247" cy="140" r="2.5" fill="#ffd700" />
                    </g>

                    <!-- CỘT BUỒM TRUNG TÂM -->
                    <line x1="200" y1="160" x2="200" y2="-40" stroke="#3d230f" stroke-width="8" />

                    <!-- ODYSSEUS BỊ TRÓI CHẶT VÀO CỘT BUỒM VÀ BỊT MẮT -->
                    <g id="odysseus-tied" transform="translate(180, 10)">
                        <!-- Thân hình bị trói đứng áp sát cột -->
                        <rect x="10" y="25" width="20" height="60" fill="#8b3a20" rx="3" />
                        <!-- Dây thừng quấn nhiều vòng quanh người và cột -->
                        <ellipse cx="20" cy="40" rx="14" ry="4" fill="#d2b48c" stroke="#8b5a2b" stroke-width="2"/>
                        <ellipse cx="20" cy="55" rx="14" ry="4" fill="#d2b48c" stroke="#8b5a2b" stroke-width="2"/>
                        <ellipse cx="20" cy="70" rx="14" ry="4" fill="#d2b48c" stroke="#8b5a2b" stroke-width="2"/>
                        
                        <!-- Đầu Odysseus -->
                        <circle cx="20" cy="15" r="13" fill="#e0b98d" />
                        <path d="M10,16 Q20,28 30,16" fill="#4a2e18" />
                        <!-- TẤM VẢI BỊT MẮT TRẮNG -->
                        <rect x="8" y="10" width="24" height="7" fill="#f5f5f5" rx="2" stroke="#bbb" stroke-width="1"/>
                    </g>

                    <!-- BONG BÓNG LỜI THOẠI CỦA ODYSSEUS KHI CĂNG THẲNG / GÀO THÉT -->
                    <g id="speech-bubble" opacity="0" transform="translate(130, -110)">
                        <path d="M0,0 L160,0 Q170,0 170,10 L170,60 Q170,70 160,70 L90,70 L70,95 L75,70 L0,70 Q-10,70 -10,60 L-10,10 Q-10,0 0,0 Z" fill="#ffffff" stroke="#333" stroke-width="3" />
                        <text id="bubble-text" x="80" y="32" font-size="12" font-weight="bold" fill="#cc0000" text-anchor="middle">
                            "THẢ TA RA! HÃY ĐỂ TA BƠI ĐẾN ĐÓ!"
                        </text>
                        <text x="80" y="52" font-size="11" font-weight="bold" fill="#111" text-anchor="middle">
                            "CẦU XIN CÁC NGƯƠI... THÁO DÂY!"
                        </text>
                    </g>
                </g>

                <!-- HOẠT HỌA NGƯỜI LÍNH NHẢY KHỎI THUYỀN VÀ TÙM XUỐNG BIỂN -->
                <g id="jumping-soldier" opacity="0">
                    <circle id="jumper-body" cx="440" cy="340" r="10" fill="#222" />
                    <!-- Vết bọt nước bắn tung tóe -->
                    <g id="water-splash" opacity="0">
                        <ellipse cx="440" cy="400" rx="28" ry="10" fill="#aeeeff" />
                        <path d="M420,400 L410,370 M440,400 L440,360 M460,400 L470,370" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    </g>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-siren">EO BIỂN SIREN HUYỀN HOẶC</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang văng vẳng! Giữ vững tâm trí để cứu lấy đoàn thủy thủ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    // Hoạt họa Siren khi TRẢ LỜI SAI:
    // Odysseus gào thét (bong bóng lời thoại) + 1 người lính nhảy khỏi thuyền
    triggerSirensWrong() {
        this.sailorJumpCount++;
        const bubble = document.getElementById('speech-bubble');
        const tiedHero = document.getElementById('odysseus-tied');
        const jumper = document.getElementById('jumping-soldier');
        const jumperBody = document.getElementById('jumper-body');
        const splash = document.getElementById('water-splash');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = `⚠️ <strong>SAI RỒI!</strong> Odysseus quằn quại gào thét trong cơn mê hoặc! Một thủy thủ không chịu nổi đã gieo mình xuống biển! (Đã mất: ${this.sailorJumpCount} lính)`;
            text.className = "action-caption text-danger";
        }

        // Hiện bong bóng căng thẳng + lắc lư người bị trói
        if (bubble) bubble.style.opacity = '1';
        if (tiedHero) tiedHero.classList.add('hero-struggling');

        // Binh lính nhảy khỏi mạn thuyền
        if (jumper && jumperBody && splash) {
            jumper.style.opacity = '1';
            jumperBody.setAttribute('cy', '330');
            jumperBody.setAttribute('cx', `${380 + (this.sailorJumpCount * 25)}`);
            
            // Rơi xuống nước
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
        }, 2200);
    }

    // Hoạt họa Siren khi TRẢ LỜI ĐÚNG:
    // Không ai nhảy khỏi thuyền, Sirens ở xa tức giận
    triggerSirensCorrect() {
        const text = document.getElementById('stage-action-text-2');
        const sirens = document.getElementById('siren-silhouettes');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "✨ <strong>CHÍNH XÁC!</strong> Lý trí kiên định! Toàn bộ thủy thủ đều an toàn chèo thuyền, các nàng Siren ở xa gào rít trong giận dữ!";
            text.className = "action-caption text-success";
        }

        if (sirens) {
            sirens.classList.remove('sirens-floating');
            sirens.classList.add('sirens-furious');
        }

        if (ship) {
            ship.classList.add('ship-accelerating');
        }

        setTimeout(() => {
            if (sirens) {
                sirens.classList.remove('sirens-furious');
                sirens.classList.add('sirens-floating');
            }
            if (ship) {
                ship.classList.remove('ship-accelerating');
            }
        }, 1600);
    }

    // Hoạt họa KẾT THÚC THỬ THÁCH 2: Thuyền vượt qua làn sương mù
    triggerSirensPassThrough(callback) {
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-ship');
        const stage = document.getElementById('stage-sirens');

        if (text) {
            text.innerHTML = "🌊 <strong>VƯỢT QUA TỬ ĐỊA SIREN!</strong> Chiếc thuyền xé toạc màn sương mù dày đặc, thoát khỏi tiếng hát mê muội của quỷ dữ!";
            text.className = "action-caption text-gold";
        }

        if (ship) {
            ship.classList.add('ship-escaping-fog');
        }

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }

    // ==========================================
    // 3. THỬ THÁCH 3: EO BIỂN QUÁI VẬT SCYLLA 6 ĐẦU
    // ==========================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-scylla" id="stage-scylla">
            <svg class="scene-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="whirlpoolGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#020912"/>
                        <stop offset="50%" stop-color="#0a3147"/>
                        <stop offset="100%" stop-color="#145374"/>
                    </radialGradient>
                    <linearGradient id="scyllaSkin" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#3d1e2f"/>
                        <stop offset="50%" stop-color="#22121b"/>
                        <stop offset="100%" stop-color="#11080d"/>
                    </linearGradient>
                </defs>

                <!-- Bầu trời bão tố u tối -->
                <rect width="1000" height="500" fill="#0d1117" />
                <!-- Tia chớp xa chân trời -->
                <path d="M400,0 L390,90 L420,110 L380,220" stroke="#77aaff" stroke-width="2" opacity="0.4" fill="none"/>

                <!-- BÊN TRÁI: XOÁY NƯỚC KHỔNG LỒ CHARYBDIS -->
                <g id="charybdis-zone" transform="translate(140, 360)">
                    <ellipse cx="0" cy="0" rx="140" ry="60" fill="url(#whirlpoolGrad)" class="whirlpool-spin" />
                    <!-- Các vòng xoáy bọt nước cuồn cuộn -->
                    <ellipse cx="0" cy="0" rx="100" ry="40" stroke="#4db8ff" stroke-width="3" stroke-dasharray="30 15" fill="none" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="55" ry="22" stroke="#aeeeff" stroke-width="4" stroke-dasharray="20 10" fill="none" class="whirlpool-spin-reverse" />
                    <ellipse cx="0" cy="0" rx="15" ry="6" fill="#000000" />
                </g>

                <!-- BÊN PHẢI: VÁCH ĐÁ TREO LEO NƠI SCYLLA ẨN NÁP -->
                <polygon points="680,0 1000,0 1000,500 620,500 700,280 640,160" fill="#1b1d21" />
                <!-- Cửa hang đen ngòm trên vách đá -->
                <ellipse cx="800" cy="140" rx="90" ry="70" fill="#090a0c" />

                <!-- QUÁI VẬT 6 ĐẦU SCYLLA VỚI NHỮNG CHIẾC CỔ DÀI NHƯ MÃNG XÀ -->
                <g id="scylla-monster" transform="translate(680, 70)">
                    <!-- 6 CỔ VÀ ĐẦU CỦA SCYLLA -->
                    <!-- Cổ 1 & Đầu 1 (Ở trên cùng) -->
                    <g id="scylla-head-1" class="scylla-neck-idle">
                        <path d="M120,70 Q40,50 -20,20" stroke="url(#scyllaSkin)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-25" cy="20" r="18" fill="#4a2238" />
                        <polygon points="-40,15 -15,10 -20,28" fill="#1f0a17" />
                        <circle cx="-28" cy="16" r="3" fill="#ff0055" />
                    </g>

                    <!-- Cổ 2 & Đầu 2 -->
                    <g id="scylla-head-2" class="scylla-neck-idle" style="animation-delay: 0.3s">
                        <path d="M120,70 Q60,90 -50,60" stroke="url(#scyllaSkin)" stroke-width="20" stroke-linecap="round" fill="none"/>
                        <circle cx="-55" cy="60" r="17" fill="#4a2238" />
                        <circle cx="-58" cy="56" r="3" fill="#ff0055" />
                    </g>

                    <!-- Cổ 3 & Đầu 3 -->
                    <g id="scylla-head-3" class="scylla-neck-idle" style="animation-delay: 0.6s">
                        <path d="M120,70 Q30,120 -80,110" stroke="url(#scyllaSkin)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-85" cy="110" r="18" fill="#4a2238" />
                        <circle cx="-88" cy="106" r="3" fill="#ff0055" />
                    </g>

                    <!-- Cổ 4 & Đầu 4 (ĐẦU TẤN CÔNG CHÍNH) -->
                    <g id="scylla-striking-head" class="scylla-neck-idle" style="animation-delay: 0.2s">
                        <path id="attack-neck-path" d="M120,70 Q10,160 -110,170" stroke="url(#scyllaSkin)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <!-- Mõm và hàm răng nhọn hoắt -->
                        <g id="attack-jaw" transform="translate(-115, 170)">
                            <ellipse cx="0" cy="0" rx="22" ry="16" fill="#5c2645" />
                            <circle cx="-6" cy="-5" r="4" fill="#ff0000" />
                            <!-- Hàm răng cắn nhọn -->
                            <polygon points="-24,4 -16,-2 -8,4 0,-2 8,4" fill="#ffffff" />
                        </g>
                    </g>

                    <!-- Cổ 5 & Đầu 5 -->
                    <g id="scylla-head-5" class="scylla-neck-idle" style="animation-delay: 0.5s">
                        <path d="M120,70 Q40,190 -70,220" stroke="url(#scyllaSkin)" stroke-width="19" stroke-linecap="round" fill="none"/>
                        <circle cx="-75" cy="220" r="16" fill="#4a2238" />
                        <circle cx="-78" cy="216" r="3" fill="#ff0055" />
                    </g>

                    <!-- Cổ 6 & Đầu 6 -->
                    <g id="scylla-head-6" class="scylla-neck-idle" style="animation-delay: 0.8s">
                        <path d="M120,70 Q50,230 -20,260" stroke="url(#scyllaSkin)" stroke-width="18" stroke-linecap="round" fill="none"/>
                        <circle cx="-25" cy="260" r="15" fill="#4a2238" />
                        <circle cx="-28" cy="256" r="3" fill="#ff0055" />
                    </g>
                </g>

                <!-- CON THUYỀN TIẾN GIỮA EO BIỂN -->
                <g id="scylla-ship" class="ship-in-strait" transform="translate(340, 240)">
                    <path d="M30,120 Q140,135 250,115 L290,65 L240,115 L50,115 Q15,80 0,40 Z" fill="#543114" />
                    <!-- Cột buồm -->
                    <line x1="150" y1="115" x2="150" y2="-20" stroke="#331c0a" stroke-width="6" />

                    <!-- ODYSSEUS TUỐT GƯƠM CHIẾN ĐẤU TRÊN MŨI THUYỀN -->
                    <g id="odysseus-fighter" transform="translate(200, 30)">
                        <!-- Áo choàng đỏ tung bay -->
                        <path d="M-10,35 Q-25,15 -35,50" stroke="#b22222" stroke-width="8" fill="none" />
                        <!-- Thân hình chiến binh dũng mãnh -->
                        <rect x="0" y="25" width="22" height="40" fill="#d4af37" rx="2" />
                        <circle cx="11" cy="14" r="12" fill="#e0b98d" />
                        <!-- Mũ sắt hoàng gia -->
                        <path d="M0,12 Q11,-5 22,12 Z" fill="#ffd700" />
                        <!-- THANH GƯƠM ĐỒNG SẴN SÀNG CHÉM ĐẦU QUÁI VẬT -->
                        <g id="odysseus-sword" transform="rotate(-30, 20, 35)">
                            <line x1="20" y1="35" x2="65" y2="10" stroke="#f4d03f" stroke-width="5" stroke-linecap="round" />
                            <polygon points="65,10 75,5 68,15" fill="#ffffff" />
                        </g>
                    </g>

                    <!-- BINH LÍNH CO CỤM TRÊN THUYỀN -->
                    <g id="panicked-crew" transform="translate(60, 60)">
                        <circle cx="20" cy="35" r="8" fill="#cca06e" />
                        <circle cx="45" cy="35" r="8" fill="#cca06e" />
                        <circle cx="70" cy="35" r="8" fill="#cca06e" />
                    </g>
                </g>

                <!-- VẾT CHÉM KIẾM CỦA ODYSSEUS (KHI ĐÚNG) -->
                <g id="slash-arc" opacity="0">
                    <path d="M520,240 Q570,210 610,270" stroke="#00ffff" stroke-width="8" stroke-linecap="round" fill="none" />
                    <circle cx="565" cy="240" r="20" fill="#ffffff" opacity="0.8" />
                </g>

                <!-- VẾT CẮN CỦA SCYLLA VÀ VỠ GỖ (KHI SAI) -->
                <g id="bite-impact" opacity="0">
                    <circle cx="580" cy="340" r="25" fill="#ff0000" opacity="0.6" />
                    <line x1="560" y1="330" x2="600" y2="350" stroke="#fff" stroke-width="4"/>
                    <line x1="600" y1="330" x2="560" y2="350" stroke="#fff" stroke-width="4"/>
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

    // Hoạt họa Scylla khi TRẢ LỜI SAI:
    // Scylla cắn vào chiếc thuyền gây hoảng loạn cho binh lính
    triggerScyllaWrong() {
        const neck = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const bite = document.getElementById('bite-impact');
        const crew = document.getElementById('panicked-crew');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Một chiếc đầu Scylla lao xuống ngoạm vỡ be thuyền! Thủy thủ đoàn hoảng loạn tột cùng!";
            text.className = "action-caption text-danger";
        }

        // Đầu Scylla bổ nhào xuống thuyền
        if (neck) neck.classList.add('scylla-dive-attack');
        if (bite) bite.style.opacity = '1';
        if (ship) ship.classList.add('ship-bitten-shake');
        if (crew) crew.classList.add('crew-panic-anim');

        setTimeout(() => {
            if (neck) neck.classList.remove('scylla-dive-attack');
            if (bite) bite.style.opacity = '0';
            if (ship) ship.classList.remove('ship-bitten-shake');
            if (crew) crew.classList.remove('crew-panic-anim');
        }, 1600);
    }

    // Hoạt họa Scylla khi TRẢ LỜI ĐÚNG:
    // Odysseus vung gươm chém một cái đầu Scylla cố vươn ra
    triggerScyllaCorrect() {
        const sword = document.getElementById('odysseus-sword');
        const slash = document.getElementById('slash-arc');
        const head = document.getElementById('scylla-striking-head');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚔️ <strong>XUẤT SẮC!</strong> Odysseus tung mình chém đứt móng vuốt và đẩy lùi một chiếc đầu Scylla đang bổ tới!";
            text.className = "action-caption text-success";
        }

        if (sword) sword.classList.add('sword-slash-anim');
        if (slash) slash.style.opacity = '1';
        if (head) head.classList.add('scylla-head-recoil');

        setTimeout(() => {
            if (sword) sword.classList.remove('sword-slash-anim');
            if (slash) slash.style.opacity = '0';
            if (head) head.classList.remove('scylla-head-recoil');
        }, 1400);
    }

    // Hoạt họa KẾT THÚC THỬ THÁCH 3: Thuyền phóng vọt qua eo biển
    triggerScyllaEscape(callback) {
        const text = document.getElementById('stage-action-text-3');
        const ship = document.getElementById('scylla-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng xé toạc làn sóng giữa vực xoáy và quái vật, vươn mình ra biển khơi bao la!";
            text.className = "action-caption text-gold";
        }

        if (ship) {
            ship.classList.add('ship-full-escape');
        }

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }
}

