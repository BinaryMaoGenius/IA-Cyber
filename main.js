// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Hauteur de la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.section-card, .feature-card, .testimonial-card, .stat-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Navbar background au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animation des statistiques
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            const suffix = finalValue.replace(/[\d]/g, '');
            
            if (numericValue) {
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 30);
            }
        });
    }

    // Observer pour les statistiques
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Effet de parallaxe léger pour le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Gestion du thème sombre (optionnel)
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const currentTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    initThemeToggle();

    // Gestion des formulaires (pour les futures pages)
    function initForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation basique
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Ici on pourrait envoyer les données
                    showNotification('Formulaire envoyé avec succès !', 'success');
                } else {
                    showNotification('Veuillez remplir tous les champs requis.', 'error');
                }
            });
        });
    }

    // Système de notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Couleurs selon le type
        switch(type) {
            case 'success':
                notification.style.background = '#22c55e';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            case 'warning':
                notification.style.background = '#f59e0b';
                break;
            default:
                notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    initForms();

    // Gestion du mode hors ligne
    function initOfflineMode() {
        window.addEventListener('online', function() {
            showNotification('Connexion rétablie !', 'success');
        });
        
        window.addEventListener('offline', function() {
            showNotification('Mode hors ligne activé', 'warning');
        });
    }

    initOfflineMode();

    // Lazy loading pour les images (si nécessaire)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    initLazyLoading();

    // Gestion des cookies (RGPD)
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
                    <div class="cookie-buttons">
                        <button class="btn btn-small btn-primary" onclick="acceptCookies()">Accepter</button>
                        <button class="btn btn-small btn-outline" onclick="declineCookies()">Refuser</button>
                    </div>
                </div>
            `;
            
            banner.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(52, 58, 64, 0.95);
                color: white;
                padding: 20px;
                z-index: 10000;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(banner);
            
            setTimeout(() => {
                banner.style.transform = 'translateY(0)';
            }, 1000);
        }
    }

    // Fonctions globales pour les cookies
    window.acceptCookies = function() {
        localStorage.setItem('cookieConsent', 'accepted');
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 300);
        }
    };

    window.declineCookies = function() {
        localStorage.setItem('cookieConsent', 'declined');
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 300);
        }
    };

    initCookieConsent();

    // Performance monitoring
    function initPerformanceMonitoring() {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow. Consider optimizing.');
            }
        });
    }

    initPerformanceMonitoring();

    console.log('🛡️ CyberSécurité & IA Mali - Site initialisé avec succès !');
});

