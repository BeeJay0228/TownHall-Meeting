/* ============================================
   PALMPAY AGG NEW POLICY TRAINING
   Certificate Generator
   ============================================ */

const Certificate = {
  init() {
    const btn = document.getElementById('download-certificate');
    if (btn) {
      btn.addEventListener('click', () => this.showModal());
    }
    this.cacheDOM();
    this.bindEvents();
    this.loadSavedName();
  },

  cacheDOM() {
    this.modal = document.getElementById('certificate-modal');
    this.backdrop = document.querySelector('.cert-modal-backdrop');
    this.nameInput = document.getElementById('cert-name');
    this.errorEl = document.getElementById('cert-name-error');
    this.cancelBtn = document.getElementById('cert-cancel');
    this.generateBtn = document.getElementById('cert-generate');
  },

  bindEvents() {
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => this.hideModal());
    }
    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => this.handleGenerate());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.hideModal());
    }
    if (this.nameInput) {
      this.nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleGenerate();
      });
      this.nameInput.addEventListener('input', () => {
        this.nameInput.classList.remove('error');
        this.errorEl.classList.remove('visible');
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('open')) {
        this.hideModal();
      }
    });
  },

  loadSavedName() {
    const saved = localStorage.getItem('certificateName');
    if (saved && this.nameInput) {
      this.nameInput.value = saved;
    }
  },

  showModal() {
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.nameInput?.focus(), 100);
  },

  hideModal() {
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  },

  handleGenerate() {
    const name = this.nameInput.value.trim();
    if (!name) {
      this.nameInput.classList.add('error');
      this.errorEl.textContent = 'Please enter your name to generate the certificate.';
      this.errorEl.classList.add('visible');
      this.nameInput.focus();
      return;
    }

    localStorage.setItem('certificateName', name);
    this.hideModal();
    this.generate(name);
  },

  generate(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 565;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 800, 565);
    gradient.addColorStop(0, '#F8FAFC');
    gradient.addColorStop(1, '#F1F5F9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 565);

    ctx.strokeStyle = '#6A35FF';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 525);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 730, 495);

    ctx.fillStyle = '#6A35FF';
    ctx.fillRect(35, 35, 730, 6);

    ctx.fillStyle = '#6A35FF';
    ctx.beginPath();
    ctx.roundRect(360, 55, 80, 80, 16);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(400, 95, 20, 0, Math.PI * 1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 80);
    ctx.lineTo(400, 95);
    ctx.lineTo(410, 105);
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', 400, 175);

    ctx.fillStyle = '#475569';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('This certifies that', 400, 210);

    ctx.fillStyle = '#6A35FF';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(name, 400, 255);

    ctx.fillStyle = '#475569';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('has successfully completed the', 400, 290);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Aggregator New Policy Training', 400, 320);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Mastering PalmPay\'s New Profit Sharing Policy', 400, 345);

    const stats = Progress.getCompletionData();
    ctx.fillStyle = '#0F172A';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Modules Completed: ${stats.completed} / ${stats.total}`, 400, 380);

    const score = App.state.quizScore !== null ? App.state.quizScore + '%' : 'N/A';
    ctx.fillText(`Assessment Score: ${score}`, 400, 402);

    ctx.fillStyle = '#16A34A';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Status: Completed', 400, 430);

    const date = new Date().toLocaleDateString('en-NG', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Issued: ${date}`, 400, 465);

    ctx.fillStyle = '#6A35FF';
    ctx.fillRect(35, 490, 730, 6);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('PalmPay Aggregator Training Program', 400, 520);

    const link = document.createElement('a');
    link.download = `PalmPay-Training-Certificate-${date.replace(/\s/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
};

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}
