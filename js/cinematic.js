/**
 * HỆ THỐNG PHÂN CẢNH ĐIỆN ẢNH & TRUYỆN TRANH (AEGIS PROTOCOL CINEMATICS)
 * - Tự động chuyển cảnh với hiệu ứng Ken Burns, tàn tro không gian và thanh tiến trình.
 * - Hộp thoại truyện tranh công nghệ cao luôn hiển thị sắc nét, cố định và rõ ràng.
 * - Hỗ trợ nút "HỒI TIẾP THEO ➔" để chuyển nhanh và "BỎ QUA ⏭" để vào thẳng trận đấu.
 */

class SciFiCinematic {
    constructor(containerId, scenes, onComplete) {
        this.container = document.getElementById(containerId);
        this.scenes = scenes || [];
        this.onComplete = onComplete;
        this.currentScene = 0;
        this.timer = null;
        this.particleCanvas = null;
        this.particleCtx = null;
        this.particles = [];
        this.animFrame = null;
    }

    start() {
        if (!this.container || this.scenes.length === 0) {
            if (this.onComplete) this.onComplete();
            return;
        }
        this.container.style.display = 'flex';
        this.initCanvas();
        this.showScene(0);
    }

    initCanvas() {
        let cv = document.getElementById('cinematic-particle-canvas');
        if (!cv) {
            cv = document.createElement('canvas');
            cv.id = 'cinematic-particle-canvas';
            cv.className = 'cinematic-canvas-overlay';
            this.container.appendChild(cv);
        }
        this.particleCanvas = cv;
        this.particleCtx = cv.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.particles = [];
        for (let i = 0; i < 70; i++) {
            this.particles.push({
                x: Math.random() * (this.particleCanvas.width || window.innerWidth),
                y: Math.random() * (this.particleCanvas.height || window.innerHeight),
                size: Math.random() * 2.5 + 0.8,
                speedY: -(Math.random() * 1.2 + 0.5),
                speedX: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.7 + 0.3,
                hue: Math.random() > 0.4 ? 145 : 35 // Xanh lá cây công nghệ (#00ff88) hoặc vàng cam tia lửa
            });
        }
        this.animateParticles();
    }

    resizeCanvas() {
        if (this.particleCanvas && this.container) {
            this.particleCanvas.width = window.innerWidth;
            this.particleCanvas.height = window.innerHeight;
        }
    }

    animateParticles() {
        if (!this.particleCtx || !this.particleCanvas) return;
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
            ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
            ctx.shadowBlur = 6;
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

        let stageBox = document.getElementById('cinematic-scene-viewport');
        if (!stageBox) {
            stageBox = document.createElement('div');
            stageBox.id = 'cinematic-scene-viewport';
            stageBox.className = 'cinematic-viewport';
            this.container.appendChild(stageBox);
        }

        stageBox.innerHTML = `
            <!-- KHUNG HÌNH TRANH AI TOÀN CẢNH KEN BURNS -->
            <div class="cinematic-slide" id="slide-${sc.id}">
                <img src="${sc.image}" alt="${sc.title}" class="cinematic-art-img" onerror="this.style.display='none'" />
                <div class="cinematic-grid-overlay"></div>
                <div class="cinematic-art-vignette"></div>
            </div>

            <!-- THANH TIẾN TRÌNH TỰ ĐỘNG CHẠY (TIMELINE PROGRESS BAR) -->
            <div class="cinematic-timeline-bar">
                <div class="cinematic-timeline-fill" id="cinematic-timeline-fill" style="animation-duration: ${sc.duration}ms;"></div>
            </div>

            <!-- HỘP THOẠI TRUYỆN TRANH DÃ SỬ SCI-FI (LUÔN CỐ ĐỊNH Ở ĐÁY) -->
            <div class="cinematic-dialogue-card">
                <div class="cinematic-header-row">
                    <div class="cinematic-step-pill">HỒI ${idx + 1} / ${this.scenes.length} // BÁO ĐỘNG ĐỎ</div>
                    <div class="cinematic-control-btns">
                        <button class="btn-cinematic-next" id="btn-next-cinematic">HỒI TIẾP THEO ➔</button>
                        <button class="btn-skip-cinematic" id="btn-skip-cinematic" title="Bỏ qua dẫn truyện">VÀO TRẬN CHIẾN ⏭</button>
                    </div>
                </div>
                <h2 class="cinematic-heading">${sc.title}</h2>
                <p class="cinematic-caption">${sc.desc}</p>
            </div>
        `;

        // Bắt sự kiện bấm nút Tiếp tục hoặc Bỏ qua
        const skipBtn = document.getElementById('btn-skip-cinematic');
        if (skipBtn) {
            skipBtn.onclick = (e) => {
                e.stopPropagation();
                this.finish();
            };
        }

        const nextBtn = document.getElementById('btn-next-cinematic');
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                clearTimeout(this.timer);
                this.showScene(this.currentScene + 1);
            };
        }

        // Tự động chuyển cảnh sau thời gian duration của cảnh đó
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
            }, 500);
        } else if (this.onComplete) {
            this.onComplete();
        }
    }
}
