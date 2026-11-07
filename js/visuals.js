/**
 * HỆ THỐNG ĐỒ HỌA CHIẾN ĐẤU THEO LƯỢT (TURN-BASED ARENA ENGINE - ANGRY BIRDS EPIC STYLE)
 * - Sử dụng hoàn toàn đồ họa tranh AI chất lượng cao (Robot cầm súng, quái vật ngoài hành tinh, bối cảnh tàu không gian).
 * - Hoàn toàn KHÔNG dùng đồ thị SVG cơ bản.
 * - Hiệu ứng chiến đấu theo lượt: Tia Plasma Blaster phóng vút, đòn cắn xé phản kích, nổ acid tan biến.
 */

class VisualEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentSector = 0;
        this.aliens = [];
        this.currentTargetIndex = 0;
        this.onTargetSelect = null;
        this.isAnimating = false;
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Khởi tạo đấu trường theo từng Khu vực (Sector)
     * @param {number} sectorIndex 0: Cargo Bay, 1: Reactor Core, 2: Command Bridge
     * @param {Array} aliensState Mảng trạng thái của quái vật
     * @param {number} robotShield Điểm giáp/khiên của Robot
     * @param {Function} onTargetSelect Callback khi người chơi chọn mục tiêu
     */
    renderArena(sectorIndex, aliensState, robotShield = 100, onTargetSelect = null) {
        this.currentSector = sectorIndex;
        this.aliens = aliensState || [];
        this.onTargetSelect = onTargetSelect;
        this.clear();

        const sectorConfigs = [
            {
                id: 'cargo',
                name: 'KHU VỰC 1: KHO HÀNG (CARGO BAY)',
                sub: 'Cảnh báo: 4 Dị vật nhỏ (Swarm Drones) đang xâm nhập!',
                bg: 'assets/bg_cargobay.jpg'
            },
            {
                id: 'reactor',
                name: 'KHU VỰC 2: LÒ PHẢN ỨNG (REACTOR CORE)',
                sub: 'Nguy cấp: 2 Dị vật nhỏ & 2 Dị vật bọc giáp (Xeno Brutes)!',
                bg: 'assets/bg_reactor.jpg'
            },
            {
                id: 'bridge',
                name: 'KHU VỰC 3: CẦU TÀU TRUNG TÂM (COMMAND BRIDGE)',
                sub: 'Báo động Tối Cao: NỮ CHÚA XENOMORPH (HIVE QUEEN) ĐÃ XUẤT HIỆN!',
                bg: 'assets/bg_bridge.jpg'
            }
        ];

        const config = sectorConfigs[sectorIndex] || sectorConfigs[0];

        // Tìm mục tiêu mặc định còn sống đầu tiên
        this.autoSelectFirstAliveTarget();

        const arenaHtml = `
            <div class="scifi-arena" id="scifi-arena" style="background-image: linear-gradient(rgba(5, 10, 24, 0.45), rgba(5, 10, 24, 0.75)), url('${config.bg}');">
                <!-- Header thông tin chiến trường -->
                <div class="arena-header-banner">
                    <div class="sector-code-badge">SECTOR 0${sectorIndex + 1} // ALERT</div>
                    <div class="sector-titles-wrap">
                        <h2 class="sector-title">${config.name}</h2>
                        <span class="sector-subtitle">${config.sub}</span>
                    </div>
                    <div class="combat-mode-badge">TURN-BASED RPG COMBAT</div>
                </div>

                <!-- Đấu trường chính: Bên trái Robot - Bên phải Đội quân Dị vật -->
                <div class="arena-battlefield">
                    <!-- 1. BÊN TRÁI: ROBOT CHIẾN ĐẤU UNIT-07 (PLAYER HERO) -->
                    <div class="hero-combatant-zone" id="robot-hero-zone">
                        <div class="combatant-card hero-card" id="robot-card">
                            <div class="hero-target-aura"></div>
                            <div class="hero-sprite-wrapper">
                                <img src="assets/robot_hero.jpg" alt="Unit-07 Combat Robot" class="combatant-img hero-img" id="robot-sprite-img" />
                                <div class="muzzle-flash-anchor" id="robot-muzzle"></div>
                                <div class="shield-energy-bubble" id="robot-shield-bubble"></div>
                            </div>
                            
                            <!-- Bảng chỉ số Robot -->
                            <div class="hero-stats-panel">
                                <div class="hero-name-tag">
                                    <span class="bot-status-icon">🤖</span>
                                    <span class="bot-callsign">UNIT-07 [AEGIS]</span>
                                </div>
                                <div class="shield-bar-container">
                                    <div class="shield-label-row">
                                        <span>KHIÊN NĂNG LƯỢNG (SHIELD)</span>
                                        <span id="robot-shield-text">${robotShield}/100</span>
                                    </div>
                                    <div class="shield-track">
                                        <div class="shield-fill" id="robot-shield-bar" style="width: ${Math.max(0, robotShield)}%;"></div>
                                    </div>
                                </div>
                                <div class="hero-weapon-tag">
                                    <span>🔫 SÚNG PLASMA BLUSTER: SẴN SÀNG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VÙNG CHIẾN ĐẤU GIỮA: HIỆU ỨNG TIA LASER & ĐẠN ĐẠO -->
                    <div class="combat-crossfire-zone" id="crossfire-zone">
                        <!-- Đạn laser plasma được sinh động bằng code -->
                    </div>

                    <!-- 2. BÊN PHẢI: ĐỘI QUÂN DỊ VẬT NGOÀI HÀNH TINH (ALIEN SQUAD) -->
                    <div class="aliens-combatant-zone" id="aliens-squad-zone">
                        <div class="aliens-formation-grid ${sectorIndex === 2 ? 'boss-formation' : ''}" id="aliens-grid">
                            ${this.generateAliensHTML()}
                        </div>
                    </div>
                </div>

                <!-- Bảng nhắc chiến thuật -->
                <div class="arena-footer-tip" id="arena-tip">
                    <span>💡 Gợi ý: Trả lời đúng để nạp đạn súng Plasma và bắn tiêu diệt mục tiêu! Bấm vào quái vật để chọn mục tiêu.</span>
                </div>
            </div>
        `;

        this.container.innerHTML = arenaHtml;
        this.bindAlienClickEvents();
    }

    /**
     * Sinh mã HTML cho danh sách quái vật trong phòng
     */
    generateAliensHTML() {
        return this.aliens.map((alien, index) => {
            const isDead = alien.hp <= 0;
            const isTargeted = index === this.currentTargetIndex && !isDead;
            const isQueen = alien.type === 'queen';
            const isLarge = alien.type === 'large';
            
            let cardClass = `alien-card alien-${alien.type}`;
            if (isDead) cardClass += ' is-destroyed';
            if (isTargeted) cardClass += ' is-target-locked';

            // Tạo các chấm / thanh máu theo Angry Birds Epic
            let hpIndicatorsHtml = '';
            if (isQueen) {
                // Nữ chúa có 5 ô máu
                const hpPercent = (alien.hp / alien.maxHp) * 100;
                hpIndicatorsHtml = `
                    <div class="queen-boss-hp-box">
                        <div class="boss-hp-header">
                            <span class="boss-crown">👑 NỮ CHÚA XENOMORPH</span>
                            <span class="boss-hp-val">${alien.hp} / ${alien.maxHp} HP</span>
                        </div>
                        <div class="queen-hp-track">
                            <div class="queen-hp-fill" id="alien-hp-bar-${index}" style="width: ${hpPercent}%;"></div>
                        </div>
                        <div class="queen-hp-pips">
                            ${Array.from({ length: alien.maxHp }).map((_, i) => `
                                <span class="hp-pip ${i < alien.hp ? 'pip-full' : 'pip-empty'}"></span>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else if (isLarge) {
                // Quái lớn có 2 ô máu
                hpIndicatorsHtml = `
                    <div class="alien-hp-row">
                        <div class="hp-pips-group">
                            ${Array.from({ length: alien.maxHp }).map((_, i) => `
                                <span class="hp-heart ${i < alien.hp ? 'heart-full' : 'heart-empty'}">🩸</span>
                            `).join('')}
                        </div>
                        <span class="hp-number">${alien.hp}/2 HP</span>
                    </div>
                `;
            } else {
                // Quái nhỏ có 1 ô máu
                hpIndicatorsHtml = `
                    <div class="alien-hp-row">
                        <div class="hp-pips-group">
                            <span class="hp-heart ${alien.hp > 0 ? 'heart-full' : 'heart-empty'}">🩸</span>
                        </div>
                        <span class="hp-number">${alien.hp}/1 HP</span>
                    </div>
                `;
            }

            return `
                <div class="${cardClass}" id="alien-card-${index}" data-alien-index="${index}" title="Bấm để chọn mục tiêu này">
                    <!-- Tâm ngắm khóa mục tiêu -->
                    <div class="target-crosshair-lock">
                        <span class="crosshair-bracket top-left"></span>
                        <span class="crosshair-bracket top-right"></span>
                        <span class="crosshair-bracket bottom-left"></span>
                        <span class="crosshair-bracket bottom-right"></span>
                        <span class="target-locked-text">TARGET LOCKED</span>
                    </div>

                    <!-- Khung ảnh tranh AI sinh vật -->
                    <div class="alien-portrait-wrapper">
                        <img src="${alien.image}" alt="${alien.name}" class="combatant-img alien-img" id="alien-img-${index}" />
                        <div class="alien-hit-overlay" id="alien-hit-overlay-${index}"></div>
                        <div class="alien-acid-splash" id="alien-acid-${index}"></div>
                        ${isDead ? '<div class="destroyed-stamp">ĐÃ TIÊU DIỆT</div>' : ''}
                    </div>

                    <!-- Tên & Thanh máu -->
                    <div class="alien-info-panel">
                        <div class="alien-name-tag">${alien.name}</div>
                        ${hpIndicatorsHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Bắt sự kiện khi người chơi click vào một con quái vật để chọn mục tiêu
     */
    bindAlienClickEvents() {
        const cards = this.container.querySelectorAll('.alien-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (this.isAnimating) return;
                const idx = parseInt(card.getAttribute('data-alien-index'), 10);
                if (this.aliens[idx] && this.aliens[idx].hp > 0) {
                    this.selectTarget(idx);
                }
            });
        });
    }

    /**
     * Tự động chọn mục tiêu còn sống đầu tiên
     */
    autoSelectFirstAliveTarget() {
        const firstAlive = this.aliens.findIndex(a => a.hp > 0);
        if (firstAlive !== -1) {
            this.currentTargetIndex = firstAlive;
        }
    }

    /**
     * Chọn mục tiêu bắn
     */
    selectTarget(targetIndex) {
        if (!this.aliens[targetIndex] || this.aliens[targetIndex].hp <= 0) {
            this.autoSelectFirstAliveTarget();
            targetIndex = this.currentTargetIndex;
        }

        this.currentTargetIndex = targetIndex;

        // Cập nhật class hiển thị tâm ngắm
        const cards = this.container.querySelectorAll('.alien-card');
        cards.forEach((card, idx) => {
            if (idx === targetIndex && this.aliens[idx].hp > 0) {
                card.classList.add('is-target-locked');
            } else {
                card.classList.remove('is-target-locked');
            }
        });

        if (this.onTargetSelect) {
            this.onTargetSelect(targetIndex);
        }
    }

    /**
     * Lấy vị trí tâm của một phần tử DOM để tính toán quỹ đạo bắn đạn
     */
    getElementCenter(elem) {
        if (!elem) return { x: 0, y: 0 };
        const rect = elem.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    /**
     * HOẠT ẢNH TẤN CÔNG CỦA ROBOT KHI NGƯỜI CHƠI TRẢ LỜI ĐÚNG
     * Robot giật súng, tia đạn Plasma bay xé gió qua màn hình, va chạm bùng nổ vào quái vật
     */
    playRobotAttack(targetIndex, newHp, isDead, callback) {
        this.isAnimating = true;

        const robotCard = document.getElementById('robot-card');
        const robotImg = document.getElementById('robot-sprite-img');
        const muzzle = document.getElementById('robot-muzzle');
        const targetCard = document.getElementById(`alien-card-${targetIndex}`);
        const targetImg = document.getElementById(`alien-img-${targetIndex}`);
        const crossfireZone = document.getElementById('crossfire-zone');

        if (!targetCard) {
            this.isAnimating = false;
            if (callback) callback();
            return;
        }

        // 1. Robot giật súng lùi lại & chớp sáng nòng súng
        if (robotCard) robotCard.classList.add('robot-fire-recoil');
        if (muzzle) muzzle.classList.add('muzzle-active');

        // Âm thanh bắn súng
        if (window.soundSystem) {
            window.soundSystem.playLaserShot();
        }

        // 2. Tính toán góc và khoảng cách từ nòng súng đến quái vật
        const startPos = this.getElementCenter(muzzle || robotImg);
        const endPos = this.getElementCenter(targetImg || targetCard);

        const deltaX = endPos.x - startPos.x;
        const deltaY = endPos.y - startPos.y;
        const distance = Math.hypot(deltaX, deltaY);
        const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // Tạo đạn Plasma bay qua màn hình
        const bolt = document.createElement('div');
        bolt.className = 'plasma-projectile-bolt';
        bolt.style.left = `${startPos.x}px`;
        bolt.style.top = `${startPos.y}px`;
        bolt.style.transform = `rotate(${angleDeg}deg)`;
        document.body.appendChild(bolt);

        // Đạn bay trong 250ms
        bolt.animate([
            { transform: `translate(0, 0) rotate(${angleDeg}deg)`, opacity: 1 },
            { transform: `translate(${deltaX}px, ${deltaY}px) rotate(${angleDeg}deg)`, opacity: 1 }
        ], {
            duration: 260,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
        });

        setTimeout(() => {
            // Đạn trúng mục tiêu! Xóa đạn
            if (bolt.parentNode) bolt.parentNode.removeChild(bolt);
            if (muzzle) muzzle.classList.remove('muzzle-active');
            if (robotCard) robotCard.classList.remove('robot-fire-recoil');

            // 3. Hiệu ứng nổ va chạm tại quái vật
            this.createImpactBlast(endPos.x, endPos.y);

            // Âm thanh trúng đòn
            if (window.soundSystem) {
                if (this.aliens[targetIndex] && this.aliens[targetIndex].type === 'queen') {
                    window.soundSystem.playQueenRoar();
                } else {
                    window.soundSystem.playAlienHit();
                }
            }

            // Quái vật giật mình nảy lên và chớp đỏ
            if (targetCard) {
                targetCard.classList.add('alien-hit-recoil');
                setTimeout(() => targetCard.classList.remove('alien-hit-recoil'), 400);
            }

            // Hiện số sát thương nhảy lên (-1 HP)
            this.showFloatingCombatText(endPos.x, endPos.y - 30, '-1 HP!', 'damage-text');

            // Cập nhật lại HP trong dữ liệu nội bộ
            if (this.aliens[targetIndex]) {
                this.aliens[targetIndex].hp = newHp;
            }
            this.updateAlienHpDisplay(targetIndex, newHp, isDead);

            // 4. Nếu quái vật chết (isDead = true)
            if (isDead) {
                setTimeout(() => {
                    if (window.soundSystem) {
                        window.soundSystem.playAlienDeath();
                    }
                    if (targetCard) {
                        targetCard.classList.remove('is-target-locked');
                        targetCard.classList.add('is-destroyed');
                    }
                    this.createAcidDeathBurst(endPos.x, endPos.y);

                    // Tự động chuyển mục tiêu sang con tiếp theo
                    this.autoSelectFirstAliveTarget();
                    this.selectTarget(this.currentTargetIndex);

                    this.isAnimating = false;
                    if (callback) callback();
                }, 350);
            } else {
                this.isAnimating = false;
                if (callback) callback();
            }
        }, 260);
    }

    /**
     * HOẠT ẢNH DỊ VẬT NGOÀI HÀNH TINH PHẢN KÍCH KHI TRẢ LỜI SAI HOẶC HẾT GIỜ
     */
    playAlienRetaliation(attackerIndex, robotRemainingShield, damage = 15, callback) {
        this.isAnimating = true;

        const attackerCard = document.getElementById(`alien-card-${attackerIndex}`) || this.container.querySelector('.alien-card:not(.is-destroyed)');
        const robotCard = document.getElementById('robot-card');
        const robotImg = document.getElementById('robot-sprite-img');
        const shieldBubble = document.getElementById('robot-shield-bubble');

        if (attackerCard) {
            attackerCard.classList.add('alien-lunge-attack');
            setTimeout(() => attackerCard.classList.remove('alien-lunge-attack'), 500);
        }

        // Âm thanh quái vật tấn công
        if (window.soundSystem) {
            window.soundSystem.playAlienAttack();
        }

        setTimeout(() => {
            // Khiên Robot chớp đỏ và rung giật
            if (robotCard) {
                robotCard.classList.add('hero-shield-crack');
                setTimeout(() => robotCard.classList.remove('hero-shield-crack'), 600);
            }
            if (shieldBubble) {
                shieldBubble.classList.add('bubble-flash-impact');
                setTimeout(() => shieldBubble.classList.remove('bubble-flash-impact'), 500);
            }

            // Rung lắc toàn màn hình
            const arena = document.getElementById('scifi-arena');
            if (arena) {
                arena.classList.add('screen-shake-anim');
                setTimeout(() => arena.classList.remove('screen-shake-anim'), 400);
            }

            // Âm thanh cảnh báo
            if (window.soundSystem) {
                window.soundSystem.playAlarmKlaxon();
            }

            // Hiện chữ sát thương mất khiên
            const robotPos = this.getElementCenter(robotImg || robotCard);
            this.showFloatingCombatText(robotPos.x, robotPos.y - 40, `-${damage} SHIELD!`, 'hero-damage-text');

            // Cập nhật thanh giáp của Robot
            this.updateRobotShieldDisplay(robotRemainingShield);

            this.isAnimating = false;
            if (callback) callback();
        }, 300);
    }

    /**
     * Cập nhật hiển thị HP của quái vật trên giao diện
     */
    updateAlienHpDisplay(index, newHp, isDead) {
        const alien = this.aliens[index];
        if (!alien) return;

        const card = document.getElementById(`alien-card-${index}`);
        if (!card) return;

        if (alien.type === 'queen') {
            const bar = document.getElementById(`alien-hp-bar-${index}`);
            const text = card.querySelector('.boss-hp-val');
            const pips = card.querySelectorAll('.queen-hp-pips .hp-pip');
            const hpPercent = Math.max(0, (newHp / alien.maxHp) * 100);
            if (bar) bar.style.width = `${hpPercent}%`;
            if (text) text.textContent = `${newHp} / ${alien.maxHp} HP`;
            if (pips) {
                pips.forEach((pip, i) => {
                    if (i < newHp) {
                        pip.className = 'hp-pip pip-full';
                    } else {
                        pip.className = 'hp-pip pip-empty';
                    }
                });
            }
        } else if (alien.type === 'large') {
            const hpText = card.querySelector('.hp-number');
            const hearts = card.querySelectorAll('.hp-heart');
            if (hpText) hpText.textContent = `${newHp}/2 HP`;
            if (hearts) {
                hearts.forEach((h, i) => {
                    h.className = `hp-heart ${i < newHp ? 'heart-full' : 'heart-empty'}`;
                });
            }
        } else {
            const hpText = card.querySelector('.hp-number');
            const hearts = card.querySelectorAll('.hp-heart');
            if (hpText) hpText.textContent = `${newHp}/1 HP`;
            if (hearts && hearts[0]) {
                hearts[0].className = `hp-heart ${newHp > 0 ? 'heart-full' : 'heart-empty'}`;
            }
        }

        if (isDead) {
            const portrait = card.querySelector('.alien-portrait-wrapper');
            if (portrait && !portrait.querySelector('.destroyed-stamp')) {
                const stamp = document.createElement('div');
                stamp.className = 'destroyed-stamp';
                stamp.textContent = 'ĐÃ TIÊU DIỆT';
                portrait.appendChild(stamp);
            }
        }
    }

    /**
     * Cập nhật thanh giáp/khiên của Robot
     */
    updateRobotShieldDisplay(shieldVal) {
        const text = document.getElementById('robot-shield-text');
        const bar = document.getElementById('robot-shield-bar');
        const safeVal = Math.max(0, shieldVal);
        if (text) text.textContent = `${safeVal}/100`;
        if (bar) {
            bar.style.width = `${safeVal}%`;
            if (safeVal < 30) {
                bar.style.backgroundColor = '#ff2056';
            } else if (safeVal < 60) {
                bar.style.backgroundColor = '#ffb703';
            } else {
                bar.style.backgroundColor = '#00f3ff';
            }
        }
    }

    /**
     * Vụ nổ va chạm plasma
     */
    createImpactBlast(x, y) {
        const blast = document.createElement('div');
        blast.className = 'plasma-impact-burst';
        blast.style.left = `${x}px`;
        blast.style.top = `${y}px`;
        document.body.appendChild(blast);
        setTimeout(() => {
            if (blast.parentNode) blast.parentNode.removeChild(blast);
        }, 500);
    }

    /**
     * Vụ nổ acid khi quái vật tan biến
     */
    createAcidDeathBurst(x, y) {
        const deathFx = document.createElement('div');
        deathFx.className = 'alien-acid-death-burst';
        deathFx.style.left = `${x}px`;
        deathFx.style.top = `${y}px`;
        document.body.appendChild(deathFx);
        setTimeout(() => {
            if (deathFx.parentNode) deathFx.parentNode.removeChild(deathFx);
        }, 700);
    }

    /**
     * Chữ sát thương nhảy lên (Floating Damage Text)
     */
    showFloatingCombatText(x, y, text, cssClass) {
        const popup = document.createElement('div');
        popup.className = `combat-float-number ${cssClass}`;
        popup.textContent = text;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        document.body.appendChild(popup);
        setTimeout(() => {
            if (popup.parentNode) popup.parentNode.removeChild(popup);
        }, 900);
    }
}
