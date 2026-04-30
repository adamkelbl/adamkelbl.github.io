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

// Funkce pro mobilní menu
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (menuBtn && nav) {
        // Funkce pro otevření menu
        function openMenu() {
            nav.classList.add('active');
            menuBtn.textContent = '✕';
            body.style.overflow = 'hidden';
        }
        
        // Funkce pro zavření menu
        function closeMenu() {
            nav.classList.remove('active');
            menuBtn.textContent = '☰';
            body.style.overflow = '';
        }
        
        // Toggle menu při kliknutí na tlačítko
        menuBtn.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Zavření menu při kliknutí na odkaz
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Zavření menu při změně velikosti okna
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
        
        // Zavření menu při kliknutí mimo navigaci
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }
}

// Carousel pro portfolio
function setupCarousel() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    function getScrollAmount() {
        const item = grid.querySelector('.portfolio-item');
        const gap = parseFloat(getComputedStyle(grid).gap) || 0;
        return item.offsetWidth + gap;
    }

    function updateButtons() {
        prevBtn.disabled = grid.scrollLeft <= 1;
        nextBtn.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    }

    prevBtn.addEventListener('click', () => {
        grid.scrollLeft -= getScrollAmount();
    });

    nextBtn.addEventListener('click', () => {
        grid.scrollLeft += getScrollAmount();
    });

    grid.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
}

// Inicializace všech funkcí po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    setupMobileMenu();
    setupCarousel();
});