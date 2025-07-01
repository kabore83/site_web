// ===== FONCTIONS DE BASE =====
document.addEventListener('DOMContentLoaded', function() {
    // Animation d'entrée
    animateElements();
    
    // Gestion du menu mobile
    setupMobileMenu();
    
    // Fonctionnalité panier (exemple e-commerce)
    setupCart();
    
    // Gestion des formulaires
    setupForms();
});

// ===== ANIMATIONS =====
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('article, .btn').forEach(el => {
        observer.observe(el);
    });
}

// ===== MENU MOBILE =====
function setupMobileMenu() {
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';
    document.querySelector('nav').prepend(menuBtn);
    
    menuBtn.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ===== SYSTÈME DE PANIER (EXEMPLE E-COMMERCE) =====
function setupCart() {
    const cart = [];
    const cartBtn = document.createElement('div');
    cartBtn.innerHTML = `🛒 <span class="cart-count">0</span>`;
    cartBtn.className = 'cart-btn';
    document.body.appendChild(cartBtn);
    
    // Exemple d'ajout au panier
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.dataset.product;
            cart.push(product);
            updateCartCount();
            showNotification(`${product} ajouté au panier`);
        });
    });
    
    function updateCartCount() {
        document.querySelector('.cart-count').textContent = cart.length;
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.classList.add('fade-out');
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

// ===== GESTION DES FORMULAIRES =====
function setupForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici vous ajouteriez le code pour envoyer les données
            showNotification('Message envoyé avec succès !');
            this.reset();
        });
    }
}

// ===== FONCTIONNALITÉS AVANCÉES =====
function initImageSlider() {
    // Code pour un slider d'images (à ajouter si nécessaire)
}