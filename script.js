// Funkce pro přidání třídy 'active' k aktuální stránce v navigaci
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Funkce pro přidání efektu při scrollování
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Funkce pro mobilní menu
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Funkce pro animace při načtení stránky
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
        // Nastavení výchozího stavu pro animaci
        if (el.classList.contains('fade-in')) {
            el.style.opacity = 0;
        }
        if (el.classList.contains('slide-up')) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
        }
    });
}

// Inicializace všech funkcí po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    setupMobileMenu();
    setupAnimations();
    
    // Přidání event listeneru pro scroll
    window.addEventListener('scroll', handleScroll);
});
