document.addEventListener('DOMContentLoaded', function() {
    // === Año en footer ===
    document.getElementById('year').textContent = new Date().getFullYear();

    // === Navbar scroll effect ===
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // === Navegación móvil ===
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // === Cerrar menú al hacer click en un enlace ===
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // === Enlace activo al hacer scroll ===
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // === Animación de números (contador) ===
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const current = parseInt(stat.textContent);
            const increment = Math.ceil(target / 60);

            if (current < target) {
                const newValue = Math.min(current + increment, target);
                stat.textContent = newValue;
                setTimeout(animateNumbers, 30);
            } else {
                stat.textContent = target + '+';
            }
        });
    };

    // === Intersection Observer para animaciones al scroll ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Si es la sección hero, animar números
                if (entry.target.classList.contains('hero-stats')) {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.about-card, .service-card, .project-card, .contact-item, .hero-stats, .section-header').forEach(el => {
        observer.observe(el);
    });

    // === Filtro de proyectos ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === Scroll suave para todos los enlaces internos ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Formulario de contacto ===
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
                    this.reset();
                } else {
                    throw new Error('Error');
                }
            } catch (error) {
                alert('Hubo un error al enviar. Por favor, intenta de nuevo.');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // === Efecto parallax en el hero ===
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');

        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
        }
    });

    // === Animación de entrada para proyectos (fadeIn) ===
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .about-card, .service-card, .project-card, .contact-item, .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-card.visible, .service-card.visible, .project-card.visible, 
        .contact-item.visible, .section-header.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});