// ============================= EVENTO 1: TEMA CLARO/OSCURO ============================= //

/**
 * Sistema de tema claro/oscuro con almacenamiento persistente
 * Permite al usuario cambiar entre tema claro y oscuro
 * La preferencia se guarda en localStorage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia del botón de tema
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Cargar tema guardado del localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema guardado al cargar
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Evento click para cambiar tema
    themeToggle.addEventListener('click', function() {
        // Toggle de clase
        document.body.classList.toggle('dark-theme');
        
        // Cambiar icono
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDarkTheme 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Guardar preferencia en localStorage
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Animación del botón
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// ============================= EVENTO 2: ANIMACIÓN AL SCROLL ============================= //

/**
 * Sistema de animación de elementos al hacer scroll
 * Los elementos se revelan con efecto fade-in cuando entran en el viewport
 * Utiliza Intersection Observer API para eficiencia
 */
document.addEventListener('DOMContentLoaded', function() {
    // Crear observador de intersección
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase visible cuando entra al viewport
                entry.target.classList.add('visible');
                
                // Animar las tarjetas con delay
                const cards = entry.target.querySelectorAll('.education-card, .skill-card, .experience-card');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
                    
                    // Trigger reflow para activar animación
                    void card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });
    
    // Animación adicional para cards del acordeón
    const accordionCards = document.querySelectorAll('.accordion-item');
    accordionCards.forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });
});

// ============================= EVENTO 3: VALIDACIÓN DE FORMULARIO ============================= //

/**
 * Sistema de validación de formulario en tiempo real con jQuery
 * Valida campos requeridos y formato de email
 * Muestra/oculta mensajes de error dinámicamente
 */
$(document).ready(function() {
    const contactForm = $('#contactForm');
    const nameInput = $('#name');
    const emailInput = $('#email');
    const subjectInput = $('#subject');
    const messageInput = $('#message');
    const successMessage = $('#successMessage');
    
    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Función para validar nombre
    function validateName() {
        const nameValue = nameInput.val().trim();
        const isValid = nameValue.length >= 3;
        
        if (!isValid && nameValue !== '') {
            $('#nameError').removeClass('d-none');
        } else {
            $('#nameError').addClass('d-none');
        }
        
        return isValid || nameValue === '';
    }
    
    // Función para validar email
    function validateEmail() {
        const emailValue = emailInput.val().trim();
        const isValid = emailRegex.test(emailValue);
        
        if (!isValid && emailValue !== '') {
            $('#emailError').removeClass('d-none');
        } else {
            $('#emailError').addClass('d-none');
        }
        
        return isValid || emailValue === '';
    }
    
    // Función para validar asunto
    function validateSubject() {
        const subjectValue = subjectInput.val().trim();
        const isValid = subjectValue.length >= 5;
        
        if (!isValid && subjectValue !== '') {
            $('#subjectError').removeClass('d-none');
        } else {
            $('#subjectError').addClass('d-none');
        }
        
        return isValid || subjectValue === '';
    }
    
    // Función para validar mensaje
    function validateMessage() {
        const messageValue = messageInput.val().trim();
        const isValid = messageValue.length >= 10;
        
        if (!isValid && messageValue !== '') {
            $('#messageError').removeClass('d-none');
        } else {
            $('#messageError').addClass('d-none');
        }
        
        return isValid || messageValue === '';
    }
    
    // Event listeners para validación en tiempo real
    nameInput.on('blur change', validateName);
    emailInput.on('blur change', validateEmail);
    subjectInput.on('blur change', validateSubject);
    messageInput.on('blur change', validateMessage);
    
    // Validación mientras escribe
    nameInput.on('input', function() {
        if ($(this).val().trim().length >= 3) {
            $('#nameError').addClass('d-none');
        }
    });
    
    emailInput.on('input', function() {
        if (emailRegex.test($(this).val().trim())) {
            $('#emailError').addClass('d-none');
        }
    });
    
    subjectInput.on('input', function() {
        if ($(this).val().trim().length >= 5) {
            $('#subjectError').addClass('d-none');
        }
    });
    
    messageInput.on('input', function() {
        if ($(this).val().trim().length >= 10) {
            $('#messageError').addClass('d-none');
        }
    });
    
    // Envío del formulario
    contactForm.on('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const nameValid = validateName();
        const emailValid = validateEmail();
        const subjectValid = validateSubject();
        const messageValid = validateMessage();
        
        if (nameValid && emailValid && subjectValid && messageValid) {
            // Todos los campos son válidos
            const formData = {
                name: nameInput.val(),
                email: emailInput.val(),
                phone: $('#phone').val(),
                subject: subjectInput.val(),
                message: messageInput.val()
            };
            
            console.log('Formulario válido. Datos:', formData);
            
            // Mostrar mensaje de éxito
            successMessage.removeClass('d-none').slideDown();
            
            // Limpiar formulario después de 2 segundos
            setTimeout(() => {
                contactForm[0].reset();
                successMessage.slideUp().addClass('d-none');
            }, 3000);
            
            // Aquí iría la llamada AJAX para enviar el formulario
            // Ejemplo:
            // $.ajax({
            //     type: 'POST',
            //     url: 'enviar-email.php',
            //     data: formData,
            //     success: function(response) {
            //         console.log('Email enviado exitosamente');
            //     },
            //     error: function(error) {
            //         console.log('Error al enviar email');
            //     }
            // });
        }
    });
    
    // Limpiar formulario al hacer click en "Limpiar"
    $('button[type="reset"]').on('click', function() {
        // Limpiar todos los mensajes de error
        $('#nameError, #emailError, #subjectError, #messageError').addClass('d-none');
        successMessage.addClass('d-none');
    });
});

// ============================= FUNCIONALIDADES ADICIONALES ============================= //

/**
 * Efecto hover en tarjetas de experiencia
 */
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

/**
 * Suavizar scroll a elementos ancla
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Offset para navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Animación de número progresivo (contador)
 */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 segundos
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const currentValue = Math.floor(finalValue * progress);
            
            // Formatear según el contenido
            if (stat.textContent.includes('+')) {
                stat.textContent = currentValue + '+';
            } else if (stat.textContent.includes('%')) {
                stat.textContent = currentValue + '%';
            } else {
                stat.textContent = currentValue;
            }
            
            if (currentStep === steps) {
                clearInterval(interval);
            }
        }, stepDuration);
    });
}

// Ejecutar animación de contadores cuando se hace scroll a la sección
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const heroSection = document.querySelector('.hero-section');
    let countersAnimated = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, observerOptions);
    
    if (heroSection) {
        observer.observe(heroSection);
    }
});

/**
 * Agregar feedback visual al hacer click en botones
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.7)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar animación ripple al CSS dinámicamente si no existe
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes ripple-animation {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================= CONSOLE LOG ============================= //
console.log('%c✨ CV Interactivo Cargado Exitosamente ✨', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cTemas disponibles: Claro/Oscuro', 'color: #10b981; font-size: 12px;');
console.log('%cAnimaciones: Scroll reveal activadas', 'color: #10b981; font-size: 12px;');
console.log('%cFormulario: Validación en tiempo real', 'color: #10b981; font-size: 12px;');