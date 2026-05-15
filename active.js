// -- ENCARGADO DE APRECER EL MENU HAMBURGUESA--
document.addEventListener('DOMContentLoaded', () => {
    // --- MENÚ HAMBURGUESA MOBILE---
    const menuToggle = document.querySelector('.menu-toggle');
    const listas = document.querySelector('.listas');

    if (menuToggle && listas) {
        menuToggle.addEventListener('click', () => {
            // Esto hace la animación de las barritas (X)
            menuToggle.classList.toggle('is-active');

            // Esto mueve el menú de left: -100% a left: 0
            listas.classList.toggle('active');

            // --- MEJORA: Bloqueo de scroll al abrir el menú ---
            if (listas.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
            }
        });

        // --- MEJORA: Cerrar el menú al hacer clic en un enlace ---
        const links = document.querySelectorAll('.listas ul li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                listas.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // -- CARRUSEL DINÁMICO BANNER --
    let currentStep = 0;
    let slideInterval; // Variable para controlar el tiempo
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Función principal para mostrar un slide específico
    function goToSlide(n) {
        if (!slides.length) return; // Evita error si no hay slides

        // 1. Quitar clases activas
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 2. Ajustar el índice (por si se pasa del límite)
        currentStep = n;
        if (currentStep >= slides.length) { currentStep = 0; }
        if (currentStep < 0) { currentStep = slides.length - 1; }

        // 3. Activar el slide y el punto correspondiente
        if (slides[currentStep]) slides[currentStep].classList.add('active');
        if (dots[currentStep]) dots[currentStep].classList.add('active');
    }

    // Función para el cambio automático
    function startAutoSlide() {
        if (!slides.length) return;
        slideInterval = setInterval(() => {
            goToSlide(currentStep + 1);
        }, 5000); // Cambia cada 5 segundos
    }

    // Detener el auto-slide al interactuar
    function resetTimer() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Eventos para los puntos (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
    });

    // Iniciar el carrusel si existen slides
    if (slides.length > 0) {
        startAutoSlide();
    }


});

// -- ENCARGADO DE APRECER Y DESAPARECER LAS RESPUESTAS DE LAS PREGUNTAS FRECUENTES --
document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscamos todos los contenedores de preguntas
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(questionDiv => {
        questionDiv.addEventListener('click', () => {
            // Buscamos el elemento padre (.faq-item)
            const item = questionDiv.parentElement;

            // Verificamos si ya está abierto
            const isActive = item.classList.contains('active');

            // 2. CERRAMOS TODOS los demás para que solo uno esté abierto
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                // Cambiamos el icono de los demás a PLUS (+)
                const icon = otherItem.querySelector('.faq-question i');
                if (icon) icon.className = 'fas fa-plus';
            });

            // 3. Si el que tocamos no estaba abierto, lo abrimos
            if (!isActive) {
                item.classList.add('active');
                // Cambiamos su icono a MINUS (-)
                const icon = questionDiv.querySelector('i');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });
});

// -- ENVIO DE RESPUESTAS Y PREGUNTAS DEL USUARIO WHATSAPP --
function enviarWhatsApp() {
    const duda = document.getElementById('user-duda').value;
    const telefono = "584120989788";

    if (duda.trim() === "") {
        alert("Por favor, escribe tu duda primero.");
        return;
    }

    const mensaje = encodeURIComponent(`Hola JM Multiservicios, tengo una consulta desde la web: ${duda}`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}
// -- ENVIO DE RESPUESTAS Y PREGUNTAS DEL USUARIO CORREO--
function enviarCorreo() {
    const duda = document.getElementById('user-duda').value;
    const correo = "remodelservicejm@gmail.com";

    if (duda.trim() === "") {
        alert("Por favor, escribe tu duda primero.");
        return;
    }

    const asunto = encodeURIComponent("Consulta desde la Web - JM Multiservicios");
    const cuerpo = encodeURIComponent(duda);
    window.location.href = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}

// -- DESPLIEGUE DE CATALAGO DE SERVICIOS --

function toggleServicio(element) {
    // 1. Seleccionamos todos los items de la lista
    const todosLosItems = document.querySelectorAll('.servicio-item');

    // 2. Guardamos si el que tocamos ya estaba abierto
    const estabaAbierto = element.classList.contains('active');

    // 3. REGLA DE ORO: Cerramos todos sin excepción
    todosLosItems.forEach(item => {
        item.classList.remove('active');
    });

    // 4. Si el que tocamos NO estaba abierto, lo abrimos
    // Si ya estaba abierto, al haberlo cerrado en el paso anterior, ahora se queda cerrado
    if (!estabaAbierto) {
        element.classList.add('active');
    }
}