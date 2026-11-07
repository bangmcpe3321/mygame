/**
 * DỮ LIỆU CÂU HỎI VÀ DẪN CHUYỆN - GAME ODYSSEY
 * Bạn có thể dễ dàng thêm, sửa hoặc xóa các câu hỏi bên dưới.
* Mỗi câu hỏi có cấu trúc:
*  - question: Nội dung câu hỏi
*  - options: Mảng 4 lựa chọn trả lời
*  - correctIndex: Vị trí của câu trả lời đúng (0, 1, 2, hoặc 3)
*  - explanation: Lời giải thích ngắn gọn sau khi trả lời
*/

const ODYSSEY_STORY = {
    // 1. Mở đầu trò chơi
    intro: {
        title: "KHỞI HÀNH TỪ TROY",
        subtitle: "Cuộc hành trình vĩ đại trở về quê hương Ithaca",
        paragraphs: [
            "Sau mười năm ròng rã chiến chinh và sự sụp đổ của thành Troy huyền thoại, mưu trí của Odysseus đã mang lại thắng lợi cho liên quân Hy Lạp.",
            "Nhưng các vị thần trên đỉnh Olympus không để chàng trở về trong yên ả. Lòng kiêu hãnh của con người đã xúc phạm thần biển Poseidon, đẩy đoàn chiến thuyền vào một chuyến hải trình đằng đẵng đầy cạm bẫy và quái thú.",
            "Hãy lãnh đạo Odysseus và những người lính vượt qua ba thử thách tử thần đầu tiên để tìm đường về với Ithaca..."
        ],
        buttonText: "BẮT ĐẦU VƯỢT BIỂN"
    },

    // 2. Chuyển đoạn giữa Màn 1 và Màn 2
    transition1: {
        title: "THOÁT KHỎI HANG ĐÁ TỬ THẦN",
        subtitle: "Tiếng gầm giận dữ của gã khổng lồ một mắt",
        paragraphs: [
            "Gã khổng lồ Polyphemus mù lòa gầm thét trong tuyệt vọng, tiếng vang xé toạc màn sương trên hòn đảo cô độc. Đoàn người của Odysseus nhanh chóng tháo dây neo, chèo thuyền ra khơi trước khi những tảng đá khổng lồ rơi xuống từ vách núi.",
            "Thoát khỏi bàn tay quái thú, những người lính vừa kịp thở phào thì làn gió biển lại mang đến những âm thanh kỳ lạ – một giai điệu ma mị văng vẳng từ phương xa.",
            "Đó là vùng biển của những nàng tiên cá Sirens, nơi không một thủy thủ nào có thể cưỡng lại khúc ca gọi hồn..."
        ],
        buttonText: "TIẾN VÀO VÙNG BIỂN SIREN"
    },

    // 3. Chuyển đoạn giữa Màn 2 và Màn 3
    transition2: {
        title: "BĂNG QUA MÀN SƯƠNG HUYỀN HOẶC",
        subtitle: "Chiếc thuyền vươn mình đến eo biển tử địa",
        paragraphs: [
            "Mặc cho những giọt mồ hôi lạnh và sự cám dỗ ghê gớm từ khúc ca mê hoặc, con tàu của Odysseus cuối cùng đã xuyên qua rạn đá Siren và thoát khỏi ranh giới sương mù.",
            "Nhưng phía trước họ là thử thách khắc nghiệt nhất mà bất kỳ hoa tiêu nào nghe thấy cũng phải rùng mình: một eo biển hẹp tăm tối giữa hai vách đá dựng đứng.",
            "Một bên là xoáy nước khổng lồ Charybdis sẵn sàng nuốt trọn cả đại dương. Phía bên kia, trong hang đá tối om trên vách đá cao, quái vật sáu đầu Scylla đang há những chiếc mõm háu đói chực chờ săn thịt thủy thủ..."
        ],
        buttonText: "ĐỐI ĐẦU VỚI SCYLLA"
    },

    // 4. Kết thúc mở cho trò chơi
    epilogue: {
        title: "VƯỢT QUA TỬ ĐỊA – CHÂN TRỜI VẪN VẪY GỌI",
        subtitle: "Hải trình vô tận của vị vua Ithaca",
        paragraphs: [
            "Với thanh gươm đẫm ánh đồng và sự can trường của vị chỉ huy kiệt xuất, con thuyền đã vọt qua eo biển tử thần trước khi Scylla kịp nghiền nát chiếc thuyền.",
            "Dù phải trả giá bằng mồ hôi, máu và sự kinh hoàng, con tàu của Odysseus một lần nữa đón lấy ánh bình minh rạng ngời trên biển Aegean mênh mông.",
            "Ithaca và nàng Penelope trung trinh vẫn còn ở phía trước xa xăm, ẩn sau muôn trùng bão tố và những thử thách mới của thần linh. Nhưng chừng nào ngọn lửa ý chí trong tim Odysseus chưa tắt, không bão tố hay quái vật nào có thể ngăn chàng tìm đường về nhà..."
        ],
        buttonText: "CHƠI LẠI TỪ ĐẦU"
    }
};

// DANH SÁCH CÂU HỎI CHO TỪNG THỬ THÁCH
const ODYSSEY_QUESTIONS = {
    // THỬ THÁCH 1: CYCLOPS (Polyphemus)
    cyclops: [
        {
            id: "c1",
            question: "Odysseus đã dùng tên giả nào để đánh lừa gã khổng lồ Polyphemus?",
            options: [
                "Achilles",
                "Không Ai Cả (Outis / Nobody)",
                "Telemachus",
                "Hercules"
            ],
            correctIndex: 1,
            explanation: "Odysseus tự xưng là 'Không Ai Cả'. Khi bị chọc mù mắt, Polyphemus gào lên: 'Không Ai Cả hại tôi!', khiến đồng loại tưởng gã bị điên và bỏ đi."
        },
        {
            id: "c2",
            question: "Odysseus đã chuốc cho Cyclops say bằng thứ gì trước khi hành động?",
            options: [
                "Nước suối thần của nữ thần Nymph",
                "Rượu nho Maron nồng đậm hảo hạng",
                "Thuốc ngủ chiết xuất từ hoa sen",
                "Sữa dê lên men đặc biệt"
            ],
            correctIndex: 1,
            explanation: "Chàng đã đem loại rượu vang hảo hạng do linh mục Maron tặng để mời Polyphemus uống say mèm và chìm vào giấc ngủ mê mệt."
        },
        {
            id: "c3",
            question: "Polyphemus là con trai của vị thần nào trong thần thoại Hy Lạp?",
            options: [
                "Thần sấm sét Zeus",
                "Thần âm phủ Hades",
                "Thần biển cả Poseidon",
                "Thần chiến tranh Ares"
            ],
            correctIndex: 2,
            explanation: "Polyphemus là con trai của Poseidon. Việc làm mù mắt con trai thần biển đã khiến Poseidon nổi cơn lôi đình nguyền rủa Odysseus suốt 10 năm."
        },
        {
            id: "c4",
            question: "Odysseus và các đồng đội đã dùng mưu gì để trốn thoát khỏi cửa hang của Cyclops?",
            options: [
                "Ẩn nấp dưới bụng những con cừu lông dày",
                "Đào một đường hầm bí mật xuyên qua lòng núi",
                "Đóng giả làm những tảng đá lớn",
                "Tung bụi độc làm Cyclops ngạt thở"
            ],
            correctIndex: 0,
            explanation: "Khi Polyphemus lùa đàn cừu ra ngoài gặm cỏ, các thủy thủ đã bám chặt vào lông dưới bụng bầy cừu đực để lừa bàn tay sờ nắn của gã mù."
        }
    ],

    // THỬ THÁCH 2: SIRENS
    sirens: [
        {
            id: "s1",
            question: "Odysseus đã dùng thứ gì để bịt tai các thủy thủ nhằm chống lại tiếng hát ma quái của Sirens?",
            options: [
                "Bông vải tẩm dầu thơm",
                "Đất sét dẻo từ đáy biển",
                "Sáp ong nấu chảy mềm",
                "Rong biển bện chặt"
            ],
            correctIndex: 2,
            explanation: "Theo lời dặn của phù thủy Circe, Odysseus cắt một bánh sáp ong lớn, nhào mềm rồi nhét chặt vào tai tất cả thủy thủ trên thuyền."
        },
        {
            id: "s2",
            question: "Tại sao Odysseus lại yêu cầu binh lính trói chặt mình vào cột buồm thay vì tự bịt tai?",
            options: [
                "Vì chàng muốn là người phàm trần duy nhất nghe được tiếng hát quyến rũ mà vẫn sống sót",
                "Vì chàng bị các vị thần trừng phạt bắt phải nghe",
                "Vì chàng không còn đủ sáp ong cho bản thân",
                "Vì chàng muốn chỉ đạo thuyền bơi về phía hòn đảo"
            ],
            correctIndex: 0,
            explanation: "Với bản tính tò mò và khao khát tri thức của người anh hùng, Odysseus muốn được nghe khúc ca kỳ bí của Sirens dù biết nó nguy hiểm đến tính mạng."
        },
        {
            id: "s3",
            question: "Theo thần thoại nguyên bản, các nàng Sirens có hình dạng như thế nào?",
            options: [
                "Nửa người nửa cá xinh đẹp hoàn mỹ",
                "Nửa người nửa chim với móng vuốt sắc nhọn",
                "Những bóng ma sương mù lơ lửng trên mặt nước",
                "Rắn biển khổng lồ có giọng nói con người"
            ],
            correctIndex: 1,
            explanation: "Trong nghệ thuật Hy Lạp cổ đại, Sirens ban đầu được khắc họa là sinh vật mình chim đầu người phụ nữ, chứ không phải nàng tiên cá đuôi cá sau này."
        },
        {
            id: "s4",
            question: "Khúc ca của Siren hứa hẹn điều gì khiến người nghe không thể cưỡng lại?",
            options: [
                "Vàng bạc châu báu vô tận của các vị vua",
                "Sự bất tử và vẻ đẹp vĩnh hằng",
                "Mọi tri thức về quá khứ, tương lai và vinh quang",
                "Một bữa tiệc linh đình không bao giờ tàn"
            ],
            correctIndex: 2,
            explanation: "Sirens hát rằng chúng biết tất cả những đau khổ ở thành Troy và mọi điều xảy ra trên thế gian, đánh trúng khát khao hiểu biết của con người."
        }
    ],

    // THỬ THÁCH 3: SCYLLA & CHARYBDIS
    scylla: [
        {
            id: "sc1",
            question: "Quái vật Scylla có bao nhiêu cái đầu với những chiếc cổ dài gớm ghiếc?",
            options: [
                "3 đầu",
                "6 đầu",
                "9 đầu",
                "12 đầu"
            ],
            correctIndex: 1,
            explanation: "Scylla có 6 cái đầu dài ngoằng ghê rợn, mỗi miệng có ba hàng răng sắc nhọn. Mỗi lần tàu đi qua, ả sẽ vươn 6 đầu xuống đớp lấy 6 thủy thủ."
        },
        {
            id: "sc2",
            question: "Quái vật đối diện với vách đá Scylla ở eo biển hẹp là gì?",
            options: [
                "Kraken khổng lồ kéo chìm tàu bè",
                "Charybdis - xoáy nước khổng lồ hút cạn biển 3 lần một ngày",
                "Mãng xà Hydra chín đầu phun nọc độc",
                "Chim ưng ăn thịt Stymphalian"
            ],
            correctIndex: 1,
            explanation: "Charybdis nằm đối diện vách đá Scylla, mỗi ngày ba lần nuốt chửng cả khối nước biển khổng lồ rồi phun ra, tạo thành vực xoáy chết chóc."
        },
        {
            id: "sc3",
            question: "Tại sao phù thủy Circe khuyên Odysseus nên chèo thuyền áp sát vách đá Scylla hơn là phía Charybdis?",
            options: [
                "Vì Scylla dễ bị đánh bại hơn xoáy nước",
                "Vì thà mất 6 người lính vào miệng Scylla còn hơn để cả con thuyền bị xoáy nước nuốt chửng",
                "Vì Scylla chỉ tấn công vào ban đêm",
                "Vì Charybdis được canh giữ bởi thần Poseidon"
            ],
            correctIndex: 1,
            explanation: "Circe đưa ra bài học lãnh đạo nghiệt ngã: thà hy sinh 6 người cho Scylla còn hơn để Charybdis nhấn chìm toàn bộ chiến thuyền và tất cả sinh mạng."
        },
        {
            id: "sc4",
            question: "Trong sử thi, trước khi bị biến thành quái vật biển ghê tởm, Scylla từng là ai?",
            options: [
                "Một nữ thủy thần Nymph xinh đẹp bị phù thủy Circe nguyền rủa vì ghen tuông",
                "Một con mãng xà biển của thần Hades",
                "Một nữ chiến binh Amazon bị đày ải",
                "Con gái của nữ thần bão tố Harpy"
            ],
            correctIndex: 0,
            explanation: "Scylla từng là một thiếu nữ Nymph xinh đẹp, nàng bị phù thủy Circe ghen tị (vì thần biển Glaucus yêu Scylla) nên đã đổ độc dược vào hồ tắm biến Scylla thành quái vật."
        }
    ]
};

