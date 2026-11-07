/**
 * DỮ LIỆU CỐT TRUYỆN & CÂU HỎI - AEGIS PROTOCOL: STARFALL
 * Bối cảnh: Tàu giao thương vũ trụ gặp nạn, bầy sinh vật ngoài hành tinh xâm nhập.
 * Robot Unit-07 "Aegis" chiến đấu theo lượt (Turn-based RPG) qua 3 khu vực.
 */

const AEGIS_STORY = {
    // 1. Phân cảnh mở đầu kiểu truyện tranh (Intro Cinematic)
    intro: {
        title: "BÁO ĐỘNG ĐỎ: THIÊN THẠCH TẬP KÍCH",
        subtitle: "Hải trình giao thương của phi thuyền vận tải Aegis-7",
        scenes: [
            {
                id: "scene-meteor",
                title: "HỒI I: BÃO THIÊN THẠCH KHÔNG GIAN",
                desc: "Năm 2284, trên hải trình vận chuyển khoáng thạch năng lượng đến nền văn minh Xylar, phi thuyền vận tải Aegis-7 bất ngờ va chạm dữ dội với cơn bão thiên thạch bí ẩn.",
                duration: 4000,
                image: "assets/cinematic_meteor.jpg"
            },
            {
                id: "scene-crash",
                title: "HỒI II: HẠ CÁNH KHẨN CẤP",
                desc: "Hệ thống phản lực trọng trường sụp đổ. Con tàu lao thẳng xuống bầu khí quyển mù mịt và va chạm kinh hoàng xuống một hành tinh cằn cỗi hoang phế ngoài rìa dải Ngân Hà.",
                duration: 4000,
                image: "assets/cinematic_crash.jpg"
            },
            {
                id: "scene-swarm",
                title: "HỒI III: DỊ VẬT NGOÀI HÀNH TINH XÂM NHẬP",
                desc: "Lớp vỏ tàu bị thủng. Hàng trăm sinh vật khát máu dạng Xenomorph ngửi thấy nguồn năng lượng và ồ ạt tràn vào xé toạc các hành lang. Robot bảo an UNIT-07 tự động kích hoạt vũ khí!",
                duration: 4500,
                image: "assets/cinematic_swarm.jpg"
            }
        ]
    },

    // 2. Chuyển đoạn giữa Phòng 1 và Phòng 2
    transition1: {
        title: "DỌN SẠCH KHO HÀNG (CARGO BAY)",
        subtitle: "Tiến sâu vào Khoang Động cơ Phản ứng",
        paragraphs: [
            "Bầy bọ Swarm Drones đầu tiên đã bị luồng đạn Plasma của Unit-07 quét sạch trong đống đổ nát của Khoang hàng.",
            "Tuy nhiên, cảm biến sinh học cảnh báo những cá thể ngoại lai to lớn hơn — Alien Warriors — đang cố gắng phá hủy lõi phản ứng năng lượng ở khoang tiếp theo.",
            "Hãy nạp đạn và tiến vào Lò Phản Ứng trước khi tàu phát nổ!"
        ],
        buttonText: "TIẾN VÀO LÒ PHẢN ỨNG ➔"
    },

    // 3. Chuyển đoạn giữa Phòng 2 và Phòng 3
    transition2: {
        title: "KHOANG ĐỘNG CƠ AN TOÀN",
        subtitle: "Cánh cửa dẫn tới Phòng Điều Khiển Trung Tâm",
        paragraphs: [
            "Lũ dị vật khổng lồ bốc cháy trước hỏa lực kiên cường của Unit-07. Lõi năng lượng đã được phong tỏa an toàn.",
            "Nhưng trước cửa Phòng Điều Khiển (Bridge), mặt sàn rung chuyển dữ dội... Một sinh vật khổng lồ với vương miện giáp xác dày đặc — ALIEN QUEEN (NỮ CHÚA HIVE MOTHER) đang chực chờ nuốt chửng kẻ xâm nhập.",
            "Đây là trận quyết chiến sinh tử để mở khóa bảng điều khiển và phát tín hiệu cứu hộ S.O.S!"
        ],
        buttonText: "ĐỐI ĐẦU NỮ CHÚA ALIEN QUEEN ➔"
    },

    // 4. Phân cảnh chiến thắng kết thúc game (Epilogue Cinematic)
    epilogue: {
        title: "TÍN HIỆU CỨU HỘ VƯƠN XA",
        subtitle: "Hoàn thành sứ mệnh sinh tồn của Unit-07",
        scenes: [
            {
                id: "scene-queen-down",
                title: "HỒI KẾT: NỮ CHÚA GỤC NGÃ",
                desc: "Với loạt đạn plasma năng lượng hủy diệt cuối cùng, Nữ Chúa gầm lên thảm thiết rồi đổ sụp xuống mặt sàn. Bầy quái vật còn lại tan tác tháo chạy vào bóng đêm.",
                duration: 4000,
                image: "assets/alien_queen.jpg"
            },
            {
                id: "scene-beacon",
                title: "KHỞI ĐỘNG HẢI ĐĂNG CỨU HỘ S.O.S",
                desc: "Unit-07 cắm thẻ khóa năng lượng vào bàn điều khiển chính. Cột sáng tín hiệu cứu hộ khẩn cấp phóng vút qua tầng khí quyển, xuyên thẳng vào vũ trụ bao la.",
                duration: 4500,
                image: "assets/cinematic_beacon.jpg"
            }
        ],
        paragraphs: [
            "Tín hiệu khẩn cấp đã được Hạm đội Cứu nạn Liên minh Thiên hà tiếp nhận thành công!",
            "Tàu hộ vệ USS-Hyperion đang trên đường nhảy qua lỗ sâu không gian để giải cứu trong vòng 48 giờ tiêu chuẩn.",
            "Bạn đã xuất sắc chỉ huy Robot Unit-07 đánh bại toàn bộ bầy quái vật và bảo vệ dữ liệu thương mại của phi thuyền!"
        ],
        buttonText: "XEM CHIẾN TÍCH & CHƠI LẠI"
    }
};

// ========================================================
// KHO CÂU HỎI THEO 3 PHÒNG THỬ THÁCH (QUIZ BATTLE DATA)
// ========================================================
const AEGIS_QUESTIONS = {
    // ----------------------------------------------------
    // PHÒNG 1: KHO HÀNG (CARGO BAY) - 4 CON NHỎ (1 HP MỖI CON)
    // ----------------------------------------------------
    sector1: [
        {
            id: "s1_q1",
            question: "Cảm biến robot phát hiện bầu khí quyển hành tinh lạ chứa nhiều khí vô sắc, chiếm 78% khí quyển Trái Đất. Đó là khí gì?",
            options: [
                "Khí Oxy (O2)",
                "Khí Nitơ (N2)",
                "Khí Cacbonic (CO2)",
                "Khí Hydro (H2)"
            ],
            correctIndex: 1,
            explanation: "Khí Nitơ (N2) chiếm khoảng 78% thể tích bầu khí quyển Trái Đất, trong khi Oxy chỉ chiếm khoảng 21%."
        },
        {
            id: "s1_q2",
            question: "Hành tinh nào trong Thái Dương Hệ được các phi hành gia mệnh danh là 'Hành Tinh Đỏ'?",
            options: [
                "Sao Hỏa (Mars)",
                "Sao Kim (Venus)",
                "Sao Mộc (Jupiter)",
                "Sao Thủy (Mercury)"
            ],
            correctIndex: 0,
            explanation: "Sao Hỏa có màu đỏ cam đặc trưng do bề mặt chứa lượng lớn oxit sắt (rỉ sét) phát tán trong bụi khí quyển."
        },
        {
            id: "s1_q3",
            question: "Để robot Unit-07 sạc đạn Plasma Blaster, trạng thái vật chất thứ tư sau Rắn, Lỏng, Khí là gì?",
            options: [
                "Chân không (Vacuum)",
                "Plasma",
                "Tinh thể lỏng (Liquid Crystal)",
                "Khí hóa lỏng (LPG)"
            ],
            correctIndex: 1,
            explanation: "Plasma là trạng thái vật chất thứ 4, trong đó các nguyên tử bị ion hóa mạnh tạo thành hỗn hợp electron tự do và ion dương."
        },
        {
            id: "s1_q4",
            question: "Vận tốc ánh sáng truyền trong chân không vũ trụ đạt khoảng bao nhiêu km/giây?",
            options: [
                "Khoảng 30.000 km/s",
                "Khoảng 300.000 km/s",
                "Khoảng 3.000.000 km/s",
                "Khoảng 150.000 km/s"
            ],
            correctIndex: 1,
            explanation: "Vận tốc ánh sáng trong chân không là hằng số vật lý c ≈ 299.792 km/s (xấp xỉ 300.000 km/giây)."
        },
        {
            id: "s1_q5",
            question: "Tàu Aegis-7 va chạm với thiên thạch. Vành đai tiểu hành tinh chính trong Hệ Mặt Trời nằm giữa quỹ đạo của 2 hành tinh nào?",
            options: [
                "Sao Hỏa và Sao Mộc",
                "Trái Đất và Sao Hỏa",
                "Sao Mộc và Sao Thổ",
                "Sao Kim và Trái Đất"
            ],
            correctIndex: 0,
            explanation: "Vành đai tiểu hành tinh chính (Asteroid Belt) nằm giữa quỹ đạo của Sao Hỏa và Sao Mộc, chứa hàng triệu mảnh thiên thạch."
        },
        {
            id: "s1_q6",
            question: "Thiết bị định vị vệ tinh trên phi thuyền thường sử dụng nguyên lý nào để xác định khoảng cách?",
            options: [
                "Đo bước chân cơ học",
                "Đo thời gian truyền tín hiệu vô tuyến (sóng điện từ)",
                "Đo nhiệt độ không khí",
                "Đo áp suất chất lỏng"
            ],
            correctIndex: 1,
            explanation: "Hệ thống định vị (như GPS) tính khoảng cách bằng cách đo thời gian sóng điện từ truyền từ vệ tinh đến bộ thu."
        },
        {
            id: "s1_q7",
            question: "Vật thể có lực hấp dẫn cực lớn đến mức ánh sáng cũng không thể thoát ra khỏi nó được gọi là gì?",
            options: [
                "Sao Lùn Trắng (White Dwarf)",
                "Lỗ Đen (Black Hole)",
                "Sao Xung (Pulsar)",
                "Tinh Vân (Nebula)"
            ],
            correctIndex: 1,
            explanation: "Lỗ đen vũ trụ có trường hấp dẫn cực kỳ mãnh liệt, vùng chân trời sự kiện của nó ngăn không cho bất kỳ vật chất hay photon ánh sáng nào thoát ra."
        },
        {
            id: "s1_q8",
            question: "Tên dải thiên hà mà Hệ Mặt Trời của Trái Đất đang quay xung quanh là gì?",
            options: [
                "Thiên hà Andromeda",
                "Dải Ngân Hà (Milky Way)",
                "Thiên hà Triangulum",
                "Đám mây Magellan Lớn"
            ],
            correctIndex: 1,
            explanation: "Hệ Mặt Trời của chúng ta nằm ở một nhánh xoắn ốc của Dải Ngân Hà (Milky Way), chứa từ 100 đến 400 tỷ ngôi sao."
        }
    ],

    // ----------------------------------------------------
    // PHÒNG 2: LÒ PHẢN ỨNG (REACTOR CORE) - 2 CON NHỎ (1 HP) + 2 CON LỚN (2 HP)
    // ----------------------------------------------------
    sector2: [
        {
            id: "s2_q1",
            question: "Lõi phản ứng hạt nhân của tàu Aegis-7 hoạt động dựa trên phản ứng phân hạch. Nhiên liệu phổ biến nhất dùng cho phản ứng này là nguyên tố nào?",
            options: [
                "Sắt (Fe)",
                "Uranium (U-235)",
                "Vàng (Au)",
                "Nhôm (Al)"
            ],
            correctIndex: 1,
            explanation: "Uranium (đặc biệt là đồng vị U-235) và Plutonium-239 là các nhiên liệu hạt nhân phổ biến dùng cho phản ứng phân hạch tỏa năng lượng."
        },
        {
            id: "s2_q2",
            question: "Định luật bảo toàn nào khẳng định năng lượng không tự nhiên sinh ra hay mất đi mà chỉ chuyển từ dạng này sang dạng khác?",
            options: [
                "Định luật Vạn vật hấp dẫn",
                "Định luật Bảo toàn Năng lượng",
                "Định luật Ác-si-mét",
                "Định luật Khúc xạ ánh sáng"
            ],
            correctIndex: 1,
            explanation: "Định luật bảo toàn năng lượng (Nguyên lý thứ nhất nhiệt động lực học) là nền tảng cốt lõi của vật lý vũ trụ."
        },
        {
            id: "s2_q3",
            question: "Hiện tượng nào xảy ra khi một ngôi sao khổng lồ cạn kiệt nhiên liệu và phát nổ cực mạnh vào cuối đời?",
            options: [
                "Hiện tượng Siêu Tân Tinh (Supernova)",
                "Hiện tượng Nhật Thực",
                "Hiện tượng Cực Quang",
                "Hiện tượng Sao Băng"
            ],
            correctIndex: 0,
            explanation: "Siêu tân tinh (Supernova) là vụ nổ hủy diệt khổng lồ giải phóng năng lượng sáng chói bằng cả một thiên hà."
        },
        {
            id: "s2_q4",
            question: "Lực nào giữ cho các hành tinh chuyển động quanh Mặt Trời mà không bị bay văng ra ngoài không gian?",
            options: [
                "Lực ma sát",
                "Lực hấp dẫn (Trọng lực)",
                "Lực đàn hồi",
                "Lực đẩy Archimedes"
            ],
            correctIndex: 1,
            explanation: "Lực hấp dẫn giữa khối lượng khổng lồ của Mặt Trời và các hành tinh đóng vai trò là lực hướng tâm giữ chúng trên quỹ đạo."
        },
        {
            id: "s2_q5",
            question: "Để robot Unit-07 di chuyển không bị giật, đơn vị đo lực trong Hệ đo lường quốc tế (SI) là gì?",
            options: [
                "Joule (J)",
                "Newton (N)",
                "Watt (W)",
                "Volt (V)"
            ],
            correctIndex: 1,
            explanation: "Newton (ký hiệu N) là đơn vị đo lực trong hệ SI, được đặt tên theo nhà bác học vĩ đại Isaac Newton."
        },
        {
            id: "s2_q6",
            question: "Ngôi sao nào ở gần Trái Đất nhất và cung cấp năng lượng ánh sáng cho sự sống?",
            options: [
                "Sao Bắc Cực (Polaris)",
                "Mặt Trời (Sun)",
                "Sao Alpha Centauri",
                "Sao Sirius"
            ],
            correctIndex: 1,
            explanation: "Mặt Trời chính là một ngôi sao dạng lùn vàng (G-type), ở khoảng cách trung bình xấp xỉ 150 triệu km so với Trái Đất."
        },
        {
            id: "s2_q7",
            question: "Hiện tượng bức xạ điện từ có bước sóng ngắn hơn ánh sáng khả kiến, thường dùng để quét xuyên qua lớp giáp kim loại tàu là gì?",
            options: [
                "Tia Hồng ngoại",
                "Tia X (X-ray)",
                "Sóng Radio",
                "Sóng Vi ba (Microwave)"
            ],
            correctIndex: 1,
            explanation: "Tia X có năng lượng cao và bước sóng ngắn, có khả năng đâm xuyên qua mô mềm và vật liệu mật độ thấp."
        },
        {
            id: "s2_q8",
            question: "Khái niệm 'Năm ánh sáng' (Light-year) trong thiên văn học dùng để đo đại lượng nào?",
            options: [
                "Thời gian trôi qua",
                "Khoảng cách (Độ dài)",
                "Khối lượng hành tinh",
                "Nhiệt độ ngôi sao"
            ],
            correctIndex: 1,
            explanation: "Năm ánh sáng là đơn vị đo khoảng cách, bằng quãng đường ánh sáng di chuyển được trong chân không suốt một năm (khoảng 9,46 nghìn tỷ km)."
        }
    ],

    // ----------------------------------------------------
    // PHÒNG 3: PHÒNG ĐIỀU KHIỂN (BRIDGE) - 1 QUÁI NHỎ (1 HP) + 1 NỮ CHÚA ALIEN QUEEN (5 HP)
    // ----------------------------------------------------
    sector3: [
        {
            id: "s3_q1",
            question: "Trạm phát sóng S.O.S trên tàu phát tín hiệu bằng sóng vô tuyến. Sóng vô tuyến thuộc loại sóng nào?",
            options: [
                "Sóng cơ học",
                "Sóng điện từ",
                "Sóng hạ âm",
                "Sóng siêu âm"
            ],
            correctIndex: 1,
            explanation: "Sóng vô tuyến là một dạng bức xạ điện từ, có thể truyền đi với vận tốc ánh sáng ngay cả trong môi trường chân không tuyệt đối."
        },
        {
            id: "s3_q2",
            question: "Để tái khởi động máy tính chủ phi thuyền, hệ nhị phân (Binary) dùng trong vi mạch điện tử bao gồm hai ký số nào?",
            options: [
                "1 và 2",
                "0 và 1",
                "0 và 9",
                "A và B"
            ],
            correctIndex: 1,
            explanation: "Hệ đếm nhị phân chỉ sử dụng hai chữ số 0 và 1 tương ứng với hai trạng thái đóng/ngắt (tắt/bật) của bóng bán dẫn transistor."
        },
        {
            id: "s3_q3",
            question: "Mã cấp cứu quốc tế và liên hành tinh nổi tiếng nhất gồm chuỗi tín hiệu chấm-gạch là gì?",
            options: [
                "MAYDAY",
                "S.O.S (... --- ...)",
                "HELP",
                "ALERT"
            ],
            correctIndex: 1,
            explanation: "S.O.S trong mã Morse gồm 3 chấm, 3 gạch, 3 chấm (... --- ...), dễ nhận biết và phát tín hiệu khẩn cấp nhất."
        },
        {
            id: "s3_q4",
            question: "Lực ma sát đóng vai trò gì khi phi thuyền hạ cánh xuyên qua tầng khí quyển của hành tinh?",
            options: [
                "Làm tăng tốc độ rơi tự do",
                "Cản trở chuyển động và sinh nhiệt cực lớn",
                "Làm nguội lớp vỏ kim loại",
                "Làm tăng khối lượng con tàu"
            ],
            correctIndex: 1,
            explanation: "Ma sát giữa không khí và vỏ tàu di chuyển tốc độ cao sinh ra nhiệt lượng lên tới hàng ngàn độ C, đòi hỏi tấm chắn nhiệt bảo vệ."
        },
        {
            id: "s3_q5",
            question: "Mặt Trăng quay quanh Trái Đất được gọi là loại thiên thể nào?",
            options: [
                "Hành tinh lùn",
                "Vệ tinh tự nhiên",
                "Sao chổi",
                "Tiểu hành tinh"
            ],
            correctIndex: 1,
            explanation: "Mặt Trăng là vệ tinh tự nhiên lớn duy nhất quay quanh quỹ đạo của Trái Đất."
        },
        {
            id: "s3_q6",
            question: "Vệ tinh nhân tạo đầu tiên được loài người phóng lên không gian năm 1957 có tên là gì?",
            options: [
                "Apollo 11",
                "Sputnik 1",
                "Hubble",
                "Voyager 1"
            ],
            correctIndex: 1,
            explanation: "Sputnik 1 được Liên Xô phóng lên quỹ đạo ngày 4/10/1957, chính thức mở đầu kỷ nguyên chinh phục không gian của nhân loại."
        },
        {
            id: "s3_q7",
            question: "Hành tinh nào có thể tích và khối lượng lớn nhất trong Hệ Mặt Trời của chúng ta?",
            options: [
                "Sao Thổ (Saturn)",
                "Sao Mộc (Jupiter)",
                "Sao Hải Vương (Neptune)",
                "Sao Thiên Vương (Uranus)"
            ],
            correctIndex: 1,
            explanation: "Sao Mộc (Jupiter) là hành tinh khí khổng lồ lớn nhất, có thể tích gấp hơn 1.300 lần Trái Đất và khối lượng gấp 2.5 lần tất cả hành tinh khác gộp lại."
        },
        {
            id: "s3_q8",
            question: "Theo Thuyết Tương Đối của Einstein, khi một phi thuyền di chuyển gần bằng vận tốc ánh sáng thì điều gì xảy ra với thời gian trên tàu đối với người quan sát bên ngoài?",
            options: [
                "Thời gian trôi nhanh hơn",
                "Thời gian trôi chậm lại (giãn nở thời gian)",
                "Thời gian đứng yên hoàn toàn",
                "Thời gian đảo ngược về quá khứ"
            ],
            correctIndex: 1,
            explanation: "Hiệu ứng giãn nở thời gian (Time Dilation): Đồng hồ chuyển động ở vận tốc gần ánh sáng chạy chậm hơn so với đồng hồ của người quan sát đứng yên."
        }
    ]
};
