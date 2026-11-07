/**
 * CINEMATIC INTRO: TRẬN CHIẾN THÀNH TROY (TỰ ĐỘNG CHẠY HOÀN TOÀN)
 * Đồ họa tả thực với hiệu ứng Ken Burns, tàn tro than hồng và tự động chuyển cảnh mượt mà
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

        // Mỗi cảnh kéo dài 3.5 giây và tự động trôi nhanh, gọn gàng sang cảnh tiếp theo
        this.scenes = [
            {
                id: "scene-horse",
                title: "HỒI I: ĐÊM THÀNH TROY – MƯU KẾ NGỰA GỖ",
                desc: "Năm thứ mười của cuộc vây hãm huyền thoại... Mưu kế vĩ đại của Odysseus với Con Ngựa Gỗ khổng lồ đã mở toang cánh cổng thành tưởng chừng bất khả xâm phạm.",
                duration: 3500,
                render: () => this.renderTrojanHorseScene()
            },
            {
                id: "scene-fire",
                title: "HỒI II: BIỂN LỬA THÀNH TROY",
                desc: "Ngọn lửa bốc cao ngùn ngụt thấu tận trời xanh, cung điện Priam sụp đổ trong tro tàn. Thắng lợi đẫm máu của người Hy Lạp đã khơi mào cơn thịnh nộ của thần biển Poseidon.",
                duration: 3500,
                render: () => this.renderBurningTroyScene()
            },
            {
                id: "scene-fleet",
                title: "HỒI III: HẠM ĐỘI XUẤT PHÁT VỀ ITHACA",
                desc: "Những chiến thuyền rẽ sóng rời bến bờ rực lửa, tiến vào biển khơi bão tố. Odysseus không hề hay biết một hải trình 10 năm đằng đẵng với muôn vàn quái thú đang chực chờ...",
                duration: 3500,
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

        this.particles = [];
        for (let i = 0; i < 75; i++) {
            this.particles.push({
                x: Math.random() * (this.particleCanvas.width || window.innerWidth),
                y: Math.random() * (this.particleCanvas.height || window.innerHeight),
                size: Math.random() * 3 + 1,
                speedY: -(Math.random() * 1.6 + 0.8),
                speedX: (Math.random() - 0.5) * 1.2,
                opacity: Math.random() * 0.8 + 0.2,
                hue: Math.floor(Math.random() * 30 + 15)
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

    // TỰ ĐỘNG CHUYỂN CẢNH MƯỢT MÀ KHÔNG CẦN BẤM
    showScene(idx) {
        if (idx >= this.scenes.length) {
            this.finish();
            return;
        }
        this.currentScene = idx;
        const sc = this.scenes[idx];

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
            <!-- THANH TIẾN TRÌNH TỰ ĐỘNG CHẠY (TIMELINE PROGRESS BAR) -->
            <div class="cinematic-timeline-bar">
                <div class="cinematic-timeline-fill" style="animation-duration: ${sc.duration}ms;"></div>
            </div>
            <div class="cinematic-text-bar">
                <div class="cinematic-header-row">
                    <span class="cinematic-step-pill">${idx + 1} / ${this.scenes.length}</span>
                    <button class="btn-skip-cinematic" id="btn-skip-cinematic" title="Bỏ qua dẫn truyện">BỎ QUA DẪN TRUYỆN ⏭</button>
                </div>
                <h2 class="cinematic-heading">${sc.title}</h2>
                <p class="cinematic-caption">${sc.desc}</p>
            </div>
        `;

        const skipBtn = document.getElementById('btn-skip-cinematic');
        if (skipBtn) skipBtn.onclick = () => this.finish();

        // TỰ ĐỘNG CHUYỂN CẢNH SAU THỜI GIAN QUY ĐỊNH
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            // Hiệu ứng mờ dần chuyển cảnh
            const slide = document.getElementById(`slide-${sc.id}`);
            if (slide) slide.classList.add('cinematic-fade-transition');
            setTimeout(() => {
                this.showScene(this.currentScene + 1);
            }, 450);
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

    // 1. CẢNH 1: CON NGỰA GỖ TẠI CỔNG THÀNH TROY (TRÍCH XUẤT TỪ FIGMA TROY)
    renderTrojanHorseScene() {
        return `
        <div class="cinematic-slide-backdrop">
            <img src="assets/troy_night_scene.jpg" alt="Troy — Đêm Tro Tàn" class="cinematic-art-img" />
            <div class="cinematic-art-vignette"></div>
        </div>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <defs>
                <radialGradient id="moonGlow" cx="65%" cy="25%" r="55%">
                    <stop offset="0%" stop-color="#fff5cc" stop-opacity="0.25"/>
                    <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <circle cx="820" cy="140" r="240" fill="url(#moonGlow)"/>
        </svg>
        `;
    }

    // 2. CẢNH 2: BIỂN LỬA THÀNH TROY
    renderBurningTroyScene() {
        return `
        <div class="cinematic-slide-backdrop">
            <img src="assets/troy_night_scene.jpg" alt="Biển lửa thành Troy" class="cinematic-art-img cinematic-inferno-mode" />
            <div class="cinematic-fire-vignette"></div>
        </div>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <defs>
                <linearGradient id="fireFlare" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="#ff3700" stop-opacity="0.65"/>
                    <stop offset="45%" stop-color="#ff7b00" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <rect y="220" width="1200" height="380" fill="url(#fireFlare)"/>
        </svg>
        `;
    }

    // 3. CẢNH 3: HẠM ĐỘI TIẾN VÀO GIÔNG BÃO
    renderFleetDepartureScene() {
        return `
        <div class="cinematic-slide-backdrop">
            <img src="assets/greek_trireme.jpg" alt="Hạm đội xuất phát về Ithaca" class="cinematic-art-img cinematic-storm-mode" />
            <div class="cinematic-storm-vignette"></div>
        </div>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" class="cinematic-svg">
            <!-- TIA CHỚP BÃO TỐ Ở CHÂN TRỜI -->
            <path d="M920,0 L880,110 L940,140 L890,260" stroke="#77ccff" stroke-width="3" opacity="0.8" fill="none"/>
        </svg>
        `;
    }
}
