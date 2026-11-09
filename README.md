# TRÀ MỘC · AEGIS PROTOCOL — Độc Quyền: Quyền Lực & Cái Giá

Game kết hợp **Đấu Trường Chiến Đấu Theo Lượt (Turn-Based Card RPG)** cùng **Mô Phỏng Kinh Tế & Bài Học Triết Học Mác – Lênin**.
Nhóm 4 · Học phần Triết học Mác – Lênin (2026).

Một game trình duyệt thuần HTML/CSS/JavaScript: **không build, không server, không phụ thuộc**.
Mở `index.html` là chơi.

---

## Cốt truyện & Bối cảnh

Năm 2124, trên **Liên bang Vành đai** — một nền văn minh sống trong các trạm không gian và vành quỹ đạo:
Trên hải trình vận tải nguyên liệu lá Mộc thủy canh qua dải thiên thạch, phi thuyền Aegis bất ngờ gặp bão thiên thạch và va chạm hạ cánh khẩn cấp. Lớp vỏ tàu bị thủng, bầy quái vật ngoài hành tinh dạng Xenomorph ồ ạt tràn vào đe dọa trạm và cơ sở kinh doanh.

Bạn chỉ huy **Robot Bảo An UNIT-07** (trang bị súng Plasma Blaster và khiên 200 HP). Nhiệm vụ của bạn là nạp đạn Plasma bằng các câu hỏi tri thức Triết học Mác – Lênin, tiêu diệt bầy dị vật qua 3 khu vực chiến trường (`Kho Hàng`, `Lò Phản Ứng`, `Cầu Tàu`), đồng thời đưa ra 36 quyết định chiến lược để xây dựng thương hiệu Trà Mộc, giải mã bản chất của Độc Quyền và phát cột Hải Đăng Cứu Hộ S.O.S!

Luận đề của game:

> Quá trình tích tụ và tập trung tư bản tất yếu sinh ra độc quyền.
> Mỗi lựa chọn trên thương trường đều đi kèm cái giá phải trả.

---

## Cơ chế Đấu Trường RPG & Minh họa AI sống động

- **Đấu trường Thẻ bài trực quan (Visual Theater):**
  - **Bên trái:** Thẻ bài Robot Unit-07 với thanh Khiên Năng Lượng 200 HP, nòng súng phát sáng, màng bảo vệ khiên.
  - **Bên phải:** Đội hình thẻ bài Dị vật ngoài hành tinh (Swarm Drones 1 HP, Xeno Brutes 2 HP, và Nữ Chúa Hive Queen Boss 4 HP có thanh máu vương miện).
  - **Khóa mục tiêu (Target Lock):** Bấm chuột vào bất kỳ quái vật nào để khóa tâm ngắm.
- **Hoạt ảnh & Hiệu ứng chiến đấu (Combat FX):**
  - **Trả lời đúng:** Robot giật súng bắn tia Plasma xanh lá bay xé gió qua màn hình, tạo vụ nổ tia lửa hạt, trừ máu quái vật, số sát thương `-1 HP` / `💥 TIÊU DIỆT!` nổi lên kèm khói tan biến acid.
  - **Trả lời sai hoặc hết giờ:** Dị vật lao tới cắn xé, màn hình rung lắc chớp đỏ, khiên Robot tụt 15 HP kèm còi báo động khẩn cấp.
- **Hoạt cảnh truyện tranh điện ảnh (Cinematic Comic Cutscenes):**
  - Phân cảnh mở đầu: Bão thiên thạch, Hạ cánh khẩn cấp, Dị vật tập kích với hiệu ứng Ken Burns và tàn tro không gian bốc lên từ canvas.
  - Phân cảnh chuyển Hồi: Modal dẫn truyện chuyển giao giữa Kho Hàng, Lò Phản Ứng và Cầu Tàu.
  - Phân cảnh kết thúc: Nữ Chúa gục ngã, Robot cắm thẻ kích hoạt Cột Hải Đăng Cứu Hộ S.O.S vút vào dải Ngân Hà.

---

## Sáu chỉ số thị trường

Toàn bộ kết cục được quyết định bởi sáu chỉ số, tồn tại xuyên suốt 12 chương và **không bao giờ được
reset giữa chương**:

| Chỉ số | Ký hiệu | Ý nghĩa |
| --- | --- | --- |
| Vốn | 💰 | Tiền mặt, tính bằng `cr` (tín dụng) |
| Thị phần | 📊 | Phần trăm thị trường trà của Vành đai |
| Uy tín thương hiệu | ◈ | Mức độ được nể trọng |
| Niềm tin người tiêu dùng | ♡ | Mức độ được tin tưởng |
| Quan hệ chính quyền | ⌂ | Thiện chí của Hội đồng |
| Áp lực pháp lý | § | Càng cao càng gần điều tra và chế tài |

Áp lực pháp lý là chỉ số duy nhất **càng thấp càng tốt** — nó được tô đỏ khi vượt ngưỡng.

## Vòng chơi

Mỗi chương gồm hai bước:

1. **Câu hỏi tri thức** — bốn lựa chọn, không giới hạn thời gian (người chơi có thể đọc kỹ và suy nghĩ thấu đáo). Trả lời đúng được cộng điểm
   (`1000 + tốc độ + chuỗi`). Sai thì bị quái vật phản kích, nhưng **không chặn câu chuyện**.
2. **Quyết định chiến lược** — ba lựa chọn. Mỗi lựa chọn có mô tả, tác động chỉ số, hệ quả thực tế
   và một thẻ tri thức được mở khoá.

Một số lựa chọn bị **khoá sau ngưỡng chỉ số** (ví dụ: cần Uy tín ≥ 18 mới dám đề nghị sáp nhập ngược).
Nút bị khoá hiển thị rõ phần còn thiếu, ví dụ `🔒 Uy tín ≥ 18 (hiện 12)`.

Điểm số phục vụ bảng xếp hạng và chuỗi thắng. **Điểm không quyết định kết cục — sáu chỉ số mới quyết định.**

## Mười hai chương, ba hồi

| Hồi | Chương | Chủ đề |
| --- | --- | --- |
| HỒI I · Khởi nghiệp | 1 – 4 | Một quầy nhỏ học cách tồn tại |
| HỒI II · Mở rộng | 5 – 8 | Thị phần và cái giá của nó |
| HỒI III · Phán quyết | 9 – 12 | Quyền lực đứng trước luật chơi |

Các chương đi từ giá bán và chuỗi cung ứng, qua sáp nhập và bán phá giá, đến công chúng, nhà nước,
lao động, nền tảng, cartel, điều tra chống độc quyền và hiến chương thị trường.

## Sáu kết thúc

| Mã | Kết thúc | Điều kiện điển hình |
| --- | --- | --- |
| 01 · Quyền lực | ♛ **Đế chế độc quyền** | Thị phần ≥ 62%, niềm tin thấp, đã thôn tính nhiều lần |
| 02 · Pháp lý | ⚖ **Ngày công ty bị chia tách** | Áp lực pháp lý ≥ 80 |
| 03 · Sinh tồn | ◌ **Khi kết sắt trống rỗng** | Vốn ≤ 8 |
| 04 · Bền vững | ✦ **Dẫn đầu nhờ đổi mới** | Uy tín tốt, niềm tin ≥ 45 |
| 05 · Niềm tin | ✕ **Bị tẩy chay** | Niềm tin ≤ 12 |
| 06 · Bí mật | ❖ **Hiến chương Mộc** | Niềm tin ≥ 70, uy tín ≥ 55, chính quyền ≥ 60, pháp lý thấp |

Thứ tự ưu tiên khi xét kết cục: phá sản → chia tách → tẩy chay → hiến chương → đế chế → đổi mới.
Logic nằm ở `resolveEnding()` trong `data/story.js`.

## Mười tám thẻ tri thức

Mỗi quyết định mở một thẻ; trả lời đúng một số câu hỏi mở thêm thẻ phụ. Thẻ được lưu trong
**ngăn kéo Thẻ tri thức** (nút 🗂 trên thanh đầu trang) và hiển thị tên, khái niệm tóm tắt và
phân tích chuyên sâu.

`Cạnh tranh` · `Chiến tranh giá` · `Độc quyền tư nhân` · `Độc quyền nhà nước` ·
`Lợi nhuận độc quyền` · `Thôn tính & sáp nhập` · `Thao túng giá` · `Luật chống độc quyền` ·
`Cartel` · `Thị phần` · `Bán phá giá` · `Niềm tin người tiêu dùng` · `Đổi mới sáng tạo` ·
`Trách nhiệm xã hội` · `Chia tách doanh nghiệp` · `Liên minh cạnh tranh` ·
`Người tiêu dùng` · `Hiến chương thị trường`

## Tính năng nhiều người chơi

- **Hồ sơ**: đổi tên và avatar (mười biểu tượng), lưu vào `localStorage`.
- **Bảng xếp hạng trực tiếp**: bạn cùng năm đối thủ máy (Vệ Tinh Xanh, Thương Nhân Sao, Quỹ Đầu Tư Vành,
  Kiểm Toán Viên, Lữ Khách Ga). Đối thủ trả lời theo nhịp 3,8 giây khi phòng đang chạy.
- **Phòng Host**: mã phòng dạng `MOC-xxxx`, danh sách người chơi, nút bắt đầu và đặt lại.
- Đồng bộ giữa các tab cùng máy qua `BroadcastChannel` + sự kiện `storage`.

## Điều khiển bàn phím

| Phím | Tác dụng |
| --- | --- |
| `1` – `4` hoặc `A` – `D` | Chọn đáp án |
| `Enter` / `Space` | Sang bước quyết định, sang chương tiếp |
| `1` – `3` | Chọn một trong ba quyết định |
| `Esc` | Đóng ngăn kéo hoặc hộp thoại |

## Bố cục

Ứng dụng chiếm trọn chiều cao màn hình, **không cuộn trang** trên desktop:

```
header            (hồ sơ · điểm · thẻ · xếp hạng · host · âm thanh)
progress-strip    (3 hồi, cuộn ngang nếu hẹp)
market-bar        (6 chỉ số)
game-viewport     ├── brief-panel   (tóm tắt chương — tự cuộn bên trong)
                  └── play-panel    (câu hỏi / lựa chọn / hệ quả)
```

Chỉ bảng tóm tắt bên trái tự cuộn khi nội dung dài. Bốn nút đáp án luôn nằm trong khung nhìn.
Dưới 880px bố cục chuyển thành một cột và trang được phép cuộn dọc.

## Trợ năng

Điều khiển hoàn toàn bằng bàn phím, vòng focus hiển thị rõ, thông báo qua `aria-live`,
và tôn trọng `prefers-reduced-motion` (tắt toàn bộ hoạt ảnh).

## Cấu trúc mã nguồn

```
mygame/
├── index.html            # Khung ứng dụng, đấu trường visual-theater, HUD, Timer & Sảnh chờ Host
├── style.css             # Giao diện Sci-Fi, đấu trường arena, hoạt ảnh súng Plasma, đạn bay, nổ va chạm
├── data/
│   └── story.js          # 12 chương Triết học Mác - Lênin, 6 chỉ số, 18 thẻ tri thức, 6 kết cục, cinematics
├── js/
│   ├── cinematic.js      # Hoạt cảnh truyện tranh mở đầu & kết thúc (Ken Burns, Canvas Particle System)
│   ├── visuals.js        # Đấu trường RPG theo lượt, hoạt ảnh Robot bắn Plasma và quái vật phản kích
│   ├── audio.js          # Hệ thống âm thanh Web Audio API (Laser, Alien Hit, Acid Death, Klaxon, Beacon, Streak)
│   ├── multiplayer.js    # Bảng xếp hạng trực tiếp & quản trị phòng Host
│   └── game.js           # Bộ điều khiển vòng lặp chính tích hợp chiến đấu và quyết định thị trường
└── assets/               # Đồ họa tranh AI (Robot Unit-07, quái vật ngoài hành tinh, hình nền 3 khu vực, cinematic)
```

Tất cả script là thẻ `<script>` cổ điển dùng chung biến toàn cục — không module, không bundler.
Thứ tự nạp: `data/story.js` → `js/cinematic.js` → `js/visuals.js` → `js/audio.js` → `js/multiplayer.js` → `js/game.js`.

### Chỉnh sửa nội dung

Mọi câu chữ nằm trong `data/story.js`. Thêm hoặc sửa một chương chỉ cần sửa `CHAPTERS`;
giao diện tự sinh theo đúng cấu trúc dữ liệu:

```js
{
  id, act, year, place, stage, title, scene,
  situation: [ '...', '...' ],
  dialogue: { speaker, text },
  question: { prompt, options: [4], correctIndex, explanation, insightCard? },
  choices: [
    {
      title, desc,
      deltas: { capital, share, reputation, trust, gov, legal },
      outcome,
      card,                 // slug trong CARDS
      require?              // { tenChiSo: nguongToiThieu }
    }
  ]
}
```

## Ghi chú

- Tiền tệ trong game là `cr` (tín dụng), không phải `đồng`.
- Kịch bản gốc được lưu ở `STORY.md`; bản trong game đã chuyển bối cảnh từ Trái Đất sang Vành đai
  nhưng giữ nguyên toàn bộ số liệu tác động chỉ số và nội dung lý luận.
- Toàn bộ ảnh mỹ thuật số AI trong `assets/` được liên kết trực tiếp vào Đấu trường chiến đấu (`visuals.js`) và Hoạt cảnh điện ảnh (`cinematic.js`).
