// Dynamic Animation Injection
(function injectAnimations() {
    // 1. Inject the particles container
    if (!document.getElementById('tsparticles')) {
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'tsparticles';
        particlesDiv.className = 'particles-bg';
        // Insert as first child of body
        document.body.insertBefore(particlesDiv, document.body.firstChild);
    }

    // 2. Load required external libraries and our init script
    const scripts = [
        "https://cdn.jsdelivr.net/npm/tsparticles-preset-network@2/tsparticles.preset.network.bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js",
        "assets/init_animations.js"
    ];

    scripts.forEach(src => {
        if (!document.querySelector(`script[src="${src}"]`)) {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.body.appendChild(script);
        }
    });

    // 3. Add global CSS to hide old starfield and style new particles
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .starfield, .starfield-grey, .comet-layer, .stars, .comet-wrapper, .grey-nebula, .solar-glow {
                display: none !important;
            }
            #tsparticles {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 0;
                pointer-events: none;
                background: transparent;
            }
            /* Ensure content sits above particles */
            .container, section, nav, footer {
                position: relative;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    }
})();
