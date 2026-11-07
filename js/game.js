/**
 * TRÌNH ĐIỀU KHIỂN CHÍNH CỦA GAME ODYSSEY (PHIÊN BẢN SỬ THI QUIZIZZ & MULTIPLAYER)
 * Hỗ trợ đổi tên người chơi, chọn Avatar, Leaderboard trực tiếp và tự động chuyển cảnh
 */

class OdysseyGame {
    constructor() {
        this.visuals = new VisualEngine('visual-theater');
        this.stages = ['cyclops', 'sirens', 'scylla'];
        this.currentStageIndex = 0;
        this.currentQuestionIndex = 0;
        this.totalQuestionsAnswered = 0;
        this.currentStageQuestions = [];
        this.stageQuestionResults = [];
        this.hasAnswered = false;

        // Bộ đếm thời gian cho mỗi câu hỏi (Quizizz Timer)
        this.questionTimeLimit = 15;
        this.timeRemaining = 15;
        this.timerInterval = null;
        this.autoAdvanceTimeout = null;

        // Quản lý Avatar đang chọn
        this.selectedAvatar = multiplayer.playerAvatar || "👑";

        this.initDOMElements();
        this.bindEvents();
        this.bindMultiplayerEvents();
    }

    initDOMElements() {
        // Headers & HUD
        this.soundBtn = document.getElementById('sound-toggle-btn');
        this.soundIcon = document.getElementById('sound-icon');
        this.scoreBadge = document.getElementById('score-display');
        this.streakBadge = document.getElementById('streak-display');
        this.leaderboardBtn = document.getElementById('leaderboard-toggle-btn');
        this.hostControlBtn = document.getElementById('host-control-btn');
        
        // Profile & Name elements
        this.profileBtn = document.getElementById('player-profile-btn');
        this.headerPlayerName = document.getElementById('header-player-name');
        this.headerPlayerAvatar = document.getElementById('header-player-avatar');
        this.profileModal = document.getElementById('profile-modal');
        this.customNameInput = document.getElementById('custom-name-input');
        this.avatarGrid = document.getElementById('avatar-grid');
        this.saveProfileBtn = document.getElementById('save-profile-btn');
        this.cancelProfileBtn = document.getElementById('cancel-profile-btn');
        this.lobbyPlayerDisplay = document.getElementById('lobby-player-display');
        this.lobbyRenameBtn = document.getElementById('lobby-rename-btn');

        // Timer bar
        this.timerBar = document.getElementById('quiz-timer-bar');
        this.timerText = document.getElementById('quiz-timer-text');

        // Progress steps
        this.stepCyclops = document.getElementById('step-cyclops');
        this.stepSirens = document.getElementById('step-sirens');
        this.stepScylla = document.getElementById('step-scylla');

        // Quiz elements
        this.quizPanel = document.getElementById('quiz-panel');
        this.questionCounter = document.getElementById('question-counter');
        this.indicatorDots = document.getElementById('indicator-dots');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.explanationBox = document.getElementById('explanation-box');
        this.scoreFloatPopup = document.getElementById('score-float-popup');

        // Story modal elements
        this.storyOverlay = document.getElementById('story-overlay');
        this.storyTitle = document.getElementById('story-title');
        this.storySubtitle = document.getElementById('story-subtitle');
        this.storyBody = document.getElementById('story-body');
        this.storyActionBtn = document.getElementById('story-action-btn');

        // Leaderboard drawer
        this.leaderboardDrawer = document.getElementById('leaderboard-drawer');
        this.leaderboardCloseBtn = document.getElementById('leaderboard-close-btn');
        this.leaderboardBody = document.getElementById('leaderboard-body');

        // Host Lobby modal
        this.hostModal = document.getElementById('host-modal');
        this.hostStartBtn = document.getElementById('host-start-btn');
        this.hostCloseBtn = document.getElementById('host-close-btn');
        this.hostResetBtn = document.getElementById('host-reset-btn');
        this.hostRoomPinText = document.getElementById('host-room-pin');
        this.hostPlayerList = document.getElementById('host-player-list');

        // Khởi tạo hiển thị tên ban đầu
        this.updateProfileDisplay();
    }

    bindEvents() {
        // Bật / tắt âm thanh
        if (this.soundBtn) {
            this.soundBtn.addEventListener('click', () => {
                const isEnabled = sounds.toggle();
                this.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
            });
        }

        // Bật / tắt bảng xếp hạng Leaderboard
        if (this.leaderboardBtn) {
            this.leaderboardBtn.addEventListener('click', () => this.toggleLeaderboard());
        }
        if (this.leaderboardCloseBtn) {
            this.leaderboardCloseBtn.addEventListener('click', () => {
                this.leaderboardDrawer.classList.remove('open');
            });
        }

        // Sự kiện đổi tên & Avatar
        if (this.profileBtn) {
            this.profileBtn.addEventListener('click', () => this.openProfileModal());
        }
        if (this.lobbyRenameBtn) {
            this.lobbyRenameBtn.addEventListener('click', () => this.openProfileModal());
        }
        if (this.cancelProfileBtn) {
            this.cancelProfileBtn.addEventListener('click', () => {
                this.profileModal.style.display = 'none';
            });
        }
        if (this.saveProfileBtn) {
            this.saveProfileBtn.addEventListener('click', () => this.handleSaveProfile());
        }
        if (this.customNameInput) {
            this.customNameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.handleSaveProfile();
            });
        }

        // Chọn Avatar emoji
        if (this.avatarGrid) {
            const avatarBtns = this.avatarGrid.querySelectorAll('.avatar-btn');
            avatarBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    avatarBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.selectedAvatar = btn.getAttribute('data-avatar');
                });
            });
        }

        // Bảng điều khiển Host
        if (this.hostControlBtn) {
            this.hostControlBtn.addEventListener('click', () => this.openHostModal());
        }
        if (this.hostStartBtn) {
            this.hostStartBtn.addEventListener('click', () => {
                multiplayer.startRoomByHost();
                this.hostModal.style.display = 'none';
            });
        }
        if (this.hostCloseBtn) {
            this.hostCloseBtn.addEventListener('click', () => {
                this.hostModal.style.display = 'none';
                if (multiplayer.roomState !== 'RUNNING') {
                    multiplayer.startRoomByHost();
                }
            });
        }
        if (this.hostResetBtn) {
            this.hostResetBtn.addEventListener('click', () => {
                multiplayer.resetRoomByHost();
                this.updateScoreDisplay();
                alert("Đã reset phòng chơi và bảng điểm cho phiên mới!");
            });
        }
    }

    bindMultiplayerEvents() {
        multiplayer.onRoomStarted = () => {
            sounds.playWarHorn();
            sounds.startAmbient();
            this.loadStage(0);
        };

        multiplayer.onLeaderboardUpdate = (sortedList) => {
            this.renderLeaderboardTable(sortedList);
        };

        multiplayer.onPlayerListChange = () => {
            this.renderHostPlayerList();
            this.updateProfileDisplay();
        };
    }

    // ==========================================
    // QUẢN LÝ ĐỔI TÊN NGƯỜI CHƠI & AVATAR
    // ==========================================
    openProfileModal() {
        if (!this.profileModal) return;
        if (this.customNameInput) {
            this.customNameInput.value = multiplayer.playerName;
        }

        // Cập nhật trạng thái active của avatar
        if (this.avatarGrid) {
            const avatarBtns = this.avatarGrid.querySelectorAll('.avatar-btn');
            avatarBtns.forEach(btn => {
                if (btn.getAttribute('data-avatar') === multiplayer.playerAvatar) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        this.profileModal.style.display = 'flex';
        setTimeout(() => {
            if (this.customNameInput) this.customNameInput.focus();
        }, 150);
    }

    handleSaveProfile() {
        const newName = this.customNameInput.value.trim();
        if (newName === "") {
            alert("Vui lòng nhập tên người chơi của bạn!");
            return;
        }

        multiplayer.setPlayerProfile(newName, this.selectedAvatar);
        this.updateProfileDisplay();
        this.renderHostPlayerList();
        this.profileModal.style.display = 'none';
    }

    updateProfileDisplay() {
        if (this.headerPlayerName) this.headerPlayerName.textContent = multiplayer.playerName;
        if (this.headerPlayerAvatar) this.headerPlayerAvatar.textContent = multiplayer.playerAvatar;
        if (this.lobbyPlayerDisplay) {
            this.lobbyPlayerDisplay.textContent = `${multiplayer.playerAvatar} ${multiplayer.playerName}`;
        }
    }

    start() {
        multiplayer.setAsHost(true);
        if (this.hostRoomPinText) {
            this.hostRoomPinText.textContent = multiplayer.roomCode;
        }

        // BẮT ĐẦU TRÒ CHƠI BẰNG TRƯỜNG ĐOẠN ĐIỆN ẢNH THÀNH TROY
        this.startCinematicIntro();
    }

    openHostModal() {
        if (!this.hostModal) return;
        if (this.hostRoomPinText) this.hostRoomPinText.textContent = multiplayer.roomCode;
        this.renderHostPlayerList();
        this.updateProfileDisplay();
        this.hostModal.style.display = 'flex';
    }

    renderHostPlayerList() {
        if (!this.hostPlayerList) return;
        const players = Object.values(multiplayer.players);
        this.hostPlayerList.innerHTML = players.map(p => `
            <div class="lobby-player-chip">
                <span class="player-avatar">${p.avatar || '⚔️'}</span>
                <span class="player-name">${p.name} ${p.isSelf ? '(Bạn)' : ''}</span>
                ${p.isBot ? '<span class="chip-badge">Chiến binh</span>' : '<span class="chip-badge chip-online">Online</span>'}
            </div>
        `).join('');
    }

    startCinematicIntro() {
        sounds.init();
        sounds.startAmbient();
        const cinematic = new TroyCinematic('cinematic-container', () => {
            this.loadStage(0);
        });
        cinematic.start();
    }

    loadStage(stageIndex) {
        this.currentStageIndex = stageIndex;
        this.currentQuestionIndex = 0;
        const stageName = this.stages[stageIndex];
        this.currentStageQuestions = ODYSSEY_QUESTIONS[stageName] || [];
        this.stageQuestionResults = [];

        this.updateProgressStrip();

        if (stageName === 'cyclops') {
            this.visuals.renderCyclopsStage();
        } else if (stageName === 'sirens') {
            this.visuals.renderSirensStage();
        } else if (stageName === 'scylla') {
            this.visuals.renderScyllaStage();
        }

        this.loadQuestion();
    }

    updateProgressStrip() {
        const steps = [this.stepCyclops, this.stepSirens, this.stepScylla];
        steps.forEach((step, idx) => {
            step.classList.remove('active', 'completed');
            if (idx < this.currentStageIndex) {
                step.classList.add('completed');
            } else if (idx === this.currentStageIndex) {
                step.classList.add('active');
            }
        });
    }

    loadQuestion() {
        this.hasAnswered = false;
        clearInterval(this.timerInterval);
        clearTimeout(this.autoAdvanceTimeout);

        if (!this.currentStageQuestions || this.currentStageQuestions.length === 0) {
            const stageName = this.stages[this.currentStageIndex] || 'cyclops';
            this.currentStageQuestions = ODYSSEY_QUESTIONS[stageName] || [];
        }

        const currentQ = this.currentStageQuestions[this.currentQuestionIndex];
        if (!currentQ) {
            this.finishCurrentStage();
            return;
        }

        const totalQ = this.currentStageQuestions.length;

        if (this.questionCounter) this.questionCounter.textContent = `CÂU HỎI ${this.currentQuestionIndex + 1} / ${totalQ}`;
        this.renderDots(totalQ);
        if (this.questionText) this.questionText.textContent = currentQ.question;
        if (this.explanationBox) this.explanationBox.style.display = 'none';

        if (this.optionsContainer) {
            this.optionsContainer.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];
            currentQ.options.forEach((optText, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `
                    <span class="option-letter">${letters[optIdx]}</span>
                    <span class="option-label">${optText}</span>
                `;
                btn.addEventListener('click', () => {
                    this.handleAnswer(optIdx, currentQ.correctIndex, currentQ.explanation);
                });
                this.optionsContainer.appendChild(btn);
            });
        }

        this.startQuestionTimer();
    }

    startQuestionTimer() {
        clearInterval(this.timerInterval);
        this.timeRemaining = this.questionTimeLimit;
        this.updateTimerUI(1.0);

        this.timerInterval = setInterval(() => {
            this.timeRemaining -= 0.1;
            const ratio = Math.max(0, this.timeRemaining / this.questionTimeLimit);
            this.updateTimerUI(ratio);

            if (this.timeRemaining <= 4.0 && this.timeRemaining > 0 && Math.abs(this.timeRemaining % 1) < 0.15) {
                try {
                    sounds.playTick();
                } catch (e) {}
            }

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                const currentQ = this.currentStageQuestions ? this.currentStageQuestions[this.currentQuestionIndex] : null;
                const correctIdx = currentQ ? currentQ.correctIndex : 0;
                this.handleAnswer(-1, correctIdx, "Hết thời gian trả lời!");
            }
        }, 100);
    }

    updateTimerUI(ratio) {
        if (this.timerBar) {
            this.timerBar.style.width = `${ratio * 100}%`;
            if (ratio < 0.25) {
                this.timerBar.className = "quiz-timer-fill timer-danger";
            } else if (ratio < 0.5) {
                this.timerBar.className = "quiz-timer-fill timer-warning";
            } else {
                this.timerBar.className = "quiz-timer-fill timer-normal";
            }
        }
        if (this.timerText) {
            this.timerText.textContent = `${Math.ceil(Math.max(0, this.timeRemaining))}s`;
        }
    }

    renderDots(total) {
        if (!this.indicatorDots) return;
        this.indicatorDots.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i < this.stageQuestionResults.length) {
                dot.classList.add(this.stageQuestionResults[i] ? 'correct' : 'wrong');
            } else if (i === this.currentQuestionIndex) {
                dot.classList.add('active');
            }
            this.indicatorDots.appendChild(dot);
        }
    }

    handleAnswer(selectedIndex, correctIndex, explanation) {
        if (this.hasAnswered) return;
        this.hasAnswered = true;
        clearInterval(this.timerInterval);

        try {
            const isCorrect = selectedIndex === correctIndex;
            this.stageQuestionResults.push(isCorrect);
            this.totalQuestionsAnswered++;

            if (this.optionsContainer) {
                const buttons = this.optionsContainer.querySelectorAll('.option-btn');
                buttons.forEach((btn, idx) => {
                    btn.disabled = true;
                    if (idx === correctIndex) {
                        btn.classList.add('selected-correct');
                    } else if (idx === selectedIndex && !isCorrect) {
                        btn.classList.add('selected-wrong');
                    }
                });
            }

            let scoreResult = { totalPoints: 0, speedBonus: 0, streak: 0 };
            try {
                if (window.multiplayer && typeof multiplayer.calculateQuizizzScore === 'function') {
                    scoreResult = multiplayer.calculateQuizizzScore(isCorrect, this.timeRemaining, this.questionTimeLimit);
                }
            } catch (e) {
                console.warn("calculateQuizizzScore notice:", e);
            }

            try {
                this.updateScoreDisplay();
            } catch (e) {}

            try {
                if (isCorrect) {
                    sounds.playStreakChime(scoreResult.streak || 1);
                    this.showScorePopup(`+${(scoreResult.totalPoints || 1000).toLocaleString()} ĐIỂM`, `⚡ Tốc độ: +${scoreResult.speedBonus || 0} ${scoreResult.streak > 1 ? `| 🔥 Chuỗi x${scoreResult.streak}` : ''}`, 'score-positive');
                } else {
                    this.showScorePopup("0 ĐIỂM", selectedIndex === -1 ? "⏱️ Hết thời gian!" : "❌ Trả lời chưa chính xác", 'score-zero');
                }
            } catch (e) {
                console.warn("Score popup notice:", e);
            }

            try {
                const stageName = this.stages[this.currentStageIndex];
                if (stageName === 'cyclops') {
                    if (isCorrect) {
                        sounds.playArrowHit();
                        if (this.visuals) this.visuals.triggerCyclopsCorrect();
                    } else {
                        sounds.playCyclopsRoar();
                        if (this.visuals) this.visuals.triggerCyclopsWrong();
                    }
                } else if (stageName === 'sirens') {
                    if (isCorrect) {
                        sounds.playSirenFurious();
                        if (this.visuals) this.visuals.triggerSirensCorrect();
                    } else {
                        sounds.playScreamAndSplash();
                        if (this.visuals) this.visuals.triggerSirensWrong();
                    }
                } else if (stageName === 'scylla') {
                    if (isCorrect) {
                        sounds.playSwordSlash();
                        if (this.visuals) this.visuals.triggerScyllaCorrect();
                    } else {
                        sounds.playScyllaBite();
                        if (this.visuals) this.visuals.triggerScyllaWrong();
                    }
                }
            } catch (e) {
                console.warn("Visuals action notice:", e);
            }
        } catch (err) {
            console.error("General error in handleAnswer:", err);
        } finally {
            // TỰ ĐỘNG CHUYỂN CÂU SAU 1.8 GIÂY - BẢO ĐẢM 100% LUÔN CHẠY
            clearTimeout(this.autoAdvanceTimeout);
            this.autoAdvanceTimeout = setTimeout(() => {
                this.handleAutoNext();
            }, 1800);
        }
    }

    showScorePopup(title, subtitle, typeClass) {
        if (!this.scoreFloatPopup) return;
        this.scoreFloatPopup.innerHTML = `
            <div class="popup-title">${title}</div>
            <div class="popup-sub">${subtitle}</div>
        `;
        this.scoreFloatPopup.className = `score-float-box show ${typeClass}`;
        setTimeout(() => {
            this.scoreFloatPopup.classList.remove('show');
        }, 1600);
    }

    updateScoreDisplay() {
        const myData = multiplayer && multiplayer.players ? multiplayer.players[multiplayer.playerId] : null;
        const currentScore = myData ? myData.score : 0;
        const currentStreak = myData ? myData.streak : 0;

        if (this.scoreBadge) {
            this.scoreBadge.textContent = `${currentScore.toLocaleString()} ĐIỂM`;
        }
        if (this.streakBadge) {
            if (currentStreak > 1) {
                this.streakBadge.style.display = 'inline-flex';
                this.streakBadge.textContent = `🔥 Chuỗi x${currentStreak}`;
            } else {
                this.streakBadge.style.display = 'none';
            }
        }
    }

    handleAutoNext() {
        const isLastQuestionOfStage = this.currentQuestionIndex >= this.currentStageQuestions.length - 1;

        if (isLastQuestionOfStage) {
            this.finishCurrentStage();
        } else {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }
    }

    finishCurrentStage() {
        const stageName = this.stages[this.currentStageIndex];

        let hasAdvanced = false;
        const safeAdvance = (callback) => {
            if (hasAdvanced) return;
            hasAdvanced = true;
            callback();
        };

        if (stageName === 'cyclops') {
            try { sounds.playBlindImpact(); } catch (e) {}
            const fallbackTimer = setTimeout(() => {
                safeAdvance(() => {
                    this.showStoryModal(
                        ODYSSEY_STORY.transition1.title,
                        ODYSSEY_STORY.transition1.subtitle,
                        ODYSSEY_STORY.transition1.paragraphs,
                        ODYSSEY_STORY.transition1.buttonText,
                        () => this.loadStage(1)
                    );
                });
            }, 2600);

            try {
                this.visuals.triggerCyclopsFinalBlind(() => {
                    clearTimeout(fallbackTimer);
                    try { sounds.playStageVictory(); } catch (e) {}
                    safeAdvance(() => {
                        this.showStoryModal(
                            ODYSSEY_STORY.transition1.title,
                            ODYSSEY_STORY.transition1.subtitle,
                            ODYSSEY_STORY.transition1.paragraphs,
                            ODYSSEY_STORY.transition1.buttonText,
                            () => this.loadStage(1)
                        );
                    });
                });
            } catch (e) {
                clearTimeout(fallbackTimer);
                this.loadStage(1);
            }
        } else if (stageName === 'sirens') {
            try { sounds.playStageVictory(); } catch (e) {}
            const fallbackTimer = setTimeout(() => {
                safeAdvance(() => {
                    this.showStoryModal(
                        ODYSSEY_STORY.transition2.title,
                        ODYSSEY_STORY.transition2.subtitle,
                        ODYSSEY_STORY.transition2.paragraphs,
                        ODYSSEY_STORY.transition2.buttonText,
                        () => this.loadStage(2)
                    );
                });
            }, 2600);

            try {
                this.visuals.triggerSirensPassThrough(() => {
                    clearTimeout(fallbackTimer);
                    safeAdvance(() => {
                        this.showStoryModal(
                            ODYSSEY_STORY.transition2.title,
                            ODYSSEY_STORY.transition2.subtitle,
                            ODYSSEY_STORY.transition2.paragraphs,
                            ODYSSEY_STORY.transition2.buttonText,
                            () => this.loadStage(2)
                        );
                    });
                });
            } catch (e) {
                clearTimeout(fallbackTimer);
                this.loadStage(2);
            }
        } else if (stageName === 'scylla') {
            try { sounds.playStageVictory(); } catch (e) {}
            const fallbackTimer = setTimeout(() => {
                safeAdvance(() => this.showEpilogue());
            }, 2600);

            try {
                this.visuals.triggerScyllaEscape(() => {
                    clearTimeout(fallbackTimer);
                    safeAdvance(() => this.showEpilogue());
                });
            } catch (e) {
                clearTimeout(fallbackTimer);
                this.showEpilogue();
            }
        }
    }

    showStoryModal(title, subtitle, paragraphs, buttonText, onConfirm) {
        this.storyTitle.textContent = title;
        this.storySubtitle.textContent = subtitle;
        this.storyBody.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        this.storyActionBtn.textContent = buttonText;

        this.storyActionBtn.onclick = () => {
            this.storyOverlay.style.display = 'none';
            if (onConfirm) onConfirm();
        };

        this.storyOverlay.style.display = 'flex';
    }

    showEpilogue() {
        [this.stepCyclops, this.stepSirens, this.stepScylla].forEach(s => s.classList.add('completed'));

        const sorted = multiplayer.getSortedLeaderboard();
        const myRank = sorted.findIndex(p => p.id === multiplayer.playerId) + 1;
        const myScore = multiplayer.players[multiplayer.playerId].score;

        const epilogueParagraphs = [
            `Bạn đã hoàn thành trọn vẹn 3 thử thách tử thần! Thứ hạng chung cuộc của bạn trong phòng: <strong>HẠNG #${myRank}</strong> với <strong>${myScore.toLocaleString()} điểm</strong>.`,
            ...ODYSSEY_STORY.epilogue.paragraphs
        ];

        this.showStoryModal(
            ODYSSEY_STORY.epilogue.title,
            ODYSSEY_STORY.epilogue.subtitle,
            epilogueParagraphs,
            "XEM BẢNG XẾP HẠNG & CHƠI LẠI",
            () => {
                this.toggleLeaderboard();
            }
        );
    }

    toggleLeaderboard() {
        if (!this.leaderboardDrawer) return;
        this.leaderboardDrawer.classList.toggle('open');
        this.renderLeaderboardTable(multiplayer.getSortedLeaderboard());
    }

    renderLeaderboardTable(sortedList) {
        if (!this.leaderboardBody) return;
        this.leaderboardBody.innerHTML = sortedList.map((p, idx) => {
            let rankBadge = `${idx + 1}`;
            let rowClass = "";
            if (idx === 0) { rankBadge = "🥇 1"; rowClass = "rank-gold"; }
            else if (idx === 1) { rankBadge = "🥈 2"; rowClass = "rank-silver"; }
            else if (idx === 2) { rankBadge = "🥉 3"; rowClass = "rank-bronze"; }

            if (p.isSelf) rowClass += " is-self";

            return `
                <div class="leaderboard-row ${rowClass}">
                    <div class="cell-rank">${rankBadge}</div>
                    <div class="cell-name">
                        <span class="cell-avatar">${p.avatar || '⚔️'}</span>
                        <span class="name-text">${p.name} ${p.isSelf ? '(Bạn)' : ''}</span>
                        ${p.streak > 1 ? `<span class="streak-mini">🔥x${p.streak}</span>` : ''}
                    </div>
                    <div class="cell-score">${p.score.toLocaleString()}</div>
                </div>
            `;
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new OdysseyGame();
    game.start();
});
