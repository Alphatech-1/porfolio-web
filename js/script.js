document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    
    
    // Efecto hover en elementos interactivos
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .testimonial-card, .contact-method');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.opacity = '1';
        });
    });
    
    // Scroll suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                this.classList.add('active');
            }
        });
    });
    
    // Animación de números en estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateNumber();
        });
    };
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Animar números cuando la sección de hero es visible
                if (element.classList.contains('hero__content')) {
                    animateNumbers();
                }
            }
        });
        
        // Mostrar/ocultar botón "Volver arriba"
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    };
    
    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Cambiar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Galería de imágenes con lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxDetails = lightbox.querySelector('.lightbox-details');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    let items = [];
    
    // Filtrar galería
    const filterButtons = document.querySelectorAll('.gallery__filter .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Cambiar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Configurar items de galería
    galleryItems.forEach((item, index) => {
        items.push(item);
        
        const viewBtn = item.querySelector('.gallery-view-btn');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
        
        // También permitir click en toda la imagen
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Abrir lightbox
    function openLightbox(index) {
        currentIndex = index;
        const item = items[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const details = item.querySelector('.gallery-details').innerHTML;
        
        lightboxImg.src = imgSrc;
        lightboxImg.alt = item.querySelector('img').alt;
        lightboxDetails.innerHTML = details;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navegación
    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        openLightbox(currentIndex);
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        openLightbox(currentIndex);
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    // Cerrar al hacer click fuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });
}



    const rocketCursor = document.querySelector('.rocket-cursor');
  
  // Mover el cohete con el mouse
  document.addEventListener('mousemove', (e) => {
    rocketCursor.style.left = e.clientX + 'px';
    rocketCursor.style.top = e.clientY + 'px';
    
    // Efecto de inclinación al mover rápido
    const velocityX = e.movementX;
    const velocityY = e.movementY;
    const tilt = Math.min(Math.max(velocityX * 0.3, -15), 15);
    
    rocketCursor.style.transform = `translate(-50%, -50%) rotate(${-45 + tilt}deg)`;
  });
  
  // Efecto al hacer click
  document.addEventListener('mousedown', () => {
    rocketCursor.style.transform = 'translate(-50%, -50%) rotate(-45deg) scale(0.9)';
    document.querySelector('.rocket-flame').style.height = '45px';
  });
  
  document.addEventListener('mouseup', () => {
    rocketCursor.style.transform = 'translate(-50%, -50%) rotate(-45deg) scale(1)';
    document.querySelector('.rocket-flame').style.height = '30px';
  });
  
  // Efectos especiales en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      rocketCursor.style.width = '50px';
      rocketCursor.style.height = '50px';
      rocketCursor.style.filter = 'drop-shadow(0 0 10px rgba(255, 187, 51, 0.8))';
    });
    
    el.addEventListener('mouseleave', () => {
      rocketCursor.style.width = '40px';
      rocketCursor.style.height = '40px';
      rocketCursor.style.filter = 'drop-shadow(0 0 6px rgba(255, 123, 37, 0.7))';
    });
  });

// Inicializar galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGallery);
    
    // Efecto de partículas
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff7b25"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff7b25",
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.7
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Cambiar header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo al hacer scroll
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Formulario de contacto con Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Mostrar estado de carga
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
                this.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}


    
    
    
});
