# 🏛️ Odyssey: The Epic Voyage

Trò chơi trắc nghiệm tương tác sử thi ngắn theo chủ đề **Sử thi Odyssey** của Homer, được xây dựng bằng công nghệ Web thuần túy (HTML5, CSS3, JavaScript, SVG Animations & Web Audio API) – sẵn sàng chạy trực tiếp trên trình duyệt hoặc host miễn phí trên **GitHub Pages**.

---

## 📖 Cốt Truyện & 3 Thử Thách

Trò chơi theo chân người anh hùng **Odysseus** và các binh sĩ Hy Lạp trên hành trình trở về quê hương Ithaca sau chiến tranh thành Troy:

1. **Thử thách 1: Hang đá Cyclops (Polyphemus)**
   * **Bối cảnh:** Cửa hang đá tối tăm nơi người khổng lồ một mắt giam giữ nhóm lính.
   * **Khi trả lời sai:** Polyphemus rống lên kinh hoàng đe dọa cửa hang, rung chuyển đất trời.
   * **Khi trả lời đúng:** Một mũi tên xé gió bắn trúng tên quái vật.
   * **Kết thúc thử thách:** Odysseus và đồng đội dồn sức đâm cọc lửa vào mắt Cyclops, mở đường thoát thân.

2. **Thử thách 2: Vùng biển Siren ma mị**
   * **Bối cảnh:** Chiếc thuyền Hy Lạp lướt trên làn sóng mù sương, phía xa là hòn đảo đá với bóng đen các nàng Siren ma mị. Odysseus bị trói chặt vào cột buồm và bịt mắt.
   * **Khi trả lời sai:** Odysseus quằn quại gào thét trong cơn căng thẳng tột độ (bong bóng thoại kêu gào), một thủy thủ không cưỡng lại được khúc ca mê hoặc đã nhảy xuống biển.
   * **Khi trả lời đúng:** Thủy thủ đoàn vững tay chèo, không ai nhảy khỏi thuyền; các bóng đen Siren phía xa rít lên giận dữ.
   * **Kết thúc thử thách:** Con thuyền kiên cường rẽ sóng vượt qua màn sương mù bí hiểm.

3. **Thử thách 3: Eo biển tử thần Scylla & Charybdis**
   * **Bối cảnh:** Đoàn thuyền tiến vào khe núi hẹp giữa biển, một bên là vực xoáy Charybdis cuồn cuộn hút nước, phía đối diện là vách đá nơi quái thú 6 đầu Scylla chặn lối.
   * **Khi trả lời đúng:** Odysseus vung thanh gươm đồng tung đòn chém đứt móng vuốt / đẩy lùi một chiếc đầu Scylla.
   * **Khi trả lời sai:** Scylla lao xuống đớp vỡ be thuyền gây hoảng loạn tột cùng cho thủy thủ.
   * **Kết thúc mở:** Con tàu bứt tốc thoát khỏi eo biển tử thần, hướng về chân trời bao la nơi quê nhà Ithaca vẫn đang chờ đón phía trước.

---

## 🛠️ Cấu Trúc Dự Án

```
mygame/
├── index.html            # Trang giao diện chính của game
├── style.css             # Giao diện Hy Lạp cổ đại & toàn bộ animation CSS
├── data/
│   └── questions.js      # Cốt truyện mở đầu, chuyển màn, kết thúc và ngân hàng câu hỏi
├── js/
│   ├── audio.js          # Hệ thống âm thanh sử thi (Web Audio API không cần file MP3 ngoài)
│   ├── visuals.js        # Đồ họa vector động SVG cho 3 màn chơi
│   └── game.js           # Trình điều khiển logic game, tính điểm và vòng lặp
└── README.md             # Hướng dẫn chi tiết
```

---

## ✍️ Cách Thêm / Chỉnh Sửa Câu Hỏi

Mở tệp [`data/questions.js`](data/questions.js). Mỗi thử thách (`cyclops`, `sirens`, `scylla`) là một danh sách câu hỏi:

```javascript
{
    id: "c5", // Mã câu hỏi
    question: "Câu hỏi bạn muốn đưa ra?",
    options: [
        "Lựa chọn A",
        "Lựa chọn B",
        "Lựa chọn C",
        "Lựa chọn D"
    ],
    correctIndex: 1, // Vị trí đáp án đúng: 0 là A, 1 là B, 2 là C, 3 là D
    explanation: "Lời giải thích thú vị hiển thị sau khi người chơi trả lời."
}
```

Bạn có thể thêm bao nhiêu câu hỏi tùy thích vào bất kỳ thử thách nào, hệ thống sẽ tự động tính toán số câu hỏi và tạo các chấm tiến trình tương ứng!

---

## 🚀 Cách Đưa Lên GitHub Pages (Chơi Trực Tiếp Online)

1. Tạo một repository mới trên GitHub (khuyên dùng đặt chế độ **Public** để dùng GitHub Pages miễn phí).
2. Tải toàn bộ mã nguồn trong thư mục này lên repository.
3. Vào mục **Settings** của repository trên GitHub:
   * Chọn mục **Pages** ở cột menu bên trái.
   * Tại **Build and deployment** -> **Source**, chọn **Deploy from a branch**.
   * Nhánh (Branch): chọn **`main`** (hoặc `master`), thư mục giữ nguyên **`/(root)`**, sau đó nhấn **Save**.
4. Chờ 1–2 phút, GitHub sẽ cung cấp đường link dạng:
   `https://<ten-user>.github.io/<ten-repo>/`
   để bất kỳ ai cũng có thể vào chơi trực tiếp trên máy tính hoặc điện thoại!

