/**
 * DỮ LIỆU TRÒ CHƠI: ĐỘC QUYỀN — QUYỀN LỰC & CÁI GIÁ
 * ------------------------------------------------------------------
 * Chuyển thể từ STORY.md sang bối cảnh không gian: Liên bang Vành đai,
 * 2124–2136, thương hiệu trà thủy canh TRÀ MỘC.
 *
 * 12 chương, 36 lựa chọn, 6 kết cục, 18 thẻ tri thức kinh tế chính trị.
 * Nội dung học thuật (Mác – Lênin) giữ nguyên; chỉ bối cảnh được đổi.
 *
 * Đây là file dữ liệu thuần (không phụ thuộc DOM). Mọi thay đổi cân bằng
 * chỉ số nên thực hiện ở đây, không sửa trong js/game.js.
 */

/* ---------------------------------------------------------------- */
/* 1. SÁU CHỈ SỐ THỊ TRƯỜNG                                          */
/* ---------------------------------------------------------------- */

const STAT_DEFS = [
    { key: 'capital',    label: 'Vốn',         icon: '💰', min: 0, max: 120, good: 'up',   unit: 'cr', short: 'Vốn' },
    { key: 'share',      label: 'Thị phần',    icon: '📊', min: 0, max: 100, good: 'up',   unit: '%',  short: 'Thị phần' },
    { key: 'reputation', label: 'Uy tín',      icon: '◈',  min: 0, max: 100, good: 'up',   unit: '',   short: 'Uy tín' },
    { key: 'trust',      label: 'Niềm tin',    icon: '♡',  min: 0, max: 100, good: 'up',   unit: '',   short: 'Niềm tin' },
    { key: 'gov',        label: 'Chính quyền', icon: '⌂',  min: 0, max: 100, good: 'up',   unit: '',   short: 'Chính quyền' },
    { key: 'legal',      label: 'Pháp lý',     icon: '§',  min: 0, max: 100, good: 'down', unit: '',   short: 'Pháp lý' }
];

const STARTING_STATS = {
    capital: 40,
    share: 8,
    reputation: 12,
    trust: 30,
    gov: 34,
    legal: 0
};

const GAME_CONFIG = {
    title: 'ĐỘC QUYỀN: QUYỀN LỰC & CÁI GIÁ',
    subtitle: 'CHIẾN DỊCH VŨ TRỤ AEGIS-7 · LIÊN BANG VÀNH ĐAI',
    brand: 'TRÀ MỘC · AEGIS-7',
    setting: 'PHI THUYỀN AEGIS-7 · NGOẠI VI VÀNH ĐAI · 2124 – 2136',
    course: 'Triết học Mác – Lênin · Nhóm 4',
    startYear: 2124,
    endYear: 2136,
    decisionSeconds: 0, // Không giới hạn thời gian (Unlimited time)
    thesis: 'Quá trình tích tụ và tập trung tư bản tất yếu sinh ra độc quyền. Mỗi lựa chọn trên thương trường và chiến trường sinh tồn đều đi kèm cái giá phải trả.'
};

/* ---------------------------------------------------------------- */
/* 2. BA HỒI                                                        */
/* ---------------------------------------------------------------- */

const ACTS = [
    { id: 'act-1', code: 'HỒI I',   name: 'KHO HÀNG (CARGO BAY)',       range: [1, 4],  note: 'Khoang hàng đổ nát · Unit-07 quét sạch Bọ Drone α–δ' },
    { id: 'act-2', code: 'HỒI II',  name: 'LÒ PHẢN ỨNG (REACTOR CORE)', range: [5, 8],  note: 'Trái tim năng lượng · Chống chọi Quái Gai Brute X–Y' },
    { id: 'act-3', code: 'HỒI III', name: 'CẦU TÀU (COMMAND BRIDGE)',   range: [9, 12], note: 'Quyết chiến Nữ Chúa · Khởi động Hải Đăng S.O.S' }
];

/* ---------------------------------------------------------------- */
/* 3. MƯỜI HAI CHƯƠNG                                               */
/* ---------------------------------------------------------------- */

const QUESTION_BANK = [
    {
        "id": 1,
        "prompt": "Các ý nào dưới đây không đúng?",
        "options": [
            "Cổ phiếu và trái phiếu là hàng hoá của thị trường chứng khoán",
            "Lãi cổ phiếu phụ thuộc kết quả kinh doanh của công ty còn lãi của trái phiếu là đại lượng cố định",
            "Người mua trái phiếu không là cổ đông",
            "Cổ phiếu và trái phiếu đều được thanh toán cả gốc và lãi khi đến kỳ hạn."
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 2,
        "prompt": "Những tiến trình có tính quy luật để chuyển kinh tế hàng hoá giản đơn lên kinh tế TBCN là gì?",
        "options": [
            "Cách mạng trong nông nghiệp và trong lực lượng lao động",
            "Chuyển từ tư hữu nhỏ sang tư hữu lớn TBCN",
            "Nhà nước đóng vai trò \"bà đỡ\"",
            "Cả a, b và c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 3,
        "prompt": "Sở hữu nhà nước được hình thành bằng cách:",
        "options": [
            "Xây dựng xí nghiệp nhà nước bằng ngân sách",
            "Quốc hữu hoá",
            "Mua cổ phần của doanh nghiệp tư nhân",
            "Cả a, b, c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 4,
        "prompt": "Chọn ý kiến đúng về giá cả ruộng đất và giá cả hàng hoá thông thường",
        "options": [
            "Đều là sự biểu hiện bằng tiền của giá trị hàng hoá",
            "Đều chịu sự ảnh hưởng của quan hệ cung cầu",
            "Giá trị của chúng đều do lao động xã hội hao phí quyết định",
            "Cả a, b, c"
        ],
        "correctIndex": 1,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 5,
        "prompt": "Giá cả thị trường của hàng hoá xoay quanh yếu tố nào?",
        "options": [
            "Giá trị thị trường",
            "Giá trị của hàng hoá",
            "Giá cả sản xuất",
            "Quan hệ cung cầu hàng hoá"
        ],
        "correctIndex": 0,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 6,
        "prompt": "Tỷ suất lợi tức phụ thuộc vào các nhân tố nào?",
        "options": [
            "ý chí của người cho vay",
            "Yêu cầu bức thiết của người vay",
            "Tỷ suất lợi nhuận bình quân",
            "Cả a, b và c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 7,
        "prompt": "Cơ chế kinh tế của CNTB độc quyền nhà nước gồm:",
        "options": [
            "Cơ chế thị trường và độc quyền tư nhân",
            "Độc quyền tư nhân và sự điều tiết của nhà nước",
            "Cơ chế thị trường, độc quyền tư nhân và sự can thiệp của nhà nước",
            "Cơ chế thị trường và sự điều tiết của nhà nước"
        ],
        "correctIndex": 2,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 8,
        "prompt": "Quan hệ cung cầu có ảnh hưởng đến:",
        "options": [
            "Tỷ suất lợi nhuận",
            "Tỷ suất giá trị thặng dư",
            "Khối lượng giá trị thặng dư",
            "Cả a, b, c"
        ],
        "correctIndex": 0,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 9,
        "prompt": "Sự ra đời của CNTB độc quyền nhà nước nhằm mục đích:",
        "options": [
            "Phục vụ lợi ích của CNTB",
            "Phục vụ lợi ích của tổ chức độc quyền tư nhân",
            "Phục vụ lợi ích của nhà nước tư sản",
            "Phục vụ lợi ích của tổ chức độc quyền tư nhân và cứu nguy cho CNTB"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 10,
        "prompt": "Quan hệ cung cầu có ảnh hưởng đến:",
        "options": [
            "Giá trị hàng hoá",
            "Giá cả hàng hoá",
            "Giá trị thặng dư",
            "Cả a, b, c"
        ],
        "correctIndex": 1,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 11,
        "prompt": "Quy luật giá trị biểu hiện sự vận động thông qua sự vận động của:",
        "options": [
            "Giá cả hàng hoá",
            "Giá cả sản xuất",
            "Giá cả độc quyền",
            "Cả a, b và c"
        ],
        "correctIndex": 0,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 12,
        "prompt": "Cổ phiếu và trái phiếu là hình thức đầu tư. Chọn các ý đúng dưới đây:",
        "options": [
            "Mua cổ phiếu và trái phiếu đều có thời hạn, hết thời hạn người sở hữu chúng được thanh toán",
            "Lãi cổ phiếu và trái phiếu đều phụ thuộc kết quả kinh doanh của công ty",
            "Cổ phiếu và trái phiếu đều có thể đem bán",
            "Cả a, b và c"
        ],
        "correctIndex": 2,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 13,
        "prompt": "Cổ phiếu và trái phiếu đều là hình thức đầu tư. Chọn ý kiến đúng dưới đây:",
        "options": [
            "Đều là đầu tư trực tiếp, dài hạn",
            "Đều là đầu tư gián tiếp, ngắn hạn",
            "Cổ phiếu là đầu tư trực tiếp còn trái phiếu là đầu tư gián tiếp",
            "Cả a, b và c"
        ],
        "correctIndex": 2,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 14,
        "prompt": "Đâu là sự khác nhau giữa địa tô phong kiến và địa tô TBCN?",
        "options": [
            "Địa tô phong kiến dựa trên cưỡng bức siêu kinh tế",
            "Địa tô TBCN dựa trên quan hệ kinh tế",
            "Địa tô phong kiến là toàn bộ sản phẩm thặng dư của nông dân",
            "Cả a, b và c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 15,
        "prompt": "Giá trị xã hội của hàng hoá công nghiệp và nông nghiệp giống nhau ở chỗ dựa trên:",
        "options": [
            "Hao phí lao động của người sản xuất hàng hoá",
            "Hao phí lao động xã hội cần thiết",
            "Hao phí lao động xã hội trong điều kiện sản xuất trung bình",
            "Hao phí lao động xã hội trong điều kiện sản xuất khó khăn nhất"
        ],
        "correctIndex": 1,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 16,
        "prompt": "Mua bán ruộng đất và mua bán cổ phiếu có điểm gì giống nhau:",
        "options": [
            "Đều không dựa trên cơ sở giá trị",
            "Đều do quan hệ cung cầu chi phối",
            "Đều phụ thuộc vào tỷ suất lợi tức tiền gửi ngân hàng",
            "Cả a, b, c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 17,
        "prompt": "Sở hữu độc quyền nhà nước là sự kết hợp của:",
        "options": [
            "Sở hữu nhà nước và sở hữu tư nhân TBCN",
            "Sở hữu nhà nước và sở hữu độc quyền tư nhân",
            "Sở hữu của nhà nước tư sản",
            "Sở hữu của nhiều nước tư bản"
        ],
        "correctIndex": 1,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 18,
        "prompt": "Trong lịch sử hình thức can thiệp phi kinh tế là của nhà nước nào?",
        "options": [
            "Phong kiến",
            "CNTB tự do cạnh tranh",
            "CNTB độc quyền",
            "Cả a, b, c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 19,
        "prompt": "Nhà nước can thiệp vào các khâu nào của quá trình sản xuất?",
        "options": [
            "Sản xuất",
            "Sản xuất và tiêu dùng",
            "Phân phối và trao đổi",
            "Sản xuất - phân phối - trao đổi – tiêu dùng"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 20,
        "prompt": "CNTB độc quyền nhà nước là:",
        "options": [
            "Một quan hệ kinh tế, chính trị, xã hội",
            "Một chính sách trong giai đoạn độc quyền",
            "Một kiểu tổ chức kinh tế - xã hội",
            "Một cơ chế điều tiết của nhà nước tư sản"
        ],
        "correctIndex": 0,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 21,
        "prompt": "Khi lạm phát phi mã xảy ra, hình thức sử dụng tiền nào không có lợi?",
        "options": [
            "Đầu tư sản xuất kinh doanh",
            "Gửi ngân hàng",
            "Cất ở nhà",
            "Cả a, b và c"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 22,
        "prompt": "Khi lạm phát phi mã xảy ra, hình thức sử dụng tiền nào có lợi nhất?",
        "options": [
            "Cất ở nhà",
            "Gửi ngân hàng",
            "Đầu tư vào sản xuất kinh doanh",
            "Mua hàng hoá hoặc vàng cất giữ"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 23,
        "prompt": "Trong cơ chế của CNTB độc quyền nhà nước thì:",
        "options": [
            "Tổ chức độc quyền phụ thuộc vào nhà nước.",
            "Nhà nước phụ thuộc vào tổ chức độc quyền",
            "Nhà nước không phụ thuộc vào tổ chức độc quyền",
            "Nhà nước chi phối tổ chức độc quyền"
        ],
        "correctIndex": 1,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 24,
        "prompt": "Sự phân chia giá trị thặng dư giữa tư bản công nghiệp và tư bản thương nghiệp dựa vào đâu?",
        "options": [
            "Khối lượng giá trị thặng dư",
            "Tỷ suất giá trị thặng dư",
            "Tỷ suất lợi nhuận",
            "Tỷ suất lợi nhuận bình quân"
        ],
        "correctIndex": 3,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    },
    {
        "id": 25,
        "prompt": "Tỷ suất lợi tức thay đổi trong phạm vi nào?",
        "options": [
            "Lớn hơn không (z' >0)",
            "Bằng tỷ suất lợi nhuận bình quân (z' = p')",
            "Lớn hơn tỷ suất lợi nhuận bình quân (z' > p')",
            "Cả a, b và c"
        ],
        "correctIndex": 0,
        "explanation": "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
    }
];

const CHAPTERS = [
    {
        id: 1, act: 0, year: 2124, place: 'Aegis-7 · Kho Hàng Số 4', stage: 'Cạnh tranh sinh tồn',
        title: 'Khoang nhỏ sau vụ va chạm', scene: '🚀',
        situation: [
            'Phi thuyền vận tải Aegis-7 chấn động dữ dội sau cú rơi khẩn cấp xuống hành tinh hoang phế ngoài rìa Ngân Hà. Tại Kho Hàng Số 4, trạm dự phòng Trà Mộc rộng mười hai mét vuông là phân khu duy nhất duy trì được hệ thống tái tạo sinh khối và dưỡng khí tự động. Bạn và Robot Bảo An UNIT-07 đang kiểm tra thiệt hại thì cảm biến réo vang: bầy Bọ Drone α ngoài hành tinh bắt đầu cào xé vách khoang hàng!',
            'Ngay lúc đó, phân đội tiếp tế của Chuỗi Trà Vương — đối thủ lớn nhất trong Vành đai — bật tín hiệu hologram khắp hành lang kho hàng: tuyên bố giảm giá 50% khẩu phần năng lượng sinh khối để lôi kéo toàn bộ nhân sự sống sót về phía họ.'
        ],
        dialogue: { speaker: 'Quản đốc khoang tàu', text: 'Trà Vương trả gấp đôi tín dụng để độc chiếm nguồn năng lượng kho hàng này. Cậu tính sao? Không thì tôi mở cổng cho họ tiếp quản cả dãy.' },
        question: {
            prompt: "Các ý nào dưới đây không đúng?",
            options: [
                "Cổ phiếu và trái phiếu là hàng hoá của thị trường chứng khoán",
                "Lãi cổ phiếu phụ thuộc kết quả kinh doanh của công ty còn lãi của trái phiếu là đại lượng cố định",
                "Người mua trái phiếu không là cổ đông",
                "Cổ phiếu và trái phiếu đều được thanh toán cả gốc và lãi khi đến kỳ hạn."
            ],
            correctIndex: 3,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Giữ giá, chăm khách quen',
                desc: 'Chất lượng và sự thân thuộc là lợi thế nhỏ nhưng bền.',
                deltas: { capital: -3, share: 2, reputation: 4, trust: 5, gov: 1, legal: -1 },
                outcome: 'Bạn không giảm giá khẩu phần sinh khối. Thay vào đó, bạn nạp vi chất đậm đặc cho các kỹ sư quen thuộc và khắc mã hiệu của họ lên viên năng lượng. Ba ca trực sau, các đội thợ mỏ và phi hành đoàn quay lại, dẫn theo đồng đội. Trà Vương đông hơn, nhưng trạm của bạn có lượng khách trung thành kiên định.',
                card: 'canhtranh'
            },
            {
                title: 'Đốt tiền khuyến mãi đến cùng',
                desc: 'Dùng vốn ít ỏi để giành sự chú ý trước đối thủ lớn.',
                deltas: { capital: -10, share: 8, reputation: 1, trust: 2, gov: 0, legal: 1 },
                outcome: 'Bạn bật bảng thông báo xả kho năng lượng “mua một tặng một”, rồi nâng lên “mua một tặng hai”. Khoang hàng chật kín người nhận, chỉ số thị phần tăng vọt — nhưng mỗi đơn vị sinh khối phát ra đều tiêu hao cạn kiệt nguồn dự trữ. Unit-07 cảnh báo cạn năng lượng súng Plasma, bạn không thể đốt tín dụng mãi.',
                card: 'chien-tranh-gia'
            },
            {
                title: 'Bắt tay quầy suất ăn bên cạnh làm combo',
                desc: 'Hai doanh nghiệp nhỏ cùng giành khách theo cách ít tốn kém.',
                deltas: { capital: -2, share: 3, reputation: 3, trust: 3, gov: 2, legal: 0 },
                outcome: 'Bạn sang khoang khẩu phần thực phẩm bên cạnh, đề nghị gói combo “một khẩu phần lương khô, một viên sinh khối Trà Mộc”. Quản kho gật đầu đồng ý sau mười phút. Người sống sót không phải phân vân lựa chọn — họ nhận cả hai. Doanh thu và niềm tin tăng mà không cần bán phá giá.',
                card: 'canhtranh'
            }
        ]
    },
    {
        id: 2, act: 0, year: 2125, place: 'Aegis-7 · Trạm Cung Ứng Lục Nguyên', stage: 'Chuỗi cung ứng',
        title: 'Lá Mộc và cái giá độc quyền', scene: '🌱',
        situation: [
            'Để duy trì hệ thống lọc khí cho các khoang trú ẩn, bạn cần nguồn lá Mộc thủy canh tinh khiết. Đúng lúc Bọ Drone β bắt đầu xâm nhập ống thông khí, Tập đoàn Phương Nam Agri — đơn vị kiểm soát gần 80% module thủy canh Lục Nguyên trên quỹ đạo — phát thông điệp độc quyền: họ tăng giá nguyên liệu thêm 35%, kèm hợp đồng trói buộc ba năm.',
            'Nếu từ chối ký, kho trữ màng sinh học của bạn sẽ cạn sạch trong hai tuần, đe dọa sinh mạng hàng trăm người trong khoang. Nếu ký, toàn bộ công thức tinh chế và sự tự chủ của bạn sẽ nằm trong tay họ.'
        ],
        dialogue: { speaker: 'Giám đốc Phương Nam Agri', text: 'Aegis-7 là đối tác tiêu thụ lớn của chúng tôi. Tôi không muốn trạm nào khác chen vào. Hợp đồng độc quyền này là cách tốt nhất cho cả hai.' },
        question: {
            prompt: "Những tiến trình có tính quy luật để chuyển kinh tế hàng hoá giản đơn lên kinh tế TBCN là gì?",
            options: [
                "Cách mạng trong nông nghiệp và trong lực lượng lao động",
                "Chuyển từ tư hữu nhỏ sang tư hữu lớn TBCN",
                "Nhà nước đóng vai trò \"bà đỡ\"",
                "Cả a, b và c"
            ],
            correctIndex: 3,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Ký hợp đồng độc quyền ba năm',
                desc: 'Giữ nguồn hàng ổn định, đổi lại mất quyền tự do chọn nhà cung cấp.',
                deltas: { capital: 4, share: 3, reputation: 0, trust: -3, gov: 1, legal: 4 },
                outcome: 'Bạn ký. Chi phí tăng nhưng nguồn cung sinh học tạm thời ổn định, các module lọc khí không bị đình chỉ. Nhưng một tháng sau, khi một trạm thủy canh nhỏ ở vành ngoài đề nghị cung cấp phôi lá Mộc với giá rẻ hơn, bạn buộc phải từ chối vì điều khoản độc quyền. Bạn bắt đầu hiểu vì sao người ta gọi đó là “quyền lực của kẻ nắm giữ cửa ngõ”.',
                card: 'doc-quyen-tu-nhan'
            },
            {
                title: 'Đầu tư vùng trồng riêng',
                desc: 'Tốn vốn trước mắt nhưng giảm phụ thuộc về sau.',
                deltas: { capital: -10, share: 2, reputation: 5, trust: 4, gov: 0, legal: -2 },
                outcome: 'Bạn điều động nhân sự cải tạo khoang chứa rỗng thành buồng ươm thủy canh tự cấp, hợp tác với ba kỹ sư sinh học. Chi phí ban đầu rất nặng, nhưng bạn hoàn toàn tự chủ nguồn phôi. Phương Nam Agri gửi tín hiệu thương lượng mềm mỏng hơn — bạn vẫn giao dịch với họ, nhưng không còn bị ép ký bất kỳ điều khoản trói buộc nào.',
                card: 'doc-quyen-tu-nhan'
            },
            {
                title: 'Công khai tố cáo, tìm nguồn thay thế',
                desc: 'Biến sức ép thành câu chuyện công chúng, nhưng đối đầu với người nắm nguồn.',
                deltas: { capital: -5, share: 1, reputation: 2, trust: 5, gov: -3, legal: 3 },
                outcome: 'Bạn phát sóng công khai lên mạng thông tin nội bộ con tàu về việc một nhà cung cấp lợi dụng thảm họa để nắm 80% nguồn sống và ép giá độc quyền. Kênh Tin tức Vành Đai tiếp sóng. Phi hành đoàn ủng hộ bạn, nhưng Phương Nam lập tức khóa van tiếp tế. Bạn và Unit-07 phải chạy đua sinh tử tìm phôi thay thế trong 10 ngày — cái giá của sự độc lập chưa bao giờ rẻ.',
                card: 'doc-quyen-tu-nhan'
            }
        ]
    },
    {
        id: 3, act: 0, year: 2126, place: 'Aegis-7 · Trung Tâm Hậu Cần Kho Hàng', stage: 'Thương vụ sáp nhập',
        title: 'Lời đề nghị từ Trà Vương', scene: '🛰️',
        situation: [
            'Trà Mộc đã khôi phục được mười hai trạm sinh khối nhỏ khắp phân khu Kho Hàng và sở hữu lượng người dùng trung thành. Giữa lúc Bọ Drone γ gầm rú xé toạc các vách ngăn phía đông, CEO của Chuỗi Trà Vương triệu tập bạn lên khoang trung chuyển hậu cần, đặt lên bàn một tập hồ sơ số mã hóa.',
            'Lời đề nghị thâu tóm: họ trả giá cao để mua lại 70% cổ phần Trà Mộc, bạn giữ vị trí Giám đốc điều hành trong 3 năm. Bạn có thể rút lui an toàn với khối tài sản khổng lồ, hoặc họ sẽ mở module bao vây mọi khoang của bạn cho đến khi bạn kiệt quệ.'
        ],
        dialogue: { speaker: 'CEO Trà Vương', text: 'Cô đang thắng ở một khoang tàu nhỏ. Tôi đang mời cô làm chủ thị trường toàn Vành Đai. Đừng để cái tôi cá nhân tiêu diệt con tàu này.' },
        question: {
            prompt: "Sở hữu nhà nước được hình thành bằng cách:",
            options: [
                "Xây dựng xí nghiệp nhà nước bằng ngân sách",
                "Quốc hữu hoá",
                "Mua cổ phần của doanh nghiệp tư nhân",
                "Cả a, b, c"
            ],
            correctIndex: 3,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Bán 70% cổ phần, giữ ghế CEO',
                desc: 'Đổi quyền kiểm soát lấy vốn và quy mô.',
                deltas: { capital: 25, share: 10, reputation: -2, trust: -2, gov: 3, legal: 0 },
                outcome: 'Bạn ký chấp thuận sáp nhập. Tài khoản nhận được số tín dụng khổng lồ, nhưng biển hiệu đổi thành “Trà Mộc by Trà Vương”. Mọi chỉ thị cấp phát năng lượng giờ đây phải thông qua hội đồng quản trị của họ. Bạn có tiền, nhưng mất đi quyền quyết định số phận khoang tàu.',
                card: 'thon-tinh-sap-nhap'
            },
            {
                title: 'Từ chối, gọi vốn đầu tư mạo hiểm',
                desc: 'Giữ quyền tự quyết, đổi lại áp lực tăng trưởng.',
                deltas: { capital: 8, share: 4, reputation: 4, trust: 2, gov: -1, legal: 1 },
                outcome: 'Bạn kiên quyết từ chối. Ba tuần sau, một quỹ đầu tư mạo hiểm liên sao đồng ý rót vốn với điều kiện năng suất phải tăng gấp ba trong hai chu kỳ. Bạn giữ được quyền tự chủ và trang bị thêm đạn dược cho Unit-07, nhưng áp lực tăng trưởng giờ đây đè nặng lên từng ca trực.',
                card: 'thon-tinh-sap-nhap'
            },
            {
                title: 'Đề nghị sáp nhập ngược, giữ thương hiệu',
                desc: 'Cần Uy tín ≥ 18 để đàm phán từ vị thế cân bằng.',
                require: { reputation: 18 },
                deltas: { capital: -6, share: 12, reputation: 2, trust: 1, gov: 2, legal: 3 },
                outcome: 'Bạn lật ngược bàn đàm phán: đề nghị sáp nhập ngược, giữ nguyên thương hiệu Trà Mộc và ban điều hành độc lập. Trước uy tín vững chắc của bạn, sau nhiều vòng thương thuyết căng thẳng, Trà Vương buộc phải nhượng bộ một phần. Bạn mở rộng quy mô mà vẫn giữ được bản sắc của chính mình.',
                card: 'thon-tinh-sap-nhap'
            }
        ]
    },
    {
        id: 4, act: 1, year: 2127, place: 'Aegis-7 · Cửa Hầm Kho Hàng', stage: 'Chiến tranh giá & Phá giá',
        title: 'Cuộc chiến một tín dụng năng lượng', scene: '🏷️',
        situation: [
            'Một tổ chức thương mại mới mang tên “Trà 24/7” bất ngờ mở mười ki-ốt dã chiến ngay cửa hầm thoát hiểm, bán khẩu phần sinh khối với giá chỉ 19 tín dụng (cr) trong khi chi phí tái tạo tối thiểu đã là 22 cr. Khách xếp hàng dài dằng dặc, doanh thu trạm Trà Mộc sụt giảm 18% chỉ sau hai tuần.',
            'Cùng lúc đó, Bọ Drone δ — con bọ trinh sát cuối cùng của Khoang Hàng — đang điên cuồng cắn phá dây cáp điện. Kế toán trưởng đặt trước mặt bạn hai bản kế hoạch: cắt giảm bảo trì chịu lỗ, hoặc dốc cạn vốn liếng để mở chiến dịch đối đầu trực diện.'
        ],
        dialogue: { speaker: 'Quản lý khoang hàng', text: 'Những người sống sót đang hoảng loạn, họ không quan tâm ai bền vững hơn. Họ chỉ nhìn vào con số trên bảng giá.' },
        question: {
            prompt: "Chọn ý kiến đúng về giá cả ruộng đất và giá cả hàng hoá thông thường",
            options: [
                "Đều là sự biểu hiện bằng tiền của giá trị hàng hoá",
                "Đều chịu sự ảnh hưởng của quan hệ cung cầu",
                "Giá trị của chúng đều do lao động xã hội hao phí quyết định",
                "Cả a, b, c"
            ],
            correctIndex: 1,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Giảm còn 19 tín dụng',
                desc: 'Giữ khách bằng giá, chấp nhận biên lợi nhuận âm.',
                deltas: { capital: -8, share: 6, reputation: 0, trust: 2, gov: 0, legal: 2 },
                outcome: 'Bạn hạ giá xuống 19 cr. Dòng người ùa lại, nhưng mỗi đơn vị phát ra bạn gánh lỗ 3 tín dụng. Sau vài ca trực, bạn nhận ra cả hai bên đang tự vắt kiệt dòng máu của chính mình trong cuộc chiến hao tổn vô nghĩa.',
                card: 'chien-tranh-gia'
            },
            {
                title: 'Giữ giá, nâng trải nghiệm',
                desc: 'Cạnh tranh bằng thứ không nằm trên bảng giá.',
                deltas: { capital: -2, share: 2, reputation: 6, trust: 5, gov: 1, legal: -1 },
                outcome: 'Bạn kiên định giữ mức giá 29 cr, nhưng nâng cấp trải nghiệm: lắp đặt trạm phát sóng liên lạc vệ tinh ổn định, bổ sung khoang nghỉ ngơi cách âm và hỗ trợ sạc điện cho người trực ca đêm. Bạn không chạy đua xuống đáy về giá, mà chiến thắng bằng giá trị phục vụ bền bỉ.',
                card: 'canhtranh'
            },
            {
                title: 'Bán dưới giá thành tại ba ki-ốt của đối thủ',
                desc: 'Cần Vốn ≥ 40. Đòn nặng, nhưng rất dễ bị soi.',
                require: { capital: 40 },
                deltas: { capital: -14, share: 9, reputation: -2, trust: -2, gov: 0, legal: 8 },
                outcome: 'Bạn dốc vốn mở ba điểm bán phá giá ngay sát cạnh ki-ốt của đối thủ, ép họ cạn kiệt tài chính và phải rút lui sau sáu tuần. Bạn giành lại địa bàn, nhưng luật sư bảo vệ quyền lợi người tiêu dùng bắt đầu lập hồ sơ điều tra hành vi bán phá giá triệt hạ của bạn.',
                card: 'ban-pha-gia'
            }
        ]
    },
    {
        id: 5, act: 1, year: 2127, place: 'Aegis-7 · Khoang Điều Khiển Lò Phản Ứng', stage: 'Khủng hoảng niềm tin',
        title: 'Bản tin báo động lúc sáu giờ', scene: '📰',
        situation: [
            'Unit-07 quét sạch Kho Hàng và hộ tống bạn tiến vào Khoang Lò Phản Ứng Năng Lượng (Reactor Core). Đúng sáu giờ sáng theo giờ trạm, mạng truyền thông Vành Đai Ký Sự phát phóng sự điều tra chấn động: “Trà Mộc và những hợp đồng độc quyền bóp nghẹt chuỗi cung ứng thủy canh giữa thảm họa Aegis-7”.',
            'Bên ngoài hành lang lò phản ứng, tiếng gầm của quái vật Swarmer A dội qua vách kim loại nung đỏ. Thiết bị liên lạc của bạn nổ tung bởi hàng loạt tin nhắn chất vấn từ phi hành đoàn và các nhà đầu tư. Niềm tin sụp đổ có thể khiến con tàu hỗn loạn trước khi quái vật kịp phá hủy lõi lò.'
        ],
        dialogue: { speaker: 'Trưởng phòng truyền thông', text: 'Chúng ta có ba lựa chọn: công khai minh bạch sự thật, dùng tiền bịt miệng truyền thông, hoặc phản đòn tờ báo. Quyết định đi, nhưng mọi vết tích số đều không thể xóa bỏ.' },
        question: {
            prompt: "Giá cả thị trường của hàng hoá xoay quanh yếu tố nào?",
            options: [
                "Giá trị thị trường",
                "Giá trị của hàng hoá",
                "Giá cả sản xuất",
                "Quan hệ cung cầu hàng hoá"
            ],
            correctIndex: 0,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Minh bạch hợp đồng, xin lỗi công khai',
                desc: 'Nhận trách nhiệm, cam kết sửa sai trước công chúng.',
                deltas: { capital: -4, share: -2, reputation: 6, trust: 8, gov: 2, legal: -3 },
                outcome: 'Bạn mở cuộc họp báo trực tiếp ngay tại khoang lò, công bố toàn văn hợp đồng, thừa nhận thiếu sót và cam kết bồi thường thỏa đáng. Dù bị ảnh hưởng tài chính ngắn hạn, sự chân thành dũng cảm đã giúp bạn cứu vãn niềm tin vô giá của mọi người.',
                card: 'niem-tin'
            },
            {
                title: 'Thuê công ty truyền thông dẫn dắt dư luận',
                desc: 'Xoa dịu khủng hoảng bằng chiến dịch thông điệp tích cực.',
                deltas: { capital: -8, share: 2, reputation: 1, trust: -1, gov: 0, legal: 1 },
                outcome: 'Bạn chi một khoản tín dụng lớn thuê công ty truyền thông phủ sóng tin giả và dập tắt các bài báo tiêu cực. Cơn bão dư luận lắng xuống tạm thời, nhưng tin đồn ngầm vẫn âm ỉ lan truyền, khiến uy tín thương hiệu rạn nứt khó hàn gắn.',
                card: 'niem-tin'
            },
            {
                title: 'Kiện tờ báo, cáo buộc đối thủ giật dây',
                desc: 'Cần Vốn ≥ 30 và Quan hệ chính quyền ≥ 20. Đòn cứng.',
                require: { capital: 30, gov: 20 },
                deltas: { capital: -10, share: 1, reputation: -3, trust: -4, gov: 4, legal: 5 },
                outcome: 'Bạn đệ đơn kiện tờ báo và cáo buộc đối thủ đứng sau giật dây chiến dịch bôi nhọ. Cuộc chiến pháp lý nổ ra rầm rộ, công chúng chia rẽ, còn bạn bị cuốn vào vòng xoáy kiện tụng tốn kém giữa lúc lò phản ứng đang quá tải.',
                card: 'niem-tin'
            }
        ]
    },
    {
        id: 6, act: 1, year: 2128, place: 'Aegis-7 · Phân Khu Năng Lượng Trung Tâm', stage: 'Độc quyền Nhà nước',
        title: 'Cánh cửa mở từ Hội đồng Liên bang', scene: '🏛️',
        situation: [
            'Lò phản ứng năng lượng đạt mức nhiệt tới hạn. Giữa tiếng súng Plasma của Unit-07 bắn chặn quái vật Swarmer B đang toan cắt đứt ống làm mát, phái đoàn đặc nhiệm của Hội đồng Quản trị Liên bang Vành đai bước vào phân khu trung tâm.',
            'Hội đồng đưa ra đề xuất mang tính độc quyền nhà nước: họ muốn quốc hữu hóa và chỉ định Trà Mộc là nhà cung ứng sinh khối và năng lượng độc quyền duy nhất cho toàn bộ hệ thống cứu sinh, đổi lại bạn phải chấp nhận giá trần và chịu sự kiểm soát tuyệt đối của chính quyền.'
        ],
        dialogue: { speaker: 'Vị đại diện Hội đồng', text: 'Chúng tôi không cần cô lớn nhanh. Chúng tôi cần sự ổn định tuyệt đối. Hội đồng chịu trách nhiệm về mạng sống của hàng triệu công dân ngoài vành đai, cô hiểu chứ?' },
        question: {
            prompt: "Tỷ suất lợi tức phụ thuộc vào các nhân tố nào?",
            options: [
                "ý chí của người cho vay",
                "Yêu cầu bức thiết của người vay",
                "Tỷ suất lợi nhuận bình quân",
                "Cả a, b và c"
            ],
            correctIndex: 3,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Chấp nhận trở thành đối tác độc quyền',
                desc: 'Được bảo hộ thị phần, chấp nhận kiểm soát giá.',
                deltas: { capital: 12, share: 10, reputation: 2, trust: 1, gov: 8, legal: -2 },
                outcome: 'Bạn đồng ý trở thành nhà thầu độc quyền của chính quyền. Doanh thu được bảo đảm vững chắc, nhưng mọi đổi mới và giá bán đều bị trói chặt bởi các thủ tục hành chính nhiêu khê.',
                card: 'doc-quyen-nha-nuoc'
            },
            {
                title: 'Từ chối, tự xây kênh phân phối',
                desc: 'Giữ quyền tự quyết, chịu sự cạnh tranh sòng phẳng.',
                deltas: { capital: -6, share: 2, reputation: 5, trust: 4, gov: -4, legal: 1 },
                outcome: 'Bạn từ chối đề nghị, quyết tâm duy trì mạng lưới phân phối tư nhân tự chủ. Bạn giữ được quyền tự do định đoạt, nhưng quan hệ với chính quyền xấu đi và việc xin cấp phép qua các chốt kiểm soát trở nên vô cùng chông gai.',
                card: 'doc-quyen-nha-nuoc'
            },
            {
                title: 'Đàm phán hợp đồng có giá trần và điều khoản minh bạch',
                desc: 'Cần Quan hệ chính quyền ≥ 30 và Niềm tin ≥ 25.',
                require: { gov: 30, trust: 25 },
                deltas: { capital: 6, share: 6, reputation: 4, trust: 5, gov: 5, legal: -1 },
                outcome: 'Bạn đề xuất mô hình hợp tác công tư (PPP) với các điều khoản minh bạch và cơ chế kiểm toán độc lập. Hội đồng chấp thuận sau các phiên điều trần căng thẳng. Bạn giữ được thế cân bằng giữa an sinh công cộng và sự năng động thị trường.',
                card: 'doc-quyen-nha-nuoc'
            }
        ]
    },
    {
        id: 7, act: 1, year: 2128, place: 'Aegis-7 · Xưởng Kỹ Thuật Động Cơ Lò', stage: 'Trách nhiệm lao động',
        title: 'Tiếng còi trước cổng xưởng máy', scene: '📢',
        situation: [
            'Nhiệt độ trong khoang động cơ tăng vọt. Quái vật giáp gai khổng lồ — Quái Gai Brute X — đang dùng móng vuốt bọc giáp đập mạnh vào cánh cửa thép xưởng máy. Đúng lúc này, còi báo động vang lên: toàn bộ kỹ sư bảo trì và thợ máy nghiệp đoàn đình công!',
            'Họ từ chối vận hành hệ thống bơm làm mát trừ khi công ty tăng 30% khẩu phần sinh khối, cải thiện đồ bảo hộ phóng xạ và trích lập quỹ an toàn lao động. Trà Mộc đang đứng trước nguy cơ lò phản ứng nổ tung nếu không giải quyết thỏa đáng cuộc đình công này.'
        ],
        dialogue: { speaker: 'Đại diện nghiệp đoàn', text: 'Chúng tôi không đòi công ty nhỏ lại. Chúng tôi chỉ muốn phần lớn lên đó cũng đến được với người làm ra nó.' },
        question: {
            prompt: "Cơ chế kinh tế của CNTB độc quyền nhà nước gồm:",
            options: [
                "Cơ chế thị trường và độc quyền tư nhân",
                "Độc quyền tư nhân và sự điều tiết của nhà nước",
                "Cơ chế thị trường, độc quyền tư nhân và sự can thiệp của nhà nước",
                "Cơ chế thị trường và sự điều tiết của nhà nước"
            ],
            correctIndex: 2,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Chấp nhận toàn bộ yêu cầu',
                desc: 'Tăng lương, cải thiện điều kiện làm việc ngay.',
                deltas: { capital: -10, share: 0, reputation: 7, trust: 8, gov: 3, legal: -3 },
                outcome: 'Bạn ký chấp thuận toàn bộ yêu sách của nghiệp đoàn. Chi phí vận hành tăng vọt, nhưng đội ngũ kỹ sư đồng lòng dốc sức sửa chữa máy bơm làm mát, giúp Unit-07 hạ gục Quái Gai Brute X trong gang tấc.',
                card: 'trach-nhiem'
            },
            {
                title: 'Tăng lương một phần, hứa xem lại sau',
                desc: 'Thỏa hiệp ngắn hạn để duy trì sản xuất.',
                deltas: { capital: -4, share: 1, reputation: 2, trust: 1, gov: 1, legal: 0 },
                outcome: 'Bạn đàm phán tăng lương 15% kèm lời hứa cải thiện điều kiện sau khi dập tắt thảm họa. Kỹ sư quay lại làm việc dù còn nghi ngại. Lò phản ứng được cứu, nhưng mâu thuẫn âm ỉ vẫn chưa được giải quyết triệt để.',
                card: 'trach-nhiem'
            },
            {
                title: 'Từ chối, thuê lao động thời vụ thay thế',
                desc: 'Giữ chi phí, đối mặt nguy cơ xung đột kéo dài.',
                deltas: { capital: 0, share: -3, reputation: -6, trust: -7, gov: -2, legal: 6 },
                outcome: 'Bạn kiên quyết từ chối và điều động robot lao động tự động thay thế ca trực. Đụng độ căng thẳng bùng nổ trước cửa xưởng máy, lòng tin của người lao động tan vỡ hoàn toàn và áp lực pháp lý tăng mạnh.',
                card: 'trach-nhiem'
            }
        ]
    },
    {
        id: 8, act: 1, year: 2129, place: 'Aegis-7 · Cổng Mạng Lưới Điều Phối Lò', stage: 'Độc quyền nền tảng',
        title: 'Nền tảng của ai?', scene: '🖥️',
        situation: [
            'Hệ thống điều phối sinh khối số “Mộc OS” của bạn đã trở thành nền tảng hạ tầng phân phối năng lượng lớn nhất khắp các khoang tàu. Tuy nhiên, Quái Gai Brute Y — quái vật bọc giáp cuối cùng của Lò Phản Ứng — đang phun acid ăn mòn các cụm máy chủ trung tâm.',
            'Đồng thời, hàng loạt chủ quầy sinh khối độc lập nhỏ (như Hạt Mầm) gửi đơn khiếu nại khẩn cấp: thuật toán của Mộc OS đang bí mật ưu tiên hiển thị và phân bổ tài nguyên cho các gian hàng chính chủ của Trà Mộc, đẩy các đối tác nhỏ vào nguy cơ phá sản vì phí nền tảng cắt cổ.'
        ],
        dialogue: { speaker: 'Chủ quầy Hạt Mầm', text: 'Tôi trả phí để được bán. Nhưng cái cửa cô mở ra lại chỉ dẫn khách về phía cô.' },
        question: {
            prompt: "Quan hệ cung cầu có ảnh hưởng đến:",
            options: [
                "Tỷ suất lợi nhuận",
                "Tỷ suất giá trị thặng dư",
                "Khối lượng giá trị thặng dư",
                "Cả a, b, c"
            ],
            correctIndex: 0,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Công khai thuật toán, tách quán mình khỏi ưu tiên',
                desc: 'Chấp nhận giảm doanh thu trực tiếp để giữ sân chơi công bằng.',
                deltas: { capital: -5, share: -2, reputation: 8, trust: 8, gov: 4, legal: -4 },
                outcome: 'Bạn công khai mã nguồn thuật toán điều phối, tách bạch hoàn toàn gian hàng nội bộ khỏi hệ thống xếp hạng ưu tiên và giảm phí kết nối. Uy tín bùng nổ, hệ sinh thái các quầy nhỏ chung tay tiếp sức năng lượng cho Unit-07.',
                card: 'doc-quyen-tu-nhan'
            },
            {
                title: 'Giữ nguyên, tăng phí để “tối ưu hơn nữa”',
                desc: 'Khai thác tối đa vị thế cổng vào thị trường.',
                deltas: { capital: 14, share: 5, reputation: -4, trust: -5, gov: -2, legal: 6 },
                outcome: 'Bạn giữ nguyên thuật toán độc quyền và tăng thêm phí dịch vụ cao cấp để tối đa hóa lợi nhuận. Tiền chảy vào két sắt, nhưng sự phẫn nộ trong cộng đồng dâng cao và nguy cơ bị tẩy chay hiển hiện.',
                card: 'doc-quyen-tu-nhan'
            },
            {
                title: 'Mua lại Hạt Mầm để “giải quyết”',
                desc: 'Cần Vốn ≥ 35. Xóa tiếng ồn bằng một tấm séc.',
                require: { capital: 35 },
                deltas: { capital: -12, share: 7, reputation: 0, trust: -2, gov: 1, legal: 3 },
                outcome: 'Bạn dùng tiềm lực tài chính thâu tóm luôn quầy Hạt Mầm để bịt đầu mối khiếu nại. Vấn đề bề nổi được giải quyết, nhưng bóng ma của một thực thể độc quyền công nghệ độc đoán bắt đầu bao trùm con tàu.',
                card: 'thon-tinh-sap-nhap'
            }
        ]
    },
    {
        id: 9, act: 2, year: 2129, place: 'Aegis-7 · Khoang VIP Cầu Tàu', stage: 'Bẫy Cartel cấu kết',
        title: 'Bữa tối ở phòng mật đàm', scene: '🥂',
        situation: [
            'Unit-07 vượt qua cánh cửa chống nén cuối cùng để đưa bạn tiến vào Cầu Tàu Chỉ Huy (Command Bridge). Nhưng trước sảnh VIP dẫn tới bàn điều khiển chính, Vệ Binh Hoàng Gia của loài Xenomorph đang lượn lờ đe dọa. Bên trong phòng mật đàm bọc thép cách âm, lãnh đạo của ba tập đoàn lớn nhất đang ngồi đợi bạn.',
            'Họ đặt vấn đề thành lập một Cartel ngầm: bí mật thỏa thuận phân chia khu vực ảnh hưởng, cố định giá năng lượng ở mức cao ngất ngưởng và cùng nhau triệt tiêu mọi startup sinh khối mới xuất hiện sau khi con tàu được giải cứu.'
        ],
        dialogue: { speaker: 'CEO một chuỗi đối thủ', text: 'Không ai thiệt cả. Chỉ là ba người lớn ngồi lại với nhau thôi.' },
        question: {
            prompt: "Sự ra đời của CNTB độc quyền nhà nước nhằm mục đích:",
            options: [
                "Phục vụ lợi ích của CNTB",
                "Phục vụ lợi ích của tổ chức độc quyền tư nhân",
                "Phục vụ lợi ích của nhà nước tư sản",
                "Phục vụ lợi ích của tổ chức độc quyền tư nhân và cứu nguy cho CNTB"
            ],
            correctIndex: 3,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Đồng ý, giữ giá chung',
                desc: 'Lợi nhuận ngắn hạn cao, rủi ro pháp lý cực lớn.',
                deltas: { capital: 16, share: 4, reputation: -5, trust: -6, gov: -4, legal: 10 },
                outcome: 'Bạn nâng ly đồng ý tham gia Cartel ngầm. Lợi nhuận chia chác khổng lồ chảy về tài khoản, nhưng bạn đã biến thành kẻ bóc lột mà ngày xưa mình từng căm ghét. Quả bom nổ chậm pháp lý bắt đầu đếm ngược.',
                card: 'cartel'
            },
            {
                title: 'Từ chối, rời bàn sớm',
                desc: 'Giữ sự trong sạch, chấp nhận cạnh tranh khốc liệt.',
                deltas: { capital: -3, share: 1, reputation: 6, trust: 6, gov: 2, legal: -2 },
                outcome: 'Bạn dứt khoát đứng dậy từ chối và rời khỏi phòng mật đàm. Các tập đoàn liên thủ đe dọa cô lập bạn, nhưng lương tâm kinh doanh trong sạch và sự tự do đã tiếp thêm sức mạnh cho bạn cùng Unit-07 bước vào trận đánh lớn.',
                card: 'cartel'
            },
            {
                title: 'Đồng ý bề ngoài, ghi âm lại',
                desc: 'Cần Pháp lý ≤ 15. Nước cờ mạo hiểm để lật bàn cờ.',
                require: { legal: 15 },
                deltas: { capital: -2, share: 2, reputation: 3, trust: 2, gov: 6, legal: -5 },
                outcome: 'Bạn giả vờ đồng thuận ký kết nhưng bí mật kích hoạt máy ghi âm dữ liệu của Unit-07 lưu trữ toàn bộ bằng chứng thông đồng giá. Bạn nắm trong tay con bài tẩy định đoạt số phận của cả liên minh độc quyền.',
                card: 'cartel'
            }
        ]
    },
    {
        id: 10, act: 2, year: 2130, place: 'Aegis-7 · Phòng Chỉ Huy An Ninh Cầu Tàu', stage: 'Luật Chống độc quyền',
        title: 'Cuộc điều tra từ Ủy ban Cạnh tranh', scene: '⚖️',
        situation: [
            'Cánh cửa cầu tàu rung chuyển dữ dội! NỮ CHÚA XENOMORPH (Hive Queen Boss) với vương miện giáp xác khổng lồ xuất hiện trên màn hình radar, rít lên tiếng gầm kinh thiên động địa. Unit-07 khóa mục tiêu, nạp phát đạn Plasma Blaster đầu tiên vào khiên giáp Nữ Chúa.',
            'Đúng lúc dầu sôi lửa bỏng, kênh liên lạc tối mật từ Ủy ban Cạnh tranh Quốc gia và Thanh tra Liên bang kết nối thẳng vào bàn chỉ huy: họ mở cuộc điều tra chống độc quyền toàn diện đối với Trà Mộc do nghi vấn lạm dụng vị thế thống lĩnh thị trường và thỏa thuận hạn chế cạnh tranh.'
        ],
        dialogue: { speaker: 'Trưởng đoàn điều tra', text: 'Chúng tôi không tìm cách phá doanh nghiệp. Chúng tôi đang kiểm tra xem cạnh tranh còn thở được không.' },
        question: {
            prompt: "Quan hệ cung cầu có ảnh hưởng đến:",
            options: [
                "Giá trị hàng hoá",
                "Giá cả hàng hoá",
                "Giá trị thặng dư",
                "Cả a, b, c"
            ],
            correctIndex: 1,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Hợp tác toàn bộ, tự nguyện sửa sai',
                desc: 'Minh bạch hồ sơ, chủ động dỡ bỏ rào cản độc quyền.',
                deltas: { capital: -8, share: -3, reputation: 7, trust: 6, gov: 6, legal: -8 },
                outcome: 'Bạn chỉ thị mở toàn bộ dữ liệu máy chủ, hợp tác tuyệt đối với cơ quan điều tra và cam kết khắc phục triệt để sai phạm. Hành động phục thiện kịp thời giúp công ty thoát khỏi án phạt giải thể nặng nề.',
                card: 'luat-chong-doc-quyen'
            },
            {
                title: 'Kéo dài thủ tục, thuê luật sư giỏi nhất',
                desc: 'Dùng tiền và thời gian để trì hoãn kết luận điều tra.',
                deltas: { capital: -12, share: 2, reputation: -4, trust: -5, gov: -3, legal: 8 },
                outcome: 'Bạn chiêu mộ đội ngũ luật sư thượng thặng nhất, sử dụng các kẽ hở thủ tục để trì hoãn và đối đầu với cơ quan thanh tra. Bạn kéo dài được thời gian, nhưng chi phí pháp lý khổng lồ khiến nguồn lực chiến đấu bị bào mòn nghiêm trọng.',
                card: 'luat-chong-doc-quyen'
            },
            {
                title: 'Chủ động đề xuất cam kết cạnh tranh',
                desc: 'Cần Vốn ≥ 25 và Niềm tin ≥ 30. Thỏa hiệp chủ động.',
                require: { capital: 25, trust: 30 },
                deltas: { capital: -5, share: 0, reputation: 5, trust: 5, gov: 4, legal: -5 },
                outcome: 'Bạn chủ động đệ trình gói cam kết cải cách cạnh tranh toàn diện: giải phóng nguồn cung, minh bạch dữ liệu và hỗ trợ đối thủ nhỏ. Ủy ban chấp thuận đình chỉ điều tra, mở ra con đường tái cấu trúc lành mạnh.',
                card: 'luat-chong-doc-quyen'
            }
        ]
    },
    {
        id: 11, act: 2, year: 2130, place: 'Aegis-7 · Đài Quan Sát Cầu Tàu', stage: 'Ngã rẽ Hiến chương',
        title: 'Lời mời từ Hội đồng Cạnh tranh', scene: '📜',
        situation: [
            'Unit-07 tung phát đạn Plasma thứ hai xé toạc lớp giáp ngoài của Nữ Chúa. Nữ Chúa lồng lộn quẫy đuôi làm sập các trụ đỡ quanh đài quan sát Cầu Tàu. Giữa làn khói đạn nghi ngút, đại diện cấp cao của Hội đồng Cạnh tranh xuất hiện trên màn hình toàn cảnh.',
            'Họ đưa ra một ngã rẽ lịch sử: Bạn có thể chọn tiếp tục thâu tóm, nuốt trọn mọi đối thủ để trở thành độc tôn tuyệt đối; hoặc bạn có thể đóng vai trò kiến tạo, cùng ký kết Bản Hiến chương Thị trường Tự do để bảo vệ sân chơi chung cho toàn thể nhân loại sau khi thoát khỏi vùng thảm họa.'
        ],
        dialogue: { speaker: 'Vị đại diện Hội đồng', text: 'Cô có thể tiếp tục lớn cho đến khi có người chặn cô. Hoặc cô có thể giúp viết cái hàng rào mà sau này chính cô cũng muốn sống bên trong.' },
        question: {
            prompt: "Quy luật giá trị biểu hiện sự vận động thông qua sự vận động của:",
            options: [
                "Giá cả hàng hoá",
                "Giá cả sản xuất",
                "Giá cả độc quyền",
                "Cả a, b và c"
            ],
            correctIndex: 0,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Ký hiến chương, tự giới hạn quyền lực',
                desc: 'Chấp nhận luật chơi chung, xây dựng thị trường bền vững.',
                deltas: { capital: -4, share: -2, reputation: 8, trust: 8, gov: 6, legal: -6 },
                outcome: 'Bạn đặt bút ký cam kết tự nguyện giới hạn quyền lực thị trường, chia sẻ hạ tầng dùng chung cho các đơn vị nhỏ. Bạn từ bỏ vị thế độc quyền tối thượng để đổi lấy sự phát triển hài hòa, bền vững cho toàn Vành Đai.',
                card: 'hien-chuong'
            },
            {
                title: 'Từ chối, tiếp tục mở rộng',
                desc: 'Tối đa hóa quy mô cá nhân, mặc kệ rủi ro dài hạn.',
                deltas: { capital: 12, share: 8, reputation: -4, trust: -4, gov: -5, legal: 8 },
                outcome: 'Bạn từ chối ký kết, quyết định đi theo con đường tư bản độc quyền đến cùng để thâu tóm mọi đối thủ. Sức mạnh tài chính đạt đỉnh cao, nhưng bạn phải đối mặt với sự cô lập và căm ghét từ khắp nơi.',
                card: 'luat-chong-doc-quyen'
            },
            {
                title: 'Đề nghị mở rộng hiến chương cho cả đối thủ',
                desc: 'Cần Uy tín ≥ 30 và Niềm tin ≥ 35. Kiến tạo sân chơi.',
                require: { reputation: 30, trust: 35 },
                deltas: { capital: -6, share: 3, reputation: 10, trust: 10, gov: 8, legal: -8 },
                outcome: 'Bạn đề xuất nâng cấp bản Hiến chương thành liên minh mở rộng, kêu gọi cả các tập đoàn đối thủ cũ cùng tham gia ký kết dưới sự giám sát minh bạch của cộng đồng người tiêu dùng.',
                card: 'lien-minh'
            }
        ]
    },
    {
        id: 12, act: 2, year: 2136, place: 'Aegis-7 · Bàn Điều Khiển Trung Tâm - Hải Đăng S.O.S', stage: 'Phán quyết tối hậu',
        title: 'Mười hai năm, một bản Hiến chương', scene: '🌟',
        situation: [
            'Bằng phát đạn Plasma Blaster năng lượng tối thượng, Unit-07 bắn xuyên tim Nữ Chúa Xenomorph! Quái thú khổng lồ đổ gục xuống sàn đài chỉ huy, bầy quái vật còn lại tan tác tháo chạy vào không gian tối tăm. Bàn điều khiển trung tâm của phi thuyền Aegis-7 đã hoàn toàn được giải phóng.',
            'Trước mắt bạn là khe cắm Thẻ Khóa Năng Lượng Hải Đăng S.O.S. Ngoài ô kính buồng lái, mười hai năm trôi qua trên hải trình Vành Đai, bạn nhìn lại những chặng đường đã qua: từ quầy sinh khối nhỏ bé mười hai mét vuông đến vận mệnh của cả một nền kinh tế. Giờ là lúc đưa ra phán quyết cuối cùng trước khi phóng tín hiệu cứu hộ lên dải Ngân Hà.'
        ],
        dialogue: { speaker: 'Hệ thống AI Trung Tâm Aegis-7', text: 'Nữ Chúa đã bị tiêu diệt. Bàn điều khiển sẵn sàng. Xin hãy xác nhận triết lý vận hành cốt lõi trước khi kích hoạt Hải Đăng Cứu Hộ S.O.S.' },
        question: {
            prompt: "Cổ phiếu và trái phiếu là hình thức đầu tư. Chọn các ý đúng dưới đây:",
            options: [
                "Mua cổ phiếu và trái phiếu đều có thời hạn, hết thời hạn người sở hữu chúng được thanh toán",
                "Lãi cổ phiếu và trái phiếu đều phụ thuộc kết quả kinh doanh của công ty",
                "Cổ phiếu và trái phiếu đều có thể đem bán",
                "Cả a, b và c"
            ],
            correctIndex: 2,
            explanation: "Đáp án chính xác theo giáo trình Kinh tế chính trị Mác – Lênin."
        },
        choices: [
            {
                title: 'Thâu tóm phần còn lại của thị trường',
                desc: 'Độc chiếm toàn bộ Vành đai, không để ai cạnh tranh.',
                deltas: { capital: 18, share: 12, reputation: -4, trust: -5, gov: -3, legal: 10 },
                outcome: 'Bạn tận dụng chiến thắng để mua đứt toàn bộ tàn dư của các đối thủ, thiết lập Đế Chế Độc Quyền tuyệt đối. Cột sáng S.O.S vút lên trời cao, nhưng thị trường tương lai giờ đây chỉ còn duy nhất một tiếng nói của bạn.',
                card: 'thon-tinh-sap-nhap'
            },
            {
                title: 'Thu hẹp, quay về sản phẩm tốt nhất',
                desc: 'Tập trung vào chất lượng cốt lõi và đổi mới sáng tạo.',
                deltas: { capital: -6, share: -4, reputation: 10, trust: 10, gov: 4, legal: -6 },
                outcome: 'Bạn quyết định tinh gọn bộ máy, thoái vốn khỏi các lĩnh vực không cốt lõi để tập trung vào nghiên cứu sản phẩm sinh học đỉnh cao. Sự sáng tạo thuần túy đưa Trà Mộc trở thành biểu tượng đổi mới công nghệ vang danh ngân hà.',
                card: 'doi-moi'
            },
            {
                title: 'Mở hạ tầng, cùng đối thủ xây thị trường',
                desc: 'Cần Niềm tin ≥ 40 và Uy tín ≥ 35. Di sản dài lâu.',
                require: { trust: 40, reputation: 35 },
                deltas: { capital: -8, share: 5, reputation: 12, trust: 12, gov: 8, legal: -10 },
                outcome: 'Bạn cắm thẻ khóa kích hoạt Hải Đăng S.O.S đồng thời ban bố Bản Hiến Chương Mộc: mở toang hạ tầng phân phối, chia sẻ tri thức và xây dựng một thị trường cạnh tranh công bằng, nhân văn cho muôn thế hệ mai sau.',
                card: 'hien-chuong'
            }
        ]
    }
];

/* ---------------------------------------------------------------- */
/* 4. SÁU KẾT CỤC                                                   */
/* ---------------------------------------------------------------- */

const ENDINGS = [
    {
        id: 'empire', code: 'KẾT THÚC 01', tag: 'QUYỀN LỰC', icon: '♛',
        title: 'ĐẾ CHẾ ĐỘC QUYỀN',
        quote: 'Khi không còn ai dám cạnh tranh, giá cả không còn là câu chuyện của thị trường — nó là câu chuyện của một người.',
        summary: [
            'Trà Mộc trở thành cái tên mặc định. Mười năm sau, mỗi ly trà trong Vành đai đều đi qua một cánh cửa của bạn. Nhà đầu tư ca ngợi “hiệu quả quy mô”; khách hàng thì quen dần với việc trả nhiều hơn mà không còn lựa chọn nào khác.',
            'Bạn đã thắng. Nhưng thị trường không còn là nơi thử thách ý tưởng mới, mà là một hành lang chỉ có một lối vào. Những quầy nhỏ từng là đối thủ giờ trở thành khách thuê module của bạn. Cái giá của đế chế không nằm trên hoá đơn — nó nằm ở việc không ai còn dám thử.'
        ],
        lesson: 'Độc quyền có thể tạo lợi nhuận bền vững cho một doanh nghiệp, nhưng khi quyền lực thị trường bị lạm dụng, người tiêu dùng mất lựa chọn và nền kinh tế mất động lực đổi mới. Thành công không tự động là lạm dụng — nhưng cần cơ chế để thành công không chặn đường người khác.',
        cards: ['doc-quyen-tu-nhan', 'loi-nhuan-doc-quyen', 'thao-tung-gia']
    },
    {
        id: 'breakup', code: 'KẾT THÚC 02', tag: 'PHÁP LÝ', icon: '⚖',
        title: 'NGÀY CÔNG TY BỊ CHIA TÁCH',
        quote: 'Luật không trừng phạt việc bạn lớn. Luật trừng phạt việc bạn dùng cái lớn để không ai được lớn.',
        summary: [
            'Bản án dài hơn bạn tưởng. Ủy ban Cạnh tranh Liên bang kết luận Trà Mộc lạm dụng vị thế thống lĩnh, chặn đối thủ tiếp cận nguồn lá Mộc và hệ thống phân phối. Công ty phải tách mảng bán lẻ, mảng thủy canh và nền tảng giao hàng thành ba pháp nhân độc lập.',
            'Ngày chia tách, bạn đứng giữa văn phòng trống trên Ga Trung Tâm. Ba công ty mới vẫn mang những cái tên quen thuộc, nhưng không còn là đế chế của bạn. Thị trường thở lại. Ba năm sau, một trong những công ty tách ra tung ra sản phẩm mà Trà Mộc cũ chưa từng nghĩ tới — vì ngày đó, không ai còn sợ phải khác bạn.'
        ],
        lesson: 'Luật chống độc quyền không nhằm làm doanh nghiệp yếu đi, mà để bảo vệ khả năng cạnh tranh. Các biện pháp từ phạt tiền đến chia tách nhằm khôi phục lựa chọn cho thị trường. Phòng ngừa bằng hành vi đúng luật luôn rẻ hơn đối phó với điều tra.',
        cards: ['luat-chong-doc-quyen', 'chia-tach', 'thao-tung-gia']
    },
    {
        id: 'collapse', code: 'KẾT THÚC 03', tag: 'SINH TỒN', icon: '◌',
        title: 'KHI KÉT SẮT TRỐNG RỖNG',
        quote: 'Một công ty có thể chết vì thiếu khách. Nhiều công ty chết vì quá tin rằng mình không thể chết.',
        summary: [
            'Những ki-ốt mở quá nhanh, những hợp đồng thuê module mười năm, những đợt khuyến mãi để đè đối thủ — tất cả đến hạn cùng lúc. Dòng tiền mỏng như tờ giấy. Khi nhà cung cấp ngừng giao lá Mộc vì công nợ, chuỗi Trà Mộc dừng lại giữa một buổi sáng bình thường.',
            'Bạn học được bài học cuối cùng: thị phần không trả được lương. Niềm tin của khách có thể xây lại, nhưng một doanh nghiệp không còn tiền để qua tháng thì không còn cơ hội thử. Người mua thiệt, nhân viên mất việc, và đối thủ tiếp quản những gì còn lại.'
        ],
        lesson: 'Tăng trưởng phải đi cùng khả năng chịu đựng tài chính. Mở rộng quá nhanh, đốt vốn để giành thị phần, hoặc phụ thuộc vào một nhà cung cấp đều là rủi ro sống còn. Cạnh tranh là cuộc chạy dài, không phải một cú nước rút.',
        cards: ['chien-tranh-gia', 'thi-phan', 'ban-pha-gia']
    },
    {
        id: 'innovation', code: 'KẾT THÚC 04', tag: 'BỀN VỮNG', icon: '✦',
        title: 'DẪN ĐẦU NHỜ ĐỔI MỚI',
        quote: 'Bạn không cần chặn người khác để dẫn đầu. Bạn chỉ cần chạy nhanh hơn theo cách chưa ai từng chạy.',
        summary: [
            'Trà Mộc không phải công ty lớn nhất, nhưng là công ty được nhắc đến nhiều nhất mỗi khi có một sản phẩm mới. Bạn giữ vị thế bằng vùng thủy canh minh bạch, công thức độc quyền có thời hạn và một nền tảng mở cho quầy nhỏ cùng dùng. Đối thủ vẫn cạnh tranh — và chính điều đó khiến bạn không ngủ quên.',
            'Mười năm sau, bạn không sở hữu toàn bộ thị trường. Bạn sở hữu thứ khó hơn: sự tôn trọng. Khách hàng chọn bạn vì bạn tốt hơn, không phải vì họ không còn ai khác. Các nhà đầu tư gọi đó là “lợi thế cạnh tranh bền vững”. Bạn gọi đó là lý do mình vẫn còn tò mò mỗi sáng.'
        ],
        lesson: 'Lợi thế cạnh tranh bền vững đến từ năng lực đổi mới và niềm tin, không từ việc khoá đường người khác. Độc quyền có thể đến từ đổi mới hợp pháp, nhưng phải chịu áp lực của người tiêu dùng và pháp luật để không biến thành rào cản.',
        cards: ['doi-moi', 'niem-tin', 'canhtranh']
    },
    {
        id: 'boycott', code: 'KẾT THÚC 05', tag: 'NIỀM TIN', icon: '✕',
        title: 'BỊ TẨY CHAY',
        quote: 'Giá có thể giảm trong một ngày. Niềm tin mất đi thì phải mua lại bằng nhiều năm — nếu còn mua được.',
        summary: [
            'Câu chuyện bắt đầu từ một tấm ảnh chụp bảng giá và một đoạn video trong kho lạnh. Trong hai ngày, hashtag #TràMộcTăngGiá lan khắp bảng tin của cả ba vành đai. Khách quay lưng không phải vì giá cao, mà vì cảm giác bị lừa. Các đối thủ không cần làm gì — họ chỉ cần đứng yên và mở cửa.',
            'Bạn thuê công ty truyền thông, xin lỗi, giảm giá trở lại. Nhưng niềm tin không phải một cái công tắc. Doanh thu hồi phục chậm; nhân viên mất tinh thần; đối tác đòi điều khoản chặt hơn. Công ty vẫn tồn tại, nhưng cái tên Trà Mộc giờ luôn đi kèm một dấu hỏi.'
        ],
        lesson: 'Niềm tin người tiêu dùng là tài sản chiến lược. Thao túng giá có thể tạo lợi nhuận ngắn hạn nhưng đánh đổi bằng uy tín dài hạn. Khi người tiêu dùng có thông tin và lựa chọn, họ sẽ trừng phạt hành vi bóp méo thị trường nhanh hơn bất kỳ cơ quan nào.',
        cards: ['niem-tin', 'nguoi-tieu-dung', 'thao-tung-gia']
    },
    {
        id: 'charter', code: 'KẾT THÚC 06', tag: 'BÍ MẬT', icon: '❖',
        title: 'HIẾN CHƯƠNG MỘC',
        quote: 'Thị trường tốt nhất không phải nơi không có người thắng. Mà là nơi người thắng phải mở cửa cho người đến sau.',
        summary: [
            'Bạn không chọn bán công ty, cũng không chọn nuốt toàn bộ thị trường. Cùng với Hội đồng, các đối thủ nhỏ và đại diện người tiêu dùng, bạn ký một hiến chương thị trường: hạ tầng phân phối mở với giá hợp lý, dữ liệu giá công khai, quỹ đổi mới dành cho quầy nhỏ, và một cơ chế giám sát có người tiêu dùng ngồi cùng bàn.',
            'Không ai hoàn toàn hài lòng — đó là dấu hiệu nó thật. Trà Mộc vẫn có lợi nhuận, nhưng không còn đến từ việc chặn đường người khác. Mười năm sau, thị trường trà của Vành đai có nhiều thương hiệu hơn, giá minh bạch hơn và một câu chuyện mới: doanh nghiệp lớn có thể lớn mà không cần ai phải nhỏ lại.'
        ],
        lesson: 'Cạnh tranh và hợp tác không loại trừ nhau. Một thị trường lành mạnh cần doanh nghiệp, Nhà nước và người tiêu dùng cùng thiết kế luật chơi. Độc quyền bị giới hạn không chỉ bằng hình phạt, mà bằng thể chế minh bạch và quyền lựa chọn thực chất.',
        cards: ['hien-chuong', 'lien-minh', 'trach-nhiem']
    }
];

/* ---------------------------------------------------------------- */
/* 5. MƯỜI TÁM THẺ TRI THỨC                                         */
/* ---------------------------------------------------------------- */

const CARDS = {
    'canhtranh': {
        name: 'Cạnh tranh', icon: '⚔️',
        brief: 'Cạnh tranh là việc các doanh nghiệp cùng giành khách hàng bằng giá, chất lượng và dịch vụ. Cạnh tranh lành mạnh thường mang lại giá thấp hơn và nhiều lựa chọn hơn cho người tiêu dùng.',
        detail: 'Khi nhiều doanh nghiệp cùng bán một loại hàng hoá, người mua có quyền chọn. Doanh nghiệp muốn thắng phải liên tục cải thiện sản phẩm hoặc giảm chi phí. Đó là động lực khiến thị trường vận động, dù quá trình này luôn có người thua.'
    },
    'chien-tranh-gia': {
        name: 'Chiến tranh giá', icon: '🏷️',
        brief: 'Giảm giá để giành thị phần có thể mở rộng khách hàng, nhưng nếu kéo dài dưới chi phí, doanh nghiệp đốt vốn và dễ biến thành bán phá giá.',
        detail: 'Chiến tranh giá thường bắt đầu như một chiêu khuyến mãi. Nếu cả hai bên cùng giảm, lợi ích ngắn hạn thuộc về người tiêu dùng, nhưng doanh nghiệp yếu vốn sẽ bị loại khỏi cuộc chơi. Khi đối thủ biến mất, người thắng có động cơ nâng giá trở lại.'
    },
    'doc-quyen-tu-nhan': {
        name: 'Độc quyền tư nhân', icon: '🏛️',
        brief: 'Một doanh nghiệp tư nhân nắm phần lớn thị trường hoặc nguồn cung, có thể tự đặt giá và gây sức ép lên đối tác.',
        detail: 'Độc quyền tư nhân hình thành nhờ lợi thế công nghệ, vốn, thương hiệu hoặc bằng cách mua lại đối thủ. Nó không tự động bất hợp pháp, nhưng khi doanh nghiệp lạm dụng để loại đối thủ hoặc bóp người tiêu dùng, pháp luật cạnh tranh sẽ vào cuộc.'
    },
    'doc-quyen-nha-nuoc': {
        name: 'Độc quyền nhà nước', icon: '🏢',
        brief: 'Nhà nước nắm giữ hoặc bảo hộ một lĩnh vực then chốt. Có thể ổn định an sinh, nhưng thiếu cạnh tranh dễ làm giá cao và dịch vụ chậm đổi mới.',
        detail: 'Một số ngành như năng lượng, nước tái chế, cổng nhảy liên sao được Liên bang nắm độc quyền vì lợi ích công cộng và chi phí hạ tầng lớn. Vấn đề là thiết kế cơ chế giám sát để doanh nghiệp nhà nước không lạm dụng vị thế, và để khu vực tư nhân được tham gia ở phần có thể cạnh tranh.'
    },
    'loi-nhuan-doc-quyen': {
        name: 'Lợi nhuận độc quyền', icon: '💎',
        brief: 'Là phần lợi nhuận vượt mức cạnh tranh nhờ vị thế thị trường: giá bán cao hơn chi phí biên đáng kể mà không bị đối thủ kéo xuống.',
        detail: 'Trong cạnh tranh, lợi nhuận cao sẽ hút thêm doanh nghiệp gia nhập và dần bị san phẳng. Với độc quyền, rào cản gia nhập giữ lợi nhuận siêu ngạch lại trong tay một số ít. Phần chênh lệch đó thường do người tiêu dùng trả.'
    },
    'thon-tinh-sap-nhap': {
        name: 'Thôn tính & sáp nhập', icon: '🤝',
        brief: 'Mua lại hoặc hợp nhất doanh nghiệp khác giúp mở rộng thị phần nhanh, nhưng có thể tạo vị thế thống lĩnh và bị cơ quan cạnh tranh xem xét.',
        detail: 'Sáp nhập có thể mang lại hiệu quả kinh tế thật: giảm chi phí, chia sẻ công nghệ, cứu doanh nghiệp đang chết. Nhưng nếu một thương vụ khiến thị trường chỉ còn vài người chơi hoặc đẩy đối thủ nhỏ ra ngoài, nó trở thành vấn đề cạnh tranh.'
    },
    'thao-tung-gia': {
        name: 'Thao túng giá', icon: '🎭',
        brief: 'Găm hàng, tung tin thất thiệt hoặc bắt tay đẩy giá lên là hành vi bóp méo thị trường, gây thiệt hại trực tiếp cho người tiêu dùng.',
        detail: 'Thao túng giá tạo ra khan hiếm giả. Người mua phải trả nhiều hơn trong khi lượng hàng thật không đổi. Khi bị phát hiện, doanh nghiệp đối diện xử phạt, bồi thường và mất niềm tin — thứ khó mua lại hơn tiền.'
    },
    'luat-chong-doc-quyen': {
        name: 'Luật chống độc quyền', icon: '⚖️',
        brief: 'Pháp luật cạnh tranh cấm lạm dụng vị thế thống lĩnh, thoả thuận hạn chế cạnh tranh và sáp nhập gây hại cho thị trường.',
        detail: 'Luật không trừng phạt việc thành công. Luật trừng phạt việc dùng thành công để chặn đường người khác. Các công cụ thường gặp: điều tra, phạt tiền, buộc chia tách, cấm sáp nhập hoặc yêu cầu mở hạ tầng cho đối thủ.'
    },
    'cartel': {
        name: 'Cartel', icon: '🕳️',
        brief: 'Các đối thủ bí mật bắt tay giữ giá hoặc chia thị trường. Đây là thoả thuận hạn chế cạnh tranh, bị phạt nặng khi bị phát hiện.',
        detail: 'Cartel nguy hiểm vì nó giả lập một thị trường ổn định nhưng lấy đi lợi ích của người mua. Mỗi doanh nghiệp tham gia đều có động cơ phá cam kết để giành khách, nên cartel thường mong manh và cần cơ chế trừng phạt nội bộ — dấu hiệu dễ bị phát hiện.'
    },
    'thi-phan': {
        name: 'Thị phần', icon: '📊',
        brief: 'Tỷ lệ doanh thu hoặc sản lượng của doanh nghiệp trên toàn thị trường. Thị phần cao tạo quyền lực thị trường nhưng không đồng nghĩa với độc quyền.',
        detail: 'Thị phần chỉ là một thước đo. Một doanh nghiệp có thể có thị phần lớn nhờ sản phẩm tốt mà không lạm dụng. Ngược lại, thị phần vừa phải nhưng kiểm soát nguyên liệu đầu vào vẫn có thể gây sức ép độc quyền.'
    },
    'ban-pha-gia': {
        name: 'Bán phá giá', icon: '📉',
        brief: 'Bán dưới chi phí để loại đối thủ rồi nâng giá sau đó. Hành vi này bị coi là cạnh tranh không lành mạnh khi nhằm mục đích loại bỏ đối thủ.',
        detail: 'Bán lỗ không phải lúc nào cũng xấu: khuyến mãi, xả hàng tồn kho là bình thường. Ranh giới nằm ở ý định và khả năng bù lỗ kéo dài. Nếu doanh nghiệp có tiềm lực tài chính lớn dùng giá thấp để đẩy đối thủ ra, người tiêu dùng hưởng lợi ngắn hạn nhưng mất lựa chọn dài hạn.'
    },
    'niem-tin': {
        name: 'Niềm tin người tiêu dùng', icon: '♡',
        brief: 'Là tài sản vô hình. Một scandal giá hoặc lao động có thể xoá sổ nhiều năm xây dựng thương hiệu.',
        detail: 'Niềm tin không nằm trên bảng cân đối kế toán nhưng quyết định việc khách có quay lại hay không. Khi khách nghi ngờ, họ không chỉ bỏ đi — họ còn kể cho người khác. Chi phí giành lại niềm tin thường cao hơn chi phí phòng ngừa rất nhiều.'
    },
    'doi-moi': {
        name: 'Đổi mới sáng tạo', icon: '✦',
        brief: 'Cách bền vững nhất để giữ vị thế là làm sản phẩm tốt hơn, chứ không phải dựng rào cản để chặn đối thủ.',
        detail: 'Đổi mới tạo ra giá trị mới thay vì chia lại miếng bánh cũ. Nó cũng là lý do chính đáng để doanh nghiệp lớn có lợi nhuận cao: họ đã đầu tư và chấp nhận rủi ro. Cạnh tranh bằng đổi mới thường không cần Nhà nước phải can thiệp.'
    },
    'trach-nhiem': {
        name: 'Trách nhiệm xã hội', icon: '🏭',
        brief: 'Doanh nghiệp lớn phải cân bằng lợi nhuận với người lao động và cộng đồng; mất cân bằng sẽ tạo áp lực pháp lý và uy tín.',
        detail: 'Trách nhiệm xã hội không chỉ là thiện nguyện. Nó là cách quản trị rủi ro: điều kiện lao động tốt giảm đình công, chuỗi cung ứng minh bạch giảm scandal, và cộng đồng địa phương trở thành người ủng hộ thay vì người phản đối.'
    },
    'chia-tach': {
        name: 'Chia tách doanh nghiệp', icon: '✂️',
        brief: 'Biện pháp cơ cấu lại khi một doanh nghiệp quá lớn hoặc lạm dụng vị thế, nhằm khôi phục cạnh tranh.',
        detail: 'Chia tách là công cụ mạnh và hiếm dùng. Nó có thể phá huỷ hiệu quả kinh tế có thật, nên cơ quan quản lý thường ưu tiên biện pháp nhẹ hơn: buộc mở hạ tầng, cấm hành vi, phạt tiền. Chia tách chỉ hợp lý khi cấu trúc thị trường tự nó chặn cạnh tranh.'
    },
    'lien-minh': {
        name: 'Liên minh cạnh tranh', icon: '🕊️',
        brief: 'Hợp tác giữa doanh nghiệp, hợp tác xã và người tiêu dùng có thể tạo giá trị chung mà không cần thao túng thị trường.',
        detail: 'Liên minh khác cartel ở chỗ nó mở rộng giá trị thay vì giới hạn cạnh tranh: chia sẻ hạ tầng, cùng xây tiêu chuẩn, cùng mua nguyên liệu minh bạch. Khi lợi ích được chia sẻ công khai, người tiêu dùng cũng là một bên thắng.'
    },
    'nguoi-tieu-dung': {
        name: 'Người tiêu dùng', icon: '🧑',
        brief: 'Người mua là bên cuối cùng trả giá cho mọi quyết định thị trường. Bảo vệ lựa chọn và thông tin của họ là nền tảng của cạnh tranh.',
        detail: 'Người tiêu dùng không chỉ là người mua. Họ là người bỏ phiếu bằng ví tiền mỗi ngày. Khi thông tin minh bạch và quyền lựa chọn được bảo vệ, doanh nghiệp phải cạnh tranh bằng giá trị thật. Khi thông tin bị bóp méo, cả thị trường cùng trả giá.'
    },
    'hien-chuong': {
        name: 'Hiến chương thị trường', icon: '📜',
        brief: 'Một mô hình đồng thuận: doanh nghiệp tự nguyện giới hạn quyền lực, chia sẻ hạ tầng, Nhà nước giám sát minh bạch, người tiêu dùng có tiếng nói.',
        detail: 'Đây không phải một văn bản pháp luật cứng nhắc mà là cam kết nhiều bên. Doanh nghiệp lớn mở hạ tầng cho đối thủ nhỏ với giá hợp lý; Nhà nước đặt chuẩn giám sát và công bố dữ liệu; người tiêu dùng có kênh phản hồi thực chất. Lợi nhuận vẫn tồn tại, nhưng không đến từ việc chặn người khác.'
    }
};

/* ---------------------------------------------------------------- */
/* 6. XẾP HẠNG KẾT CỤC                                              */
/* ---------------------------------------------------------------- */

/**
 * Chọn kết cục dựa trên chỉ số cuối cùng và các quyết định then chốt.
 * Thứ tự kiểm tra chính là thứ tự ưu tiên: kết cục bi kịch được xét trước
 * để người chơi không thể "thắng" bằng cách vừa phạm luật vừa giữ điểm đẹp.
 */
function resolveEnding(stats, log) {
    const count = (card) => log.filter((entry) => entry.card === card).length;

    // 03 · Sinh tồn — cạn vốn là chết, bất kể uy tín.
    if (stats.capital <= 8) return 'collapse';

    // 02 · Pháp lý — áp lực pháp lý chạm trần.
    if (stats.legal >= 80) return 'breakup';

    // 05 · Niềm tin — bị tẩy chay khi khách hàng quay lưng.
    if (stats.trust <= 12) return 'boycott';

    // 06 · Hiến chương — cần cả uy tín, niềm tin lẫn quan hệ chính quyền.
    if (stats.trust >= 70 && stats.reputation >= 55 && stats.gov >= 60 && stats.legal <= 35) {
        return 'charter';
    }

    // 01 · Đế chế — thống lĩnh thị trường nhưng đánh đổi niềm tin.
    if (stats.share >= 62 && stats.trust < 55 && count('thon-tinh-sap-nhap') >= 2) {
        return 'empire';
    }

    // 04 · Đổi mới — mặc định tích cực khi vẫn giữ được niềm tin và uy tín.
    if (stats.trust >= 45 && stats.reputation >= 40) return 'innovation';

    // Còn lại: nếu luật đã siết thì chia tách, nếu không thì đế chế.
    return stats.legal >= 55 ? 'breakup' : 'empire';
}

/* ---------------------------------------------------------------- */
/* 7. TRUYỆN MỞ ĐẦU                                                 */
/* ---------------------------------------------------------------- */

const INTRO_SCENES = [
    {
        id: 'intro-ship',
        kicker: 'HẢI TRÌNH 2124 · TÀU VẬN TẢI TRÀ MỘC',
        title: 'Sứ mệnh giao thương trà giữa các vì sao',
        desc: 'Phi thuyền chuyên dụng Aegis-7 của Tập đoàn Trà Mộc mang theo hàng ngàn container trà Mộc thủy canh thượng hạng và tinh dầu trà sinh thái đi trao đổi với các trạm không gian Liên bang Vành đai. Đây là hải trình thương mại chiến lược của tập đoàn.'
    },
    {
        id: 'intro-crash',
        kicker: 'BIẾN CỐ · THIÊN THẠCH & DỊ VẬT',
        title: 'Bão thiên thạch và cú rơi kinh hoàng',
        desc: 'Bão thiên thạch không gian bất ngờ tập kích xé toạc các tấm chắn phản lực. Tàu rơi khẩn cấp xuống tinh cầu hoang phế ngoài rìa Ngân Hà. Vỏ tàu nứt toác, hương thơm trà quý rò rỉ thu hút bầy dị vật Xenomorph khát máu tràn vào cắn phá các khoang ủ trà!'
    },
    {
        id: 'intro-mission',
        kicker: 'MỤC TIÊU CHIẾN DỊCH',
        title: 'Robot Unit-07 nạp đạn Plasma bảo vệ kho trà',
        desc: 'Mỗi câu hỏi tri thức giải mã chính xác sẽ nạp năng lượng Plasma Blaster cho Robot Unit-07 tiêu diệt quái vật. Hãy bảo vệ các khoang trà, vượt qua 3 khu vực và tiến tới Cầu Tàu phát tín hiệu cứu hộ S.O.S!'
    }
];

/* ---------------------------------------------------------------- */
/* 8. DỮ LIỆU ĐIỆN ẢNH & ĐẤU TRƯỜNG QUÁI VẬT                        */
/* ---------------------------------------------------------------- */

const AEGIS_STORY = {
    intro: {
        title: "BÁO ĐỘNG ĐỎ: TÀU VẬN TẢI TRÀ MỘC BỊ TẬP KÍCH",
        subtitle: "Hải trình giao thương của phi thuyền vận tải Aegis-7 thuộc Tập đoàn Trà Mộc",
        scenes: [
            {
                id: "scene-tea-cargo",
                title: "HỒI I: HẢI TRÌNH GIAO THƯƠNG TRÀ MỘC LIÊN HÀNH TINH",
                desc: "Năm 2124, phi thuyền vận tải chuyên dụng Aegis-7 của Tập đoàn Trà Mộc mang theo lô hàng chiến lược: hàng ngàn container trà Mộc Thủy Canh Thượng Hạng và tinh dầu trà sinh thái lượng tử trên hải trình giao thương với các trạm không gian Liên bang Vành đai.",
                duration: 4500,
                image: "assets/cinematic_meteor.jpg"
            },
            {
                id: "scene-meteor-crash",
                title: "HỒI II: BÃO THIÊN THẠCH & HẠ CÁNH KHẨN CẤP",
                desc: "Bão thiên thạch không gian bất ngờ ập tới xé toạc các tấm chắn phản lực trọng trường. Con tàu bốc cháy dữ dội, chao đảo và lao thẳng xuống va chạm kinh hoàng trên một hành tinh hoang phế ngoài rìa Ngân Hà.",
                duration: 4500,
                image: "assets/cinematic_crash.jpg"
            },
            {
                id: "scene-tea-breach",
                title: "HỒI III: DỊ VẬT XENOMORPH ĐỘT KÍCH KHO TRÀ",
                desc: "Lớp vỏ tàu nứt toác, các module ủ trà thủy canh chấn động vỡ vụn. Mùi hương thảo mộc nồng nàn và bức xạ sinh thái thoát ra đã kích thích khứu giác bầy dị vật Xenomorph khát máu. Chúng ồ ạt tràn vào cắn phá các khoang hàng trà quý!",
                duration: 4500,
                image: "assets/cinematic_swarm.jpg"
            },
            {
                id: "scene-robot-defense",
                title: "HỒI IV: ROBOT UNIT-07 BẢO VỆ TINH HOA TRÀ MỘC",
                desc: "Robot Bảo An UNIT-07 kích hoạt súng Plasma Blaster và khiên 200 HP. Hãy trả lời đúng các câu hỏi tri thức và đưa ra các quyết định chiến lược để nạp đạn Plasma, quét sạch dị vật, bảo vệ nguyên vẹn các mẫu trà Mộc và mở đường tới Cầu Tàu phát tín hiệu S.O.S!",
                duration: 5000,
                image: "assets/robot_hero.jpg"
            }
        ]
    },
    transition1: {
        title: "DỌN SẠCH KHO HÀNG TRÀ THỦY CANH (CARGO BAY)",
        subtitle: "Vượt qua Hồi I: Khởi nghiệp · Tiến sâu vào Khoang Ủ Trà & Lò Phản Ứng",
        paragraphs: [
            "Bầy bọ Swarm Drones cắn phá các container Trà Mộc đã bị quét sạch bởi hỏa lực Plasma kiên cường của Unit-07.",
            "Tại trạm, thương hiệu Trà Mộc đã vượt qua giai đoạn khởi nghiệp khốc liệt nhất, bảo toàn được các thùng nguyên liệu lá Mộc đầu tiên.",
            "Tuy nhiên, cảm biến sinh học cảnh báo các cá thể bọc giáp gai — Xeno Brutes — đang cố gắng xâm nhập Lò phản ứng & Dây chuyền ủ nhiệt, nhằm phá hủy toàn bộ hệ sinh thái sản xuất trà độc quyền. Hãy nạp đạn và tiến lên bảo vệ dây chuyền!"
        ],
        buttonText: "TIẾN VÀO DÂY CHUYỀN Ủ TRÀ (HỒI II) ➔"
    },
    transition2: {
        title: "BẢO VỆ THÀNH CÔNG DÂY CHUYỀN Ủ NHIỆT",
        subtitle: "Vượt qua Hồi II: Mở rộng · Cánh cửa dẫn tới Cầu Tàu & Kho Mẫu Trà Tổ",
        paragraphs: [
            "Lũ dị vật giáp gai bốc cháy trước hỏa lực của Unit-07. Lò phản ứng và buồng ủ trà đã được cô lập an toàn.",
            "Nhưng trước cửa Đài chỉ huy (Bridge) — nơi lưu giữ mẫu trà tổ hoàng gia và trạm phát sóng cứu hộ S.O.S, mặt sàn rung chuyển dữ dội... NỮ CHÚA XENOMORPH (HIVE QUEEN BOSS) khổng lồ, hiện thân của thế lực tàn phá tối thượng đang chực chờ nuốt chửng tất cả.",
            "Đây là trận quyết chiến sinh tử để bảo vệ tinh hoa Trà Mộc, mở khóa bảng điều khiển và phát tín hiệu S.O.S triệu hồi hạm đội cứu viện!"
        ],
        buttonText: "QUYẾT CHIẾN NỮ CHÚA BẢO VỆ TRÀ MỘC (HỒI III) ➔"
    },
    epilogue: {
        title: "TÍN HIỆU CỨU HỘ VƯƠN XA — BẢO VỆ TRỌN VẸN TRÀ MỘC",
        subtitle: "Đánh bại Nữ Chúa · Kích hoạt Hải Đăng S.O.S Tập Đoàn Trà Mộc",
        scenes: [
            {
                id: "scene-queen-down",
                title: "HỒI KẾT: NỮ CHÚA GỤC NGÃ — KHO MẪU TRÀ AN TOÀN",
                desc: "Với phát đạn Plasma Blaster năng lượng hủy diệt cuối cùng, Nữ Chúa gầm lên rồi đổ sụp xuống mặt sàn. Khoang lưu trữ mẫu trà tổ và công nghệ ủ trà độc quyền của Tập đoàn Trà Mộc đã được bảo vệ toàn vẹn trước nanh vuốt quái vật!",
                duration: 4500,
                image: "assets/alien_queen.jpg"
            },
            {
                id: "scene-beacon",
                title: "KHỞI ĐỘNG HẢI ĐĂNG CỨU HỘ VỀ TẬP ĐOÀN TRÀ MỘC",
                desc: "Robot Unit-07 cắm thẻ khóa năng lượng vào bàn điều khiển chính. Cột Hải Đăng mang tần số định danh của Tập đoàn Trà Mộc phóng vút qua tầng khí quyển, truyền tín hiệu giải cứu về phi đội cứu hộ không gian, hoàn thành xuất sắc sứ mệnh giao thương vĩ đại!",
                duration: 5000,
                image: "assets/cinematic_beacon.jpg"
            }
        ]
    }
};

const SECTOR_MONSTERS = [
    // Hồi I (Chương 1–4): Kho Hàng Trà - 4 Drones (1 HP mỗi con)
    [
        { id: 's1_drone1', name: 'Bọ Cắn Phá Trà α', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's1_drone2', name: 'Bọ Cắn Phá Trà β', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's1_drone3', name: 'Bọ Cắn Phá Trà γ', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's1_drone4', name: 'Bọ Cắn Phá Trà δ', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' }
    ],
    // Hồi II (Chương 5–8): Lò Phản Ứng & Dây Chuyền Ủ Trà - 2 Drones (1 HP) + 2 Brutes bọc giáp (1 HP)
    [
        { id: 's2_drone1', name: 'Dị Vật Đột Kích A', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's2_drone2', name: 'Dị Vật Đột Kích B', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's2_brute1', name: 'Xeno Phá Dây Chuyền X', type: 'large', hp: 1, maxHp: 1, image: 'assets/alien_large.jpg' },
        { id: 's2_brute2', name: 'Xeno Phá Dây Chuyền Y', type: 'large', hp: 1, maxHp: 1, image: 'assets/alien_large.jpg' }
    ],
    // Hồi III (Chương 9–12): Cầu Tàu & Kho Mẫu Trà Tổ - 1 Guard (1 HP) + Nữ Chúa Boss (3 HP) = 4 đòn bắn
    [
        { id: 's3_guard', name: 'Vệ Binh Xenomorph', type: 'small', hp: 1, maxHp: 1, image: 'assets/alien_small.jpg' },
        { id: 's3_queen', name: 'NỮ CHÚA XENOMORPH', type: 'queen', hp: 3, maxHp: 3, image: 'assets/alien_queen.jpg' }
    ]
];

