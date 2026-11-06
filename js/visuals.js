/**
 * HỆ THỐNG HIỂN THỊ HÌNH ẢNH & HOẠT HỌA TẢ THỰC CHO 3 THỬ THÁCH SỬ THI
 * Phong cách Hy Lạp cổ đại tả thực với gradient đa tầng, ánh sáng thể tích và đổ bóng kịch tính.
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
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (POLYPHEMUS) TẢ THỰC
    // ==========================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops" id="stage-cyclops">
            <svg class="scene-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="torchGlowReal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ff9900" stop-opacity="0.9"/>
                        <stop offset="40%" stop-color="#ff4500" stop-opacity="0.4"/>
                        <stop offset="80%" stop-color="#2a1205" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="caveAtmosphere" cx="50%" cy="40%" r="75%">
                        <stop offset="0%" stop-color="#36291e"/>
                        <stop offset="50%" stop-color="#1c140d"/>
                        <stop offset="100%" stop-color="#080605"/>
                    </radialGradient>
                    <radialGradient id="cyclopsEyeReal" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#ffffcc"/>
                        <stop offset="25%" stop-color="#ff9900"/>
                        <stop offset="65%" stop-color="#cc1100"/>
                        <stop offset="100%" stop-color="#4a0000"/>
                    </radialGradient>
                    <linearGradient id="bronzeShine" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#f5e1a4"/>
                        <stop offset="40%" stop-color="#c59837"/>
                        <stop offset="80%" stop-color="#805b19"/>
                        <stop offset="100%" stop-color="#4a340b"/>
                    </linearGradient>
                    <linearGradient id="muscleGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#916c50"/>
                        <stop offset="50%" stop-color="#694b34"/>
                        <stop offset="100%" stop-color="#3d2a1c"/>
                    </linearGradient>
                </defs>

                <!-- Không gian hang đá sâu thẳm -->
                <rect width="1000" height="500" fill="url(#caveAtmosphere)" />

                <!-- Các khối nhũ đá tả thực gồ ghề từ trần hang -->
                <path d="M0,0 L70,140 L110,0 L190,170 L250,0 L340,120 L410,0 L530,160 L600,0 L720,190 L790,0 L920,130 L970,0 L1000,160 L1000,0 Z" fill="#140f0a" />
                <path d="M40,0 L90,95 L140,0 L210,110 L270,0 L440,90 L510,0 L650,130 L710,0 L850,100 L910,0 Z" fill="#291e14" opacity="0.6"/>

                <!-- Ánh lửa đuốc góc hang chập chờn -->
                <circle cx="110" cy="230" r="160" fill="url(#torchGlowReal)" class="torch-flicker" />
                <rect x="106" y="250" width="8" height="90" fill="#3a2211" rx="2" />
                <polygon points="100,250 120,250 110,200" fill="#ff7700" class="torch-flame" />

                <!-- Đàn cừu khổng lồ nhấp nhô -->
                <g class="sheep-herd" opacity="0.75">
                    <ellipse cx="290" cy="455" rx="38" ry="24" fill="#cfc8b8" />
                    <circle cx="260" cy="450" r="15" fill="#2d241c" />
                    <ellipse cx="360" cy="465" rx="32" ry="20" fill="#bbb4a4" />
                    <circle cx="335" cy="460" r="13" fill="#2d241c" />
                </g>

                <!-- KHỔNG LỒ CYCLOPS (POLYPHEMUS) TẢ THỰC -->
                <g id="cyclops-monster" class="cyclops-idle" transform="translate(610, 85)">
                    <!-- Khối thân cơ bắp đồ sộ -->
                    <path d="M30,160 Q0,230 10,400 L260,400 Q270,230 230,160 Z" fill="url(#muscleGrad)" />
                    <!-- Khối cơ ngực vạm vỡ & sẹo chiến trận -->
                    <path d="M35,210 Q90,250 145,235 Q200,250 240,210 L230,330 L30,330 Z" fill="#4d3523" opacity="0.85"/>
                    <line x1="80" y1="230" x2="120" y2="280" stroke="#751e1e" stroke-width="4" stroke-linecap="round"/>

                    <!-- Cánh tay phải cầm chùy gỗ gai khổng lồ -->
                    <g id="cyclops-club" transform="rotate(-15, 240, 200)">
                        <path d="M220,180 Q310,270 280,380 L250,390 Q250,290 190,210 Z" fill="#523926" />
                        <path d="M260,150 L310,80 Q340,50 320,160 Z" fill="#301f13" />
                        <!-- Gai nhọn trên chùy -->
                        <polygon points="310,75 330,65 315,90" fill="#1c120a" />
                        <polygon points="330,120 350,115 330,135" fill="#1c120a" />
                    </g>

                    <!-- Đầu gã khổng lồ cơ bắp -->
                    <circle cx="140" cy="140" r="82" fill="url(#muscleGrad)" />
                    <!-- Tai nhọn xù xì -->
                    <polygon points="50,130 25,118 52,152" fill="#573e2b" />
                    <polygon points="225,130 250,118 223,152" fill="#573e2b" />
                    <!-- Bộ râu rậm xơ xác cổ đại -->
                    <path d="M70,170 Q140,260 210,170 Q170,275 140,285 Q110,275 70,170 Z" fill="#211812" />

                    <!-- MỒM GẦM THÉT VỚI RĂNG NANH SẮC NHỌN -->
                    <g id="cyclops-mouth">
                        <path id="mouth-shape" d="M100,185 Q140,195 180,185 Q140,205 100,185 Z" fill="#1a0606" />
                        <polygon points="110,185 118,198 126,185" fill="#eae2d0" />
                        <polygon points="154,185 162,198 170,185" fill="#eae2d0" />
                    </g>

                    <!-- CON MẮT ĐƠN TẢ THỰC VỚI MẠCH MÁU & TRÒNG MẮT CỬ ĐỘNG -->
                    <g id="cyclops-eye-group">
                        <circle cx="140" cy="115" r="30" fill="#140a05" />
                        <circle id="cyclops-eye-ball" cx="140" cy="115" r="25" fill="url(#cyclopsEyeReal)" />
                        <!-- Mạch máu trong mắt -->
                        <path d="M120,115 Q130,110 135,115 M155,108 Q148,113 145,115" stroke="#990000" stroke-width="1.5" fill="none"/>
                        <!-- Con ngươi ác độc -->
                        <ellipse id="cyclops-pupil" cx="140" cy="115" rx="7" ry="16" fill="#000000" />
                        <!-- Mí mắt gồ ghề dày cộm -->
                        <path d="M108,108 Q140,90 172,108" stroke="#3d2a1c" stroke-width="7" fill="none" />
                    </g>

                    <!-- Sống mũi gồ ghề -->
                    <polygon points="135,128 145,128 140,158" fill="#4d3523" />
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM CỦA CYCLOPS -->
                <g id="roar-waves" opacity="0">
                    <circle cx="750" cy="270" r="40" stroke="#ff3300" stroke-width="6" fill="none" class="wave-pulse"/>
                    <circle cx="750" cy="270" r="90" stroke="#ff8800" stroke-width="4" fill="none" class="wave-pulse"/>
                    <circle cx="750" cy="270" r="160" stroke="#ffcc00" stroke-width="2" fill="none" class="wave-pulse"/>
                </g>

                <!-- ODYSSEUS VÀ BINH LÍNH HY LẠP VỚI GIÁP ĐỒNG TẢ THỰC -->
                <g id="greek-soldiers" transform="translate(140, 270)">
                    <g id="soldier-1" transform="translate(0, 50)">
                        <rect x="20" y="50" width="30" height="50" fill="url(#bronzeShine)" rx="3"/>
                        <circle cx="35" cy="35" r="16" fill="#b8860b" />
                        <path d="M22,32 Q35,8 48,32 Z" fill="#902613" />
                        <circle cx="20" cy="70" r="28" fill="url(#bronzeShine)" stroke="#4a340b" stroke-width="3"/>
                        <circle cx="20" cy="70" r="16" fill="#694b15"/>
                        <line x1="25" y1="65" x2="160" y2="40" stroke="#d4af37" stroke-width="4"/>
                        <polygon points="160,40 178,37 160,45" fill="#f5f5f5"/>
                    </g>

                    <!-- ODYSSEUS - VỊ VUA ANH HÙNG (CẦM CUNG VÀNG) -->
                    <g id="odysseus-hero" transform="translate(70, 20)">
                        <path d="M15,40 Q-8,80 5,125 L45,125 Q58,80 40,40 Z" fill="#800000" />
                        <rect x="22" y="42" width="34" height="55" fill="url(#bronzeShine)" rx="4"/>
                        <circle cx="39" cy="25" r="18" fill="#cca06e" />
                        <path d="M26,26 Q39,45 52,26" fill="#361f10" />
                        <path d="M24,20 Q39,-6 54,20 Z" fill="url(#bronzeShine)" />
                        <path d="M37,-4 Q39,-25 41,-4" stroke="#c0392b" stroke-width="8" stroke-linecap="round" />
                        
                        <g id="odysseus-bow">
                            <path d="M60,-5 Q88,45 60,95" stroke="#5c3818" stroke-width="5" fill="none" />
                            <line x1="60" y1="-5" x2="60" y2="95" stroke="#eae2d0" stroke-width="1.5" />
                            <line id="loaded-arrow" x1="25" y1="45" x2="88" y2="45" stroke="#d4af37" stroke-width="3.5" />
                            <polygon points="88,42 98,45 88,48" fill="#c0392b" />
                        </g>
                    </g>
                </g>

                <!-- MŨI TÊN BAY XÉ GIÓ -->
                <g id="arrow-flight" opacity="0">
                    <line x1="290" y1="335" x2="745" y2="200" stroke="#ffd700" stroke-width="5" stroke-dasharray="10 5" />
                    <polygon points="745,200 760,195 750,210" fill="#e74c3c" />
                </g>

                <!-- HIỆU ỨNG ĐÂM MÙ MẮT CUỐI CÙNG -->
                <g id="blind-stake-effect" opacity="0">
                    <line x1="290" y1="330" x2="750" y2="200" stroke="#ff4500" stroke-width="14" stroke-linecap="round" />
                    <circle cx="750" cy="200" r="40" fill="#ffff00" opacity="0.9" />
                    <path d="M710,165 L790,235 M790,165 L710,235" stroke="#cc0000" stroke-width="7" />
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text" class="action-caption">Polyphemus đang chặn lối ra. Hãy trả lời thật nhanh để nhận điểm tốc độ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

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

        if (mouth) mouth.setAttribute('d', 'M85,170 Q140,240 195,170 Q140,250 85,170 Z');
        if (monster) {
            monster.classList.remove('cyclops-idle');
            monster.classList.add('cyclops-roaring');
        }
        if (waves) waves.style.opacity = '1';
        if (soldiers) soldiers.classList.add('soldiers-shaking');

        const stage = document.getElementById('stage-cyclops');
        if (stage) stage.classList.add('screen-rumble');

        setTimeout(() => {
            if (mouth) mouth.setAttribute('d', 'M100,185 Q140,195 180,185 Q140,205 100,185 Z');
            if (monster) {
                monster.classList.remove('cyclops-roaring');
                monster.classList.add('cyclops-idle');
            }
            if (waves) waves.style.opacity = '0';
            if (soldiers) soldiers.classList.remove('soldiers-shaking');
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
                    <circle cx="140" cy="115" r="30" fill="#111" />
                    <line x1="110" y1="90" x2="170" y2="140" stroke="#990000" stroke-width="9"/>
                    <line x1="170" y1="90" x2="110" y2="140" stroke="#990000" stroke-width="9"/>
                `;
            }
            if (monster) monster.classList.add('cyclops-blinded-stumble');
        }, 400);

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }

    // ==========================================
    // 2. THỬ THÁCH 2: VÙNG BIỂN SIRENS MA MỊ
    // ==========================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.sailorJumpCount = 0;
        this.clear();

        const html = `
        <div class="stage-view stage-sirens" id="stage-sirens">
            <svg class="scene-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="fogSeaReal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#141e2a" />
                        <stop offset="40%" stop-color="#0b141d" />
                        <stop offset="100%" stop-color="#05080c" />
                    </linearGradient>
                    <linearGradient id="mistFogReal" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04"/>
                        <stop offset="50%" stop-color="#8bb5d1" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#b8daf0" stop-opacity="0.55"/>
                    </linearGradient>
                </defs>

                <rect width="1000" height="500" fill="url(#fogSeaReal)" />
                <circle cx="750" cy="90" r="50" fill="#eaf2f8" opacity="0.35" filter="blur(8px)" />
                <circle cx="750" cy="90" r="28" fill="#ffffff" opacity="0.65" />

                <!-- HÒN ĐẢO ĐÁ NHỌN NƠI SIRENS ẨN NÁP -->
                <g id="siren-island" transform="translate(620, 80)">
                    <polygon points="50,270 120,70 180,270" fill="#141c22" />
                    <polygon points="140,270 220,100 320,270" fill="#0f161b" />
                    <polygon points="250,270 310,130 370,270" fill="#090d10" />

                    <!-- BÓNG ĐEN CÁC NÀNG SIRENS MA MỊ VỚI ĐÔI CÁNH CHIM ƯNG -->
                    <g id="siren-silhouettes" class="sirens-floating">
                        <g id="siren-1" transform="translate(100, 40)">
                            <ellipse cx="20" cy="30" rx="10" ry="18" fill="#05070a" />
                            <circle cx="20" cy="12" r="8" fill="#05070a" />
                            <path d="M12,25 Q-16,5 0,42 Z" fill="#040608" />
                            <path d="M28,25 Q56,5 40,42 Z" fill="#040608" />
                            <circle cx="17" cy="12" r="1.8" fill="#00ffcc" class="siren-eye" />
                            <circle cx="23" cy="12" r="1.8" fill="#00ffcc" class="siren-eye" />
                        </g>

                        <g id="siren-2" transform="translate(200, 70)">
                            <ellipse cx="20" cy="30" rx="9" ry="16" fill="#05070a" />
                            <circle cx="20" cy="14" r="7" fill="#05070a" />
                            <path d="M12,25 Q-14,6 2,40 Z" fill="#040608" />
                            <path d="M28,25 Q54,6 38,40 Z" fill="#040608" />
                            <circle cx="18" cy="14" r="1.8" fill="#ff00bb" class="siren-eye" />
                            <circle cx="22" cy="14" r="1.8" fill="#ff00bb" class="siren-eye" />
                        </g>
                    </g>
                </g>

                <!-- MÀN SƯƠNG DÀY ĐẶC CHE PHỦ ĐẢO -->
                <rect x="480" y="70" width="520" height="320" fill="url(#mistFogReal)" class="fog-drifting" />

                <!-- SÓNG BIỂN LĂN TĂN -->
                <path d="M0,350 Q250,330 500,350 T1000,350 L1000,500 L0,500 Z" fill="#09141f" opacity="0.8"/>
                <path class="wave-anim" d="M0,370 Q250,390 500,370 T1000,370 L1000,500 L0,500 Z" fill="#050b11" />

                <!-- CHIẾN THUYỀN CỦA ODYSSEUS -->
                <g id="greek-ship" class="ship-bobbing" transform="translate(180, 200)">
                    <path d="M40,160 Q180,180 340,150 Q390,130 420,80 L350,155 L60,155 Q20,110 0,60 Q10,130 40,160 Z" fill="#4d2f14" />
                    <circle cx="390" cy="115" r="8" fill="#ffffff" />
                    <circle cx="390" cy="115" r="4" fill="#000000" />
                    
                    <g id="sailors-rowing">
                        <circle cx="130" cy="140" r="10" fill="#cca06e" />
                        <circle cx="170" cy="140" r="10" fill="#cca06e" />
                        <circle cx="210" cy="140" r="10" fill="#cca06e" />
                        <circle cx="250" cy="140" r="10" fill="#cca06e" />
                        <circle cx="127" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="167" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="207" cy="140" r="2.5" fill="#ffd700" />
                        <circle cx="247" cy="140" r="2.5" fill="#ffd700" />
                    </g>

                    <line x1="200" y1="160" x2="200" y2="-40" stroke="#2c190a" stroke-width="8" />

                    <!-- ODYSSEUS BỊ TRÓI CHẶT VÀ BỊT MẮT -->
                    <g id="odysseus-tied" transform="translate(180, 10)">
                        <rect x="10" y="25" width="20" height="60" fill="#7a2e16" rx="3" />
                        <ellipse cx="20" cy="40" rx="14" ry="4" fill="#d2b48c" stroke="#6b4421" stroke-width="2"/>
                        <ellipse cx="20" cy="55" rx="14" ry="4" fill="#d2b48c" stroke="#6b4421" stroke-width="2"/>
                        <ellipse cx="20" cy="70" rx="14" ry="4" fill="#d2b48c" stroke="#6b4421" stroke-width="2"/>
                        <circle cx="20" cy="15" r="13" fill="#cca06e" />
                        <path d="M10,16 Q20,28 30,16" fill="#361f10" />
                        <rect x="8" y="10" width="24" height="7" fill="#f5f5f5" rx="2" stroke="#bbb" stroke-width="1"/>
                    </g>

                    <!-- BONG BÓNG LỜI THOẠI CĂNG THẲNG -->
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

                <!-- THỦY THỦ NHẢY KHỎI THUYỀN VÀ BỌT NƯỚC BẮN -->
                <g id="jumping-soldier" opacity="0">
                    <circle id="jumper-body" cx="440" cy="340" r="10" fill="#222" />
                    <g id="water-splash" opacity="0">
                        <ellipse cx="440" cy="400" rx="28" ry="10" fill="#aeeeff" />
                        <path d="M420,400 L410,370 M440,400 L440,360 M460,400 L470,370" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                    </g>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-siren">EO BIỂN SIREN HUYỀN HOẶC</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang văng vẳng! Giữ vững tâm trí để bảo toàn thủy thủ!</span>
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
            text.innerHTML = `⚠️ <strong>SAI RỒI!</strong> Odysseus gào thét trong cơn mê hoặc! Một thủy thủ không chịu nổi đã gieo mình xuống biển! (Mất: ${this.sailorJumpCount} lính)`;
            text.className = "action-caption text-danger";
        }

        if (bubble) bubble.style.opacity = '1';
        if (tiedHero) tiedHero.classList.add('hero-struggling');

        if (jumper && jumperBody && splash) {
            jumper.style.opacity = '1';
            jumperBody.setAttribute('cy', '330');
            jumperBody.setAttribute('cx', `${380 + (this.sailorJumpCount * 25)}`);
            
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
        const sirens = document.getElementById('siren-silhouettes');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "✨ <strong>CHÍNH XÁC!</strong> Toàn bộ thủy thủ đều an toàn, các nàng Siren ở xa gào thét trong giận dữ!";
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
                    <radialGradient id="whirlpoolGradReal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#020810"/>
                        <stop offset="50%" stop-color="#0b2c3f"/>
                        <stop offset="100%" stop-color="#145374"/>
                    </radialGradient>
                    <linearGradient id="scyllaSkinReal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#381b2b"/>
                        <stop offset="50%" stop-color="#210f1a"/>
                        <stop offset="100%" stop-color="#0e060b"/>
                    </linearGradient>
                </defs>

                <rect width="1000" height="500" fill="#0a0e14" />
                <path d="M400,0 L390,90 L420,110 L380,220" stroke="#77aaff" stroke-width="2" opacity="0.4" fill="none"/>

                <!-- XOÁY NƯỚC CHARYBDIS -->
                <g id="charybdis-zone" transform="translate(140, 360)">
                    <ellipse cx="0" cy="0" rx="140" ry="60" fill="url(#whirlpoolGradReal)" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="100" ry="40" stroke="#4db8ff" stroke-width="3" stroke-dasharray="30 15" fill="none" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="55" ry="22" stroke="#aeeeff" stroke-width="4" stroke-dasharray="20 10" fill="none" class="whirlpool-spin-reverse" />
                    <ellipse cx="0" cy="0" rx="15" ry="6" fill="#000000" />
                </g>

                <!-- VÁCH ĐÁ TỬ ĐỊA SCYLLA -->
                <polygon points="680,0 1000,0 1000,500 620,500 700,280 640,160" fill="#17181c" />
                <ellipse cx="800" cy="140" rx="90" ry="70" fill="#07080a" />

                <!-- QUÁI VẬT 6 ĐẦU SCYLLA TẢ THỰC -->
                <g id="scylla-monster" transform="translate(680, 70)">
                    <g id="scylla-head-1" class="scylla-neck-idle">
                        <path d="M120,70 Q40,50 -20,20" stroke="url(#scyllaSkinReal)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-25" cy="20" r="18" fill="#4a2238" />
                        <circle cx="-28" cy="16" r="3" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-2" class="scylla-neck-idle" style="animation-delay: 0.3s">
                        <path d="M120,70 Q60,90 -50,60" stroke="url(#scyllaSkinReal)" stroke-width="20" stroke-linecap="round" fill="none"/>
                        <circle cx="-55" cy="60" r="17" fill="#4a2238" />
                        <circle cx="-58" cy="56" r="3" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-3" class="scylla-neck-idle" style="animation-delay: 0.6s">
                        <path d="M120,70 Q30,120 -80,110" stroke="url(#scyllaSkinReal)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-85" cy="110" r="18" fill="#4a2238" />
                        <circle cx="-88" cy="106" r="3" fill="#ff0055" />
                    </g>

                    <!-- ĐẦU BỔ NHÀO CHÍNH -->
                    <g id="scylla-striking-head" class="scylla-neck-idle" style="animation-delay: 0.2s">
                        <path id="attack-neck-path" d="M120,70 Q10,160 -110,170" stroke="url(#scyllaSkinReal)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <g id="attack-jaw" transform="translate(-115, 170)">
                            <ellipse cx="0" cy="0" rx="22" ry="16" fill="#5c2645" />
                            <circle cx="-6" cy="-5" r="4" fill="#ff0000" />
                            <polygon points="-24,4 -16,-2 -8,4 0,-2 8,4" fill="#ffffff" />
                        </g>
                    </g>

                    <g id="scylla-head-5" class="scylla-neck-idle" style="animation-delay: 0.5s">
                        <path d="M120,70 Q40,190 -70,220" stroke="url(#scyllaSkinReal)" stroke-width="19" stroke-linecap="round" fill="none"/>
                        <circle cx="-75" cy="220" r="16" fill="#4a2238" />
                        <circle cx="-78" cy="216" r="3" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-6" class="scylla-neck-idle" style="animation-delay: 0.8s">
                        <path d="M120,70 Q50,230 -20,260" stroke="url(#scyllaSkinReal)" stroke-width="18" stroke-linecap="round" fill="none"/>
                        <circle cx="-25" cy="260" r="15" fill="#4a2238" />
                        <circle cx="-28" cy="256" r="3" fill="#ff0055" />
                    </g>
                </g>

                <!-- CON THUYỀN TIẾN VÀO EO BIỂN -->
                <g id="scylla-ship" class="ship-in-strait" transform="translate(340, 240)">
                    <path d="M30,120 Q140,135 250,115 L290,65 L240,115 L50,115 Q15,80 0,40 Z" fill="#482910" />
                    <line x1="150" y1="115" x2="150" y2="-20" stroke="#2a1608" stroke-width="6" />

                    <!-- ODYSSEUS TUỐT GƯƠM CHIẾN ĐẤU -->
                    <g id="odysseus-fighter" transform="translate(200, 30)">
                        <path d="M-10,35 Q-25,15 -35,50" stroke="#b22222" stroke-width="8" fill="none" />
                        <rect x="0" y="25" width="22" height="40" fill="#d4af37" rx="2" />
                        <circle cx="11" cy="14" r="12" fill="#cca06e" />
                        <path d="M0,12 Q11,-5 22,12 Z" fill="#ffd700" />
                        <g id="odysseus-sword" transform="rotate(-30, 20, 35)">
                            <line x1="20" y1="35" x2="65" y2="10" stroke="#f4d03f" stroke-width="5" stroke-linecap="round" />
                            <polygon points="65,10 75,5 68,15" fill="#ffffff" />
                        </g>
                    </g>

                    <g id="panicked-crew" transform="translate(60, 60)">
                        <circle cx="20" cy="35" r="8" fill="#cca06e" />
                        <circle cx="45" cy="35" r="8" fill="#cca06e" />
                        <circle cx="70" cy="35" r="8" fill="#cca06e" />
                    </g>
                </g>

                <g id="slash-arc" opacity="0">
                    <path d="M520,240 Q570,210 610,270" stroke="#00ffff" stroke-width="8" stroke-linecap="round" fill="none" />
                    <circle cx="565" cy="240" r="20" fill="#ffffff" opacity="0.8" />
                </g>

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
