/**
 * HỆ THỐNG ĐỒ HỌA SỬ THI PHONG CÁCH TRANH MINH HỌA DÃ SỬ (GRAPHIC NOVEL / LINE-ART)
 * - Lấy cảm hứng từ phong cách minh họa anh hùng lịch sử (mực viền đen dứt khoát, mảng màu hài hòa).
 * - Nhân vật có khuôn mặt sắc sảo, bàn tay rõ ngón tay, dáng đứng chỉ huy, trang phục và ngọn giáo chi tiết.
 * - Cyclops (Polyphemus) có ĐẦY ĐỦ BỘ PHẬN: đầu, mắt, mũi, miệng răng nanh, ngực sáu múi, 2 cánh tay có đủ ngón tay cầm chùy, khố da thú, 2 chân khổng lồ.
 * - Đảo đá Siren với các tảng đá lởm chởm rêu phong, sóng bạc đầu và Sirens nửa người nửa chim.
 */

class VisualEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStage = null;
        this.sailorJumpCount = 0;
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // ========================================================
    // 1. THỬ THÁCH 1: HANG ĐÁ CYCLOPS (POLYPHEMUS ĐẦY ĐỦ BỘ PHẬN)
    // ========================================================
    renderCyclopsStage() {
        this.currentStage = 'cyclops';
        this.clear();

        const html = `
        <div class="stage-view stage-cyclops" id="stage-cyclops">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="torchGlowDeep" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffaa00" stop-opacity="0.95"/>
                        <stop offset="35%" stop-color="#ff5500" stop-opacity="0.45"/>
                        <stop offset="75%" stop-color="#3d1505" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="caveDepth" cx="45%" cy="35%" r="75%">
                        <stop offset="0%" stop-color="#36281e"/>
                        <stop offset="50%" stop-color="#1c140d"/>
                        <stop offset="100%" stop-color="#060504"/>
                    </radialGradient>
                    <radialGradient id="cyclopsEyeGlow" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#ffffcc"/>
                        <stop offset="25%" stop-color="#ff8800"/>
                        <stop offset="70%" stop-color="#bb1100"/>
                        <stop offset="100%" stop-color="#3a0000"/>
                    </radialGradient>
                </defs>

                <!-- KHÔNG GIAN HANG ĐÁ TẢ THỰC -->
                <rect width="1200" height="500" fill="url(#caveDepth)" />

                <!-- VÁCH ĐÁ & NHŨ ĐÁ VỚI NÉT VIỀN ĐEN TRANH DÃ SỬ -->
                <path d="M0,0 L70,130 L120,0 L210,150 L280,0 L410,110 L470,0 L600,160 L680,0 L810,130 L880,0 L1010,150 L1090,0 L1200,110 L1200,0 Z" 
                      fill="#18120c" stroke="#0a0705" stroke-width="2.5" />
                <path d="M0,0 L40,190 L80,0 L150,210 L220,0 L340,170 L400,0 L520,200 L610,0 L730,230 L800,0 L940,180 L1000,0 L1140,200 L1200,140 L1200,0 Z" 
                      fill="#2b1f15" stroke="#100b07" stroke-width="2.5" />

                <!-- ĐỐNG LỬA TRẠI GÓC HANG -->
                <circle cx="150" cy="300" r="160" fill="url(#torchGlowDeep)" class="torch-flicker" />
                <line x1="100" y1="390" x2="190" y2="370" stroke="#1c0f08" stroke-width="12" stroke-linecap="round"/>
                <line x1="110" y1="365" x2="180" y2="395" stroke="#140a05" stroke-width="12" stroke-linecap="round"/>
                <polygon points="120,380 145,310 170,380" fill="#ff4500" class="torch-flame" />
                <polygon points="130,378 145,330 160,378" fill="#ffbb00" class="torch-flame" />

                <!-- ĐÀN CỪU LÔNG DÀY BÉO TRÒN CỦA CYCLOPS -->
                <g class="sheep-herd" opacity="0.85">
                    <ellipse cx="330" cy="455" rx="38" ry="24" fill="#dfd8c8" stroke="#2b2016" stroke-width="2.5"/>
                    <circle cx="295" cy="450" r="15" fill="#2b2016" />
                    <ellipse cx="400" cy="465" rx="32" ry="20" fill="#c7beab" stroke="#2b2016" stroke-width="2.5"/>
                    <circle cx="372" cy="460" r="13" fill="#2b2016" />
                </g>

                <!-- ======================================================== -->
                <!-- NHÓM CHIẾN BINH HY LẠP & VUA ODYSSEUS (PHONG CÁCH TRANH ẢNH MẪU) -->
                <!-- ======================================================== -->
                <g id="greek-phalanx" transform="translate(110, 160)">
                    <!-- BINH SĨ CẦM KHIÊN VÀ GIÁO CẠNH BÊN -->
                    <g id="soldier-companion" transform="translate(0, 110)">
                        <!-- Cơ thể & giáp đồng có viền nét vẽ -->
                        <path d="M20,60 L55,60 L50,140 L20,140 Z" fill="#b08b35" stroke="#1a1205" stroke-width="2.5" />
                        <path d="M15,140 L55,140 L50,185 L18,185 Z" fill="#691a1a" stroke="#1a1205" stroke-width="2" />
                        <!-- Bàn chân có giáp đồng -->
                        <rect x="22" y="185" width="12" height="40" fill="#b08b35" stroke="#1a1205" stroke-width="2" rx="3"/>
                        <rect x="38" y="185" width="12" height="40" fill="#b08b35" stroke="#1a1205" stroke-width="2" rx="3"/>

                        <!-- KHUÔN MẶT CÓ ĐẦY ĐỦ MẮT, MŨI, MIỆNG, CẰM -->
                        <circle cx="36" cy="35" r="16" fill="#dfb382" stroke="#1a1205" stroke-width="2" />
                        <!-- Chân mày & mắt rõ nét -->
                        <path d="M38,30 L46,31" stroke="#1a1205" stroke-width="2.5" stroke-linecap="round"/>
                        <ellipse cx="43" cy="34" rx="3" ry="2" fill="#fff" stroke="#1a1205" stroke-width="1"/>
                        <circle cx="44" cy="34" r="1.3" fill="#000" />
                        <!-- Sống mũi & miệng thở dốc -->
                        <path d="M42,32 L46,38 L43,40" stroke="#1a1205" stroke-width="1.8" fill="none"/>
                        <ellipse cx="44" cy="44" rx="2.5" ry="1.8" fill="#400" />

                        <!-- MŨ SẮT CORINTHIAN VÀ CHÙM BỜM ĐỎ -->
                        <path d="M22,30 Q36,6 50,30 L48,46 L32,46 Z" fill="#b08b35" stroke="#1a1205" stroke-width="2"/>
                        <path d="M34,6 Q36,-16 38,6" stroke="#900" stroke-width="8" stroke-linecap="round"/>

                        <!-- KHIÊN TRÒN HOPLON HOA VĂN MẶT QUỶ MEDUSA -->
                        <circle cx="15" cy="95" r="38" fill="#b08b35" stroke="#1a1205" stroke-width="3.5"/>
                        <circle cx="15" cy="95" r="28" fill="#7a1a1a" stroke="#1a1205" stroke-width="2"/>
                        <circle cx="15" cy="95" r="14" fill="#d4af37" stroke="#1a1205" stroke-width="1.5"/>
                        <circle cx="10" cy="92" r="2.5" fill="#000"/>
                        <circle cx="20" cy="92" r="2.5" fill="#000"/>
                        <path d="M9,101 Q15,106 21,101" stroke="#000" stroke-width="2" fill="none"/>

                        <!-- CÁNH TAY & BÀN TAY CÓ NGÓN TAY CẦM GIÁO -->
                        <!-- Cẳng tay vươn ra cầm giáo -->
                        <path d="M35,80 L80,68" stroke="#dfb382" stroke-width="10" stroke-linecap="round"/>
                        <path d="M35,80 L80,68" stroke="#1a1205" stroke-width="2" fill="none"/>
                        <!-- BÀN TAY VỚI CÁC NGÓN TAY QUẤN CHẶT THÂN GIÁO -->
                        <g transform="translate(75, 62)">
                            <ellipse cx="4" cy="5" rx="5" ry="6" fill="#dfb382" stroke="#1a1205" stroke-width="1.5"/>
                            <line x1="1" y1="2" x2="6" y2="2" stroke="#1a1205" stroke-width="1.2"/>
                            <line x1="1" y1="5" x2="7" y2="5" stroke="#1a1205" stroke-width="1.2"/>
                            <line x1="1" y1="8" x2="6" y2="8" stroke="#1a1205" stroke-width="1.2"/>
                        </g>

                        <!-- NGỌN GIÁO HY LẠP DÒNG DORY SẮC BÉN VỚI MŨI HÌNH LÁ -->
                        <line x1="5" y1="95" x2="250" y2="50" stroke="#5a3d1e" stroke-width="5" stroke-linecap="round"/>
                        <polygon points="250,50 285,43 255,56" fill="#fff5cc" stroke="#1a1205" stroke-width="2"/>
                        <line x1="250" y1="50" x2="278" y2="45" stroke="#b08b35" stroke-width="2"/>
                        <polygon points="5,95 -12,98 2,102" fill="#b08b35" stroke="#1a1205" stroke-width="1.5"/>
                    </g>

                    <!-- ========================================== -->
                    <!-- VUA ODYSSEUS: DÁNG ĐỨNG CHỈ HUY NHƯ TRANH MẪU -->
                    <!-- TAY VƯƠN CAO CHỈ VỀ PHÍA TRƯỚC VỚI NGÓN TAY RÕ RÀNG -->
                    <!-- ========================================== -->
                    <g id="odysseus-hero" transform="translate(100, 30)">
                        <!-- ÁO CHOÀNG XANH RÊU / ĐỎ THẪM LỘNG GIÓ CÓ NẾP GẤP NHƯ TRANH MINH HỌA -->
                        <path d="M15,50 Q-25,100 -10,180 Q10,210 5,230 L55,230 Q65,150 45,50 Z" 
                              fill="#1c3b28" stroke="#0a1710" stroke-width="3" />
                        <!-- Nếp gấp vải bóng đổ của áo choàng -->
                        <path d="M-5,110 Q10,140 2,190 M15,130 Q30,160 22,210" stroke="#0e2116" stroke-width="3" fill="none"/>

                        <!-- THÂN MÌNH & GIÁP HOÀNG GIA CÓ ĐAI THẮT LƯNG VÀ BAO KIẾM NHƯ ẢNH MẪU -->
                        <path d="M22,48 L65,48 L60,140 L20,140 Z" fill="#2d2b38" stroke="#0f0e14" stroke-width="3" />
                        <!-- Tấm giáp bảo vệ trước bụng có hoa văn nổi -->
                        <path d="M28,65 Q44,72 60,65 L56,120 Q44,128 26,120 Z" fill="#a87f2e" stroke="#1a1205" stroke-width="2.5" />
                        <!-- Đai thắt lưng da với móc nẹp buông rủ như ảnh mẫu -->
                        <rect x="25" y="115" width="35" height="12" fill="#54361e" stroke="#1a1205" stroke-width="2"/>
                        <rect x="36" y="125" width="10" height="24" fill="#a87f2e" stroke="#1a1205" stroke-width="2" rx="2"/>

                        <!-- BAO KIẾM ĐEO BÊN HÔNG CÓ CHUÔI KIẾM RÕ RÀNG NHƯ ẢNH MẪU -->
                        <g transform="translate(55, 95) rotate(-25)">
                            <rect x="0" y="0" width="10" height="60" fill="#2b1a0d" stroke="#1a1205" stroke-width="2" rx="2"/>
                            <!-- Chuôi kiếm chạm khắc nổi rõ ràng -->
                            <rect x="-2" y="-18" width="14" height="6" fill="#d4af37" stroke="#1a1205" stroke-width="2"/>
                            <rect x="2" y="-32" width="6" height="16" fill="#8b5a2b" stroke="#1a1205" stroke-width="2"/>
                            <circle cx="5" cy="-34" r="5" fill="#d4af37" stroke="#1a1205" stroke-width="2"/>
                        </g>

                        <!-- ĐÔI CHÂN CHIẾN BINH VỮNG CHÃI -->
                        <path d="M26,140 L36,140 L34,220 L22,220 Z" fill="#dfb382" stroke="#1a1205" stroke-width="2.5"/>
                        <path d="M48,140 L58,140 L56,220 L44,220 Z" fill="#dfb382" stroke="#1a1205" stroke-width="2.5"/>
                        <rect x="20" y="165" width="14" height="45" fill="#a87f2e" stroke="#1a1205" stroke-width="2" rx="3"/>
                        <rect x="42" y="165" width="14" height="45" fill="#a87f2e" stroke="#1a1205" stroke-width="2" rx="3"/>

                        <!-- KHUÔN MẶT CƯƠNG NGHỊ QUẮC THƯỚC NHƯ TRANH LÝ THƯỜNG KIỆT -->
                        <g id="odysseus-face">
                            <!-- Đầu & quai hàm góc cạnh -->
                            <path d="M28,24 Q32,48 44,48 Q56,48 54,24 Z" fill="#dfb382" stroke="#1a1205" stroke-width="2.5" />
                            <!-- Bộ râu quai nón tỉa tót sắc sảo -->
                            <path d="M29,26 Q42,52 53,26 Q48,50 42,50 Q35,50 29,26 Z" fill="#1f140a" stroke="#1a1205" stroke-width="1.5" />
                            <!-- Chân mày lưỡi mác quắc thước & đôi mắt sắc bén -->
                            <path d="M36,21 L48,22" stroke="#1a1205" stroke-width="3" stroke-linecap="round"/>
                            <ellipse cx="43" cy="25" rx="3.5" ry="2" fill="#fff" stroke="#1a1205" stroke-width="1.2"/>
                            <circle cx="44.5" cy="25" r="1.5" fill="#0a0502"/>
                            <circle cx="45" cy="24.2" r="0.6" fill="#fff"/>
                            <!-- Sống mũi cao thẳng Hy Lạp -->
                            <path d="M41,20 L46,28 L42,30" stroke="#1a1205" stroke-width="2" fill="none"/>
                            <!-- Khóe miệng kiên nghị mím chặt -->
                            <line x1="38" y1="36" x2="47" y2="35" stroke="#1a1205" stroke-width="2.2" stroke-linecap="round"/>
                        </g>

                        <!-- MŨ GIÁP CORINTHIAN HOÀNG GIA CÓ CHÙM BỜM NGỰA ĐỎ -->
                        <path d="M25,20 Q42,-8 58,20 L56,36 L36,36 Z" fill="#a87f2e" stroke="#1a1205" stroke-width="2.5"/>
                        <!-- Chùm bờm ngựa đỏ cong vút kiêu hãnh -->
                        <path d="M40,-6 Q44,-35 48,-6" stroke="#c0392b" stroke-width="12" stroke-linecap="round"/>
                        <path d="M48,-6 Q62,-28 72,-8" stroke="#c0392b" stroke-width="9" stroke-linecap="round"/>

                        <!-- CÁNH TAY PHẢI VƯƠN CAO CHỈ TAY VỀ PHÍA TRƯỚC NHƯ TRANH MẪU (BÀN TAY CỰC KỲ RÕ RÀNG) -->
                        <g id="odysseus-command-arm" transform="translate(45, 55)">
                            <!-- Bắp tay và cẳng tay áo thụng với nếp gấp vải -->
                            <path d="M0,0 Q30,-40 70,-75 L85,-65 Q45,-25 15,10 Z" fill="#1c3b28" stroke="#0a1710" stroke-width="2.5"/>
                            <!-- Giáp hộ thủ bằng da ở cổ tay -->
                            <rect x="68" y="-80" width="14" height="18" fill="#54361e" stroke="#1a1205" stroke-width="2" transform="rotate(35, 68, -80)"/>
                            
                            <!-- BÀN TAY CÓ NGÓN TRỎ CHỈ THẲNG VỀ PHÍA QUÁI VẬT NHƯ TRANH MẪU -->
                            <g transform="translate(82, -88) rotate(25)">
                                <!-- Lòng bàn tay -->
                                <ellipse cx="8" cy="6" rx="7" ry="8" fill="#dfb382" stroke="#1a1205" stroke-width="2"/>
                                <!-- Ngón tay trỏ chỉ thẳng dũng mãnh -->
                                <path d="M12,2 L32,-3 L32,2 L14,7 Z" fill="#dfb382" stroke="#1a1205" stroke-width="2" />
                                <line x1="22" y1="-1" x2="22" y2="4" stroke="#1a1205" stroke-width="1.2"/>
                                <!-- 3 ngón tay gập lại vào lòng bàn tay -->
                                <path d="M6,7 Q10,13 14,10" stroke="#1a1205" stroke-width="2" fill="none"/>
                                <path d="M5,11 Q9,16 13,13" stroke="#1a1205" stroke-width="2" fill="none"/>
                                <!-- Ngón tay cái khép lại -->
                                <path d="M5,2 Q10,0 12,3" stroke="#1a1205" stroke-width="2" fill="none"/>
                            </g>
                        </g>

                        <!-- TAY TRÁI CẦM CUNG VÀNG HOẶC KHIÊN -->
                        <g id="odysseus-bow" transform="translate(5, 55)">
                            <path d="M-5,10 Q-30,55 -5,100" stroke="#a87f2e" stroke-width="6" fill="none"/>
                            <path d="M-5,10 Q-30,55 -5,100" stroke="#1a1205" stroke-width="1.5" fill="none"/>
                            <line x1="-5" y1="10" x2="-5" y2="100" stroke="#fff" stroke-width="1.8"/>
                            <!-- Bàn tay trái nắm chặt thân cung -->
                            <ellipse cx="-16" cy="55" rx="6" ry="7" fill="#dfb382" stroke="#1a1205" stroke-width="2"/>
                            <line x1="-20" y1="52" x2="-12" y2="52" stroke="#1a1205" stroke-width="1.5"/>
                            <line x1="-20" y1="56" x2="-12" y2="56" stroke="#1a1205" stroke-width="1.5"/>
                        </g>
                    </g>
                </g>

                <!-- ======================================================== -->
                <!-- QUÁI VẬT CYCLOPS (POLYPHEMUS) ĐẦY ĐỦ TẤT CẢ BỘ PHẬN CƠ THỂ -->
                <!-- ĐẦU, MẮT, MŨI, MIỆNG, CỔ, NGỰC 6 MÚI, 2 TAY ĐỦ NGÓN, KHỐ, 2 CHÂN -->
                <!-- ======================================================== -->
                <g id="cyclops-monster" class="cyclops-idle" transform="translate(730, 25)">
                    
                    <!-- 1. HAI CHÂN KHỔNG LỒ CẮM VỮNG TRÊN NỀN ĐÁ -->
                    <g id="cyclops-legs">
                        <!-- Chân trái (sau) -->
                        <path d="M70,300 L120,300 L110,430 L50,430 Z" fill="#694b34" stroke="#1a1008" stroke-width="3" />
                        <!-- Khớp đầu gối & bàn chân có móng -->
                        <circle cx="85" cy="360" r="16" fill="#543c29" stroke="#1a1008" stroke-width="2"/>
                        <path d="M50,430 L110,430 L120,445 L40,445 Z" fill="#422e1f" stroke="#1a1008" stroke-width="2.5" />

                        <!-- Chân phải (trước - vạm vỡ gân guốc) -->
                        <path d="M180,300 L240,300 L230,430 L160,430 Z" fill="#7a583e" stroke="#1a1008" stroke-width="3.5" />
                        <!-- Đầu gối cơ bắp chân phải -->
                        <ellipse cx="200" cy="355" rx="19" ry="16" fill="#694b34" stroke="#1a1008" stroke-width="2.5"/>
                        <!-- Bàn chân phải 5 ngón cắm xuống sàn đá -->
                        <path d="M160,430 L230,430 L250,448 L150,448 Z" fill="#543c29" stroke="#1a1008" stroke-width="3" />
                        <line x1="180" y1="440" x2="180" y2="448" stroke="#1a1008" stroke-width="2"/>
                        <line x1="205" y1="440" x2="205" y2="448" stroke="#1a1008" stroke-width="2"/>
                        <line x1="230" y1="440" x2="230" y2="448" stroke="#1a1008" stroke-width="2"/>
                    </g>

                    <!-- 2. HÔNG & KHỐ DA THÚ RÁCH RƯỚI CÓ DÂY THỪNG BỆN -->
                    <g id="cyclops-waist">
                        <path d="M50,260 Q150,290 250,260 L240,320 Q150,340 50,310 Z" fill="#3a2517" stroke="#140b05" stroke-width="3" />
                        <!-- Dây thừng gai quấn quanh eo -->
                        <path d="M48,265 Q150,285 252,265" stroke="#a68050" stroke-width="6" fill="none"/>
                        <!-- Râu da thú xơ xác -->
                        <path d="M70,310 L80,335 L100,315 L120,340 L150,315 L180,345 L200,318 L225,335" stroke="#1a1008" stroke-width="3" fill="#3a2517"/>
                    </g>

                    <!-- 3. THÂN MÌNH & LỒNG NGỰC CƠ BẮP 6 MÚI GÂN GUỐC -->
                    <g id="cyclops-torso">
                        <path d="M50,150 Q20,200 45,270 L255,270 Q280,200 250,150 Z" fill="#7a583e" stroke="#1a1008" stroke-width="3.5" />
                        <!-- Khối cơ ngực vĩ đại -->
                        <path d="M55,190 Q105,225 150,205 Q195,225 245,190" stroke="#3d2719" stroke-width="5" fill="none" />
                        <!-- Rãnh bụng 6 múi nổi rõ rệt -->
                        <line x1="150" y1="205" x2="150" y2="270" stroke="#3d2719" stroke-width="4"/>
                        <path d="M110,225 Q150,230 190,225" stroke="#3d2719" stroke-width="3.5" fill="none"/>
                        <path d="M115,248 Q150,252 185,248" stroke="#3d2719" stroke-width="3.5" fill="none"/>
                        <!-- Vết sẹo chiến trận rách chéo ngực -->
                        <line x1="85" y1="180" x2="135" y2="245" stroke="#8a1c1c" stroke-width="5" stroke-linecap="round"/>
                        <line x1="95" y1="205" x2="115" y2="195" stroke="#8a1c1c" stroke-width="3"/>
                        <line x1="110" y1="225" x2="130" y2="215" stroke="#8a1c1c" stroke-width="3"/>
                    </g>

                    <!-- 4. TAY TRÁI (BÊN TRƯỚC): CƠ BẮP CUỒN CUỘN & BÀN TAY 5 NGÓN XÒE RA ĐE DỌA -->
                    <g id="cyclops-left-arm">
                        <!-- Vai tròn cơ delta & bắp tay lực lưỡng -->
                        <path d="M50,150 Q-10,190 -20,240 Q-25,280 10,290 Q30,270 45,230 Z" fill="#694b34" stroke="#1a1008" stroke-width="3.5" />
                        <!-- Cẳng tay vươn về phía nhóm lính -->
                        <path d="M-20,240 Q-70,250 -100,260 Q-80,290 10,290 Z" fill="#7a583e" stroke="#1a1008" stroke-width="3" />
                        
                        <!-- BÀN TAY TRÁI KHỔNG LỒ RÕ TỪNG ĐỐT NGÓN TAY & MÓNG VUỐT -->
                        <g transform="translate(-125, 245)">
                            <ellipse cx="20" cy="20" rx="16" ry="18" fill="#7a583e" stroke="#1a1008" stroke-width="2.5"/>
                            <!-- 5 ngón tay thô ráp với móng nhọn vươn ra -->
                            <path d="M10,6 L-8,-2 L-4,5 L8,11 Z" fill="#7a583e" stroke="#1a1008" stroke-width="2" />
                            <path d="M8,14 L-15,12 L-12,19 L7,18 Z" fill="#7a583e" stroke="#1a1008" stroke-width="2" />
                            <path d="M8,22 L-14,28 L-10,34 L8,26 Z" fill="#7a583e" stroke="#1a1008" stroke-width="2" />
                            <path d="M12,28 L-6,42 L-2,46 L14,33 Z" fill="#7a583e" stroke="#1a1008" stroke-width="2" />
                            <path d="M22,32 L15,48 L22,50 L27,33 Z" fill="#7a583e" stroke="#1a1008" stroke-width="2" />
                        </g>
                    </g>

                    <!-- 5. TAY PHẢI: BẮP TAY NÂNG CÂY CHÙY GỖ SỒI KHỔNG LỒ (ĐỦ 5 NGÓN NẮM CHÙY) -->
                    <g id="cyclops-right-arm" transform="rotate(-10, 250, 160)">
                        <path d="M250,150 Q310,180 320,240 Q310,290 270,290 Q250,260 240,210 Z" fill="#694b34" stroke="#1a1008" stroke-width="3.5" />
                        <path d="M320,240 Q350,280 330,340 Q290,340 270,290 Z" fill="#7a583e" stroke="#1a1008" stroke-width="3" />

                        <!-- CHÙY GỖ GAI SỒI KHỔNG LỒ -->
                        <g id="cyclops-club">
                            <path d="M310,130 L380,20 Q410,0 390,140 L330,420 Q300,430 280,380 Z" fill="#3d2514" stroke="#140a04" stroke-width="3.5"/>
                            <!-- Các gai gỗ gồ ghề nhọn hoắt -->
                            <polygon points="380,15 410,5 385,35" fill="#1f1107" stroke="#140a04" stroke-width="2"/>
                            <polygon points="395,65 425,55 395,85" fill="#1f1107" stroke="#140a04" stroke-width="2"/>
                            <polygon points="385,120 415,115 385,140" fill="#1f1107" stroke="#140a04" stroke-width="2"/>
                        </g>

                        <!-- BÀN TAY PHẢI VỚI CÁC NGÓN TAY NẮM CHẶT CHÙY -->
                        <g transform="translate(290, 275)">
                            <ellipse cx="14" cy="18" rx="16" ry="18" fill="#7a583e" stroke="#1a1008" stroke-width="2.5"/>
                            <rect x="0" y="5" width="26" height="7" rx="3" fill="#694b34" stroke="#1a1008" stroke-width="1.8"/>
                            <rect x="0" y="14" width="27" height="7" rx="3" fill="#694b34" stroke="#1a1008" stroke-width="1.8"/>
                            <rect x="0" y="23" width="26" height="7" rx="3" fill="#694b34" stroke="#1a1008" stroke-width="1.8"/>
                            <rect x="2" y="32" width="23" height="7" rx="3" fill="#694b34" stroke="#1a1008" stroke-width="1.8"/>
                            <!-- Ngón cái khóa chùy -->
                            <path d="M-4,15 Q6,8 14,12" stroke="#1a1008" stroke-width="3" fill="none"/>
                        </g>
                    </g>

                    <!-- 6. ĐẦU, KHUÔN MẶT, MẮT, MŨI, MIỆNG ĐẦY ĐỦ CỦA POLYPHEMUS -->
                    <g id="cyclops-head" transform="translate(150, 100)">
                        <!-- Đầu gồ ghề cơ bắp có cằm nhô -->
                        <path d="M-60,-20 Q0,-75 60,-20 Q70,40 50,75 Q0,95 -50,75 Q-70,40 -60,-20 Z" fill="#7a583e" stroke="#1a1008" stroke-width="3.5" />
                        <!-- Tai nhọn xù xì 2 bên -->
                        <path d="M-60,-10 L-85,-25 L-65,15 Z" fill="#694b34" stroke="#1a1008" stroke-width="2.5"/>
                        <path d="M60,-10 L85,-25 L65,15 Z" fill="#694b34" stroke="#1a1008" stroke-width="2.5"/>
                        <!-- Râu rậm xơ xác màu đen cổ đại -->
                        <path d="M-45,45 Q0,115 45,45 Q25,120 0,128 Q-25,120 -45,45 Z" fill="#140b05" stroke="#000" stroke-width="2" />

                        <!-- MỒM RỘNG VỚI HÀM RĂNG NANH LỞM CHỞM -->
                        <g id="cyclops-mouth">
                            <path id="mouth-shape" d="M-30,48 Q0,58 30,48 Q0,68 -30,48 Z" fill="#1c0505" stroke="#1a1008" stroke-width="2.5" />
                            <!-- Răng nanh sắc nhọn nhô lên -->
                            <polygon points="-22,48 -14,58 -8,48" fill="#eae2d0" stroke="#1a1008" stroke-width="1.2"/>
                            <polygon points="8,48 14,58 22,48" fill="#eae2d0" stroke="#1a1008" stroke-width="1.2"/>
                            <polygon points="-16,62 -10,54 -4,62" fill="#eae2d0" stroke="#1a1008" stroke-width="1.2"/>
                            <polygon points="4,62 10,54 16,62" fill="#eae2d0" stroke="#1a1008" stroke-width="1.2"/>
                        </g>

                        <!-- CHIẾC MŨI TO KHOẰM CÓ LỖ MŨI -->
                        <path d="M-10,24 Q0,15 10,24 L6,38 L-6,38 Z" fill="#543c29" stroke="#1a1008" stroke-width="2" />
                        <ellipse cx="-4" cy="35" rx="2" ry="1.5" fill="#1a1008" />
                        <ellipse cx="4" cy="35" rx="2" ry="1.5" fill="#1a1008" />

                        <!-- CON MẮT ĐỘC NHÃN KHỔNG LỒ NẰM CHÍNH GIỮA TRÁN -->
                        <g id="cyclops-eye-group">
                            <ellipse cx="0" cy="-6" rx="28" ry="24" fill="#0f0703" stroke="#1a1008" stroke-width="3" />
                            <circle id="cyclops-eye-ball" cx="0" cy="-6" r="22" fill="url(#cyclopsEyeGlow)" />
                            <!-- Mao mạch máu đỏ trong mắt -->
                            <path d="M-16,-6 Q-8,-12 -2,-6 M16,-8 Q8,-4 3,-6 M0,12 L0,4" stroke="#8a0000" stroke-width="1.8" fill="none"/>
                            <!-- Con ngươi đen nhánh chuyển động -->
                            <ellipse id="cyclops-pupil" cx="0" cy="-6" rx="6.5" ry="14" fill="#000000" />
                            <circle cx="3" cy="-11" r="2.8" fill="#ffffff" opacity="0.95" />
                            <!-- Mí mắt gồ ghề & lông mày hung tợn -->
                            <path d="M-28,-14 Q0,-28 28,-14" stroke="#241407" stroke-width="7" stroke-linecap="round" fill="none" />
                            <path d="M-22,-20 Q0,-34 22,-20" stroke="#140a04" stroke-width="3" fill="none" />
                        </g>
                    </g>
                </g>

                <!-- VÒNG ÂM THANH TIẾNG GẦM KHI SAI -->
                <g id="roar-waves" opacity="0">
                    <circle cx="890" cy="270" r="50" stroke="#ff3300" stroke-width="7" fill="none" class="wave-pulse"/>
                    <circle cx="890" cy="270" r="110" stroke="#ff8800" stroke-width="5" fill="none" class="wave-pulse"/>
                    <circle cx="890" cy="270" r="190" stroke="#ffcc00" stroke-width="3" fill="none" class="wave-pulse"/>
                </g>

                <!-- MŨI TÊN XÉ GIÓ KHI ĐÚNG -->
                <g id="arrow-flight" opacity="0">
                    <line x1="330" y1="290" x2="880" y2="190" stroke="#ffd700" stroke-width="6" stroke-dasharray="14 6" />
                    <polygon points="880,190 900,184 886,202" fill="#e74c3c" />
                </g>

                <!-- ĐÂM CỌC LỬA VÀO MẮT CUỐI MÀN -->
                <g id="blind-stake-effect" opacity="0">
                    <line x1="330" y1="290" x2="880" y2="100" stroke="#ff4500" stroke-width="16" stroke-linecap="round" />
                    <circle cx="880" cy="100" r="48" fill="#ffff00" opacity="0.9" />
                    <path d="M835,55 L925,145 M925,55 L835,145" stroke="#cc0000" stroke-width="9" />
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-cave">CỬA HANG NÚI ĐÁ ETNA</span>
                <span id="stage-action-text" class="action-caption">Polyphemus đang chặn cửa hang! Trả lời thật nhanh để nhận điểm tốc độ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerCyclopsWrong() {
        const monster = document.getElementById('cyclops-monster');
        const mouth = document.getElementById('mouth-shape');
        const waves = document.getElementById('roar-waves');
        const phalanx = document.getElementById('greek-phalanx');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Cyclops giáng chùy rống lên kinh thiên động địa, làm rung chuyển cửa hang!";
            text.className = "action-caption text-danger";
        }

        if (mouth) mouth.setAttribute('d', 'M-32,45 Q0,75 32,45 Q0,82 -32,45 Z');
        if (monster) {
            monster.classList.remove('cyclops-idle');
            monster.classList.add('cyclops-roaring');
        }
        if (waves) waves.style.opacity = '1';
        if (phalanx) phalanx.classList.add('soldiers-shaking');

        const stage = document.getElementById('stage-cyclops');
        if (stage) stage.classList.add('screen-rumble');

        setTimeout(() => {
            if (mouth) mouth.setAttribute('d', 'M-30,48 Q0,58 30,48 Q0,68 -30,48 Z');
            if (monster) {
                monster.classList.remove('cyclops-roaring');
                monster.classList.add('cyclops-idle');
            }
            if (waves) waves.style.opacity = '0';
            if (phalanx) phalanx.classList.remove('soldiers-shaking');
            if (stage) stage.classList.remove('screen-rumble');
        }, 1700);
    }

    triggerCyclopsCorrect() {
        const arrow = document.getElementById('arrow-flight');
        const monster = document.getElementById('cyclops-monster');
        const text = document.getElementById('stage-action-text');

        if (text) {
            text.innerHTML = "🎯 <strong>CHÍNH XÁC!</strong> Một mũi tên xé gió cắm phập vào người Polyphemus!";
            text.className = "action-caption text-success";
        }

        if (arrow) {
            arrow.style.opacity = '1';
            arrow.classList.add('arrow-flying-anim');
        }

        setTimeout(() => {
            if (monster) monster.classList.add('monster-hit-anim');
        }, 200);

        setTimeout(() => {
            if (arrow) {
                arrow.style.opacity = '0';
                arrow.classList.remove('arrow-flying-anim');
            }
            if (monster) monster.classList.remove('monster-hit-anim');
        }, 1300);
    }

    triggerCyclopsFinalBlind(callback) {
        const blindEffect = document.getElementById('blind-stake-effect');
        const monster = document.getElementById('cyclops-monster');
        const eyeGroup = document.getElementById('cyclops-eye-group');
        const text = document.getElementById('stage-action-text');
        const stage = document.getElementById('stage-cyclops');

        if (text) {
            text.innerHTML = "🔥 <strong>CHIẾN TÍCH OANH LIỆT!</strong> Chiếc cọc lửa đâm thẳng vào mắt Cyclops mù lòa!";
            text.className = "action-caption text-gold";
        }

        if (blindEffect) blindEffect.style.opacity = '1';
        if (stage) stage.classList.add('screen-flash-red');

        setTimeout(() => {
            if (eyeGroup) {
                eyeGroup.innerHTML = `
                    <ellipse cx="0" cy="-6" rx="28" ry="24" fill="#111" stroke="#000" stroke-width="3"/>
                    <line x1="-22" y1="-22" x2="22" y2="10" stroke="#990000" stroke-width="9"/>
                    <line x1="22" y1="-22" x2="-22" y2="10" stroke="#990000" stroke-width="9"/>
                `;
            }
            if (monster) monster.classList.add('cyclops-blinded-stumble');
        }, 400);

        setTimeout(() => {
            if (callback) callback();
        }, 2200);
    }

    // ========================================================
    // 2. THỬ THÁCH 2: HÒN ĐẢO ĐÁ VÀ CÁC NÀNG SIREN
    // ========================================================
    renderSirensStage() {
        this.currentStage = 'sirens';
        this.sailorJumpCount = 0;
        this.clear();

        const html = `
        <div class="stage-view stage-sirens" id="stage-sirens">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="sirenOceanReal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#101924" />
                        <stop offset="40%" stop-color="#0a121c" />
                        <stop offset="100%" stop-color="#03060a" />
                    </linearGradient>
                    <linearGradient id="sirenMistReal" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.03"/>
                        <stop offset="50%" stop-color="#9fc8e3" stop-opacity="0.28"/>
                        <stop offset="100%" stop-color="#cae3f5" stop-opacity="0.55"/>
                    </linearGradient>
                    <linearGradient id="rockLayer" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#2c353d" />
                        <stop offset="60%" stop-color="#181e24" />
                        <stop offset="100%" stop-color="#0b0e12" />
                    </linearGradient>
                </defs>

                <rect width="1200" height="500" fill="url(#sirenOceanReal)" />
                <circle cx="900" cy="80" r="55" fill="#eaf2f8" opacity="0.3" filter="blur(8px)" />
                <circle cx="900" cy="80" r="30" fill="#ffffff" opacity="0.6" />

                <!-- HÒN ĐẢO ĐÁ SIREN VỚI CÁC TẢNG ĐÁ LỚN XẾP TẦNG -->
                <g id="rocky-siren-island" transform="translate(680, 50)">
                    <polygon points="40,330 120,60 200,330" fill="url(#rockLayer)" stroke="#0c1014" stroke-width="2.5" />
                    <polygon points="160,330 260,90 380,330" fill="#13191f" stroke="#0c1014" stroke-width="2.5" />
                    <polygon points="300,330 390,120 500,330" fill="#0c1014" stroke="#05080a" stroke-width="2.5" />
                    <polygon points="10,330 90,210 180,330" fill="#1d252c" stroke="#0c1014" stroke-width="2" />
                    <path d="M120,120 Q140,160 135,210 M260,150 Q280,190 270,240" stroke="#253d2c" stroke-width="6" fill="none" opacity="0.8"/>
                    
                    <!-- Bọt sóng bạc đầu đập vào chân đá -->
                    <path d="M0,330 Q50,315 100,330 T200,330 T300,330 T400,330 T500,330" stroke="#aeeeff" stroke-width="5" fill="none" opacity="0.75"/>
                    <ellipse cx="90" cy="328" rx="25" ry="6" fill="#ffffff" opacity="0.6"/>
                    <ellipse cx="260" cy="328" rx="35" ry="8" fill="#ffffff" opacity="0.7"/>

                    <!-- CÁC NÀNG SIREN NỬA NGƯỜI NỬA CHIM CÓ KHUÔN MẶT, BÀN TAY & ĐÔI CÁNH -->
                    <g id="siren-flock" class="sirens-floating">
                        <!-- SIREN 1: TRÊN MỎM ĐÁ CAO NHẤT -->
                        <g id="siren-perched-1" transform="translate(105, 30)">
                            <path d="M15,35 Q-30,5 -10,55 Q5,50 15,35 Z" fill="#2c2738" stroke="#0a0710" stroke-width="2"/>
                            <path d="M35,35 Q80,5 60,55 Q45,50 35,35 Z" fill="#2c2738" stroke="#0a0710" stroke-width="2"/>
                            <!-- Thân người thiếu nữ -->
                            <ellipse cx="25" cy="40" rx="12" ry="18" fill="#d0c2b2" stroke="#140f1a" stroke-width="1.8"/>
                            <circle cx="25" cy="18" r="10" fill="#e0d4c5" stroke="#140f1a" stroke-width="1.8"/>
                            <path d="M18,12 Q10,25 5,45 Q20,30 25,28" fill="#16111e" />
                            <path d="M32,12 Q40,25 45,45 Q30,30 25,28" fill="#16111e" />
                            <!-- Đôi mắt ngọc lam phát sáng -->
                            <circle cx="21" cy="17" r="2" fill="#00ffcc" class="siren-eye" />
                            <circle cx="28" cy="17" r="2" fill="#00ffcc" class="siren-eye" />
                            <!-- Cánh tay vươn ra mời gọi -->
                            <path d="M14,35 L-8,38" stroke="#d0c2b2" stroke-width="4" stroke-linecap="round"/>
                            <path d="M18,58 L14,68 M24,58 L24,70 M30,58 L34,68" stroke="#140f0c" stroke-width="3" stroke-linecap="round"/>
                        </g>

                        <!-- SIREN 2: TRÊN MỎM ĐÁ BÊN CẠNH -->
                        <g id="siren-perched-2" transform="translate(240, 60)">
                            <path d="M15,35 Q-25,8 -8,52 Z" fill="#241e30" stroke="#0a0710" stroke-width="1.8"/>
                            <path d="M35,35 Q75,8 58,52 Z" fill="#241e30" stroke="#0a0710" stroke-width="1.8"/>
                            <ellipse cx="25" cy="38" rx="11" ry="17" fill="#c4b4a3" stroke="#140f1a" stroke-width="1.8"/>
                            <circle cx="25" cy="18" r="9" fill="#d9cbba" stroke="#140f1a" stroke-width="1.8"/>
                            <circle cx="22" cy="17" r="2" fill="#ff00bb" class="siren-eye" />
                            <circle cx="28" cy="17" r="2" fill="#ff00bb" class="siren-eye" />
                            <path d="M20,55 L16,65 M26,55 L26,67 M32,55 L36,65" stroke="#140f0c" stroke-width="3" stroke-linecap="round"/>
                        </g>

                        <g class="musical-whispers" opacity="0.8">
                            <text x="50" y="20" fill="#aeeeff" font-size="24">♬</text>
                            <text x="120" y="0" fill="#e2baff" font-size="20">♩</text>
                            <text x="180" y="30" fill="#aeeeff" font-size="26">♪</text>
                        </g>
                    </g>
                </g>

                <rect x="520" y="50" width="680" height="340" fill="url(#sirenMistReal)" class="fog-drifting" />

                <path d="M0,350 Q300,330 600,350 T1200,350 L1200,500 L0,500 Z" fill="#0a1520" opacity="0.8"/>
                <path class="wave-anim" d="M0,370 Q300,390 600,370 T1200,370 L1200,500 L0,500 Z" fill="#050a0f" />

                <!-- THUYỀN ODYSSEUS -->
                <g id="greek-ship" class="ship-bobbing" transform="translate(160, 200)">
                    <path d="M40,160 Q200,180 380,150 Q430,130 460,80 L390,155 L70,155 Q20,110 0,60 Q10,130 40,160 Z" fill="#4d2f14" stroke="#1a0f05" stroke-width="3"/>
                    <circle cx="430" cy="115" r="9" fill="#ffffff" stroke="#1a0f05" stroke-width="2"/>
                    <circle cx="430" cy="115" r="4.5" fill="#000000" />
                    
                    <g id="sailors-rowing">
                        <circle cx="140" cy="140" r="11" fill="#cca06e" stroke="#1a0f05" stroke-width="2"/>
                        <circle cx="190" cy="140" r="11" fill="#cca06e" stroke="#1a0f05" stroke-width="2"/>
                        <circle cx="240" cy="140" r="11" fill="#cca06e" stroke="#1a0f05" stroke-width="2"/>
                        <circle cx="290" cy="140" r="11" fill="#cca06e" stroke="#1a0f05" stroke-width="2"/>
                        <circle cx="136" cy="140" r="3" fill="#ffd700" />
                        <circle cx="186" cy="140" r="3" fill="#ffd700" />
                        <circle cx="236" cy="140" r="3" fill="#ffd700" />
                        <circle cx="286" cy="140" r="3" fill="#ffd700" />
                    </g>

                    <line x1="220" y1="160" x2="220" y2="-45" stroke="#2c190a" stroke-width="9" />

                    <!-- ODYSSEUS BỊ TRÓI CHẶT VÀO CỘT BUỒM -->
                    <g id="odysseus-tied" transform="translate(200, 5)">
                        <rect x="10" y="28" width="22" height="65" fill="#7a2e16" stroke="#1a0f05" stroke-width="2" rx="3" />
                        <ellipse cx="21" cy="42" rx="16" ry="5" fill="#d2b48c" stroke="#54361e" stroke-width="2.5"/>
                        <ellipse cx="21" cy="58" rx="16" ry="5" fill="#d2b48c" stroke="#54361e" stroke-width="2.5"/>
                        <ellipse cx="21" cy="74" rx="16" ry="5" fill="#d2b48c" stroke="#54361e" stroke-width="2.5"/>
                        
                        <!-- Bàn tay bị trói siết chặt các ngón tay -->
                        <ellipse cx="4" cy="58" rx="4" ry="5" fill="#cca06e" stroke="#1a0f05" stroke-width="1.5"/>
                        <ellipse cx="38" cy="58" rx="4" ry="5" fill="#cca06e" stroke="#1a0f05" stroke-width="1.5"/>

                        <circle cx="21" cy="16" r="14" fill="#cca06e" stroke="#1a0f05" stroke-width="2"/>
                        <path d="M10,18 Q21,30 32,18" fill="#361f10" />
                        <ellipse cx="21" cy="22" rx="4" ry="3" fill="#330b0b" />
                        <rect x="8" y="11" width="26" height="8" fill="#f8f8f8" rx="2" stroke="#444" stroke-width="1.5"/>
                    </g>

                    <!-- BONG BÓNG LỜI THOẠI CĂNG THẲNG -->
                    <g id="speech-bubble" opacity="0" transform="translate(150, -115)">
                        <path d="M0,0 L180,0 Q190,0 190,10 L190,65 Q190,75 180,75 L100,75 L80,100 L85,75 L0,75 Q-10,75 -10,65 L-10,10 Q-10,0 0,0 Z" fill="#ffffff" stroke="#111" stroke-width="3" />
                        <text id="bubble-text" x="90" y="32" font-size="12" font-weight="bold" fill="#cc0000" text-anchor="middle">
                            "THẢ TA RA! HÃY ĐỂ TA BƠI ĐẾN ĐÓ!"
                        </text>
                        <text x="90" y="54" font-size="11" font-weight="bold" fill="#111" text-anchor="middle">
                            "CẦU XIN CÁC NGƯƠI... THÁO DÂY CHO TA!"
                        </text>
                    </g>
                </g>

                <!-- THỦY THỦ NHẢY KHỎI THUYỀN VÀ BỌT NƯỚC TUNG TÓE -->
                <g id="jumping-soldier" opacity="0">
                    <circle id="jumper-body" cx="500" cy="340" r="11" fill="#1b120c" />
                    <g id="water-splash" opacity="0">
                        <ellipse cx="500" cy="400" rx="32" ry="12" fill="#aeeeff" />
                        <path d="M475,400 L465,365 M500,400 L500,355 M525,400 L535,365" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
                    </g>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-siren">EO BIỂN SIREN HUYỀN HOẶC</span>
                <span id="stage-action-text-2" class="action-caption">Khúc ca ma quái đang văng vẳng từ hòn đảo đá! Giữ vững tâm trí để bảo toàn thủy thủ!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerSirensWrong() {
        this.sailorJumpCount++;
        const bubble = document.getElementById('speech-bubble');
        const tiedHero = document.getElementById('odysseus-tied');
        const jumper = document.getElementById('jumping-soldier');
        const jumperBody = document.getElementById('jumper-body');
        const splash = document.getElementById('water-splash');
        const text = document.getElementById('stage-action-text-2');

        if (text) {
            text.innerHTML = `⚠️ <strong>SAI RỒI!</strong> Odysseus gào thét trong cơn mê hoặc! Một thủy thủ không chịu nổi đã gieo mình xuống biển! (Đã mất: ${this.sailorJumpCount} lính)`;
            text.className = "action-caption text-danger";
        }

        if (bubble) bubble.style.opacity = '1';
        if (tiedHero) tiedHero.classList.add('hero-struggling');

        if (jumper && jumperBody && splash) {
            jumper.style.opacity = '1';
            jumperBody.setAttribute('cy', '330');
            jumperBody.setAttribute('cx', `${450 + (this.sailorJumpCount * 25)}`);
            
            setTimeout(() => {
                jumperBody.setAttribute('cy', '400');
                splash.setAttribute('transform', `translate(${this.sailorJumpCount * 25}, 0)`);
                splash.style.opacity = '1';
            }, 300);

            setTimeout(() => {
                jumper.style.opacity = '0';
                splash.style.opacity = '0';
            }, 1200);
        }

        setTimeout(() => {
            if (bubble) bubble.style.opacity = '0';
            if (tiedHero) tiedHero.classList.remove('hero-struggling');
        }, 2000);
    }

    triggerSirensCorrect() {
        const text = document.getElementById('stage-action-text-2');
        const sirens = document.getElementById('siren-flock');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "✨ <strong>CHÍNH XÁC!</strong> Toàn bộ thủy thủ đều an toàn, các nàng Siren trên đảo đá gào thét trong giận dữ!";
            text.className = "action-caption text-success";
        }

        if (sirens) {
            sirens.classList.remove('sirens-floating');
            sirens.classList.add('sirens-furious');
        }

        if (ship) ship.classList.add('ship-accelerating');

        setTimeout(() => {
            if (sirens) {
                sirens.classList.remove('sirens-furious');
                sirens.classList.add('sirens-floating');
            }
            if (ship) ship.classList.remove('ship-accelerating');
        }, 1500);
    }

    triggerSirensPassThrough(callback) {
        const text = document.getElementById('stage-action-text-2');
        const ship = document.getElementById('greek-ship');

        if (text) {
            text.innerHTML = "🌊 <strong>VƯỢT QUA TỬ ĐỊA SIREN!</strong> Chiếc thuyền xé toạc làn sương mù dày đặc và vượt qua an toàn!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-escaping-fog');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }

    // ========================================================
    // 3. THỬ THÁCH 3: EO BIỂN QUÁI VẬT SCYLLA 6 ĐẦU
    // ========================================================
    renderScyllaStage() {
        this.currentStage = 'scylla';
        this.clear();

        const html = `
        <div class="stage-view stage-scylla" id="stage-scylla">
            <svg class="scene-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="whirlpoolGradReal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#020810"/>
                        <stop offset="50%" stop-color="#0b2c3f"/>
                        <stop offset="100%" stop-color="#145374"/>
                    </radialGradient>
                    <linearGradient id="scyllaSkinReal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#421a30"/>
                        <stop offset="50%" stop-color="#240e1b"/>
                        <stop offset="100%" stop-color="#0e060b"/>
                    </linearGradient>
                </defs>

                <rect width="1200" height="500" fill="#080c12" />
                <path d="M450,0 L440,90 L480,120 L430,230" stroke="#77aaff" stroke-width="2.5" opacity="0.45" fill="none"/>

                <!-- XOÁY NƯỚC KHỔNG LỒ CHARYBDIS -->
                <g id="charybdis-zone" transform="translate(180, 360)">
                    <ellipse cx="0" cy="0" rx="160" ry="70" fill="url(#whirlpoolGradReal)" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="115" ry="46" stroke="#4db8ff" stroke-width="3.5" stroke-dasharray="30 15" fill="none" class="whirlpool-spin" />
                    <ellipse cx="0" cy="0" rx="60" ry="24" stroke="#aeeeff" stroke-width="4.5" stroke-dasharray="20 10" fill="none" class="whirlpool-spin-reverse" />
                    <ellipse cx="0" cy="0" rx="18" ry="7" fill="#000000" />
                </g>

                <!-- VÁCH ĐÁ TỬ ĐỊA MESSINA NƠI SCYLLA RÌNH RẬP -->
                <polygon points="780,0 1200,0 1200,500 700,500 810,280 740,160" fill="#16171a" stroke="#000" stroke-width="3"/>
                <ellipse cx="940" cy="140" rx="110" ry="85" fill="#060709" />

                <!-- QUÁI VẬT 6 ĐẦU SCYLLA CÓ VẢY VÀ HÀM RĂNG CÁ MẬP -->
                <g id="scylla-monster" transform="translate(820, 60)">
                    <g id="scylla-head-1" class="scylla-neck-idle">
                        <path d="M130,70 Q40,40 -30,10" stroke="url(#scyllaSkinReal)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <circle cx="-35" cy="10" r="20" fill="#4a2238" stroke="#111" stroke-width="2"/>
                        <circle cx="-38" cy="6" r="3.5" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-2" class="scylla-neck-idle" style="animation-delay: 0.3s">
                        <path d="M130,70 Q60,90 -60,50" stroke="url(#scyllaSkinReal)" stroke-width="22" stroke-linecap="round" fill="none"/>
                        <circle cx="-65" cy="50" r="19" fill="#4a2238" stroke="#111" stroke-width="2"/>
                        <circle cx="-68" cy="46" r="3.5" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-3" class="scylla-neck-idle" style="animation-delay: 0.6s">
                        <path d="M130,70 Q30,120 -100,100" stroke="url(#scyllaSkinReal)" stroke-width="24" stroke-linecap="round" fill="none"/>
                        <circle cx="-105" cy="100" r="20" fill="#4a2238" stroke="#111" stroke-width="2"/>
                        <circle cx="-108" cy="96" r="3.5" fill="#ff0055" />
                    </g>

                    <!-- ĐẦU BỔ NHÀO CHÍNH -->
                    <g id="scylla-striking-head" class="scylla-neck-idle" style="animation-delay: 0.2s">
                        <path id="attack-neck-path" d="M130,70 Q10,160 -130,170" stroke="url(#scyllaSkinReal)" stroke-width="26" stroke-linecap="round" fill="none"/>
                        <g id="attack-jaw" transform="translate(-135, 170)">
                            <ellipse cx="0" cy="0" rx="26" ry="18" fill="#5c2645" stroke="#111" stroke-width="2"/>
                            <circle cx="-8" cy="-6" r="4.5" fill="#ff0000" />
                            <circle cx="-8" cy="-6" r="1.5" fill="#ffffff" />
                            <polygon points="-28,4 -18,-3 -10,5 0,-3 10,5 18,-3" fill="#ffffff" stroke="#111" stroke-width="1"/>
                        </g>
                    </g>

                    <g id="scylla-head-5" class="scylla-neck-idle" style="animation-delay: 0.5s">
                        <path d="M130,70 Q40,190 -80,220" stroke="url(#scyllaSkinReal)" stroke-width="21" stroke-linecap="round" fill="none"/>
                        <circle cx="-85" cy="220" r="18" fill="#4a2238" stroke="#111" stroke-width="2"/>
                        <circle cx="-88" cy="216" r="3.5" fill="#ff0055" />
                    </g>

                    <g id="scylla-head-6" class="scylla-neck-idle" style="animation-delay: 0.8s">
                        <path d="M130,70 Q50,230 -30,270" stroke="url(#scyllaSkinReal)" stroke-width="20" stroke-linecap="round" fill="none"/>
                        <circle cx="-35" cy="270" r="17" fill="#4a2238" stroke="#111" stroke-width="2"/>
                        <circle cx="-38" cy="266" r="3.5" fill="#ff0055" />
                    </g>
                </g>

                <!-- CON THUYỀN TIẾN GIỮA EO BIỂN -->
                <g id="scylla-ship" class="ship-in-strait" transform="translate(420, 240)">
                    <path d="M30,120 Q150,135 280,115 L320,65 L270,115 L50,115 Q15,80 0,40 Z" fill="#482910" stroke="#111" stroke-width="2.5"/>
                    <line x1="170" y1="115" x2="170" y2="-20" stroke="#2a1608" stroke-width="7" />

                    <!-- ODYSSEUS TUỐT GƯƠM CHIẾN ĐẤU -->
                    <g id="odysseus-fighter" transform="translate(225, 25)">
                        <path d="M-10,35 Q-28,15 -38,55" stroke="#b22222" stroke-width="9" fill="none" />
                        <rect x="0" y="25" width="24" height="42" fill="#d4af37" stroke="#111" stroke-width="2" rx="3" />
                        <circle cx="12" cy="14" r="13" fill="#cca06e" stroke="#111" stroke-width="2"/>
                        <circle cx="16" cy="13" r="1.8" fill="#000" />
                        <path d="M0,12 Q12,-6 24,12 Z" fill="#ffd700" stroke="#111" stroke-width="1.5"/>
                        <g id="odysseus-sword" transform="rotate(-30, 22, 35)">
                            <line x1="22" y1="35" x2="75" y2="8" stroke="#f4d03f" stroke-width="5.5" stroke-linecap="round"/>
                            <polygon points="75,8 86,3 78,13" fill="#ffffff" stroke="#111" stroke-width="1.5"/>
                        </g>
                    </g>

                    <g id="panicked-crew" transform="translate(80, 60)">
                        <circle cx="20" cy="35" r="9" fill="#cca06e" stroke="#111" stroke-width="1.5"/>
                        <circle cx="48" cy="35" r="9" fill="#cca06e" stroke="#111" stroke-width="1.5"/>
                        <circle cx="76" cy="35" r="9" fill="#cca06e" stroke="#111" stroke-width="1.5"/>
                    </g>
                </g>

                <g id="slash-arc" opacity="0">
                    <path d="M620,240 Q680,205 720,270" stroke="#00ffff" stroke-width="9" stroke-linecap="round" fill="none" />
                    <circle cx="675" cy="240" r="22" fill="#ffffff" opacity="0.85" />
                </g>

                <g id="bite-impact" opacity="0">
                    <circle cx="710" cy="340" r="28" fill="#ff0000" opacity="0.65" />
                    <line x1="685" y1="330" x2="735" y2="355" stroke="#fff" stroke-width="4.5"/>
                    <line x1="735" y1="330" x2="685" y2="355" stroke="#fff" stroke-width="4.5"/>
                </g>
            </svg>

            <div class="stage-status-overlay">
                <span class="badge badge-scylla">EO BIỂN MESSINA TỬ ĐỊA</span>
                <span id="stage-action-text-3" class="action-caption">Một bên là vực xoáy Charybdis, trước mặt là quái thú 6 đầu Scylla! Vung gươm bảo vệ con tàu!</span>
            </div>
        </div>
        `;
        this.container.innerHTML = html;
    }

    triggerScyllaWrong() {
        const neck = document.getElementById('scylla-striking-head');
        const ship = document.getElementById('scylla-ship');
        const bite = document.getElementById('bite-impact');
        const crew = document.getElementById('panicked-crew');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚠️ <strong>SAI RỒI!</strong> Đầu Scylla lao xuống ngoạm vỡ be thuyền! Thủy thủ đoàn hoảng loạn tột cùng!";
            text.className = "action-caption text-danger";
        }

        if (neck) neck.classList.add('scylla-dive-attack');
        if (bite) bite.style.opacity = '1';
        if (ship) ship.classList.add('ship-bitten-shake');
        if (crew) crew.classList.add('crew-panic-anim');

        setTimeout(() => {
            if (neck) neck.classList.remove('scylla-dive-attack');
            if (bite) bite.style.opacity = '0';
            if (ship) ship.classList.remove('ship-bitten-shake');
            if (crew) crew.classList.remove('crew-panic-anim');
        }, 1500);
    }

    triggerScyllaCorrect() {
        const sword = document.getElementById('odysseus-sword');
        const slash = document.getElementById('slash-arc');
        const head = document.getElementById('scylla-striking-head');
        const text = document.getElementById('stage-action-text-3');

        if (text) {
            text.innerHTML = "⚔️ <strong>XUẤT SẮC!</strong> Odysseus tung mình chém đứt móng vuốt và đẩy lùi đầu Scylla!";
            text.className = "action-caption text-success";
        }

        if (sword) sword.classList.add('sword-slash-anim');
        if (slash) slash.style.opacity = '1';
        if (head) head.classList.add('scylla-head-recoil');

        setTimeout(() => {
            if (sword) sword.classList.remove('sword-slash-anim');
            if (slash) slash.style.opacity = '0';
            if (head) head.classList.remove('scylla-head-recoil');
        }, 1300);
    }

    triggerScyllaEscape(callback) {
        const text = document.getElementById('stage-action-text-3');
        const ship = document.getElementById('scylla-ship');

        if (text) {
            text.innerHTML = "🏆 <strong>VƯỢT THOÁT NGOẠN MỤC!</strong> Con tàu anh dũng thoát khỏi Scylla và Charybdis, vươn mình ra biển khơi!";
            text.className = "action-caption text-gold";
        }

        if (ship) ship.classList.add('ship-full-escape');

        setTimeout(() => {
            if (callback) callback();
        }, 2000);
    }
}
