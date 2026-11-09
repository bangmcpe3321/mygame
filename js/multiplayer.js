/**
 * BẢNG XẾP HẠNG & PHÒNG CHƠI CHUNG
 * ------------------------------------------------------------------
 * Không có máy chủ. Mọi người chơi trên cùng một thiết bị dùng chung
 * một đối tượng; nhiều tab cùng trình duyệt đồng bộ qua BroadcastChannel
 * và localStorage.
 */

class MarketMultiplayer {
    constructor() {
        this.channelName = 'tra_moc_market_channel';
        this.storageKey = 'tra_moc_market_state_v1';
        this.nameKey = 'tra_moc_player_name';
        this.avatarKey = 'tra_moc_player_avatar';

        this.channel = null;
        this.isHost = false;
        this.roomCode = 'MOC-0000';
        this.roomState = 'LOBBY';

        this.playerName = this.readStorage(this.nameKey) || 'Nhà sáng lập';
        this.playerAvatar = this.readStorage(this.avatarKey) || '🍃';
        this.playerId = 'p_' + Math.random().toString(36).slice(2, 9);

        this.players = {};
        this.currentStreak = 0;
        this.enableBots = true;
        this.botInterval = null;

        this.onRoomStarted = null;
        this.onLeaderboardUpdate = null;
        this.onPlayerListChange = null;

        this.initCommunication();
        this.initDefaultPlayers();
    }

    readStorage(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    writeStorage(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* bỏ qua */ }
    }

    initCommunication() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleMessage(event.data);
            } catch (e) {
                this.channel = null;
            }
        }

        window.addEventListener('storage', (event) => {
            if (event.key !== this.storageKey || !event.newValue) return;
            try {
                this.handleMessage(JSON.parse(event.newValue));
            } catch (e) { /* bỏ qua dữ liệu hỏng */ }
        });
    }

    broadcast(payload) {
        payload.timestamp = Date.now();
        if (this.channel) {
            try { this.channel.postMessage(payload); } catch (e) { /* bỏ qua */ }
        }
        this.writeStorage(this.storageKey, JSON.stringify(payload));
    }

    handleMessage(msg) {
        if (!msg || !msg.type) return;

        switch (msg.type) {
            case 'ROOM_STATE_SYNC':
                this.roomState = msg.roomState || this.roomState;
                if (msg.players) this.players = msg.players;
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

            case 'PLAYER_ANSWERED':
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

            default:
                break;
        }
    }

    buildSelfEntry() {
        return {
            id: this.playerId,
            name: this.playerName,
            avatar: this.playerAvatar,
            score: 0,
            streak: 0,
            isSelf: true,
            isBot: false
        };
    }

    ensureSelfEntry() {
        if (!this.players[this.playerId]) {
            this.players[this.playerId] = this.buildSelfEntry();
        }
    }

    initDefaultPlayers() {
        this.players = {};
        this.players[this.playerId] = this.buildSelfEntry();

        if (!this.enableBots) return;

        const bots = [
            { id: 'bot_1', name: 'Vệ Tinh Xanh', avatar: '🛰️', baseSpeed: 0.85, accuracy: 0.9 },
            { id: 'bot_2', name: 'Thương Nhân Sao', avatar: '🛸', baseSpeed: 0.75, accuracy: 0.8 },
            { id: 'bot_3', name: 'Quỹ Đầu Tư Vành', avatar: '💠', baseSpeed: 0.65, accuracy: 0.75 },
            { id: 'bot_4', name: 'Kiểm Toán Viên', avatar: '🧾', baseSpeed: 0.7, accuracy: 0.8 },
            { id: 'bot_5', name: 'Lữ Khách Ga', avatar: '🌌', baseSpeed: 0.8, accuracy: 0.85 }
        ];

        for (const bot of bots) {
            this.players[bot.id] = {
                id: bot.id,
                name: bot.name,
                avatar: bot.avatar,
                score: 0,
                streak: 0,
                isSelf: false,
                isBot: true,
                meta: { baseSpeed: bot.baseSpeed, accuracy: bot.accuracy }
            };
        }
    }

    setAsHost(enable) {
        this.isHost = !!enable;
        if (!this.isHost) return;

        this.roomCode = 'MOC-' + Math.floor(1000 + Math.random() * 9000);
        this.roomState = 'LOBBY';
        this.initDefaultPlayers();
        this.syncRoomState();
        this.emitPlayerList();
    }

    syncRoomState() {
        this.broadcast({
            type: 'ROOM_STATE_SYNC',
            roomState: this.roomState,
            players: this.players
        });
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

    resetScores() {
        for (const id of Object.keys(this.players)) {
            this.players[id].score = 0;
            this.players[id].streak = 0;
        }
        this.currentStreak = 0;
    }

    clearBotSimulation() {
        if (this.botInterval) {
            clearInterval(this.botInterval);
            this.botInterval = null;
        }
    }

    startBotSimulation() {
        this.clearBotSimulation();

        this.botInterval = setInterval(() => {
            if (this.roomState !== 'RUNNING') return;

            const bots = Object.values(this.players).filter((p) => p.isBot);
            if (!bots.length) return;

            const bot = bots[Math.floor(Math.random() * bots.length)];
            const correct = Math.random() < (bot.meta ? bot.meta.accuracy : 0.8);

            if (correct) {
                const speed = bot.meta ? bot.meta.baseSpeed : 0.75;
                const speedBonus = Math.round((speed * 0.72 + Math.random() * 0.28) * 400);
                bot.score += 1000 + speedBonus;
                bot.streak = (bot.streak || 0) + 1;
            } else {
                bot.streak = 0;
            }

            this.triggerLeaderboardUpdate();
        }, 3800);
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

    setPlayerProfile(name, avatar) {
        return this.updatePlayerProfile(name, avatar);
    }

    recordAnswer(isCorrect, scoreAwarded) {
        this.ensureSelfEntry();
        const self = this.players[this.playerId];

        if (isCorrect) {
            this.currentStreak += 1;
            self.score += Math.max(0, Math.round(scoreAwarded) || 0);
            self.streak = this.currentStreak;
        } else {
            this.currentStreak = 0;
            self.streak = 0;
        }

        this.broadcast({
            type: 'PLAYER_ANSWERED',
            playerId: this.playerId,
            score: self.score,
            streak: self.streak
        });

        this.triggerLeaderboardUpdate();
    }

    getSortedLeaderboard() {
        return Object.values(this.players).sort((a, b) => b.score - a.score);
    }

    getRankedPlayers() {
        return this.getSortedLeaderboard();
    }

    getPlayerList() {
        return Object.values(this.players);
    }

    getSelfScore() {
        this.ensureSelfEntry();
        return this.players[this.playerId].score;
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

    startRoomAsHost() {
        return this.startRoomByHost();
    }
}

const multiplayer = new MarketMultiplayer();
window.multiplayer = multiplayer;
