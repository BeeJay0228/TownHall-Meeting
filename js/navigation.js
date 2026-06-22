/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Navigation System
   ============================================ */

const Nav = {
  currentSection: 'dashboard',
  isNavigating: false,

  init() {
    this.initMenuToggle();
    this.initNavLinks();
    this.initModuleNav();
    this.initContinueLearning();
    this.initScrollSpy();
    this.restoreLastSection();
  },

  /* --- HAMBURGER MENU TOGGLE --- */
  initMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('side-nav');
    const overlay = document.getElementById('nav-overlay');
    const close = document.getElementById('nav-close');

    const isDesktop = () => window.innerWidth >= 769;

    const openNav = () => {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      if (!isDesktop()) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      localStorage.setItem('sidebarOpen', 'true');
    };

    const closeNav = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (!isDesktop()) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
      localStorage.setItem('sidebarOpen', 'false');
    };

    toggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
    close.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Restore sidebar state from localStorage
    if (localStorage.getItem('sidebarOpen') === 'true') {
      openNav();
    }
  },

  /* --- NAVIGATION LINKS --- */
  initNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').slice(1);
        this.navigateTo(target);

        // Close nav
        const nav = document.getElementById('side-nav');
        const overlay = document.getElementById('nav-overlay');
        const toggle = document.getElementById('menu-toggle');
        nav.classList.remove('open');
        const isDesktop = window.innerWidth >= 769;
        if (!isDesktop) {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
        toggle.setAttribute('aria-expanded', 'false');
        localStorage.setItem('sidebarOpen', 'false');
      });
    });
  },

  /* --- MODULE PREV/NEXT NAVIGATION --- */
  initModuleNav() {
    document.querySelectorAll('.module-next, .module-prev').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        this.navigateTo(target);
      });
    });
  },

  /* --- CONTINUE LEARNING BUTTON --- */
  initContinueLearning() {
    const btn = document.getElementById('continue-learning');
    if (btn) {
      btn.addEventListener('click', () => {
        // Find first uncompleted module
        const nextModule = App.state.modules.find(m => !App.state.progress[m.id]);
        if (nextModule) {
          this.navigateTo(nextModule.id);
        } else {
          // All complete, go to completion
          this.navigateTo('completion');
        }
      });
    }
  },

  /* --- SCROLL SPY --- */
  initScrollSpy() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateActiveNavLink();
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    let current = 'dashboard';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        current = section.id;
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').slice(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  },

  /* --- NAVIGATE TO SECTION --- */
  navigateTo(target) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show target
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentSection = target;

      // Update URL hash
      history.pushState(null, '', '#' + target);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + target) {
          link.classList.add('active');
        }
      });

      // Mark as visited
      if (target.startsWith('module-')) {
        App.markModuleVisited(target);
      }

      // Animate counters if testimonials
      if (target === 'module-7') {
        this.animateCounters();
      }

      // Update dashboard
      App.updateDashboard();
    }

    setTimeout(() => {
      this.isNavigating = false;
    }, 300);
  },

  /* --- ANIMATED COUNTERS --- */
  animateCounters() {
    document.querySelectorAll('.earning-amount').forEach(el => {
      const target = parseInt(el.dataset.target);
      if (!target) return;
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
    });
  },

  /* --- RESTORE LAST SECTION --- */
  restoreLastSection() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      this.navigateTo(hash);
    }
  }
};
