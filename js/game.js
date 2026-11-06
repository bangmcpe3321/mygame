/**
 * TRÌNH ĐIỀU KHIỂN CHÍNH CỦA GAME ODYSSEY
 * Quản lý vòng lặp trò chơi, trạng thái câu hỏi, tính điểm và chuyển màn
 */

class OdysseyGame {
    constructor() {
        this.visuals = new VisualEngine('visual-theater');
        this.stages = ['cyclops', 'sirens', 'scylla'];
        this.currentStageIndex = 0;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestionsAnswered = 0;
        this.currentStageQuestions = [];
        this.stageQuestionResults = []; // true / false
        this.hasAnswered = false;

        this.initDOMElements();
        this.bindEvents();
    }

    initDOMElements() {
        // Headers & HUD
        this.soundBtn = document.getElementById('sound-toggle-btn');
        this.soundIcon = document.getElementById('sound-icon');
        this.scoreBadge = document.getElementById('score-display');
        
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
        this.nextBtn = document.getElementById('next-btn');

        // Story modal elements
        this.storyOverlay = document.getElementById('story-overlay');
        this.storyTitle = document.getElementById('story-title');
        this.storySubtitle = document.getElementById('story-subtitle');
        this.storyBody = document.getElementById('story-body');
        this.storyActionBtn = document.getElementById('story-action-btn');
    }

    bindEvents() {
        // Bật / tắt âm thanh
        if (this.soundBtn) {
            this.soundBtn.addEventListener('click', () => {
                const isEnabled = sounds.toggle();
                this.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
            });
        }

        // Nút chuyển câu hỏi tiếp theo
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.handleNextQuestion();
            });
        }
    }

    start() {
        // Bắt đầu bằng mở đầu cốt truyện
        this.showStoryModal(
            ODYSSEY_STORY.intro.title,
            ODYSSEY_STORY.intro.subtitle,
            ODYSSEY_STORY.intro.paragraphs,
            ODYSSEY_STORY.intro.buttonText,
            () => {
                sounds.init();
                sounds.startAmbient();
                this.loadStage(0);
            }
        );
    }

    // Hiển thị khung dẫn truyện
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

    // Nạp một màn chơi (thử thách)
    loadStage(stageIndex) {
        this.currentStageIndex = stageIndex;
        this.currentQuestionIndex = 0;
        const stageName = this.stages[stageIndex];
        this.currentStageQuestions = ODYSSEY_QUESTIONS[stageName] || [];
        this.stageQuestionResults = [];

        // Cập nhật thanh tiến trình phía trên
        this.updateProgressStrip();

        // Khởi tạo hoạt cảnh trực quan tương ứng
        if (stageName === 'cyclops') {
            this.visuals.renderCyclopsStage();
        } else if (stageName === 'sirens') {
            this.visuals.renderSirensStage();
        } else if (stageName === 'scylla') {
            this.visuals.renderScyllaStage();
        }

        // Tải câu hỏi đầu tiên của màn
        this.loadQuestion();
    }

    // Cập nhật các vòng tròn tiến trình
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

    // Hiển thị câu hỏi hiện tại
    loadQuestion() {
        this.hasAnswered = false;
        const currentQ = this.currentStageQuestions[this.currentQuestionIndex];
        const totalQ = this.currentStageQuestions.length;

        // Cập nhật số thứ tự câu hỏi
        this.questionCounter.textContent = `CÂU HỎI ${this.currentQuestionIndex + 1} / ${totalQ}`;

        // Cập nhật các chấm trạng thái câu hỏi
        this.renderDots(totalQ);

        // Hiển thị nội dung câu hỏi
        this.questionText.textContent = currentQ.question;

        // Ẩn lời giải thích và nút Next
        this.explanationBox.style.display = 'none';
        this.nextBtn.style.display = 'none';

        // Tạo 4 nút lựa chọn
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

    // Xử lý khi người chơi chọn câu trả lời
    handleAnswer(selectedIndex, correctIndex, explanation) {
        if (this.hasAnswered) return;
        this.hasAnswered = true;

        const isCorrect = selectedIndex === correctIndex;
        this.stageQuestionResults.push(isCorrect);
        this.totalQuestionsAnswered++;

        // Khóa tất cả các nút
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === correctIndex) {
                btn.classList.add('selected-correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('selected-wrong');
            }
        });

        // Cập nhật điểm
        if (isCorrect) {
            this.score += 100;
            this.scoreBadge.textContent = `${this.score} ĐIỂM`;
        }

        // KÍCH HOẠT HIỆU ỨNG THEO TỪNG THỬ THÁCH
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

        // Hiển thị lời giải thích chi tiết
        if (explanation) {
            this.explanationBox.innerHTML = `<strong>💡 Ghi chú sử thi:</strong> ${explanation}`;
            this.explanationBox.style.display = 'block';
        }

        // Kiểm tra xem đã hết câu hỏi của màn này chưa
        const isLastQuestionOfStage = this.currentQuestionIndex >= this.currentStageQuestions.length - 1;
        this.nextBtn.textContent = isLastQuestionOfStage ? "KẾT THÚC THỬ THÁCH ➔" : "CÂU TIẾP THEO ➔";
        this.nextBtn.style.display = 'inline-block';
    }

    // Xử lý khi nhấn nút chuyển câu
    handleNextQuestion() {
        const isLastQuestionOfStage = this.currentQuestionIndex >= this.currentStageQuestions.length - 1;

        if (isLastQuestionOfStage) {
            this.finishCurrentStage();
        } else {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }
    }

    // Hoàn thành màn chơi hiện tại và chuyển sang dẫn truyện màn sau
    finishCurrentStage() {
        const stageName = this.stages[this.currentStageIndex];
        this.nextBtn.style.display = 'none';

        if (stageName === 'cyclops') {
            // Cuối chuỗi câu hỏi: Cyclops bị đâm vào mắt
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
            // Cuối chuỗi câu hỏi: Chiếc thuyền của Odysseus vẫn vượt qua bất kể đúng sai
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
            // Cuối chuỗi câu hỏi: Vượt qua eo biển Scylla và Charybdis
            sounds.playStageVictory();
            this.visuals.triggerScyllaEscape(() => {
                this.showEpilogue();
            });
        }
    }

    // Hiển thị kết thúc mở của trò chơi
    showEpilogue() {
        // Đánh dấu tất cả hoàn thành
        [this.stepCyclops, this.stepSirens, this.stepScylla].forEach(s => s.classList.add('completed'));

        const totalQ = ODYSSEY_QUESTIONS.cyclops.length + ODYSSEY_QUESTIONS.sirens.length + ODYSSEY_QUESTIONS.scylla.length;
        const correctAnswers = this.score / 100;

        const epilogueParagraphs = [
            `Bạn đã hoàn thành cả 3 thử thách tử thần với <strong>${correctAnswers}/${totalQ}</strong> câu trả lời đúng (Đạt <strong>${this.score} điểm</strong>).`,
            ...ODYSSEY_STORY.epilogue.paragraphs
        ];

        this.showStoryModal(
            ODYSSEY_STORY.epilogue.title,
            ODYSSEY_STORY.epilogue.subtitle,
            epilogueParagraphs,
            ODYSSEY_STORY.epilogue.buttonText,
            () => {
                // Khởi động lại trò chơi
                this.score = 0;
                this.scoreBadge.textContent = '0 ĐIỂM';
                this.start();
            }
        );
    }
}

// Khởi tạo game khi tải xong DOM
document.addEventListener('DOMContentLoaded', () => {
    const game = new OdysseyGame();
    game.start();
});

