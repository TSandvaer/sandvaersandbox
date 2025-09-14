document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    function initCategoryFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-category');

                console.log('Filtering by:', filterValue); // Debug log

                projectCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    console.log(`Card ${index}: category="${cardCategory}", filter="${filterValue}"`); // Debug log

                    // Clear any existing inline styles that might interfere
                    card.style.opacity = '';
                    card.style.transform = '';

                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        // Add a slight delay for stagger effect
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        if (cardCategory === filterValue) {
                            card.classList.remove('hidden');
                            // Add a slight delay for stagger effect
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, index * 50);
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // Initialize category filtering
    initCategoryFiltering();

    // Navigation functionality with active state management
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Smooth scrolling for navigation links
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    let offsetTop;
                    if (targetId === 'home') {
                        // For home, scroll to top
                        offsetTop = 0;
                    } else {
                        // For other sections, account for navbar height
                        offsetTop = target.offsetTop - 100;
                    }

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active navigation link on scroll
        function updateActiveNav() {
            let current = 'home'; // Default to home
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // If we're at the very top, always set home as active
            if (scrollY < 100) {
                current = 'home';
            }
            // If we're near the bottom of the page, don't change from current selection
            else if (scrollY + windowHeight >= documentHeight - 50) {
                // Keep the current active or set to the last section
                const activeLink = document.querySelector('.nav-link.active');
                if (activeLink) {
                    current = activeLink.getAttribute('href').substring(1);
                } else {
                    current = 'projects'; // Default to projects if none active
                }
            } else {
                // Find the section that should be active based on scroll position
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionBottom = section.offsetTop + section.offsetHeight;

                    if (scrollY >= sectionTop && scrollY < sectionBottom) {
                        current = section.getAttribute('id');
                    }
                });
            }

            // Update active class
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Add scroll effect to navbar and update active nav
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active navigation
            updateActiveNav();
        });

        // Set initial active state on page load
        updateActiveNav();
    }

    // Initialize navigation
    initNavigation();

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
    const projectCards = document.querySelectorAll('.project-card');
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