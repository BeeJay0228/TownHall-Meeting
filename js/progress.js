/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Progress Tracking System
   ============================================ */

const Progress = {
  moduleElements: {},

  init() {
    this.initModuleTracking();
    this.initScrollTracking();
  },

  initModuleTracking() {
    // Track when user scrolls to bottom of each module section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target.closest('.section');
          if (section && section.id.startsWith('module-')) {
            // Auto-mark as visited when scrolled to
            App.markModuleVisited(section.id);
          }
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section[data-section^="module-"]').forEach(section => {
      const marker = document.createElement('div');
      marker.className = 'sr-only';
      marker.setAttribute('aria-hidden', 'true');
      section.appendChild(marker);
      observer.observe(marker);
    });

    // Module next button tracking
    document.querySelectorAll('.module-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.closest('.section');
        if (section && section.id.startsWith('module-')) {
          App.markModuleComplete(section.id);
        }
      });
    });
  },

  initScrollTracking() {
    // Track reading progress per module
    let scrollTimeouts = {};
    window.addEventListener('scroll', () => {
      const visibleSection = this.getVisibleSection();
      if (visibleSection && visibleSection.id.startsWith('module-')) {
        clearTimeout(scrollTimeouts[visibleSection.id]);
        scrollTimeouts[visibleSection.id] = setTimeout(() => {
          // Mark as visited after 5 seconds of viewing
          App.markModuleVisited(visibleSection.id);
        }, 5000);
      }
    }, { passive: true });
  },

  getVisibleSection() {
    const sections = document.querySelectorAll('.section.active');
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return section;
      }
    }
    return null;
  },

  update() {
    // Update progress display
    App.updateDashboard();
  },

  getCompletionData() {
    const total = App.state.modules.length;
    const completed = Object.values(App.state.progress).filter(v => v).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      percent,
      modules: App.state.modules.map(m => ({
        ...m,
        completed: !!App.state.progress[m.id],
        visited: App.state.visitedModules.has(m.id)
      }))
    };
  }
};
