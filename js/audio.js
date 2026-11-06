/**
 * BỘ TẠO HIỆU ỨNG ÂM THANH SỬ THI BẰNG WEB AUDIO API
 * Không phụ thuộc tệp âm thanh bên ngoài, hoạt động mượt mà và độc lập.
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.ambientGain = null;
        this.ambientPlaying = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.ctx) {
            this.stopAmbient();
        } else if (this.enabled) {
            this.init();
            this.startAmbient();
        }
        return this.enabled;
    }

    // 1. Tiếng tên bắn trúng mục tiêu (Cyclops bị trúng tên)
    playArrowHit() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng vút tên
        const whoosh = this.ctx.createOscillator();
        const whooshGain = this.ctx.createGain();
        whoosh.type = 'sine';
        whoosh.frequency.setValueAtTime(600, now);
        whoosh.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        whooshGain.gain.setValueAtTime(0.3, now);
        whooshGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        whoosh.connect(whooshGain);
        whooshGain.connect(this.ctx.destination);
        whoosh.start(now);
        whoosh.stop(now + 0.15);

        // Tiếng cắm phập vào thịt / da
        setTimeout(() => {
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const hit = this.ctx.createOscillator();
            const hitGain = this.ctx.createGain();
            hit.type = 'triangle';
            hit.frequency.setValueAtTime(140, t);
            hit.frequency.exponentialRampToValueAtTime(40, t + 0.2);
            hitGain.gain.setValueAtTime(0.6, t);
            hitGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
            hit.connect(hitGain);
            hitGain.connect(this.ctx.destination);
            hit.start(t);
            hit.stop(t + 0.25);
        }, 120);
    }

    // 2. Tiếng Cyclops gầm đe dọa (Khi trả lời sai)
    playCyclopsRoar() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng gầm trầm rung chuyển
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(65, now + 0.6);
        osc.frequency.linearRampToValueAtTime(45, now + 1.1);

        // Bộ lọc âm tần thấp (Lowpass) để tạo độ ồm, uy lực khổng lồ
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);
        filter.frequency.linearRampToValueAtTime(180, now + 1.1);

        oscGain.gain.setValueAtTime(0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
    }

    // 3. Tiếng chọc mù mắt Cyclops (Kết thúc thử thách 1)
    playBlindImpact() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng nứt vỡ rùng rợn + gầm thét đau đớn
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.8);
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.5);
    }

    // 4. Tiếng gào thét của Odysseus & tiếng người lính nhảy xuống biển (Thử thách 2 - Trả lời sai)
    playScreamAndSplash() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng rên xiết căng thẳng (Odysseus gào thét)
        const scream = this.ctx.createOscillator();
        const screamGain = this.ctx.createGain();
        scream.type = 'sine';
        scream.frequency.setValueAtTime(400, now);
        scream.frequency.linearRampToValueAtTime(650, now + 0.3);
        scream.frequency.linearRampToValueAtTime(320, now + 0.6);
        screamGain.gain.setValueAtTime(0.4, now);
        screamGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

        scream.connect(screamGain);
        screamGain.connect(this.ctx.destination);
        scream.start(now);
        scream.stop(now + 0.7);

        // Tiếng nhảy tùm xuống nước (Splash)
        setTimeout(() => {
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const splash = this.ctx.createOscillator();
            const splashGain = this.ctx.createGain();
            splash.type = 'triangle';
            splash.frequency.setValueAtTime(260, t);
            splash.frequency.exponentialRampToValueAtTime(50, t + 0.4);
            splashGain.gain.setValueAtTime(0.5, t);
            splashGain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

            splash.connect(splashGain);
            splashGain.connect(this.ctx.destination);
            splash.start(t);
            splash.stop(t + 0.45);
        }, 350);
    }

    // 5. Tiếng Sirens gầm rú giận dữ (Thử thách 2 - Trả lời đúng)
    playSirenFurious() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng rít the thé ghê rợn trong sương
        const hiss = this.ctx.createOscillator();
        const hissGain = this.ctx.createGain();
        hiss.type = 'sawtooth';
        hiss.frequency.setValueAtTime(800, now);
        hiss.frequency.linearRampToValueAtTime(1100, now + 0.3);
        hiss.frequency.linearRampToValueAtTime(450, now + 0.8);
        hissGain.gain.setValueAtTime(0.25, now);
        hissGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(600, now);

        hiss.connect(filter);
        filter.connect(hissGain);
        hissGain.connect(this.ctx.destination);

        hiss.start(now);
        hiss.stop(now + 0.8);
    }

    // 6. Tiếng chém kiếm của Odysseus (Thử thách 3 - Trả lời đúng)
    playSwordSlash() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng kim loại rít gió (slash)
        const slash = this.ctx.createOscillator();
        const slashGain = this.ctx.createGain();
        slash.type = 'sine';
        slash.frequency.setValueAtTime(1200, now);
        slash.frequency.exponentialRampToValueAtTime(300, now + 0.2);
        slashGain.gain.setValueAtTime(0.4, now);
        slashGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        slash.connect(slashGain);
        slashGain.connect(this.ctx.destination);
        slash.start(now);
        slash.stop(now + 0.22);

        // Tiếng chém trúng quái vật Scylla (monster squeal)
        setTimeout(() => {
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const squeal = this.ctx.createOscillator();
            const sqGain = this.ctx.createGain();
            squeal.type = 'sawtooth';
            squeal.frequency.setValueAtTime(450, t);
            squeal.frequency.exponentialRampToValueAtTime(120, t + 0.4);
            sqGain.gain.setValueAtTime(0.45, t);
            sqGain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

            squeal.connect(sqGain);
            sqGain.connect(this.ctx.destination);
            squeal.start(t);
            squeal.stop(t + 0.45);
        }, 100);
    }

    // 7. Tiếng Scylla cắn vào thuyền và vỡ gỗ (Thử thách 3 - Trả lời sai)
    playScyllaBite() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Tiếng đớp răng sắc nhọn
        const snap = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snap.type = 'triangle';
        snap.frequency.setValueAtTime(280, now);
        snap.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        snapGain.gain.setValueAtTime(0.7, now);
        snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        snap.connect(snapGain);
        snapGain.connect(this.ctx.destination);
        snap.start(now);
        snap.stop(now + 0.22);

        // Tiếng gỗ gãy răng rắc
        setTimeout(() => {
            if (!this.ctx) return;
            const t = this.ctx.currentTime;
            const wood = this.ctx.createOscillator();
            const woodGain = this.ctx.createGain();
            wood.type = 'square';
            wood.frequency.setValueAtTime(160, t);
            wood.frequency.exponentialRampToValueAtTime(70, t + 0.35);
            woodGain.gain.setValueAtTime(0.35, t);
            woodGain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

            wood.connect(woodGain);
            woodGain.connect(this.ctx.destination);
            wood.start(t);
            wood.stop(t + 0.4);
        }, 120);
    }

    // 8. Tiếng chuông khải hoàn / Hoàn thành màn
    playStageVictory() {
        if (!this.enabled) return;
        this.init();
        const notes = [261.63, 329.63, 392.00, 523.25]; // Đô - Mi - Sol - Đô
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                if (!this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.005, now + 0.7);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.7);
            }, idx * 160);
        });
    }

    // 9. Âm thanh nền sóng biển & gió thổi nhẹ
    startAmbient() {
        if (!this.enabled || this.ambientPlaying) return;
        this.init();
        try {
            const bufferSize = this.ctx.sampleRate * 2;
            const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(240, this.ctx.currentTime);

            this.ambientGain = this.ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

            whiteNoise.connect(filter);
            filter.connect(this.ambientGain);
            this.ambientGain.connect(this.ctx.destination);

            whiteNoise.start();
            this.ambientPlaying = true;
            this.ambientSource = whiteNoise;
        } catch (e) {
            console.warn("Ambient sound init:", e);
        }
    }

    stopAmbient() {
        if (this.ambientSource) {
            try {
                this.ambientSource.stop();
                this.ambientSource.disconnect();
            } catch (e) {}
            this.ambientSource = null;
        }
        this.ambientPlaying = false;
    }
}

const sounds = new SoundSystem();

