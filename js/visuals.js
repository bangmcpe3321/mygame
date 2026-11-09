/**
 * HỆ THỐNG ĐỒ HỌA THẺ BÀI CHIẾN ĐẤU THEO LƯỢT (TACTICAL SCI-FI CARD BATTLE ENGINE)
 * - Tông màu chủ đạo: XANH LÁ CÔNG NGHỆ (High-Tech Green / Matrix Emerald Neon).
 * - Biến nhân vật và quái vật thành các THẺ BÀI CHIẾN THUẬT (Tactical Battle Cards).
 * - Sử dụng hoàn toàn tranh AI nghệ thuật kỹ thuật số.
 * - Hoạt ảnh chiến đấu: Đạn Plasma chớp lóe, đòn cào xé phản kích, nổ acid tan biến.
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
        if (aliensState && aliensState.length > 0) {
            this.aliens = aliensState;
        } else if (window.multiplayer && typeof window.multiplayer.getCompetitors === 'function') {
            this.aliens = window.multiplayer.getCompetitors();
        } else if (typeof SECTOR_MONSTERS !== 'undefined' && SECTOR_MONSTERS[sectorIndex]) {
            this.aliens = JSON.parse(JSON.stringify(SECTOR_MONSTERS[sectorIndex]));
        } else {
            this.aliens = [];
        }
        this.onTargetSelect = onTargetSelect;
        this.clear();

        const sectorConfigs = [
            {
                id: 'cargo',
                name: 'SECTOR 01: KHO HÀNG TRÀ THỦY CANH (TEA CARGO BAY) · HỒI I',
                sub: 'Cảnh báo: 4 Dị vật nhỏ (Swarm Drones) đang cắn phá các container Trà Mộc!',
                bg: 'assets/bg_cargobay.jpg'
            },
            {
                id: 'reactor',
                name: 'SECTOR 02: DÂY CHUYỀN Ủ TRÀ & LÒ PHẢN ỨNG (TEA REACTOR CORE) · HỒI II',
                sub: 'Báo động: Dị vật bọc giáp gai Brutes đe dọa dây chuyền ủ trà và nguồn năng lượng!',
                bg: 'assets/bg_reactor.jpg'
            },
            {
                id: 'bridge',
                name: 'SECTOR 03: CẦU TÀU CHỈ HUY & KHO MẪU TRÀ TỔ (TEA ARCHIVES & BRIDGE) · HỒI III',
                sub: 'Khẩn cấp Tối Cao: NỮ CHÚA XENOMORPH bao vây kho mẫu trà tổ và đài phát S.O.S!',
                bg: 'assets/bg_bridge.jpg'
            }
        ];

        const config = sectorConfigs[sectorIndex] || sectorConfigs[0];

        // Tự động tìm mục tiêu còn sống đầu tiên
        this.autoSelectFirstAliveTarget();

        const arenaHtml = `
            <div class="scifi-arena star-formation-arena" id="scifi-arena" style="background-image: linear-gradient(rgba(3, 10, 6, 0.8), rgba(3, 10, 6, 0.92)), url('${config.bg}');">
                <!-- Huy hiệu thông tin Đấu trường tinh gọn -->
                <div class="star-arena-top-badge">
                    <span class="pulse-dot"></span>
                    <span>ĐẤU TRƯỜNG 5 NGƯỜI · SECTOR 0${sectorIndex + 1} (BỐ CỤC NGŨ GIÁC SAO)</span>
                </div>

                <!-- ĐẤU TRƯỜNG HÌNH NGÔI SAO 5 CÁNH (STAR FORMATION STAGE) -->
                <div class="star-formation-stage" id="star-formation-stage">
                    <!-- Dây truyền dẫn năng lượng & lưới laser ngôi sao 5 cánh SVG -->
                    <svg class="star-pentagram-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <!-- 5 tia liên kết hướng tâm từ Lõi ra 5 Đỉnh -->
                        <line class="star-radial-beam" x1="50" y1="48" x2="50" y2="82" />
                        <line class="star-radial-beam" x1="50" y1="48" x2="16" y2="56" />
                        <line class="star-radial-beam" x1="50" y1="48" x2="26" y2="20" />
                        <line class="star-radial-beam" x1="50" y1="48" x2="74" y2="20" />
                        <line class="star-radial-beam" x1="50" y1="48" x2="84" y2="56" />
                        <!-- Đường ngũ giác bao ngoài thanh thoát -->
                        <polygon class="star-pentagon-perimeter" points="50,82 16,56 26,20 74,20 84,56" />
                    </svg>

                    <!-- LÕI THỊ TRƯỜNG TRUNG TÂM TINH GỌN (AEGIS MARKET CORE) -->
                    <div class="market-star-core" id="market-star-core" title="Lõi Thị Trường / Aegis Market Core">
                        <div class="core-outer-ring"></div>
                        <div class="core-inner-glow">
                            <span class="core-pulse-orb">⚛️</span>
                        </div>
                        <div class="core-title-text">LÕI THỊ TRƯỜNG</div>
                    </div>

                    <!-- 1. ĐỈNH DƯỚI (NODE 0): THẺ BẠN (HERO POD) -->
                    ${this.generateHeroStarCardHTML(robotShield)}

                    <!-- 2. BỐN ĐỈNH CÒN LẠI (NODES 1..4): 4 ĐỐI THỦ (RIVAL PODS) -->
                    ${this.generateStarCompetitorsHTML()}
                </div>

                <!-- Bảng nhắc chiến thuật -->
                <div class="arena-footer-tip" id="arena-tip">
                    <span>💡 Bấm vào một Thẻ Đối Thủ để Khóa Mục Tiêu. Trả lời đúng để bắn tia Plasma xuyên tâm ngôi sao!</span>
                </div>
            </div>
        `;

        this.container.innerHTML = arenaHtml;
        this.bindAlienClickEvents();
    }

    /**
     * Sinh mã HTML cho Thẻ bài của Bản Thân (Hero Pod - Đỉnh dưới Node 0)
     */
    generateHeroStarCardHTML(robotShield) {
        const playerName = window.multiplayer ? window.multiplayer.playerName : 'Unit-07';
        const playerAvatar = window.multiplayer ? window.multiplayer.playerAvatar : '🤖';
        const safeShield = Math.max(0, robotShield);
        const shieldPct = Math.min(100, (safeShield / 200) * 100);

        return `
            <div class="tactical-card star-card hero-star-card star-node-0" id="robot-card" title="Vị trí của bạn (${playerName})">
                <div class="pod-avatar-ring hero-ring">
                    <span class="pod-avatar-icon">${playerAvatar}</span>
                    <span class="pod-crown-badge">👑 BẠN</span>
                    <div class="muzzle-flash-anchor" id="robot-muzzle"></div>
                    <div class="shield-energy-bubble" id="robot-shield-bubble"></div>
                </div>
                <div class="pod-info-panel">
                    <div class="pod-name-text">${playerName}</div>
                    <div class="pod-hp-track">
                        <div class="shield-fill hero-shield-fill" id="robot-shield-bar" style="width: ${shieldPct}%;"></div>
                    </div>
                    <div class="pod-meta-row">
                        <span class="pod-hp-val" id="robot-shield-text">${safeShield}/200 HP</span>
                        <span class="pod-score-val">⚡ Plasma</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Sinh mã HTML cho 4 Thẻ bài Đối thủ trên 4 đỉnh ngôi sao (Nodes 1..4)
     */
    generateStarCompetitorsHTML() {
        const nodeClasses = ['star-node-1', 'star-node-2', 'star-node-3', 'star-node-4'];

        return this.aliens.map((alien, index) => {
            const isDead = alien.hp <= 0;
            const isTargeted = index === this.currentTargetIndex && !isDead;
            const nodeClass = nodeClasses[index] || `star-node-${index + 1}`;
            const maxHp = alien.maxHp || 100;
            const curHp = Math.max(0, typeof alien.hp === 'number' ? alien.hp : maxHp);
            const hpPercent = Math.min(100, Math.max(0, (curHp / maxHp) * 100));
            const avatar = alien.avatar || '⚔️';

            let cardClass = `tactical-card star-card competitor-card competitor-star-card alien-battle-card ${nodeClass}`;
            if (isDead) cardClass += ' is-destroyed';
            if (isTargeted) cardClass += ' is-target-locked';

            return `
                <div class="${cardClass}" id="alien-card-${index}" data-alien-index="${index}" title="Bấm để nhắm bắn đối thủ này (${alien.name})">
                    <!-- Tâm ngắm khóa mục tiêu -->
                    <div class="target-crosshair-lock">
                        <span class="crosshair-bracket top-left"></span>
                        <span class="crosshair-bracket top-right"></span>
                        <span class="crosshair-bracket bottom-left"></span>
                        <span class="crosshair-bracket bottom-right"></span>
                        <span class="target-locked-text">MỤC TIÊU</span>
                    </div>

                    <div class="pod-avatar-ring">
                        <span class="pod-avatar-icon competitor-avatar-badge">${avatar}</span>
                        <span class="pod-rank-badge">#${index + 2}</span>
                        ${isDead ? '<div class="pod-dead-badge">TÁI CƠ CẤU</div>' : ''}
                    </div>

                    <div class="pod-info-panel">
                        <div class="pod-name-text">${alien.name}</div>
                        <div class="pod-hp-track">
                            <div class="shield-fill ${curHp <= 30 ? 'danger' : curHp <= 60 ? 'warn' : ''}" id="alien-hp-bar-${index}" style="width: ${hpPercent}%;"></div>
                        </div>
                        <div class="pod-meta-row">
                            <span class="pod-hp-val" id="alien-hp-text-${index}">${curHp}/${maxHp} HP</span>
                            <span class="pod-score-val score-pill">⭐ ${(alien.score || 0).toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Sinh mã HTML cho danh sách Thẻ bài (Tương thích ngược)
     */
    generateAliensHTML() {
        return this.generateStarCompetitorsHTML();
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
            if (idx === targetIndex && this.aliens[idx] && this.aliens[idx].hp > 0) {
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
        const sound = window.soundSystem || window.audio;
        try {
            if (sound && sound.playLaserShot) sound.playLaserShot();
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
                if (sound) {
                    if (this.aliens[targetIndex] && this.aliens[targetIndex].type === 'queen' && sound.playQueenRoar) {
                        sound.playQueenRoar();
                    } else if (sound.playAlienHit) {
                        sound.playAlienHit();
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
                this.showFloatingCombatText(endPos.x, endPos.y - 30, '💥 TIÊU DIỆT!', 'combat-float-number kill-damage-text');

                if (targetCard) {
                    targetCard.classList.remove('is-target-locked');
                    targetCard.classList.add('is-destroyed');
                }

                setTimeout(() => {
                    try {
                        if (sound && sound.playAlienDeath) sound.playAlienDeath();
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
     * HOẠT ẢNH DỊ VẬT PHẢN KÍCH KHI TRẢ LỜI SAI HOẶC HẾT GIỜ
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

        // Bắn tia đạn đỏ từ đối thủ xuyên tâm ngôi sao tới Bạn
        if (attackerCard && robotCard) {
            const startPos = this.getElementCenter(attackerCard);
            const endPos = this.getElementCenter(robotCard);
            const deltaX = endPos.x - startPos.x;
            const deltaY = endPos.y - startPos.y;
            const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            const bolt = document.createElement('div');
            bolt.className = 'plasma-projectile-bolt rival-red-bolt';
            bolt.style.left = `${startPos.x}px`;
            bolt.style.top = `${startPos.y}px`;
            bolt.style.transform = `rotate(${angleDeg}deg)`;
            document.body.appendChild(bolt);

            if (bolt.animate) {
                bolt.animate([
                    { transform: `translate(0, 0) rotate(${angleDeg}deg)`, opacity: 1 },
                    { transform: `translate(${deltaX}px, ${deltaY}px) rotate(${angleDeg}deg)`, opacity: 1 }
                ], { duration: 250, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
            }
            setTimeout(() => { if (bolt.parentNode) bolt.parentNode.removeChild(bolt); }, 250);
        }

        const sound = window.soundSystem || window.audio;
        try {
            if (sound && sound.playAlienAttack) sound.playAlienAttack();
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
                if (sound && sound.playAlarmKlaxon) sound.playAlarmKlaxon();
            } catch (e) {}

            // Hiện chữ mất khiên
            const robotPos = this.getElementCenter(robotImg || robotCard);
            this.createImpactBlast(robotPos.x, robotPos.y);
            this.showFloatingCombatText(robotPos.x, robotPos.y - 40, `-${damage} SHIELD!`, 'hero-damage-text');

            // Cập nhật thanh giáp của Robot
            this.updateRobotShieldDisplay(robotRemainingShield);

            this.isAnimating = false;
            if (callback) callback();
        }, 250);
    }

    /**
     * HOẠT ẢNH BẮN ĐẠN CHÉO GIỮA 2 ĐỐI THỦ THƯƠNG TRƯỜNG (RIVAL VS RIVAL)
     */
    playCrossfireBetweenRivals(attackerIndex, targetIndex, damage = 15, callback) {
        const attackerCard = document.getElementById(`alien-card-${attackerIndex}`);
        const targetCard = document.getElementById(`alien-card-${targetIndex}`);
        if (!attackerCard || !targetCard) {
            if (callback) callback();
            return;
        }

        attackerCard.classList.add('alien-lunge-attack');
        setTimeout(() => attackerCard.classList.remove('alien-lunge-attack'), 400);

        const startPos = this.getElementCenter(attackerCard);
        const endPos = this.getElementCenter(targetCard);
        const deltaX = endPos.x - startPos.x;
        const deltaY = endPos.y - startPos.y;
        const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        const bolt = document.createElement('div');
        bolt.className = 'plasma-projectile-bolt rival-red-bolt';
        bolt.style.left = `${startPos.x}px`;
        bolt.style.top = `${startPos.y}px`;
        bolt.style.transform = `rotate(${angleDeg}deg)`;
        document.body.appendChild(bolt);

        if (bolt.animate) {
            bolt.animate([
                { transform: `translate(0, 0) rotate(${angleDeg}deg)`, opacity: 1 },
                { transform: `translate(${deltaX}px, ${deltaY}px) rotate(${angleDeg}deg)`, opacity: 1 }
            ], { duration: 250, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
        }

        setTimeout(() => {
            if (bolt.parentNode) bolt.parentNode.removeChild(bolt);
            this.createImpactBlast(endPos.x, endPos.y);
            this.showFloatingCombatText(endPos.x, endPos.y - 30, `-${damage} HP`, 'hero-damage-text');

            targetCard.classList.add('alien-hit-recoil');
            setTimeout(() => targetCard.classList.remove('alien-hit-recoil'), 350);

            if (callback) callback();
        }, 250);
    }

    /**
     * Cập nhật hiển thị HP trên thẻ bài
     */
    updateAlienHpDisplay(index, newHp, isDead) {
        const alien = this.aliens[index];
        if (!alien) return;

        const card = document.getElementById(`alien-card-${index}`);
        if (!card) return;

        if (alien.type === 'rival' || alien.isPlayer || typeof alien.avatar !== 'undefined') {
            const bar = document.getElementById(`alien-hp-bar-${index}`);
            const text = document.getElementById(`alien-hp-text-${index}`);
            const hpPercent = Math.max(0, (newHp / alien.maxHp) * 100);
            if (bar) {
                bar.style.width = `${hpPercent}%`;
                bar.className = `shield-fill ${newHp <= 30 ? 'danger' : newHp <= 60 ? 'warn' : ''}`;
            }
            if (text) text.textContent = `${newHp}/${alien.maxHp} HP`;
            if (isDead) {
                card.classList.add('is-destroyed');
            } else {
                card.classList.remove('is-destroyed');
            }
            return;
        }

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
            if (hpText) hpText.textContent = `${newHp}/${alien.maxHp} HP`;
            if (hearts) {
                hearts.forEach((h, i) => {
                    h.className = `hp-heart ${i < newHp ? 'heart-full' : 'heart-empty'}`;
                });
            }
        } else {
            const hpText = card.querySelector('.hp-number');
            const hearts = card.querySelectorAll('.hp-heart');
            if (hpText) hpText.textContent = `${newHp}/${alien.maxHp} HP`;
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

    /**
     * Cập nhật điểm số và chuỗi của đối thủ trên thẻ bài
     */
    updateCompetitorScore(index, score, streak) {
        const card = document.getElementById(`alien-card-${index}`);
        if (!card) return;
        const scorePill = card.querySelector('.score-pill');
        const streakPill = card.querySelector('.streak-pill');
        if (scorePill) scorePill.textContent = `⭐ ${(score || 0).toLocaleString('vi-VN')} đ`;
        if (streakPill) streakPill.textContent = `🔥 x${streak || 0}`;
    }
}

if (typeof window !== 'undefined') {
    window.VisualEngine = VisualEngine;
}

