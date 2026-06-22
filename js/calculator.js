/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Commission Calculator
   ============================================ */

const Calculator = {
  rates: {
    card: { share: 0.45, capMin: 80, capMax: 100 },
    transfer: { share: 0.35, capMin: 15, capMax: 20 },
    pwt: { share: 0.70, capMin: 100, capMax: 100 }
  },

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.calculate();
  },

  cacheDOM() {
    this.cardInput = document.getElementById('calc-card');
    this.transferInput = document.getElementById('calc-transfer');
    this.pwtInput = document.getElementById('calc-pwt');
    this.dailyEl = document.getElementById('calc-daily');
    this.weeklyEl = document.getElementById('calc-weekly');
    this.monthlyEl = document.getElementById('calc-monthly');
  },

  bindEvents() {
    if (this.cardInput) {
      [this.cardInput, this.transferInput, this.pwtInput].forEach(input => {
        if (input) {
          input.addEventListener('input', () => this.calculate());
          input.addEventListener('change', () => this.calculate());
        }
      });
    }
  },

  calculate() {
    const cardCount = Math.max(0, parseInt(this.cardInput?.value) || 0);
    const transferCount = Math.max(0, parseInt(this.transferInput?.value) || 0);
    const pwtCount = Math.max(0, parseInt(this.pwtInput?.value) || 0);

    // Caps per transaction (using average of cap range)
    const cardPerTxn = ((this.rates.card.capMin + this.rates.card.capMax) / 2) * this.rates.card.share;
    const transferPerTxn = ((this.rates.transfer.capMin + this.rates.transfer.capMax) / 2) * this.rates.transfer.share;
    const pwtPerTxn = this.rates.pwt.capMax * this.rates.pwt.share;

    const daily = (cardCount * cardPerTxn) + (transferCount * transferPerTxn) + (pwtCount * pwtPerTxn);
    const weekly = daily * 6; // 6 trading days
    const monthly = daily * 26; // ~26 trading days per month

    if (this.dailyEl) this.dailyEl.textContent = '₦' + Math.round(daily).toLocaleString();
    if (this.weeklyEl) this.weeklyEl.textContent = '₦' + Math.round(weekly).toLocaleString();
    if (this.monthlyEl) this.monthlyEl.textContent = '₦' + Math.round(monthly).toLocaleString();
  }
};
