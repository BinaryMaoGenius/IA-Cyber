// Resources Page JavaScript

// Smooth scrolling for quick access links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const quickLinks = document.querySelectorAll('.quick-link[href^="#"]');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubscription);
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleNewsletterSubscription();
            }
        });
    }
    
    // Resource card tracking
    trackResourceClicks();
    
    // Animate cards on scroll
    animateCardsOnScroll();
    
    // Search functionality
    initializeSearch();
});

// Newsletter subscription handler
function handleNewsletterSubscription() {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Veuillez entrer votre adresse email.', 'warning');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Simulate subscription (in real implementation, this would call an API)
    const btn = document.querySelector('.newsletter-btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'Inscription...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = '✓ Inscrit';
        btn.style.background = '#28a745';
        emailInput.value = '';
        showNotification('Merci ! Vous êtes maintenant abonné à notre newsletter.', 'success');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    }, 1500);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

// Track resource clicks for analytics
function trackResourceClicks() {
    const resourceLinks = document.querySelectorAll('.resource-link');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const resourceTitle = this.closest('.resource-card').querySelector('h4').textContent;
            const resourceType = this.closest('.resource-card').querySelector('.resource-type').textContent;
            
            // In a real implementation, this would send data to analytics
            console.log('Resource clicked:', {
                title: resourceTitle,
                type: resourceType,
                url: this.href,
                timestamp: new Date().toISOString()
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Animate cards on scroll
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.resource-card, .emergency-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize search functionality
function initializeSearch() {
    // Create search bar
    const quickAccessSection = document.querySelector('.quick-access .container');
    if (quickAccessSection) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-bar">
                <input type="text" id="resource-search" placeholder="🔍 Rechercher une ressource..." class="search-input">
                <button class="search-clear" onclick="clearSearch()" style="display: none;">×</button>
            </div>
        `;
        
        // Add styles
        searchContainer.style.cssText = `
            margin-top: 20px;
            text-align: center;
        `;
        
        const searchBar = searchContainer.querySelector('.search-bar');
        searchBar.style.cssText = `
            display: inline-flex;
            align-items: center;
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            padding: 5px 20px;
            max-width: 400px;
            width: 100%;
            transition: border-color 0.3s ease;
        `;
        
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.style.cssText = `
            border: none;
            outline: none;
            flex: 1;
            padding: 10px 0;
            font-size: 16px;
            background: transparent;
        `;
        
        const clearBtn = searchContainer.querySelector('.search-clear');
        clearBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
            margin-left: 10px;
        `;
        
        quickAccessSection.appendChild(searchContainer);
        
        // Add search functionality
        const searchInputElement = document.getElementById('resource-search');
        searchInputElement.addEventListener('input', handleSearch);
        searchInputElement.addEventListener('focus', function() {
            searchBar.style.borderColor = '#ff6b35';
        });
        searchInputElement.addEventListener('blur', function() {
            searchBar.style.borderColor = '#e0e0e0';
        });
    }
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const clearBtn = document.querySelector('.search-clear');
    const resourceCards = document.querySelectorAll('.resource-card');
    const categories = document.querySelectorAll('.resource-category');
    
    // Show/hide clear button
    clearBtn.style.display = searchTerm ? 'block' : 'none';
    
    if (!searchTerm) {
        // Show all cards and categories
        resourceCards.forEach(card => {
            card.style.display = 'block';
        });
        categories.forEach(category => {
            category.style.display = 'block';
        });
        return;
    }
    
    let hasVisibleCards = false;
    
    // Filter cards
    resourceCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const type = card.querySelector('.resource-type').textContent.toLowerCase();
        
        const isMatch = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       type.includes(searchTerm);
        
        card.style.display = isMatch ? 'block' : 'none';
        if (isMatch) hasVisibleCards = true;
    });
    
    // Hide categories with no visible cards
    categories.forEach(category => {
        const visibleCards = category.querySelectorAll('.resource-card[style*="block"], .resource-card:not([style*="none"])');
        category.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
    
    // Show no results message
    showNoResultsMessage(!hasVisibleCards, searchTerm);
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('resource-search');
    searchInput.value = '';
    handleSearch();
    searchInput.focus();
}

// Show no results message
function showNoResultsMessage(show, searchTerm) {
    let noResultsDiv = document.querySelector('.no-results');
    
    if (show && !noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                <h3>Aucun résultat trouvé</h3>
                <p>Aucune ressource ne correspond à "${searchTerm}"</p>
                <button onclick="clearSearch()" style="margin-top: 20px; padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">Effacer la recherche</button>
            </div>
        `;
        
        const firstSection = document.querySelector('.resources-section');
        if (firstSection) {
            firstSection.parentNode.insertBefore(noResultsDiv, firstSection);
        }
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        opacity: 0.8;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(style);

