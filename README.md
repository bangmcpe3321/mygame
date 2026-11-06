# 🏛️ Odyssey: The Epic Voyage (Quizizz & Realistic Edition)

Trò chơi trắc nghiệm tương tác sử thi theo chủ đề **Sử thi Odyssey** của Homer, được thiết kế với phong cách đồ họa Hy Lạp cổ đại tả thực, hệ thống tính điểm tốc độ kiểu **Quizizz**, bảng xếp hạng trực tiếp (Live Leaderboard) và trường đoạn điện ảnh trận chiến thành Troy.

---

## 🌟 Các Tính Năng Mới Nổi Bật

### 1. Trường Đoạn Điện Ảnh Mở Đầu Tả Thực (Troy Cinematic)
* **Khung cảnh 1:** Đêm thành Troy huyền thoại với **Con Ngựa Gỗ Khổng Lồ (Trojan Horse)** sừng sững trước cổng thành Skaian, mưu trí của Odysseus mở toang cổng thành.
* **Khung cảnh 2:** Biển lửa ngút trời thiêu rụi thành Troy, đền thờ và cung điện Priam sụp đổ trong tro tàn.
* **Khung cảnh 3:** Hạm đội chiến thuyền Hy Lạp rẽ sóng rời bến bờ rực lửa tiến vào biển Aegean giông bão.
* Tích hợp hiệu ứng hạt tàn tro than hồng lơ lửng (Ember Particle System) và chuyển động máy quay điện ảnh Ken Burns.

### 2. Tự Động Chuyển Cảnh Ngay Sau Khi Trả Lời (Auto-Advance)
* Người chơi không cần phải bấm thêm nút nào trên màn hình.
* Khi nhấp chọn đáp án, hệ thống ngay lập tức kích hoạt hoạt họa hành động (mũi tên bắn, Cyclops rống, lính nhảy thuyền, chém kiếm Scylla) và tự động chuyển câu sau 1.8 giây.

### 3. Hệ Thống Phòng Chơi Host & Leaderboard Trực Tiếp (Multiplayer & Room PIN)
* **Chế độ Host:** 
  * Cung cấp **Mã phòng (Room PIN)** để người chơi tham gia.
  * Trò chơi chỉ bắt đầu và mở khóa đồng loạt khi Host bấm **🚀 BẮT ĐẦU / DEPLOY GAME CHO MỌI NGƯỜI**.
  * Nút **🔄 RESET BẢNG ĐIỂM** cho phép làm mới điểm số sau khi kết thúc để chuẩn bị cho lượt chơi tiếp theo.
* **Bảng xếp hạng thời gian thực (Live Leaderboard Drawer):**
  * Hiển thị bảng thứ hạng 1, 2, 3 (Huy chương Vàng 🥇, Bạc 🥈, Đồng 🥉), tên người chơi, điểm số và chuỗi Streak.
  * Tích hợp sẵn dàn chiến binh Hy Lạp mô phỏng (Achilles, Diomedes, Ajax, Telemachus, Penelope) thi đấu trực tiếp, giúp bảng xếp hạng nhảy điểm kịch tính như phòng thi đấu Quizizz thực thụ.

### 4. Điểm Thưởng Tốc Độ (Speed Bonus) & Combo Streak Kiểu Quizizz
* **Đồng hồ đếm ngược 15 giây:** Thanh thời gian đổi màu sinh động từ Xanh ➔ Cam ➔ Đỏ kèm tiếng tíc tắc trong 4 giây cuối.
* **Công thức tính điểm:**
  $$\text{Tổng điểm} = 1000 \text{ (Cơ bản)} + \text{Speed Bonus (Tối đa } +500\text{)} + \text{Streak Bonus (Chuỗi đúng)}$$
* Trả lời sai sẽ nhận $0$ điểm và ngắt chuỗi streak.

---

## 🛠️ Cấu Trúc Dự Án

```
mygame/
├── index.html            # Giao diện chính, Timer, Leaderboard & Sảnh chờ Host
├── style.css             # Giao diện tả thực, hoạt họa SVG, Ken Burns & hiệu ứng điểm
├── data/
│   └── questions.js      # Lời dẫn truyện 3 màn và ngân hàng câu hỏi
├── js/
│   ├── cinematic.js      # Hoạt cảnh mở đầu thành Troy với hạt than hồng
│   ├── multiplayer.js    # Quản trị phòng chơi Host, tính điểm Quizizz & Leaderboard
│   ├── audio.js          # Hệ thống âm thanh sử thi: War Horn, Ticking, Combo Chime
│   ├── visuals.js        # Đồ họa vector SVG tả thực cho 3 thử thách
│   └── game.js           # Bộ điều khiển vòng lặp chính & tự động chuyển cảnh
└── README.md
```

---

## 🌐 Chơi Trực Tiếp Trên GitHub Pages

Trang web được xuất bản tại:
👉 **`https://hta8819.github.io/mygame/`**
