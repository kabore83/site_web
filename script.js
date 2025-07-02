// ===== FONCTIONS DE BASE =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des animations
    initAnimations();
    
    // Configuration du menu mobile
    initMobileMenu();
    
    // Initialisation du panier (exemple e-commerce)
    initCartSystem();
    
    // Configuration des formulaires
    initForms();
});

// ===== ANIMATIONS =====
function initAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Optionnel : on peut arrêter d'observer après l'animation
                animationObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Détecte 50px avant l'élément
    });

    // Éléments à animer
    const animatableElements = document.querySelectorAll(
        'article, .btn, .card-container, .protect-content p'
    );
    
    animatableElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const navElement = document.querySelector('nav');
    if (!navElement) return;

    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.className = 'mobile-menu-btn';
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    navElement.prepend(menuButton);
    
    const navList = document.querySelector('nav ul');
    if (!navList) return;

    // Gestion de l'état du menu
    let isMenuOpen = false;
    
    menuButton.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navList.style.display = isMenuOpen ? 'flex' : 'none';
        menuButton.setAttribute('aria-expanded', isMenuOpen);
    });

    // Fermer le menu quand on clique à l'extérieur
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navElement.contains(e.target)) {
            isMenuOpen = false;
            navList.style.display = 'none';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Adaptabilité au redimensionnement
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
        } else if (!isMenuOpen) {
            navList.style.display = 'none';
        }
    });
}

// ===== SYSTÈME DE PANIER =====
function initCartSystem() {
    const cart = {
        items: [],
        addItem: function(product) {
            this.items.push(product);
            this.updateDisplay();
            showNotification(`${product.name} ajouté au panier`);
        },
        updateDisplay: function() {
            const countElement = document.querySelector('.cart-count');
            if (countElement) {
                countElement.textContent = this.items.length;
            }
        }
    };

    // Création du bouton panier
    const cartButton = document.createElement('button');
    cartButton.className = 'cart-btn';
    cartButton.innerHTML = `🛒 <span class="cart-count">0</span>`;
    cartButton.setAttribute('aria-label', 'Panier');
    document.body.appendChild(cartButton);

    // Écouteurs pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price)
            };
            cart.addItem(productData);
        });
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animation et suppression
    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);
}

// ===== FORMULAIRES =====
function initForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validation basique
            const nameInput = this.querySelector('input[name="name"]');
            if (!nameInput.value.trim()) {
                showNotification('Veuillez entrer votre nom', 'error');
                return;
            }

            // Simulation d'envoi
            try {
                // Ici vous remplaceriez par un vrai fetch()
                await simulateFormSubmit(this);
                showNotification('Message envoyé avec succès !');
                this.reset();
            } catch (error) {
                showNotification('Erreur lors de l\'envoi', 'error');
                console.error(error);
            }
        });
    }
}

// Fonction simulée pour l'exemple
function simulateFormSubmit(form) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Formulaire soumis :', new FormData(form));
            resolve();
        }, 1000);
    });
}

// ===== OPTIMISATIONS =====
// Délai pour les événements de resize/scroll
function debounce(func, wait = 100) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

// Usage pour le redimensionnement
window.addEventListener('resize', debounce(function() {
    console.log('Fenêtre redimensionnée');
}));