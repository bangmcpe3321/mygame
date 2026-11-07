/**
 * HỆ THỐNG PHÒNG CHƠI (HOST/PLAYER), BẢNG XẾP HẠNG TRỰC TIẾP & TÍNH ĐIỂM QUIZIZZ
 * Phiên bản Sci-Fi: Aegis Protocol: Starfall
 */

class OdysseyMultiplayer {
    constructor() {
        this.channelName = "aegis_game_room_channel";
        this.storageKey = "aegis_multiplayer_state_v1";
        this.channel = null;

        // Trạng thái phiên chơi
        this.isHost = false;
        this.roomCode = "AEGIS-7";
        this.roomState = "LOBBY"; // LOBBY, RUNNING, ENDED

        // Tên & Avatar tùy chỉnh của người chơi
        const savedName = localStorage.getItem("aegis_player_name") || localStorage.getItem("odyssey_player_name");
        const savedAvatar = localStorage.getItem("aegis_player_avatar") || localStorage.getItem("odyssey_player_avatar");
        this.playerName = savedName || "Unit-07";
        this.playerAvatar = savedAvatar || "🤖";
        this.playerId = "p_" + Math.random().toString(36).substring(2, 9);
        
        // Dữ liệu người chơi & điểm
        this.players = {};
        this.currentStreak = 0;
        this.enableBots = true;
        this.botInterval = null;

        // Callback kết nối với Game Engine
        this.onRoomStarted = null;
        this.onLeaderboardUpdate = null;
        this.onPlayerListChange = null;

        this.initCommunication();
        this.loadInitialState();
    }

    initCommunication() {
        try {
            if (window.BroadcastChannel) {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleMessage(event.data);
            }
        } catch (e) {
            console.warn("BroadcastChannel not available:", e);
        }

        window.addEventListener('storage', (event) => {
            if (event.key === this.storageKey && event.newValue) {
                try {
                    const data = JSON.parse(event.newValue);
                    this.handleMessage(data);
                } catch (e) {}
            }
        });
    }

    broadcast(data) {
        data.timestamp = Date.now();
        if (this.channel) {
            this.channel.postMessage(data);
        }
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {}
    }

    handleMessage(msg) {
        if (!msg || !msg.type) return;

        switch (msg.type) {
            case "ROOM_STATE_SYNC":
                this.roomState = msg.roomState;
                this.players = msg.players || {};
                // Bảo đảm giữ thông tin bản thân nếu đã có
                if (!this.players[this.playerId]) {
                    this.players[this.playerId] = {
                        id: this.playerId,
                        name: this.playerName,
                        avatar: this.playerAvatar,
                        score: 0,
                        streak: 0,
                        isSelf: true
                    };
                }
                this.triggerLeaderboardUpdate();
                if (this.onPlayerListChange) this.onPlayerListChange();
                break;

            case "HOST_START_GAME":
                this.roomState = "RUNNING";
                if (this.onRoomStarted) this.onRoomStarted();
                break;

            case "PLAYER_NAME_CHANGED":
                if (msg.playerId && this.players[msg.playerId]) {
                    this.players[msg.playerId].name = msg.newName;
                    if (msg.newAvatar) this.players[msg.playerId].avatar = msg.newAvatar;
                    this.triggerLeaderboardUpdate();
                    if (this.onPlayerListChange) this.onPlayerListChange();
                    if (this.isHost) this.syncRoomState();
                }
                break;

            case "PLAYER_ANSWERED":
                if (msg.playerId && this.players[msg.playerId]) {
                    this.players[msg.playerId].score = msg.score;
                    this.players[msg.playerId].streak = msg.streak;
                    this.players[msg.playerId].lastBonus = msg.speedBonus;
                    this.players[msg.playerId].lastAnswerTime = Date.now();
                    this.triggerLeaderboardUpdate();
                    if (this.isHost) this.syncRoomState();
                }
                break;

            case "PLAYER_JOINED":
                if (msg.player) {
                    this.players[msg.player.id] = msg.player;
                    this.triggerLeaderboardUpdate();
                    if (this.onPlayerListChange) this.onPlayerListChange();
                    if (this.isHost) this.syncRoomState();
                }
                break;

            case "HOST_RESET_ROOM":
                this.roomState = "LOBBY";
                this.resetScores();
                this.triggerLeaderboardUpdate();
                break;
        }
    }

    // ==========================================
    // THAY ĐỔI TÊN NGƯỜI CHƠI & AVATAR
    // ==========================================
    setPlayerProfile(name, avatar) {
        if (!name || name.trim() === "") return;
        this.playerName = name.trim();
        if (avatar) this.playerAvatar = avatar;

        localStorage.setItem("odyssey_player_name", this.playerName);
        if (avatar) localStorage.setItem("odyssey_player_avatar", this.playerAvatar);

        if (this.players[this.playerId]) {
            this.players[this.playerId].name = this.playerName;
            this.players[this.playerId].avatar = this.playerAvatar;
        }

        // Phát tín hiệu đổi tên cho toàn bộ phòng
        this.broadcast({
            type: "PLAYER_NAME_CHANGED",
            playerId: this.playerId,
            newName: this.playerName,
            newAvatar: this.playerAvatar
        });

        this.triggerLeaderboardUpdate();
        if (this.onPlayerListChange) this.onPlayerListChange();
    }

    setAsHost(enable) {
        this.isHost = enable;
        if (this.isHost) {
            this.roomCode = "ODY-" + Math.floor(1000 + Math.random() * 9000);
            this.roomState = "LOBBY";
            this.initDefaultPlayers();
            this.syncRoomState();
        }
    }

    initDefaultPlayers() {
        this.players = {};
        
        // Người chơi chính
        this.players[this.playerId] = {
            id: this.playerId,
            name: this.playerName,
            avatar: this.playerAvatar,
            score: 0,
            streak: 0,
            isSelf: true
        };

        // Các chiến binh người máy mô phỏng thi đấu
        if (this.enableBots) {
            const sciFiBots = [
                { id: "bot_1", name: "Titan-Prime", avatar: "🤖", baseSpeed: 0.85, accuracy: 0.9 },
                { id: "bot_2", name: "Nova-Valkyrie", avatar: "⚡", baseSpeed: 0.75, accuracy: 0.8 },
                { id: "bot_3", name: "Cyber-Aegis", avatar: "🛡️", baseSpeed: 0.65, accuracy: 0.75 },
                { id: "bot_4", name: "Specter-9", avatar: "🎯", baseSpeed: 0.7, accuracy: 0.8 },
                { id: "bot_5", name: "Vortex-Core", avatar: "🔮", baseSpeed: 0.8, accuracy: 0.85 }
            ];

            sciFiBots.forEach(w => {
                this.players[w.id] = {
                    id: w.id,
                    name: w.name,
                    score: 0,
                    streak: 0,
                    avatar: w.avatar,
                    isBot: true,
                    meta: w
                };
            });
        }
    }

    loadInitialState() {
        this.initDefaultPlayers();
    }

    syncRoomState() {
        this.broadcast({
            type: "ROOM_STATE_SYNC",
            roomState: this.roomState,
            roomCode: this.roomCode,
            players: this.players
        });
    }

    startRoomByHost() {
        this.roomState = "RUNNING";
        this.broadcast({
            type: "HOST_START_GAME",
            roomCode: this.roomCode
        });
        if (this.onRoomStarted) this.onRoomStarted();

        if (this.enableBots) {
            this.startBotSimulation();
        }
    }

    resetRoomByHost() {
        this.roomState = "LOBBY";
        this.resetScores();
        this.broadcast({
            type: "HOST_RESET_ROOM",
            roomCode: this.roomCode
        });
    }

    resetScores() {
        for (let pid in this.players) {
            this.players[pid].score = 0;
            this.players[pid].streak = 0;
            this.players[pid].lastBonus = 0;
        }
        this.currentStreak = 0;
    }

    startBotSimulation() {
        if (this.botInterval) clearInterval(this.botInterval);
        
        this.botInterval = setInterval(() => {
            if (this.roomState !== "RUNNING") return;
            
            const botIds = Object.keys(this.players).filter(id => this.players[id].isBot);
            if (botIds.length === 0) return;

            const randomBotId = botIds[Math.floor(Math.random() * botIds.length)];
            const bot = this.players[randomBotId];

            if (Math.random() < bot.meta.accuracy) {
                const speedBonus = Math.floor(Math.random() * 380 + 100);
                const baseScore = 1000;
                bot.streak = (bot.streak || 0) + 1;
                const streakBonus = Math.min(300, bot.streak * 70);
                bot.score += (baseScore + speedBonus + streakBonus);
            } else {
                bot.streak = 0;
            }

            this.triggerLeaderboardUpdate();
        }, 3200);
    }

    // ==========================================
    // CÔNG THỨC TÍNH ĐIỂM QUIZIZZ SPEED BONUS
    // ==========================================
    calculateQuizizzScore(isCorrect, timeRemainingSec, totalTimeSec = 15) {
        if (!isCorrect) {
            this.currentStreak = 0;
            this.updatePlayerScore(0, 0, 0);
            return {
                basePoints: 0,
                speedBonus: 0,
                streakBonus: 0,
                totalPoints: 0,
                streak: 0
            };
        }

        const basePoints = 1000;
        const speedRatio = Math.max(0, Math.min(1, timeRemainingSec / totalTimeSec));
        const speedBonus = Math.round(speedRatio * 500);

        this.currentStreak++;
        const streakBonus = Math.min(300, (this.currentStreak - 1) * 100);
        const totalPoints = basePoints + speedBonus + streakBonus;

        this.updatePlayerScore(totalPoints, speedBonus, this.currentStreak);

        return {
            basePoints,
            speedBonus,
            streakBonus,
            totalPoints,
            streak: this.currentStreak
        };
    }

    updatePlayerScore(addedScore, speedBonus, streak) {
        if (!this.players[this.playerId]) {
            this.players[this.playerId] = {
                id: this.playerId,
                name: this.playerName,
                avatar: this.playerAvatar,
                score: 0,
                streak: 0,
                isSelf: true
            };
        }

        this.players[this.playerId].score += addedScore;
        this.players[this.playerId].streak = streak;
        this.players[this.playerId].lastBonus = speedBonus;

        this.broadcast({
            type: "PLAYER_ANSWERED",
            playerId: this.playerId,
            score: this.players[this.playerId].score,
            streak: this.players[this.playerId].streak,
            speedBonus: speedBonus
        });

        this.triggerLeaderboardUpdate();
    }

    getSortedLeaderboard() {
        const list = Object.values(this.players);
        list.sort((a, b) => b.score - a.score);
        return list;
    }

    triggerLeaderboardUpdate() {
        if (this.onLeaderboardUpdate) {
            this.onLeaderboardUpdate(this.getSortedLeaderboard());
        }
    }
}

const multiplayer = new OdysseyMultiplayer();
