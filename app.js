// ============================================================================
// COMPACT USER-CENTRIC APPLICATION CONTROLLER (CLICK-TO-REVEAL EDITION)
// BJC Specialties Vietnam (BJCS) x CJ BIO Executive Presentation
// ============================================================================

(function () {
  const PASSCODE = "BjcCj2026";
  const MOD_LIST = ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"];
  const FONT_SCALES = ["sm", "md", "lg", "xl"];
  const FONT_LABELS = { sm: "90%", md: "100%", lg: "112%", xl: "125%" };

  // Reactive Application State
  const state = {
    authenticated: false,
    lang: "vi", // Default to Vietnamese for immediate clarity, switchable to EN | VI | KO
    theme: localStorage.getItem("bjc_cj_theme") || "dark", // 'dark' | 'light'
    fontScaleIndex: parseInt(localStorage.getItem("bjc_cj_font_idx") || "1", 10), // 0:sm, 1:md, 2:lg, 3:xl
    activeTab: "mod1", // Focused slide-by-slide mode by default ('mod1'..'mod6' or 'all')
    activeNavHighlight: "mod1",
    productTab: "hybind", // 'hybind' | 'fgaa'
    regionFilter: "all", // 'all' | 'south' | 'north' | 'central'
    categoryFilter: "all", // 'all' | 'meat' | 'seafood' | 'fgaa'
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

  // Localized short UI labels for compact controls
  function ui() {
    const map = {
      en: {
        clickDetail: "Click for details →",
        prevSlide: "← Previous",
        nextSlide: "Next Module →",
        slideMode: "Slide Mode (Compact)",
        allMode: "Show All 6 Modules",
        lightMode: "Light",
        darkMode: "Dark",
        viewApps: "Click any segment to view applications:",
        viewDecisionMap: "Decision Map & SPIN Question",
        viewTrialProtocol: "3-Stage Trial Protocol (HYBIND & FGAA)",
        viewMonthlyKpi: "5 Monthly Governance KPIs",
        clickPhaseHint: "Click to view deliverables →"
      },
      vi: {
        clickDetail: "Nhấn xem chi tiết →",
        prevSlide: "← Phần trước",
        nextSlide: "Phần tiếp →",
        slideMode: "Xem từng phần (Gọn)",
        allMode: "Xem cả 6 phần",
        lightMode: "Nền Sáng",
        darkMode: "Nền Tối",
        viewApps: "Nhấn vào từng nhóm để xem ứng dụng chi tiết:",
        viewDecisionMap: "Chân Dung Người Quyết Định & SPIN",
        viewTrialProtocol: "Quy Trình Thử Nghiệm 3 Bước",
        viewMonthlyKpi: "5 KPI Báo Cáo Hàng Tháng",
        clickPhaseHint: "Nhấn xem hạng mục →"
      },
      ko: {
        clickDetail: "클릭하여 상세 보기 →",
        prevSlide: "← 이전",
        nextSlide: "다음 모듈 →",
        slideMode: "슬라이드 모드 (요약)",
        allMode: "전체 모듈 보기",
        lightMode: "라이트",
        darkMode: "다크",
        viewApps: "세부 어플리케이션을 보려면 클릭하세요:",
        viewDecisionMap: "의사결정권자 맵 & SPIN 질문",
        viewTrialProtocol: "3단계 기술 검증 프로토콜",
        viewMonthlyKpi: "월간 보고 5대 핵심 KPI",
        clickPhaseHint: "세부 과제 보기 →"
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
      arrowRight: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`
    };
    return icons[name] || icons.sparkle;
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
    const lblEl = document.getElementById("theme-toggle-label");
    if (iconEl) iconEl.textContent = state.theme === "dark" ? "☀️" : "🌙";
    if (lblEl) lblEl.textContent = state.theme === "dark" ? ui().lightMode : ui().darkMode;

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

      // Keyboard arrow slide navigation when modal/drawer is closed
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
  }

  window.handleGatekeeperSubmit = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById("gk-password-input");
    const card = document.getElementById("gk-card");
    const errEl = document.getElementById("gk-error-msg");
    const val = (input ? input.value : "").trim();

    if (val === PASSCODE) {
      state.authenticated = true;
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
  window.setLanguage = function (lang) {
    if (!["en", "vi", "ko"].includes(lang)) return;
    state.lang = lang;
    ["en", "vi", "ko"].forEach((l) => {
      const btns = document.querySelectorAll(`[data-lang-btn="${l}"]`);
      btns.forEach((b) => {
        if (l === lang) {
          b.className = "px-2 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white keep-white-text shadow-sm transition-all cursor-pointer";
        } else {
          b.className = "px-2 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer";
        }
      });
    });
    renderAll();
  };

  window.selectNavModule = function (modId) {
    if (modId === "all") {
      state.activeTab = state.activeTab === "all" ? state.activeNavHighlight : "all";
    } else {
      state.activeNavHighlight = modId;
      if (state.activeTab !== "all") {
        state.activeTab = modId;
      } else {
        const target = document.getElementById(`section-${modId}`);
        if (target) {
          const y = target.getBoundingClientRect().top + window.pageYOffset - 75;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
    renderModuleVisibility();
    renderNavBar();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (modId === "mod2" || state.activeTab === "all") setTimeout(animateKpiCounters, 80);
  };

  window.stepSlide = function (delta) {
    const idx = MOD_LIST.indexOf(state.activeNavHighlight);
    const nextIdx = (idx + delta + MOD_LIST.length) % MOD_LIST.length;
    const nextMod = MOD_LIST[nextIdx];
    state.activeTab = nextMod;
    state.activeNavHighlight = nextMod;
    renderModuleVisibility();
    renderNavBar();
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

    // Desktop Top Tabs
    const tabsContainer = document.getElementById("nav-tabs-container");
    if (tabsContainer) {
      tabsContainer.innerHTML = nav.tabs
        .map((tab) => {
          const isActive = state.activeNavHighlight === tab.id;
          return `
            <button onclick="selectNavModule('${tab.id}')"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white keep-white-text shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }">
              ${tab.code}. ${tab.label}
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
            .map((tab) => {
              const isActive = state.activeNavHighlight === tab.id;
              return `
                <button onclick="selectNavModule('${tab.id}')"
                  class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white keep-white-text font-extrabold shadow"
                      : "text-slate-400 hover:text-white"
                  }">
                  <span class="text-[11px] font-mono font-bold">${tab.code}</span>
                  <span class="text-[10px] truncate max-w-full">${tab.label.split(" ")[0]}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    }

    // Top Deck Progress Bar
    const deckBar = document.getElementById("deck-control-bar");
    if (deckBar) {
      const currentTabObj = nav.tabs[curIdx] || nav.tabs[0];
      deckBar.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
            ${curIdx + 1} / 6
          </span>
          <span class="text-xs sm:text-sm font-bold text-slate-300">${currentTabObj.label}</span>
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
          <div class="flex items-center justify-between gap-3 glass-card rounded-2xl px-4 py-3">
            <button onclick="stepSlide(-1)"
              class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer">
              ${u.prevSlide}
            </button>
            <div class="hidden sm:flex items-center gap-1.5">
              ${MOD_LIST.map(
                (m, i) => `
                <button onclick="selectNavModule('${m}')"
                  class="h-2 rounded-full transition-all cursor-pointer ${
                    i === curIdx ? "w-7 bg-emerald-400" : "w-2 bg-white/25"
                  }"></button>
              `
              ).join("")}
            </div>
            <button onclick="stepSlide(1)"
              class="keep-white-text px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow transition-all cursor-pointer">
              ${u.nextSlide} (${nextTabObj.code})
            </button>
          </div>
        `;
      }
    }
  }

  // ==========================================================================
  // 5. MODULE 1: ULTRA-CONCISE EXECUTIVE HUB (CLICK TO REVEAL)
  // ==========================================================================
  function renderModule1() {
    const m1 = t().mod1;
    const u = ui();
    const container = document.getElementById("section-mod1");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        <!-- Compact Header -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            ${m1.eyebrow}
          </span>
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <span class="px-2.5 py-1 rounded-full bg-white/10 font-semibold text-slate-200">${m1.meetingTag}</span>
            <span class="px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30 font-semibold">${m1.presenterTag}</span>
          </div>
        </div>

        <h1 class="text-xl sm:text-3xl font-extrabold text-white leading-snug mb-2">
          ${m1.headline}
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mb-6 max-w-3xl">
          ${m1.proposalBannerText}
        </p>

        <!-- 4 Compact Click-to-Reveal Pillar Cards (No long text shown upfront!) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          ${m1.pillars
            .map(
              (p, idx) => `
            <div onclick="openPillarModal(${idx})"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all group flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    ${getIcon(p.icon, "w-5 h-5")}
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">${p.tag}</span>
                </div>
                <h3 class="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">${p.title}</h3>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[11px] font-bold text-emerald-400 flex items-center justify-between">
                <span>${u.clickDetail}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Compact Thailand -> Vietnam Synergy Strip -->
        <div class="rounded-2xl bg-slate-900/80 border border-emerald-500/35 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <!-- Thailand -->
            <div onclick="openRegionalModal()" class="cursor-pointer flex-1 rounded-xl bg-white/5 border border-white/10 p-3.5 hover:border-blue-400/50 transition-all">
              <div class="text-[10px] font-bold uppercase text-blue-300">${m1.bridge.thailandTag}</div>
              <div class="text-sm sm:text-base font-extrabold text-white mt-0.5">${m1.bridge.thailandTitle}</div>
            </div>

            <div class="hidden sm:flex items-center justify-center text-emerald-400 font-bold text-lg px-1">➔</div>

            <!-- Vietnam -->
            <div onclick="openRegionalModal()" class="cursor-pointer flex-1 rounded-xl bg-emerald-950/50 border border-emerald-500/40 p-3.5 hover:border-emerald-400 transition-all">
              <div class="text-[10px] font-bold uppercase text-emerald-300">${m1.bridge.vietnamTag}</div>
              <div class="text-sm sm:text-base font-extrabold text-white mt-0.5">${m1.bridge.vietnamTitle}</div>
            </div>
          </div>

          <button onclick="openRegionalModal()"
            class="keep-white-text px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2">
            ${getIcon("sparkle", "w-4 h-4")}
            <span>${m1.bridge.ctaBtn}</span>
          </button>
        </div>
      </div>
    `;
  }

  window.openPillarModal = function (idx) {
    const p = t().mod1.pillars[idx];
    if (!p) return;
    const html = `
      <div class="rounded-2xl bg-slate-800/90 border border-emerald-500/35 p-5">
        <span class="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 mb-3">${p.tag}</span>
        <p class="text-sm sm:text-base text-white leading-relaxed">${p.desc}</p>
      </div>
    `;
    openModal(p.title, t().mod1.eyebrow, html);
  };

  window.openRegionalModal = function () {
    const rm = t().mod1.regionalModal;
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        ${rm.items
          .map(
            (item) => `
          <div class="rounded-2xl bg-slate-800/90 border border-white/15 p-4">
            <div class="flex items-center gap-2.5 mb-2">
              <span class="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">${item.num}</span>
              <h4 class="text-sm sm:text-base font-bold text-white">${item.title}</h4>
            </div>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${item.desc}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    openModal(rm.title, rm.subtitle, html);
  };

  // ==========================================================================
  // 6. MODULE 2: COMPACT BJCS PLATFORM (KPIs + 2 CLICK DRAWERS)
  // ==========================================================================
  function renderModule2() {
    const m2 = t().mod2;
    const u = ui();
    const container = document.getElementById("section-mod2");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8">
        <div class="mb-5">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30 mb-2">
            ${m2.eyebrow}
          </span>
          <h2 class="text-xl sm:text-3xl font-extrabold text-white">${m2.headline}</h2>
        </div>

        <!-- 4 Compact KPI Cards (Click any KPI to open Drawer) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          ${m2.kpis
            .map(
              (kpi, idx) => `
            <div onclick="${idx < 2 ? "openRtmDrawer()" : "openPortfolioDrawer()"}"
              class="glass-subcard cursor-pointer rounded-2xl p-4 sm:p-5 hover:border-emerald-400 transition-all group">
              <div class="text-2xl sm:text-3xl font-extrabold text-emerald-300 mb-1">
                <span>${kpi.prefix}</span><span class="kpi-counter" data-target="${kpi.value}">${kpi.value}</span><span>${kpi.suffix}</span>
              </div>
              <div class="text-xs sm:text-sm font-bold text-white">${kpi.label}</div>
              <div class="text-[11px] text-emerald-400 font-semibold mt-2">${u.clickDetail}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- 2 Clean Interactive Drawer Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button onclick="openRtmDrawer()"
            class="text-left rounded-2xl bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 p-5 flex items-center justify-between gap-3 group transition-all cursor-pointer">
            <div>
              <div class="text-[10px] font-bold uppercase text-emerald-400 mb-1">CLICK TO VIEW</div>
              <div class="text-base sm:text-lg font-extrabold text-white">${m2.drawers.rtmBtn}</div>
              <div class="text-xs text-slate-300 mt-0.5 line-clamp-1">${m2.drawers.rtmSub}</div>
            </div>
            <span class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              ${getIcon("arrowRight", "w-5 h-5")}
            </span>
          </button>

          <button onclick="openPortfolioDrawer()"
            class="text-left rounded-2xl bg-blue-950/50 border border-blue-500/40 hover:border-blue-400 p-5 flex items-center justify-between gap-3 group transition-all cursor-pointer">
            <div>
              <div class="text-[10px] font-bold uppercase text-blue-400 mb-1">CLICK TO VIEW</div>
              <div class="text-base sm:text-lg font-extrabold text-white">${m2.drawers.portfolioBtn}</div>
              <div class="text-xs text-slate-300 mt-0.5 line-clamp-1">${m2.drawers.portfolioSub}</div>
            </div>
            <span class="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
              ${getIcon("arrowRight", "w-5 h-5")}
            </span>
          </button>
        </div>
      </div>
    `;
  }

  window.openRtmDrawer = function () {
    const d = t().mod2.rtmDrawer;
    const html = `
      <div class="space-y-4">
        ${d.sections
          .map(
            (s) => `
          <div class="rounded-2xl bg-slate-800/90 border border-white/15 p-4">
            <span class="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mb-1.5">${s.badge}</span>
            <h4 class="text-sm sm:text-base font-bold text-white mb-2">${s.title}</h4>
            <ul class="space-y-2">
              ${s.bullets
                .map(
                  (b) => `
                <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <span class="text-emerald-400 mt-0.5 shrink-0">${getIcon("check", "w-4 h-4")}</span>
                  <span>${b}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    openDrawer(d.title, d.subtitle, html);
  };

  window.openPortfolioDrawer = function () {
    const d = t().mod2.portfolioDrawer;
    const html = `
      <div class="space-y-5">
        <div class="space-y-2.5">
          ${d.principals
            .map(
              (p) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
              <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                <span class="text-[11px] font-bold text-slate-400 uppercase">${p.category}</span>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">${p.synergy}</span>
              </div>
              <div class="text-sm sm:text-base font-extrabold text-white">${p.brands}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="grid grid-cols-1 gap-2.5 pt-2 border-t border-white/10">
          ${d.customerSegments
            .map(
              (c) => `
            <div class="rounded-xl bg-blue-950/40 border border-blue-400/25 p-3.5">
              <div class="text-xs font-bold text-blue-300">${c.seg}</div>
              <div class="text-xs sm:text-sm font-semibold text-white mt-0.5">${c.accts}</div>
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
      const duration = 700;
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
  // 7. MODULE 3: COMPACT PRODUCT PORTFOLIO (CLICK FOR APPS & COMPARISONS)
  // ==========================================================================
  window.switchProductTab = function (tab) {
    state.productTab = tab;
    renderModule3();
  };

  function renderModule3() {
    const m3 = t().mod3;
    const u = ui();
    const container = document.getElementById("section-mod3");
    if (!container) return;

    const isHybind = state.productTab === "hybind";
    const prod = isHybind ? m3.hybind : m3.fgaa;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8">
        <!-- Product Selector Tabs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-slate-950/70 border border-white/10 mb-6">
          <button onclick="switchProductTab('hybind')"
            class="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              isHybind
                ? "keep-white-text bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow"
                : "text-slate-300 hover:text-white"
            }">
            <span>TasteNrich® HYBIND</span>
            <span class="text-[10px] opacity-85">Phosphate-Free</span>
          </button>

          <button onclick="switchProductTab('fgaa')"
            class="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              !isHybind
                ? "keep-white-text bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow"
                : "text-slate-300 hover:text-white"
            }">
            <span>AMINATURE® FGAA</span>
            <span class="text-[10px] opacity-85">L-Arg · L-Cit · L-His</span>
          </button>
        </div>

        <!-- Compact Product Summary -->
        <div class="mb-5">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-300 mb-2">
            ${prod.badge}
          </span>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white">${prod.headline}</h2>
        </div>

        <!-- Key Visual Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          ${prod.tags
            .map(
              (tag) => `
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-white/10 text-emerald-300 border border-white/15">
              ✓ ${tag}
            </span>
          `
            )
            .join("")}
        </div>

        <!-- 4 Compact Market Numbers -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
          ${prod.marketKpis
            .map(
              (mk) => `
            <div class="glass-subcard rounded-xl p-3.5">
              <div class="text-lg sm:text-xl font-extrabold text-emerald-300">${mk.val}</div>
              <div class="text-[11px] text-slate-300 mt-0.5 line-clamp-2">${mk.lbl}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- 4 Click-to-Reveal Application Segment Pills (Hides long text until clicked) -->
        <div class="mb-6">
          <div class="text-xs font-bold text-slate-400 mb-2">${u.viewApps}</div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${prod.apps
              .map(
                (app, idx) => `
              <button onclick="openProductAppModal(${idx})"
                class="text-left glass-subcard rounded-xl p-3.5 hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between">
                <div class="text-xs sm:text-sm font-extrabold text-white">${app.group}</div>
                <div class="text-[11px] font-bold text-emerald-400 mt-2">${u.clickDetail}</div>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- 2 Primary Modal Triggers -->
        <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <button onclick="${isHybind ? "openHybindCompareModal()" : "openFgaaCompareModal()"}"
            class="keep-white-text flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all cursor-pointer">
            ${getIcon("sparkle", "w-4 h-4")}
            <span>${prod.compareBtn}</span>
          </button>

          <button onclick="${isHybind ? "openHybindQuestionsModal()" : "openFgaaQuestionsModal()"}"
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer">
            ${getIcon("flask", "w-4 h-4")}
            <span>${prod.questionsBtn}</span>
          </button>
        </div>
      </div>
    `;
  }

  window.openProductAppModal = function (idx) {
    const m3 = t().mod3;
    const prod = state.productTab === "hybind" ? m3.hybind : m3.fgaa;
    const app = prod.apps[idx];
    if (!app) return;
    const html = `
      <div class="rounded-2xl bg-slate-800/90 border border-emerald-500/35 p-5">
        <div class="text-xs font-bold uppercase text-emerald-300 mb-2">${prod.title}</div>
        <p class="text-sm sm:text-base text-white leading-relaxed">${app.items}</p>
      </div>
    `;
    openModal(app.group, prod.headline, html);
  };

  function buildComparisonTableHtml(modalData) {
    return `
      <div class="overflow-x-auto rounded-2xl border border-white/15">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/95 text-xs uppercase text-slate-300 border-b border-white/15">
              <th class="p-3 font-bold">${modalData.headers[0]}</th>
              <th class="p-3 font-bold text-red-300">${modalData.headers[1]}</th>
              <th class="p-3 font-bold text-amber-200">${modalData.headers[2]}</th>
              <th class="p-3 font-bold bg-emerald-950/80 text-emerald-300">${modalData.headers[3]}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10 text-xs sm:text-sm">
            ${modalData.rows
              .map(
                (r) => `
              <tr class="bg-slate-900/70">
                <td class="p-3 font-bold text-white">${r[0]}</td>
                <td class="p-3 text-slate-300">${r[1]}</td>
                <td class="p-3 text-slate-300">${r[2]}</td>
                <td class="p-3 font-semibold text-emerald-200 bg-emerald-950/35">${r[3]}</td>
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
    openModal(d.title, d.subtitle, buildComparisonTableHtml(d));
  };

  window.openFgaaCompareModal = function () {
    const d = t().mod3.fgaaCompareModal;
    openModal(d.title, d.subtitle, buildComparisonTableHtml(d));
  };

  function buildQuestionsModalHtml(d) {
    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${d.pains
            .map(
              (p) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
              <div class="text-xs font-bold uppercase text-amber-300 mb-1">${p.area}</div>
              <div class="text-xs text-red-300 mb-1.5">• ${p.pain}</div>
              <div class="text-xs text-emerald-200">✓ ${p.response}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-2xl bg-slate-800/95 border border-emerald-500/30 p-4">
          <ul class="space-y-2">
            ${d.questions
              .map(
                (q) => `
              <li class="text-xs sm:text-sm text-slate-200 flex items-start gap-2">
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
    openModal(d.title, d.subtitle, buildQuestionsModalHtml(d));
  };

  window.openFgaaQuestionsModal = function () {
    const d = t().mod3.fgaaQuestionsModal;
    openModal(d.title, d.subtitle, buildQuestionsModalHtml(d));
  };

  // ==========================================================================
  // 8. MODULE 4: ULTRA-COMPACT TARGET MARKET CARDS (CLICK TO REVEAL)
  // ==========================================================================
  window.setRegionFilter = function (reg) {
    state.regionFilter = reg;
    renderModule4();
  };

  window.setCategoryFilter = function (cat) {
    state.categoryFilter = cat;
    renderModule4();
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
      { id: "south", label: "South" },
      { id: "north", label: "North" },
      { id: "central", label: "Central" }
    ];

    const catButtons = [
      { id: "all", label: m4.filters.catAll },
      { id: "meat", label: "HYBIND · Meat" },
      { id: "seafood", label: "HYBIND · Seafood" },
      { id: "fgaa", label: "AMINATURE® FGAA" }
    ];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-300 mb-1.5">
              ${m4.eyebrow}
            </span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white">${m4.headline}</h2>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5 font-semibold text-emerald-300"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>BJCS Customer</span>
            <span class="flex items-center gap-1.5 font-semibold text-amber-300"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>Target</span>
          </div>
        </div>

        <!-- Compact Filters -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div class="flex flex-wrap gap-1.5">
            ${regButtons
              .map(
                (b) => `
              <button onclick="setRegionFilter('${b.id}')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                class="px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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

        <!-- Ultra-Clean Account Grid (Only Name + Badge shown; click for details!) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${filtered
            .map(
              (acc) => `
            <div onclick="openAccountModal('${acc.id}')"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-bold ${
                    acc.isCustomer ? "text-emerald-300" : "text-amber-300"
                  }">
                    <span class="w-2 h-2 rounded-full ${acc.isCustomer ? "bg-emerald-400" : "bg-amber-400"}"></span>
                    ${acc.isCustomer ? "BJCS Customer" : "Target"}
                  </span>
                  <span class="text-[10px] font-mono text-slate-400">${acc.region.toUpperCase()}</span>
                </div>
                <h3 class="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  ${acc.name}
                </h3>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span class="text-blue-300 font-semibold truncate max-w-[60%]">${acc.productBadge}</span>
                <span class="text-emerald-400 font-bold shrink-0">${u.clickDetail}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  window.openAccountModal = function (accId) {
    const acc = window.APP_DATA.accounts.find((a) => a.id === accId);
    if (!acc) return;
    const loc = acc[state.lang] || acc.en;
    const lbl = t().mod4.modalLabels;

    const html = `
      <div class="space-y-3.5">
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
            ${acc.isCustomer ? "BJCS Active Customer" : "Priority Target"} · ${acc.tier}
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">
            ${acc.productBadge}
          </span>
        </div>

        <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
          <div class="text-[11px] font-bold uppercase text-slate-400 mb-1">${lbl.applications}</div>
          <p class="text-xs sm:text-sm text-white leading-relaxed">${loc.apps}</p>
        </div>

        <div class="rounded-xl bg-red-950/35 border border-red-500/30 p-3.5">
          <div class="text-[11px] font-bold uppercase text-red-300 mb-1">${lbl.painPoint}</div>
          <p class="text-xs sm:text-sm text-red-100 leading-relaxed">${loc.pain}</p>
        </div>

        <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/35 p-3.5">
          <div class="text-[11px] font-bold uppercase text-emerald-300 mb-1">${lbl.valueProp}</div>
          <p class="text-xs sm:text-sm text-emerald-100 leading-relaxed">${loc.value}</p>
        </div>

        <div class="rounded-xl bg-blue-950/45 border border-blue-500/35 p-3.5">
          <div class="text-[11px] font-bold uppercase text-blue-300 mb-1">${lbl.ksf}</div>
          <p class="text-xs sm:text-sm text-blue-100 leading-relaxed">${loc.ksf}</p>
        </div>
      </div>
    `;
    openModal(acc.name, acc.regionBadge, html);
  };

  // ==========================================================================
  // 9. MODULE 5: COMPACT ROI SIMULATOR + CLICK-TO-REVEAL STRATEGY MODALS
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
      netEl.textContent = `${sign}$${res.netSavingsPerTon.toFixed(2)} / Ton`;
    }

    const annEl = document.getElementById("out-annual-roi");
    if (annEl) {
      const sign = res.annualNetBenefit >= 0 ? "+" : "";
      annEl.textContent = `${sign}$${Math.round(res.annualNetBenefit).toLocaleString()} / Year`;
    }
  }

  function renderModule5() {
    const m5 = t().mod5;
    const u = ui();
    const container = document.getElementById("section-mod5");
    if (!container) return;

    const c = state.calc;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 mb-1.5">
              ${m5.eyebrow}
            </span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white">${m5.calc.title}</h2>
          </div>
          <!-- Quick Presets -->
          <div class="flex flex-wrap gap-1.5">
            ${m5.calc.presets
              .map(
                (p, idx) => `
              <button onclick="applyCalcPreset(${idx})"
                class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-emerald-500/20 text-emerald-300 border border-white/15 cursor-pointer transition-all">
                ${p.name}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Compact Sliders + Output Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center mb-6">
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="glass-subcard rounded-xl p-3.5">
              <div class="flex justify-between text-xs font-bold mb-2">
                <span class="text-slate-200">${m5.calc.sliders.meatCost}</span>
                <span id="val-meatCost" class="text-emerald-300 font-mono">$${c.meatCost.toFixed(2)}/kg</span>
              </div>
              <input type="range" min="2.50" max="9.00" step="0.10" value="${c.meatCost}"
                oninput="updateCalcSlider('meatCost', this.value)"
                class="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="glass-subcard rounded-xl p-3.5">
              <div class="flex justify-between text-xs font-bold mb-2">
                <span class="text-slate-200">${m5.calc.sliders.stppDose}</span>
                <span id="val-stppDose" class="text-blue-300 font-mono">${c.stppDose.toFixed(2)}%</span>
              </div>
              <input type="range" min="0.15" max="0.60" step="0.05" value="${c.stppDose}"
                oninput="updateCalcSlider('stppDose', this.value)"
                class="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="glass-subcard rounded-xl p-3.5">
              <div class="flex justify-between text-xs font-bold mb-2">
                <span class="text-slate-200">${m5.calc.sliders.hybindDose}</span>
                <span id="val-hybindDose" class="text-amber-300 font-mono">${c.hybindDose.toFixed(2)}%</span>
              </div>
              <input type="range" min="0.15" max="0.65" step="0.05" value="${c.hybindDose}"
                oninput="updateCalcSlider('hybindDose', this.value)"
                class="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>

            <div class="rounded-xl bg-emerald-950/50 border border-emerald-500/40 p-3.5">
              <div class="flex justify-between text-xs font-bold mb-2">
                <span class="text-emerald-200">${m5.calc.sliders.yieldGain}</span>
                <span id="val-yieldGain" class="text-emerald-300 font-mono">+${c.yieldGain.toFixed(1)}%</span>
              </div>
              <input type="range" min="1.0" max="3.0" step="0.1" value="${c.yieldGain}"
                oninput="updateCalcSlider('yieldGain', this.value)"
                class="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-700 rounded-lg" />
            </div>
          </div>

          <!-- Compact Real-Time Output Card -->
          <div class="lg:col-span-5 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/50 p-5">
            <div class="grid grid-cols-3 gap-2 text-center mb-4 pb-3 border-b border-white/10">
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Extra Meat</div>
                <div id="out-extra-meat" class="text-xs sm:text-sm font-bold font-mono text-white mt-0.5"></div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Yield Value</div>
                <div id="out-gross-yield" class="text-xs sm:text-sm font-bold font-mono text-emerald-300 mt-0.5"></div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Cost Delta</div>
                <div id="out-additive-diff" class="text-xs sm:text-sm font-bold font-mono text-amber-300 mt-0.5"></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-[11px] font-bold uppercase text-slate-300">${m5.calc.outputs.netSavingsLabel}</div>
              <div id="out-net-savings" class="text-2xl sm:text-3xl font-extrabold text-emerald-300 my-1"></div>
              <div class="text-xs text-slate-300">
                2,500 MT/yr: <span id="out-annual-roi" class="font-bold font-mono text-emerald-300"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 Click-to-Reveal Strategy Buttons (Replaces long text blocks) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <button onclick="openDecisionMapModal()"
            class="glass-subcard rounded-2xl p-4 text-left flex items-center justify-between hover:border-emerald-400 transition-all cursor-pointer">
            <div>
              <div class="text-xs sm:text-sm font-extrabold text-white">${u.viewDecisionMap}</div>
              <div class="text-[11px] text-emerald-400 font-bold mt-0.5">${u.clickDetail}</div>
            </div>
            <span class="text-emerald-300">${getIcon("users", "w-5 h-5")}</span>
          </button>

          <button onclick="openTrialProtocolModal()"
            class="glass-subcard rounded-2xl p-4 text-left flex items-center justify-between hover:border-blue-400 transition-all cursor-pointer">
            <div>
              <div class="text-xs sm:text-sm font-extrabold text-white">${u.viewTrialProtocol}</div>
              <div class="text-[11px] text-blue-300 font-bold mt-0.5">${u.clickDetail}</div>
            </div>
            <span class="text-blue-300">${getIcon("flask", "w-5 h-5")}</span>
          </button>
        </div>
      </div>
    `;

    updateCalculatorOutputs();
  }

  window.openDecisionMapModal = function () {
    const m = t().mod5.methodology;
    const html = `
      <div class="space-y-4">
        <div class="space-y-2.5">
          ${m.buyers
            .map(
              (b) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
              <div class="text-xs sm:text-sm font-bold text-emerald-300">${b.role}</div>
              <div class="text-xs sm:text-sm text-slate-200 mt-1">${b.focus}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-xl bg-emerald-950/60 border border-emerald-500/35 p-4">
          <div class="text-[11px] font-bold uppercase text-emerald-300 mb-1">${m.spinLabel}</div>
          <p class="text-xs sm:text-sm italic text-white">${m.spinQuote}</p>
        </div>
      </div>
    `;
    openModal(m.buyersTitle, t().mod5.eyebrow, html);
  };

  window.openTrialProtocolModal = function () {
    const m = t().mod5.methodology;
    const html = `
      <div class="space-y-5">
        <div>
          <div class="text-xs font-bold uppercase text-emerald-300 mb-2">TasteNrich® HYBIND — 3-Step Meat & Seafood Trial</div>
          <div class="space-y-2">
            ${m.hybindSteps
              .map(
                (s) => `
              <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/30 p-3 text-xs sm:text-sm text-white">${s}</div>
            `
              )
              .join("")}
          </div>
        </div>
        <div>
          <div class="text-xs font-bold uppercase text-blue-300 mb-2">AMINATURE® FGAA — 3-Step Co-Development</div>
          <div class="space-y-2">
            ${m.fgaaSteps
              .map(
                (s) => `
              <div class="rounded-xl bg-blue-950/45 border border-blue-500/30 p-3 text-xs sm:text-sm text-white">${s}</div>
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
  // 10. MODULE 6: COMPACT GTM ROADMAP (CLICK PHASE TO REVEAL DELIVERABLES)
  // ==========================================================================
  function renderModule6() {
    const m6 = t().mod6;
    const u = ui();
    const container = document.getElementById("section-mod6");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-5 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-300 mb-1.5">
              ${m6.eyebrow}
            </span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white">${m6.headline}</h2>
          </div>
          <button onclick="openMonthlyKpiModal()"
            class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-emerald-300 cursor-pointer">
            📊 ${u.viewMonthlyKpi}
          </button>
        </div>

        <!-- 4 Compact Phase Cards (Click any phase to open its deliverables modal) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          ${m6.phases
            .map(
              (p, idx) => `
            <div onclick="openPhaseModal(${idx})"
              class="glass-subcard cursor-pointer rounded-2xl p-4 hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between gap-1 mb-2">
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">${p.step}</span>
                  <span class="text-[11px] font-bold text-slate-400">${p.period}</span>
                </div>
                <div class="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">${p.name}</div>
              </div>
              <div class="mt-3 pt-2 border-t border-white/10 text-[11px] font-bold text-emerald-400">
                ${u.clickPhaseHint}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Compact Executive Proposal CTA Box -->
        <div class="rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/45 p-5 sm:p-6 text-center">
          <h3 class="text-base sm:text-xl font-extrabold text-white max-w-3xl mx-auto mb-4">
            ${m6.ctaBox.title}
          </h3>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button onclick="openSampleProtocolModal()"
              class="keep-white-text inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow cursor-pointer">
              ${getIcon("flask", "w-4 h-4")}
              <span>${m6.ctaBox.btnSample}</span>
            </button>

            <button onclick="openDownloadPdfModal()"
              class="keep-white-text inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow cursor-pointer">
              ${getIcon("sparkle", "w-4 h-4")}
              <span>${m6.ctaBox.btnPdf}</span>
            </button>

            <button onclick="openContactModal()"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer">
              ${getIcon("users", "w-4 h-4")}
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
    const html = `
      <div class="space-y-3">
        <div class="text-xs font-semibold text-blue-300">Owner: ${p.owner}</div>
        <ul class="space-y-2.5">
          ${p.deliverables
            .map(
              (d) => `
            <li class="flex items-start gap-2.5 rounded-xl bg-slate-800/90 border border-white/10 p-3.5 text-xs sm:text-sm text-white">
              <span class="text-emerald-400 mt-0.5 shrink-0">${getIcon("check", "w-4 h-4")}</span>
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
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${m6.reportingMetrics
          .map(
            (rm) => `
          <div class="rounded-xl bg-slate-800/90 border border-emerald-500/30 p-4 text-sm font-bold text-emerald-300">
            ✓ ${rm}
          </div>
        `
          )
          .join("")}
      </div>
    `;
    openModal(m6.reportingTitle, t().mod6.eyebrow, html);
  };

  // CTA Modals (Sample Protocol, PDF Downloads, Contact Team)
  window.openSampleProtocolModal = function () {
    const html = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-emerald-300 mb-2">1. TasteNrich® HYBIND</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              <li>• 5–10 kg Sample Kits for Meat & Seafood Trials</li>
              <li>• TDS, SDS, COA & VN Label Classification</li>
              <li>• Halal, Kosher, Non-GMO & FSSC 22000 Certs</li>
            </ul>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-blue-300 mb-2">2. AMINATURE® FGAA</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              <li>• L-Arginine, L-Citrulline & L-Histidine Samples</li>
              <li>• Full COA, TDS, MSDS for MOH Registration</li>
              <li>• Vegan Action, Halal, Kosher & Taste-Masking Guide</li>
            </ul>
          </div>
        </div>
        <div class="rounded-xl bg-emerald-950/50 border border-emerald-500/35 p-4 flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs text-white font-semibold">Nguyen Duc Duy Anh · BJC Specialties Vietnam (duyanh@bjc.co.th)</span>
          <a href="mailto:duyanh@bjc.co.th?subject=CJ%20BIO%20x%20BJCS%20Vietnam%20-%20Sample%20Protocol"
            class="keep-white-text px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs">
            Email Confirmation
          </a>
        </div>
      </div>
    `;
    openModal("Sample & Dossier Protocol", "By 30 October 2026 Onboarding Milestone", html);
  };

  window.openDownloadPdfModal = function () {
    const html = `
      <div class="space-y-3">
        <a href="151026-CJ_BIO_x_BJCS_Vietnam.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-emerald-500/40 p-4 flex items-center justify-between gap-3">
          <div>
            <div class="text-xs font-bold text-emerald-400">EXECUTIVE PRESENTATION (29 SLIDES · PDF)</div>
            <div class="text-sm sm:text-base font-bold text-white">151026-CJ_BIO_x_BJCS_Vietnam.pdf</div>
          </div>
          <span class="keep-white-text px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0">PDF</span>
        </a>

        <a href="TasteNrich_HYBIND_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-white/15 p-4 flex items-center justify-between gap-3">
          <div>
            <div class="text-xs font-bold text-amber-400">PRODUCT BRIEF 01</div>
            <div class="text-sm sm:text-base font-bold text-white">TasteNrich® HYBIND Strategy Brief (PDF)</div>
          </div>
          <span class="px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold text-xs shrink-0">PDF</span>
        </a>

        <a href="FGAA_AMINATURE_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
          class="rounded-xl bg-slate-800/90 border border-white/15 p-4 flex items-center justify-between gap-3">
          <div>
            <div class="text-xs font-bold text-blue-400">PRODUCT BRIEF 02</div>
            <div class="text-sm sm:text-base font-bold text-white">AMINATURE® FGAA Strategy Brief (PDF)</div>
          </div>
          <span class="px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold text-xs shrink-0">PDF</span>
        </a>
      </div>
    `;
    openModal("Download PDF Documents", "BJC Specialties Vietnam × CJ BIO (15 Oct 2026)", html);
  };

  window.openContactModal = function () {
    const html = `
      <div class="space-y-3.5">
        <div class="rounded-2xl bg-emerald-950/50 border border-emerald-500/40 p-4">
          <div class="text-lg font-extrabold text-white">Nguyen Duc Duy Anh</div>
          <div class="text-xs sm:text-sm text-emerald-300 font-semibold mb-3">BJC Specialties Vietnam</div>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="mailto:duyanh@bjc.co.th" class="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-200 font-bold">duyanh@bjc.co.th</a>
            <a href="tel:+84908095693" class="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-200 font-bold">(+84) 908 095 693</a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
            <div class="text-xs font-bold text-emerald-400 mb-1">TP.HCM Office</div>
            <p class="text-xs text-slate-200">MM Mega Market Office Complex, Lot B, An Phu – An Khanh, Ho Chi Minh City</p>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-3.5">
            <div class="text-xs font-bold text-blue-400 mb-1">Hanoi Office</div>
            <p class="text-xs text-slate-200">3rd Floor, Lobby A, Geleximco Building, 897 Giai Phong Street, Hanoi</p>
          </div>
        </div>
      </div>
    `;
    openModal("Contact BJC Specialties Vietnam", "15 October 2026 Partnership Session", html);
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
  };

  window.closeModal = function () {
    const backdrop = document.getElementById("app-modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.add("opacity-0");
    setTimeout(() => {
      backdrop.classList.add("hidden");
    }, 180);
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
  };

  window.closeDrawer = function () {
    const backdrop = document.getElementById("app-drawer-backdrop");
    const panel = document.getElementById("app-drawer-panel");
    if (!backdrop || !panel) return;
    backdrop.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    setTimeout(() => {
      backdrop.classList.add("hidden");
    }, 220);
  };

  // ==========================================================================
  // 12. MASTER RENDER
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

  document.addEventListener("DOMContentLoaded", function () {
    initSecuritySuite();
    setLanguage(state.lang);
  });
})();
