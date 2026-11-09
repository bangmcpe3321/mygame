/**
 * TRÀ MỘC — ĐỘC QUYỀN: QUYỀN LỰC & CÁI GIÁ · CHIẾN DỊCH VŨ TRỤ ĐỘT KÍCH
 * ------------------------------------------------------------------
 * Lối chơi tích hợp Đấu Trường Thẻ Bài Turn-Based RPG (Angry Birds Epic Style)
 * kết hợp mô phỏng kinh tế 12 chương Triết học Mác – Lênin và hoạt cảnh điện ảnh.
 * 
 * Vòng chơi mỗi chương:
 *   1. Hiển thị Đấu trường VisualEngine: Robot Unit-07 (khiên 200 HP) vs Quái vật AI.
 *   2. Đọc bối cảnh chương và nạp đạn bằng cách trả lời câu hỏi tri thức (20 giây).
 *      - Trả lời đúng: Robot bắn súng Plasma Blaster tiêu diệt quái, cộng điểm tốc độ + streak.
 *      - Trả lời sai / hết giờ: Quái vật lao tới cắn xé, khiên Robot bị giảm 15 HP, báo động đỏ.
 *   3. Chọn 1 trong 3 Quyết định chiến lược của Trà Mộc để thay đổi 6 chỉ số thị trường, mở Thẻ tri thức.
 *   4. Chuyển Hồi bằng hoạt cảnh truyện tranh hoành tráng (Kho Hàng -> Lò Phản Ứng -> Cầu Tàu).
 *   5. Hồi kết: Tiêu diệt Nữ Chúa Alien Queen, phóng Hải Đăng Cứu Hộ S.O.S và định đoạt 1 trong 6 Đại Kết Cục!
 */

const AVATARS = ['🤖', '⚡', '🛡️', '🎯', '🚀', '🛸', '🔋', '🛰️', '🔮', '⚙️', '🍃', '🫖'];

class TraMocGame {
    constructor() {
        this.stats = { ...STARTING_STATS };
        this.chapterIndex = 0;
        this.phase = 'intro';
        this.log = [];
        this.unlocked = new Set();
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.answeredCorrect = 0;
        this.hasAnswered = false;
        this.lastAnswer = null;
        this.lastChoice = null;
        this.lastUnlocks = [];

        // Hệ thống Đấu trường RPG & Khiên chiến đấu
        this.visuals = new VisualEngine('visual-theater');
        this.robotMaxShield = 200;
        this.robotShield = 200;
        this.currentSectorIndex = 0;
        this.aliensState = this.getSectorCompetitors(0);

        // Bộ đếm thời gian
        this.timerInterval = null;
        this.deadline = 0;
        this.remaining = 0;
        this.lastTickSecond = -1;

        this.el = {};
        this.soundOn = true;

        this.cacheElements();
        this.buildAvatarGrid();
        this.bindEvents();
        this.bindMultiplayer();
        this.aliensState = this.getSectorCompetitors(0);
        this.renderAll();
    }

    /* ------------------------------------------------------------- */
    /* Khởi tạo & Cache Elements                                      */
    /* ------------------------------------------------------------- */

    cacheElements() {
        const id = (name) => document.getElementById(name);

        this.el = {
            profileBtn: id('player-profile-btn'),
            headerAvatar: id('header-player-avatar'),
            headerName: id('header-player-name'),
            streakDisplay: id('streak-display'),
            scoreDisplay: id('score-display'),
            cardsBtn: id('cards-toggle-btn'),
            cardsBadge: id('cards-count-badge'),
            leaderboardBtn: id('leaderboard-toggle-btn'),
            hostBtn: id('host-control-btn'),
            soundBtn: id('sound-toggle-btn'),
            soundIcon: id('sound-icon'),

            progressStrip: id('progress-strip'),
            marketBar: id('market-bar'),
            visualTheater: id('visual-theater'),
            scoreFloatPopup: id('score-float-popup'),
            briefPanel: id('brief-panel'),
            playPanel: id('play-panel'),

            cinematicContainer: id('cinematic-container'),
            storyOverlay: id('story-overlay'),
            storyTitle: id('story-title'),
            storySubtitle: id('story-subtitle'),
            storyBody: id('story-body'),
            storyActionBtn: id('story-action-btn'),

            endingOverlay: id('ending-overlay'),
            endingCode: id('ending-code'),
            endingIcon: id('ending-icon'),
            endingTitle: id('ending-title'),
            endingQuote: id('ending-quote'),
            endingBody: id('ending-body'),
            endingLesson: id('ending-lesson'),
            endingCards: id('ending-cards'),
            replayBtn: id('btn-replay'),
            endingLeaderboardBtn: id('btn-ending-leaderboard'),

            profileModal: id('profile-modal'),
            nameInput: id('custom-name-input'),
            avatarGrid: id('avatar-grid'),
            saveProfileBtn: id('save-profile-btn'),
            cancelProfileBtn: id('cancel-profile-btn'),

            hostModal: id('host-modal'),
            hostPin: id('host-room-pin'),
            lobbyDisplay: id('lobby-player-display'),
            lobbyRenameBtn: id('lobby-rename-btn'),
            hostPlayerList: id('host-player-list'),
            hostStartBtn: id('host-start-btn'),
            hostResetBtn: id('host-reset-btn'),
            hostCloseBtn: id('host-close-btn'),
            tabHostBtn: id('tab-host-btn'),
            tabJoinBtn: id('tab-join-btn'),
            lobbyHostPanel: id('lobby-host-panel'),
            lobbyJoinPanel: id('lobby-join-panel'),
            btnCopyPin: id('btn-copy-pin'),
            joinPinInput: id('join-pin-input'),
            joinStatusDisplay: id('join-status-display'),
            joinRoomBtn: id('join-room-btn'),
            joinRoomRosterBox: id('join-room-roster-box'),
            joinPlayerList: id('join-player-list'),

            leaderboardDrawer: id('leaderboard-drawer'),
            leaderboardCloseBtn: id('leaderboard-close-btn'),
            leaderboardBody: id('leaderboard-body'),

            cardsDrawer: id('cards-drawer'),
            cardsCloseBtn: id('cards-close-btn'),
            cardsBody: id('cards-body'),
            cardsHint: id('cards-hint'),

            toastStack: id('toast-stack')
        };
    }

    bindEvents() {
        if (this.el.profileBtn) this.el.profileBtn.addEventListener('click', () => this.openProfile());
        if (this.el.lobbyRenameBtn) this.el.lobbyRenameBtn.addEventListener('click', () => this.openProfile());
        if (this.el.saveProfileBtn) this.el.saveProfileBtn.addEventListener('click', () => this.saveProfile());
        if (this.el.cancelProfileBtn) this.el.cancelProfileBtn.addEventListener('click', () => this.closeProfile());
        if (this.el.nameInput) {
            this.el.nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.saveProfile();
            });
        }

        if (this.el.leaderboardBtn) this.el.leaderboardBtn.addEventListener('click', () => this.openDrawer('leaderboard'));
        if (this.el.leaderboardCloseBtn) this.el.leaderboardCloseBtn.addEventListener('click', () => this.closeDrawers());
        if (this.el.endingLeaderboardBtn) {
            this.el.endingLeaderboardBtn.addEventListener('click', () => {
                this.el.endingOverlay.classList.remove('show');
                this.openDrawer('leaderboard');
            });
        }

        if (this.el.cardsBtn) this.el.cardsBtn.addEventListener('click', () => this.openDrawer('cards'));
        if (this.el.cardsCloseBtn) this.el.cardsCloseBtn.addEventListener('click', () => this.closeDrawers());

        if (this.el.hostBtn) this.el.hostBtn.addEventListener('click', () => this.openHost());
        if (this.el.hostCloseBtn) this.el.hostCloseBtn.addEventListener('click', () => this.closeHost());

        // Tab chuyển đổi Host / Join trong Modal Đấu Phòng 5 Người
        if (this.el.tabHostBtn && this.el.tabJoinBtn) {
            this.el.tabHostBtn.addEventListener('click', () => {
                this.el.tabHostBtn.classList.add('active');
                this.el.tabJoinBtn.classList.remove('active');
                if (this.el.lobbyHostPanel) this.el.lobbyHostPanel.style.display = 'block';
                if (this.el.lobbyJoinPanel) this.el.lobbyJoinPanel.style.display = 'none';
            });
            this.el.tabJoinBtn.addEventListener('click', () => {
                this.el.tabJoinBtn.classList.add('active');
                this.el.tabHostBtn.classList.remove('active');
                if (this.el.lobbyHostPanel) this.el.lobbyHostPanel.style.display = 'none';
                if (this.el.lobbyJoinPanel) this.el.lobbyJoinPanel.style.display = 'block';
                if (this.el.joinPinInput) setTimeout(() => this.el.joinPinInput.focus(), 60);
            });
        }

        // Nút sao chép mã PIN
        if (this.el.btnCopyPin) {
            this.el.btnCopyPin.addEventListener('click', () => {
                const pin = (this.el.hostPin ? this.el.hostPin.textContent : '').trim();
                if (pin && navigator.clipboard) {
                    navigator.clipboard.writeText(pin).then(() => {
                        this.spawnToast(`Đã sao chép mã PIN: ${pin}`, 'is-good');
                    }).catch(() => {
                        this.spawnToast(`Mã phòng: ${pin}`);
                    });
                } else if (pin) {
                    this.spawnToast(`Mã phòng: ${pin}`);
                }
            });
        }

        // Nút Kết nối vào phòng bằng mã PIN
        if (this.el.joinRoomBtn) {
            this.el.joinRoomBtn.addEventListener('click', () => {
                const pin = (this.el.joinPinInput ? this.el.joinPinInput.value : '').trim();
                if (!pin) {
                    this.spawnToast('Vui lòng nhập mã PIN gồm 4 chữ số!', 'is-bad');
                    return;
                }
                if (this.el.joinStatusDisplay) {
                    this.el.joinStatusDisplay.innerHTML = `⏳ Đang kết nối tới phòng #${pin}...`;
                }
                if (window.multiplayer) {
                    window.multiplayer.joinRoomByPin(pin, (success, msg) => {
                        if (success) {
                            if (this.el.joinStatusDisplay) {
                                this.el.joinStatusDisplay.innerHTML = `🟢 <span style="color:var(--tech-green)">${msg}</span>`;
                            }
                            if (this.el.joinRoomRosterBox) {
                                this.el.joinRoomRosterBox.style.display = 'block';
                            }
                            this.spawnToast(msg, 'is-good');
                            this.renderHostPlayers();
                            this.renderLeaderboard();
                        } else {
                            if (this.el.joinStatusDisplay) {
                                this.el.joinStatusDisplay.innerHTML = `🔴 <span style="color:var(--danger)">${msg}</span>`;
                            }
                            this.spawnToast(msg, 'is-bad');
                        }
                    });
                }
            });
        }

        if (this.el.hostStartBtn) {
            this.el.hostStartBtn.addEventListener('click', () => {
                if (window.multiplayer) window.multiplayer.startRoomAsHost();
                this.closeHost();
                this.playIntroCinematic(() => this.beginChapter(0));
            });
        }
        if (this.el.hostResetBtn) {
            this.el.hostResetBtn.addEventListener('click', () => {
                if (window.multiplayer) {
                    window.multiplayer.changeRoomCode();
                    window.multiplayer.resetScores();
                }
                this.resetGame(true);
                this.renderHostPlayers();
                this.spawnToast('Đã đổi mã phòng mới và đặt lại điểm số', 'is-good');
            });
        }

        if (this.el.soundBtn) this.el.soundBtn.addEventListener('click', () => this.toggleSound());
        if (this.el.replayBtn) this.el.replayBtn.addEventListener('click', () => this.replay());

        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    bindMultiplayer() {
        if (!window.multiplayer) return;

        window.multiplayer.onLeaderboardUpdate = (ranked) => {
            this.renderLeaderboard();
            if (this.aliensState && this.visuals) {
                this.aliensState.forEach((comp, idx) => {
                    const info = (ranked || []).find((p) => p.id === comp.id);
                    if (info) {
                        comp.score = info.score;
                        comp.streak = info.streak;
                        this.visuals.updateCompetitorScore(idx, comp.score, comp.streak);
                    }
                });
            }
        };

        window.multiplayer.onPlayerListChange = () => {
            this.renderHostPlayers();
            // Nếu đang trong trận, cập nhật lại tên và avatar đối thủ
            if (this.aliensState && this.visuals && window.multiplayer.getCompetitors) {
                const freshComps = window.multiplayer.getCompetitors();
                freshComps.forEach((fc, idx) => {
                    if (this.aliensState[idx]) {
                        this.aliensState[idx].name = fc.name;
                        this.aliensState[idx].avatar = fc.avatar;
                        this.aliensState[idx].isPlayer = fc.isPlayer;
                    }
                });
            }
        };

        window.multiplayer.onRoomStarted = () => {
            this.closeHost();
            this.playIntroCinematic(() => this.beginChapter(0));
        };

        // Khi bị đối thủ tấn công khiên thị trường
        window.multiplayer.onAttackedByRival = (attackerName, damage, remainingShield, attackerId) => {
            const dmg = damage || 15;
            this.robotShield = Math.max(0, this.robotShield - dmg);
            if (this.visuals) {
                const attackerIdx = this.aliensState ? this.aliensState.findIndex((c) => c.id === attackerId || c.name === attackerName) : 0;
                this.visuals.playAlienRetaliation(attackerIdx >= 0 ? attackerIdx : 0, this.robotShield, dmg);
            }
            this.spawnToast(`⚠️ Đối thủ ${attackerName} bắn tia Plasma tấn công khiên của bạn (-${dmg} HP)!`, 'is-bad');
            if (this.robotShield <= 0) {
                this.robotShield = 100;
                this.spawnToast('⚠️ Khiên thị trường cạn kiệt! Nạp quỹ dự phòng (+100 HP)', 'is-bad');
                if (this.visuals) this.visuals.updateRobotShieldDisplay(this.robotShield);
            }
        };

        // Khi đối thủ khác bị tấn công mất HP
        window.multiplayer.onCompetitorDamaged = (targetId, newHp, damage, attackerId) => {
            if (!this.aliensState) return;
            const targetIdx = this.aliensState.findIndex((c) => c.id === targetId);
            const attackerIdx = attackerId ? this.aliensState.findIndex((c) => c.id === attackerId) : -1;

            if (targetIdx !== -1) {
                this.aliensState[targetIdx].hp = newHp;
                if (this.visuals) {
                    if (attackerIdx !== -1 && typeof this.visuals.playCrossfireBetweenRivals === 'function') {
                        this.visuals.playCrossfireBetweenRivals(attackerIdx, targetIdx, damage || 15);
                    }
                    this.visuals.updateAlienHpDisplay(targetIdx, newHp, newHp <= 0);
                }
            }
        };
    }

    buildAvatarGrid() {
        if (!this.el.avatarGrid) return;
        this.el.avatarGrid.innerHTML = AVATARS.map((av) =>
            `<button class="avatar-btn" type="button" data-avatar="${av}" aria-label="Biểu tượng ${av}">${av}</button>`
        ).join('');

        this.el.avatarGrid.querySelectorAll('.avatar-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.el.avatarGrid.querySelectorAll('.avatar-btn').forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    get chapter() {
        return CHAPTERS[this.chapterIndex] || null;
    }

    get act() {
        const ch = this.chapter;
        if (!ch) return ACTS[0];
        return ACTS[ch.act] || ACTS[0];
    }

    /* ------------------------------------------------------------- */
    /* Hiển thị chung                                                 */
    /* ------------------------------------------------------------- */

    renderAll() {
        this.renderProgress();
        this.renderMarketBar();
        if (this.visuals) {
            this.visuals.renderArena(this.currentSectorIndex, this.aliensState, this.robotShield);
        }
        this.renderBrief();
        this.renderPlay();
        this.updateHud();
        this.renderLeaderboard();
        this.renderCards();
        this.renderHostPlayers();
    }

    renderProgress() {
        const ch = this.chapter;
        const activeAct = ch ? ch.act : -1;

        const chips = ACTS.map((act, idx) => {
            const state = idx < activeAct ? 'completed' : idx === activeAct ? 'active' : '';
            const range = act.range[0] + '–' + act.range[1];
            return `<div class="act-chip ${state}">
                <span class="chip-dot">${idx + 1}</span>
                <span>${act.code} · ${act.name}</span>
                <span class="chip-note">Ch. ${range} — ${act.note}</span>
            </div>`;
        }).join('');

        const badge = (ch && this.phase !== 'intro')
            ? `<div class="chapter-badge">CHƯƠNG ${ch.id} / ${CHAPTERS.length} · ${ch.year} · SECTOR 0${ch.act + 1}</div>`
            : `<div class="chapter-badge">MỞ ĐẦU · ${GAME_CONFIG.startYear}</div>`;

        this.el.progressStrip.innerHTML = chips + badge;
    }

    renderMarketBar() {
        this.el.marketBar.innerHTML = STAT_DEFS.map((def) => {
            const value = this.stats[def.key];
            return `<div class="stat-chip" data-stat="${def.key}">
                <div class="stat-chip-head">
                    <span class="stat-chip-name">${def.icon} ${def.label}</span>
                    <span class="stat-chip-value">${value}<span class="stat-unit">${def.unit}</span></span>
                </div>
                <div class="stat-track"><div class="stat-fill"></div></div>
            </div>`;
        }).join('');

        STAT_DEFS.forEach((def) => this.paintStatChip(def.key, 0));
    }

    paintStatChip(key, delta) {
        const def = STAT_DEFS.find((d) => d.key === key);
        const chip = this.el.marketBar.querySelector(`[data-stat="${key}"]`);
        if (!def || !chip) return;

        const value = this.stats[key];
        const ratio = Math.max(0, Math.min(1, (value - def.min) / (def.max - def.min)));

        chip.querySelector('.stat-chip-value').innerHTML =
            `${value}<span class="stat-unit">${def.unit}</span>`;
        chip.querySelector('.stat-fill').style.width = (ratio * 100) + '%';

        chip.classList.remove('good-low', 'good-mid', 'good-down-high', 'flash-up', 'flash-down');

        if (def.good === 'down') {
            if (value >= 60) chip.classList.add('good-down-high');
        } else {
            if (value <= 15) chip.classList.add('good-low');
            else if (value <= 35) chip.classList.add('good-mid');
        }

        if (delta) {
            chip.classList.add(delta > 0 ? 'flash-up' : 'flash-down');
            const badge = document.createElement('span');
            badge.className = 'stat-delta ' + (delta > 0 ? 'up' : 'down');
            badge.textContent = (delta > 0 ? '+' : '') + delta;
            chip.appendChild(badge);
            setTimeout(() => badge.remove(), 1500);
        }
    }

    renderBrief() {
        const panel = document.getElementById('brief-panel') || this.el.briefPanel;
        if (!panel) return;
        this.el.briefPanel = panel;

        const ch = this.phase === 'intro' ? null : this.chapter;

        if (!ch) {
            const scenes = INTRO_SCENES.map((s) => `
                <div class="brief-dialogue">
                    <span class="brief-dialogue-speaker">${s.kicker}</span>
                    <p class="brief-dialogue-text">${s.title}</p>
                    <p class="brief-text" style="margin:6px 0 0;">${s.desc}</p>
                </div>`).join('');

            panel.innerHTML = `
                <div class="brief-meta-row">
                    <span class="brief-tag">${GAME_CONFIG.setting}</span>
                    <span class="brief-tag is-stage">${GAME_CONFIG.course}</span>
                </div>
                <div class="brief-scene">🤖</div>
                <h2 class="brief-title">${GAME_CONFIG.brand} — ${GAME_CONFIG.title}</h2>
                <p class="brief-text">${GAME_CONFIG.thesis}</p>
                ${scenes}
                <div class="brief-progress">
                    <span>12 chương · 3 Hồi chiến trường · 6 chỉ số</span>
                    <span>6 đại kết cục</span>
                </div>`;
            return;
        }

        panel.innerHTML = `
            <div class="brief-meta-row">
                <span class="brief-tag">${ch.place}</span>
                <span class="brief-tag">${ch.year}</span>
                <span class="brief-tag is-stage">${ch.stage}</span>
            </div>
            <div class="brief-scene" aria-hidden="true">${ch.scene}</div>
            <h2 class="brief-title">${ch.title}</h2>
            ${ch.situation.map((p) => `<p class="brief-text">${p}</p>`).join('')}
            <div class="brief-dialogue">
                <span class="brief-dialogue-speaker">${ch.dialogue.speaker}</span>
                <p class="brief-dialogue-text">“${ch.dialogue.text}”</p>
            </div>
            <div class="brief-progress">
                <span>${this.act.code} · ${this.act.name}</span>
                <span>Chương ${ch.id} / ${CHAPTERS.length}</span>
            </div>`;

        panel.scrollTop = 0;
    }

    renderPlay() {
        if (this.phase === 'intro') return this.renderIntro();
        if (this.phase === 'question') return this.renderQuestion();
        if (this.phase === 'choice') return this.renderChoices();
        if (this.phase === 'outcome') return this.renderOutcome();
    }

    renderIntro() {
        this.el.playPanel.innerHTML = `
            <div class="play-head">
                <span class="play-kicker">KHỞI ĐỘNG CHIẾN DỊCH <span class="kicker-sub">Aegis Protocol x Trà Mộc</span></span>
            </div>
            <p class="question-text">Bạn chỉ huy Robot Bảo An Unit-07 và là người sáng lập Trà Mộc. 
                Vượt qua 3 khu vực phi thuyền gặp nạn, nạp đạn súng Plasma Blaster bằng tri thức Triết học Mác – Lênin để tiêu diệt bầy quái vật và đưa ra quyết định thị trường định đoạt tương lai.</p>
            <div class="answer-note">
                <b>Cơ chế chiến đấu:</b> Trả lời đúng để Robot bắn tiêu diệt dị vật (+điểm tốc độ và chuỗi streak). 
                Trả lời sai hoặc hết giờ, dị vật sẽ phản kích làm hao tổn khiên Robot. 
                Sau mỗi hiệp bắn, bạn đưa ra <b>Quyết định chiến lược</b> điều chỉnh 6 chỉ số thị trường.
            </div>
            <div class="action-row" style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <button class="btn-ghost" id="btn-open-wait-room" type="button" style="border-color: #00e5ff; color: #00e5ff; padding: 9px 16px; font-weight: 700;">
                    🌐 SẢNH CHỜ 5 NGƯỜI (WAITING ROOM)
                </button>
                <span class="spacer"></span>
                <button class="btn-primary" id="btn-start-run" type="button">🚀 BẮT ĐẦU CHIẾN DỊCH (HỒI I) ➔</button>
            </div>`;

        const waitRoomBtn = document.getElementById('btn-open-wait-room');
        if (waitRoomBtn) {
            waitRoomBtn.addEventListener('click', () => {
                this.openHost();
            });
        }

        const btn = document.getElementById('btn-start-run');
        if (btn) {
            btn.addEventListener('click', () => {
                const sound = window.soundSystem || window.audio;
                if (sound) {
                    sound.init();
                    sound.startAmbient();
                }
                this.playIntroCinematic(() => {
                    this.beginChapter(0);
                });
            });
        }
    }

    /**
     * PHÂN CẢNH TRUYỆN TRANH MỞ ĐẦU (INTRO CINEMATIC)
     */
    playIntroCinematic(onFinish) {
        if (typeof AEGIS_STORY !== 'undefined' && AEGIS_STORY.intro && AEGIS_STORY.intro.scenes) {
            const cinematic = new SciFiCinematic('cinematic-container', AEGIS_STORY.intro.scenes, () => {
                if (onFinish) onFinish();
            });
            cinematic.start();
        } else {
            if (onFinish) onFinish();
        }
    }

    /**
     * MODAL CHUYỂN HỒI / CHUYỂN MÀN
     */
    showTransitionModal(data, onProceed) {
        const overlay = this.el.storyOverlay;
        if (!overlay || !data) {
            if (onProceed) onProceed();
            return;
        }

        if (this.el.storyTitle) this.el.storyTitle.textContent = data.title;
        if (this.el.storySubtitle) this.el.storySubtitle.textContent = data.subtitle;
        if (this.el.storyBody) {
            this.el.storyBody.innerHTML = (data.paragraphs || []).map((p) => `<p class="story-p">${p}</p>`).join('');
        }
        if (this.el.storyActionBtn) {
            this.el.storyActionBtn.textContent = data.buttonText || 'TIẾP TỤC ➔';
            this.el.storyActionBtn.onclick = () => {
                overlay.style.display = 'none';
                if (onProceed) onProceed();
            };
        }

        overlay.style.display = 'flex';
    }

    /**
     * HOẠT CẢNH ĐIỆN ẢNH CHIẾN THẮNG (VICTORY OUTRO CINEMATIC)
     */
    playVictoryOutro(onFinish) {
        const sound = window.soundSystem || window.audio;
        if (sound && sound.playBeaconActivated) {
            sound.playBeaconActivated();
        }

        if (typeof AEGIS_STORY !== 'undefined' && AEGIS_STORY.epilogue && AEGIS_STORY.epilogue.scenes) {
            const cinematic = new SciFiCinematic('cinematic-container', AEGIS_STORY.epilogue.scenes, () => {
                if (onFinish) onFinish();
            });
            cinematic.start();
        } else {
            if (onFinish) onFinish();
        }
    }

    renderQuestion() {
        const ch = this.chapter;
        if (!ch) return this.renderIntro();

        const q = ch.question;
        const answered = this.hasAnswered;

        const options = q.options.map((text, idx) => {
            let cls = '';
            if (answered && this.lastAnswer) {
                if (idx === q.correctIndex) cls = 'is-correct';
                else if (idx === this.lastAnswer.chosen) cls = 'is-wrong';
                else cls = 'is-dimmed';
            }
            return `<button class="option-btn ${cls}" type="button" data-option="${idx}" ${answered ? 'disabled' : ''}>
                <span class="option-key">${'ABCD'[idx]}</span>
                <span>${text}</span>
            </button>`;
        }).join('');

        let note = '';
        if (answered && this.lastAnswer) {
            const ok = this.lastAnswer.correct;
            note = `<div class="answer-note ${ok ? '' : 'is-wrong'}">
                <b>${ok ? '⚡ BẮN TRÚNG MỤC TIÊU!' : '⚠️ BẮN TRƯỢT — QUÁI VẬT PHẢN KÍCH!'}</b> — ${q.explanation}
                ${ok ? `<br><b>+${this.lastAnswer.points.toLocaleString('vi-VN')} điểm</b>` : ''}
            </div>`;
        }

        this.el.playPanel.innerHTML = `
            <div class="play-head">
                <span class="play-kicker">CÂU HỎI NẠP ĐẠN SÚNG PLASMA <span class="kicker-sub">Chương ${ch.id} · ${this.act.name}</span></span>
                <div class="round-pips">
                    <span class="round-pip ${answered ? 'done' : 'now'}"></span>
                    <span class="round-pip"></span>
                </div>
            </div>
            <h3 class="question-text">${q.prompt}</h3>
            <div class="option-grid">${options}</div>
            ${note}
            <div class="action-row">
                <span class="spacer"></span>
                ${answered ? '<button class="btn-primary" id="btn-to-choice" type="button">TIẾN TỚI QUYẾT ĐỊNH CHIẾN LƯỢC ➔</button>' : ''}
            </div>`;

        this.el.timerFill = null;
        this.el.timerText = null;

        if (answered) {
            const toChoiceBtn = document.getElementById('btn-to-choice');
            if (toChoiceBtn) {
                toChoiceBtn.addEventListener('click', () => {
                    this.phase = 'choice';
                    this.renderPlay();
                });
            }
        } else {
            this.el.playPanel.querySelectorAll('[data-option]').forEach((btn) => {
                btn.addEventListener('click', () => this.answer(Number(btn.dataset.option)));
            });
        }
    }

    renderChoices() {
        const ch = this.chapter;
        if (!ch) return this.renderIntro();

        const list = ch.choices.map((choice, idx) => {
            const unmet = this.unmetRequirements(choice.require);
            const locked = unmet.length > 0;
            const lockText = locked
                ? `<span class="choice-lock">🔒 ${unmet.map((u) => `${u.label} ≥ ${u.need} (hiện ${u.have})`).join(' · ')}</span>`
                : '';

            return `<button class="choice-btn ${locked ? 'locked' : ''}" type="button" data-choice="${idx}" ${locked ? 'disabled' : ''}>
                <span class="choice-num">${idx + 1}</span>
                <span class="choice-btn-title">${choice.title}</span>
                <span class="choice-btn-desc">${choice.desc}</span>
                ${lockText}
            </button>`;
        }).join('');

        this.el.playPanel.innerHTML = `
            <div class="play-head">
                <span class="play-kicker">QUYẾT ĐỊNH CHIẾN LƯỢC <span class="kicker-sub">Chương ${ch.id} · ${ch.stage}</span></span>
                <div class="round-pips">
                    <span class="round-pip done"></span>
                    <span class="round-pip now"></span>
                </div>
            </div>
            <div class="choice-head">
                <span class="choice-title">Chọn một nước đi thương trường</span>
                <span class="choice-hint">Mỗi lựa chọn đổi 6 chỉ số thị trường và mở một thẻ tri thức</span>
            </div>
            <div class="choice-list">${list}</div>`;

        this.el.playPanel.querySelectorAll('[data-choice]').forEach((btn) => {
            btn.addEventListener('click', () => this.choose(Number(btn.dataset.choice)));
        });
    }

    renderOutcome() {
        const ch = this.chapter;
        if (!ch || !this.lastChoice) return this.renderIntro();

        const choice = this.lastChoice;
        const deltaChips = STAT_DEFS
            .filter((def) => choice.deltas[def.key])
            .map((def) => {
                const v = choice.deltas[def.key];
                return `<span class="brief-tag" style="color:${v > 0 ? 'var(--jade)' : 'var(--danger)'}">
                    ${def.icon} ${def.label} ${v > 0 ? '+' : ''}${v}</span>`;
            }).join('');

        const isLastChapterOfAct1 = this.chapterIndex === 3;
        const isLastChapterOfAct2 = this.chapterIndex === 7;
        const isFinalChapter = this.chapterIndex >= CHAPTERS.length - 1;

        let advanceBtnText = 'CHƯƠNG TIẾP ➔';
        if (isLastChapterOfAct1) advanceBtnText = 'DỌN SẠCH KHO HÀNG ➔ TIẾN VÀO HỒI II';
        else if (isLastChapterOfAct2) advanceBtnText = 'KHOANG ĐỘNG CƠ AN TOÀN ➔ ĐỐI ĐẦU NỮ CHÚA';
        else if (isFinalChapter) advanceBtnText = 'TIÊU DIỆT NỮ CHÚA ➔ XEM ĐẠI KẾT CỤC';

        const card = CARDS[choice.card] || { name: 'Thẻ tri thức', brief: '' };
        const newlyUnlocked = this.lastUnlocks.length > 0;

        const unlockBanner = newlyUnlocked
            ? `<div class="unlock-banner">
                   <span class="unlock-icon">📜</span>
                   <span>Mở khoá thẻ: ${this.lastUnlocks.map((slug) => CARDS[slug] ? CARDS[slug].name : slug).join(', ')}</span>
               </div>`
            : '';

        this.el.playPanel.innerHTML = `
            <div class="play-head">
                <span class="play-kicker">HỆ QUẢ <span class="kicker-sub">${choice.title}</span></span>
            </div>
            <div class="outcome-box">
                <p class="outcome-text">${choice.outcome}</p>
                <div class="brief-meta-row">${deltaChips}</div>
                ${unlockBanner}
                <div class="answer-note">
                    <b>📜 ${card.name}</b> — ${card.brief}
                </div>
            </div>
            <div class="action-row">
                <span class="spacer"></span>
                <button class="btn-primary" id="btn-advance" type="button">
                    ${advanceBtnText}
                </button>
            </div>`;

        const advanceBtn = document.getElementById('btn-advance');
        if (advanceBtn) {
            advanceBtn.addEventListener('click', () => {
                if (isLastChapterOfAct1) {
                    this.showTransitionModal(AEGIS_STORY.transition1, () => this.beginChapter(4));
                } else if (isLastChapterOfAct2) {
                    this.showTransitionModal(AEGIS_STORY.transition2, () => this.beginChapter(8));
                } else if (isFinalChapter) {
                    this.playVictoryOutro(() => this.showEnding());
                } else {
                    this.beginChapter(this.chapterIndex + 1);
                }
            });
        }

        this.el.playPanel.scrollTop = 0;
    }

    /* ------------------------------------------------------------- */
    /* Vòng chơi & Đấu trường                                         */
    /* ------------------------------------------------------------- */

    getSectorCompetitors(sector) {
        if (window.multiplayer && typeof window.multiplayer.getCompetitors === 'function') {
            const comps = window.multiplayer.getCompetitors();
            if (comps && comps.length > 0) return comps;
        }
        return JSON.parse(JSON.stringify(SECTOR_MONSTERS[sector] || SECTOR_MONSTERS[0]));
    }

    beginChapter(index) {
        this.chapterIndex = index;
        this.phase = 'question';
        this.hasAnswered = false;
        this.lastAnswer = null;
        this.lastChoice = null;
        this.lastUnlocks = [];

        // Xác định Hồi / Sector hiện tại (0: Hồi 1, 1: Hồi 2, 2: Hồi 3)
        const sector = Math.floor(index / 4);
        if (this.currentSectorIndex !== sector || !this.aliensState || this.aliensState.length === 0) {
            this.currentSectorIndex = sector;
            this.aliensState = this.getSectorCompetitors(sector);
        }

        // Render Đấu trường VisualEngine
        if (this.visuals) {
            this.visuals.renderArena(this.currentSectorIndex, this.aliensState, this.robotShield);
        }

        this.renderProgress();
        this.renderBrief();
        this.renderPlay();
        this.startTimer();
    }

    answer(optionIndex) {
        if (this.phase !== 'question' || this.hasAnswered) return;

        const q = this.chapter.question;
        const correct = optionIndex === q.correctIndex;

        this.clearTimer();
        this.hasAnswered = true;
        this.questionsAnswered += 1;

        let points = 0;
        let speedBonus = 0;

        if (correct) {
            const elapsed = (performance.now() - (this.questionStartTime || performance.now())) / 1000;
            speedBonus = Math.max(100, Math.round(500 - Math.min(20, elapsed) * 20));
            this.streak += 1;
            const streakBonus = (this.streak - 1) * 100;
            points = 1000 + speedBonus + streakBonus;
            this.score += points;
            this.answeredCorrect += 1;

            this.showScorePopup(points, speedBonus, this.streak);

            this.lastUnlocks = [];
            if (q.insightCard) this.unlockCard(q.insightCard);

            // Tìm mục tiêu đang chọn hoặc mục tiêu còn sống đầu tiên
            let targetIdx = this.visuals ? this.visuals.currentTargetIndex : 0;
            if (!this.aliensState[targetIdx] || this.aliensState[targetIdx].hp <= 0) {
                targetIdx = this.aliensState.findIndex((a) => a.hp > 0);
            }

            if (targetIdx !== -1) {
                const target = this.aliensState[targetIdx];
                const isRival = target.type === 'rival' || target.isPlayer || target.avatar;
                const damage = isRival ? 25 : 1;
                const newHp = Math.max(0, target.hp - damage);
                target.hp = newHp;
                const isDead = newHp <= 0;

                // Hoạt ảnh Robot bắn đạn Plasma Blaster
                if (this.visuals) {
                    this.visuals.playRobotAttack(targetIdx, newHp, isDead, () => {
                        this.renderPlay();
                    });
                } else {
                    this.renderPlay();
                }

                if (window.multiplayer && typeof window.multiplayer.attackCompetitor === 'function') {
                    window.multiplayer.attackCompetitor(targetIdx, damage);
                }
            } else {
                this.renderPlay();
            }
        } else {
            this.streak = 0;

            // Quái vật / Đối thủ phản kích
            let attackerIdx = this.aliensState.findIndex((a) => a.hp > 0);
            if (attackerIdx === -1) attackerIdx = 0;
            const attacker = this.aliensState[attackerIdx];
            const attackerName = attacker ? attacker.name : 'Đối thủ thị trường';
            const damage = 15;
            this.robotShield = Math.max(0, this.robotShield - damage);

            if (this.visuals) {
                this.visuals.playAlienRetaliation(attackerIdx, this.robotShield, damage, () => {
                    if (this.robotShield <= 0) {
                        this.robotShield = 100;
                        this.spawnToast('⚠️ Khiên thị trường sụp đổ! Tự động nạp quỹ dự phòng (+100 HP)', 'is-bad');
                        if (this.visuals) this.visuals.updateRobotShieldDisplay(this.robotShield);
                    }
                    this.renderPlay();
                });
            } else {
                this.renderPlay();
            }

            this.spawnToast(`⚠️ Bị ${attackerName} phản kích tranh đoạt thị trường (-${damage} HP khiên)!`, 'is-bad');
        }

        if (window.multiplayer && typeof window.multiplayer.recordAnswer === 'function') {
            window.multiplayer.recordAnswer(correct, points, this.visuals ? this.visuals.currentTargetIndex : 0);
        }

        this.lastAnswer = { correct, chosen: optionIndex, points };
        this.updateHud();
    }

    showScorePopup(score, speedBonus, streak) {
        const popup = document.getElementById('score-float-popup');
        if (!popup) return;
        const title = popup.querySelector('.popup-title');
        const sub = popup.querySelector('.popup-sub');
        if (title) title.textContent = `+${score.toLocaleString('vi-VN')} ĐIỂM`;
        if (sub) sub.textContent = `⚡ Tốc độ: +${speedBonus} | 🔥 Chuỗi x${streak}`;

        popup.classList.remove('show-popup');
        void popup.offsetWidth;
        popup.classList.add('show-popup');
    }

    handleTimeout() {
        if (this.phase !== 'question' || this.hasAnswered) return;
        this.answer(-1);
        this.spawnToast('Hết giờ — Quái vật phản kích!', 'is-bad');
    }

    choose(choiceIndex) {
        if (this.phase !== 'choice') return;

        const ch = this.chapter;
        const choice = ch.choices[choiceIndex];
        if (!choice) return;

        if (this.unmetRequirements(choice.require).length) return;

        const sound = window.soundSystem || window.audio;
        if (sound && sound.playChoice) sound.playChoice();

        this.lastUnlocks = [];

        STAT_DEFS.forEach((def) => {
            const delta = choice.deltas[def.key] || 0;
            if (!delta) return;
            const next = this.stats[def.key] + delta;
            this.stats[def.key] = Math.max(def.min, Math.min(def.max, next));
            this.paintStatChip(def.key, delta);
        });

        this.log.push({
            chapterId: ch.id,
            chapterTitle: ch.title,
            choice: choice.title,
            card: choice.card,
            deltas: { ...choice.deltas }
        });

        this.unlockCard(choice.card);
        if (this.lastUnlocks.length && sound && sound.playCardUnlock) {
            sound.playCardUnlock();
        }

        this.lastChoice = choice;
        this.phase = 'outcome';
        this.renderPlay();
        this.updateHud();
    }

    unmetRequirements(require) {
        if (!require) return [];
        return Object.keys(require).map((key) => {
            const def = STAT_DEFS.find((d) => d.key === key);
            return {
                key,
                label: def ? def.label : key,
                need: require[key],
                have: this.stats[key]
            };
        }).filter((item) => item.have < item.need);
    }

    unlockCard(slug) {
        if (!slug || !CARDS[slug] || this.unlocked.has(slug)) return;
        this.unlocked.add(slug);
        this.lastUnlocks.push(slug);
        this.renderCards();
        this.updateHud();
    }

    /* ------------------------------------------------------------- */
    /* Đồng hồ đếm ngược (Đã loại bỏ giới hạn thời gian)               */
    /* ------------------------------------------------------------- */

    startTimer() {
        this.clearTimer();
        this.questionStartTime = performance.now();
        this.remaining = 0;
        // Không đặt hẹn giờ countdown hay timeout - người chơi có toàn quyền suy nghĩ
    }

    syncTimer() {
        // Không giới hạn thời gian (Time limit removed)
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    paintTimer(forced) {
        // Không giới hạn thời gian - thanh timer đã được gỡ khỏi giao diện
    }

    /* ------------------------------------------------------------- */
    /* Kết thúc                                                       */
    /* ------------------------------------------------------------- */

    showEnding() {
        this.clearTimer();

        const endingId = resolveEnding(this.stats, this.log);
        const ending = ENDINGS.find((e) => e.id === endingId) || ENDINGS[0];

        const accuracy = this.questionsAnswered > 0
            ? Math.round((this.answeredCorrect / this.questionsAnswered) * 100)
            : 100;

        let rank = 'S';
        if (accuracy < 70 || this.robotShield < 60) rank = 'B';
        else if (accuracy < 85 || this.robotShield < 120) rank = 'A';

        this.el.endingCode.textContent = `${ending.code} · ${ending.tag} · HẠNG CHIẾN DỊCH: ${rank}`;
        this.el.endingIcon.textContent = ending.icon;
        this.el.endingTitle.textContent = ending.title;
        this.el.endingQuote.textContent = '“' + ending.quote + '”';

        const survivalSummary = `
            <div class="answer-note" style="margin-bottom: 12px; background: rgba(0, 255, 136, 0.12); border-color: var(--tech-green);">
                <b>📊 TỔNG KẾT CHIẾN DỊCH:</b><br>
                • Tỷ lệ bắn trúng: <b>${accuracy}%</b> (${this.answeredCorrect}/${this.questionsAnswered} câu)<br>
                • Khiên Robot bảo tồn: <b>${this.robotShield}/${this.robotMaxShield} HP</b><br>
                • Tổng điểm phi đội: <b>${this.score.toLocaleString('vi-VN')} ĐIỂM</b> (Hạng ${rank})
            </div>
        `;

        this.el.endingBody.innerHTML = survivalSummary + ending.summary.map((p) => `<p>${p}</p>`).join('');
        this.el.endingLesson.textContent = ending.lesson;

        const collected = ending.cards
            .filter((slug) => CARDS[slug])
            .map((slug) => `<span class="mini-card">${CARDS[slug].icon} ${CARDS[slug].name}</span>`)
            .join('');
        this.el.endingCards.innerHTML =
            `<span class="mini-card" style="border-color:var(--line-mid)">📚 Thẻ tri thức: ${this.unlocked.size}/${Object.keys(CARDS).length}</span>` +
            collected;

        this.el.endingOverlay.classList.add('show');
    }

    replay() {
        this.el.endingOverlay.classList.remove('show');
        this.resetGame(true);
    }

    resetGame(clearScore) {
        this.clearTimer();
        this.stats = { ...STARTING_STATS };
        this.chapterIndex = 0;
        this.log = [];
        this.unlocked = new Set();
        this.hasAnswered = false;
        this.lastAnswer = null;
        this.lastChoice = null;
        this.lastUnlocks = [];
        this.phase = 'intro';

        this.robotShield = 200;
        this.currentSectorIndex = 0;
        this.aliensState = this.getSectorCompetitors(0);

        if (clearScore) {
            this.score = 0;
            this.streak = 0;
            this.questionsAnswered = 0;
            this.answeredCorrect = 0;
            if (window.multiplayer) window.multiplayer.resetScores();
        }

        this.updateHud();
        this.renderAll();
    }

    /* ------------------------------------------------------------- */
    /* HUD, ngăn kéo, modal                                           */
    /* ------------------------------------------------------------- */

    updateHud() {
        this.el.scoreDisplay.textContent = this.score.toLocaleString('vi-VN') + ' ĐIỂM';

        if (this.streak >= 2) {
            this.el.streakDisplay.style.display = '';
            this.el.streakDisplay.textContent = '🔥 Chuỗi x' + this.streak;
        } else {
            this.el.streakDisplay.style.display = 'none';
        }

        this.el.cardsBadge.textContent = this.unlocked.size + '/' + Object.keys(CARDS).length;
    }

    renderLeaderboard() {
        if (!window.multiplayer) return;
        const rows = window.multiplayer.getRankedPlayers();
        const medals = ['🥇', '🥈', '🥉'];

        this.el.leaderboardBody.innerHTML = rows.map((p, idx) => {
            const pos = medals[idx] || (idx + 1);
            return `<div class="rank-row ${p.isSelf ? 'is-self' : ''}">
                <span class="rank-pos">${pos}</span>
                <span class="rank-avatar">${p.avatar}</span>
                <span class="rank-name">${p.name}${p.isSelf ? '<span class="rank-self-tag">BẠN</span>' : ''}</span>
                ${p.streak >= 2 ? `<span class="rank-streak">🔥${p.streak}</span>` : ''}
                <span class="rank-score">${p.score.toLocaleString('vi-VN')}</span>
            </div>`;
        }).join('');
    }

    renderCards() {
        const slugs = Object.keys(CARDS);
        const count = this.unlocked.size;

        this.el.cardsHint.textContent = `${count}/${slugs.length} thẻ đã mở. Mỗi quyết định mở một thẻ.`;

        this.el.cardsBody.innerHTML = slugs.map((slug) => {
            const card = CARDS[slug];
            const owned = this.unlocked.has(slug);

            if (!owned) {
                return `<div class="card-entry is-locked">
                    <div class="card-entry-head">
                        <span class="card-entry-icon">🔒</span>
                        <span class="card-entry-name">Chưa mở khoá</span>
                    </div>
                    <p class="card-entry-brief">Xuất hiện khi bạn đưa ra lựa chọn liên quan.</p>
                </div>`;
            }

            return `<div class="card-entry">
                <div class="card-entry-head">
                    <span class="card-entry-icon">${card.icon}</span>
                    <span class="card-entry-name">${card.name}</span>
                </div>
                <p class="card-entry-brief">${card.brief}</p>
                <p class="card-entry-detail">${card.detail}</p>
            </div>`;
        }).join('');
    }

    renderHostPlayers() {
        if (!window.multiplayer) return;
        const players = window.multiplayer.getPlayerList();
        if (this.el.hostPin) this.el.hostPin.textContent = window.multiplayer.roomCode;
        if (this.el.lobbyDisplay) this.el.lobbyDisplay.textContent = window.multiplayer.playerName;

        const playerListHtml = players.map((p) => `
            <div class="player-pill ${p.isSelf ? 'is-self' : ''}">
                <span class="pill-avatar">${p.avatar}</span>
                <span class="pill-name">${p.name}</span>
                ${p.isSelf ? '<span class="pill-self-tag">(Bạn)</span>' : p.isBot ? '<span class="pill-bot-tag">(AI)</span>' : '<span class="pill-live-tag">● Live</span>'}
            </div>`).join('');

        if (this.el.hostPlayerList) {
            this.el.hostPlayerList.innerHTML = playerListHtml;
        }
        if (this.el.joinPlayerList) {
            this.el.joinPlayerList.innerHTML = playerListHtml;
        }
    }

    openProfile() {
        if (!window.multiplayer) return;
        this.el.nameInput.value = window.multiplayer.playerName;
        this.el.avatarGrid.querySelectorAll('.avatar-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.avatar === window.multiplayer.playerAvatar);
        });
        this.el.profileModal.classList.add('show');
        setTimeout(() => this.el.nameInput.focus(), 60);
    }

    closeProfile() {
        this.el.profileModal.classList.remove('show');
    }

    saveProfile() {
        const raw = this.el.nameInput.value.trim();
        const name = raw || 'Unit-07';
        const active = this.el.avatarGrid.querySelector('.avatar-btn.active');
        const avatar = active ? active.dataset.avatar : (window.multiplayer ? window.multiplayer.playerAvatar : '🤖');

        if (window.multiplayer) {
            window.multiplayer.updatePlayerProfile(name, avatar);
        }
        this.applyProfileToHeader();
        this.renderHostPlayers();
        this.renderLeaderboard();
        this.closeProfile();
        this.spawnToast('Đã lưu hồ sơ chiến binh', 'is-good');
    }

    applyProfileToHeader() {
        if (!window.multiplayer) return;
        this.el.headerName.textContent = window.multiplayer.playerName;
        this.el.headerAvatar.textContent = window.multiplayer.playerAvatar;
    }

    openHost() {
        this.renderHostPlayers();
        this.el.hostModal.classList.add('show');
    }

    closeHost() {
        this.el.hostModal.classList.remove('show');
    }

    openDrawer(which) {
        this.closeDrawers();
        if (which === 'leaderboard') this.el.leaderboardDrawer.classList.add('open');
        if (which === 'cards') this.el.cardsDrawer.classList.add('open');
    }

    closeDrawers() {
        this.el.leaderboardDrawer.classList.remove('open');
        this.el.cardsDrawer.classList.remove('open');
    }

    toggleSound() {
        const sound = window.soundSystem || window.audio;
        if (sound) {
            this.soundOn = sound.toggle();
            this.el.soundIcon.textContent = this.soundOn ? '🔊' : '🔇';
            this.el.soundBtn.setAttribute('aria-label', this.soundOn ? 'Tắt âm thanh' : 'Bật âm thanh');
        }
    }

    spawnToast(message, kind) {
        const toast = document.createElement('div');
        toast.className = 'toast ' + (kind || '');
        toast.textContent = message;
        this.el.toastStack.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    }

    /* ------------------------------------------------------------- */
    /* Bàn phím                                                       */
    /* ------------------------------------------------------------- */

    handleKeydown(event) {
        if (event.key === 'Escape') {
            this.closeDrawers();
            this.closeProfile();
            this.closeHost();
            return;
        }

        const target = event.target;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

        if (this.phase === 'question') {
            if (this.hasAnswered) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const btn = document.getElementById('btn-to-choice');
                    if (btn) btn.click();
                }
                return;
            }

            const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
            const idx = map[event.key.toLowerCase()];
            if (idx !== undefined) {
                event.preventDefault();
                this.answer(idx);
            }
            return;
        }

        if (this.phase === 'choice') {
            const map = { '1': 0, '2': 1, '3': 2 };
            const idx = map[event.key];
            if (idx !== undefined) {
                event.preventDefault();
                this.choose(idx);
            }
            return;
        }

        if (this.phase === 'outcome' && (event.key === 'Enter' || event.key === ' ')) {
            const btn = document.getElementById('btn-advance');
            if (btn) btn.click();
            return;
        }

        if (this.phase === 'intro' && (event.key === 'Enter' || event.key === ' ')) {
            const btn = document.getElementById('btn-start-run');
            if (btn) btn.click();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new TraMocGame();
    window.game.applyProfileToHeader();
});
