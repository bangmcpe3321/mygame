/**
 * ĐẤU TRƯỜNG 5 NGƯỜI CHƠI (5-PLAYER MULTIPLAYER & PVP ENGINE)
 * ------------------------------------------------------------------
 * Hỗ trợ thi đấu thời gian thực cho tối đa 5 người chơi:
 * - WebRTC P2P (PeerJS) kết nối xuyên thiết bị (điện thoại, laptop) qua Mã PIN.
 * - BroadcastChannel & localStorage fallback cho nhiều tab cùng máy hoặc khi offline.
 * - Tự động bù các Tập Đoàn Đối Thủ AI nếu phòng có dưới 5 người chơi thật.
 */

class MarketMultiplayer {
    constructor() {
        this.channelName = 'tra_moc_pvp_channel';
        this.storageKey = 'tra_moc_pvp_state_v2';
        this.nameKey = 'tra_moc_player_name';
        this.avatarKey = 'tra_moc_player_avatar';

        this.channel = null;
        this.peer = null;
        this.connections = []; // Danh sách kết nối PeerJS
        this.hostConn = null;  // Kết nối tới Host (nếu là Client)

        this.isHost = true;
        this.roomCode = Math.floor(1000 + Math.random() * 9000).toString();
        this.roomState = 'LOBBY';

        this.playerName = this.readStorage(this.nameKey) || 'Nhà Sáng Lập';
        this.playerAvatar = this.readStorage(this.avatarKey) || '🤖';
        this.playerId = 'p_' + Math.random().toString(36).slice(2, 9);
        this.shield = 200;

        this.players = {};
        this.currentStreak = 0;
        this.botInterval = null;

        // Callbacks cho UI
        this.onRoomStarted = null;
        this.onLeaderboardUpdate = null;
        this.onPlayerListChange = null;
        this.onAttackedByRival = null;
        this.onCompetitorDamaged = null;

        this.initCommunication();
        this.initDefault5Players();
        this.initPeerJS();
    }

    readStorage(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    writeStorage(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* bỏ qua */ }
    }

    /* ------------------------------------------------------------- */
    /* 1. KHỞI TẠO 5 VỊ TRÍ ĐẤU TRƯỜNG (BẠN + 4 ĐỐI THỦ THƯƠNG TRƯỜNG) */
    /* ------------------------------------------------------------- */

    buildSelfEntry() {
        return {
            id: this.playerId,
            name: this.playerName,
            avatar: this.playerAvatar,
            score: 0,
            streak: 0,
            hp: 200,
            maxHp: 200,
            isSelf: true,
            isBot: false,
            role: 'Trà Mộc · Bạn'
        };
    }

    initDefault5Players() {
        this.players = {};
        this.players[this.playerId] = this.buildSelfEntry();

        // 4 Tập đoàn đối thủ AI sẵn sàng cạnh tranh nếu thiếu người chơi thật
        const corporateRivals = [
            { id: 'rival_bot_1', name: 'Trà Vương Corp', avatar: '👑', hp: 100, maxHp: 100, role: 'Chuỗi trà đối thủ lớn nhất', accuracy: 0.85, speed: 0.8 },
            { id: 'rival_bot_2', name: 'Phương Nam Agri', avatar: '🌱', hp: 100, maxHp: 100, role: 'Độc quyền phôi lá Mộc', accuracy: 0.8, speed: 0.75 },
            { id: 'rival_bot_3', name: 'Nova-Valkyrie', avatar: '🛸', hp: 100, maxHp: 100, role: 'Thương đoàn tự do Vành Đai', accuracy: 0.75, speed: 0.7 },
            { id: 'rival_bot_4', name: 'Cartel Vành Đai', avatar: '🛰️', hp: 100, maxHp: 100, role: 'Liên minh vận tải ngầm', accuracy: 0.7, speed: 0.65 }
        ];

        for (const rival of corporateRivals) {
            this.players[rival.id] = {
                id: rival.id,
                name: rival.name,
                avatar: rival.avatar,
                score: 0,
                streak: 0,
                hp: rival.hp,
                maxHp: rival.maxHp,
                isSelf: false,
                isBot: true,
                role: rival.role,
                meta: { accuracy: rival.accuracy, speed: rival.speed }
            };
        }
    }

    ensureSelfEntry() {
        if (!this.players[this.playerId]) {
            this.players[this.playerId] = this.buildSelfEntry();
        }
    }

    /* ------------------------------------------------------------- */
    /* 2. GIAO TIẾP MẠNG (PEERJS WEBRTC + BROADCASTCHANNEL)           */
    /* ------------------------------------------------------------- */

    initCommunication() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleMessage(event.data);
            } catch (e) {
                this.channel = null;
            }
        }

        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            window.addEventListener('storage', (event) => {
                if (event.key !== this.storageKey || !event.newValue) return;
                try {
                    this.handleMessage(JSON.parse(event.newValue));
                } catch (e) {}
            });
        }
    }

    initPeerJS() {
        if (typeof Peer === 'undefined') return;

        try {
            // Khởi tạo Peer Host theo mã phòng
            const peerId = 'tramoc_room_' + this.roomCode;
            this.peer = new Peer(peerId, {
                debug: 0
            });

            this.peer.on('open', () => {
                // Sẵn sàng nhận kết nối từ 4 người chơi khác
            });

            this.peer.on('connection', (conn) => {
                this.handleIncomingPeer(conn);
            });

            this.peer.on('error', (err) => {
                // Nếu ID đã tồn tại (phòng đã có người làm host), tạo peer ngẫu nhiên
                if (err.type === 'unavailable-id') {
                    this.peer = new Peer({ debug: 0 });
                }
            });
        } catch (e) {
            console.warn('PeerJS initialization skipped, using local BroadcastChannel fallback.');
        }
    }

    handleIncomingPeer(conn) {
        conn.on('open', () => {
            this.connections.push(conn);

            conn.on('data', (data) => {
                this.handleMessage(data, conn);
            });

            conn.on('close', () => {
                this.connections = this.connections.filter(c => c !== conn);
            });

            // Gửi ngay trạng thái phòng cho người vừa vào
            conn.send({
                type: 'ROOM_STATE_SYNC',
                roomState: this.roomState,
                roomCode: this.roomCode,
                players: this.players
            });
        });
    }

    broadcast(payload) {
        payload.timestamp = Date.now();

        // 1. Gửi qua PeerJS tới các thiết bị khác
        if (this.isHost && this.connections.length) {
            this.connections.forEach(conn => {
                try { if (conn.open) conn.send(payload); } catch (e) {}
            });
        } else if (!this.isHost && this.hostConn && this.hostConn.open) {
            try { this.hostConn.send(payload); } catch (e) {}
        }

        // 2. Gửi qua BroadcastChannel & localStorage (cùng máy)
        if (this.channel) {
            try { this.channel.postMessage(payload); } catch (e) {}
        }
        this.writeStorage(this.storageKey, JSON.stringify(payload));
    }

    /* ------------------------------------------------------------- */
    /* 3. XỬ LÝ SỰ KIỆN MẠNG & THI ĐẤU                               */
    /* ------------------------------------------------------------- */

    handleMessage(msg, fromConn) {
        if (!msg || !msg.type) return;

        switch (msg.type) {
            case 'PLAYER_JOIN_REQUEST':
                if (this.isHost && msg.player) {
                    this.addRealPlayerToSlot(msg.player);
                    this.syncRoomState();
                    this.emitPlayerList();
                    this.triggerLeaderboardUpdate();
                }
                break;

            case 'ROOM_STATE_SYNC':
                this.roomState = msg.roomState || this.roomState;
                this.roomCode = msg.roomCode || this.roomCode;
                if (msg.players) {
                    // Cập nhật người chơi nhưng giữ isSelf của mình
                    const currentSelf = this.players[this.playerId];
                    this.players = msg.players;
                    if (currentSelf) this.players[this.playerId] = currentSelf;
                }
                this.ensureSelfEntry();
                this.triggerLeaderboardUpdate();
                this.emitPlayerList();
                break;

            case 'HOST_START_GAME':
                this.roomState = 'RUNNING';
                if (typeof this.onRoomStarted === 'function') this.onRoomStarted();
                break;

            case 'PLAYER_PROFILE_CHANGED':
                if (msg.playerId && this.players[msg.playerId]) {
                    this.players[msg.playerId].name = msg.name;
                    this.players[msg.playerId].avatar = msg.avatar;
                    this.triggerLeaderboardUpdate();
                    this.emitPlayerList();
                    if (this.isHost) this.syncRoomState();
                }
                break;

            case 'PLAYER_ATTACK':
                this.handleIncomingAttack(msg);
                break;

            case 'PLAYER_SCORE_UPDATE':
                if (msg.playerId && this.players[msg.playerId]) {
                    const p = this.players[msg.playerId];
                    p.score = msg.score;
                    p.streak = msg.streak;
                    this.triggerLeaderboardUpdate();
                }
                break;

            case 'HOST_RESET_ROOM':
                this.roomState = 'LOBBY';
                this.resetScores();
                this.triggerLeaderboardUpdate();
                this.emitPlayerList();
                break;
        }
    }

    addRealPlayerToSlot(player) {
        // Thay thế bot AI đầu tiên bằng người chơi thật
        const botKey = Object.keys(this.players).find(k => this.players[k].isBot);
        if (botKey) {
            delete this.players[botKey];
        }

        this.players[player.id] = {
            id: player.id,
            name: player.name,
            avatar: player.avatar || '🚀',
            score: 0,
            streak: 0,
            hp: 100,
            maxHp: 100,
            isSelf: false,
            isBot: false,
            role: 'Chiến Binh Tham Chiến'
        };
    }

    /* ------------------------------------------------------------- */
    /* 4. CƠ CHẾ TẤN CÔNG & ĐỐI KHÁNG PVP                             */
    /* ------------------------------------------------------------- */

    attackCompetitor(targetCompetitorIndex, damage = 25) {
        const competitors = this.getCompetitors();
        const target = competitors[targetCompetitorIndex];
        if (!target) return null;

        const targetPlayer = this.players[target.id];
        if (!targetPlayer) return null;

        const newHp = Math.max(0, (targetPlayer.hp || 100) - damage);
        targetPlayer.hp = newHp;

        this.broadcast({
            type: 'PLAYER_ATTACK',
            attackerId: this.playerId,
            attackerName: this.playerName,
            targetId: target.id,
            damage: damage,
            newHp: newHp
        });

        // Nếu đối thủ bị hết máu, phục hồi sau 3 giây
        if (newHp <= 0) {
            setTimeout(() => {
                if (this.players[target.id]) {
                    this.players[target.id].hp = target.maxHp || 100;
                    this.triggerLeaderboardUpdate();
                }
            }, 3000);
        }

        return { target, newHp, isDead: newHp <= 0 };
    }

    handleIncomingAttack(msg) {
        // Nếu mục tiêu bị tấn công là chính mình!
        if (msg.targetId === this.playerId) {
            this.shield = Math.max(0, this.shield - msg.damage);
            this.ensureSelfEntry();
            this.players[this.playerId].hp = this.shield;

            if (typeof this.onAttackedByRival === 'function') {
                this.onAttackedByRival(msg.attackerName || 'Đối thủ', msg.damage, this.shield);
            }
        } else if (this.players[msg.targetId]) {
            // Đối thủ khác bị trúng đạn
            this.players[msg.targetId].hp = msg.newHp;
            if (typeof this.onCompetitorDamaged === 'function') {
                this.onCompetitorDamaged(msg.targetId, msg.newHp, msg.damage);
            }
        }
        this.triggerLeaderboardUpdate();
    }

    recordAnswer(isCorrect, scoreAwarded, targetCompetitorIndex = 0) {
        this.ensureSelfEntry();
        const self = this.players[this.playerId];

        if (isCorrect) {
            this.currentStreak += 1;
            self.score += Math.max(0, Math.round(scoreAwarded) || 0);
            self.streak = this.currentStreak;

            // Tấn công đối thủ đang chọn
            this.attackCompetitor(targetCompetitorIndex, 25);
        } else {
            this.currentStreak = 0;
            self.streak = 0;
            this.shield = Math.max(0, this.shield - 15);
            self.hp = this.shield;
        }

        this.broadcast({
            type: 'PLAYER_SCORE_UPDATE',
            playerId: this.playerId,
            score: self.score,
            streak: self.streak
        });

        this.triggerLeaderboardUpdate();
    }

    /* ------------------------------------------------------------- */
    /* 5. API DANH SÁCH & XẾP HẠNG CHO GIAO DIỆN                      */
    /* ------------------------------------------------------------- */

    /**
     * Trả về danh sách 4 đối thủ trên màn hình (không bao gồm bản thân)
     */
    getCompetitors() {
        this.ensureSelfEntry();
        const rivals = Object.values(this.players).filter(p => p.id !== this.playerId);
        
        // Đảm bảo luôn đủ 4 đối thủ (tổng 5 người)
        return rivals.slice(0, 4).map((r, idx) => ({
            id: r.id,
            name: r.name,
            avatar: r.avatar,
            hp: typeof r.hp === 'number' ? r.hp : 100,
            maxHp: r.maxHp || 100,
            score: r.score || 0,
            streak: r.streak || 0,
            isPlayer: !r.isBot,
            type: 'rival',
            share: Math.max(10, Math.min(35, 18 + Math.round((r.score || 0) / 1000))),
            image: 'assets/alien_small.jpg'
        }));
    }

    getSortedLeaderboard() {
        return Object.values(this.players).sort((a, b) => b.score - a.score);
    }

    getRankedPlayers() {
        return this.getSortedLeaderboard();
    }

    startRoomAsHost() {
        return this.startRoomByHost();
    }

    changeRoomCode() {
        this.roomCode = Math.floor(1000 + Math.random() * 9000).toString();
        this.initPeerJS();
        this.syncRoomState();
        this.emitPlayerList();
        return this.roomCode;
    }

    getPlayerList() {
        return Object.values(this.players);
    }

    /* ------------------------------------------------------------- */
    /* 6. QUẢN LÝ PHÒNG: TẠO PHÒNG (HOST) & VÀO PHÒNG (JOIN)         */
    /* ------------------------------------------------------------- */

    setAsHost(enable) {
        this.isHost = !!enable;
        if (!this.isHost) return;

        this.roomCode = Math.floor(1000 + Math.random() * 9000).toString();
        this.roomState = 'LOBBY';
        this.initDefault5Players();
        this.initPeerJS();
        this.syncRoomState();
        this.emitPlayerList();
    }

    joinRoomByPin(pin, onStatusCallback) {
        const cleanPin = (pin || '').trim().replace(/[^0-9]/g, '');
        if (cleanPin.length < 4) {
            if (onStatusCallback) onStatusCallback(false, 'Mã PIN phải gồm ít nhất 4 chữ số.');
            return false;
        }

        if (onStatusCallback) onStatusCallback(null, 'Đang tìm kiếm phòng ' + cleanPin + '...');

        const targetPeerId = 'tramoc_room_' + cleanPin;

        if (typeof Peer !== 'undefined') {
            try {
                if (this.peer) this.peer.destroy();
                this.peer = new Peer({ debug: 0 });

                this.peer.on('open', () => {
                    const conn = this.peer.connect(targetPeerId);
                    this.hostConn = conn;

                    conn.on('open', () => {
                        this.isHost = false;
                        this.roomCode = cleanPin;
                        conn.send({
                            type: 'PLAYER_JOIN_REQUEST',
                            player: this.buildSelfEntry()
                        });

                        conn.on('data', (data) => {
                            this.handleMessage(data);
                        });

                        if (onStatusCallback) onStatusCallback(true, '🟢 Đã kết nối phòng ' + cleanPin + '! Chờ Host bắt đầu...');
                    });

                    conn.on('error', (err) => {
                        if (onStatusCallback) onStatusCallback(false, 'Không thể kết nối tới phòng ' + cleanPin + '. Vui lòng kiểm tra lại mã PIN.');
                    });
                });
            } catch (e) {
                // Fallback nếu PeerJS lỗi
                this.isHost = false;
                this.roomCode = cleanPin;
                this.broadcast({
                    type: 'PLAYER_JOIN_REQUEST',
                    player: this.buildSelfEntry()
                });
                if (onStatusCallback) onStatusCallback(true, '🟢 Đã gửi yêu cầu vào phòng ' + cleanPin + ' (Chế độ Cục bộ).');
            }
        } else {
            this.isHost = false;
            this.roomCode = cleanPin;
            this.broadcast({
                type: 'PLAYER_JOIN_REQUEST',
                player: this.buildSelfEntry()
            });
            if (onStatusCallback) onStatusCallback(true, '🟢 Đã gửi yêu cầu vào phòng ' + cleanPin + '.');
        }

        return true;
    }

    startRoomByHost() {
        this.roomState = 'RUNNING';
        this.broadcast({ type: 'HOST_START_GAME' });
        if (typeof this.onRoomStarted === 'function') this.onRoomStarted();
        this.startBotSimulation();
    }

    resetRoomByHost() {
        this.roomState = 'LOBBY';
        this.resetScores();
        this.broadcast({ type: 'HOST_RESET_ROOM' });
    }

    syncRoomState() {
        this.broadcast({
            type: 'ROOM_STATE_SYNC',
            roomState: this.roomState,
            roomCode: this.roomCode,
            players: this.players
        });
    }

    resetScores() {
        for (const id of Object.keys(this.players)) {
            this.players[id].score = 0;
            this.players[id].streak = 0;
            this.players[id].hp = 100;
        }
        this.shield = 200;
        this.currentStreak = 0;
    }

    startBotSimulation() {
        this.clearBotSimulation();

        // Mô phỏng các tập đoàn AI trả lời câu hỏi và tranh giành điểm
        this.botInterval = setInterval(() => {
            if (this.roomState !== 'RUNNING') return;

            const bots = Object.values(this.players).filter(p => p.isBot);
            if (!bots.length) return;

            const bot = bots[Math.floor(Math.random() * bots.length)];
            const correct = Math.random() < (bot.meta ? bot.meta.accuracy : 0.78);

            if (correct) {
                const speed = bot.meta ? bot.meta.speed : 0.75;
                const speedBonus = Math.round((speed * 0.7 + Math.random() * 0.3) * 450);
                bot.score += 1000 + speedBonus;
                bot.streak = (bot.streak || 0) + 1;

                // Đối thủ AI chọn mục tiêu để bắn đạn qua ngôi sao
                const candidates = Object.keys(this.players).filter(id => id !== bot.id);
                if (candidates.length) {
                    const targetId = candidates[Math.floor(Math.random() * candidates.length)];
                    const targetPlayer = this.players[targetId];
                    if (targetPlayer) {
                        const dmg = 15;
                        const newHp = Math.max(0, (targetPlayer.hp || 100) - dmg);
                        targetPlayer.hp = newHp;

                        if (targetId === this.playerId) {
                            this.shield = Math.max(0, this.shield - dmg);
                            if (typeof this.onAttackedByRival === 'function') {
                                this.onAttackedByRival(bot.name, dmg, this.shield, bot.id);
                            }
                        } else {
                            if (typeof this.onCompetitorDamaged === 'function') {
                                this.onCompetitorDamaged(targetId, newHp, dmg, bot.id);
                            }
                        }
                    }
                }
            } else {
                bot.streak = 0;
                bot.hp = Math.max(10, (bot.hp || 100) - 10);
            }

            this.triggerLeaderboardUpdate();
        }, 4200);
    }

    clearBotSimulation() {
        if (this.botInterval) {
            clearInterval(this.botInterval);
            this.botInterval = null;
        }
    }

    updatePlayerProfile(name, avatar) {
        const clean = (name || '').trim();
        if (!clean) return false;

        this.playerName = clean.slice(0, 22);
        if (avatar) this.playerAvatar = avatar;

        this.writeStorage(this.nameKey, this.playerName);
        this.writeStorage(this.avatarKey, this.playerAvatar);

        this.ensureSelfEntry();
        this.players[this.playerId].name = this.playerName;
        this.players[this.playerId].avatar = this.playerAvatar;

        this.broadcast({
            type: 'PLAYER_PROFILE_CHANGED',
            playerId: this.playerId,
            name: this.playerName,
            avatar: this.playerAvatar
        });

        this.triggerLeaderboardUpdate();
        this.emitPlayerList();
        return true;
    }

    triggerLeaderboardUpdate() {
        if (typeof this.onLeaderboardUpdate === 'function') {
            this.onLeaderboardUpdate(this.getSortedLeaderboard());
        }
    }

    emitPlayerList() {
        if (typeof this.onPlayerListChange === 'function') {
            this.onPlayerListChange(this.getPlayerList());
        }
    }
}

const multiplayer = new MarketMultiplayer();
window.multiplayer = multiplayer;
