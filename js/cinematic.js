/**
 * HỆ THỐNG PHÂN CẢNH ĐIỆN ẢNH & TRUYỆN TRANH (AEGIS PROTOCOL CINEMATICS)
 * Tự động chuyển cảnh với hiệu ứng Ken Burns, tàn tro không gian và thanh tiến trình
 * Hỗ trợ cả Mở đầu (Intro) và Kết thúc chiến thắng (Outro Epilogue)
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
        this.container.style.display = 'block';
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
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: Math.random() * (this.particleCanvas.width || window.innerWidth),
                y: Math.random() * (this.particleCanvas.height || window.innerHeight),
                size: Math.random() * 2.5 + 0.8,
                speedY: -(Math.random() * 1.2 + 0.5),
                speedX: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.7 + 0.3,
                hue: Math.random() > 0.5 ? 190 : 25 // Xanh cyan công nghệ hoặc cam tia lửa
            });
        }
        this.animateParticles();
    }

    resizeCanvas() {
        if (this.particleCanvas && this.container) {
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
            <div class="cinematic-slide kenburns-anim" id="slide-${sc.id}">
                <div class="cinematic-slide-backdrop">
                    <img src="${sc.image}" alt="${sc.title}" class="cinematic-art-img" onerror="this.style.display='none'" />
                    <div class="cinematic-sci-fi-grid"></div>
                    <div class="cinematic-art-vignette"></div>
                </div>
            </div>

            <!-- THANH TIẾN TRÌNH TỰ ĐỘNG CHẠY (TIMELINE PROGRESS BAR) -->
            <div class="cinematic-timeline-bar">
                <div class="cinematic-timeline-fill" style="animation-duration: ${sc.duration}ms;"></div>
            </div>

            <!-- HỘP THOẠI TRUYỆN TRANH DÃ SỬ SCI-FI -->
            <div class="cinematic-text-bar scifi-dialogue-box">
                <div class="cinematic-header-row">
                    <span class="cinematic-step-pill">HỒI ${idx + 1} / ${this.scenes.length}</span>
                    <button class="btn-skip-cinematic" id="btn-skip-cinematic" title="Bỏ qua dẫn truyện">BỎ QUA DẪN TRUYỆN ⏭</button>
                </div>
                <h2 class="cinematic-heading">${sc.title}</h2>
                <p class="cinematic-caption">${sc.desc}</p>
            </div>
        `;

        const skipBtn = document.getElementById('btn-skip-cinematic');
        if (skipBtn) {
            skipBtn.onclick = () => this.finish();
        }

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
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
}
