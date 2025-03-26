document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para la navegación con offset para el header fijo
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0; // Obtener la altura del header, si existe

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight; // Calcular la posición con el offset
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de Fade-in al cargar la página
    const sectionsToFadeIn = document.querySelectorAll('.section, .hero');
    sectionsToFadeIn.forEach(section => {
        section.classList.add('fade-in');
        setTimeout(() => {
            section.classList.add('visible');
        }, 100); // Un pequeño retraso
    });

    // Animación de Slide-in al hacer scroll
    const sectionsToSlideIn = document.querySelectorAll('.section, .hero');
    sectionsToSlideIn.forEach(section => {
        section.classList.add('slide-in');
    });

    function checkSlide() {
        sectionsToSlideIn.forEach(section => {
            const slideInAt = (window.scrollY + window.innerHeight) - section.offsetHeight / 2;
            const sectionBottom = section.offsetTop + section.offsetHeight;
            const isHalfShown = slideInAt > section.offsetTop;
            const isNotScrolledPast = window.scrollY < sectionBottom;

            if (isHalfShown && isNotScrolledPast) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    checkSlide(); // Para las primeras secciones visibles al cargar

    // Parallax con JavaScript en la sección Hero
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // Efecto de movimiento con el mouse en el fondo del Hero
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const moveX = (mouseX / 50);
            const moveY = (mouseY / 50);

            heroSection.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.backgroundPosition = `center`;
        });
    }

    // Animación de escala para los elementos de habilidades al hacer scroll
    const skillItems = document.querySelectorAll('.skill-item');

    function checkSkills() {
        skillItems.forEach(item => {
            const slideInAt = (window.scrollY + window.innerHeight) - item.offsetHeight / 2;
            const itemBottom = item.offsetTop + item.offsetHeight;
            const isHalfShown = slideInAt > item.offsetTop;
            const isNotScrolledPast = window.scrollY < itemBottom;

            if (isHalfShown && isNotScrolledPast) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkSkills);
    checkSkills(); // Para las habilidades que estén visibles al cargar

    // Añadir clase 'loaded' al body cuando la página esté completamente cargada
    document.body.classList.add('loaded');
});