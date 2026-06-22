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
    this.initSwipeNavigation();
    this.restoreLastSection();
  },

  /* --- HAMBURGER MENU TOGGLE --- */
  initMenuToggle() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('side-nav');
    const overlay = document.getElementById('nav-overlay');
    const close = document.getElementById('nav-close');

    const openNav = () => {
      nav.classList.add('open');
      overlay.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', openNav);
    close.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });
  },

  /* --- NAVIGATION LINKS --- */
  initNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').slice(1);
        this.navigateTo(target);

        // Close mobile nav
        const nav = document.getElementById('side-nav');
        const overlay = document.getElementById('nav-overlay');
        const toggle = document.getElementById('menu-toggle');
        nav.classList.remove('open');
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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

  /* --- SWIPE NAVIGATION (Mobile) --- */
  initSwipeNavigation() {
    const main = document.getElementById('main-content');

    main.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    main.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  },

  handleSwipe() {
    const threshold = 80;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > threshold) {
      const sections = App.state.modules;
      const currentIndex = sections.findIndex(m => m.id === this.currentSection);
      if (currentIndex === -1) return;

      if (diff > 0 && currentIndex < sections.length - 1) {
        // Swipe left - next
        this.navigateTo(sections[currentIndex + 1].id);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        this.navigateTo(sections[currentIndex - 1].id);
      }
    }
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
