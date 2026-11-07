/**
 * TRÌNH ĐIỀU KHIỂN CHÍNH - AEGIS PROTOCOL: STARFALL
 * Tựa game Turn-Based RPG Quiz (Angry Birds Epic Style)
 * - Robot Unit-07 vượt qua 3 khu vực phi thuyền gặp nạn.
 * - Tiêu diệt quái vật theo lượt: 1 câu đúng diệt 1 quái nhỏ, 2 câu diệt 1 quái lớn, 5 câu diệt Nữ Chúa.
 * - Mở đầu & Kết thúc bằng hoạt cảnh truyện tranh điện ảnh tự động.
 */

class AegisGame {
    constructor() {
        this.visuals = new VisualEngine('visual-theater');
        this.sectors = ['cargo', 'reactor', 'bridge'];
        this.currentSectorIndex = 0;
        this.currentQuestionIndex = 0;
        this.totalQuestionsAnswered = 0;
        this.totalCorrectAnswers = 0;
        this.hasAnswered = false;

        // Điểm số & Chuỗi Streak kiểu Quizizz
        this.score = 0;
        this.streak = 0;
        this.robotMaxShield = 200;
        this.robotShield = 200;

        // Bộ đếm thời gian cho mỗi câu hỏi
        this.questionTimeLimit = 15;
        this.timeRemaining = 15;
        this.timerInterval = null;

        // Danh sách câu hỏi và quái vật cho từng khu vực
        this.currentSectorQuestions = [];
        this.aliensState = [];

        // Khởi tạo hệ thống âm thanh
        if (!window.soundSystem) {
            window.soundSystem = new SoundSystem();
        }

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
        this.stepCargo = document.getElementById('step-cargo') || document.getElementById('step-cyclops');
        this.stepReactor = document.getElementById('step-reactor') || document.getElementById('step-sirens');
        this.stepBridge = document.getElementById('step-bridge') || document.getElementById('step-scylla');

        // Quiz elements
        this.quizPanel = document.getElementById('quiz-panel');
        this.questionCounter = document.getElementById('question-counter');
        this.indicatorDots = document.getElementById('indicator-dots');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.explanationBox = document.getElementById('explanation-box');
        this.scoreFloatPopup = document.getElementById('score-float-popup');

        // Story & Modal elements
        this.storyOverlay = document.getElementById('story-overlay');
        this.storyTitle = document.getElementById('story-title');
        this.storySubtitle = document.getElementById('story-subtitle');
        this.storyBody = document.getElementById('story-body');
        this.storyActionBtn = document.getElementById('story-action-btn');

        // Host & Leaderboard Drawers
        this.hostModal = document.getElementById('host-modal');
        this.hostCloseBtn = document.getElementById('host-close-btn');
        this.hostStartBtn = document.getElementById('host-start-btn');
        this.hostResetBtn = document.getElementById('host-reset-btn');
        this.hostRoomPin = document.getElementById('host-room-pin');
        this.hostPlayerList = document.getElementById('host-player-list');
        this.leaderboardDrawer = document.getElementById('leaderboard-drawer');
        this.leaderboardCloseBtn = document.getElementById('leaderboard-close-btn');
        this.leaderboardBody = document.getElementById('leaderboard-body');
    }

    bindEvents() {
        // Âm thanh
        if (this.soundBtn) {
            this.soundBtn.addEventListener('click', () => {
                const isEnabled = window.soundSystem.toggle();
                if (this.soundIcon) {
                    this.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
                }
            });
        }

        // Leaderboard Drawer toggle
        if (this.leaderboardBtn && this.leaderboardDrawer) {
            this.leaderboardBtn.addEventListener('click', () => {
                this.leaderboardDrawer.classList.toggle('active');
                this.renderLeaderboardDrawer();
            });
        }
        if (this.leaderboardCloseBtn && this.leaderboardDrawer) {
            this.leaderboardCloseBtn.addEventListener('click', () => {
                this.leaderboardDrawer.classList.remove('active');
            });
        }

        // Host Modal toggle
        if (this.hostControlBtn && this.hostModal) {
            this.hostControlBtn.addEventListener('click', () => {
                this.hostModal.style.display = 'flex';
                this.renderHostPlayerList();
            });
        }
        if (this.hostCloseBtn && this.hostModal) {
            this.hostCloseBtn.addEventListener('click', () => {
                this.hostModal.style.display = 'none';
            });
        }

        // Host Start & Reset buttons
        if (this.hostStartBtn) {
            this.hostStartBtn.addEventListener('click', () => {
                if (window.multiplayer) {
                    window.multiplayer.startRoomByHost();
                }
                this.hostModal.style.display = 'none';
            });
        }
        if (this.hostResetBtn) {
            this.hostResetBtn.addEventListener('click', () => {
                if (window.multiplayer) {
                    window.multiplayer.resetRoomByHost();
                }
                this.resetFullGame();
                this.hostModal.style.display = 'none';
            });
        }

        // Đổi tên & Avatar
        if (this.profileBtn) {
            this.profileBtn.addEventListener('click', () => this.openProfileModal());
        }
        if (this.lobbyRenameBtn) {
            this.lobbyRenameBtn.addEventListener('click', () => this.openProfileModal());
        }
        if (this.cancelProfileBtn) {
            this.cancelProfileBtn.addEventListener('click', () => {
                if (this.profileModal) this.profileModal.style.display = 'none';
            });
        }
        if (this.saveProfileBtn) {
            this.saveProfileBtn.addEventListener('click', () => this.saveProfile());
        }

        // Chọn Avatar trong modal
        if (this.avatarGrid) {
            this.avatarGrid.querySelectorAll('.avatar-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.avatarGrid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
        }
    }

    bindMultiplayerEvents() {
        if (!window.multiplayer) return;

        window.multiplayer.onLeaderboardUpdate = (data) => {
            this.renderLeaderboardDrawer();
        };

        window.multiplayer.onPlayerListChange = () => {
            this.renderHostPlayerList();
        };

        window.multiplayer.onRoomStarted = () => {
            if (this.hostModal) this.hostModal.style.display = 'none';
            this.startSector(0);
        };
    }

    /**
     * Bắt đầu trò chơi
     */
    start() {
        // Cập nhật tên người chơi trên header
        if (window.multiplayer) {
            if (this.headerPlayerName) this.headerPlayerName.textContent = window.multiplayer.playerName;
            if (this.headerPlayerAvatar) this.headerPlayerAvatar.textContent = window.multiplayer.playerAvatar;
            if (this.lobbyPlayerDisplay) this.lobbyPlayerDisplay.textContent = `${window.multiplayer.playerAvatar} ${window.multiplayer.playerName}`;
        }

        // Khởi động hoạt cảnh mở đầu kiểu truyện tranh (Intro Comic Cutscene)
        this.playIntroCinematic();
    }

    /**
     * PHÂN CẢNH MỞ ĐẦU KIỂU TRUYỆN TRANH (INTRO CINEMATIC)
     */
    playIntroCinematic() {
        if (typeof AEGIS_STORY !== 'undefined' && AEGIS_STORY.intro && AEGIS_STORY.intro.scenes) {
            const cinematic = new SciFiCinematic('cinematic-container', AEGIS_STORY.intro.scenes, () => {
                // Khi xem xong hoặc ấn Bỏ qua -> Bắt đầu Sector 1
                this.startSector(0);
            });
            cinematic.start();
        } else {
            this.startSector(0);
        }
    }

    /**
     * Khởi tạo quái vật cho từng khu vực theo yêu cầu:
     * - Phòng 1: 4 quái nhỏ (1 HP mỗi con)
     * - Phòng 2: 2 quái nhỏ (1 HP mỗi con) + 2 quái lớn (2 HP mỗi con)
     * - Phòng 3: 1 Nữ chúa lớn nhất (5 HP) + 1 quái nhỏ (1 HP)
     */
    createMonstersForSector(sectorIndex) {
        if (sectorIndex === 0) {
            // Phòng 1: 4 con nhỏ (1 HP mỗi con)
            return [
                { id: 's1_drone1', name: 'Bọ Drone α', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's1_drone2', name: 'Bọ Drone β', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's1_drone3', name: 'Bọ Drone γ', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's1_drone4', name: 'Bọ Drone δ', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' }
            ];
        } else if (sectorIndex === 1) {
            // Phòng 2: 2 con nhỏ (1 HP) + 2 con lớn (2 HP)
            return [
                { id: 's2_drone1', name: 'Bọ Swarmer A', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's2_drone2', name: 'Bọ Swarmer B', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's2_brute1', name: 'Chiến Binh Chitin I', type: 'large', hp: 2, maxHp: 2, image: 'assets/alien_large.jpg' },
                { id: 's2_brute2', name: 'Chiến Binh Chitin II', type: 'large', hp: 2, maxHp: 2, image: 'assets/alien_large.jpg' }
            ];
        } else {
            // Phòng 3: 1 Nữ chúa lớn nhất (5 HP) + 1 con nhỏ (1 HP)
            return [
                { id: 's3_guard', name: 'Hộ Vệ Hoàng Gia', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
                { id: 's3_queen', name: 'NỮ CHÚA XENOMORPH', type: 'queen', hp: 5, maxHp: 5, image: 'assets/alien_queen.jpg' }
            ];
        }
    }

    /**
     * Bắt đầu một Khu vực (Sector)
     */
    startSector(sectorIndex) {
        this.currentSectorIndex = sectorIndex;
        this.currentQuestionIndex = 0;
        this.robotShield = 200;

        // Cập nhật thanh tiến trình phía trên
        this.updateProgressStrip(sectorIndex);

        // Khởi tạo quái vật
        this.aliensState = this.createMonstersForSector(sectorIndex);

        // Lấy bộ câu hỏi của khu vực này
        const sectorKey = `sector${sectorIndex + 1}`;
        if (typeof AEGIS_QUESTIONS !== 'undefined' && AEGIS_QUESTIONS[sectorKey]) {
            this.currentSectorQuestions = [...AEGIS_QUESTIONS[sectorKey]];
        } else {
            this.currentSectorQuestions = [];
        }

        // Vẽ Đấu Trường Turn-based RPG
        this.visuals.renderArena(sectorIndex, this.aliensState, this.robotShield, (selectedTargetIdx) => {
            console.log("Target locked on:", selectedTargetIdx);
        });

        // Bật nhạc nền nhẹ
        if (window.soundSystem) {
            window.soundSystem.startAmbient();
        }

        // Tải câu hỏi đầu tiên
        this.loadQuestion();
    }

    /**
     * Cập nhật thanh tiến trình các Sector
     */
    updateProgressStrip(sectorIndex) {
        const steps = [this.stepCargo, this.stepReactor, this.stepBridge];
        steps.forEach((step, idx) => {
            if (!step) return;
            step.classList.remove('active', 'completed');
            if (idx === sectorIndex) {
                step.classList.add('active');
            } else if (idx < sectorIndex) {
                step.classList.add('completed');
            }
        });
    }

    /**
     * Tải và hiển thị câu hỏi hiện tại
     */
    loadQuestion() {
        this.clearTimer();
        this.hasAnswered = false;

        if (this.explanationBox) {
            this.explanationBox.style.display = 'none';
            this.explanationBox.innerHTML = '';
        }

        // Kiểm tra xem quái vật đã chết hết chưa
        const allDead = this.aliensState.every(a => a.hp <= 0);
        if (allDead) {
            this.handleSectorCleared();
            return;
        }

        // Nếu hết câu hỏi trong danh sách, quay vòng lại
        if (this.currentQuestionIndex >= this.currentSectorQuestions.length) {
            this.currentQuestionIndex = 0;
        }

        const q = this.currentSectorQuestions[this.currentQuestionIndex];
        if (!q) {
            console.error("No question found for index:", this.currentQuestionIndex);
            return;
        }

        // Đếm số câu và vẽ dots
        const totalQ = this.currentSectorQuestions.length;
        if (this.questionCounter) {
            this.questionCounter.textContent = `LƯỢT BẮN ${this.currentQuestionIndex + 1} / ${totalQ}`;
        }
        this.renderIndicatorDots(this.currentQuestionIndex, totalQ);

        // Hiển thị nội dung câu hỏi
        if (this.questionText) {
            this.questionText.textContent = q.question;
        }

        // Hiển thị 4 phương án trả lời
        if (this.optionsContainer) {
            this.optionsContainer.innerHTML = '';
            const labels = ['A', 'B', 'C', 'D'];
            
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.innerHTML = `
                    <span class="option-key">${labels[idx]}</span>
                    <span class="option-text">${opt}</span>
                `;
                btn.addEventListener('click', () => {
                    if (!this.hasAnswered) {
                        this.handleAnswer(idx);
                    }
                });
                this.optionsContainer.appendChild(btn);
            });
        }

        // Bắt đầu đếm ngược thời gian
        this.startTimer();
    }

    /**
     * Đếm ngược thời gian làm bài (Quizizz Timer)
     */
    startTimer() {
        this.timeRemaining = this.questionTimeLimit;
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeRemaining -= 0.1;
            if (this.timeRemaining <= 0) {
                this.timeRemaining = 0;
                this.updateTimerDisplay();
                this.clearTimer();
                this.handleTimeout();
            } else {
                this.updateTimerDisplay();
            }
        }, 100);
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        if (!this.timerBar || !this.timerText) return;
        const percent = (this.timeRemaining / this.questionTimeLimit) * 100;
        this.timerBar.style.width = `${percent}%`;
        this.timerText.textContent = `${Math.ceil(this.timeRemaining)}s`;

        this.timerBar.className = 'quiz-timer-fill';
        if (percent > 50) {
            this.timerBar.classList.add('timer-normal');
        } else if (percent > 20) {
            this.timerBar.classList.add('timer-warning');
        } else {
            this.timerBar.classList.add('timer-danger');
        }
    }

    /**
     * XỬ LÝ KHI NGƯỜI CHƠI CHỌN ĐÁP ÁN
     */
    handleAnswer(selectedIndex) {
        if (this.hasAnswered) return;
        this.hasAnswered = true;
        this.clearTimer();

        this.totalQuestionsAnswered++;
        const q = this.currentSectorQuestions[this.currentQuestionIndex];
        const correctAns = (q && q.correctIndex !== undefined) ? q.correctIndex : (q ? q.correct : 0);
        const isCorrect = (selectedIndex === correctAns);

        // Khóa các nút trả lời và đổi màu đáp án
        const buttons = this.optionsContainer.querySelectorAll('.quiz-option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === correctAns) {
                btn.classList.add('option-correct');
            } else if (idx === selectedIndex) {
                btn.classList.add('option-incorrect');
            }
        });

        // Hiện phần giải thích ngắn
        if (q.explanation && this.explanationBox) {
            this.explanationBox.innerHTML = `<strong>💡 PHÂN TÍCH DỮ LIỆU:</strong> ${q.explanation}`;
            this.explanationBox.style.display = 'block';
        }

        if (isCorrect) {
            // === TRẢ LỜI ĐÚNG: ROBOT BẮN TIÊU DIỆT / SÁT THƯƠNG QUÁI VẬT ===
            this.totalCorrectAnswers++;
            this.streak++;

            // Tính điểm Quizizz
            const speedBonus = Math.round(this.timeRemaining * 40);
            const streakBonus = (this.streak - 1) * 100;
            const roundScore = 1000 + speedBonus + streakBonus;
            this.score += roundScore;

            this.updateHUD();
            this.showScorePopup(roundScore, speedBonus, this.streak);

            try {
                if (window.soundSystem) {
                    window.soundSystem.playStreakChime();
                }
            } catch (e) {}

            try {
                if (window.multiplayer && typeof window.multiplayer.recordAnswer === 'function') {
                    window.multiplayer.recordAnswer(true, this.questionTimeLimit - this.timeRemaining, roundScore);
                }
            } catch (e) {}

            // Tìm mục tiêu đang chọn hoặc mục tiêu còn sống đầu tiên
            let targetIdx = this.visuals.currentTargetIndex;
            if (!this.aliensState[targetIdx] || this.aliensState[targetIdx].hp <= 0) {
                targetIdx = this.aliensState.findIndex(a => a.hp > 0);
            }

            if (targetIdx !== -1) {
                const target = this.aliensState[targetIdx];
                const newHp = Math.max(0, target.hp - 1);
                target.hp = newHp;
                const isDead = (newHp <= 0);

                // Kích hoạt hoạt ảnh bắn đạn Plasma của Robot
                this.visuals.playRobotAttack(targetIdx, newHp, isDead, () => {
                    // Kiểm tra xem đã dọn sạch phòng chưa
                    const allDead = this.aliensState.every(a => a.hp <= 0);
                    if (allDead) {
                        setTimeout(() => this.handleSectorCleared(), 600);
                    } else {
                        // Chuyển sang câu hỏi tiếp theo sau 1 giây
                        setTimeout(() => {
                            this.currentQuestionIndex++;
                            this.loadQuestion();
                        }, 1000);
                    }
                });
            } else {
                this.handleSectorCleared();
            }
        } else {
            // === TRẢ LỜI SAI: QUÁI VẬT PHẢN KÍCH BẬC NẢY CẮN XÉ ROBOT ===
            this.streak = 0;
            this.updateHUD();

            try {
                if (window.soundSystem && typeof window.soundSystem.playWrongBuzzer === 'function') {
                    window.soundSystem.playWrongBuzzer();
                }
            } catch (e) {}

            try {
                if (window.multiplayer && typeof window.multiplayer.recordAnswer === 'function') {
                    window.multiplayer.recordAnswer(false, this.questionTimeLimit - this.timeRemaining, 0);
                }
            } catch (e) {}

            // Quái vật còn sống đầu tiên phản kích
            let attackerIdx = this.aliensState.findIndex(a => a.hp > 0);
            if (attackerIdx === -1) attackerIdx = 0;
            this.robotShield = Math.max(0, this.robotShield - 15);

            this.visuals.playAlienRetaliation(attackerIdx, this.robotShield, 15, () => {
                if (this.robotShield <= 0) {
                    // Khiên Robot cạn kiệt: Khởi động lại Sector
                    setTimeout(() => this.handleShieldDepleted(), 600);
                } else {
                    // Chuyển sang câu hỏi tiếp theo sau 1 giây
                    setTimeout(() => {
                        this.currentQuestionIndex++;
                        this.loadQuestion();
                    }, 1000);
                }
            });
        }
    }

    /**
     * Hết giờ -> coi như trả lời sai
     */
    handleTimeout() {
        if (this.hasAnswered) return;
        this.handleAnswer(-1);
    }

    /**
     * DỌN SẠCH MỘT KHU VỰC (SECTOR CLEARED)
     */
    handleSectorCleared() {
        this.clearTimer();

        if (this.currentSectorIndex === 0) {
            // Hoàn thành Phòng 1 -> Hiển thị Modal chuyển màn 1
            this.showTransitionModal(AEGIS_STORY.transition1, () => {
                this.startSector(1);
            });
        } else if (this.currentSectorIndex === 1) {
            // Hoàn thành Phòng 2 -> Hiển thị Modal chuyển màn 2
            this.showTransitionModal(AEGIS_STORY.transition2, () => {
                this.startSector(2);
            });
        } else {
            // Hoàn thành Phòng 3: TIÊU DIỆT NỮ CHÚA XENOMORPH! CHIẾN THẮNG!
            this.playVictoryOutro();
        }
    }

    /**
     * HIỂN THỊ MODAL CHUYỂN MÀN
     */
    showTransitionModal(data, onProceed) {
        if (!this.storyOverlay) {
            onProceed();
            return;
        }

        if (this.storyTitle) this.storyTitle.textContent = data.title;
        if (this.storySubtitle) this.storySubtitle.textContent = data.subtitle;
        if (this.storyBody) {
            this.storyBody.innerHTML = (data.paragraphs || []).map(p => `<p class="story-p">${p}</p>`).join('');
        }
        if (this.storyActionBtn) {
            this.storyActionBtn.textContent = data.buttonText || 'TIẾP TỤC ➔';
            this.storyActionBtn.onclick = () => {
                this.storyOverlay.style.display = 'none';
                onProceed();
            };
        }

        this.storyOverlay.style.display = 'flex';
    }

    /**
     * HOẠT CẢNH ĐIỆN ẢNH CHIẾN THẮNG (VICTORY OUTRO CINEMATIC)
     * Nữ chúa gục ngã -> Unit-07 kích hoạt cột hải đăng cứu hộ S.O.S xuyên thấu bầu trời
     */
    playVictoryOutro() {
        if (window.soundSystem) {
            window.soundSystem.playBeaconActivated();
        }

        if (typeof AEGIS_STORY !== 'undefined' && AEGIS_STORY.epilogue && AEGIS_STORY.epilogue.scenes) {
            const cinematic = new SciFiCinematic('cinematic-container', AEGIS_STORY.epilogue.scenes, () => {
                this.showVictorySummaryCard();
            });
            cinematic.start();
        } else {
            this.showVictorySummaryCard();
        }
    }

    /**
     * BẢNG KẾT QUẢ TỔNG KẾT CHIẾN DỊCH
     */
    showVictorySummaryCard() {
        const accuracy = this.totalQuestionsAnswered > 0
            ? Math.round((this.totalCorrectAnswers / this.totalQuestionsAnswered) * 100)
            : 100;

        let rank = 'S';
        if (accuracy < 70) rank = 'B';
        else if (accuracy < 85) rank = 'A';

        const summaryHtml = `
            <div class="victory-card-container">
                <div class="victory-holo-badge">MISSION ACCOMPLISHED</div>
                <h1 class="victory-main-title">TÍN HIỆU CỨU HỘ ĐÃ PHÁT ĐI THÀNH CÔNG!</h1>
                <p class="victory-desc">Unit-07 đã kích hoạt cột hải đăng cứu hộ khẩn cấp S.O.S từ Cầu tàu. Hạm đội cứu hộ Liên minh Vũ trụ đang trên đường tiếp cận!</p>

                <div class="victory-stats-grid">
                    <div class="stat-box">
                        <span class="stat-num">${this.score.toLocaleString()}</span>
                        <span class="stat-label">TỔNG ĐIỂM CHIẾN ĐẤU</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-num">${accuracy}%</span>
                        <span class="stat-label">ĐỘ CHÍNH XÁC NẠP ĐẠN</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-num rank-num">HẠNG ${rank}</span>
                        <span class="stat-label">XẾP HẠNG SINH TỒN</span>
                    </div>
                </div>

                <div class="victory-actions">
                    <button class="btn-victory-restart" id="btn-replay-campaign">🔄 CHƠI LẠI TỪ ĐẦU</button>
                    <button class="btn-victory-leaderboard" id="btn-view-final-rank">🏆 XEM BẢNG XẾP HẠNG</button>
                </div>
            </div>
        `;

        if (this.storyOverlay) {
            if (this.storyTitle) this.storyTitle.textContent = "SỨ MỆNH HOÀN THÀNH";
            if (this.storySubtitle) this.storySubtitle.textContent = "AEGIS PROTOCOL: KÍCH HOẠT HẢI ĐĂNG CỨU HỘ";
            if (this.storyBody) this.storyBody.innerHTML = summaryHtml;
            if (this.storyActionBtn) this.storyActionBtn.style.display = 'none';

            this.storyOverlay.style.display = 'flex';

            const replayBtn = document.getElementById('btn-replay-campaign');
            if (replayBtn) {
                replayBtn.onclick = () => {
                    this.storyOverlay.style.display = 'none';
                    this.resetFullGame();
                };
            }
            const rankBtn = document.getElementById('btn-view-final-rank');
            if (rankBtn) {
                rankBtn.onclick = () => {
                    if (this.leaderboardDrawer) {
                        this.leaderboardDrawer.classList.add('active');
                        this.renderLeaderboardDrawer();
                    }
                };
            }
        }
    }

    /**
     * KHI KHIÊN ROBOT HẾT MÁU
     */
    handleShieldDepleted() {
        this.clearTimer();

        if (this.storyOverlay) {
            if (this.storyTitle) this.storyTitle.textContent = "KHIÊN NĂNG LƯỢNG SỤP ĐỔ";
            if (this.storySubtitle) this.storySubtitle.textContent = "Hệ thống bảo an Unit-07 chuyển sang chế độ khẩn cấp";
            if (this.storyBody) {
                this.storyBody.innerHTML = `
                    <p class="story-p" style="color: #ff5555;">Dị vật ngoài hành tinh đã xuyên thủng lá chắn của Robot Unit-07!</p>
                    <p class="story-p">Hệ thống pin dự phòng tự động tái nạp khiên về 200 HP. Hãy nhanh chóng ngắm bắn chính xác để tiêu diệt các cá thể dị vật còn lại!</p>
                `;
            }
            if (this.storyActionBtn) {
                this.storyActionBtn.style.display = 'inline-block';
                this.storyActionBtn.textContent = '🔄 TÁI KHỞI ĐỘNG KHU VỰC NÀY';
                this.storyActionBtn.onclick = () => {
                    this.storyOverlay.style.display = 'none';
                    this.startSector(this.currentSectorIndex);
                };
            }
            this.storyOverlay.style.display = 'flex';
        }
    }

    /**
     * RESET LẠI TOÀN BỘ GAME
     */
    resetFullGame() {
        this.score = 0;
        this.streak = 0;
        this.totalQuestionsAnswered = 0;
        this.totalCorrectAnswers = 0;
        this.updateHUD();
        this.startSector(0);
    }

    /**
     * Cập nhật điểm và chuỗi Streak trên thanh HUD
     */
    updateHUD() {
        if (this.scoreBadge) {
            this.scoreBadge.textContent = `${this.score.toLocaleString()} ĐIỂM`;
        }
        if (this.streakBadge) {
            if (this.streak >= 2) {
                this.streakBadge.style.display = 'inline-block';
                this.streakBadge.textContent = `🔥 Chuỗi x${this.streak}`;
            } else {
                this.streakBadge.style.display = 'none';
            }
        }
    }

    /**
     * Hiện popup điểm nhảy số kiểu Quizizz
     */
    showScorePopup(score, speedBonus, streak) {
        if (!this.scoreFloatPopup) return;
        const title = this.scoreFloatPopup.querySelector('.popup-title');
        const sub = this.scoreFloatPopup.querySelector('.popup-sub');
        if (title) title.textContent = `+${score.toLocaleString()} ĐIỂM`;
        if (sub) sub.textContent = `⚡ Tốc độ: +${speedBonus} | 🔥 Chuỗi x${streak}`;

        this.scoreFloatPopup.classList.remove('show-popup');
        void this.scoreFloatPopup.offsetWidth; // trigger reflow
        this.scoreFloatPopup.classList.add('show-popup');
    }

    renderIndicatorDots(current, total) {
        if (!this.indicatorDots) return;
        this.indicatorDots.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            dot.className = `indicator-dot ${i === current ? 'active' : (i < current ? 'passed' : '')}`;
            this.indicatorDots.appendChild(dot);
        }
    }

    // ========================================================
    // QUẢN LÝ PROFILE, HOST & LEADERBOARD
    // ========================================================

    openProfileModal() {
        if (!this.profileModal) return;
        if (this.customNameInput && window.multiplayer) {
            this.customNameInput.value = window.multiplayer.playerName;
        }
        if (this.avatarGrid && window.multiplayer) {
            const curAvatar = window.multiplayer.playerAvatar;
            this.avatarGrid.querySelectorAll('.avatar-btn').forEach(btn => {
                if (btn.getAttribute('data-avatar') === curAvatar) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        this.profileModal.style.display = 'flex';
    }

    saveProfile() {
        if (!window.multiplayer) return;
        const newName = (this.customNameInput.value || '').trim() || "Unit-07";
        let newAvatar = "🤖";
        const activeBtn = this.avatarGrid ? this.avatarGrid.querySelector('.avatar-btn.active') : null;
        if (activeBtn) {
            newAvatar = activeBtn.getAttribute('data-avatar');
        }

        window.multiplayer.updatePlayerProfile(newName, newAvatar);

        if (this.headerPlayerName) this.headerPlayerName.textContent = newName;
        if (this.headerPlayerAvatar) this.headerPlayerAvatar.textContent = newAvatar;
        if (this.lobbyPlayerDisplay) this.lobbyPlayerDisplay.textContent = `${newAvatar} ${newName}`;
        if (this.profileModal) this.profileModal.style.display = 'none';

        this.renderHostPlayerList();
        this.renderLeaderboardDrawer();
    }

    renderHostPlayerList() {
        if (!this.hostPlayerList || !window.multiplayer) return;
        const players = window.multiplayer.getPlayerList();
        this.hostPlayerList.innerHTML = players.map(p => `
            <div class="host-player-pill ${p.isSelf ? 'is-self' : ''}">
                <span class="player-avatar">${p.avatar}</span>
                <span class="player-name">${p.name} ${p.isSelf ? '(Bạn)' : ''}</span>
            </div>
        `).join('');
    }

    renderLeaderboardDrawer() {
        if (!this.leaderboardBody || !window.multiplayer) return;
        const ranked = window.multiplayer.getRankedPlayers();
        const medals = ['🥇', '🥈', '🥉'];

        this.leaderboardBody.innerHTML = ranked.map((p, idx) => `
            <div class="leaderboard-item ${p.isSelf ? 'item-self' : ''}">
                <div class="item-rank">${idx < 3 ? medals[idx] : `#${idx + 1}`}</div>
                <div class="item-avatar">${p.avatar}</div>
                <div class="item-info">
                    <div class="item-name">${p.name} ${p.isSelf ? '<span class="tag-you">(BẠN)</span>' : ''}</div>
                    <div class="item-streak">${p.streak >= 2 ? `🔥 Chuỗi x${p.streak}` : 'Đang thi đấu'}</div>
                </div>
                <div class="item-score">${p.score.toLocaleString()}</div>
            </div>
        `).join('');
    }
}

// Khởi chạy khi tài liệu tải xong
document.addEventListener('DOMContentLoaded', () => {
    window.game = new AegisGame();
    window.game.start();
});
