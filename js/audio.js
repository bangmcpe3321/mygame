/**
 * BỘ TẠO HIỆU ỨNG ÂM THANH SỬ THI BẰNG WEB AUDIO API
 * Hỗ trợ âm thanh chiến trận, đồng hồ đếm ngược Quizizz và chuỗi Combo Streak
 * Bảo đảm 100% không bao giờ chặn hay gây lỗi (fault-tolerant Web Audio)
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.ambientGain = null;
        this.ambientPlaying = false;
        this.ambientSource = null;
    }

    init() {
        try {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.ctx = new AudioContext();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }
        } catch (e) {
            console.warn("SoundSystem init notice:", e);
        }
    }

    getSafeCtx() {
        if (!this.enabled) return null;
        this.init();
        if (!this.ctx) return null;
        return this.ctx;
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopAmbient();
        } else {
            this.init();
            this.startAmbient();
        }
        return this.enabled;
    }

    // 1. Tiếng còi chiến trận Hy Lạp (War Horn) khi bắt đầu game
    playWarHorn() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(240, now + 0.6);
            osc.frequency.exponentialRampToValueAtTime(220, now + 1.4);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(450, now);

            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.5);
        } catch (e) {
            console.warn("Audio playWarHorn:", e);
        }
    }

    // 2. Tiếng đồng hồ đếm ngược Quizizz (Tick-Tock)
    playTick() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, now);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            console.warn("Audio playTick:", e);
        }
    }

    // 3. Tiếng chuỗi Combo Streak tăng điểm kiểu Quizizz (Cao dần theo streak)
    playStreakChime(streakCount = 1) {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const baseFreq = 440 + Math.min(streakCount * 110, 660);

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.2);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {
            console.warn("Audio playStreakChime:", e);
        }
    }

    // 4. Tiếng tên bắn trúng mục tiêu (Cyclops bị trúng tên)
    playArrowHit() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const whoosh = ctx.createOscillator();
            const whooshGain = ctx.createGain();
            whoosh.type = 'sine';
            whoosh.frequency.setValueAtTime(600, now);
            whoosh.frequency.exponentialRampToValueAtTime(200, now + 0.15);
            whooshGain.gain.setValueAtTime(0.3, now);
            whooshGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            whoosh.connect(whooshGain);
            whooshGain.connect(ctx.destination);
            whoosh.start(now);
            whoosh.stop(now + 0.15);

            setTimeout(() => {
                try {
                    const c = this.getSafeCtx();
                    if (!c) return;
                    const t = c.currentTime;
                    const hit = c.createOscillator();
                    const hitGain = c.createGain();
                    hit.type = 'triangle';
                    hit.frequency.setValueAtTime(140, t);
                    hit.frequency.exponentialRampToValueAtTime(40, t + 0.2);
                    hitGain.gain.setValueAtTime(0.6, t);
                    hitGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
                    hit.connect(hitGain);
                    hitGain.connect(c.destination);
                    hit.start(t);
                    hit.stop(t + 0.25);
                } catch (e) {}
            }, 120);
        } catch (e) {
            console.warn("Audio playArrowHit:", e);
        }
    }

    // 5. Tiếng Cyclops gầm đe dọa (Khi trả lời sai)
    playCyclopsRoar() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, now);
            osc.frequency.linearRampToValueAtTime(65, now + 0.6);
            osc.frequency.linearRampToValueAtTime(45, now + 1.1);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(350, now);
            filter.frequency.linearRampToValueAtTime(180, now + 1.1);

            oscGain.gain.setValueAtTime(0.5, now);
            oscGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.2);
        } catch (e) {
            console.warn("Audio playCyclopsRoar:", e);
        }
    }

    // 6. Tiếng chọc mù mắt Cyclops (Kết thúc thử thách 1)
    playBlindImpact() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.8);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 1.5);
        } catch (e) {
            console.warn("Audio playBlindImpact:", e);
        }
    }

    // 7. Tiếng gào thét của Odysseus & tiếng người lính nhảy xuống biển (Thử thách 2)
    playScreamAndSplash() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const scream = ctx.createOscillator();
            const screamGain = ctx.createGain();
            scream.type = 'sine';
            scream.frequency.setValueAtTime(400, now);
            scream.frequency.linearRampToValueAtTime(650, now + 0.3);
            scream.frequency.linearRampToValueAtTime(320, now + 0.6);
            screamGain.gain.setValueAtTime(0.4, now);
            screamGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

            scream.connect(screamGain);
            screamGain.connect(ctx.destination);
            scream.start(now);
            scream.stop(now + 0.7);

            setTimeout(() => {
                try {
                    const c = this.getSafeCtx();
                    if (!c) return;
                    const t = c.currentTime;
                    const splash = c.createOscillator();
                    const splashGain = c.createGain();
                    splash.type = 'triangle';
                    splash.frequency.setValueAtTime(260, t);
                    splash.frequency.exponentialRampToValueAtTime(50, t + 0.4);
                    splashGain.gain.setValueAtTime(0.5, t);
                    splashGain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

                    splash.connect(splashGain);
                    splashGain.connect(c.destination);
                    splash.start(t);
                    splash.stop(t + 0.45);
                } catch (e) {}
            }, 350);
        } catch (e) {
            console.warn("Audio playScreamAndSplash:", e);
        }
    }

    // 8. Tiếng Sirens gào rít giận dữ (Thử thách 2)
    playSirenFurious() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const hiss = ctx.createOscillator();
            const hissGain = ctx.createGain();
            hiss.type = 'sawtooth';
            hiss.frequency.setValueAtTime(800, now);
            hiss.frequency.linearRampToValueAtTime(1100, now + 0.3);
            hiss.frequency.linearRampToValueAtTime(450, now + 0.8);
            hissGain.gain.setValueAtTime(0.25, now);
            hissGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(600, now);

            hiss.connect(filter);
            filter.connect(hissGain);
            hissGain.connect(ctx.destination);

            hiss.start(now);
            hiss.stop(now + 0.8);
        } catch (e) {
            console.warn("Audio playSirenFurious:", e);
        }
    }

    // 9. Tiếng chém kiếm của Odysseus (Thử thách 3)
    playSwordSlash() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const slash = ctx.createOscillator();
            const slashGain = ctx.createGain();
            slash.type = 'sine';
            slash.frequency.setValueAtTime(1200, now);
            slash.frequency.exponentialRampToValueAtTime(300, now + 0.2);
            slashGain.gain.setValueAtTime(0.4, now);
            slashGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

            slash.connect(slashGain);
            slashGain.connect(ctx.destination);
            slash.start(now);
            slash.stop(now + 0.22);

            setTimeout(() => {
                try {
                    const c = this.getSafeCtx();
                    if (!c) return;
                    const t = c.currentTime;
                    const squeal = c.createOscillator();
                    const sqGain = c.createGain();
                    squeal.type = 'sawtooth';
                    squeal.frequency.setValueAtTime(450, t);
                    squeal.frequency.exponentialRampToValueAtTime(120, t + 0.4);
                    sqGain.gain.setValueAtTime(0.45, t);
                    sqGain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

                    squeal.connect(sqGain);
                    sqGain.connect(c.destination);
                    squeal.start(t);
                    squeal.stop(t + 0.45);
                } catch (e) {}
            }, 100);
        } catch (e) {
            console.warn("Audio playSwordSlash:", e);
        }
    }

    // 10. Tiếng Scylla cắn vào thuyền (Thử thách 3)
    playScyllaBite() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const snap = ctx.createOscillator();
            const snapGain = ctx.createGain();
            snap.type = 'triangle';
            snap.frequency.setValueAtTime(280, now);
            snap.frequency.exponentialRampToValueAtTime(50, now + 0.2);
            snapGain.gain.setValueAtTime(0.7, now);
            snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

            snap.connect(snapGain);
            snapGain.connect(ctx.destination);
            snap.start(now);
            snap.stop(now + 0.22);

            setTimeout(() => {
                try {
                    const c = this.getSafeCtx();
                    if (!c) return;
                    const t = c.currentTime;
                    const wood = c.createOscillator();
                    const woodGain = c.createGain();
                    wood.type = 'square';
                    wood.frequency.setValueAtTime(160, t);
                    wood.frequency.exponentialRampToValueAtTime(70, t + 0.35);
                    woodGain.gain.setValueAtTime(0.35, t);
                    woodGain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

                    wood.connect(woodGain);
                    woodGain.connect(c.destination);
                    wood.start(t);
                    wood.stop(t + 0.4);
                } catch (e) {}
            }, 120);
        } catch (e) {
            console.warn("Audio playScyllaBite:", e);
        }
    }

    // 11. Tiếng chuông khải hoàn / Hoàn thành màn
    playStageVictory() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const notes = [261.63, 329.63, 392.00, 523.25];
            notes.forEach((freq, idx) => {
                setTimeout(() => {
                    try {
                        const c = this.getSafeCtx();
                        if (!c) return;
                        const now = c.currentTime;
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(freq, now);
                        gain.gain.setValueAtTime(0.3, now);
                        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.7);
                        osc.connect(gain);
                        gain.connect(c.destination);
                        osc.start(now);
                        osc.stop(now + 0.7);
                    } catch (e) {}
                }, idx * 160);
            });
        } catch (e) {
            console.warn("Audio playStageVictory:", e);
        }
    }

    // 12. Âm thanh sóng biển & gió nền
    startAmbient() {
        const ctx = this.getSafeCtx();
        if (!ctx || this.ambientPlaying) return;
        try {
            const bufferSize = ctx.sampleRate * 2;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(240, ctx.currentTime);

            this.ambientGain = ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.04, ctx.currentTime);

            whiteNoise.connect(filter);
            filter.connect(this.ambientGain);
            this.ambientGain.connect(ctx.destination);

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
