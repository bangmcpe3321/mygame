/**
 * TRÌNH ĐIỀU KHIỂN CHÍNH CỦA GAME ODYSSEY (PHIÊN BẢN SỬ THI QUIZIZZ & CINEMATIC)
 * - Tự động chuyển cảnh ngay sau khi trả lời (không cần ấn màn hình)
 * - Tính điểm thưởng tốc độ (Speed Bonus) & Combo Streak kiểu Quizizz
 * - Phòng chơi Host / Leaderboard trực tiếp thời gian thực
 * - Mở đầu bằng trường đoạn điện ảnh thành Troy tả thực
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
        this.questionTimeLimit = 15; // 15 giây mỗi câu
        this.timeRemaining = 15;
        this.timerInterval = null;
        this.autoAdvanceTimeout = null;

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
        this.hostCloseBtn = document.getElementById('host-modal-close-btn');
        this.hostStartBtn = document.getElementById('host-start-btn');
        this.hostResetBtn = document.getElementById('host-reset-btn');
        this.hostRoomPinText = document.getElementById('host-room-pin');
        this.hostPlayerList = document.getElementById('host-player-list');
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
            this.leaderboardBtn.addEventListener('click', () => {
                this.toggleLeaderboard();
            });
        }
        if (this.leaderboardCloseBtn) {
            this.leaderboardCloseBtn.addEventListener('click', () => {
                this.leaderboardDrawer.classList.remove('open');
            });
        }

        // Bảng điều khiển Host
        if (this.hostControlBtn) {
            this.hostControlBtn.addEventListener('click', () => {
                this.openHostModal();
            });
        }
        if (this.hostCloseBtn) {
            this.hostCloseBtn.addEventListener('click', () => {
                this.hostModal.style.display = 'none';
            });
        }
        if (this.hostStartBtn) {
            this.hostStartBtn.addEventListener('click', () => {
                multiplayer.startRoomByHost();
                this.hostModal.style.display = 'none';
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
        // Khi Host bấm bắt đầu từ xa hoặc cục bộ
        multiplayer.onRoomStarted = () => {
            sounds.playWarHorn();
            this.startCinematicIntro();
        };

        // Khi bảng xếp hạng cập nhật
        multiplayer.onLeaderboardUpdate = (sortedList) => {
            this.renderLeaderboardTable(sortedList);
        };
    }

    start() {
        // Mặc định tự động đăng ký làm Host cho người dùng hiện tại
        multiplayer.setAsHost(true);
        if (this.hostRoomPinText) {
            this.hostRoomPinText.textContent = multiplayer.roomCode;
        }

        // Hiển thị màn hình chờ phòng chơi (Lobby) để Host có thể ấn Deploy / Bắt đầu
        this.openHostModal();
    }

    openHostModal() {
        if (!this.hostModal) return;
        if (this.hostRoomPinText) this.hostRoomPinText.textContent = multiplayer.roomCode;
        this.renderHostPlayerList();
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

    // 1. Chạy đoạn phim mở đầu tả thực về thành Troy (Troy Cinematic)
    startCinematicIntro() {
        sounds.init();
        sounds.startAmbient();
        const cinematic = new TroyCinematic('cinematic-container', () => {
            this.loadStage(0); // Bắt đầu màn Cyclops sau đoạn phim
        });
        cinematic.start();
    }

    // Nạp một màn chơi (thử thách)
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

    // Nạp câu hỏi và bắt đầu đồng hồ đếm ngược Quizizz
    loadQuestion() {
        this.hasAnswered = false;
        clearInterval(this.timerInterval);
        clearTimeout(this.autoAdvanceTimeout);

        const currentQ = this.currentStageQuestions[this.currentQuestionIndex];
        const totalQ = this.currentStageQuestions.length;

        this.questionCounter.textContent = `CÂU HỎI ${this.currentQuestionIndex + 1} / ${totalQ}`;
        this.renderDots(totalQ);
        this.questionText.textContent = currentQ.question;
        this.explanationBox.style.display = 'none';

        // Tạo danh sách 4 lựa chọn
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

        // Bắt đầu đếm ngược thời gian (15 giây)
        this.startQuestionTimer();
    }

    startQuestionTimer() {
        this.timeRemaining = this.questionTimeLimit;
        this.updateTimerUI(1.0);

        this.timerInterval = setInterval(() => {
            this.timeRemaining -= 0.1;
            const ratio = Math.max(0, this.timeRemaining / this.questionTimeLimit);
            this.updateTimerUI(ratio);

            // Tiếng tíc tắc 4 giây cuối
            if (this.timeRemaining <= 4.0 && this.timeRemaining > 0 && Math.abs(this.timeRemaining % 1) < 0.15) {
                sounds.playTick();
            }

            // Hết giờ -> Tự động tính là sai và chuyển câu
            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.handleAnswer(-1, this.currentStageQuestions[this.currentQuestionIndex].correctIndex, "Hết thời gian trả lời!");
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

    // ==========================================
    // XỬ LÝ TRẢ LỜI & TỰ ĐỘNG CHUYỂN CẢNH
    // ==========================================
    handleAnswer(selectedIndex, correctIndex, explanation) {
        if (this.hasAnswered) return;
        this.hasAnswered = true;
        clearInterval(this.timerInterval);

        const isCorrect = selectedIndex === correctIndex;
        this.stageQuestionResults.push(isCorrect);
        this.totalQuestionsAnswered++;

        // Khóa các nút lựa chọn và tô màu
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === correctIndex) {
                btn.classList.add('selected-correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('selected-wrong');
            }
        });

        // TÍNH ĐIỂM QUIZIZZ SPEED BONUS
        const scoreResult = multiplayer.calculateQuizizzScore(isCorrect, this.timeRemaining, this.questionTimeLimit);
        this.updateScoreDisplay();

        // HIỆN POPUP ĐIỂM THƯỞNG TỐC ĐỘ (SPEED BONUS POPUP)
        if (isCorrect) {
            sounds.playStreakChime(scoreResult.streak);
            this.showScorePopup(`+${scoreResult.totalPoints.toLocaleString()} ĐIỂM`, `⚡ Tốc độ: +${scoreResult.speedBonus} ${scoreResult.streak > 1 ? `| 🔥 Chuỗi x${scoreResult.streak}` : ''}`, 'score-positive');
        } else {
            this.showScorePopup("0 ĐIỂM", selectedIndex === -1 ? "⏱️ Hết thời gian!" : "❌ Trả lời chưa chính xác", 'score-zero');
        }

        // KÍCH HOẠT HIỆU ỨNG THỬ THÁCH
        const stageName = this.stages[this.currentStageIndex];
        if (stageName === 'cyclops') {
            if (isCorrect) {
                sounds.playArrowHit();
                this.visuals.triggerCyclopsCorrect();
            } else {
                sounds.playCyclopsRoar();
                this.visuals.triggerCyclopsWrong();
            }
        } else if (stageName === 'sirens') {
            if (isCorrect) {
                sounds.playSirenFurious();
                this.visuals.triggerSirensCorrect();
            } else {
                sounds.playScreamAndSplash();
                this.visuals.triggerSirensWrong();
            }
        } else if (stageName === 'scylla') {
            if (isCorrect) {
                sounds.playSwordSlash();
                this.visuals.triggerScyllaCorrect();
            } else {
                sounds.playScyllaBite();
                this.visuals.triggerScyllaWrong();
            }
        }

        // TỰ ĐỘNG CHUYỂN CẢNH SAU 1.8 GIÂY (KHÔNG CẦN BẤM MÀN HÌNH)
        this.autoAdvanceTimeout = setTimeout(() => {
            this.handleAutoNext();
        }, 1800);
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
        const myData = multiplayer.players[multiplayer.playerId];
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

    // Hoàn thành một màn thử thách
    finishCurrentStage() {
        const stageName = this.stages[this.currentStageIndex];

        if (stageName === 'cyclops') {
            sounds.playBlindImpact();
            this.visuals.triggerCyclopsFinalBlind(() => {
                sounds.playStageVictory();
                this.showStoryModal(
                    ODYSSEY_STORY.transition1.title,
                    ODYSSEY_STORY.transition1.subtitle,
                    ODYSSEY_STORY.transition1.paragraphs,
                    ODYSSEY_STORY.transition1.buttonText,
                    () => {
                        this.loadStage(1); // Chuyển sang Sirens
                    }
                );
            });
        } else if (stageName === 'sirens') {
            sounds.playStageVictory();
            this.visuals.triggerSirensPassThrough(() => {
                this.showStoryModal(
                    ODYSSEY_STORY.transition2.title,
                    ODYSSEY_STORY.transition2.subtitle,
                    ODYSSEY_STORY.transition2.paragraphs,
                    ODYSSEY_STORY.transition2.buttonText,
                    () => {
                        this.loadStage(2); // Chuyển sang Scylla
                    }
                );
            });
        } else if (stageName === 'scylla') {
            sounds.playStageVictory();
            this.visuals.triggerScyllaEscape(() => {
                this.showEpilogue();
            });
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

    // Kết thúc mở và vinh danh Bảng Xếp Hạng cuối cùng (Podium)
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

    // Toggle Leaderboard Drawer
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

// Khởi chạy game khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const game = new OdysseyGame();
    game.start();
});
