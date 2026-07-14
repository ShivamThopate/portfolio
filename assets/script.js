// Mobile menu toggle (handled by component loader)
// This functionality is now managed by assets/components.js

// Animation injection removed — now handled by assets/js/interactions.js

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

// Navbar scroll effect (handled by component loader)
// This functionality is now managed by assets/components.js

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// Scroll reveal animations are now handled via IntersectionObserver in interactions.js

// Star drift direction: even days = left-to-right, odd days = right-to-left
(function setStarDirection() {
  if (new Date().getDate() % 2 === 0) {
    document.body.classList.add('stars-move-right');
  }
})();

// Comet system — fires every 1–3 minutes, sometimes 2 at once
(function initCometSystem() {
  const layer = document.getElementById('comet-layer');
  if (!layer) return;

  function spawnComet() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const diagLen = Math.sqrt(vw * vw + vh * vh);

    // Spawn from a random edge: 0=top, 1=right, 2=bottom, 3=left
    const edge = Math.floor(Math.random() * 4);
    let startX, startY, angleDeg;

    if (edge === 0) {
      // Top edge — travel diagonally downward
      startX = Math.random() * vw;
      startY = 0;
      angleDeg = 60 + Math.random() * 60;   // 60–120° (mostly downward)
    } else if (edge === 1) {
      // Right edge — travel diagonally leftward
      startX = vw;
      startY = Math.random() * vh;
      angleDeg = 150 + Math.random() * 60;  // 150–210° (mostly leftward)
    } else if (edge === 2) {
      // Bottom edge — travel diagonally upward
      startX = Math.random() * vw;
      startY = vh;
      angleDeg = 240 + Math.random() * 60;  // 240–300° (mostly upward)
    } else {
      // Left edge — travel diagonally rightward
      startX = 0;
      startY = Math.random() * vh;
      angleDeg = 330 + Math.random() * 60;  // 330–390°→30° (mostly rightward)
    }

    const travelDist = diagLen * (0.5 + Math.random() * 0.4);
    const duration = 1.2 + Math.random() * 1.4;

    const wrapper = document.createElement('div');
    wrapper.className = 'comet-wrapper';
    wrapper.style.left = startX + 'px';
    wrapper.style.top = startY + 'px';
    wrapper.style.transform = 'rotate(' + angleDeg + 'deg)';

    const comet = document.createElement('div');
    comet.className = 'comet';
    comet.style.setProperty('--comet-travel', travelDist + 'px');
    comet.style.setProperty('--comet-duration', duration + 's');

    wrapper.appendChild(comet);
    layer.appendChild(wrapper);
    comet.addEventListener('animationend', function() { wrapper.remove(); });
  }

  function scheduleNext() {
    // 1 to 3 minutes
    const delay = 60000 + Math.random() * 120000;
    setTimeout(function() {
      spawnComet();
      // 35% chance: fire a second comet 0.6–2s later
      if (Math.random() < 0.35) {
        setTimeout(spawnComet, 600 + Math.random() * 1400);
      }
      scheduleNext();
    }, delay);
  }

  // First comet after 6–12 seconds so the page has settled
  setTimeout(function() {
    spawnComet();
    scheduleNext();
  }, 6000 + Math.random() * 6000);
})();
