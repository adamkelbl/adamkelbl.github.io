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
    const body = document.body;
    
    if (menuBtn && nav) {
        // Vytvoření overlay elementu
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            body.appendChild(overlay);
        }
        
        // Funkce pro otevření menu
        function openMenu() {
            nav.classList.add('active');
            overlay.classList.add('active');
            menuBtn.textContent = '✕';
            body.style.overflow = 'hidden'; // Zakázat scrollování na pozadí
        }
        
        // Funkce pro zavření menu
        function closeMenu() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.textContent = '☰';
            body.style.overflow = ''; // Povolit scrollování zpět
        }
        
        // Event listenery
        menuBtn.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Zavření menu při kliknutí na overlay
        overlay.addEventListener('click', closeMenu);
        
        // Zavření menu při kliknutí na odkaz
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Zavření menu při změně velikosti okna (když se přepne zpět na desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
        
        // Zavření menu při stisku ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
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
    window.addEventListener('scroll', handleScroll);
});