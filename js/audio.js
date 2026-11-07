/**
 * BỘ TẠO HIỆU ỨNG ÂM THANH KHOA HỌC VIỄN TƯỞNG (SCI-FI AUDIO ENGINE)
 * Sử dụng Web Audio API thuần túy, an toàn 100% không bao giờ gây crash.
 * Hiệu ứng: Súng Plasma, Nổ Acid, Gầm thét Xenomorph, Báo động Đỏ và Hải đăng SOS.
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

    // 3. Tiếng quái vật bị tiêu diệt / phát nổ acid
    playAlienDeath() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            // Tiếng gầm vỡ vụn
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

            gain.gain.setValueAtTime(0.6, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.45);
        } catch (e) {
            console.warn("Audio playAlienDeath:", e);
        }
    }

    // 4. Tiếng quái vật phản công / lao tới cào xé khi trả lời sai
    playAlienAttack() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const hiss = ctx.createOscillator();
            const hissGain = ctx.createGain();
            hiss.type = 'sawtooth';
            hiss.frequency.setValueAtTime(650, now);
            hiss.frequency.linearRampToValueAtTime(950, now + 0.15);
            hiss.frequency.linearRampToValueAtTime(300, now + 0.4);

            hissGain.gain.setValueAtTime(0.4, now);
            hissGain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            hiss.connect(hissGain);
            hissGain.connect(ctx.destination);
            hiss.start(now);
            hiss.stop(now + 0.45);
        } catch (e) {
            console.warn("Audio playAlienAttack:", e);
        }
    }

    // 5. Tiếng gầm thét kinh hoàng của Nữ Chúa Alien Queen
    playQueenRoar() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(95, now);
            osc.frequency.linearRampToValueAtTime(160, now + 0.5);
            osc.frequency.linearRampToValueAtTime(55, now + 1.2);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now);
            filter.frequency.linearRampToValueAtTime(220, now + 1.2);

            gain.gain.setValueAtTime(0.7, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.3);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.3);
        } catch (e) {
            console.warn("Audio playQueenRoar:", e);
        }
    }

    // 6. Tiếng chuông combo streak tăng điểm
    playStreakChime(streakCount = 1) {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const baseFreq = 523.25 + Math.min(streakCount * 120, 720);

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
        } catch (e) {
            console.warn("Audio playStreakChime:", e);
        }
    }

    // 6b. Tiếng còi báo lỗi / Trả lời sai (Buzzer hạ nốt)
    playWrongBuzzer() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(110, now + 0.35);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {
            console.warn("Audio playWrongBuzzer:", e);
        }
    }

    // 7. Tiếng đồng hồ đếm ngược Quizizz (Tick Tock điện tử)
    playTick() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1050, now);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {
            console.warn("Audio playTick:", e);
        }
    }

    // 8. Tiếng còi báo động đỏ khẩn cấp (Red Alert Klaxon)
    playAlarmKlaxon() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.linearRampToValueAtTime(620, now + 0.4);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.75);
        } catch (e) {
            console.warn("Audio playAlarmKlaxon:", e);
        }
    }

    // 9. Tiếng kích hoạt hải đăng cứu hộ S.O.S chiến thắng
    playBeaconActivated() {
        const ctx = this.getSafeCtx();
        if (!ctx) return;
        try {
            const notes = [440, 554.37, 659.25, 880, 1108.73];
            notes.forEach((freq, idx) => {
                setTimeout(() => {
                    try {
                        const c = this.getSafeCtx();
                        if (!c) return;
                        const now = c.currentTime;
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now);
                        gain.gain.setValueAtTime(0.3, now);
                        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.6);
                        osc.connect(gain);
                        gain.connect(c.destination);
                        osc.start(now);
                        osc.stop(now + 0.6);
                    } catch (e) {}
                }, idx * 140);
            });
        } catch (e) {
            console.warn("Audio playBeaconActivated:", e);
        }
    }

    // 10. Âm thanh buồng máy phi thuyền (Deep Space Engine Hum)
    startAmbient() {
        const ctx = this.getSafeCtx();
        if (!ctx || this.ambientPlaying) return;
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(55, ctx.currentTime);

            gain.gain.setValueAtTime(0.06, ctx.currentTime);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();

            this.ambientSource = osc;
            this.ambientPlaying = true;
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
