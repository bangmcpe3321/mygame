/**
 * HỆ THỐNG ĐỒ HỌA THẺ BÀI CHIẾN ĐẤU THEO LƯỢT (TACTICAL SCI-FI CARD BATTLE ENGINE)
 * - Tông màu chủ đạo: XANH LÁ CÂY CÔNG NGHỆ (High-Tech Green / Matrix Emerald Neon).
 * - Biến nhân vật và quái vật thành các THẺ BÀI CHIẾN THUẬT (Tactical Battle Cards).
 * - Sử dụng hoàn toàn tranh AI nghệ thuật kỹ thuật số (không dùng SVG cơ bản).
 * - Hoạt ảnh chiến đấu: Đạn Plasma xanh lá chớp lóe, đòn cào xé phản kích, nổ acid tan biến.
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
     */
    renderArena(sectorIndex, aliensState, robotShield = 200, onTargetSelect = null) {
        this.currentSector = sectorIndex;
        this.aliens = aliensState || [];
        this.onTargetSelect = onTargetSelect;
        this.clear();

        const sectorConfigs = [
            {
                id: 'cargo',
                name: 'SECTOR 01: KHO HÀNG (CARGO BAY)',
                sub: 'Cảnh báo: 4 Dị vật nhỏ (Swarm Drones) đang cắn phá vỏ tàu!',
                bg: 'assets/bg_cargobay.jpg'
            },
            {
                id: 'reactor',
                name: 'SECTOR 02: LÒ PHẢN ỨNG (REACTOR CORE)',
                sub: 'Báo động: 2 Dị vật nhỏ & 2 Chiến binh bọc giáp gai (Xeno Brutes)!',
                bg: 'assets/bg_reactor.jpg'
            },
            {
                id: 'bridge',
                name: 'SECTOR 03: CẦU TÀU CHỈ HUY (COMMAND BRIDGE)',
                sub: 'Khẩn cấp Tối Cao: NỮ CHÚA XENOMORPH (HIVE QUEEN BOSS) ĐÃ XUẤT HIỆN!',
                bg: 'assets/bg_bridge.jpg'
            }
        ];

        const config = sectorConfigs[sectorIndex] || sectorConfigs[0];

        // Tự động tìm mục tiêu còn sống đầu tiên
        this.autoSelectFirstAliveTarget();

        const arenaHtml = `
            <div class="scifi-arena" id="scifi-arena" style="background-image: linear-gradient(rgba(3, 10, 6, 0.65), rgba(3, 10, 6, 0.82)), url('${config.bg}');">
                <!-- Header thông tin chiến trường -->
                <div class="arena-header-banner">
                    <div class="sector-code-badge">SECTOR 0${sectorIndex + 1} // ACTIVE</div>
                    <div class="sector-titles-wrap">
                        <h2 class="sector-title">${config.name}</h2>
                        <span class="sector-subtitle">${config.sub}</span>
                    </div>
                    <div class="combat-mode-badge">TURN-BASED CARD RPG</div>
                </div>

                <!-- Đấu trường Thẻ bài: Bên trái Robot - Bên phải Đội quân Dị vật -->
                <div class="arena-battlefield">
                    <!-- 1. BÊN TRÁI: THẺ BÀI ROBOT CHIẾN ĐẤU UNIT-07 (PLAYER HERO CARD) -->
                    <div class="hero-combatant-zone" id="robot-hero-zone">
                        <div class="tactical-card hero-battle-card" id="robot-card">
                            <!-- Header thẻ bài -->
                            <div class="card-top-bar">
                                <span class="card-type-tag hero-tag">UNIT-07 // HERO</span>
                                <span class="card-rarity">SSR ★★★★★</span>
                            </div>

                            <!-- Khung tranh AI Robot -->
                            <div class="card-portrait-frame">
                                <div class="card-corner-bracket top-left"></div>
                                <div class="card-corner-bracket top-right"></div>
                                <div class="card-corner-bracket bottom-left"></div>
                                <div class="card-corner-bracket bottom-right"></div>
                                
                                <img src="assets/robot_hero.jpg" alt="Unit-07 Combat Robot" class="card-art-img" id="robot-sprite-img" />
                                <div class="card-scanline"></div>
                                <div class="muzzle-flash-anchor" id="robot-muzzle"></div>
                                <div class="shield-energy-bubble" id="robot-shield-bubble"></div>
                            </div>
                            
                            <!-- Bảng chỉ số thẻ bài Robot -->
                            <div class="card-stats-panel">
                                <div class="card-name-title">ROBOT BẢO AN [AEGIS]</div>
                                
                                <!-- Thanh Khiên & Máu Năng Lượng 200 HP -->
                                <div class="shield-bar-container">
                                    <div class="shield-label-row">
                                        <span>🛡️ MÁU / KHIÊN BẢO VỆ</span>
                                        <span id="robot-shield-text">${robotShield}/200 HP</span>
                                    </div>
                                    <div class="shield-track">
                                        <div class="shield-fill" id="robot-shield-bar" style="width: ${Math.min(100, (Math.max(0, robotShield) / 200) * 100)}%;"></div>
                                    </div>
                                </div>

                                <div class="card-footer-stats">
                                    <span class="stat-pill atk-pill">⚡ SÚNG PLASMA: 1 DMG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- VÙNG CHIẾN ĐẤU GIỮA: HIỆU ỨNG TIA LASER & ĐẠN ĐẠO -->
                    <div class="combat-crossfire-zone" id="crossfire-zone"></div>

                    <!-- 2. BÊN PHẢI: ĐỘI QUÂN THẺ BÀI DỊ VẬT NGOÀI HÀNH TINH (ALIEN SQUAD CARDS) -->
                    <div class="aliens-combatant-zone" id="aliens-squad-zone">
                        <div class="aliens-formation-grid ${sectorIndex === 2 ? 'boss-formation' : ''}" id="aliens-grid">
                            ${this.generateAliensHTML()}
                        </div>
                    </div>
                </div>

                <!-- Bảng nhắc chiến thuật -->
                <div class="arena-footer-tip" id="arena-tip">
                    <span>💡 Gợi ý: Bấm vào một Thẻ bài Quái vật để khóa mục tiêu (Target Lock). Trả lời đúng để nạp đạn Plasma tiêu diệt mục tiêu!</span>
                </div>
            </div>
        `;

        this.container.innerHTML = arenaHtml;
        this.bindAlienClickEvents();
    }

    /**
     * Sinh mã HTML cho danh sách Thẻ bài Quái vật
     */
    generateAliensHTML() {
        return this.aliens.map((alien, index) => {
            const isDead = alien.hp <= 0;
            const isTargeted = index === this.currentTargetIndex && !isDead;
            const isQueen = alien.type === 'queen';
            const isLarge = alien.type === 'large';
            
            let cardClass = `tactical-card alien-battle-card card-${alien.type}`;
            if (isDead) cardClass += ' is-destroyed';
            if (isTargeted) cardClass += ' is-target-locked';

            // Thông tin vai trò & Rarity
            let typeTag = 'TIỂU DỊ VẬT // DRONE';
            let rarity = 'COMMON ★';
            let atkText = '⚔️ CÀO CẮN: 15 DMG';

            if (isLarge) {
                typeTag = 'CHIẾN BINH GAI // BRUTE';
                rarity = 'ELITE ★★★';
                atkText = '⚔️ ĐUÔI GAI: 15 DMG';
            } else if (isQueen) {
                typeTag = 'NỮ CHÚA XENOMORPH // BOSS';
                rarity = 'LEGENDARY ★★★★★';
                atkText = '☣️ PHUN ACID: 15 DMG';
            }

            // Thanh máu của thẻ bài
            let hpIndicatorsHtml = '';
            if (isQueen) {
                const hpPercent = (alien.hp / alien.maxHp) * 100;
                hpIndicatorsHtml = `
                    <div class="queen-boss-hp-box">
                        <div class="boss-hp-header">
                            <span class="boss-crown">👑 MÁU NỮ CHÚA</span>
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
                    <!-- Tâm ngắm khóa mục tiêu công nghệ xanh lá -->
                    <div class="target-crosshair-lock">
                        <span class="crosshair-bracket top-left"></span>
                        <span class="crosshair-bracket top-right"></span>
                        <span class="crosshair-bracket bottom-left"></span>
                        <span class="crosshair-bracket bottom-right"></span>
                        <span class="target-locked-text">TARGET LOCKED</span>
                    </div>

                    <!-- Header thẻ bài -->
                    <div class="card-top-bar">
                        <span class="card-type-tag">${typeTag}</span>
                        <span class="card-rarity">${rarity}</span>
                    </div>

                    <!-- Khung ảnh tranh AI sinh vật -->
                    <div class="card-portrait-frame">
                        <div class="card-corner-bracket top-left"></div>
                        <div class="card-corner-bracket top-right"></div>
                        <div class="card-corner-bracket bottom-left"></div>
                        <div class="card-corner-bracket bottom-right"></div>

                        <img src="${alien.image}" alt="${alien.name}" class="card-art-img" id="alien-img-${index}" />
                        <div class="card-scanline"></div>
                        ${isDead ? '<div class="destroyed-stamp">ĐÃ TIÊU DIỆT</div>' : ''}
                    </div>

                    <!-- Tên & Chỉ số Thẻ bài -->
                    <div class="card-stats-panel">
                        <div class="card-name-title">${alien.name}</div>
                        ${hpIndicatorsHtml}
                        <div class="card-footer-stats">
                            <span class="stat-pill monster-atk-pill">${atkText}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Bắt sự kiện khi click thẻ bài để chọn mục tiêu
     */
    bindAlienClickEvents() {
        const cards = this.container.querySelectorAll('.alien-battle-card');
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
     * Tự động chọn thẻ bài còn sống đầu tiên
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

        const cards = this.container.querySelectorAll('.alien-battle-card');
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

    getElementCenter(elem) {
        if (!elem) return { x: 0, y: 0 };
        const rect = elem.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    /**
     * HOẠT ẢNH TẤN CÔNG BẰNG ĐẠN PLASMA XANH LÁ KHI TRẢ LỜI ĐÚNG
     */
    playRobotAttack(targetIndex, newHp, isDead, callback) {
        this.isAnimating = true;

        const robotCard = document.getElementById('robot-card');
        const robotImg = document.getElementById('robot-sprite-img');
        const muzzle = document.getElementById('robot-muzzle');
        const targetCard = document.getElementById(`alien-card-${targetIndex}`);
        const targetImg = document.getElementById(`alien-img-${targetIndex}`);

        if (!targetCard) {
            this.isAnimating = false;
            if (callback) callback();
            return;
        }

        // 1. Robot giật súng lùi lại & chớp sáng nòng súng xanh lá
        if (robotCard) robotCard.classList.add('robot-fire-recoil');
        if (muzzle) muzzle.classList.add('muzzle-active');

        // Âm thanh bắn súng
        try {
            if (window.soundSystem) window.soundSystem.playLaserShot();
        } catch (e) {}

        // 2. Tính toán quỹ đạo đạn plasma
        const startPos = this.getElementCenter(muzzle || robotImg);
        const endPos = this.getElementCenter(targetImg || targetCard);

        const deltaX = endPos.x - startPos.x;
        const deltaY = endPos.y - startPos.y;
        const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // Tạo đạn Plasma xanh lá công nghệ bay qua màn hình
        const bolt = document.createElement('div');
        bolt.className = 'plasma-projectile-bolt';
        bolt.style.left = `${startPos.x}px`;
        bolt.style.top = `${startPos.y}px`;
        bolt.style.transform = `rotate(${angleDeg}deg)`;
        document.body.appendChild(bolt);

        if (bolt.animate) {
            bolt.animate([
                { transform: `translate(0, 0) rotate(${angleDeg}deg)`, opacity: 1 },
                { transform: `translate(${deltaX}px, ${deltaY}px) rotate(${angleDeg}deg)`, opacity: 1 }
            ], {
                duration: 250,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
            });
        }

        setTimeout(() => {
            // Đạn trúng mục tiêu!
            if (bolt.parentNode) bolt.parentNode.removeChild(bolt);
            if (muzzle) muzzle.classList.remove('muzzle-active');
            if (robotCard) robotCard.classList.remove('robot-fire-recoil');

            // 3. Hiệu ứng nổ va chạm tại thẻ bài quái vật
            this.createImpactBlast(endPos.x, endPos.y);

            try {
                if (window.soundSystem) {
                    if (this.aliens[targetIndex] && this.aliens[targetIndex].type === 'queen') {
                        window.soundSystem.playQueenRoar();
                    } else {
                        window.soundSystem.playAlienHit();
                    }
                }
            } catch (e) {}

            // Thẻ bài quái vật giật mình nảy lên và chớp đỏ
            if (targetCard) {
                targetCard.classList.add('alien-hit-recoil');
                setTimeout(() => targetCard.classList.remove('alien-hit-recoil'), 400);
            }

            // Cập nhật lại HP
            if (this.aliens[targetIndex]) {
                this.aliens[targetIndex].hp = newHp;
            }
            this.updateAlienHpDisplay(targetIndex, newHp, isDead);

            // 4. Nếu quái vật chết
            if (isDead) {
                // Hiện số sát thương nổ kèm thông báo tiêu diệt
                this.showFloatingCombatText(endPos.x, endPos.y - 30, '💥 TIÊU DIỆT!', 'combat-float-number kill-damage-text');

                if (targetCard) {
                    targetCard.classList.remove('is-target-locked');
                    targetCard.classList.add('is-destroyed');
                }

                setTimeout(() => {
                    try {
                        if (window.soundSystem) window.soundSystem.playAlienDeath();
                    } catch (e) {}

                    this.createAcidDeathBurst(endPos.x, endPos.y);

                    // Tự động chuyển mục tiêu sang con còn sống tiếp theo
                    this.autoSelectFirstAliveTarget();
                    this.selectTarget(this.currentTargetIndex);

                    this.isAnimating = false;
                    if (callback) callback();
                }, 350);
            } else {
                // Hiện số sát thương nhảy lên (-1 HP)
                this.showFloatingCombatText(endPos.x, endPos.y - 30, '-1 HP!', 'damage-text');
                this.isAnimating = false;
                if (callback) callback();
            }
        }, 250);
    }

    /**
     * HOẠT ẢNH DỊ VẬT NGOÀI HÀNH TINH PHẢN KÍCH KHI TRẢ LỜI SAI HOẶC HẾT GIỜ
     */
    playAlienRetaliation(attackerIndex, robotRemainingShield, damage = 15, callback) {
        this.isAnimating = true;

        const safeIndex = attackerIndex >= 0 ? attackerIndex : 0;
        const attackerCard = document.getElementById(`alien-card-${safeIndex}`) || this.container.querySelector('.alien-battle-card:not(.is-destroyed)');
        const robotCard = document.getElementById('robot-card');
        const robotImg = document.getElementById('robot-sprite-img');
        const shieldBubble = document.getElementById('robot-shield-bubble');

        if (attackerCard) {
            attackerCard.classList.add('alien-lunge-attack');
            setTimeout(() => attackerCard.classList.remove('alien-lunge-attack'), 500);
        }

        try {
            if (window.soundSystem) window.soundSystem.playAlienAttack();
        } catch (e) {}

        setTimeout(() => {
            // Khiên Robot chớp đỏ
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

            try {
                if (window.soundSystem) window.soundSystem.playAlarmKlaxon();
            } catch (e) {}

            // Hiện chữ mất khiên
            const robotPos = this.getElementCenter(robotImg || robotCard);
            this.showFloatingCombatText(robotPos.x, robotPos.y - 40, `-${damage} SHIELD!`, 'hero-damage-text');

            // Cập nhật thanh giáp của Robot
            this.updateRobotShieldDisplay(robotRemainingShield);

            this.isAnimating = false;
            if (callback) callback();
        }, 300);
    }

    /**
     * Cập nhật hiển thị HP trên thẻ bài
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
                    pip.className = `hp-pip ${i < newHp ? 'pip-full' : 'pip-empty'}`;
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
            const portrait = card.querySelector('.card-portrait-frame');
            if (portrait && !portrait.querySelector('.destroyed-stamp')) {
                const stamp = document.createElement('div');
                stamp.className = 'destroyed-stamp';
                stamp.textContent = 'ĐÃ TIÊU DIỆT';
                portrait.appendChild(stamp);
            }
        }
    }

    /**
     * Cập nhật thanh giáp và lượng máu của Robot (200 HP)
     */
    updateRobotShieldDisplay(shieldVal) {
        const text = document.getElementById('robot-shield-text');
        const bar = document.getElementById('robot-shield-bar');
        const safeVal = Math.max(0, shieldVal);
        if (text) text.textContent = `${safeVal}/200 HP`;
        if (bar) {
            const pct = Math.min(100, (safeVal / 200) * 100);
            bar.style.width = `${pct}%`;
            if (safeVal < 60) {
                bar.style.backgroundColor = '#ff2056';
            } else if (safeVal < 120) {
                bar.style.backgroundColor = '#ffb703';
            } else {
                bar.style.backgroundColor = '#00ff88';
            }
        }
    }

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
