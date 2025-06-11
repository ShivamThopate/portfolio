// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

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

// Project tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Clipboard functionality for package installation commands
const copyButtons = document.querySelectorAll('.copy-btn');
if (copyButtons.length > 0) {
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-clipboard-text');
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = 'var(--success)';

        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      });
    });
  });
}

// Navbar scroll effect

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
};

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

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
