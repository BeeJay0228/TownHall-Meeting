/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Main Application Logic
   ============================================ */

const App = {
  state: {
    modules: [
      { id: 'module-1', title: 'Understanding Aggregator Role', number: 1 },
      { id: 'module-2', title: 'PalmPay New Policy', number: 2 },
      { id: 'module-3', title: 'Profit Sharing Formula', number: 3 },
      { id: 'module-4', title: 'POS Purchase Model', number: 4 },
      { id: 'module-5', title: 'ROI Analysis', number: 5 },
      { id: 'module-6', title: 'Quality Agent Criteria', number: 6 },
      { id: 'module-7', title: 'Aggregator Success Stories', number: 7 },
      { id: 'module-8', title: 'Switching Inactive Agents', number: 8 },
      { id: 'module-9', title: 'POS Pool', number: 9 },
      { id: 'module-10', title: 'Agent Dashboard', number: 10 },
      { id: 'module-11', title: 'Agent Transaction Overview', number: 11 },
      { id: 'module-12', title: 'Managing Inactive Agents', number: 12 },
      { id: 'module-13', title: 'Commission Dashboard', number: 13 },
      { id: 'module-14', title: 'Self Check Feature', number: 14 }
    ],
    progress: {},
    quizScore: null,
    darkMode: false,
    bookmarkedModules: new Set(),
    visitedModules: new Set()
  },

  init() {
    this.loadState();
    this.initSplash();
    this.initDarkMode();
    this.initSearch();
    this.initBackToTop();
    this.initAccordions();
    this.initDecisionTree();
    this.initDashboardMock();
    this.initSelfCheck();
    this.renderModuleCards();
    this.updateDashboard();
  },

  /* --- LOCAL STORAGE --- */
  loadState() {
    try {
      const saved = localStorage.getItem('palmpayTrainingState');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.progress = parsed.progress || {};
        this.state.quizScore = parsed.quizScore || null;
        this.state.darkMode = parsed.darkMode || false;
        this.state.bookmarkedModules = new Set(parsed.bookmarkedModules || []);
        this.state.visitedModules = new Set(parsed.visitedModules || []);
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
  },

  saveState() {
    try {
      const data = {
        progress: this.state.progress,
        quizScore: this.state.quizScore,
        darkMode: this.state.darkMode,
        bookmarkedModules: Array.from(this.state.bookmarkedModules),
        visitedModules: Array.from(this.state.visitedModules)
      };
      localStorage.setItem('palmpayTrainingState', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  },

  /* --- SPLASH SCREEN --- */
  initSplash() {
    const splash = document.getElementById('splash-screen');
    const app = document.getElementById('app');
    setTimeout(() => {
      splash.classList.add('hidden');
      app.style.display = 'flex';
      document.body.style.overflow = '';
    }, 2500);
  },

  /* --- DARK MODE --- */
  initDarkMode() {
    const toggle = document.getElementById('dark-toggle');
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');

    if (this.state.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      sun.style.display = 'none';
      moon.style.display = 'block';
    }

    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        sun.style.display = 'block';
        moon.style.display = 'none';
        this.state.darkMode = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        sun.style.display = 'none';
        moon.style.display = 'block';
        this.state.darkMode = true;
      }
      this.saveState();
    });
  },

  /* --- SEARCH --- */
  initSearch() {
    const toggle = document.getElementById('search-toggle');
    const bar = document.getElementById('search-bar');
    const close = document.getElementById('search-close');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    toggle.addEventListener('click', () => {
      const isOpen = bar.style.display !== 'none';
      bar.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) {
        input.focus();
        input.value = '';
        results.innerHTML = '';
      }
    });

    close.addEventListener('click', () => {
      bar.style.display = 'none';
      input.value = '';
      results.innerHTML = '';
    });

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      if (!query) {
        results.innerHTML = '';
        return;
      }

      const searchData = [
        { title: 'Understanding Aggregator Role', module: 'module-1', keywords: 'aggregator, role, responsibilities, recruit, manage' },
        { title: 'PalmPay New Policy', module: 'module-2', keywords: 'new policy, profit sharing, commission, mmod, old model' },
        { title: 'Profit Sharing Formula', module: 'module-3', keywords: 'profit share, formula, calculator, 45%, 35%, 70%' },
        { title: 'POS Purchase Model', module: 'module-4', keywords: 'purchase, pos, smart pos, mf960, cost, ownership' },
        { title: 'ROI Analysis', module: 'module-5', keywords: 'roi, return, investment, earnings, break-even, 6.8x' },
        { title: 'Quality Agent Criteria', module: 'module-6', keywords: 'quality agent, kpi, performance, daily, target' },
        { title: 'Aggregator Success Stories', module: 'module-7', keywords: 'success, stories, testimonials, earnings, commission' },
        { title: 'Switching Existing Agents', module: 'module-8', keywords: 'switch, inactive, interested, not interested, unbind' },
        { title: 'POS Pool', module: 'module-9', keywords: 'pool, claim agent, direct sales, zero cost' },
        { title: 'Agent Dashboard', module: 'module-10', keywords: 'dashboard, focus, tpv, high value, inactive, ranking' },
        { title: 'Agent Transaction Overview', module: 'module-11', keywords: 'transaction, overview, value, count, woh, mom, tags' },
        { title: 'Managing Inactive Agents', module: 'module-12', keywords: 'inactive, decision tree, faulty, coach, retrieve' },
        { title: 'Commission Dashboard', module: 'module-13', keywords: 'commission, balance, settlement, d+1, ta, 60%' },
        { title: 'Self Check Feature', module: 'module-14', keywords: 'self check, diagnostic, card, printing, screen, camera, network' },
        { title: 'Knowledge Assessment', module: 'quiz', keywords: 'quiz, assessment, test, questions, certificate' },
        { title: 'FAQ', module: 'faq', keywords: 'faq, questions, answers, help, support' }
      ];

      const matches = searchData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.includes(query)
      );

      results.innerHTML = matches.map(m => `
        <div class="search-result-item" data-module="${m.module}">
          <h4>${m.title}</h4>
          <p>${m.keywords.split(', ').slice(0, 3).join(', ')}</p>
        </div>
      `).join('');

      results.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          Nav.navigateTo(el.dataset.module);
          bar.style.display = 'none';
          input.value = '';
          results.innerHTML = '';
        });
      });
    });
  },

  /* --- BACK TO TOP --- */
  initBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /* --- ACCORDIONS --- */
  initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const body = header.nextElementSibling;

        header.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
          body.classList.add('open');
        } else {
          body.classList.remove('open');
        }
      });
    });
  },

  /* --- DECISION TREE (Module 12) --- */
  initDecisionTree() {
    const tree = document.getElementById('decision-tree');
    if (!tree) return;

    tree.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-decision');
      if (btn) {
        const next = btn.dataset.next;
        const currentNode = btn.closest('.decision-node');
        const nextNode = tree.querySelector(`[data-node="${next}"]`);
        if (currentNode) currentNode.style.display = 'none';
        if (nextNode) nextNode.style.display = 'block';
      }

      const reset = e.target.closest('.decision-reset');
      if (reset) {
        tree.querySelectorAll('.decision-node').forEach(node => {
          node.style.display = 'none';
        });
        const start = tree.querySelector('[data-node="start"]');
        if (start) start.style.display = 'block';
      }
    });
  },

  /* --- DASHBOARD MOCK (Module 10) --- */
  initDashboardMock() {
    const container = document.getElementById('dashboard-mock');
    const info = document.getElementById('dashboard-info');
    if (!container || !info) return;

    container.querySelectorAll('.mock-card').forEach(card => {
      card.addEventListener('click', () => {
        const text = card.dataset.info || 'Click on any card to learn more.';
        info.innerHTML = `<p>${text}</p>`;
        info.style.background = 'var(--primary-bg)';
      });
    });
  },

  /* --- SELF CHECK (Module 14) --- */
  initSelfCheck() {
    const btn = document.getElementById('run-self-check');
    const results = document.getElementById('self-check-results');
    const actions = document.getElementById('self-check-actions');
    if (!btn || !results) return;

    btn.addEventListener('click', () => {
      results.style.display = 'block';
      actions.style.display = 'none';
      const items = results.querySelectorAll('.check-item');
      const checks = ['card', 'printing', 'screen', 'camera', 'network'];
      const statuses = ['normal', 'normal', 'normal', 'normal', 'normal'];

      // Simulate occasional issue
      statuses[Math.floor(Math.random() * 5)] = 'issue';

      items.forEach((item, i) => {
        const status = item.querySelector('.check-status');
        status.textContent = 'Checking...';
        status.className = 'check-status pending';
      });

      checks.forEach((check, i) => {
        setTimeout(() => {
          const item = results.querySelector(`[data-check="${check}"]`);
          if (item) {
            const status = item.querySelector('.check-status');
            const result = statuses[i];
            status.textContent = result === 'normal' ? 'Normal' : 'Issue Detected';
            status.className = `check-status ${result}`;
          }

          if (i === checks.length - 1) {
            const hasIssue = statuses.some(s => s === 'issue');
            if (hasIssue) {
              actions.style.display = 'block';
            }
          }
        }, (i + 1) * 600);
      });
    });
  },

  /* --- RENDER MODULE CARDS --- */
  renderModuleCards() {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    const moduleDescriptions = {
      'module-1': 'Learn about the Aggregator role and responsibilities',
      'module-2': 'Understand the new profit sharing policy',
      'module-3': 'Calculate your earnings with profit sharing',
      'module-4': 'Purchase POS terminals with full ownership',
      'module-5': 'See the ROI comparison with other models',
      'module-6': 'Daily performance targets for quality agents',
      'module-7': 'Real agents earning real profits',
      'module-8': 'Switch inactive agents to new policy',
      'module-9': 'Claim agents from POS Pool',
      'module-10': 'Monitor and manage your agent network',
      'module-11': 'View detailed transaction data',
      'module-12': 'Interactive decision tree for inactive agents',
      'module-13': 'Track all commission streams',
      'module-14': 'Run POS diagnostics'
    };

    grid.innerHTML = this.state.modules.map(m => {
      const completed = this.state.progress[m.id];
      const visited = this.state.visitedModules.has(m.id);
      const bookmarked = this.state.bookmarkedModules.has(m.id);
      const statusClass = completed ? 'completed' : (visited ? 'active-module' : '');
      const statusIcon = completed ? '✅' : (bookmarked ? '🔖' : (visited ? '📖' : '🔒'));

      return `
        <div class="module-card ${statusClass}" data-module="${m.id}">
          <div class="module-card-number">${m.number}</div>
          <div class="module-card-info">
            <div class="module-card-title">${m.title}</div>
            <div class="module-card-desc">${moduleDescriptions[m.id] || 'Training module'}</div>
          </div>
          <div class="module-card-status">${statusIcon}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', () => {
        Nav.navigateTo(card.dataset.module);
      });
    });
  },

  /* --- UPDATE DASHBOARD --- */
  updateDashboard() {
    const total = this.state.modules.length;
    const completed = Object.values(this.state.progress).filter(v => v).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const completionEl = document.getElementById('completion-percent');
    const completedEl = document.getElementById('completed-modules');
    const timeEl = document.getElementById('estimated-time');
    const quizScoreEl = document.getElementById('quiz-score');
    const navProgressFill = document.getElementById('nav-progress-fill');
    const navProgressText = document.getElementById('nav-progress-text');

    if (completionEl) completionEl.textContent = percent + '%';
    if (completedEl) completedEl.textContent = completed;
    if (timeEl) timeEl.textContent = `${completed * 3 + 45} min`;
    if (quizScoreEl) quizScoreEl.textContent = this.state.quizScore !== null ? this.state.quizScore + '%' : '--';
    if (navProgressFill) navProgressFill.style.width = percent + '%';
    if (navProgressText) navProgressText.textContent = percent + '%';
  },

  /* --- MARK MODULE COMPLETED --- */
  markModuleComplete(moduleId) {
    this.state.progress[moduleId] = true;
    this.state.visitedModules.add(moduleId);
    this.saveState();
    this.renderModuleCards();
    this.updateDashboard();
    Progress.update();
  },

  /* --- MARK MODULE VISITED --- */
  markModuleVisited(moduleId) {
    this.state.visitedModules.add(moduleId);
    this.saveState();
    this.renderModuleCards();
  }
};

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  Nav.init();
  Progress.init();
  Calculator.init();
  Quiz.init();
  Certificate.init();
});
