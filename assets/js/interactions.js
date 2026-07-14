/**
 * Portfolio Premium Interactions — interactions.js
 * Pure vanilla JS. Zero dependencies. ~450 lines.
 *
 * Systems:
 *  1. Page Loader
 *  2. Custom Cursor (desktop)
 *  3. Scroll Reveal (Intersection Observer)
 *  4. Navbar Hide/Show on scroll
 *  5. Hero Typing Effect
 *  6. Hero Mouse-Follow Glow (desktop)
 *  7. Button Ripple Effect
 *  8. Magnetic Buttons (desktop)
 *  9. Card 3D Tilt (desktop)
 * 10. Floating Labels (contact form)
 * 11. Toast Notification System
 * 12. Scroll Indicator
 * 13. Social Icon Animations
 */

(function Portfolio() {
  'use strict';

  // ── Feature Flags ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ═══════════════════════════════════════════
  // 1. Page Loader
  // ═══════════════════════════════════════════
  function initPageLoader() {
    // Inject loader DOM
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);

    window.addEventListener('load', () => {
      // Small delay so the spinner is visible even on fast loads
      setTimeout(() => loader.classList.add('loaded'), 200);
      // Remove from DOM after transition
      setTimeout(() => loader.remove(), 800);
    });
  }

  // ═══════════════════════════════════════════
  // 2. Custom Cursor
  // ═══════════════════════════════════════════
  function initCustomCursor() {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');

    document.body.append(dot, ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
    }, { passive: true });

    // Ring follows with lag (lerp via rAF)
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    // Hover-expand on interactive elements
    const hoverTargets = 'a, button, .btn, .tech-card, .package-card, .exp-card, .nav-link, .logo, .menu-toggle, input, textarea, .tab-button, .copy-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      }
    }, { passive: true });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    }, { passive: true });

    // Hide when cursor leaves the window
    document.addEventListener('mouseleave', () => {
      dot.classList.add('cursor-hidden');
      ring.classList.add('cursor-hidden');
    });
  }

  // ═══════════════════════════════════════════
  // 3. Scroll Reveal (Intersection Observer)
  // ═══════════════════════════════════════════
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // ═══════════════════════════════════════════
  // 4. Navbar Hide/Show on Scroll
  // ═══════════════════════════════════════════
  function initNavbarHideShow() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down — hide navbar
        navbar.classList.add('navbar--hidden');
      } else {
        // Scrolling up — show navbar
        navbar.classList.remove('navbar--hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // 5. Hero Typing Effect
  // ═══════════════════════════════════════════
  function initHeroTypingEffect() {
    const target = document.querySelector('.hero-positioning');
    if (!target) return;

    const roles = [
      'AI & ML Specialist',
      'Full-Stack Developer',
      'Agentic AI Builder',
      'React Developer',
      'Computer Vision Engineer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;

    // Store original text and create typing span
    target.textContent = '';
    target.classList.add('typing-cursor');

    function type() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        target.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          // Finished typing — pause then delete
          isDeleting = true;
          setTimeout(type, pauseAfterType);
          return;
        }
        setTimeout(type, typeSpeed);
      } else {
        target.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting — move to next role
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, pauseAfterDelete);
          return;
        }
        setTimeout(type, deleteSpeed);
      }
    }

    // Start after a brief delay
    setTimeout(type, 1000);
  }

  // ═══════════════════════════════════════════
  // 6. Hero Mouse-Follow Glow
  // ═══════════════════════════════════════════
  function initHeroMouseGlow() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const glow = document.createElement('div');
    glow.className = 'hero-glow-follow';
    glow.setAttribute('aria-hidden', 'true');
    hero.appendChild(glow);

    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
    hero.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });

    function animateGlow() {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.transform = `translate(${glowX - 175}px, ${glowY - 175}px)`;
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  // ═══════════════════════════════════════════
  // 7. Button Ripple Effect
  // ═══════════════════════════════════════════
  function initButtonRipple() {
    // Event delegation on body for all .btn clicks
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // ═══════════════════════════════════════════
  // 8. Magnetic Buttons (Desktop)
  // ═══════════════════════════════════════════
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .logo');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Subtle pull — max 4px
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ═══════════════════════════════════════════
  // 9. Card 3D Tilt (Desktop)
  // ═══════════════════════════════════════════
  function initCardTilt() {
    const cards = document.querySelectorAll('.package-card, .tech-card, .exp-card');

    cards.forEach(card => {
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * -10; // ±5deg
        const tiltY = (x - 0.5) * 10;

        card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ═══════════════════════════════════════════
  // 10. Floating Labels (Contact Form)
  // ═══════════════════════════════════════════
  function initFloatingLabels() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      // Ensure placeholder is a space (needed for :placeholder-shown)
      if (!input.placeholder || input.placeholder.trim() === '') {
        input.placeholder = ' ';
      }

      // Add focus glow
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }

  // ═══════════════════════════════════════════
  // 11. Toast Notification System
  // ═══════════════════════════════════════════
  let toastTimeout = null;

  function showToast(message, icon = 'fa-check') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    if (toastTimeout) clearTimeout(toastTimeout);

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<i class="fas ${icon} toast-icon"></i>${message}`;
    document.body.appendChild(toast);

    // Trigger reflow then show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
      });
    });

    // Auto-hide after 3 seconds
    toastTimeout = setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // Upgrade existing clipboard buttons to use toast
  function upgradeClipboardToasts() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      // Clone to remove existing listeners
      const newBtn = button.cloneNode(true);
      button.parentNode.replaceChild(newBtn, button);

      newBtn.addEventListener('click', () => {
        const textToCopy = newBtn.getAttribute('data-clipboard-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Copied to clipboard!', 'fa-clipboard-check');
        });
      });
    });
  }

  // ═══════════════════════════════════════════
  // 12. Scroll Indicator
  // ═══════════════════════════════════════════
  function initScrollIndicator() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.innerHTML = '<span>Scroll</span><i class="fas fa-chevron-down"></i>';
    hero.appendChild(indicator);

    // Fade out after first scroll
    let hidden = false;
    window.addEventListener('scroll', () => {
      if (!hidden && window.scrollY > 100) {
        indicator.style.opacity = '0';
        hidden = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // 13. Auto-Add Reveal Classes
  // ═══════════════════════════════════════════
  function autoAddRevealClasses() {
    // Section titles
    document.querySelectorAll('.section-title').forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', '0s');
      }
    });

    // About content
    document.querySelectorAll('.about-content').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    // Package/project cards with stagger
    document.querySelectorAll('.package-card').forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 0.12}s`);
      }
    });

    // Tech cards with stagger
    document.querySelectorAll('.tech-card').forEach((el, i) => {
      if (!el.classList.contains('reveal-scale')) {
        el.classList.add('reveal-scale');
        el.style.setProperty('--reveal-delay', `${i * 0.06}s`);
      }
    });

    // Experience cards
    document.querySelectorAll('.exp-card').forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 0.1}s`);
      }
    });

    // Contact boxes
    document.querySelectorAll('.contact-info-box, .contact-form-box').forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${i * 0.15}s`);
      }
    });

    // Hero content and image
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && !heroContent.classList.contains('reveal-left')) {
      heroContent.classList.remove('fade-in');
      heroContent.classList.add('reveal-left');
    }
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !heroImage.classList.contains('reveal-right')) {
      heroImage.classList.remove('fade-in');
      heroImage.classList.add('reveal-right');
    }
  }

  // ═══════════════════════════════════════════
  // BOOT
  // ═══════════════════════════════════════════
  if (!prefersReducedMotion) {
    initPageLoader();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Auto-add reveal classes to existing elements
    autoAddRevealClasses();

    // Always-on systems
    initScrollReveal();
    initButtonRipple();
    initFloatingLabels();
    upgradeClipboardToasts();

    // Delayed init for components loaded dynamically
    // (navbar/footer are loaded via fetch in components.js)
    setTimeout(() => {
      initNavbarHideShow();
      initScrollIndicator();

      // Re-run reveal for dynamically loaded content
      initScrollReveal();
    }, 500);

    // Desktop-only systems (skip on touch / reduced-motion)
    if (isDesktop && !prefersReducedMotion) {
      initCustomCursor();
      initHeroMouseGlow();
      initMagneticButtons();
      initCardTilt();
      initHeroTypingEffect();
    } else if (!prefersReducedMotion) {
      // Mobile: typing effect still works
      initHeroTypingEffect();
    }
  });

  // Expose toast globally for potential use
  window.showToast = showToast;

})();
