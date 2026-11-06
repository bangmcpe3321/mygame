/**
 * CINEMATIC INTRO: TRẬN CHIẾN THÀNH TROY
 * Đồ họa tả thực với hiệu ứng chuyển động Ken Burns, tàn tro than hồng và khói lửa sử thi
 */

class TroyCinematic {
    constructor(containerId, onComplete) {
        this.container = document.getElementById(containerId);
        this.onComplete = onComplete;
        this.currentScene = 0;
        this.timer = null;
        this.particleCanvas = null;
        this.particleCtx = null;
        this.particles = [];
        this.animFrame = null;

        this.scenes = [
            {
                id: "scene-horse",
                title: "ĐÊM THÀNH TROY – MƯU KẾ NGỰA GỖ",
                desc: "Năm thứ mười của cuộc vây hãm huyền thoại... Mưu kế vĩ đại của Odysseus với Con Ngựa Gỗ khổng lồ đã mở toang cánh cổng thành tưởng chừng bất khả xâm phạm.",
                duration: 6500,
                render: () => this.renderTrojanHorseScene()
            },
            {
                id: "scene-fire",
                title: "BIỂN LỬA THÀNH TROY",
                desc: "Ngọn lửa bốc cao ngùn ngụt thấu tận trời xanh, cung điện Priam sụp đổ trong tro tàn. Thắng lợi đẫm máu của người Hy Lạp đã khơi mào cơn thịnh nộ của thần biển Poseidon.",
                duration: 6500,
                render: () => this.renderBurningTroyScene()
            },
            {
                id: "scene-fleet",
                title: "HẠM ĐỘI XUẤT PHÁT VỀ ITHACA",
                desc: "Những chiến thuyền rẽ sóng rời bến bờ rực lửa, tiến vào biển khơi bão tố. Odysseus không hề hay biết một hải trình 10 năm đằng đẵng với quái thú đang chực chờ...",
                duration: 6500,
                render: () => this.renderFleetDepartureScene()
            }
        ];
    }

    start() {
        if (!this.container) return;
        this.container.style.display = 'block';
        this.initCanvas();
        this.showScene(0);
    }

    initCanvas() {
        // Tạo canvas hạt tàn tro than hồng bay lơ lửng
        let cv = document.getElementById('cinematic-ember-canvas');
        if (!cv) {
            cv = document.createElement('canvas');
            cv.id = 'cinematic-ember-canvas';
            cv.className = 'cinematic-canvas-overlay';
            this.container.appendChild(cv);
        }
        this.particleCanvas = cv;
        this.particleCtx = cv.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Khởi tạo các hạt tàn lửa
        this.particles = [];
        for (let i = 0; i < 70; i++) {
            this.particles.push({
                x: Math.random() * this.particleCanvas.width,
                y: Math.random() * this.particleCanvas.height,
                size: Math.random() * 3 + 1,
                speedY: -(Math.random() * 1.5 + 0.8),
                speedX: (Math.random() - 0.5) * 1.2,
                opacity: Math.random() * 0.8 + 0.2,
                hue: Math.floor(Math.random() * 30 + 15) // Cam đến đỏ
            });
        }
        this.animateParticles();
    }

    resizeCanvas() {
        if (this.particleCanvas) {
            this.particleCanvas.width = this.container.clientWidth || window.innerWidth;
            this.particleCanvas.height = this.container.clientHeight || window.innerHeight;
        }
    }

    animateParticles() {
        if (!this.particleCtx) return;
        const ctx = this.particleCtx;
        const w = this.particleCanvas.width;
        const h = this.particleCanvas.height;

        ctx.clearRect(0, 0, w, h);

        for (let p of this.particles) {
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y < 0) {
                p.y = h + 10;
                p.x = Math.random() * w;
            }
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
            ctx.fill();
        }

        this.animFrame = requestAnimationFrame(() => this.animateParticles());
    }

    showScene(idx) {
        if (idx >= this.scenes.length) {
            this.finish();
            return;
        }
        this.currentScene = idx;
        const sc = this.scenes[idx];

        // Tạo khung cảnh HTML
        let stageBox = document.getElementById('cinematic-scene-viewport');
        if (!stageBox) {
            stageBox = document.createElement('div');
            stageBox.id = 'cinematic-scene-viewport';
            stageBox.className = 'cinematic-viewport';
            this.container.appendChild(stageBox);
        }

        stageBox.innerHTML = `
            <div class="cinematic-slide kenburns-anim" id="slide-${sc.id}">
                ${sc.render()}
            </div>
            <div class="cinematic-text-bar">
                <div class="cinematic-step-pill">HỒI ${idx + 1} / ${this.scenes.length}</div>
                <h2 class="cinematic-heading">${sc.title}</h2>
                <p class="cinematic-caption">${sc.desc}</p>
                <div class="cinematic-controls">
                    <button class="btn-skip-cinematic" id="btn-skip-cinematic">BỎ QUA DẪN TRUYỆN ➔</button>
                    <button class="btn-next-cinematic" id="btn-next-cinematic">TIẾP THEO ▸</button>
                </div>
            </div>
        `;

        document.getElementById('btn-skip-cinematic').onclick = () => this.finish();
        document.getElementById('btn-next-cinematic').onclick = () => {
            clearTimeout(this.timer);
            this.showScene(this.currentScene + 1);
        };

        // Tự động chuyển cảnh sau thời gian quy định
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.showScene(this.currentScene + 1);
        }, sc.duration);
    }

    finish() {
        clearTimeout(this.timer);
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        if (this.container) {
            this.container.classList.add('cinematic-fade-out');
            setTimeout(() => {
                this.container.style.display = 'none';
                this.container.classList.remove('cinematic-fade-out');
                if (this.onComplete) this.onComplete();
            }, 600);
        } else if (this.onComplete) {
            this.onComplete();
        }
    }

    // 1. CẢNH 1: CON NGỰA GỖ KHỔNG LỒ TẠI CỔNG THÀNH TROY
    renderTrojanHorseScene() {
        return `
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <defs>
                <radialGradient id="moonSky" cx="70%" cy="20%" r="80%">
                    <stop offset="0%" stop-color="#152238" />
                    <stop offset="50%" stop-color="#0a101d" />
                    <stop offset="100%" stop-color="#030508" />
                </radialGradient>
                <linearGradient id="fireRim" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="#ff4500" stop-opacity="0.9" />
                    <stop offset="35%" stop-color="#ff8800" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="#000000" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="horseWood" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#3b2514" />
                    <stop offset="50%" stop-color="#24170c" />
                    <stop offset="100%" stop-color="#150d07" />
                </linearGradient>
            </defs>

            <!-- Bầu trời đêm trăng mờ đục khói bụi -->
            <rect width="1200" height="600" fill="url(#moonSky)" />
            <circle cx="850" cy="110" r="45" fill="#f4ebd9" opacity="0.6" filter="blur(4px)" />

            <!-- Ánh lửa hắt từ phía chân trời -->
            <rect y="350" width="1200" height="250" fill="url(#fireRim)" />

            <!-- BỨC TƯỜNG THÀNH TROY VĨ ĐẠI BẰNG ĐÁ KHỔNG LỒ (BÊN PHẢI) -->
            <polygon points="700,100 1200,80 1200,600 680,600" fill="#1b1c1e" />
            <polygon points="700,100 730,70 1200,50 1200,80" fill="#2d2f33" />
            <!-- Các lỗ châu mai trên thành -->
            <rect x="730" y="60" width="25" height="40" fill="#0d0e10" />
            <rect x="790" y="58" width="25" height="40" fill="#0d0e10" />
            <rect x="850" y="56" width="25" height="40" fill="#0d0e10" />
            <rect x="910" y="54" width="25" height="40" fill="#0d0e10" />
            <rect x="970" y="52" width="25" height="40" fill="#0d0e10" />

            <!-- CỔNG THÀNH SKAIAN VĨ ĐẠI ĐANG MỞ TOANG -->
            <path d="M780,260 Q880,180 980,260 L980,600 L780,600 Z" fill="#0a0a0c" />
            <!-- Cửa gỗ đồng mở rộng sang 2 bên -->
            <polygon points="760,280 780,260 780,600 730,590" fill="#3a2212" stroke="#d4af37" stroke-width="2"/>
            <polygon points="1000,280 980,260 980,600 1030,590" fill="#3a2212" stroke="#d4af37" stroke-width="2"/>

            <!-- ĐỒ HỌA TẢ THỰC CON NGỰA GỖ THÀNH TROY (TROJAN HORSE) -->
            <g id="trojan-horse" transform="translate(320, 110)">
                <!-- Bánh xe gỗ lớn gắn xích sắt kéo -->
                <circle cx="80" cy="440" r="38" fill="#1f1610" stroke="#543d2b" stroke-width="8"/>
                <circle cx="80" cy="440" r="14" fill="#0c0906" />
                <circle cx="280" cy="440" r="38" fill="#1f1610" stroke="#543d2b" stroke-width="8"/>
                <circle cx="280" cy="440" r="14" fill="#0c0906" />

                <!-- Bệ đỡ xe kéo bằng dầm gỗ lớn -->
                <rect x="30" y="400" width="310" height="28" fill="#2d1c10" rx="4" />

                <!-- Bốn chân vững chãi như cột đình -->
                <polygon points="65,280 100,280 95,400 65,400" fill="url(#horseWood)" />
                <polygon points="105,280 135,280 130,400 100,400" fill="#150d07" />
                <polygon points="245,280 275,280 270,400 240,400" fill="#150d07" />
                <polygon points="275,280 310,280 305,400 275,400" fill="url(#horseWood)" />

                <!-- Thân mình ngựa gỗ khổng lồ ghép từ các tấm ván thuyền chiến -->
                <path d="M50,220 Q80,140 200,150 Q310,160 330,240 Q310,310 180,310 Q80,310 50,220 Z" fill="url(#horseWood)" stroke="#1a110a" stroke-width="3"/>
                <!-- Các vân ghép nối gỗ và đinh tán đồng -->
                <line x1="120" y1="155" x2="110" y2="305" stroke="#120b06" stroke-width="2" />
                <line x1="190" y1="152" x2="180" y2="308" stroke="#120b06" stroke-width="2" />
                <line x1="260" y1="165" x2="250" y2="295" stroke="#120b06" stroke-width="2" />

                <!-- Cửa sập bí mật dưới bụng ngựa hé mở (nơi chiến binh lẻn ra) -->
                <rect x="150" y="290" width="55" height="15" fill="#ffd700" opacity="0.3" filter="blur(2px)"/>
                <line x1="145" y1="300" x2="205" y2="300" stroke="#000" stroke-width="3" />
                <!-- Dây thừng thả xuống từ bụng ngựa -->
                <line x1="175" y1="305" x2="175" y2="390" stroke="#8b5a2b" stroke-width="2" stroke-dasharray="4 2"/>

                <!-- Đuôi ngựa bện bằng dây thừng gai -->
                <path d="M50,230 Q20,290 40,360" stroke="#2b1a0d" stroke-width="12" stroke-linecap="round" fill="none"/>

                <!-- Cổ ngựa vươn cao dũng mãnh -->
                <polygon points="290,200 350,110 390,140 330,240" fill="url(#horseWood)" />
                <!-- Đầu ngựa gỗ kiêu hãnh -->
                <polygon points="340,115 420,65 440,105 380,140" fill="#2d1c10" />
                <!-- Mắt ngựa chạm khắc tinh xảo -->
                <polygon points="395,85 410,80 405,95" fill="#ffd700" />
                <!-- Tai nhọn giương lên -->
                <polygon points="350,115 360,65 375,105" fill="#1f140b" />
            </g>

            <!-- CÁC CHIẾN BINH HY LẠP BƯỚC RA TỪ BÓNG TỐI DƯỚI CHÂN NGỰA -->
            <g id="infiltrators" transform="translate(480, 480)">
                <!-- Bóng chiến binh cầm khiên & đuốc -->
                <ellipse cx="20" cy="50" rx="14" ry="24" fill="#0d0e12" />
                <circle cx="20" cy="20" r="10" fill="#0d0e12" />
                <path d="M12,18 Q20,2 28,18 Z" fill="#a63a24" />
                <line x1="30" y1="35" x2="50" y2="15" stroke="#5c3818" stroke-width="3"/>
                <circle cx="52" cy="12" r="10" fill="#ff7700" opacity="0.8" filter="blur(2px)"/>

                <ellipse cx="60" cy="55" rx="12" ry="22" fill="#0a0a0e" />
                <circle cx="60" cy="25" r="9" fill="#0a0a0e" />
                <line x1="65" y1="40" x2="110" y2="20" stroke="#d4af37" stroke-width="3"/>
            </g>
        </svg>
        `;
    }

    // 2. CẢNH 2: BIỂN LỬA THÀNH TROY
    renderBurningTroyScene() {
        return `
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <defs>
                <linearGradient id="infernoSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2a0505" />
                    <stop offset="40%" stop-color="#6b1708" />
                    <stop offset="80%" stop-color="#cc3708" />
                    <stop offset="100%" stop-color="#ff7b00" />
                </linearGradient>
                <radialGradient id="blastFire" cx="50%" cy="80%" r="60%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="25%" stop-color="#ffea00" />
                    <stop offset="60%" stop-color="#ff3700" />
                    <stop offset="100%" stop-color="#1f0202" stop-opacity="0" />
                </radialGradient>
            </defs>

            <!-- Bầu trời rực lửa kinh hoàng -->
            <rect width="1200" height="600" fill="url(#infernoSky)" />
            <circle cx="600" cy="480" r="500" fill="url(#blastFire)" opacity="0.6"/>

            <!-- DÃY THÀNH VÀ CUNG ĐIỆN PRIAM ĐANG SỤP ĐỔ TRONG LỬA -->
            <g id="burning-palaces" fill="#140606">
                <!-- Cột đá đền thờ Hy Lạp gãy đổ -->
                <polygon points="120,600 120,240 160,250 160,600" />
                <polygon points="190,600 200,320 230,330 220,600" />
                <polygon points="260,600 260,210 300,220 300,600" />
                <!-- Mái đầu hồi đền thờ vỡ vụn -->
                <polygon points="80,260 210,130 340,240 310,270 210,180 110,280" />

                <!-- Cung điện trung tâm bốc cháy -->
                <polygon points="450,600 450,180 550,120 650,180 650,600" />
                <polygon points="680,600 700,240 760,250 750,600" />
                <polygon points="800,600 820,190 920,150 960,600" />
            </g>

            <!-- NGỌN LỬA DỮ DỘI CUỘN BỐC TỪ ĐÁY THÀNH -->
            <path d="M0,600 Q150,420 250,520 Q350,380 480,480 Q600,340 720,490 Q850,370 980,510 Q1100,400 1200,600 Z" fill="#ff4500" opacity="0.8" />
            <path d="M50,600 Q200,450 320,550 Q450,420 580,520 Q750,390 880,530 Q1050,440 1200,600 Z" fill="#ffbb00" opacity="0.7" />

            <!-- BÓNG DÁNG VỊ VUA ODYSSEUS NHÌN LẠI CHIẾN ĐỊA -->
            <g id="odysseus-troy-gaze" transform="translate(180, 360)">
                <!-- Đỉnh đá cao nơi đứng -->
                <polygon points="-60,240 40,80 140,240" fill="#080303" />
                <!-- Thân hình người anh hùng với áo choàng đỏ lộng gió -->
                <path d="M20,60 Q-20,90 -40,140 Q0,110 35,90 Z" fill="#800000" />
                <rect x="25" y="45" width="22" height="42" fill="#d4af37" rx="3"/>
                <circle cx="36" cy="28" r="14" fill="#cca06e" />
                <path d="M24,25 Q36,-2 48,25 Z" fill="#ffd700" />
                <!-- Ngọn giáo cắm xuống đất -->
                <line x1="55" y1="10" x2="55" y2="120" stroke="#f0e68c" stroke-width="4"/>
            </g>
        </svg>
        `;
    }

    // 3. CẢNH 3: HẠM ĐỘI HY LẠP RỜI BỜ BIỂN TIẾN VÀO GIÔNG BÃO
    renderFleetDepartureScene() {
        return `
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <defs>
                <linearGradient id="stormSea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#07131e" />
                    <stop offset="50%" stop-color="#0d283d" />
                    <stop offset="100%" stop-color="#040b12" />
                </linearGradient>
                <radialGradient id="settingSunFire" cx="15%" cy="30%" r="50%">
                    <stop offset="0%" stop-color="#ff7b00" stop-opacity="0.8" />
                    <stop offset="40%" stop-color="#c43b00" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#07131e" stop-opacity="0" />
                </radialGradient>
            </defs>

            <!-- Bầu trời biển hoàng hôn mờ khói -->
            <rect width="1200" height="600" fill="url(#stormSea)" />
            <circle cx="180" cy="200" r="300" fill="url(#settingSunFire)" />

            <!-- Ánh chớp giông bão từ biển xa -->
            <path d="M920,0 L880,110 L940,140 L890,260" stroke="#77ccff" stroke-width="2.5" opacity="0.6" fill="none"/>

            <!-- Bờ biển Troy lùi dần về phía sau bên trái -->
            <polygon points="0,220 220,380 0,600" fill="#140f0c" opacity="0.9"/>
            <polygon points="20,180 80,300 0,350" fill="#ff3300" opacity="0.3" filter="blur(8px)"/>

            <!-- SÓNG BIỂN AEGEAN CUỒN CUỘN -->
            <path d="M0,420 Q300,380 600,430 T1200,420 L1200,600 L0,600 Z" fill="#091c2b" />
            <path d="M0,460 Q300,500 600,460 T1200,460 L1200,600 L0,600 Z" fill="#06121c" />

            <!-- CON TÀU CHIẾN SOÁI HẠM CỦA ODYSSEUS GIỮA ĐẦU SÓNG -->
            <g id="flagship-departure" transform="translate(480, 260) scale(1.15)">
                <!-- Thân tàu chiến lướt sóng -->
                <path d="M20,150 Q160,170 320,140 Q380,110 400,60 L330,145 L40,145 Q0,100 -20,50 Q-10,120 20,150 Z" fill="#42250d" />
                <!-- Mũi đâm thuyền bọc đồng sắc bén -->
                <polygon points="380,120 440,135 370,145" fill="#c49a45" />

                <!-- Cột buồm và cánh buồm đen căng gió -->
                <line x1="180" y1="150" x2="180" y2="-40" stroke="#241407" stroke-width="7"/>
                <path d="M180,-30 Q270,-10 270,70 L180,60 Z" fill="#11161b" opacity="0.9" stroke="#333" stroke-width="1.5"/>

                <!-- Các mái chèo dập dờn rẽ nước -->
                <line x1="80" y1="150" x2="40" y2="210" stroke="#7a4d25" stroke-width="4"/>
                <line x1="120" y1="150" x2="80" y2="210" stroke="#7a4d25" stroke-width="4"/>
                <line x1="160" y1="150" x2="120" y2="210" stroke="#7a4d25" stroke-width="4"/>
                <line x1="200" y1="150" x2="160" y2="210" stroke="#7a4d25" stroke-width="4"/>
                <line x1="240" y1="150" x2="200" y2="210" stroke="#7a4d25" stroke-width="4"/>
            </g>

            <!-- CÁC THUYỀN KHÁC TRONG HẠM ĐỘI Ở PHÍA XA -->
            <g id="fleet-distant" opacity="0.5" transform="translate(860, 310) scale(0.55)">
                <path d="M0,140 Q150,160 300,130 L280,70 L20,70 Z" fill="#080e14"/>
                <line x1="150" y1="130" x2="150" y2="-10" stroke="#000" stroke-width="6"/>
                <path d="M150,-5 Q220,10 220,70 L150,60 Z" fill="#0a121a"/>
            </g>
        </svg>
        `;
    }
}

