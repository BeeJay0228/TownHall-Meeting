/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Certificate Generator
   ============================================ */

const Certificate = {
  init() {
    const btn = document.getElementById('download-certificate');
    if (btn) {
      btn.addEventListener('click', () => this.generate());
    }
  },

  generate() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 565;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 800, 565);
    gradient.addColorStop(0, '#F8FAFC');
    gradient.addColorStop(1, '#F1F5F9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 565);

    // Border
    ctx.strokeStyle = '#6A35FF';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 525);

    // Inner border
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 730, 495);

    // Top decorative bar
    ctx.fillStyle = '#6A35FF';
    ctx.fillRect(35, 35, 730, 6);

    // Logo area
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

    // Title
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', 400, 175);

    // Subtitle
    ctx.fillStyle = '#475569';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('This certifies that', 400, 210);

    // Name
    ctx.fillStyle = '#6A35FF';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('PalmPay Aggregator', 400, 255);

    // Description
    ctx.fillStyle = '#475569';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('has successfully completed the', 400, 290);

    // Course name
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Aggregator Town Hall Training Guide', 400, 320);

    // Details
    ctx.fillStyle = '#64748B';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Mastering PalmPay\'s New Profit Sharing Policy', 400, 345);

    // Stats
    const stats = Progress.getCompletionData();
    ctx.fillStyle = '#0F172A';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Modules Completed: ${stats.completed} / ${stats.total}`, 400, 380);

    const score = App.state.quizScore !== null ? App.state.quizScore + '%' : 'N/A';
    ctx.fillText(`Assessment Score: ${score}`, 400, 402);

    ctx.fillStyle = '#16A34A';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Status: Completed', 400, 430);

    // Date
    const date = new Date().toLocaleDateString('en-NG', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Issued: ${date}`, 400, 465);

    // Bottom bar
    ctx.fillStyle = '#6A35FF';
    ctx.fillRect(35, 490, 730, 6);

    // Footer
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('PalmPay Aggregator Training Program', 400, 520);

    const link = document.createElement('a');
    link.download = `PalmPay-Training-Certificate-${date.replace(/\s/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
};

// RoundRect polyfill for older browsers
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
