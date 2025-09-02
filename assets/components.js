// Component Loader for Navbar and Footer
class ComponentLoader {
  constructor() {
    this.components = {};
  }

  // Load a component from an HTML file
  async loadComponent(name, selector) {
    try {
      const response = await fetch(`${name}.html`);
      if (!response.ok) {
        console.error(`Error loading component ${name}: Failed to load ${name}.html`);
        return;
      }
      const html = await response.text();
      this.components[name] = html;
      
      // Insert the component into the specified selector
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.innerHTML = html;
        
        // Re-initialize any scripts that need to run after component insertion
        this.initializeComponentScripts(name);
      }
    } catch (error) {
      console.error(`Error loading component ${name}:`, error);
    }
  }

  // Initialize scripts for specific components
  initializeComponentScripts(componentName) {
    if (componentName === 'navbar') {
      this.initializeNavbarScripts();
    } else if (componentName === 'footer') {
      this.initializeFooterScripts();
    }
  }

  // Initialize navbar-specific scripts
  initializeNavbarScripts() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        });
      });
    }

    // Navbar scroll effect with professional timing
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Set active navigation link based on current page
    this.setActiveNavLink();
    
    // Initialize section highlighting for single-page navigation
    this.initializeSectionHighlighting();
    
    // Initialize keyboard navigation
    this.initializeKeyboardNavigation();
  }

  // Initialize section highlighting with Intersection Observer
  initializeSectionHighlighting() {
    const sections = document.querySelectorAll('section[id], .section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Update active section highlighting
  updateActiveSection(activeSectionId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove active class from all section links
      if (href && href.startsWith('#')) {
        link.classList.remove('active');
      }
      
      // Add active class to matching section link
      if (href === `#${activeSectionId}`) {
        // Use setTimeout to ensure smooth transition timing
        setTimeout(() => {
          link.classList.add('active');
        }, 50);
      }
    });
  }

  // Initialize keyboard navigation support
  initializeKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo');
    const menuToggle = document.getElementById('mobile-menu');
    
    // Make all navigation elements keyboard accessible
    const focusableElements = [logo, ...navLinks, menuToggle].filter(Boolean);
    
    focusableElements.forEach((element, index) => {
      // Ensure elements are tabbable
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
      
      // Add keyboard event listeners
      element.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            element.click();
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextElement(focusableElements, index);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            this.focusPreviousElement(focusableElements, index);
            break;
          case 'Home':
            e.preventDefault();
            focusableElements[0].focus();
            break;
          case 'End':
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
            break;
        }
      });
    });
  }

  // Focus next element in navigation
  focusNextElement(elements, currentIndex) {
    const nextIndex = (currentIndex + 1) % elements.length;
    elements[nextIndex].focus();
  }

  // Focus previous element in navigation
  focusPreviousElement(elements, currentIndex) {
    const prevIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
    elements[prevIndex].focus();
  }

  // Initialize footer-specific scripts
  initializeFooterScripts() {
    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollToTopButton.classList.add('visible');
        } else {
          scrollToTopButton.classList.remove('visible');
        }
      });

      // Scroll to top when button is clicked
      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Update copyright year in footer
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear();
    }
  }

  // Set active navigation link based on current page
  setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Only remove active class from page links, not section links
      if (href && !href.startsWith('#')) {
        link.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage) {
          link.classList.add('active');
        }
      }
    });
  }

  // Load all components
  async loadAllComponents() {
    await Promise.all([
      this.loadComponent('navbar', '#navbar-placeholder'),
      this.loadComponent('footer', '#footer-placeholder')
    ]);
  }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new ComponentLoader();
  loader.loadAllComponents();
}); 