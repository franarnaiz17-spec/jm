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
        });
    }

    // --- CARRUSEL DINÁMICO BANNER ---
    let currentStep = 0;
    let slideInterval; // Variable para controlar el tiempo
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Función principal para mostrar un slide específico
    function goToSlide(n) {
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

    // --- ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ---
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;

            // Guardamos el estado actual del item clicado
            const isActive = item.classList.contains('active');

            // OPCIONAL: Cerramos todos los demás acordeones abiertos (Efecto acordeón real)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Si el item no estaba activo, lo abrimos
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// -- ENVIO DE RESPUESTAS Y PREGUNTAS DEL USUARIO --
// Estas funciones pueden ir fuera porque se llaman desde el HTML (onclick)

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

function enviarCorreo() {
    const duda = document.getElementById('user-duda').value;
    const correo = "remodelservicejm@gmail.com"; // <-- SUSTITUYE POR EL CORREO REAL

    if (duda.trim() === "") {
        alert("Por favor, escribe tu duda primero.");
        return;
    }

    const asunto = encodeURIComponent("Consulta desde la Web - JM Multiservicios");
    const cuerpo = encodeURIComponent(duda);
    window.location.href = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}