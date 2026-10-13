// ============================================================================
// VISUAL ICON & DIAGRAM APPLICATION CONTROLLER (ZERO-CLUTTER CLICK-TO-REVEAL)
// BJC Specialties Vietnam (BJCS) x CJ BIO Executive Presentation
// ============================================================================

(function () {
  const PASSCODE = "Bjc2026!";
  const MOD_LIST = ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"];
  const MOD_SLUGS = {
    mod1: "/01-executive-hub",
    mod2: "/02-platform",
    mod3: "/03-portfolio",
    mod4: "/04-target-market",
    mod5: "/05-win-strategy",
    mod6: "/06-gtm-roadmap",
    all: "/all-modules"
  };
  const SLUG_TO_MOD = {
    "01-executive-hub": "mod1",
    "executive-hub": "mod1",
    "executive": "mod1",
    "mod1": "mod1",
    "02-platform": "mod2",
    "platform": "mod2",
    "mod2": "mod2",
    "03-portfolio": "mod3",
    "portfolio": "mod3",
    "mod3": "mod3",
    "04-target-market": "mod4",
    "target-market": "mod4",
    "market": "mod4",
    "mod4": "mod4",
    "05-win-strategy": "mod5",
    "win-strategy": "mod5",
    "roi-calculator": "mod5",
    "mod5": "mod5",
    "06-gtm-roadmap": "mod6",
    "gtm-roadmap": "mod6",
    "roadmap": "mod6",
    "mod6": "mod6",
    "all-modules": "all"
  };

  const FONT_SCALES = ["sm", "md", "lg", "xl"];
  const FONT_LABELS = { sm: "90%", md: "100%", lg: "112%", xl: "125%" };

  // Reactive Application State
  const state = {
    authenticated: sessionStorage.getItem("bjc_cj_unlocked_v2") === "1",
    lang: "vi",
    theme: localStorage.getItem("bjc_cj_theme") || "dark",
    fontScaleIndex: parseInt(localStorage.getItem("bjc_cj_font_idx") || "1", 10),
    activeTab: "mod1",
    activeNavHighlight: "mod1",
    productTab: "hybind",
    regionFilter: "all",
    categoryFilter: "all",
    openView: null,
    suppressUrlSync: false,
    calc: {
      meatCost: 4.5,
      stppDose: 0.35,
      hybindDose: 0.40,
      yieldGain: 2.0,
      stppPricePerKg: 2.20,
      hybindPricePerKg: 8.50,
      annualTons: 2500
    }
  };

  function t() {
    return window.APP_DATA.i18n[state.lang] || window.APP_DATA.i18n.en;
  }

  function ui() {
    const map = {
      en: {
        headerMeetingBadge: "15 Oct 2026 · Partnership",
        clickDetail: "Tap to view →",
        tapExpand: "Tap card to expand details",
        prevSlide: "← Prev",
        nextSlide: "Next →",
        slideMode: "1-Slide View",
        allMode: "All 6 Slides",
        valuePillarsTag: "4 VALUE PILLARS",
        hybindSubTag: "Phosphate-Free",
        fgaaSubTag: "L-Arg · L-Cit · L-His",
        viewApps: "Application Segments (Tap icon):",
        bjcsCustomerLegend: "BJCS Active Customer",
        targetLegend: "Priority Target",
        activeCustomerBadge: "✓ BJCS Active Customer",
        priorityTargetBadge: "🎯 Priority Target",
        extraMeatLbl: "Extra Meat",
        yieldValueLbl: "Yield Value",
        costDeltaLbl: "Cost Delta",
        perTonSuffix: "/ Ton",
        perYearSuffix: "/ Year",
        annualVolPrefix: "2,500 MT/yr:",
        hybindFlowTitle: "🥩 TasteNrich® HYBIND — 3-Step Flow",
        fgaaFlowTitle: "⚡ AMINATURE® FGAA — 3-Step Flow",
        viewDecisionMap: "Buyer Map & SPIN",
        viewTrialProtocol: "3-Step Trial Flow",
        viewMonthlyKpi: "5 Monthly KPIs",
        clickPhaseHint: "Tap for checklist →",
        synergyFlowTitle: "Regional Synergy Flow (Tap to inspect)",
        supplyFlowTitle: "End-to-End Local Supply & Technical Chain",
        flowNodes: [
          { icon: "🚢", title: "Import & MOH RA", sub: "In-house food & nutraceutical dossier" },
          { icon: "🏢", title: "Warehouse HCM & HN", sub: "Ex-Stock VND · Door-to-Door" },
          { icon: "🔬", title: "NPD & Lab ~350m²", sub: "Food, Beverage & Nutraceutical R&D" },
          { icon: "🤝", title: "~90 Active Accounts", sub: "Masan, CJ Cầu Tre, Vissan..." }
        ],
        regVisualTags: [
          ["🌏 One Partner TH–VN", "💎 Value Pricing", "🛡️ Zero Channel Conflict"],
          ["⚡ Proven Recipes", "📊 Dosage Benchmarks", "🚀 Fast Onboarding"],
          ["🌡️ Thermomix", "🥩 Mincer & Mixer", "🌭 Hand Stuffing Line"],
          ["👥 ~90 Existing Accounts", "🏢 Warehouse HCM & HN", "🌐 15+ Global Principals"]
        ],
        sampleModal: {
          title: "Sample & Dossier Protocol",
          subtitle: "By 30 October 2026 Onboarding Milestone",
          hybindBullets: [
            "5–10 kg Sample Kits for Meat & Seafood Trials",
            "TDS, SDS, COA & Vietnam Label Classification",
            "Halal, Kosher, Non-GMO & FSSC 22000 Certificates"
          ],
          fgaaBullets: [
            "L-Arginine, L-Citrulline & L-Histidine Trial Samples",
            "Full COA, TDS, MSDS for MOH Registration",
            "Vegan Action, Halal, Kosher & Taste-Masking Guide"
          ],
          footerOrg: "BJC Specialties Vietnam · Food, Beverage & Nutraceutical Division",
          statusBadge: "✓ Ready for Q4 2026 Onboarding"
        },
        pdfModal: {
          title: "Download PDF Documents",
          subtitle: "BJC Specialties Vietnam × CJ BIO (15 Oct 2026)",
          doc1Tag: "EXECUTIVE PRESENTATION (29 SLIDES · PDF)",
          doc1Title: "151026-CJ_BIO_x_BJCS_Vietnam.pdf",
          doc2Tag: "PRODUCT BRIEF 01",
          doc2Title: "TasteNrich® HYBIND Strategy Brief (PDF)",
          doc3Tag: "PRODUCT BRIEF 02",
          doc3Title: "AMINATURE® FGAA Strategy Brief (PDF)"
        },
        contactModal: {
          title: "BJC Specialties Vietnam",
          subtitle: "Nationwide Offices, Warehouses & Technical R&D Organization",
          division: "Food, Beverage & Nutraceutical Ingredients Division",
          badge1: "🏛️ BJC Group Subsidiary in Vietnam (Since 2007)",
          badge2: "🚚 Nationwide Ex-Stock Warehousing (HCMC & Hanoi)",
          hcmTitle: "📍 HCMC Head Office & Southern Warehouse",
          hcmAddr: "MM Mega Market Office Complex, Lot B, An Phu – An Khanh, Thu Duc City, Ho Chi Minh City",
          hnTitle: "📍 Hanoi Branch Office & Northern Warehouse",
          hnAddr: "3rd Floor, Lobby A, Geleximco Building, 897 Giai Phong Street, Hoang Mai District, Hanoi"
        }
      },
      vi: {
        headerMeetingBadge: "15/10/2026 · Đối Tác Chiến Lược",
        clickDetail: "Chạm xem →",
        tapExpand: "Chạm vào từng ô để mở rộng chi tiết",
        prevSlide: "← Trước",
        nextSlide: "Tiếp →",
        slideMode: "Xem từng trang",
        allMode: "Xem cả 6 trang",
        valuePillarsTag: "4 TRỤ CỘT GIÁ TRỊ",
        hybindSubTag: "Thay Thế Phosphate",
        fgaaSubTag: "L-Arg · L-Cit · L-His",
        viewApps: "Nhóm ứng dụng trọng tâm (Chạm vào từng ô):",
        bjcsCustomerLegend: "Khách Hàng Hiện Hữu BJCS",
        targetLegend: "Khách Hàng Mục Tiêu",
        activeCustomerBadge: "✓ Khách Hàng Hiện Hữu BJCS",
        priorityTargetBadge: "🎯 Khách Hàng Mục Tiêu Ưu Tiên",
        extraMeatLbl: "Thịt Giữ Thêm",
        yieldValueLbl: "Giá Trị Hiệu Suất",
        costDeltaLbl: "Chênh Lệch Phụ Gia",
        perTonSuffix: "/ Tấn",
        perYearSuffix: "/ Năm",
        annualVolPrefix: "Sản lượng 2.500 Tấn/năm:",
        hybindFlowTitle: "🥩 TasteNrich® HYBIND — Quy Trình Thử Nghiệm 3 Bước",
        fgaaFlowTitle: "⚡ AMINATURE® FGAA — Quy Trình Thử Nghiệm 3 Bước",
        viewDecisionMap: "Sơ Đồ Người Quyết Định",
        viewTrialProtocol: "Sơ Đồ Thử Nghiệm 3 Bước",
        viewMonthlyKpi: "5 KPI Hàng Tháng",
        clickPhaseHint: "Chạm xem hạng mục →",
        synergyFlowTitle: "Sơ Đồ Cộng Hưởng Khu Vực (Chạm để xem)",
        supplyFlowTitle: "Chuỗi Cung Ứng, Kho Bãi & Kỹ Thuật Thực Phẩm – TPCN",
        flowNodes: [
          { icon: "🚢", title: "Nhập Khẩu & Pháp Lý", sub: "Tự công bố Thực phẩm & TPCN" },
          { icon: "🏢", title: "Kho Bãi HCM & Hà Nội", sub: "Tồn kho VNĐ · Giao tận nhà máy" },
          { icon: "🔬", title: "Trung Tâm Lab ~350m²", sub: "R&D Thực phẩm, Đồ uống & TPCN" },
          { icon: "🤝", title: "~90 Khách Hàng Sẵn Có", sub: "Masan, CJ Cầu Tre, Vissan..." }
        ],
        regVisualTags: [
          ["🌏 1 Đối Tác Thái – Việt", "💎 Kỷ Luật Giá Trị", "🛡️ Quản Trị Khách Hàng Trọng Điểm"],
          ["⚡ Công Thức Chuẩn", "📊 Dữ Liệu Chạy Thử", "🚀 Rút Ngắn Thời Gian Chào Hàng"],
          ["🌡️ Thiết Bị Thermomix", "🥩 Máy Xay & Trộn Thịt", "🌭 Máy Nhồi Xúc Xích"],
          ["👥 ~90 Khách Hàng Hiện Hữu", "🏢 Kho Hàng HCM & Hà Nội", "🌐 15+ Tập Đoàn Nguyên Liệu Quốc Tế"]
        ],
        sampleModal: {
          title: "Quy Trình Nhận Mẫu & Hồ Sơ Kỹ Thuật",
          subtitle: "Cột Mốc Hoàn Tất Trước Ngày 30/10/2026",
          hybindBullets: [
            "Bộ mẫu thử 5–10 kg cho nhà máy chế biến Thịt & Thủy sản",
            "Trọn bộ TDS, SDS, COA & hướng dẫn ghi nhãn tiếng Việt",
            "Chứng nhận Halal, Kosher, Không biến đổi gen & FSSC 22000"
          ],
          fgaaBullets: [
            "Mẫu thử L-Arginine, L-Citrulline & L-Histidine độ tinh khiết cao",
            "Đầy đủ COA, TDS, MSDS phục vụ đăng ký hồ sơ Bộ Y Tế",
            "Chứng nhận Thuần chay, Halal, Kosher & hướng dẫn điều vị"
          ],
          footerOrg: "BJC Specialties Việt Nam · Khối Nguyên Liệu Thực Phẩm, Đồ Uống & TPCN",
          statusBadge: "✓ Sẵn Sàng Tiếp Nhận Mẫu Quý 4/2026"
        },
        pdfModal: {
          title: "Tải Tài Liệu Trình Bày (PDF)",
          subtitle: "BJC Specialties Việt Nam × CJ BIO (15/10/2026)",
          doc1Tag: "BẢN TRÌNH BÀY CHIẾN LƯỢC (29 TRANG · PDF)",
          doc1Title: "151026-CJ_BIO_x_BJCS_Vietnam.pdf",
          doc2Tag: "TÀI LIỆU SẢN PHẨM 01",
          doc2Title: "TasteNrich® HYBIND — Hồ Sơ Giải Pháp (PDF)",
          doc3Tag: "TÀI LIỆU SẢN PHẨM 02",
          doc3Title: "AMINATURE® FGAA — Hồ Sơ Giải Pháp (PDF)"
        },
        contactModal: {
          title: "BJC Specialties Việt Nam",
          subtitle: "Hệ Thống Văn Phòng, Kho Bãi & Trung Tâm Kỹ Thuật R&D Toàn Quốc",
          division: "Khối Kinh Doanh Nguyên Liệu Thực Phẩm, Đồ Uống & Thực Phẩm Chức Năng (TPCN)",
          badge1: "🏛️ Công Ty Thành Viên Tập Đoàn BJC Tại Việt Nam (Từ 2007)",
          badge2: "🚚 Hệ Thống Kho Nội Địa Ex-Stock (TP.HCM & Hà Nội)",
          hcmTitle: "📍 Trụ Sở Chính & Kho Hàng Miền Nam (TP.HCM)",
          hcmAddr: "Khu phức hợp MM Mega Market, Lô B, KĐT An Phú – An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh",
          hnTitle: "📍 Chi Nhánh & Kho Hàng Miền Bắc (Hà Nội)",
          hnAddr: "Tầng 3, Sảnh A, Tòa nhà Geleximco, 897 Giải Phóng, Quận Hoàng Mai, TP. Hà Nội"
        }
      },
      ko: {
        headerMeetingBadge: "2026.10.15 · 전략적 파트너십",
        clickDetail: "상세 보기 →",
        tapExpand: "카드를 클릭하면 상세 내용이 펼쳐집니다",
        prevSlide: "← 이전",
        nextSlide: "다음 →",
        slideMode: "슬라이드 보기",
        allMode: "전체 6슬라이드",
        valuePillarsTag: "4대 핵심 가치 축",
        hybindSubTag: "인산염 대체 솔루션",
        fgaaSubTag: "L-Arg · L-Cit · L-His",
        viewApps: "핵심 적용 분야 (아이콘 클릭):",
        bjcsCustomerLegend: "BJCS 기존 거래처",
        targetLegend: "신규 타겟 고객사",
        activeCustomerBadge: "✓ BJCS 기존 거래 고객사",
        priorityTargetBadge: "🎯 핵심 타겟 고객사",
        extraMeatLbl: "추가 수율 증가량",
        yieldValueLbl: "수율 증가 가치",
        costDeltaLbl: "첨가물 비용 차액",
        perTonSuffix: "/ 톤",
        perYearSuffix: "/ 년",
        annualVolPrefix: "연간 2,500톤 기준:",
        hybindFlowTitle: "🥩 TasteNrich® HYBIND — 3단계 기술 검증 프로세스",
        fgaaFlowTitle: "⚡ AMINATURE® FGAA — 3단계 기술 검증 프로세스",
        viewDecisionMap: "의사결정권자 맵",
        viewTrialProtocol: "3단계 테스트 프로세스",
        viewMonthlyKpi: "월간 5대 KPI",
        clickPhaseHint: "세부 과제 보기 →",
        synergyFlowTitle: "태국 ➔ 베트남 시너지 구조 (클릭)",
        supplyFlowTitle: "베트남 현지 물류 · 기술 · 인허가 밸류체인",
        flowNodes: [
          { icon: "🚢", title: "수입 통관 & 식약청(MOH)", sub: "식품·건기식 인허가 전담" },
          { icon: "🏢", title: "호치민 & 하노이 창고", sub: "베트남 동(VND) 재고 · 직배송" },
          { icon: "🔬", title: "전담 R&D & 방콕 랩", sub: "식품·음료·건기식 R&D 기술센터" },
          { icon: "🤝", title: "~90개 기존 거래선", sub: "마산, CJ 꺼우째, 비산 등" }
        ],
        regVisualTags: [
          ["🌏 태국·베트남 단일 파트너", "💎 가치 기반 가격 규율", "🛡️ 핵심 고객 통합 관리"],
          ["⚡ 검증된 배합 레시피", "📊 적용 데이터 이전", "🚀 리드타임 단축"],
          ["🌡️ 써모믹스(Thermomix)", "🥩 육가공 민서/믹서", "🌭 소시지 충진 라인"],
          ["👥 ~90개 기존 거래선", "🏢 호치민·하노이 창고", "🌐 15+ 글로벌 선도 원료 파트너"]
        ],
        sampleModal: {
          title: "샘플 및 기술 서류 요청 프로토콜",
          subtitle: "2026년 10월 30일 온보딩 마일스톤",
          hybindBullets: [
            "육가공 및 수산가공 공장 테스트용 5~10kg 샘플 키트",
            "TDS, SDS, COA 및 베트남 클린라벨 표기 가이드",
            "할랄, 코셔, Non-GMO 및 FSSC 22000 인증서 패키지"
          ],
          fgaaBullets: [
            "L-아르기닌, L-시트룰린, L-히스티딘 고순도 샘플",
            "베트남 보건부(MOH) 등록용 COA, TDS, MSDS 완비",
            "비건 액션, 할랄, 코셔 인증 및 고미 마스킹 가이드"
          ],
          footerOrg: "BJC Specialties 베트남 · 식품·음료·건강기능식품 원료 사업부",
          statusBadge: "✓ 2026년 4분기 온보딩 준비 완료"
        },
        pdfModal: {
          title: "발표 자료 및 브리프 다운로드 (PDF)",
          subtitle: "BJC Specialties 베트남 × CJ BIO (2026.10.15)",
          doc1Tag: "경영진 발표 자료 (29슬라이드 · PDF)",
          doc1Title: "151026-CJ_BIO_x_BJCS_Vietnam.pdf",
          doc2Tag: "제품 전략 브리프 01",
          doc2Title: "TasteNrich® HYBIND 전략 브리프 (PDF)",
          doc3Tag: "제품 전략 브리프 02",
          doc3Title: "AMINATURE® FGAA 전략 브리프 (PDF)"
        },
        contactModal: {
          title: "BJC Specialties 베트남 (법인)",
          subtitle: "베트남 전국 오피스 · 물류창고 · R&D 기술영업 조직",
          division: "식품 · 음료 · 건강기능식품(TPCN) 원료 사업부",
          badge1: "🏛️ BJC 그룹 베트남 현지 법인 (2007년 설립)",
          badge2: "🚚 호치민 & 하노이 현지 창고 재고 (Ex-Stock) 운영",
          hcmTitle: "📍 호치민 본사 오피스 및 남부 물류창고",
          hcmAddr: "호치민시 투득시 안푸-안칸 MM 메가마켓 오피스 단지 B동",
          hnTitle: "📍 하노이 지사 오피스 및 북부 물류창고",
          hnAddr: "하노이시 호앙마이구 자이퐁 거리 897 Geleximco 빌딩 A로비 3층"
        }
      }
    };
    return map[state.lang] || map.en;
  }

  // SVG Icon Helper
  function getIcon(name, cls = "w-5 h-5") {
    const icons = {
      handshake: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"/></svg>`,
      users: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
      flask: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>`,
      truck: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>`,
      check: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
      sparkle: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>`,
      arrowRight: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
      chevronDown: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`
    };
    return icons[name] || icons.sparkle;
  }

  // Toggleable accordion helper inside Modals/Drawers so text is never dumped all at once
  window.toggleVisualAccordion = function (accId) {
    const el = document.getElementById(accId);
    const icon = document.getElementById(`${accId}-icon`);
    if (!el) return;
    const isHidden = el.classList.contains("hidden");
    if (isHidden) {
      el.classList.remove("hidden");
      if (icon) icon.style.transform = "rotate(180deg)";
    } else {
      el.classList.add("hidden");
      if (icon) icon.style.transform = "rotate(0deg)";
    }
  };

  // ==========================================================================
  // 0. SILENT NATIVE ADDRESS BAR ROUTING (NO EXTRA SHARE BUTTONS)
  // ==========================================================================
  function getRelativeDeepPath() {
    const mod = state.activeTab === "all" ? "all" : state.activeNavHighlight;
    let basePath = MOD_SLUGS[mod] || "/01-executive-hub";
    if (mod === "mod3") {
      basePath = `/03-portfolio/${state.productTab}`;
    }

    const params = new URLSearchParams();
    if (state.openView) params.set("open", state.openView);
    if (mod === "mod4" && state.regionFilter !== "all" && !state.openView) {
      params.set("region", state.regionFilter);
    }
    if (mod === "mod4" && state.categoryFilter !== "all" && !state.openView) {
      params.set("cat", state.categoryFilter);
    }
    if (state.lang && state.lang !== "vi") {
      params.set("lang", state.lang);
    }

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  function syncUrlState(push = false) {
    if (state.suppressUrlSync) return;
    const relPath = getRelativeDeepPath();
    try {
      if (window.location.protocol === "file:") {
        window.location.hash = relPath;
      } else if (push) {
        window.history.pushState({ relPath }, "", relPath);
      } else {
        window.history.replaceState({ relPath }, "", relPath);
      }
    } catch (err) {
      window.location.hash = relPath;
    }
  }

  function applyUrlString(rawUrlStr) {
    state.suppressUrlSync = true;
    try {
      let pathPart = "";
      let queryPart = "";
      if (rawUrlStr.includes("?")) {
        const parts = rawUrlStr.split("?");
        pathPart = parts[0];
        queryPart = parts.slice(1).join("?");
      } else {
        pathPart = rawUrlStr;
      }

      const cleanSegments = pathPart
        .replace(/^#\/?/, "")
        .replace(/^\/+/, "")
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean);

      const params = new URLSearchParams(queryPart);

      const langParam = params.get("lang");
      if (langParam && ["en", "vi", "ko"].includes(langParam)) {
        state.lang = langParam;
      }

      if (cleanSegments.length > 0) {
        const seg0 = cleanSegments[0].toLowerCase();
        if (SLUG_TO_MOD[seg0]) {
          const targetMod = SLUG_TO_MOD[seg0];
          if (targetMod === "all") {
            state.activeTab = "all";
          } else {
            state.activeTab = targetMod;
            state.activeNavHighlight = targetMod;
          }
        }
        if (cleanSegments[1]) {
          const seg1 = cleanSegments[1].toLowerCase();
          if (seg1 === "hybind" || seg1 === "fgaa") {
            state.activeTab = "mod3";
            state.activeNavHighlight = "mod3";
            state.productTab = seg1;
          } else if (window.APP_DATA.accounts.some((a) => a.id === seg1)) {
            state.activeTab = "mod4";
            state.activeNavHighlight = "mod4";
            params.set("open", `account-${seg1}`);
          }
        }
      }

      const tabParam = params.get("tab");
      if (tabParam === "hybind" || tabParam === "fgaa") {
        state.productTab = tabParam;
      }
      const regParam = params.get("region");
      if (regParam && ["all", "south", "north", "central"].includes(regParam)) {
        state.regionFilter = regParam;
      }
      const catParam = params.get("cat");
      if (catParam && ["all", "meat", "seafood", "fgaa"].includes(catParam)) {
        state.categoryFilter = catParam;
      }

      const openKey = params.get("open");
      if (openKey) {
        if (openKey === "synergy" || openKey.startsWith("pillar-")) {
          state.activeNavHighlight = "mod1";
          if (state.activeTab !== "all") state.activeTab = "mod1";
        } else if (openKey === "rtm" || openKey === "principals") {
          state.activeNavHighlight = "mod2";
          if (state.activeTab !== "all") state.activeTab = "mod2";
        } else if (openKey.startsWith("hybind-")) {
          state.activeNavHighlight = "mod3";
          if (state.activeTab !== "all") state.activeTab = "mod3";
          state.productTab = "hybind";
        } else if (openKey.startsWith("fgaa-")) {
          state.activeNavHighlight = "mod3";
          if (state.activeTab !== "all") state.activeTab = "mod3";
          state.productTab = "fgaa";
        } else if (openKey.startsWith("account-")) {
          state.activeNavHighlight = "mod4";
          if (state.activeTab !== "all") state.activeTab = "mod4";
        } else if (openKey === "decision-map" || openKey === "trial-protocol") {
          state.activeNavHighlight = "mod5";
          if (state.activeTab !== "all") state.activeTab = "mod5";
        } else if (
          openKey.startsWith("phase-") ||
          ["monthly-kpi", "sample-protocol", "pdf-download", "contact"].includes(openKey)
        ) {
          state.activeNavHighlight = "mod6";
          if (state.activeTab !== "all") state.activeTab = "mod6";
        }
      }

      updateLangButtonStyles();
      renderAll();

      if (openKey) {
        triggerOpenViewByKey(openKey);
      }
    } finally {
      state.suppressUrlSync = false;
    }
  }

  function triggerOpenViewByKey(openKey) {
    if (!openKey) return;
    if (openKey === "synergy") return window.openRegionalModal();
    if (openKey.startsWith("pillar-")) {
      const idx = parseInt(openKey.replace("pillar-", ""), 10);
      return window.openPillarModal(idx);
    }
    if (openKey === "rtm") return window.openRtmDrawer();
    if (openKey === "principals") return window.openPortfolioDrawer();
    if (openKey === "hybind-compare") return window.openHybindCompareModal();
    if (openKey === "fgaa-compare") return window.openFgaaCompareModal();
    if (openKey === "hybind-questions") return window.openHybindQuestionsModal();
    if (openKey === "fgaa-questions") return window.openFgaaQuestionsModal();
    if (openKey.startsWith("hybind-app-")) {
      state.productTab = "hybind";
      const idx = parseInt(openKey.replace("hybind-app-", ""), 10);
      return window.openProductAppModal(idx);
    }
    if (openKey.startsWith("fgaa-app-")) {
      state.productTab = "fgaa";
      const idx = parseInt(openKey.replace("fgaa-app-", ""), 10);
      return window.openProductAppModal(idx);
    }
    if (openKey.startsWith("account-")) {
      const accId = openKey.replace("account-", "");
      return window.openAccountModal(accId);
    }
    if (openKey === "decision-map") return window.openDecisionMapModal();
    if (openKey === "trial-protocol") return window.openTrialProtocolModal();
    if (openKey.startsWith("phase-")) {
      const idx = parseInt(openKey.replace("phase-", ""), 10);
      return window.openPhaseModal(idx);
    }
    if (openKey === "monthly-kpi") return window.openMonthlyKpiModal();
    if (openKey === "sample-protocol") return window.openSampleProtocolModal();
    if (openKey === "pdf-download") return window.openDownloadPdfModal();
    if (openKey === "contact") return window.openContactModal();
  }

  function parseInitialLocation() {
    let raw = "";
    if (window.location.hash && window.location.hash.length > 1) {
      raw = window.location.hash.substring(1);
    } else {
      raw = window.location.pathname + window.location.search;
    }
    applyUrlString(raw);
    syncUrlState(false);
  }

  // ==========================================================================
  // 1. READER DISPLAY CONTROLS: LIGHT/DARK THEME & FONT SCALING (A- / A+)
  // ==========================================================================
  function applyThemeAndFont() {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute("data-theme", state.theme);
    if (state.theme === "dark") {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }

    const scaleKey = FONT_SCALES[state.fontScaleIndex] || "md";
    htmlEl.setAttribute("data-font-scale", scaleKey);

    const iconEl = document.getElementById("theme-toggle-icon");
    if (iconEl) iconEl.textContent = state.theme === "dark" ? "☀️" : "🌙";

    const fontInd = document.getElementById("font-scale-indicator");
    if (fontInd) fontInd.textContent = FONT_LABELS[scaleKey];
  }

  window.toggleTheme = function () {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("bjc_cj_theme", state.theme);
    applyThemeAndFont();
  };

  window.changeFontScale = function (delta) {
    const next = Math.max(0, Math.min(FONT_SCALES.length - 1, state.fontScaleIndex + delta));
    state.fontScaleIndex = next;
    localStorage.setItem("bjc_cj_font_idx", String(next));
    applyThemeAndFont();
  };

  window.resetFontScale = function () {
    state.fontScaleIndex = 1;
    localStorage.setItem("bjc_cj_font_idx", "1");
    applyThemeAndFont();
  };

  // ==========================================================================
  // 2. SECURITY & ANTI-COPY PROTECTION SUITE
  // ==========================================================================
  function initSecuritySuite() {
    const wmContainer = document.getElementById("watermark-layer");
    if (wmContainer) {
      let html = "";
      for (let i = 0; i < 36; i++) {
        html += `<div class="watermark-item">${window.APP_DATA.meta.watermark}</div>`;
      }
      wmContainer.innerHTML = html;
    }

    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      showSecurityToast();
    });

    ["copy", "cut", "dragstart"].forEach((evt) => {
      document.addEventListener(evt, function (e) {
        if (e.target && e.target.getAttribute("data-allow-copy") === "true") return;
        e.preventDefault();
        showSecurityToast();
      });
    });

    document.addEventListener("keydown", function (e) {
      const key = (e.key || "").toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (
        e.key === "F12" ||
        (isCtrlOrCmd && ["c", "u", "s", "p"].includes(key)) ||
        (isCtrlOrCmd && e.shiftKey && ["i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast();
        return false;
      }

      if (e.key === "Escape") {
        closeModal();
        closeDrawer();
      }

      const modalOpen = !document.getElementById("app-modal-backdrop").classList.contains("hidden");
      const drawerOpen = !document.getElementById("app-drawer-backdrop").classList.contains("hidden");
      if (state.authenticated && !modalOpen && !drawerOpen && state.activeTab !== "all") {
        if (e.key === "ArrowRight") stepSlide(1);
        if (e.key === "ArrowLeft") stepSlide(-1);
      }
    });
  }

  let toastTimer = null;
  function showSecurityToast() {
    const toast = document.getElementById("security-toast");
    const toastText = document.getElementById("security-toast-text");
    if (!toast || !toastText) return;
    toastText.textContent = t().securityToast;
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
      toast.classList.remove("opacity-100", "translate-y-0");
    }, 2200);
  }

  // ==========================================================================
  // 3. GATEKEEPER PASSWORD AUTHENTICATION ("BjcCj2026")
  // ==========================================================================
  function renderGatekeeper() {
    const gk = t().gatekeeper;
    document.getElementById("gk-badge").textContent = gk.badge;
    document.getElementById("gk-title").textContent = gk.title;
    document.getElementById("gk-subtitle").textContent = gk.subtitle;
    document.getElementById("gk-meta").textContent = gk.meta;
    const input = document.getElementById("gk-password-input");
    if (input) input.placeholder = gk.placeholder;
    document.getElementById("gk-unlock-btn-text").textContent = gk.unlockBtn;
    document.getElementById("gk-security-note").textContent = gk.securityNote;

    if (state.authenticated) {
      const overlay = document.getElementById("gatekeeper-overlay");
      if (overlay) overlay.classList.add("hidden", "opacity-0", "pointer-events-none");
    }
  }

  window.handleGatekeeperSubmit = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById("gk-password-input");
    const card = document.getElementById("gk-card");
    const errEl = document.getElementById("gk-error-msg");
    const val = (input ? input.value : "").trim();

    if (val === PASSCODE) {
      state.authenticated = true;
      sessionStorage.setItem("bjc_cj_unlocked_v2", "1");
      errEl.classList.add("hidden");
      const overlay = document.getElementById("gatekeeper-overlay");
      overlay.classList.add("opacity-0", "pointer-events-none");
      setTimeout(() => {
        overlay.classList.add("hidden");
        animateKpiCounters();
      }, 350);
    } else {
      errEl.textContent = t().gatekeeper.errorMsg;
      errEl.classList.remove("hidden");
      card.classList.remove("animate-shake");
      void card.offsetWidth;
      card.classList.add("animate-shake");
      if (input) {
        input.value = "";
        input.focus();
      }
    }
  };

  window.lockPresentation = function () {
    state.authenticated = false;
    sessionStorage.removeItem("bjc_cj_unlocked_v2");
    const overlay = document.getElementById("gatekeeper-overlay");
    const input = document.getElementById("gk-password-input");
    const errEl = document.getElementById("gk-error-msg");
    if (errEl) errEl.classList.add("hidden");
    if (input) input.value = "";
    overlay.classList.remove("hidden");
    setTimeout(() => {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      if (input) input.focus();
    }, 20);
  };

  window.togglePasswordVisibility = function () {
    const input = document.getElementById("gk-password-input");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
  };

  // ==========================================================================
  // 4. LANGUAGE & SLIDE DECK NAVIGATION CONTROLLER
  // ==========================================================================
  function updateLangButtonStyles() {
    ["en", "vi", "ko"].forEach((l) => {
      const btns = document.querySelectorAll(`[data-lang-btn="${l}"]`);
      btns.forEach((b) => {
        if (l === state.lang) {
          b.className =
            "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white keep-white-text shadow-sm transition-all cursor-pointer";
        } else {
          b.className =
            "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer";
        }
      });
    });
  }

  window.setLanguage = function (lang) {
    if (!["en", "vi", "ko"].includes(lang)) return;
    state.lang = lang;
    updateLangButtonStyles();
    renderAll();
    if (state.openView) {
      triggerOpenViewByKey(state.openView);
    }
    syncUrlState(false);
  };

  window.selectNavModule = function (modId) {
    closeModal(true);
    closeDrawer(true);
    if (modId === "all") {
      state.activeTab = state.activeTab === "all" ? state.activeNavHighlight : "all";
    } else {
      state.activeNavHighlight = modId;
      if (state.activeTab !== "all") {
        state.activeTab = modId;
      } else {
        const target = document.getElementById(`section-${modId}`);
        if (target) {
          const y = target.getBoundingClientRect().top + window.pageYOffset - 105;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
    renderModuleVisibility();
    renderNavBar();
    syncUrlState(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (modId === "mod2" || state.activeTab === "all") setTimeout(animateKpiCounters, 80);
  };

  window.stepSlide = function (delta) {
    closeModal(true);
    closeDrawer(true);
    const idx = MOD_LIST.indexOf(state.activeNavHighlight);
    const nextIdx = (idx + delta + MOD_LIST.length) % MOD_LIST.length;
    const nextMod = MOD_LIST[nextIdx];
    state.activeTab = nextMod;
    state.activeNavHighlight = nextMod;
    renderModuleVisibility();
    renderNavBar();
    syncUrlState(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (nextMod === "mod2") setTimeout(animateKpiCounters, 80);
  };

  function renderModuleVisibility() {
    MOD_LIST.forEach((m) => {
      const el = document.getElementById(`section-${m}`);
      if (!el) return;
      if (state.activeTab === "all" || state.activeTab === m) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  function renderNavBar() {
    const nav = t().nav;
    const u = ui();
    const curIdx = MOD_LIST.indexOf(state.activeNavHighlight);
    const tabIcons = ["🎯", "🏢", "🧬", "🗺️", "📈", "🚀"];

    const headerBadge = document.getElementById("header-meeting-badge");
    if (headerBadge) {
      headerBadge.textContent = u.headerMeetingBadge;
    }

    // Desktop Dedicated Second-Row 6-Column Tabs (Never overlaps or clips)
    const tabsContainer = document.getElementById("nav-tabs-container");
    if (tabsContainer) {
      tabsContainer.innerHTML = nav.tabs
        .map((tab, i) => {
          const isActive = state.activeNavHighlight === tab.id;
          return `
            <button onclick="selectNavModule('${tab.id}')"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 truncate ${
                isActive
                  ? "bg-emerald-600 text-white keep-white-text shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }">
              <span class="shrink-0">${tabIcons[i]}</span>
              <span class="truncate">${tab.code}. ${tab.label}</span>
            </button>
          `;
        })
        .join("");
    }

    // Mobile Bottom Bar (iPhone / Android / iPad)
    const mobileNav = document.getElementById("mobile-bottom-nav");
    if (mobileNav) {
      mobileNav.innerHTML = `
        <div class="grid grid-cols-6 gap-1 max-w-lg mx-auto">
          ${nav.tabs
            .map((tab, i) => {
              const isActive = state.activeNavHighlight === tab.id;
              return `
                <button onclick="selectNavModule('${tab.id}')"
                  class="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white keep-white-text font-extrabold shadow"
                      : "text-slate-400 hover:text-white"
                  }">
                  <span class="text-xs">${tabIcons[i]}</span>
                  <span class="text-[10px] font-mono font-bold">${tab.code}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    }

    // Minimalist Top Progress Bar
    const deckBar = document.getElementById("deck-control-bar");
    if (deckBar) {
      const currentTabObj = nav.tabs[curIdx] || nav.tabs[0];
      deckBar.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
            ${curIdx + 1} / 6
          </span>
          <span class="text-xs sm:text-sm font-bold text-slate-300">${tabIcons[curIdx]} ${currentTabObj.label}</span>
        </div>
        <button onclick="selectNavModule('all')"
          class="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-slate-200 cursor-pointer transition-all">
          ${state.activeTab === "all" ? u.slideMode : u.allMode}
        </button>
      `;
    }

    // Bottom Prev / Next Bar
    const footerNav = document.getElementById("deck-footer-nav");
    if (footerNav) {
      if (state.activeTab === "all") {
        footerNav.innerHTML = "";
      } else {
        const nextTabObj = nav.tabs[(curIdx + 1) % 6];
        footerNav.innerHTML = `
          <div class="flex items-center justify-between gap-3 glass-card rounded-2xl px-4 py-2.5">
            <button onclick="stepSlide(-1)"
              class="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer">
              ${u.prevSlide}
            </button>
            <div class="flex items-center gap-1.5">
              ${MOD_LIST.map(
                (m, i) => `
                <button onclick="selectNavModule('${m}')"
                  class="h-2 rounded-full transition-all cursor-pointer ${
                    i === curIdx ? "w-6 bg-emerald-400" : "w-2 bg-white/25"
                  }"></button>
              `
              ).join("")}
            </div>
            <button onclick="stepSlide(1)"
              class="keep-white-text px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow transition-all cursor-pointer">
              ${u.nextSlide} (${nextTabObj.code})
            </button>
          </div>
        `;
      }
    }
  }

  // ==========================================================================
  // 5. MODULE 1: VISUAL DIAGRAM EXECUTIVE HUB (ZERO LONG PARAGRAPHS)
  // ==========================================================================
  function renderModule1() {
    const m1 = t().mod1;
    const u = ui();
    const container = document.getElementById("section-mod1");
    if (!container) return;

    const pillarEmojis = ["🤝", "👥", "🔬", "🚚"];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <!-- Compact Top Badges -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            🎯 ${m1.eyebrow}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-slate-300">${m1.meetingTag}</span>
        </div>

        <h1 class="text-lg sm:text-2xl font-extrabold text-white leading-snug mb-5">
          ${m1.headline}
        </h1>

        <!-- VISUAL FLOW DIAGRAM: THAILAND -> VIETNAM -> 2027 LAUNCH (Click to open 4 Synergy Cards) -->
        <div onclick="openRegionalModal()"
          class="cursor-pointer rounded-2xl bg-slate-900/80 border border-emerald-500/40 hover:border-emerald-400 p-4 mb-5 transition-all group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-extrabold text-emerald-300 uppercase tracking-wide">⚡ ${u.synergyFlowTitle}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold group-hover:translate-x-0.5 transition-transform">${u.clickDetail}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
            <!-- Node 1: Thailand -->
            <div class="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-xl shrink-0">🇹🇭</div>
              <div class="min-w-0">
                <div class="text-[10px] font-bold text-blue-300 uppercase">${m1.bridge.thailandTag}</div>
                <div class="text-xs sm:text-sm font-extrabold text-white truncate">${m1.bridge.thailandTitle}</div>
              </div>
            </div>

            <!-- Node 2: Vietnam -->
            <div class="rounded-xl bg-emerald-950/60 border border-emerald-500/40 p-3 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xl shrink-0">🇻🇳</div>
              <div class="min-w-0">
                <div class="text-[10px] font-bold text-emerald-300 uppercase">${m1.bridge.vietnamTag}</div>
                <div class="text-xs sm:text-sm font-extrabold text-white truncate">${m1.bridge.vietnamTitle}</div>
              </div>
            </div>

            <!-- Node 3: 4 Strategic Pillars Trigger -->
            <div class="keep-white-text rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 p-3 flex items-center justify-between gap-2 text-white shadow-md">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">✨</span>
                <div>
                  <div class="text-[10px] font-bold uppercase opacity-90">${u.valuePillarsTag}</div>
                  <div class="text-xs sm:text-sm font-extrabold">HYBIND & FGAA</div>
                </div>
              </div>
              <span class="text-sm font-bold">→</span>
            </div>
          </div>
        </div>

        <!-- 4 Ultra-Compact Icon Cards (Click any card to reveal details) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          ${m1.pillars
            .map(
              (p, idx) => `
            <div onclick="openPillarModal(${idx})"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all group flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2.5">
                  <span class="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    ${pillarEmojis[idx] || "✨"}
                  </span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">${p.tag}</span>
                </div>
                <h3 class="text-xs sm:text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">${p.title}</h3>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[11px] font-bold text-emerald-400">
                ${u.clickDetail}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  window.openPillarModal = function (idx) {
    const p = t().mod1.pillars[idx];
    if (!p) return;
    state.openView = `pillar-${idx}`;
    const emojis = ["🤝", "👥", "🔬", "🚚"];
    const html = `
      <div class="rounded-2xl bg-slate-800/90 border border-emerald-500/35 p-5 flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shrink-0">
          ${emojis[idx] || "✨"}
        </div>
        <div>
          <span class="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 mb-2">${p.tag}</span>
          <p class="text-sm sm:text-base text-white leading-relaxed">${p.desc}</p>
        </div>
      </div>
    `;
    openModal(p.title, t().mod1.eyebrow, html);
  };

  // Visual Icon & Accordion Modal for "Why Regional Partnership?" (No long text shown unless clicked!)
  window.openRegionalModal = function () {
    const rm = t().mod1.regionalModal;
    const u = ui();
    state.openView = "synergy";
    const cardIcons = ["🎯", "⚡", "🔬", "🏢"];

    const html = `
      <div class="space-y-3">
        <div class="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
          <span>💡</span>
          <span>${u.tapExpand}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${rm.items
            .map((item, idx) => {
              const tags = u.regVisualTags[idx] || [];
              const accId = `reg-acc-${idx}`;
              return `
                <div onclick="toggleVisualAccordion('${accId}')"
                  class="cursor-pointer rounded-2xl bg-slate-800/90 border border-white/15 hover:border-emerald-400/60 p-4 transition-all">
                  <div class="flex items-start justify-between gap-2 mb-2.5">
                    <div class="flex items-center gap-2.5">
                      <span class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-base flex items-center justify-center shrink-0">
                        ${cardIcons[idx]}
                      </span>
                      <div>
                        <span class="text-[10px] font-mono font-bold text-emerald-400">0${idx + 1}</span>
                        <h4 class="text-xs sm:text-sm font-extrabold text-white leading-snug">${item.title}</h4>
                      </div>
                    </div>
                    <span id="${accId}-icon" class="text-slate-400 transition-transform duration-200 shrink-0 mt-1">
                      ${getIcon("chevronDown", "w-4 h-4")}
                    </span>
                  </div>

                  <!-- Visual Icon Pills (Immediate scannable summary without long sentences) -->
                  <div class="flex flex-wrap gap-1.5">
                    ${tags
                      .map(
                        (tg) => `
                      <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-300">
                        ${tg}
                      </span>
                    `
                      )
                      .join("")}
                  </div>

                  <!-- Hidden Detail Paragraph (Revealed only when user clicks this card) -->
                  <div id="${accId}" class="hidden mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    ${item.desc}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
    openModal(rm.title, rm.subtitle, html);
  };

  // ==========================================================================
  // 6. MODULE 2: VISUAL PLATFORM & SUPPLY CHAIN DIAGRAM (KPIs + 2 DRAWERS)
  // ==========================================================================
  function renderModule2() {
    const m2 = t().mod2;
    const u = ui();
    const container = document.getElementById("section-mod2");
    if (!container) return;

    const kpiIcons = ["🏛️", "📍", "🤝", "🌐"];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <div class="mb-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30 mb-1.5">
            🏢 ${m2.eyebrow}
          </span>
          <h2 class="text-lg sm:text-2xl font-extrabold text-white">${m2.headline}</h2>
        </div>

        <!-- 4 Visual KPI Cards (Click any KPI to open Drawer) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          ${m2.kpis
            .map(
              (kpi, idx) => `
            <div onclick="${idx < 2 ? "openRtmDrawer()" : "openPortfolioDrawer()"}"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all group">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xl">${kpiIcons[idx]}</span>
                <span class="text-[10px] font-bold text-emerald-400">${u.clickDetail}</span>
              </div>
              <div class="text-xl sm:text-2xl font-extrabold text-emerald-300">
                <span>${kpi.prefix}</span><span class="kpi-counter" data-target="${kpi.value}">${kpi.value}</span><span>${kpi.suffix}</span>
              </div>
              <div class="text-xs font-bold text-white mt-0.5">${kpi.label}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Visual 4-Node Supply Chain & Technical Flowchart -->
        <div class="rounded-2xl bg-slate-900/75 border border-white/10 p-4 mb-5">
          <div class="text-[11px] font-bold uppercase text-slate-400 mb-2.5">⚡ ${u.supplyFlowTitle}</div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${u.flowNodes
              .map(
                (fn, i) => `
              <div onclick="${i < 3 ? "openRtmDrawer()" : "openPortfolioDrawer()"}"
                class="cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 flex items-center gap-2.5 transition-all">
                <span class="text-2xl shrink-0">${fn.icon}</span>
                <div class="min-w-0">
                  <div class="text-xs font-extrabold text-white truncate">${fn.title}</div>
                  <div class="text-[10px] text-emerald-300 truncate">${fn.sub}</div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- 2 Clean Interactive Drawer Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onclick="openRtmDrawer()"
            class="text-left rounded-2xl bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 p-4 flex items-center justify-between gap-3 group transition-all cursor-pointer">
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-10 h-10 rounded-xl bg-emerald-500/20 text-xl flex items-center justify-center shrink-0">🚚</span>
              <div class="min-w-0">
                <div class="text-xs sm:text-sm font-extrabold text-white truncate">${m2.drawers.rtmBtn}</div>
                <div class="text-[11px] text-emerald-300">${u.clickDetail}</div>
              </div>
            </div>
            <span class="text-emerald-300 shrink-0">${getIcon("arrowRight", "w-4 h-4")}</span>
          </button>

          <button onclick="openPortfolioDrawer()"
            class="text-left rounded-2xl bg-blue-950/50 border border-blue-500/40 hover:border-blue-400 p-4 flex items-center justify-between gap-3 group transition-all cursor-pointer">
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-10 h-10 rounded-xl bg-blue-500/20 text-xl flex items-center justify-center shrink-0">🌐</span>
              <div class="min-w-0">
                <div class="text-xs sm:text-sm font-extrabold text-white truncate">${m2.drawers.portfolioBtn}</div>
                <div class="text-[11px] text-blue-300">${u.clickDetail}</div>
              </div>
            </div>
            <span class="text-blue-300 shrink-0">${getIcon("arrowRight", "w-4 h-4")}</span>
          </button>
        </div>
      </div>
    `;
  }

  // Visual Accordion Drawer for Route-to-Market (Click each section to expand)
  window.openRtmDrawer = function () {
    const d = t().mod2.rtmDrawer;
    const u = ui();
    state.openView = "rtm";
    const secIcons = ["📦", "🔬", "⚖️"];

    const html = `
      <div class="space-y-3">
        <div class="text-xs font-semibold text-emerald-300 mb-1">💡 ${u.tapExpand}</div>
        ${d.sections
          .map((s, idx) => {
            const accId = `rtm-sec-${idx}`;
            return `
              <div onclick="toggleVisualAccordion('${accId}')"
                class="cursor-pointer rounded-2xl bg-slate-800/90 border border-white/15 hover:border-emerald-400/50 p-4 transition-all">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <span class="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg shrink-0">${secIcons[idx] || "📌"}</span>
                    <div>
                      <span class="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mb-0.5">${s.badge}</span>
                      <h4 class="text-xs sm:text-sm font-extrabold text-white">${s.title}</h4>
                    </div>
                  </div>
                  <span id="${accId}-icon" class="text-slate-400 transition-transform duration-200 shrink-0">
                    ${getIcon("chevronDown", "w-4 h-4")}
                  </span>
                </div>
                <ul id="${accId}" class="${idx === 0 ? "" : "hidden"} mt-3 pt-3 border-t border-white/10 space-y-2">
                  ${s.bullets
                    .map(
                      (b) => `
                    <li class="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                      <span class="text-emerald-400 mt-0.5 shrink-0">✓</span>
                      <span>${b}</span>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
    openDrawer(d.title, d.subtitle, html);
  };

  window.openPortfolioDrawer = function () {
    const d = t().mod2.portfolioDrawer;
    state.openView = "principals";
    const segIcons = ["🥩", "💊", "🍜", "🧴"];

    const html = `
      <div class="space-y-4">
        <!-- Customer Segments Icon Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${d.customerSegments
            .map(
              (c, i) => `
            <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/35 p-3 flex items-start gap-2.5">
              <span class="text-lg shrink-0">${segIcons[i] || "🏢"}</span>
              <div>
                <div class="text-xs font-extrabold text-emerald-300">${c.seg}</div>
                <div class="text-xs text-white mt-0.5">${c.accts}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Global Principals Compact List -->
        <div class="space-y-2 pt-2 border-t border-white/10">
          ${d.principals
            .map(
              (p) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3">
              <div class="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                <span class="text-[10px] font-bold text-slate-400 uppercase">${p.category}</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300">${p.synergy}</span>
              </div>
              <div class="text-xs sm:text-sm font-extrabold text-white">${p.brands}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    openDrawer(d.title, d.subtitle, html);
  };

  function animateKpiCounters() {
    const counters = document.querySelectorAll(".kpi-counter");
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      if (isNaN(target)) return;
      const duration = 650;
      const startTime = performance.now();
      const startVal = target > 1000 ? 1995 : 0;

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(startVal + (target - startVal) * (1 - Math.pow(1 - progress, 3)));
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  // ==========================================================================
  // 7. MODULE 3: VISUAL PRODUCT PORTFOLIO (ICONS + CLICK-TO-REVEAL)
  // ==========================================================================
  window.switchProductTab = function (tab) {
    state.productTab = tab;
    renderModule3();
    syncUrlState(true);
  };

  function renderModule3() {
    const m3 = t().mod3;
    const u = ui();
    const container = document.getElementById("section-mod3");
    if (!container) return;

    const isHybind = state.productTab === "hybind";
    const prod = isHybind ? m3.hybind : m3.fgaa;
    const appEmojis = isHybind ? ["🌭", "🍗", "🦐", "🥟"] : ["🏃", "🥤", "💊", "🏥"];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <!-- Product Selector Tabs -->
        <div class="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/70 border border-white/10 mb-5">
          <button onclick="switchProductTab('hybind')"
            class="py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              isHybind
                ? "keep-white-text bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow"
                : "text-slate-300 hover:text-white"
            }">
            <span>🥩 TasteNrich® HYBIND</span>
            <span class="hidden sm:inline text-[10px] opacity-90">${u.hybindSubTag}</span>
          </button>

          <button onclick="switchProductTab('fgaa')"
            class="py-2.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              !isHybind
                ? "keep-white-text bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow"
                : "text-slate-300 hover:text-white"
            }">
            <span>⚡ AMINATURE® FGAA</span>
            <span class="hidden sm:inline text-[10px] opacity-90">${u.fgaaSubTag}</span>
          </button>
        </div>

        <!-- Compact Headline + Visual Tags -->
        <h2 class="text-lg sm:text-2xl font-extrabold text-white mb-3">${prod.headline}</h2>

        <div class="flex flex-wrap gap-1.5 mb-5">
          ${prod.tags
            .map(
              (tag) => `
            <span class="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/10 text-emerald-300 border border-white/15">
              ✓ ${tag}
            </span>
          `
            )
            .join("")}
        </div>

        <!-- 4 Compact Market Numbers -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
          ${prod.marketKpis
            .map(
              (mk) => `
            <div class="glass-subcard rounded-xl p-3">
              <div class="text-base sm:text-lg font-extrabold text-emerald-300">${mk.val}</div>
              <div class="text-[11px] text-slate-300 mt-0.5 line-clamp-1">${mk.lbl}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- 4 Icon Application Buttons (Click to open details) -->
        <div class="mb-5">
          <div class="text-xs font-bold text-slate-400 mb-2">${u.viewApps}</div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${prod.apps
              .map(
                (app, idx) => `
              <button onclick="openProductAppModal(${idx})"
                class="text-left glass-subcard rounded-xl p-3.5 hover:border-emerald-400 transition-all cursor-pointer flex items-center gap-3">
                <span class="text-2xl shrink-0">${appEmojis[idx] || "✨"}</span>
                <div class="min-w-0">
                  <div class="text-xs font-extrabold text-white truncate">${app.group}</div>
                  <div class="text-[10px] font-bold text-emerald-400 mt-0.5">${u.clickDetail}</div>
                </div>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- 2 Primary Modal Triggers -->
        <div class="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
          <button onclick="${isHybind ? "openHybindCompareModal()" : "openFgaaCompareModal()"}"
            class="keep-white-text flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all cursor-pointer">
            <span>📊</span>
            <span>${prod.compareBtn}</span>
          </button>

          <button onclick="${isHybind ? "openHybindQuestionsModal()" : "openFgaaQuestionsModal()"}"
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer">
            <span>🔬</span>
            <span>${prod.questionsBtn}</span>
          </button>
        </div>
      </div>
    `;
  }

  window.openProductAppModal = function (idx) {
    const m3 = t().mod3;
    const isHybind = state.productTab === "hybind";
    const prod = isHybind ? m3.hybind : m3.fgaa;
    const app = prod.apps[idx];
    if (!app) return;
    state.openView = `${isHybind ? "hybind" : "fgaa"}-app-${idx}`;
    const appEmojis = isHybind ? ["🌭", "🍗", "🦐", "🥟"] : ["🏃", "🥤", "💊", "🏥"];
    const html = `
      <div class="rounded-2xl bg-slate-800/90 border border-emerald-500/35 p-5 flex items-start gap-3.5">
        <span class="text-3xl shrink-0">${appEmojis[idx] || "✨"}</span>
        <div>
          <div class="text-xs font-bold uppercase text-emerald-300 mb-1.5">${prod.title}</div>
          <p class="text-sm sm:text-base text-white leading-relaxed">${app.items}</p>
        </div>
      </div>
    `;
    openModal(app.group, prod.headline, html);
  };

  function buildComparisonTableHtml(modalData) {
    return `
      <div class="overflow-x-auto rounded-2xl border border-white/15">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-xs uppercase border-b border-white/15">
              <th class="p-3.5 font-extrabold bg-slate-800/95 text-white">${modalData.headers[0]}</th>
              <th class="p-3.5 font-extrabold bg-red-950/50 text-red-300">${modalData.headers[1]}</th>
              <th class="p-3.5 font-extrabold bg-amber-950/40 text-amber-300">${modalData.headers[2]}</th>
              <th class="p-3.5 font-extrabold keep-white-text bg-[#008A4B] text-white shadow-sm">✨ ${modalData.headers[3]}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10 text-xs sm:text-sm">
            ${modalData.rows
              .map(
                (r) => `
              <tr class="bg-slate-900/80">
                <td class="p-3.5 font-extrabold text-white">${r[0]}</td>
                <td class="p-3.5 text-slate-200">${r[1]}</td>
                <td class="p-3.5 text-slate-200">${r[2]}</td>
                <td class="p-3.5 font-bold text-emerald-200 bg-emerald-950/45">${r[3]}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  window.openHybindCompareModal = function () {
    const d = t().mod3.hybindCompareModal;
    state.openView = "hybind-compare";
    openModal(d.title, d.subtitle, buildComparisonTableHtml(d));
  };

  window.openFgaaCompareModal = function () {
    const d = t().mod3.fgaaCompareModal;
    state.openView = "fgaa-compare";
    openModal(d.title, d.subtitle, buildComparisonTableHtml(d));
  };

  function buildQuestionsModalHtml(d) {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${d.pains
            .map(
              (p) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3">
              <div class="text-xs font-bold uppercase text-amber-300 mb-1">⚡ ${p.area}</div>
              <div class="text-xs text-red-300 mb-1">⚠️ ${p.pain}</div>
              <div class="text-xs text-emerald-200">✓ ${p.response}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-2xl bg-slate-800/95 border border-emerald-500/30 p-3.5">
          <ul class="space-y-1.5">
            ${d.questions
              .map(
                (q) => `
              <li class="text-xs text-slate-200 flex items-start gap-2">
                <span class="text-emerald-400 font-bold">•</span>
                <span>${q}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;
  }

  window.openHybindQuestionsModal = function () {
    const d = t().mod3.hybindQuestionsModal;
    state.openView = "hybind-questions";
    openModal(d.title, d.subtitle, buildQuestionsModalHtml(d));
  };

  window.openFgaaQuestionsModal = function () {
    const d = t().mod3.fgaaQuestionsModal;
    state.openView = "fgaa-questions";
    openModal(d.title, d.subtitle, buildQuestionsModalHtml(d));
  };

  // ==========================================================================
  // 8. MODULE 4: ULTRA-COMPACT TARGET MARKET CARDS (100% LOCALIZED)
  // ==========================================================================
  window.setRegionFilter = function (reg) {
    state.regionFilter = reg;
    renderModule4();
    syncUrlState(false);
  };

  window.setCategoryFilter = function (cat) {
    state.categoryFilter = cat;
    renderModule4();
    syncUrlState(false);
  };

  function renderModule4() {
    const m4 = t().mod4;
    const u = ui();
    const container = document.getElementById("section-mod4");
    if (!container) return;

    const filtered = window.APP_DATA.accounts.filter((acc) => {
      const matchReg = state.regionFilter === "all" || acc.region === state.regionFilter;
      const matchCat = state.categoryFilter === "all" || acc.category === state.categoryFilter;
      return matchReg && matchCat;
    });

    const regButtons = [
      { id: "all", label: m4.filters.all },
      { id: "south", label: m4.filters.south },
      { id: "north", label: m4.filters.north },
      { id: "central", label: m4.filters.central }
    ];

    const catButtons = [
      { id: "all", label: m4.filters.catAll },
      { id: "meat", label: `🥩 ${m4.filters.catMeat}` },
      { id: "seafood", label: `🦐 ${m4.filters.catSeafood}` },
      { id: "fgaa", label: `💊 ${m4.filters.catFgaa}` }
    ];

    const catIconMap = { meat: "🥩", seafood: "🦐", fgaa: "💊" };

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 class="text-lg sm:text-2xl font-extrabold text-white">🗺️ ${m4.headline}</h2>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5 font-semibold text-emerald-300"><span class="w-2 h-2 rounded-full bg-emerald-400"></span>${u.bjcsCustomerLegend}</span>
            <span class="flex items-center gap-1.5 font-semibold text-amber-300"><span class="w-2 h-2 rounded-full bg-amber-400"></span>${u.targetLegend}</span>
          </div>
        </div>

        <!-- Compact Filters -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="flex flex-wrap gap-1.5">
            ${regButtons
              .map(
                (b) => `
              <button onclick="setRegionFilter('${b.id}')"
                class="px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  state.regionFilter === b.id
                    ? "keep-white-text bg-emerald-600 text-white shadow"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                }">
                ${b.label}
              </button>
            `
              )
              .join("")}
          </div>

          <div class="flex flex-wrap gap-1.5">
            ${catButtons
              .map(
                (c) => `
              <button onclick="setCategoryFilter('${c.id}')"
                class="px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  state.categoryFilter === c.id
                    ? "keep-white-text bg-blue-600 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                }">
                ${c.label}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Ultra-Clean Account Grid (Icon + Name + Localized Tag; tap for 4-box diagram) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${filtered
            .map((acc) => {
              const loc = acc[state.lang] || acc.en;
              const prodBadgeText = loc.productBadge || acc.productBadge;
              return `
                <div onclick="openAccountModal('${acc.id}')"
                  class="glass-subcard cursor-pointer rounded-2xl p-3.5 hover:border-emerald-400 transition-all flex items-center justify-between gap-3 group">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
                      ${catIconMap[acc.category] || "🏢"}
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full ${acc.isCustomer ? "bg-emerald-400" : "bg-amber-400"} shrink-0"></span>
                        <h3 class="text-xs sm:text-sm font-extrabold text-white truncate group-hover:text-emerald-300">${acc.name}</h3>
                      </div>
                      <div class="text-[11px] text-blue-300 font-semibold truncate mt-0.5">${prodBadgeText}</div>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-emerald-400 shrink-0">→</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  window.openAccountModal = function (accId) {
    const acc = window.APP_DATA.accounts.find((a) => a.id === accId);
    if (!acc) return;
    state.openView = `account-${accId}`;
    const loc = acc[state.lang] || acc.en;
    const lbl = t().mod4.modalLabels;
    const u = ui();
    const tierText = loc.tier || acc.tier;
    const prodBadgeText = loc.productBadge || acc.productBadge;
    const regBadgeText = loc.regionBadge || acc.regionBadge;

    const html = `
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
            ${acc.isCustomer ? u.activeCustomerBadge : u.priorityTargetBadge} · ${tierText}
          </span>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">
            ${prodBadgeText}
          </span>
        </div>

        <!-- 2x2 Visual Grid instead of stacked long text -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
            <div class="text-[11px] font-bold uppercase text-slate-400 mb-1">🎯 ${lbl.applications}</div>
            <p class="text-xs sm:text-sm text-white leading-relaxed">${loc.apps}</p>
          </div>

          <div class="rounded-xl bg-red-950/35 border border-red-500/30 p-3.5">
            <div class="text-[11px] font-bold uppercase text-red-300 mb-1">⚠️ ${lbl.painPoint}</div>
            <p class="text-xs sm:text-sm text-red-100 leading-relaxed">${loc.pain}</p>
          </div>

          <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/35 p-3.5">
            <div class="text-[11px] font-bold uppercase text-emerald-300 mb-1">💡 ${lbl.valueProp}</div>
            <p class="text-xs sm:text-sm text-emerald-100 leading-relaxed">${loc.value}</p>
          </div>

          <div class="rounded-xl bg-blue-950/45 border border-blue-500/35 p-3.5">
            <div class="text-[11px] font-bold uppercase text-blue-300 mb-1">🔑 ${lbl.ksf}</div>
            <p class="text-xs sm:text-sm text-blue-100 leading-relaxed">${loc.ksf}</p>
          </div>
        </div>
      </div>
    `;
    openModal(acc.name, regBadgeText, html);
  };

  // ==========================================================================
  // 9. MODULE 5: VISUAL ROI SIMULATOR + CLICK-TO-REVEAL STRATEGY MODALS
  // ==========================================================================
  window.applyCalcPreset = function (idx) {
    const preset = t().mod5.calc.presets[idx];
    if (!preset) return;
    state.calc.meatCost = preset.meatCost;
    state.calc.stppDose = preset.stppDose;
    state.calc.hybindDose = preset.hybindDose;
    state.calc.yieldGain = preset.yieldGain;
    renderModule5();
  };

  window.updateCalcSlider = function (field, value) {
    state.calc[field] = parseFloat(value);
    updateCalculatorOutputs();
  };

  function calculateRoiMetrics() {
    const c = state.calc;
    const extraMeatKg = 1000 * (c.yieldGain / 100);
    const grossYieldValue = extraMeatKg * c.meatCost;
    const stppCostPerTon = 1000 * (c.stppDose / 100) * c.stppPricePerKg;
    const hybindCostPerTon = 1000 * (c.hybindDose / 100) * c.hybindPricePerKg;
    const additiveCostDelta = hybindCostPerTon - stppCostPerTon;
    const netSavingsPerTon = grossYieldValue - additiveCostDelta;
    const annualNetBenefit = netSavingsPerTon * c.annualTons;
    return { extraMeatKg, grossYieldValue, additiveCostDelta, netSavingsPerTon, annualNetBenefit };
  }

  function updateCalculatorOutputs() {
    const c = state.calc;
    const u = ui();
    const res = calculateRoiMetrics();
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt("val-meatCost", `$${c.meatCost.toFixed(2)}/kg`);
    setTxt("val-stppDose", `${c.stppDose.toFixed(2)}%`);
    setTxt("val-hybindDose", `${c.hybindDose.toFixed(2)}%`);
    setTxt("val-yieldGain", `+${c.yieldGain.toFixed(1)}%`);

    setTxt("out-extra-meat", `+${res.extraMeatKg.toFixed(1)} kg`);
    setTxt("out-gross-yield", `+$${res.grossYieldValue.toFixed(2)}`);
    setTxt("out-additive-diff", `${res.additiveCostDelta >= 0 ? "+" : ""}$${res.additiveCostDelta.toFixed(2)}`);

    const netEl = document.getElementById("out-net-savings");
    if (netEl) {
      const sign = res.netSavingsPerTon >= 0 ? "+" : "";
      netEl.textContent = `${sign}$${res.netSavingsPerTon.toFixed(2)} ${u.perTonSuffix}`;
    }

    const annEl = document.getElementById("out-annual-roi");
    if (annEl) {
      const sign = res.annualNetBenefit >= 0 ? "+" : "";
      annEl.textContent = `${sign}$${Math.round(res.annualNetBenefit).toLocaleString()} ${u.perYearSuffix}`;
    }
  }

  function renderModule5() {
    const m5 = t().mod5;
    const u = ui();
    const container = document.getElementById("section-mod5");
    if (!container) return;

    const c = state.calc;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 class="text-lg sm:text-2xl font-extrabold text-white">📈 ${m5.calc.title}</h2>
          <div class="flex flex-wrap gap-1.5">
            ${m5.calc.presets
              .map(
                (p, idx) => `
              <button onclick="applyCalcPreset(${idx})"
                class="px-2.5 py-1 rounded-xl text-xs font-bold bg-white/10 hover:bg-emerald-500/20 text-emerald-300 border border-white/15 cursor-pointer transition-all">
                ${p.name}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Compact Sliders + Output Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-5">
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="glass-subcard rounded-xl p-3">
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-slate-200">${m5.calc.sliders.meatCost}</span>
                <span id="val-meatCost" class="text-emerald-300 font-mono">$${c.meatCost.toFixed(2)}/kg</span>
              </div>
              <input type="range" min="2.50" max="9.00" step="0.10" value="${c.meatCost}"
                oninput="updateCalcSlider('meatCost', this.value)"
                class="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="glass-subcard rounded-xl p-3">
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-slate-200">${m5.calc.sliders.stppDose}</span>
                <span id="val-stppDose" class="text-blue-300 font-mono">${c.stppDose.toFixed(2)}%</span>
              </div>
              <input type="range" min="0.15" max="0.60" step="0.05" value="${c.stppDose}"
                oninput="updateCalcSlider('stppDose', this.value)"
                class="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="glass-subcard rounded-xl p-3">
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-slate-200">${m5.calc.sliders.hybindDose}</span>
                <span id="val-hybindDose" class="text-amber-300 font-mono">${c.hybindDose.toFixed(2)}%</span>
              </div>
              <input type="range" min="0.15" max="0.65" step="0.05" value="${c.hybindDose}"
                oninput="updateCalcSlider('hybindDose', this.value)"
                class="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="rounded-xl bg-emerald-950/50 border border-emerald-500/40 p-3">
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-emerald-200">${m5.calc.sliders.yieldGain}</span>
                <span id="val-yieldGain" class="text-emerald-300 font-mono">+${c.yieldGain.toFixed(1)}%</span>
              </div>
              <input type="range" min="1.0" max="3.0" step="0.1" value="${c.yieldGain}"
                oninput="updateCalcSlider('yieldGain', this.value)"
                class="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>
          </div>

          <!-- Compact Real-Time Output Card -->
          <div class="lg:col-span-5 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/50 p-4">
            <div class="grid grid-cols-3 gap-2 text-center mb-3 pb-2.5 border-b border-white/10">
              <div>
                <div class="text-[10px] text-slate-400 uppercase">${u.extraMeatLbl}</div>
                <div id="out-extra-meat" class="text-xs font-bold font-mono text-white mt-0.5"></div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">${u.yieldValueLbl}</div>
                <div id="out-gross-yield" class="text-xs font-bold font-mono text-emerald-300 mt-0.5"></div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">${u.costDeltaLbl}</div>
                <div id="out-additive-diff" class="text-xs font-bold font-mono text-amber-300 mt-0.5"></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-[10px] font-bold uppercase text-slate-300">${m5.calc.outputs.netSavingsLabel}</div>
              <div id="out-net-savings" class="text-xl sm:text-2xl font-extrabold text-emerald-300 my-0.5"></div>
              <div class="text-xs text-slate-300">
                ${u.annualVolPrefix} <span id="out-annual-roi" class="font-bold font-mono text-emerald-300"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 Click-to-Reveal Visual Strategy Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
          <button onclick="openDecisionMapModal()"
            class="glass-subcard rounded-2xl p-3.5 text-left flex items-center justify-between hover:border-emerald-400 transition-all cursor-pointer">
            <div class="flex items-center gap-3">
              <span class="text-xl">👥</span>
              <div>
                <div class="text-xs sm:text-sm font-extrabold text-white">${u.viewDecisionMap}</div>
                <div class="text-[10px] text-emerald-400 font-bold">${u.clickDetail}</div>
              </div>
            </div>
            <span class="text-emerald-300">→</span>
          </button>

          <button onclick="openTrialProtocolModal()"
            class="glass-subcard rounded-2xl p-3.5 text-left flex items-center justify-between hover:border-blue-400 transition-all cursor-pointer">
            <div class="flex items-center gap-3">
              <span class="text-xl">🧪</span>
              <div>
                <div class="text-xs sm:text-sm font-extrabold text-white">${u.viewTrialProtocol}</div>
                <div class="text-[10px] text-blue-300 font-bold">${u.clickDetail}</div>
              </div>
            </div>
            <span class="text-blue-300">→</span>
          </button>
        </div>
      </div>
    `;

    updateCalculatorOutputs();
  }

  window.openDecisionMapModal = function () {
    const m = t().mod5.methodology;
    state.openView = "decision-map";
    const roleIcons = ["🔬", "📣", "💼", "🛡️"];
    const html = `
      <div class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${m.buyers
            .map(
              (b, i) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5 flex items-start gap-3">
              <span class="text-xl shrink-0">${roleIcons[i] || "👤"}</span>
              <div>
                <div class="text-xs font-extrabold text-emerald-300">${b.role}</div>
                <div class="text-xs text-slate-200 mt-1">${b.focus}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-xl bg-emerald-950/60 border border-emerald-500/35 p-3.5">
          <div class="text-[10px] font-bold uppercase text-emerald-300 mb-1">💬 ${m.spinLabel}</div>
          <p class="text-xs sm:text-sm italic text-white">${m.spinQuote}</p>
        </div>
      </div>
    `;
    openModal(m.buyersTitle, t().mod5.eyebrow, html);
  };

  window.openTrialProtocolModal = function () {
    const m = t().mod5.methodology;
    const u = ui();
    state.openView = "trial-protocol";
    const html = `
      <div class="space-y-4">
        <div>
          <div class="text-xs font-bold uppercase text-emerald-300 mb-2">${u.hybindFlowTitle}</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            ${m.hybindSteps
              .map(
                (s) => `
              <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/30 p-3 text-xs text-white leading-relaxed">${s}</div>
            `
              )
              .join("")}
          </div>
        </div>
        <div>
          <div class="text-xs font-bold uppercase text-blue-300 mb-2">${u.fgaaFlowTitle}</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            ${m.fgaaSteps
              .map(
                (s) => `
              <div class="rounded-xl bg-blue-950/45 border border-blue-500/30 p-3 text-xs text-white leading-relaxed">${s}</div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
    openModal(m.protocolsTitle, t().mod5.eyebrow, html);
  };

  // ==========================================================================
  // 10. MODULE 6: VISUAL GTM ROADMAP (4 PHASE ICONS + CLICK TO REVEAL)
  // ==========================================================================
  function renderModule6() {
    const m6 = t().mod6;
    const u = ui();
    const container = document.getElementById("section-mod6");
    if (!container) return;

    const phaseIcons = ["📋", "🌱", "🏭", "🚀"];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-7">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 class="text-lg sm:text-2xl font-extrabold text-white">🚀 ${m6.headline}</h2>
          <button onclick="openMonthlyKpiModal()"
            class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-emerald-300 cursor-pointer">
            📊 ${u.viewMonthlyKpi}
          </button>
        </div>

        <!-- 4 Visual Phase Cards (Click any phase to open its checklist) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          ${m6.phases
            .map(
              (p, idx) => `
            <div onclick="openPhaseModal(${idx})"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between gap-1 mb-2">
                  <span class="text-xl">${phaseIcons[idx]}</span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">${p.period}</span>
                </div>
                <div class="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">${p.name}</div>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[10px] font-bold text-emerald-400">
                ${u.clickPhaseHint}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Compact Executive Proposal CTA Box -->
        <div class="rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/45 p-4 sm:p-5 text-center">
          <h3 class="text-sm sm:text-lg font-extrabold text-white max-w-3xl mx-auto mb-3.5">
            ${m6.ctaBox.title}
          </h3>
          <div class="flex flex-wrap items-center justify-center gap-2.5">
            <button onclick="openSampleProtocolModal()"
              class="keep-white-text inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow cursor-pointer">
              <span>🧪</span>
              <span>${m6.ctaBox.btnSample}</span>
            </button>

            <button onclick="openDownloadPdfModal()"
              class="keep-white-text inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow cursor-pointer">
              <span>📄</span>
              <span>${m6.ctaBox.btnPdf}</span>
            </button>

            <button onclick="openContactModal()"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer">
              <span>🏢</span>
              <span>${m6.ctaBox.btnContact}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.openPhaseModal = function (idx) {
    const p = t().mod6.phases[idx];
    if (!p) return;
    state.openView = `phase-${idx}`;
    const html = `
      <div class="space-y-2.5">
        <div class="text-xs font-semibold text-blue-300">👥 ${p.owner}</div>
        <ul class="space-y-2">
          ${p.deliverables
            .map(
              (d) => `
            <li class="flex items-start gap-2.5 rounded-xl bg-slate-800/90 border border-white/10 p-3 text-xs sm:text-sm text-white">
              <span class="text-emerald-400 font-bold shrink-0">✓</span>
              <span>${d}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
    openModal(`${p.step}: ${p.name} (${p.period})`, p.summary, html);
  };

  window.openMonthlyKpiModal = function () {
    const m6 = t().mod6;
    state.openView = "monthly-kpi";
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${m6.reportingMetrics
          .map(
            (rm) => `
          <div class="rounded-xl bg-slate-800/90 border border-emerald-500/30 p-3.5 text-xs sm:text-sm font-bold text-emerald-300">
            ✓ ${rm}
          </div>
        `
          )
          .join("")}
      </div>
    `;
    openModal(m6.reportingTitle, t().mod6.eyebrow, html);
  };

  window.openSampleProtocolModal = function () {
    state.openView = "sample-protocol";
    const sm = ui().sampleModal;
    const html = `
      <div class="space-y-3.5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-emerald-300 mb-2">🥩 1. TasteNrich® HYBIND</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              ${sm.hybindBullets.map((b) => `<li>• ${b}</li>`).join("")}
            </ul>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-blue-300 mb-2">⚡ 2. AMINATURE® FGAA</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              ${sm.fgaaBullets.map((b) => `<li>• ${b}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="rounded-xl bg-emerald-950/50 border border-emerald-500/35 p-3.5 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-white font-semibold">${sm.footerOrg}</span>
          <span class="keep-white-text px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">
            ${sm.statusBadge}
          </span>
        </div>
      </div>
    `;
    openModal(sm.title, sm.subtitle, html);
  };

  window.openDownloadPdfModal = function () {
    state.openView = "pdf-download";
    const pm = ui().pdfModal;
    const html = `
      <div class="space-y-2.5">
        <a href="/151026-CJ_BIO_x_BJCS_Vietnam.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-emerald-500/40 p-3.5 flex items-center justify-between gap-3">
          <div>
            <div class="text-[10px] font-bold text-emerald-400">${pm.doc1Tag}</div>
            <div class="text-xs sm:text-sm font-bold text-white">${pm.doc1Title}</div>
          </div>
          <span class="keep-white-text px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0">PDF</span>
        </a>

        <a href="/TasteNrich_HYBIND_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5 flex items-center justify-between gap-3">
          <div>
            <div class="text-[10px] font-bold text-amber-400">${pm.doc2Tag}</div>
            <div class="text-xs sm:text-sm font-bold text-white">${pm.doc2Title}</div>
          </div>
          <span class="px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-xs shrink-0">PDF</span>
        </a>

        <a href="/FGAA_AMINATURE_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5 flex items-center justify-between gap-3">
          <div>
            <div class="text-[10px] font-bold text-blue-400">${pm.doc3Tag}</div>
            <div class="text-xs sm:text-sm font-bold text-white">${pm.doc3Title}</div>
          </div>
          <span class="px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-xs shrink-0">PDF</span>
        </a>
      </div>
    `;
    openModal(pm.title, pm.subtitle, html);
  };

  window.openContactModal = function () {
    state.openView = "contact";
    const cm = ui().contactModal;
    const html = `
      <div class="space-y-3">
        <div class="rounded-2xl bg-emerald-950/50 border border-emerald-500/40 p-4">
          <div class="text-base sm:text-lg font-extrabold text-white">${cm.title}</div>
          <div class="text-xs text-emerald-300 font-semibold mb-3">${cm.division}</div>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-200 font-bold">${cm.badge1}</span>
            <span class="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-200 font-bold">${cm.badge2}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
            <div class="text-xs font-bold text-emerald-400 mb-1">${cm.hcmTitle}</div>
            <p class="text-xs text-slate-200">${cm.hcmAddr}</p>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
            <div class="text-xs font-bold text-blue-400 mb-1">${cm.hnTitle}</div>
            <p class="text-xs text-slate-200">${cm.hnAddr}</p>
          </div>
        </div>
      </div>
    `;
    openModal(cm.title, cm.subtitle, html);
  };

  // ==========================================================================
  // 11. MODAL & SLIDE-OVER DRAWER CONTROLLERS
  // ==========================================================================
  window.openModal = function (title, subtitle, bodyHtml) {
    const backdrop = document.getElementById("app-modal-backdrop");
    document.getElementById("app-modal-title").textContent = title;
    document.getElementById("app-modal-subtitle").textContent = subtitle || "";
    document.getElementById("app-modal-body").innerHTML = bodyHtml;
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
    }, 10);
    syncUrlState(false);
  };

  window.closeModal = function (silent = false) {
    const backdrop = document.getElementById("app-modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.add("opacity-0");
    setTimeout(() => {
      backdrop.classList.add("hidden");
    }, 180);
    if (!silent && state.openView) {
      state.openView = null;
      syncUrlState(false);
    }
  };

  window.openDrawer = function (title, subtitle, bodyHtml) {
    const backdrop = document.getElementById("app-drawer-backdrop");
    const panel = document.getElementById("app-drawer-panel");
    document.getElementById("app-drawer-title").textContent = title;
    document.getElementById("app-drawer-subtitle").textContent = subtitle || "";
    document.getElementById("app-drawer-body").innerHTML = bodyHtml;
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      panel.classList.remove("translate-x-full");
    }, 10);
    syncUrlState(false);
  };

  window.closeDrawer = function (silent = false) {
    const backdrop = document.getElementById("app-drawer-backdrop");
    const panel = document.getElementById("app-drawer-panel");
    if (!backdrop || !panel) return;
    backdrop.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    setTimeout(() => {
      backdrop.classList.add("hidden");
    }, 220);
    if (!silent && state.openView) {
      state.openView = null;
      syncUrlState(false);
    }
  };

  // ==========================================================================
  // 12. MASTER RENDER & DEEP-LINK INITIALIZATION
  // ==========================================================================
  function renderAll() {
    applyThemeAndFont();
    renderGatekeeper();
    renderNavBar();
    renderModule1();
    renderModule2();
    renderModule3();
    renderModule4();
    renderModule5();
    renderModule6();
    renderModuleVisibility();
  }

  window.addEventListener("popstate", function () {
    closeModal(true);
    closeDrawer(true);
    state.openView = null;
    const raw =
      window.location.hash && window.location.hash.length > 1
        ? window.location.hash.substring(1)
        : window.location.pathname + window.location.search;
    applyUrlString(raw);
  });

  document.addEventListener("DOMContentLoaded", function () {
    initSecuritySuite();
    parseInitialLocation();
  });
})();
