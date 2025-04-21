$(document).ready(function() {
    initLoadingScreen();
    
    $(window).on('load', function() {
        setTimeout(function() {
            completeLoading();
        }, 800);
    });
    
    initBubbleAnimation();
    initFloatingElements();
    initMouseFollowEffect();
    initTextAnimate();
    initCustomCursor();
    initThemeToggle();
    initMobileMenu();
    initPortfolioFilters();
    initContactForm();
    initEnhancedPortfolio();
    initSmoothScrolling();
    initTestimonialsSlider();
    initScrollEffects();
    initScrollProgress();
    
    setTimeout(function() {
        initPageTransitions();
    }, 1200);
});

function initLoadingScreen() {
    const loadingWrapper = document.querySelector('.loading-wrapper');
    const loadingProgressValue = document.querySelector('.loading-progress-value');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingTextSpans = document.querySelectorAll('.loading-text span');
    
    if (loadingWrapper && loadingProgressValue) {
        loadingWrapper.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add extra animation to loading text
        if (loadingTextSpans.length) {
            loadingTextSpans.forEach((span, index) => {
                span.style.opacity = '0';
                setTimeout(() => {
                    span.style.opacity = '1';
                }, index * 150);
            });
        }
        
        let progress = 0;
        const interval = setInterval(function() {
            progress += Math.random() * 8;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
            }
            
            const roundedProgress = Math.floor(progress);
            loadingProgressValue.style.width = roundedProgress + '%';
            if (loadingPercentage) {
                loadingPercentage.textContent = roundedProgress + '%';
            }
        }, 120);
    }
}

function completeLoading() {
    const loadingWrapper = document.querySelector('.loading-wrapper');
    const loadingProgressValue = document.querySelector('.loading-progress-value');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    if (loadingWrapper && loadingProgressValue) {
        loadingProgressValue.style.width = '100%';
        if (loadingPercentage) {
            loadingPercentage.textContent = '100%';
        }
        
        setTimeout(function() {
            loadingWrapper.classList.add('hidden');
            document.body.classList.add('content-loaded');
            
            setTimeout(function() {
                loadingWrapper.style.display = 'none';
                document.body.style.overflow = '';
                
                initEntranceAnimations();
                
                // Activate bubble floating effects after loading
                const bubbles = document.querySelectorAll('.bubble');
                if (bubbles.length) {
                    bubbles.forEach(bubble => {
                        bubble.style.opacity = '1';
                    });
                }
            }, 500);
        }, 300);
    }
}

function initBubbleAnimation() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create bubble container
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'bubble-animation';
        
        // Create multiple bubbles
        for (let i = 1; i <= 8; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubbleContainer.appendChild(bubble);
        }
        
        // Add to hero section
        heroSection.prepend(bubbleContainer);
    }
}

function initEntranceAnimations() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.classList.add('visible');
        }, 1000);
        
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const transition = document.querySelector('.page-transition');
                    if (transition) {
                        transition.classList.add('transitioning-in');
                        
                        setTimeout(() => {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                            
                            setTimeout(() => {
                                transition.classList.remove('transitioning-in');
                                transition.classList.add('transitioning-out');
                                
                                setTimeout(() => {
                                    transition.classList.remove('transitioning-out');
                                }, 500);
                            }, 500);
                        }, 300);
                    } else {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
}

function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (slides.length && dots.length) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            
            slides.forEach((slide, i) => {
                if (i === currentSlide) {
                    slide.className = 'testimonial-slide active';
                } else if (i < currentSlide) {
                    slide.className = 'testimonial-slide previous';
                } else {
                    slide.className = 'testimonial-slide next';
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
        
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
}

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animatedElements = entry.target.querySelectorAll(
                    '.animate-in-up, .animate-in-down, .animate-in-left, .animate-in-right, .animate-in-scale'
                );
                
                animatedElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    document.documentElement.classList.add('color-theme-in-transition');
    
    themeToggle.addEventListener('click', (e) => {
        const newTheme = document.body.getAttribute('data-theme') === 'light' 
            ? 'dark' 
            : 'light';
        
        document.documentElement.classList.add('color-theme-in-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('color-theme-in-transition');
        }, 1000);
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        createRippleEffect(themeToggle, e);
        
        if (newTheme === 'dark') {
            animateDarkModeTransition();
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    
    icon.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
    icon.style.opacity = '0';
    icon.style.transform = 'rotate(180deg)';
    
    setTimeout(() => {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        icon.style.opacity = '1';
        icon.style.transform = 'rotate(0)';
    }, 300);
}

function createRippleEffect(element, e) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    const x = e ? (e.clientX - rect.left) : (rect.width / 2);
    const y = e ? (e.clientY - rect.top) : (rect.height / 2);
    
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.position = 'absolute';
    ripple.style.top = y + 'px';
    ripple.style.left = x + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function animateDarkModeTransition() {
    const stars = [];
    const container = document.createElement('div');
    container.className = 'stars-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    
    document.body.appendChild(container);
    
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleRect = themeToggle.getBoundingClientRect();
    const centerX = toggleRect.left + toggleRect.width / 2;
    const centerY = toggleRect.top + toggleRect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 5 + 3;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1 + 0.5;
        const delay = Math.random() * 0.3;
        
        star.style.position = 'absolute';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.borderRadius = '50%';
        star.style.backgroundColor = '#818cf8';
        star.style.boxShadow = '0 0 10px #4f46e5';
        star.style.top = centerY + 'px';
        star.style.left = centerX + 'px';
        star.style.opacity = '0';
        star.style.transform = 'translate(-50%, -50%)';
        star.style.transition = `all ${duration}s ease-out ${delay}s`;
        
        container.appendChild(star);
        stars.push({
            element: star,
            targetX: Math.cos(angle) * distance,
            targetY: Math.sin(angle) * distance,
        });
    }
    
    setTimeout(() => {
        stars.forEach(star => {
            star.element.style.opacity = '1';
            star.element.style.transform = `translate(calc(-50% + ${star.targetX}px), calc(-50% + ${star.targetY}px))`;
        });
        
        setTimeout(() => {
            stars.forEach(star => {
                star.element.style.opacity = '0';
            });
            
            setTimeout(() => {
                container.remove();
            }, 1000);
        }, 800);
    }, 10);
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const formGroups = document.querySelectorAll('.form-group');
    
    if (!form) return;
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input && input.value.trim() !== '') {
            group.classList.add('has-value');
        }
        
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('is-focused');
            });
            
            input.addEventListener('blur', () => {
                group.classList.remove('is-focused');
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
                
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (group.classList.contains('has-error')) {
                    validateInput(input);
                }
            });
        }
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.innerHTML = '<span class="submit-spinner"></span> Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            form.classList.add('form-success');
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.classList.remove('is-loading');
            submitButton.classList.add('is-success');
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-paper-plane"></i> Thank you for your message! I\'ll get back to you soon.';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            
            form.appendChild(successMessage);
            
            createConfetti(form);
            
            setTimeout(() => {
                successMessage.style.transition = 'all 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 100);
            
            form.reset();
            formGroups.forEach(group => {
                group.classList.remove('has-value');
            });
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('is-success');
                
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    successMessage.remove();
                    form.classList.remove('form-success');
                }, 500);
            }, 4000);
            
        } catch (error) {
            submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error! Try Again';
            submitButton.classList.remove('is-loading');
            submitButton.classList.add('is-error');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('is-error');
            }, 3000);
        }
    });
    
    function validateInput(input) {
        const formGroup = input.closest('.form-group');
        let isValid = true;
        let errorMessage = '';
        
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        
        if (input.required && input.value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required';
        } 
        else if (input.type === 'email' && input.value.trim() !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        if (!isValid) {
            formGroup.classList.add('has-error');
            errorMsg.textContent = errorMessage;
            errorMsg.style.opacity = 1;
            
            formGroup.classList.add('shake-error');
            setTimeout(() => {
                formGroup.classList.remove('shake-error');
            }, 400);
        } else {
            formGroup.classList.remove('has-error');
            errorMsg.style.opacity = 0;
            setTimeout(() => {
                errorMsg.textContent = '';
            }, 300);
        }
        
        return isValid;
    }
    
    function createConfetti(container) {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        container.appendChild(confettiContainer);
        
        const colors = ['#2D3250', '#424769', '#7077A1', '#F6B17A'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.setProperty('--confetti-x', Math.random() * 100 + '%');
            confetti.style.setProperty('--confetti-y', Math.random() * 100 + '%');
            confetti.style.setProperty('--confetti-size', Math.random() * 8 + 5 + 'px');
            confetti.style.setProperty('--confetti-rotate', Math.random() * 360 + 'deg');
            confetti.style.setProperty('--confetti-bg', colors[Math.floor(Math.random() * colors.length)]);
            confetti.style.setProperty('--confetti-duration', Math.random() * 2 + 1 + 's');
            confetti.style.setProperty('--confetti-delay', Math.random() * 0.5 + 's');
            
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initEnhancedPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projectModal = document.querySelector('.project-modal');
    const modalImage = document.querySelector('.project-modal-image img');
    const modalTitle = document.querySelector('.project-modal-header h2');
    const modalDescription = document.querySelector('.project-modal-description p');
    const modalCloseBtn = document.querySelector('.project-modal-close');
    const modalCloseFooterBtn = document.querySelector('.project-modal-close-btn');
    const modalCampaignLink = document.querySelector('.project-modal-footer a');
    const modalClientValue = document.querySelector('.project-stat-value:nth-of-type(1)');
    const modalDurationValue = document.querySelector('.project-stat-value:nth-of-type(2)');
    const modalPlatformsValue = document.querySelector('.project-stat-value:nth-of-type(3)');
    const modalResultsValue = document.querySelector('.project-stat-value:nth-of-type(4)');
    
    let currentProjectIndex = 0;
    let projectIds = [];
    
    const projectData = {
        'paid-search-1': {
            title: 'Automotive PPC Campaign',
            description: 'This comprehensive Google Ads campaign for a luxury automotive dealership chain focused on highly targeted search terms to capture ready-to-convert buyers. Using sophisticated bid strategies and automated rules, we optimized budget allocation across 15 dealership locations to maximize lead quality rather than quantity.',
            image: 'assets/portfolio-1.jpg',
            client: 'Luxury Automotive Dealership Chain',
            duration: '6 Months (Ongoing)',
            platforms: 'Google Ads, Google Analytics, Google Tag Manager',
            results: '32% reduction in cost per lead, 28% increase in qualified leads, 18% increase in test drive bookings',
            campaignUrl: '#'
        },
        'social-1': {
            title: 'Fashion Brand Social Campaign',
            description: 'Developed a multi-platform social media campaign for a trendy fashion brand targeting millennials and Gen Z. The campaign combined eye-catching carousel ads, influencer collaborations, and user-generated content to create an authentic brand image and drive engagement across Instagram and Facebook.',
            image: 'assets/portfolio-2.jpg',
            client: 'Contemporary Fashion Brand',
            duration: '3 Months (Seasonal Campaign)',
            platforms: 'Facebook, Instagram, TikTok',
            results: '4.2x ROAS, 156% increase in social engagement, 89% increase in website traffic from social channels',
            campaignUrl: '#'
        },
        'ecommerce-1': {
            title: 'E-commerce Growth Strategy',
            description: 'Implemented a holistic e-commerce growth strategy for an online retailer struggling with cart abandonment and customer acquisition costs. The approach included optimizing the purchase funnel, implementing strategic retargeting, and creating data-driven product recommendation algorithms.',
            image: 'assets/portfolio-3.jpg',
            client: 'Online Home Goods Retailer',
            duration: '12 Months',
            platforms: 'Shopify, Google Analytics, Facebook Ads, Email Marketing',
            results: '45% increase in conversions, 27% reduction in cart abandonment, 38% increase in average order value',
            campaignUrl: '#'
        },
        'paid-search-2': {
            title: 'SEM Campaign Optimization',
            description: 'Revamped an underperforming search marketing campaign for a B2B SaaS company. Restructured ad groups, implemented negative keyword strategies, and developed tailored landing pages for each segment of the target audience to improve quality scores and conversion rates.',
            image: 'assets/portfolio-4.jpg',
            client: 'B2B SaaS Provider',
            duration: '9 Months',
            platforms: 'Google Ads, Bing Ads, LinkedIn Ads',
            results: '215% ROI increase, 42% higher CTR, 68% improvement in lead quality scores',
            campaignUrl: '#'
        }
    };
    
    portfolioItems.forEach((item, index) => {
        const projectType = item.getAttribute('data-category');
        const projectId = `${projectType}-${Math.floor(index/2) + 1}`;
        item.setAttribute('data-project-id', projectId);
        projectIds.push(projectId);
        
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `View project: ${projectData[projectId]?.title || 'Project'}`);
        
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.portfolio-info')) {
                handleProjectOpen(this, index);
            }
        });
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProjectOpen(this, index);
            }
        });
        
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) - 0.5;
            const y = ((e.clientY - rect.top) / rect.height) - 0.5;
            
            this.classList.add('tilt-effect');
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${y * -5}deg) 
                rotateY(${x * 10}deg) 
                translateY(-10px)
            `;
            
            const img = this.querySelector('.portfolio-img img');
            if (img) {
                img.style.transform = `translateX(${x * -15}px) translateY(${y * -15}px) scale(1.1)`;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('tilt-effect');
            this.style.transform = '';
            const img = this.querySelector('.portfolio-img img');
            if (img) img.style.transform = '';
        });
    });
    
    function handleProjectOpen(element, index) {
        const projectId = element.getAttribute('data-project-id');
        const project = projectData[projectId];
        
        if (project) {
            currentProjectIndex = index;
            
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalClientValue.textContent = project.client;
            modalDurationValue.textContent = project.duration;
            modalPlatformsValue.textContent = project.platforms;
            modalResultsValue.textContent = project.results;
            modalCampaignLink.href = project.campaignUrl;
            
            setupFocusTrap();
            
            document.body.style.overflow = 'hidden';
            projectModal.classList.add('open');
            
            projectModal.setAttribute('tabindex', '-1');
            projectModal.focus();
            
            addModalNavigation();
        }
    }
    
    function addModalNavigation() {
        if (portfolioItems.length <= 1) return;
        
        const existingNav = projectModal.querySelector('.modal-nav');
        if (existingNav) existingNav.remove();
        
        const navContainer = document.createElement('div');
        navContainer.className = 'modal-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'modal-nav-btn prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Previous project');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-nav-btn next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Next project');
        
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        
        const modalContent = projectModal.querySelector('.project-modal-content');
        modalContent.appendChild(navContainer);
        
        prevBtn.addEventListener('click', navigateProjects.bind(null, 'prev'));
        nextBtn.addEventListener('click', navigateProjects.bind(null, 'next'));
    }
    
    function navigateProjects(direction) {
        let newIndex = currentProjectIndex;
        
        if (direction === 'next') {
            newIndex = (currentProjectIndex + 1) % portfolioItems.length;
        } else {
            newIndex = (currentProjectIndex - 1 + portfolioItems.length) % portfolioItems.length;
        }
        
        currentProjectIndex = newIndex;
        const newProjectId = projectIds[newIndex];
        const project = projectData[newProjectId];
        
        if (project) {
            projectModal.classList.add('changing');
            
            setTimeout(() => {
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalClientValue.textContent = project.client;
                modalDurationValue.textContent = project.duration;
                modalPlatformsValue.textContent = project.platforms;
                modalResultsValue.textContent = project.results;
                modalCampaignLink.href = project.campaignUrl;
                
                setTimeout(() => {
                    projectModal.classList.remove('changing');
                }, 300);
            }, 300);
        }
    }
    
    function setupFocusTrap() {
        const focusableElements = projectModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            setTimeout(() => {
                firstElement.focus();
            }, 100);
            
            projectModal.addEventListener('keydown', function trapTabKey(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    if (modalCloseFooterBtn) {
        modalCloseFooterBtn.addEventListener('click', closeModal);
    }
    
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (!projectModal || !projectModal.classList.contains('open')) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                navigateProjects('prev');
                break;
            case 'ArrowRight':
                navigateProjects('next');
                break;
        }
    });
    
    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('open');
            
            setTimeout(() => {
                document.body.style.overflow = '';
                
                if (portfolioItems[currentProjectIndex]) {
                    portfolioItems[currentProjectIndex].focus();
                }
            }, 300);
        }
    }
}

function initPageTransitions() {
    document.body.classList.add('page-loaded');
    
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, 200 + index * 100);
    });
}

function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
            
            if (scrollPercent > 98) {
                scrollProgress.style.transition = 'width 0.2s ease, box-shadow 0.3s ease';
                scrollProgress.style.boxShadow = '0 0 20px rgba(var(--accent-color-rgb), 0.8)';
            } else {
                scrollProgress.style.transition = 'width 0.2s ease';
                scrollProgress.style.boxShadow = '0 0 10px rgba(var(--accent-color-rgb), 0.5)';
            }
        });
    }
}

function initFloatingElements() {
    // Add floating class to elements that should float
    const heroImage = document.querySelector('.hero-image');
    const badges = document.querySelectorAll('.badge');
    const expertiseIcons = document.querySelectorAll('.expertise-card i');
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    if (heroImage) {
        heroImage.classList.add('floating');
    }
    
    if (scrollArrow) {
        scrollArrow.style.animation = 'scrollArrowEnhanced 2s ease-in-out infinite';
    }
    
    if (expertiseIcons.length) {
        expertiseIcons.forEach((icon, index) => {
            icon.style.animation = `floatingAnimation 3s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

function initMouseFollowEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create a mouse follow element
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.position = 'absolute';
    follower.style.width = '300px';
    follower.style.height = '300px';
    follower.style.borderRadius = '50%';
    follower.style.background = 'radial-gradient(circle, rgba(var(--accent-color-rgb), 0.1) 0%, rgba(var(--accent-color-rgb), 0) 70%)';
    follower.style.transform = 'translate(-50%, -50%)';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '1';
    follower.style.opacity = '0';
    follower.style.transition = 'opacity 0.3s ease';
    
    hero.appendChild(follower);
    
    // Add hero mouse move effect
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Move the follower to the mouse position
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
        follower.style.opacity = '1';
        
        // Subtle parallax effect for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const moveX = (x - rect.width / 2) * 0.01;
            const moveY = (y - rect.height / 2) * 0.01;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Add effect to hero image as well
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const moveImgX = (x - rect.width / 2) * 0.03;
            const moveImgY = (y - rect.height / 2) * 0.03;
            heroImage.style.transform = `translate(${moveImgX}px, ${moveImgY}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
        
        // Reset hero content position
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
        
        // Reset hero image position
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = 'translate(0, 0)';
        }
    });
    
    // Add subtle hover effects to all buttons
    const buttons = document.querySelectorAll('button, .primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            button.style.transform = `perspective(500px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale(1.05)`;
            button.style.boxShadow = `${moveX}px ${moveY}px 15px rgba(var(--primary-color-rgb), 0.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });
}

function initTextAnimate() {
    // Animate hero heading with gradient effect
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        heroTitle.style.backgroundClip = 'text';
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.color = 'transparent';
        heroTitle.style.backgroundImage = 'linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--light-color), var(--accent-color), var(--primary-color))';
        heroTitle.style.backgroundSize = '200% auto';
        heroTitle.style.animation = 'textGradient 5s linear infinite';
    }
    
    // Create an observer for section titles to add animation when visible
    const titles = document.querySelectorAll('.section-title');
    if (titles.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shimmer-active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        titles.forEach(title => {
            observer.observe(title);
        });
    }
}

// Add keyframes for text gradient effect
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes textGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
        
        .shimmer-active::before {
            animation: shimmer 2s infinite;
        }
    `;
    document.head.appendChild(style);
})();

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .primary-button, .secondary-button');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', (e) => {
            createRippleEffect(button, e);
        });
    });
});

function initCustomCursor() {
    // Check if device is touch-based
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    };
    
    // Only initialize custom cursor on non-touch devices
    if (isTouchDevice()) {
        return;
    }
    
    // Create cursor elements
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'custom-cursor-container';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    
    cursorContainer.appendChild(cursorDot);
    cursorContainer.appendChild(cursorOutline);
    document.body.appendChild(cursorContainer);
    
    // Add class to body
    document.body.classList.add('custom-cursor');
    
    // Initialize cursor position outside viewport
    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;
    let outlineX = -100;
    let outlineY = -100;
    
    // Trails array to store trail elements
    const trails = [];
    const maxTrails = 10;
    const trailLifespan = 500; // milliseconds
    
    // Create initial trail elements
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = '0';
        cursorContainer.appendChild(trail);
        trails.push({
            element: trail,
            x: -100,
            y: -100,
            alpha: 0,
            createdAt: 0
        });
    }
    
    // Track mouse position
    document.addEventListener('mousemove', e => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Create trail on mouse movement
        createTrail(cursorX, cursorY);
    });
    
    // Create a trail at the given position
    function createTrail(x, y) {
        // Find oldest trail
        const now = Date.now();
        const oldestTrailIndex = trails.reduce((oldest, trail, index, array) => {
            return (trail.createdAt < array[oldest].createdAt) ? index : oldest;
        }, 0);
        
        const trail = trails[oldestTrailIndex];
        
        // Update trail properties
        trail.x = x;
        trail.y = y;
        trail.alpha = 0.5;
        trail.createdAt = now;
        
        // Size based on velocity would go here if tracking mouse velocity
        const size = 5 + Math.random() * 3;
        
        // Update trail element
        trail.element.style.opacity = trail.alpha;
        trail.element.style.transform = `translate(${x}px, ${y}px)`;
        trail.element.style.width = `${size}px`;
        trail.element.style.height = `${size}px`;
    }
    
    // Handle mouse leaving the window
    document.addEventListener('mouseout', e => {
        if (e.relatedTarget === null) {
            cursorDot.classList.add('hidden');
            cursorOutline.classList.add('hidden');
            
            // Hide all trails
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
            });
        }
    });
    
    document.addEventListener('mouseover', e => {
        cursorDot.classList.remove('hidden');
        cursorOutline.classList.remove('hidden');
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('clicking');
        cursorOutline.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('clicking');
        cursorOutline.classList.remove('clicking');
    });
    
    // Add hover effects for different elements
    const addHoverEffect = (elements, className) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add(className);
                cursorOutline.classList.add(className);
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove(className);
                cursorOutline.classList.remove(className);
            });
        });
    };
    
    // Add hover effects for links
    addHoverEffect(document.querySelectorAll('a, .nav-links li'), 'link-hover');
    
    // Add hover effects for buttons
    addHoverEffect(document.querySelectorAll('button, .primary-button, .secondary-button'), 'button-hover');
    
    // Add hover effects for inputs and textareas
    addHoverEffect(document.querySelectorAll('input, textarea'), 'input-hover');
    
    // Add hover effects for portfolio items
    addHoverEffect(document.querySelectorAll('.portfolio-item'), 'portfolio-hover');
    
    // Add special hover effect for theme toggle
    addHoverEffect(document.querySelectorAll('.theme-toggle'), 'theme-hover');
    
    // Add hover effect for text elements
    addHoverEffect(document.querySelectorAll('h1, h2, h3, p, .section-title, .timeline-content h3'), 'text-hover');
    
    // Add hover effect for social links
    addHoverEffect(document.querySelectorAll('.social-links a'), 'social-hover');
    
    // Add content to social hover effect
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            let iconName = '';
            if (link.querySelector('.fa-linkedin')) iconName = 'LinkedIn';
            else if (link.querySelector('.fa-twitter')) iconName = 'Twitter';
            else if (link.querySelector('.fa-instagram')) iconName = 'Instagram';
            
            if (iconName) {
                // Create or update the content inside cursor outline
                let contentSpan = cursorOutline.querySelector('.cursor-content');
                if (!contentSpan) {
                    contentSpan = document.createElement('span');
                    contentSpan.className = 'cursor-content';
                    cursorOutline.appendChild(contentSpan);
                }
                contentSpan.textContent = iconName;
                contentSpan.style.opacity = '1';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const contentSpan = cursorOutline.querySelector('.cursor-content');
            if (contentSpan) {
                contentSpan.style.opacity = '0';
                setTimeout(() => {
                    if (contentSpan.parentNode === cursorOutline) {
                        cursorOutline.removeChild(contentSpan);
                    }
                }, 300);
            }
        });
    });
    
    // Smooth cursor movement with lerp (linear interpolation)
    const lerp = (start, end, factor) => start * (1 - factor) + end * factor;
    
    // Update cursor position with smooth animation
    const updateCursorPosition = () => {
        // Smooth movement for dot
        dotX = lerp(dotX, cursorX, 0.2);
        dotY = lerp(dotY, cursorY, 0.2);
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        
        // Smoother, slightly delayed movement for outline
        outlineX = lerp(outlineX, cursorX, 0.1);
        outlineY = lerp(outlineY, cursorY, 0.1);
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        
        // Update trail elements opacity based on age
        const now = Date.now();
        trails.forEach(trail => {
            const age = now - trail.createdAt;
            if (age < trailLifespan) {
                const lifePercent = age / trailLifespan;
                trail.element.style.opacity = 0.5 * (1 - lifePercent);
            } else {
                trail.element.style.opacity = '0';
            }
        });
        
        requestAnimationFrame(updateCursorPosition);
    };
    
    // Start animation loop
    updateCursorPosition();
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + 
                Math.pow(e.clientY - centerY, 2)
            );
            
            // Only apply magnetic effect when cursor is close to the button
            if (distance < 100) {
                const strength = 0.3; // Adjust for stronger/weaker effect
                const maxPull = 30;
                
                // Calculate pull strength based on distance (closer = stronger)
                const pull = maxPull * (1 - distance / 100) * strength;
                
                // Calculate direction vector from cursor to button center
                const dirX = centerX - e.clientX;
                const dirY = centerY - e.clientY;
                
                // Normalize and apply pull strength
                const magnitude = Math.sqrt(dirX * dirX + dirY * dirY);
                const normalizedX = dirX / magnitude;
                const normalizedY = dirY / magnitude;
                
                const pullX = normalizedX * pull;
                const pullY = normalizedY * pull;
                
                // Adjust cursor position
                cursorX = e.clientX + pullX;
                cursorY = e.clientY + pullY;
            }
        });
    });
}
