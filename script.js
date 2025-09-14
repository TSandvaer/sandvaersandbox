document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-category');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar (matching sandvaer.dk)
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effects and animations
    const projectCards_hover = document.querySelectorAll('.project-card');
    projectCards_hover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add stagger animation on load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    // Initially hide cards for animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // View Code button functionality
    const viewCodeButtons = document.querySelectorAll('.btn-secondary');
    viewCodeButtons.forEach(button => {
        if (button.textContent === 'View Code') {
            button.addEventListener('click', function() {
                const projectCard = this.closest('.project-card');
                const projectTitle = projectCard.querySelector('h3').textContent;

                // Handle different projects
                if (projectTitle === 'Flaming Pong') {
                    // Open the source code viewer in a new window
                    window.open('games/flaming-pong/view-source.html', '_blank');
                } else {
                    // For other projects, show a coming soon message
                    alert(`Source code for ${projectTitle} will be available soon!`);
                }
            });
        }
    });

    // Enhanced parallax effects for multiple elements
    function initParallaxEffects() {
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };

        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const geometricShapes = document.querySelectorAll('.geometric-shape');
            const floatingPatterns = document.querySelector('.floating-patterns');

            // Hero parallax - only apply transform, don't interfere with background patterns
            if (hero && scrolled < hero.offsetHeight) {
                // Apply transform only to hero-content, not the entire hero section
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
            }

            // Geometric shapes parallax with different speeds
            geometricShapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05); // Different speeds for each shape
                const yPos = -(scrolled * speed);
                const rotation = scrolled * (0.02 + index * 0.01);

                // Apply parallax transform while preserving base transform
                shape.style.transform += ` translateY(${yPos}px) rotate(${rotation}deg)`;
            });

            // Background patterns subtle movement
            if (floatingPatterns) {
                const moveX = Math.sin(scrolled * 0.001) * 10;
                const moveY = scrolled * 0.05;
                floatingPatterns.style.transform = `translate(${moveX}px, ${-moveY}px)`;
            }

            // Background layer parallax
            document.body.style.backgroundPosition = `${scrolled * 0.1}px ${scrolled * 0.05}px`;

        }, 16));
    }

    // Initialize parallax effects
    initParallaxEffects();

    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = () => {
        // Future implementation for mobile menu
    };
});