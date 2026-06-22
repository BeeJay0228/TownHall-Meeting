/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Commission Calculator & ROI Module
   ============================================ */

const Calculator = {
  rates: {
    card: { share: 0.45, capMin: 80, capMax: 100 },
    transfer: { share: 0.35, capMin: 15, capMax: 20 },
    pwt: { share: 0.70, capMin: 100, capMax: 100 }
  },

  starData: {
    3: {
      label: 'Star 3 Agent',
      card: { value: 6000000, countMin: 284, countMax: 560 },
      transfer: { value: 10000000, countMin: 112, countMax: 240 },
      pwt: { value: 3840000, countMin: 182, countMax: 358 },
      minEarnings: 12769
    },
    4: {
      label: 'Star 4 Agent',
      card: { value: 10500000, countMin: 561, countMax: 840 },
      transfer: { value: 17500000, countMin: 241, countMax: 336 },
      pwt: { value: 6720000, countMin: 359, countMax: 538 },
      minEarnings: 22345
    },
    5: {
      label: 'Star 5 Agent',
      card: { value: 15000000, countMin: 840, countMax: null },
      transfer: { value: 25000000, countMin: 336, countMax: null },
      pwt: { value: 9600000, countMin: 538, countMax: null },
      minEarnings: 31922
    }
  },

  init() {
    this.initCommissionCalc();
    this.initStarTabs();
    this.initAnimatedCounters();
    this.initCompTabs();
  },

  /* --- MODULE 3 COMMISSION CALCULATOR --- */
  initCommissionCalc() {
    this.cardInput = document.getElementById('calc-card');
    this.transferInput = document.getElementById('calc-transfer');
    this.pwtInput = document.getElementById('calc-pwt');

    if (this.cardInput) {
      this.dailyEl = document.getElementById('calc-daily');
      this.weeklyEl = document.getElementById('calc-weekly');
      this.monthlyEl = document.getElementById('calc-monthly');
      this.bindCalcEvents();
      this.calculate();
    }
  },

  bindCalcEvents() {
    [this.cardInput, this.transferInput, this.pwtInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => this.calculate());
        input.addEventListener('change', () => this.calculate());
      }
    });
  },

  calculate() {
    const cardCount = Math.max(0, parseInt(this.cardInput?.value) || 0);
    const transferCount = Math.max(0, parseInt(this.transferInput?.value) || 0);
    const pwtCount = Math.max(0, parseInt(this.pwtInput?.value) || 0);

    const cardPerTxn = ((this.rates.card.capMin + this.rates.card.capMax) / 2) * this.rates.card.share;
    const transferPerTxn = ((this.rates.transfer.capMin + this.rates.transfer.capMax) / 2) * this.rates.transfer.share;
    const pwtPerTxn = this.rates.pwt.capMax * this.rates.pwt.share;

    const daily = (cardCount * cardPerTxn) + (transferCount * transferPerTxn) + (pwtCount * pwtPerTxn);
    const weekly = daily * 6;
    const monthly = daily * 26;

    if (this.dailyEl) this.dailyEl.textContent = '₦' + Math.round(daily).toLocaleString();
    if (this.weeklyEl) this.weeklyEl.textContent = '₦' + Math.round(weekly).toLocaleString();
    if (this.monthlyEl) this.monthlyEl.textContent = '₦' + Math.round(monthly).toLocaleString();
  },

  /* --- STAR TABS (Module 5) --- */
  initStarTabs() {
    const tabs = document.querySelectorAll('.star-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const star = tab.dataset.star;
        document.querySelectorAll('.star-panel').forEach(p => p.classList.remove('active'));
        const panel = document.querySelector(`.star-panel[data-panel="${star}"]`);
        if (panel) {
          panel.classList.add('active');
          this.animateCounterInPanel(panel);
        }
      });
    });

    // Activate first panel counters
    const activePanel = document.querySelector('.star-panel.active');
    if (activePanel) this.animateCounterInPanel(activePanel);
  },

  /* --- COMPARISON TABS (Module 5) --- */
  initCompTabs() {
    const tabs = document.querySelectorAll('.comp-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.comp;
        document.querySelectorAll('.comp-panel').forEach(p => p.classList.remove('active'));
        const panel = document.querySelector(`.comp-panel[data-comp-panel="${target}"]`);
        if (panel) {
          panel.classList.add('active');
          // Re-trigger counter animation for the visible panel
          const totalValue = panel.querySelector('.comp-total-value[data-target]');
          if (totalValue) {
            this.animateValue(totalValue, parseInt(totalValue.dataset.target));
          }
        }
      });
    });
  },

  animateCounterInPanel(panel) {
    const smeValue = panel.querySelector('.sme-value');
    if (smeValue && smeValue.dataset.target) {
      const target = parseInt(smeValue.dataset.target);
      this.animateValue(smeValue, target);
    }
  },

  /* --- ANIMATED COUNTERS (Module 5) --- */
  initAnimatedCounters() {
    this.observeSection();
  },

  observeSection() {
    const section = document.getElementById('module-5');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.runAllCounters();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  },

  runAllCounters() {
    // Comp total values
    document.querySelectorAll('.comp-total-value[data-target]').forEach(el => {
      this.animateValue(el, parseInt(el.dataset.target));
    });

    // Profit amounts
    document.querySelectorAll('.profit-amount[data-target]').forEach(el => {
      this.animateValue(el, parseInt(el.dataset.target));
    });

    // Profit gap
    document.querySelectorAll('.profit-gap-value[data-target]').forEach(el => {
      this.animateValue(el, parseInt(el.dataset.target));
    });

    // Star panel
    const activePanel = document.querySelector('.star-panel.active');
    if (activePanel) {
      const smeValue = activePanel.querySelector('.sme-value');
      if (smeValue && smeValue.dataset.target) {
        this.animateValue(smeValue, parseInt(smeValue.dataset.target));
      }
    }
  },

  animateValue(el, target) {
    if (!el) return;
    const current = parseInt(el.textContent.replace(/[₦,]/g, '')) || 0;
    if (current >= target) return;

    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = '₦' + value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = '₦' + target.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  }
};
