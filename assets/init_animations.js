// Initialize tsParticles
window.addEventListener('DOMContentLoaded', () => {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            background: {
                color: "transparent"
            },
            particles: {
                color: {
                    value: ["#ffffff", "#00f0ff", "#d4a574"]
                },
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: { min: 0.1, max: 0.8 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false
                    }
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 0.3,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    }
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            detectRetina: true
        });
    }

    // Initialize VanillaTilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
        
        VanillaTilt.init(document.querySelectorAll(".tech-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            scale: 1.05
        });
    }
});
