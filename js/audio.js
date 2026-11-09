/**
 * BỘ TẠO HIỆU ỨNG ÂM THANH KHOA HỌC VIỄN TƯỞNG & THỊ TRƯỜNG (UNIFIED SCI-FI AUDIO ENGINE)
 * Sử dụng Web Audio API thuần túy, an toàn 100% không bao giờ gây crash hay cần file mp3/wav ngoài.
 * Hiệu ứng: Súng Plasma, Nổ Acid, Gầm thét Xenomorph, Báo động Đỏ, Hải đăng SOS, Streak Quizizz.
 */

class UnifiedAudioEngine {
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
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }
        } catch (e) {
            console.warn("Audio init notice:", e);
        }
    }

    getSafeCtx() {
        if (!this.enabled) return null;
        this.init();
        if (!this.ctx) return null;
        return this.ctx;
    }

    getCtx() {
        return this.getSafeCtx();
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

    // 1. Tiếng súng Plasma Blaster của Robot Unit-07
    playLaserShot() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.Q.setValueAtTime(3, now);

            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            console.warn("Audio playLaserShot:", e);
        }
    }

    // 2. Tiếng đạn trúng quái vật (Acid Sizzle & Energy Impact)
    playAlienHit() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.22);

            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } catch (e) {
            console.warn("Audio playAlienHit:", e);
        }
    }

    // 3. Tiếng gầm thét dữ dội của Nữ Chúa Xenomorph
    playQueenRoar() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(140, now);
            osc1.frequency.linearRampToValueAtTime(260, now + 0.2);
            osc1.frequency.exponentialRampToValueAtTime(45, now + 0.6);

            osc2.type = 'square';
            osc2.frequency.setValueAtTime(90, now);
            osc2.frequency.exponentialRampToValueAtTime(35, now + 0.6);

            gain.gain.setValueAtTime(0.6, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.65);
            osc2.stop(now + 0.65);
        } catch (e) {
            console.warn("Audio playQueenRoar:", e);
        }
    }

    // 4. Tiếng quái vật tan biến thành khói acid độc
    playAlienDeath() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const bufferSize = ctx.sampleRate * 0.45;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.exponentialRampToValueAtTime(120, now + 0.45);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
        } catch (e) {
            console.warn("Audio playAlienDeath:", e);
        }
    }

    // 5. Tiếng quái vật phản kích lao vào cắn xé
    playAlienAttack() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.linearRampToValueAtTime(450, now + 0.1);
            osc.frequency.exponentialRampToValueAtTime(90, now + 0.3);

            gain.gain.setValueAtTime(0.45, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {
            console.warn("Audio playAlienAttack:", e);
        }
    }

    // 6. Tiếng Còi Báo Động Khiên Bị Vỡ (Alarm Klaxon)
    playAlarmKlaxon() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(750, now);
            osc.frequency.setValueAtTime(450, now + 0.15);
            osc.frequency.setValueAtTime(750, now + 0.3);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.45);
        } catch (e) {
            console.warn("Audio playAlarmKlaxon:", e);
        }
    }

    // 7. Âm thanh Kích hoạt Hải Đăng Cứu Hộ S.O.S (Beacon Activated)
    playBeaconActivated() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const startTime = now + idx * 0.14;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.35, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 1.25);
            });
        } catch (e) {
            console.warn("Audio playBeaconActivated:", e);
        }
    }

    // 8. Chuỗi âm thanh thưởng Streak kiểu Quizizz
    playStreakChime() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const chord = [440, 554.37, 659.25, 880];
            chord.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const st = now + i * 0.05;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, st);

                gain.gain.setValueAtTime(0.25, st);
                gain.gain.exponentialRampToValueAtTime(0.001, st + 0.45);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(st);
                osc.stop(st + 0.5);
            });
        } catch (e) {
            console.warn("Audio playStreakChime:", e);
        }
    }

    // 9. Tiếng báo sai (Wrong Buzzer)
    playWrongBuzzer() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.35);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {
            console.warn("Audio playWrongBuzzer:", e);
        }
    }

    // Các hàm tương thích với hệ thống giao diện
    playCorrect(streak = 1) {
        this.playStreakChime();
    }

    playWrong() {
        this.playWrongBuzzer();
    }

    playTick() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1040, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    playChoice() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(380, now);
            osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {}
    }

    playCardUnlock() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            [523.25, 783.99, 1046.5].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const st = now + idx * 0.08;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, st);
                gain.gain.setValueAtTime(0.18, st);
                gain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(st);
                osc.stop(st + 0.36);
            });
        } catch (e) {}
    }

    playEnding() {
        this.playBeaconActivated();
    }

    startAmbient() {
        const ctx = this.getSafeCtx();
        if (!ctx || this.ambientPlaying) return;
        try {
            const bufferSize = ctx.sampleRate * 2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.015;
            }

            this.ambientSource = ctx.createBufferSource();
            this.ambientSource.buffer = buffer;
            this.ambientSource.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(220, ctx.currentTime);

            this.ambientGain = ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.08, ctx.currentTime);

            this.ambientSource.connect(filter);
            filter.connect(this.ambientGain);
            this.ambientGain.connect(ctx.destination);

            this.ambientSource.start(0);
            this.ambientPlaying = true;
        } catch (e) {}
    }

    stopAmbient() {
        try {
            if (this.ambientSource) {
                this.ambientSource.stop();
                this.ambientSource.disconnect();
                this.ambientSource = null;
            }
            this.ambientPlaying = false;
        } catch (e) {}
    }
}

// Khởi tạo thực thể dùng chung
const soundSystem = new UnifiedAudioEngine();
window.soundSystem = soundSystem;
window.audio = soundSystem;
