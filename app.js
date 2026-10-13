// ============================================================================
// APPLICATION CONTROLLER & INTERACTIVE UI ENGINE
// BJC Specialties Vietnam (BJCS) x CJ BIO Executive Presentation
// ============================================================================

(function () {
  const PASSCODE = "BjcCj2026";

  // Reactive Application State
  const state = {
    authenticated: false,
    lang: "en", // 'en' | 'vi' | 'ko'
    activeTab: "all", // 'all' | 'mod1' | 'mod2' | 'mod3' | 'mod4' | 'mod5' | 'mod6'
    activeNavHighlight: "mod1",
    productTab: "hybind", // 'hybind' | 'fgaa'
    regionFilter: "all", // 'all' | 'south' | 'north' | 'central'
    categoryFilter: "all", // 'all' | 'meat' | 'seafood' | 'fgaa'
    activeRoadmapStep: 0, // 0..3
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

  // Helper to get current language dictionary
  function t() {
    return window.APP_DATA.i18n[state.lang] || window.APP_DATA.i18n.en;
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
      lock: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>`,
      arrowRight: `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`
    };
    return icons[name] || icons.sparkle;
  }

  // ==========================================================================
  // 1. SECURITY & ANTI-COPY PROTECTION SUITE
  // ==========================================================================
  function initSecuritySuite() {
    // Build dynamic tilted watermark pattern
    const wmContainer = document.getElementById("watermark-layer");
    if (wmContainer) {
      let html = "";
      for (let i = 0; i < 42; i++) {
        html += `<div class="watermark-item">${window.APP_DATA.meta.watermark}</div>`;
      }
      wmContainer.innerHTML = html;
    }

    // Disable right-click context menu
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      showSecurityToast();
    });

    // Disable copy / cut / dragstart
    ["copy", "cut", "dragstart"].forEach((evt) => {
      document.addEventListener(evt, function (e) {
        if (e.target && e.target.getAttribute("data-allow-copy") === "true") return;
        e.preventDefault();
        showSecurityToast();
      });
    });

    // Disable key combinations: Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I/J/C
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

      // Close modal/drawer on Escape
      if (e.key === "Escape") {
        closeModal();
        closeDrawer();
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
    }, 2600);
  }

  // ==========================================================================
  // 2. GATEKEEPER PASSWORD AUTHENTICATION ("BjcCj2026")
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
      }, 400);
    } else {
      errEl.textContent = t().gatekeeper.errorMsg;
      errEl.classList.remove("hidden");
      card.classList.remove("animate-shake");
      void card.offsetWidth; // trigger reflow
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
  // 3. LANGUAGE & NAVIGATION CONTROLLER
  // ==========================================================================
  window.setLanguage = function (lang) {
    if (!["en", "vi", "ko"].includes(lang)) return;
    state.lang = lang;
    // Update language buttons active state
    ["en", "vi", "ko"].forEach((l) => {
      const btns = document.querySelectorAll(`[data-lang-btn="${l}"]`);
      btns.forEach((b) => {
        if (l === lang) {
          b.className = "px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-sm transition-all";
        } else {
          b.className = "px-2.5 py-1 rounded-md text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all";
        }
      });
    });
    renderAll();
  };

  window.selectNavModule = function (modId) {
    state.activeNavHighlight = modId;
    if (modId === "all") {
      state.activeTab = "all";
      renderModuleVisibility();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // If user is in focused single-module mode, switch tab; if in "all" mode, scroll smoothly to module
    if (state.activeTab !== "all") {
      state.activeTab = modId;
      renderModuleVisibility();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(`section-${modId}`);
      if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    renderNavBar();
    if (modId === "mod2") animateKpiCounters();
  };

  window.toggleFocusMode = function (modId) {
    if (state.activeTab === modId) {
      state.activeTab = "all";
    } else {
      state.activeTab = modId;
      state.activeNavHighlight = modId;
    }
    renderModuleVisibility();
    renderNavBar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function renderModuleVisibility() {
    const mods = ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"];
    mods.forEach((m) => {
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
    const tabsContainer = document.getElementById("nav-tabs-container");
    if (tabsContainer) {
      tabsContainer.innerHTML = nav.tabs
        .map((tab) => {
          const isActive = state.activeNavHighlight === tab.id;
          return `
            <button onclick="selectNavModule('${tab.id}')"
              class="group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              }">
              <span class="font-mono text-[11px] ${isActive ? "text-emerald-400 font-bold" : "text-slate-400 group-hover:text-emerald-400"}">[${tab.code}.</span>
              <span>${tab.label}]</span>
            </button>
          `;
        })
        .join("");
    }

    const lockText = document.getElementById("nav-lock-text");
    if (lockText) lockText.textContent = nav.lockBtn;
  }

  // ==========================================================================
  // 4. RENDER MODULE 1: EXECUTIVE HUB & REGIONAL SYNERGY
  // ==========================================================================
  function renderModule1() {
    const m1 = t().mod1;
    const container = document.getElementById("section-mod1");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-white/15">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Top Metadata Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ${m1.eyebrow}
          </span>
          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-medium">${m1.meetingTag}</span>
            <span class="px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/30 font-medium">${m1.presenterTag}</span>
          </div>
        </div>

        <!-- Executive Headline -->
        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          ${m1.headline}
        </h1>
        <p class="text-slate-300 text-base sm:text-lg max-w-4xl leading-relaxed mb-8">
          ${m1.subheadline}
        </p>

        <!-- 4 Executive Summary Pillars (Slide 2) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          ${m1.pillars
            .map(
              (p) => `
            <div class="glass-subcard rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400/40 transition-all group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    ${getIcon(p.icon, "w-5 h-5")}
                  </div>
                  <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">${p.tag}</span>
                </div>
                <h3 class="text-base font-bold text-white mb-2">${p.title}</h3>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${p.desc}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Core Synergy Bridge Card: Thailand -> Vietnam (Slide 5) -->
        <div class="rounded-2xl bg-gradient-to-r from-slate-900/90 via-emerald-950/50 to-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 mb-6">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                ${m1.bridge.title}
              </h2>
              <p class="text-xs sm:text-sm text-emerald-300/90 mt-1 font-medium">${m1.bridge.subtitle}</p>
            </div>
            <button onclick="openRegionalModal()"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer">
              ${getIcon("sparkle", "w-4 h-4")}
              <span>${m1.bridge.ctaBtn}</span>
              ${getIcon("arrowRight", "w-4 h-4")}
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            <!-- Thailand Today -->
            <div class="lg:col-span-5 rounded-xl bg-white/5 border border-white/15 p-5">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">${m1.bridge.thailandTag}</span>
                <span class="text-xs text-slate-400 font-mono">BJC × CJ BIO</span>
              </div>
              <div class="text-lg font-extrabold text-white mb-1.5">${m1.bridge.thailandTitle}</div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${m1.bridge.thailandDesc}</p>
            </div>

            <!-- Animated Bridge Arrow -->
            <div class="lg:col-span-1 flex flex-col items-center justify-center py-2">
              <div class="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
                ${getIcon("arrowRight", "w-5 h-5")}
              </div>
            </div>

            <!-- Vietnam Proposed -->
            <div class="lg:col-span-5 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/40 p-5 relative">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-emerald-500 text-slate-950">${m1.bridge.vietnamTag}</span>
                <span class="text-xs text-emerald-300 font-bold">Q4 2026 → 2027</span>
              </div>
              <div class="text-lg font-extrabold text-white mb-1.5">${m1.bridge.vietnamTitle}</div>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${m1.bridge.vietnamDesc}</p>
            </div>
          </div>
        </div>

        <!-- Proposal Summary Strip -->
        <div class="rounded-xl bg-emerald-950/70 border border-emerald-500/40 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start sm:items-center gap-3">
            <span class="px-3 py-1 rounded-md bg-emerald-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shrink-0">${m1.proposalBannerTitle}</span>
            <p class="text-xs sm:text-sm text-emerald-100 font-medium">${m1.proposalBannerText}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Modal for Module 1: Why Regional Partnership?
  window.openRegionalModal = function () {
    const rm = t().mod1.regionalModal;
    const html = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${rm.items
            .map(
              (item) => `
            <div class="rounded-2xl bg-slate-800/90 border border-white/15 p-5 hover:border-emerald-400/40 transition-all">
              <div class="flex items-center gap-3 mb-2.5">
                <span class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-sm font-bold flex items-center justify-center">${item.num}</span>
                <h4 class="text-base font-bold text-white">${item.title}</h4>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${item.desc}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-xl bg-blue-950/50 border border-blue-400/30 p-4 text-xs sm:text-sm text-blue-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <strong class="text-white">Bangkok Application Lab (~350 sqm):</strong> Thermomix · Industrial Mincer & Mixer · Hand Stuffing · Bakery & Savory Pilot Lines
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs">Ready for Joint CJ BIO × BJCS Trials</span>
        </div>
      </div>
    `;
    openModal(rm.title, rm.subtitle, html);
  };

  // ==========================================================================
  // 5. RENDER MODULE 2: BJCS VIETNAM PLATFORM & INFRASTRUCTURE
  // ==========================================================================
  function renderModule2() {
    const m2 = t().mod2;
    const container = document.getElementById("section-mod2");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-white/15">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30 mb-3">
            ${m2.eyebrow}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">${m2.headline}</h2>
          <p class="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl">${m2.subheadline}</p>
        </div>

        <!-- Animated KPI Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          ${m2.kpis
            .map(
              (kpi, idx) => `
            <div class="glass-subcard rounded-2xl p-6 border border-white/15 relative overflow-hidden group hover:border-emerald-400/50 transition-all">
              <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
              <div class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-blue-300 mb-2">
                <span>${kpi.prefix}</span><span class="kpi-counter" data-target="${kpi.value}">${kpi.value}</span><span>${kpi.suffix}</span>
              </div>
              <div class="text-sm sm:text-base font-bold text-white mb-1">${kpi.label}</div>
              <div class="text-xs text-slate-400">${kpi.sub}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Interactive Drill-Down Drawer Triggers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Button 1: Route to Market -->
          <div onclick="openRtmDrawer()"
            class="cursor-pointer rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900/90 border border-emerald-500/35 hover:border-emerald-400 p-6 flex items-center justify-between gap-4 group transition-all shadow-lg hover:shadow-emerald-900/20">
            <div>
              <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                ${getIcon("truck", "w-4 h-4")}
                <span>INTERACTIVE DRILL-DOWN DRAWER 01</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">${m2.drawers.rtmBtn}</h3>
              <p class="text-xs sm:text-sm text-slate-300 mt-1">${m2.drawers.rtmSub}</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform">
              ${getIcon("arrowRight", "w-5 h-5")}
            </div>
          </div>

          <!-- Button 2: Current Principal Portfolio -->
          <div onclick="openPortfolioDrawer()"
            class="cursor-pointer rounded-2xl bg-gradient-to-br from-blue-950/70 to-slate-900/90 border border-blue-500/35 hover:border-blue-400 p-6 flex items-center justify-between gap-4 group transition-all shadow-lg hover:shadow-blue-900/20">
            <div>
              <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
                ${getIcon("users", "w-4 h-4")}
                <span>INTERACTIVE DRILL-DOWN DRAWER 02</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">${m2.drawers.portfolioBtn}</h3>
              <p class="text-xs sm:text-sm text-slate-300 mt-1">${m2.drawers.portfolioSub}</p>
            </div>
            <div class="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0 group-hover:translate-x-1 transition-transform">
              ${getIcon("arrowRight", "w-5 h-5")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.openRtmDrawer = function () {
    const d = t().mod2.rtmDrawer;
    const html = `
      <div class="space-y-6">
        ${d.sections
          .map(
            (s) => `
          <div class="rounded-2xl bg-slate-800/90 border border-white/15 p-5">
            <span class="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">${s.badge}</span>
            <h4 class="text-base sm:text-lg font-bold text-white mb-3">${s.title}</h4>
            <ul class="space-y-2.5">
              ${s.bullets
                .map(
                  (b) => `
                <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
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
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3">Tier-1 Global Principals Represented by BJCS</h4>
          <div class="space-y-3">
            ${d.principals
              .map(
                (p) => `
              <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span class="text-xs font-bold text-slate-400 uppercase">${p.category}</span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${p.synergy}</span>
                </div>
                <div class="text-base font-extrabold text-white">${p.brands}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">Active BJCS Customer Segments (~90 Accounts YTD 2026)</h4>
          <div class="grid grid-cols-1 gap-3">
            ${d.customerSegments
              .map(
                (c) => `
              <div class="rounded-xl bg-blue-950/40 border border-blue-400/25 p-4">
                <div class="text-xs font-bold text-blue-300 mb-1">${c.seg}</div>
                <div class="text-sm font-semibold text-white">${c.accts}</div>
              </div>
            `
              )
              .join("")}
          </div>
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
      const duration = 900;
      const startTime = performance.now();
      const startVal = target > 1000 ? 1990 : 0;

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startVal + (target - startVal) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  // ==========================================================================
  // 6. RENDER MODULE 3: CJ BIO PRODUCT INNOVATION SHOWCASE
  // ==========================================================================
  window.switchProductTab = function (tab) {
    state.productTab = tab;
    renderModule3();
  };

  function renderModule3() {
    const m3 = t().mod3;
    const container = document.getElementById("section-mod3");
    if (!container) return;

    const isHybind = state.productTab === "hybind";
    const prod = isHybind ? m3.hybind : m3.fgaa;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-white/15">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3">
              ${m3.eyebrow}
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">${m3.headline}</h2>
            <p class="text-slate-300 text-sm sm:text-base mt-1">${m3.subheadline}</p>
          </div>
        </div>

        <!-- Product Selector Tabs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-950/70 border border-white/10 mb-8">
          <button onclick="switchProductTab('hybind')"
            class="py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              isHybind
                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }">
            <span>${m3.tabHybind}</span>
            <span class="px-2 py-0.5 rounded text-[10px] ${isHybind ? "bg-black/25 text-emerald-100" : "bg-white/10 text-slate-400"}">Clean Label Meat & Seafood</span>
          </button>

          <button onclick="switchProductTab('fgaa')"
            class="py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
              !isHybind
                ? "bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg shadow-blue-600/25"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }">
            <span>${m3.tabFgaa}</span>
            <span class="px-2 py-0.5 rounded text-[10px] ${!isHybind ? "bg-black/25 text-white" : "bg-white/10 text-slate-400"}">L-Arg · L-Cit · L-His</span>
          </button>
        </div>

        <!-- Active Product Showcase Body -->
        <div class="rounded-2xl bg-slate-900/75 border ${isHybind ? "border-emerald-500/35" : "border-blue-500/35"} p-6 sm:p-8">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
              isHybind ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }">${prod.badge}</span>
            <span class="text-xs font-mono text-slate-400">CJ BIO Bio-Ingredients Division</span>
          </div>

          <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3">${prod.headline}</h3>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">${prod.desc}</p>

          <!-- Key Performance Tags -->
          <div class="flex flex-wrap gap-2.5 mb-8">
            ${prod.tags
              .map(
                (tag) => `
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                isHybind
                  ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
                  : "bg-blue-500/15 text-blue-200 border border-blue-400/30"
              }">
                ${getIcon("check", "w-3.5 h-3.5")}
                ${tag}
              </span>
            `
              )
              .join("")}
          </div>

          <!-- Vietnam Market Size Drivers (Slides 10 & 11) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            ${prod.marketKpis
              .map(
                (mk) => `
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="text-xl sm:text-2xl font-extrabold ${isHybind ? "text-emerald-300" : "text-amber-300"}">${mk.val}</div>
                <div class="text-xs text-slate-300 mt-1">${mk.lbl}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Target Applications Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${prod.apps
              .map(
                (app) => `
              <div class="rounded-xl bg-slate-950/60 border border-white/10 p-4">
                <div class="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full ${isHybind ? "bg-emerald-400" : "bg-amber-400"}"></span>
                  ${app.group}
                </div>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${app.items}</p>
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Progressive Disclosure Action Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-white/10">
            <button onclick="${isHybind ? "openHybindCompareModal()" : "openFgaaCompareModal()"}"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer ${
                isHybind
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-600/25"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-600/25"
              }">
              ${getIcon("sparkle", "w-4 h-4")}
              <span>${prod.compareBtn}</span>
              ${getIcon("arrowRight", "w-4 h-4")}
            </button>

            <button onclick="${isHybind ? "openHybindQuestionsModal()" : "openFgaaQuestionsModal()"}"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer">
              ${getIcon("flask", "w-4 h-4")}
              <span>${prod.questionsBtn}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function buildComparisonTableHtml(modalData) {
    return `
      <div class="overflow-x-auto rounded-2xl border border-white/15">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/95 text-xs uppercase tracking-wider text-slate-300 border-b border-white/15">
              <th class="p-3.5 font-bold">${modalData.headers[0]}</th>
              <th class="p-3.5 font-bold text-red-300">${modalData.headers[1]}</th>
              <th class="p-3.5 font-bold text-amber-200">${modalData.headers[2]}</th>
              <th class="p-3.5 font-bold bg-emerald-950/80 text-emerald-300 border-l border-emerald-500/30">${modalData.headers[3]}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10 text-xs sm:text-sm">
            ${modalData.rows
              .map(
                (r) => `
              <tr class="bg-slate-900/70 hover:bg-slate-800/60 transition-colors">
                <td class="p-3.5 font-bold text-white">${r[0]}</td>
                <td class="p-3.5 text-slate-300">${r[1]}</td>
                <td class="p-3.5 text-slate-300">${r[2]}</td>
                <td class="p-3.5 font-semibold text-emerald-200 bg-emerald-950/35 border-l border-emerald-500/30">${r[3]}</td>
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
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          ${d.pains
            .map(
              (p) => `
            <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
              <div class="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">${p.area}</div>
              <div class="text-xs text-red-300 mb-2"><strong>Pain:</strong> ${p.pain}</div>
              <div class="text-xs sm:text-sm text-emerald-200"><strong>BJCS × CJ Solution:</strong> ${p.response}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="rounded-2xl bg-slate-800/95 border border-emerald-500/30 p-5">
          <h4 class="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-3">5 Strategic Questions & Alignment Items for CJ BIO (15 Oct 2026)</h4>
          <ul class="space-y-2.5">
            ${d.questions
              .map(
                (q) => `
              <li class="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
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
  // 7. RENDER MODULE 4: TARGET MARKET & ACCOUNT MAPPING (INTERACTIVE MAP)
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
      { id: "meat", label: m4.filters.catMeat },
      { id: "seafood", label: m4.filters.catSeafood },
      { id: "fgaa", label: m4.filters.catFgaa }
    ];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-white/15">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
            ${m4.eyebrow}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">${m4.headline}</h2>
          <p class="text-slate-300 text-sm sm:text-base mt-2 max-w-4xl">${m4.subheadline}</p>
        </div>

        <!-- Region & Category Filter Bars -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div class="flex flex-wrap gap-2">
            ${regButtons
              .map(
                (b) => `
              <button onclick="setRegionFilter('${b.id}')"
                class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  state.regionFilter === b.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }">
                ${b.label}
              </button>
            `
              )
              .join("")}
          </div>

          <div class="flex flex-wrap gap-2">
            ${catButtons
              .map(
                (c) => `
              <button onclick="setCategoryFilter('${c.id}')"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  state.categoryFilter === c.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/10"
                }">
                ${c.label}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Status Legend -->
        <div class="flex flex-wrap items-center gap-5 mb-6 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span class="text-slate-200 font-semibold">${m4.legendCustomer}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-400"></span>
            <span class="text-slate-300 font-semibold">${m4.legendPotential}</span>
          </div>
        </div>

        <!-- Account Matrix Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          ${filtered
            .map((acc) => {
              const loc = acc[state.lang] || acc.en;
              return `
                <div onclick="openAccountModal('${acc.id}')"
                  class="cursor-pointer rounded-2xl p-5 transition-all flex flex-col justify-between group ${
                    acc.isCustomer
                      ? "bg-gradient-to-br from-emerald-950/60 to-slate-900/90 border border-emerald-500/40 hover:border-emerald-400"
                      : "bg-slate-900/75 border border-white/15 hover:border-amber-400/50"
                  }">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        acc.isCustomer
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }">
                        ${acc.isCustomer ? "BJCS Customer" : "Priority Target"}
                      </span>
                      <span class="text-[11px] font-mono text-slate-400">${acc.regionBadge}</span>
                    </div>
                    <h3 class="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                      ${acc.name}
                    </h3>
                    <div class="inline-block text-[11px] font-semibold text-blue-300 bg-blue-500/15 border border-blue-400/25 px-2.5 py-0.5 rounded mb-3">
                      ${acc.productBadge}
                    </div>
                    <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      ${loc.apps}
                    </p>
                  </div>
                  <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold ${
                    acc.isCustomer ? "text-emerald-400" : "text-amber-300"
                  }">
                    <span>${m4.clickHint}</span>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>

        <!-- Tier-1 vs Tier-2 Strategic Distinction Banner -->
        <div class="rounded-2xl bg-slate-900/90 border border-blue-500/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="text-xs sm:text-sm text-slate-200">
            <strong class="text-emerald-300">${m4.tierNoteTitle}</strong> ${m4.tierNoteText}
          </div>
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
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="rounded-xl bg-slate-800/90 border border-white/10 p-3.5">
            <div class="text-[11px] text-slate-400 uppercase font-bold">${lbl.status}</div>
            <div class="text-sm font-bold ${acc.isCustomer ? "text-emerald-300" : "text-amber-300"} mt-0.5">
              ${acc.isCustomer ? "Existing BJCS Customer (Active)" : "Priority Target Account"} · ${acc.tier}
            </div>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/10 p-3.5">
            <div class="text-[11px] text-slate-400 uppercase font-bold">${lbl.region}</div>
            <div class="text-sm font-bold text-white mt-0.5">${acc.regionBadge}</div>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/10 p-3.5">
            <div class="text-[11px] text-slate-400 uppercase font-bold">${lbl.portfolio}</div>
            <div class="text-sm font-bold text-blue-300 mt-0.5">${acc.productBadge}</div>
          </div>
        </div>

        <div class="rounded-xl bg-slate-800/80 border border-white/15 p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">${lbl.applications}</div>
          <p class="text-sm text-white leading-relaxed">${loc.apps}</p>
        </div>

        <div class="rounded-xl bg-red-950/35 border border-red-500/30 p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-red-300 mb-1">${lbl.painPoint}</div>
          <p class="text-sm text-red-100 leading-relaxed">${loc.pain}</p>
        </div>

        <div class="rounded-xl bg-emerald-950/45 border border-emerald-500/35 p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">${lbl.valueProp}</div>
          <p class="text-sm text-emerald-100 leading-relaxed">${loc.value}</p>
        </div>

        <div class="rounded-xl bg-blue-950/45 border border-blue-500/35 p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">${lbl.ksf}</div>
          <p class="text-sm text-blue-100 leading-relaxed">${loc.ksf}</p>
        </div>
      </div>
    `;
    openModal(acc.name, `${acc.regionBadge} · ${acc.productBadge}`, html);
  };

  // ==========================================================================
  // 8. RENDER MODULE 5: HOW WE WIN & COST-IN-USE ROI SIMULATOR
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
    // Per 1,000 kg (1 Ton) batch:
    const extraMeatKg = 1000 * (c.yieldGain / 100);
    const grossYieldValue = extraMeatKg * c.meatCost;

    const stppCostPerTon = 1000 * (c.stppDose / 100) * c.stppPricePerKg;
    const hybindCostPerTon = 1000 * (c.hybindDose / 100) * c.hybindPricePerKg;
    const additiveCostDelta = hybindCostPerTon - stppCostPerTon;

    const netSavingsPerTon = grossYieldValue - additiveCostDelta;
    const annualNetBenefit = netSavingsPerTon * c.annualTons;

    return {
      extraMeatKg,
      grossYieldValue,
      additiveCostDelta,
      netSavingsPerTon,
      annualNetBenefit
    };
  }

  function updateCalculatorOutputs() {
    const c = state.calc;
    const res = calculateRoiMetrics();

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt("val-meatCost", `$${c.meatCost.toFixed(2)} / kg`);
    setTxt("val-stppDose", `${c.stppDose.toFixed(2)}%`);
    setTxt("val-hybindDose", `${c.hybindDose.toFixed(2)}%`);
    setTxt("val-yieldGain", `+${c.yieldGain.toFixed(1)}%`);

    setTxt("out-extra-meat", `+${res.extraMeatKg.toFixed(1)} kg / Ton`);
    setTxt("out-gross-yield", `+$${res.grossYieldValue.toFixed(2)} / Ton`);
    setTxt("out-additive-diff", `${res.additiveCostDelta >= 0 ? "+" : ""}$${res.additiveCostDelta.toFixed(2)} / Ton`);

    const netEl = document.getElementById("out-net-savings");
    if (netEl) {
      const sign = res.netSavingsPerTon >= 0 ? "+" : "";
      netEl.textContent = `${sign}$${res.netSavingsPerTon.toFixed(2)} / Ton`;
      netEl.className = `text-3xl sm:text-4xl font-extrabold ${
        res.netSavingsPerTon >= 0 ? "text-emerald-300" : "text-amber-300"
      }`;
    }

    const annEl = document.getElementById("out-annual-roi");
    if (annEl) {
      const sign = res.annualNetBenefit >= 0 ? "+" : "";
      annEl.textContent = `${sign}$${Math.round(res.annualNetBenefit).toLocaleString()} / Year`;
    }
  }

  function renderModule5() {
    const m5 = t().mod5;
    const container = document.getElementById("section-mod5");
    if (!container) return;

    const c = state.calc;

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-white/15">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3">
            ${m5.eyebrow}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">${m5.headline}</h2>
          <p class="text-emerald-300 font-bold text-sm sm:text-lg mt-2">${m5.subheadline}</p>
          <div class="mt-3 inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            ${m5.tcoFormula}
          </div>
        </div>

        <!-- Interactive Cost-in-Use ROI Simulator -->
        <div class="rounded-2xl bg-slate-900/85 border border-emerald-500/35 p-6 sm:p-8 mb-8">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 class="text-xl sm:text-2xl font-extrabold text-white">${m5.calc.title}</h3>
              <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">${m5.calc.subtitle}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-slate-400 mr-1">${m5.calc.presetsLabel}</span>
              ${m5.calc.presets
                .map(
                  (p, idx) => `
                <button onclick="applyCalcPreset(${idx})"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-emerald-500/25 text-emerald-200 border border-white/15 hover:border-emerald-400/40 transition-all cursor-pointer">
                  ${p.name}
                </button>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- 4 Input Sliders -->
            <div class="lg:col-span-7 space-y-5">
              <!-- Slider 1: Base Meat Cost -->
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="flex justify-between text-xs sm:text-sm font-bold mb-2">
                  <span class="text-slate-200">${m5.calc.sliders.meatCost}</span>
                  <span id="val-meatCost" class="text-emerald-300 font-mono">$${c.meatCost.toFixed(2)} / kg</span>
                </div>
                <input type="range" min="2.50" max="9.00" step="0.10" value="${c.meatCost}"
                  oninput="updateCalcSlider('meatCost', this.value)"
                  class="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
              </div>

              <!-- Slider 2: Target Phosphate Dosage -->
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="flex justify-between text-xs sm:text-sm font-bold mb-2">
                  <span class="text-slate-200">${m5.calc.sliders.stppDose}</span>
                  <span id="val-stppDose" class="text-blue-300 font-mono">${c.stppDose.toFixed(2)}%</span>
                </div>
                <input type="range" min="0.15" max="0.60" step="0.05" value="${c.stppDose}"
                  oninput="updateCalcSlider('stppDose', this.value)"
                  class="w-full accent-blue-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
              </div>

              <!-- Slider 3: HYBIND Dosage -->
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="flex justify-between text-xs sm:text-sm font-bold mb-2">
                  <span class="text-slate-200">${m5.calc.sliders.hybindDose}</span>
                  <span id="val-hybindDose" class="text-amber-300 font-mono">${c.hybindDose.toFixed(2)}%</span>
                </div>
                <input type="range" min="0.15" max="0.65" step="0.05" value="${c.hybindDose}"
                  oninput="updateCalcSlider('hybindDose', this.value)"
                  class="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg" />
              </div>

              <!-- Slider 4: Expected Cooking Yield Increase -->
              <div class="rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-4">
                <div class="flex justify-between text-xs sm:text-sm font-bold mb-2">
                  <span class="text-emerald-200">${m5.calc.sliders.yieldGain}</span>
                  <span id="val-yieldGain" class="text-emerald-300 font-mono text-base">+${c.yieldGain.toFixed(1)}%</span>
                </div>
                <input type="range" min="1.0" max="3.0" step="0.1" value="${c.yieldGain}"
                  oninput="updateCalcSlider('yieldGain', this.value)"
                  class="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-700 rounded-lg" />
              </div>

              <p class="text-[11px] text-slate-400 italic">${m5.calc.assumptionsNote}</p>
            </div>

            <!-- Real-time Output Display -->
            <div class="lg:col-span-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-blue-950/80 border-2 border-emerald-400/50 p-6 shadow-2xl">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500 text-slate-950 mb-4">
                ${getIcon("check", "w-3.5 h-3.5")}
                <span>${m5.calc.outputs.positiveBadge}</span>
              </div>

              <div class="space-y-3 mb-5">
                <div class="flex justify-between items-center text-xs sm:text-sm border-b border-white/10 pb-2.5">
                  <span class="text-slate-300">${m5.calc.outputs.extraMeatLabel}</span>
                  <span id="out-extra-meat" class="font-bold font-mono text-white"></span>
                </div>
                <div class="flex justify-between items-center text-xs sm:text-sm border-b border-white/10 pb-2.5">
                  <span class="text-slate-300">${m5.calc.outputs.grossYieldValueLabel}</span>
                  <span id="out-gross-yield" class="font-bold font-mono text-emerald-300"></span>
                </div>
                <div class="flex justify-between items-center text-xs sm:text-sm border-b border-white/10 pb-2.5">
                  <span class="text-slate-300">${m5.calc.outputs.additiveDiffLabel}</span>
                  <span id="out-additive-diff" class="font-bold font-mono text-amber-300"></span>
                </div>
              </div>

              <div class="rounded-xl bg-black/40 border border-emerald-500/30 p-4 mb-4">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">${m5.calc.outputs.netSavingsLabel}</div>
                <div id="out-net-savings" class="text-3xl sm:text-4xl font-extrabold text-emerald-300"></div>
                <div class="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span class="text-slate-300">${m5.calc.outputs.annualTitle}</span>
                  <span id="out-annual-roi" class="font-bold font-mono text-emerald-200"></span>
                </div>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed">${m5.calc.outputs.insightText}</p>
            </div>
          </div>
        </div>

        <!-- Account Decision Map & 3-Stage Trial Protocol (Slide 25) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Decision Map -->
          <div class="rounded-2xl bg-slate-900/75 border border-white/15 p-6">
            <h4 class="text-base sm:text-lg font-extrabold text-white mb-4">${m5.methodology.buyersTitle}</h4>
            <div class="space-y-3 mb-5">
              ${m5.methodology.buyers
                .map(
                  (b) => `
                <div class="rounded-xl bg-white/5 border border-white/10 p-3.5">
                  <div class="text-xs sm:text-sm font-bold text-emerald-300">${b.role}</div>
                  <div class="text-xs text-slate-300 mt-1">${b.focus}</div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-4">
              <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">${m5.methodology.spinLabel}</div>
              <p class="text-xs sm:text-sm italic text-white">${m5.methodology.spinQuote}</p>
            </div>
          </div>

          <!-- 3-Stage Trial Protocols -->
          <div class="rounded-2xl bg-slate-900/75 border border-white/15 p-6">
            <h4 class="text-base sm:text-lg font-extrabold text-white mb-4">${m5.methodology.protocolsTitle}</h4>
            <div class="mb-4">
              <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">TasteNrich® HYBIND — 3-Step Meat & Seafood Trial</div>
              <div class="space-y-2">
                ${m5.methodology.hybindSteps
                  .map(
                    (s) => `
                  <div class="rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-2.5 text-xs sm:text-sm text-slate-200">${s}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">AMINATURE® FGAA — 3-Step Co-Development Protocol</div>
              <div class="space-y-2">
                ${m5.methodology.fgaaSteps
                  .map(
                    (s) => `
                  <div class="rounded-lg bg-blue-500/10 border border-blue-500/25 px-3.5 py-2.5 text-xs sm:text-sm text-slate-200">${s}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    updateCalculatorOutputs();
  }

  // ==========================================================================
  // 9. RENDER MODULE 6: GO-TO-MARKET ROADMAP & PROPOSAL
  // ==========================================================================
  window.selectRoadmapStep = function (idx) {
    state.activeRoadmapStep = idx;
    renderModule6();
  };

  function renderModule6() {
    const m6 = t().mod6;
    const container = document.getElementById("section-mod6");
    if (!container) return;

    const activePhase = m6.phases[state.activeRoadmapStep] || m6.phases[0];

    container.innerHTML = `
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-white/15">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
            ${m6.eyebrow}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">${m6.headline}</h2>
          <p class="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl">${m6.subheadline}</p>
        </div>

        <!-- 4-Step Interactive Timeline Stepper -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          ${m6.phases
            .map((p, idx) => {
              const isActive = state.activeRoadmapStep === idx;
              return `
                <button onclick="selectRoadmapStep(${idx})"
                  class="text-left rounded-2xl p-5 transition-all cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-br from-emerald-600/30 to-slate-900 border-emerald-400 shadow-lg shadow-emerald-600/20"
                      : "bg-slate-900/70 border-white/15 hover:border-white/30"
                  }">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded ${
                      isActive ? "bg-emerald-400 text-slate-950" : "bg-white/10 text-slate-300"
                    }">${p.step}</span>
                    <span class="text-xs font-bold ${isActive ? "text-emerald-300" : "text-slate-400"}">${p.period}</span>
                  </div>
                  <div class="text-lg font-extrabold text-white mb-1">${p.name}</div>
                  <p class="text-xs text-slate-300 line-clamp-2">${p.summary}</p>
                </button>
              `;
            })
            .join("")}
        </div>

        <!-- Expanded Phase Deliverables Box -->
        <div class="rounded-2xl bg-slate-900/85 border border-emerald-500/40 p-6 sm:p-8 mb-8">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
            <div>
              <span class="text-xs font-mono font-bold text-emerald-400">${activePhase.step} · ${activePhase.period}</span>
              <h3 class="text-xl sm:text-2xl font-extrabold text-white mt-0.5">${activePhase.name} — ${activePhase.summary}</h3>
            </div>
            <span class="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-xs font-semibold text-blue-200">
              Owner: ${activePhase.owner}
            </span>
          </div>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${activePhase.deliverables
              .map(
                (deliv) => `
              <li class="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  ${getIcon("check", "w-3.5 h-3.5")}
                </span>
                <span>${deliv}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>

        <!-- Monthly Reporting Governance Strip (Slide 27) -->
        <div class="mb-8">
          <h4 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">${m6.reportingTitle}</h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            ${m6.reportingMetrics
              .map(
                (rm) => `
              <div class="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-300 text-center">
                ${rm}
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Strategic Call-to-Action (CTA) Box -->
        <div class="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border-2 border-emerald-400/50 p-6 sm:p-10 text-center relative overflow-hidden">
          <span class="inline-block px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-emerald-500 text-slate-950 mb-4">
            ${m6.ctaBox.badge}
          </span>
          <h3 class="text-xl sm:text-3xl font-extrabold text-white max-w-4xl mx-auto leading-snug mb-3">
            ${m6.ctaBox.title}
          </h3>
          <p class="text-xs sm:text-base text-slate-300 max-w-3xl mx-auto mb-8">
            ${m6.ctaBox.subtitle}
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <button onclick="openSampleProtocolModal()"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer">
              ${getIcon("flask", "w-4 h-4")}
              <span>${m6.ctaBox.btnSample}</span>
            </button>

            <button onclick="openDownloadPdfModal()"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer">
              ${getIcon("sparkle", "w-4 h-4")}
              <span>${m6.ctaBox.btnPdf}</span>
            </button>

            <button onclick="openContactModal()"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all cursor-pointer">
              ${getIcon("users", "w-4 h-4")}
              <span>${m6.ctaBox.btnContact}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // CTA Modals (Sample Protocol, PDF Downloads, Contact Team)
  window.openSampleProtocolModal = function () {
    const html = `
      <div class="space-y-5">
        <div class="rounded-xl bg-emerald-950/50 border border-emerald-500/35 p-4 text-xs sm:text-sm text-emerald-100">
          <strong>Target Milestone (By 30 October 2026):</strong> Initial sample kit & technical dossier dispatch from CJ BIO Vietnam to BJCS Vietnam for Q4 2026 onboarding & Q1 2027 priority account trials.
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-emerald-300 mb-2">1. TasteNrich® HYBIND Sample & Dossier Checklist</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              <li>• 5–10 kg Lab/Pilot Sample Kits for Priority Meat & Seafood Accounts</li>
              <li>• Technical Data Sheet (TDS), SDS & Certificate of Analysis (COA)</li>
              <li>• Composition breakdown for Vietnam Circular 24/2019 & 17/2023 label wording</li>
              <li>• Halal, Kosher, Non-GMO & FSSC 22000 Plant Certificates (Indonesia)</li>
              <li>• Recommended Dosage & Cooking Yield Battle Cards</li>
            </ul>
          </div>

          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <h4 class="text-sm font-bold text-blue-300 mb-2">2. AMINATURE® FGAA Sample & Dossier Checklist</h4>
            <ul class="space-y-1.5 text-xs text-slate-200">
              <li>• Sample Kits: L-Arginine, L-Citrulline & L-Histidine (2–5 kg each)</li>
              <li>• Full COA, TDS, MSDS & Manufacturing Flow for MOH VFA Registration</li>
              <li>• Vegan Action, Halal, Kosher & BRC/FSSC 22000 Certificates per SKU</li>
              <li>• Taste-Masking, Solubility & UHT Thermal Stability Guidelines</li>
              <li>• INCI / Cosmetic-Grade Docs (for Oral & Personal Care accounts)</li>
            </ul>
          </div>
        </div>

        <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="text-xs text-slate-300">
            <strong>Ship Samples & Dossiers To:</strong> BJC Specialties Vietnam — HCMC & Hanoi Offices (Attn: Nguyen Duc Duy Anh · <span class="text-emerald-300">duyanh@bjc.co.th</span>)
          </div>
          <a href="mailto:duyanh@bjc.co.th?subject=CJ%20BIO%20x%20BJCS%20Vietnam%20-%20Sample%20%26%20Dossier%20Protocol%20(15%20Oct%202026)"
            class="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0">
            Send Confirmation Email
          </a>
        </div>
      </div>
    `;
    openModal(
      "Sample & Technical Dossier Onboarding Protocol",
      "Required CJ BIO samples, regulatory certificates & application guides for Q4 2026 onboarding",
      html
    );
  };

  window.openDownloadPdfModal = function () {
    const html = `
      <div class="space-y-4">
        <p class="text-xs sm:text-sm text-slate-300">
          Select an official presentation or technical strategy document below to view or download directly:
        </p>
        <div class="grid grid-cols-1 gap-3">
          <a href="151026-CJ_BIO_x_BJCS_Vietnam.pdf" target="_blank" download
            class="rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-emerald-500/40 p-4 flex items-center justify-between gap-4 transition-all">
            <div>
              <div class="text-xs font-bold text-emerald-400 uppercase">OFFICIAL EXECUTIVE DECK (29 SLIDES · PDF)</div>
              <div class="text-base font-bold text-white mt-0.5">151026-CJ_BIO_x_BJCS_Vietnam.pdf</div>
              <div class="text-xs text-slate-400 mt-0.5">Complete Partnership Presentation: Platform, Market Sizing, Regulatory, Account Maps, Win Strategy & Roadmap</div>
            </div>
            <span class="px-3.5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs shrink-0">Download PDF</span>
          </a>

          <a href="TasteNrich_HYBIND_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
            class="rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/15 p-4 flex items-center justify-between gap-4 transition-all">
            <div>
              <div class="text-xs font-bold text-amber-400 uppercase">PRODUCT & SALES STRATEGY BRIEF 01</div>
              <div class="text-base font-bold text-white mt-0.5">TasteNrich® HYBIND — Natural Phosphate Replacement Brief (PDF)</div>
              <div class="text-xs text-slate-400 mt-0.5">Technical specs, STPP comparison battlecard, pain points & 3-stage meat trial protocol</div>
            </div>
            <span class="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0">Download PDF</span>
          </a>

          <a href="FGAA_AMINATURE_Gioi_Thieu_SanPham_CJ_BIO.pdf" target="_blank" download
            class="rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-white/15 p-4 flex items-center justify-between gap-4 transition-all">
            <div>
              <div class="text-xs font-bold text-blue-400 uppercase">PRODUCT & SALES STRATEGY BRIEF 02</div>
              <div class="text-base font-bold text-white mt-0.5">AMINATURE® FGAA — Food-Grade Amino Acids Brief (PDF)</div>
              <div class="text-xs text-slate-400 mt-0.5">L-Arginine, L-Citrulline, L-Histidine specs, Vegan/Halal/Kosher USPs & co-development framework</div>
            </div>
            <span class="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0">Download PDF</span>
          </a>
        </div>
      </div>
    `;
    openModal(
      "Download Executive Meeting Summary & Product Dossiers (PDF)",
      "Official BJC Specialties Vietnam × CJ BIO meeting documentation (15 October 2026)",
      html
    );
  };

  window.openContactModal = function () {
    const html = `
      <div class="space-y-4">
        <div class="rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 p-5">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Executive Lead & Presenter</div>
          <div class="text-xl font-extrabold text-white">Nguyen Duc Duy Anh</div>
          <div class="text-xs sm:text-sm text-slate-300 mb-3">Managing Director / Business Unit Leader — BJC Specialties Vietnam</div>
          <div class="flex flex-wrap gap-3 text-xs sm:text-sm">
            <a href="mailto:duyanh@bjc.co.th" class="px-3.5 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-semibold">
              Email: duyanh@bjc.co.th
            </a>
            <a href="tel:+84908095693" class="px-3.5 py-2 rounded-lg bg-blue-500/20 border border-blue-400/40 text-blue-200 font-semibold">
              Mobile: (+84) 908 095 693
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <div class="text-xs font-bold uppercase text-emerald-400 mb-1">Ho Chi Minh City Head Office (South)</div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              MM Mega Market Office Complex, Lot B, An Phu – An Khanh New Urban Area, Binh Trung Ward, Ho Chi Minh City, Vietnam
            </p>
          </div>
          <div class="rounded-xl bg-slate-800/90 border border-white/15 p-4">
            <div class="text-xs font-bold uppercase text-blue-400 mb-1">Hanoi Branch Office (North)</div>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              3rd Floor, Lobby A, Geleximco Building, 897 Giai Phong Street, Hoang Mai Ward, Hanoi, Vietnam
            </p>
          </div>
        </div>
      </div>
    `;
    openModal(
      "BJC Specialties Vietnam — Executive Contact Directory",
      "Direct communication channels for CJ BIO Vietnam partnership execution",
      html
    );
  };

  // ==========================================================================
  // 10. MODAL & SLIDE-OVER DRAWER CONTROLLERS
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
    }, 200);
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
    }, 250);
  };

  // ==========================================================================
  // 11. MASTER RENDER & INITIALIZATION
  // ==========================================================================
  function renderAll() {
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

  // ScrollSpy to highlight active module tab while scrolling
  function initScrollSpy() {
    window.addEventListener(
      "scroll",
      () => {
        if (state.activeTab !== "all") return;
        const mods = ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"];
        let current = state.activeNavHighlight;
        for (const m of mods) {
          const el = document.getElementById(`section-${m}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160 && rect.bottom >= 160) {
              current = m;
              break;
            }
          }
        }
        if (current !== state.activeNavHighlight) {
          state.activeNavHighlight = current;
          renderNavBar();
        }
      },
      { passive: true }
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSecuritySuite();
    renderAll();
    initScrollSpy();
  });
})();
