// --- MENÚ HAMBURGUESA MOBILE---
const menuToggle = document.querySelector('.menu-toggle');
const listas = document.querySelector('.listas');

menuToggle.addEventListener('click', () => {
    listas.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

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
    slides[currentStep].classList.add('active');
    dots[currentStep].classList.add('active');
}

// Función para el cambio automático
function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentStep++;
        goToSlide(currentStep);
    }, 7000); // 6 segundos
}

// Función para cuando el usuario hace clic en un punto (BOTONES)
function currentSlide(n) {
    clearInterval(slideInterval); // Detenemos el auto-cambio para que no salte justo después de hacer clic
    goToSlide(n - 1); // Restamos 1 porque los arrays empiezan en 0
    startAutoSlide(); // Reiniciamos el contador
}

// Escuchar los clics en los puntos directamente desde JS (Más limpio)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index + 1);
    });
});

// Iniciar por primera vez
goToSlide(0);
startAutoSlide();

// -- ACORDEON FAQ ----
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
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

// -- ENVIO DE RESPUESTAS Y PREGUNTAS DEL USUARIO --

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
    const cuerpo = encodeURIComponent(`Consulta del cliente: \n\n${duda}`);
    window.location.href = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}
