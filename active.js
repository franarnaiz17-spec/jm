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




// -- CAMBIO ENTRE TARJETAS DE MISION Y VISION --
// Funciones para cambiar entre capas
function showVision() {
    const visionLayer = document.getElementById('layer-vision');
    if (visionLayer) {
        visionLayer.classList.add('active');
    }
}

function showMision() {
    const visionLayer = document.getElementById('layer-vision');
    if (visionLayer) {
        visionLayer.classList.remove('active');
    }
}





// -- ANIMACION DE NUMEROS PARA CUANDO EL USUARIO SE DESPLAZA A LA SECCION DE NUESTROS PILARES --
// animacion de numeros que cuenta hacia atras y adelante
document.addEventListener('DOMContentLoaded', () => {
    // animacion de numeros
    const counters = document.querySelectorAll('.jm-numero');
    // reader
    const reader = document.getElementById('reader');
    const speed = 60; // Ajusta esto para la suavidad
    // tiempo
    const tiempo = 60; // Ajusta esto para la suavidad
    const startCounters = () => {
        // animacion de numeros
        counters.forEach(numero => {
            const target = +numero.getAttribute('data-target');
            // Leemos el número inicial desde data-start (si no existe, usa 0)
            const startValue = +numero.getAttribute('data-start') || 0;

            // Ponemos el valor inicial en el HTML antes de empezar
            numero.innerText = startValue;
            // actualizacion de numeros
            const updateCount = () => {
                const current = +numero.innerText;
                // logica de numeros
                if (startValue > target) {
                    // --- LÓGICA EN REVERSA (Para el 6 y el 4) ---
                    const step = Math.ceil((startValue - target) / speed);
                    if (current > target) {
                        numero.innerText = current - step < target ? target : current - step;
                        setTimeout(updateCount, 40);
                    }
                } else {
                    // --- LÓGICA NORMAL (Para el 95) ---
                    const step = Math.ceil(target / speed);
                    if (current < target) {
                        numero.innerText = current + step > target ? target : current + step;
                        setTimeout(updateCount, 40);
                    }
                }
            };
            // funcion para iniciar la animacion de numeros
            updateCount();
        });
    };
    // observer
    const observer = new IntersectionObserver((entries) => {
        // animacion de numeros
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const section = document.querySelector('.jm-beneficios-section');
    if (section) observer.observe(section);
});



// =========================================================================
//  FILTROS INTERACTIVOS PARA LA GALERÍA DE TRABAJOS (JM MULTISERVICIOS)
// =========================================================================

// JM MULTISERVICIOS - Sistema Modular de Galería Interactiva
// Manejo de filtros con efecto de escala y encogimiento de rejilla (Grid)

/**
 * JM MULTISERVICIOS - Módulo Unificado de Galería
 * Maneja: 1. Filtros con reajuste de Grid | 2. Lightbox Modal de ampliación
 */
/**
 * JM MULTISERVICIOS - Módulo Unificado de Galería (Página Trabajos)
 * Maneja de forma independiente: 
 * 1. Filtros fluidos con encogimiento de cajas.
 * 2. Lightbox Modal adaptado a la capa del portafolio.
 */
document.addEventListener('DOMContentLoaded', () => {

    // TUS SELECTORES HTML REALES (trabajos.html)
    const botonesFiltro = document.querySelectorAll('.eleccion-btn');
    const tarjetasTrabajo = document.querySelectorAll('.portfolio-trabajos');

    // =========================================================================
    //  1. SISTEMA DE FILTROS INTERACTIVOS (CON ENCOGIMIENTO)
    // =========================================================================
    if (botonesFiltro.length > 0 && tarjetasTrabajo.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesFiltro.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');

                // Filtros de tu HTML: "all", "hidraulica", "revestimientos", "limpieza", etc.
                const filtroObjetivo = boton.getAttribute('data-filter');

                tarjetasTrabajo.forEach(tarjeta => {
                    const categoriaTarjeta = tarjeta.getAttribute('data-category');

                    if (filtroObjetivo === 'all' || categoriaTarjeta === filtroObjetivo) {
                        tarjeta.style.display = 'block';
                        void tarjeta.offsetWidth; // Forzar reflow para reiniciar transición
                        tarjeta.style.opacity = '1';
                        tarjeta.style.transform = 'scale(1)';
                        tarjeta.style.pointerEvents = 'auto'; // Permitir clics de nuevo
                    } else {
                        tarjeta.style.opacity = '0';
                        tarjeta.style.transform = 'scale(0.85)';
                        tarjeta.style.pointerEvents = 'none'; // Desactivar clics mientras desaparece

                        setTimeout(() => {
                            if (tarjeta.style.opacity === '0') {
                                tarjeta.style.display = 'none'; // Encoge la rejilla
                            }
                        }, 400);
                    }
                });
            });
        });
    }

    // =========================================================================
    //  2. SISTEMA LIGHTBOX MODAL (AMPLIACIÓN COMPATIBLE CON TU CAPA HOVER)
    // =========================================================================
    const lightbox = document.getElementById('jm-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-titulo');
    const botonCerrar = document.querySelector('.lightbox-cerrar');

    if (lightbox && tarjetasTrabajo.length > 0) {

        tarjetasTrabajo.forEach(tarjeta => {
            // Hacemos que toda la tarjeta sea clickable, rompiendo el bloqueo de la capa flotante
            tarjeta.style.cursor = 'pointer';

            tarjeta.addEventListener('click', () => {
                // Buscamos la imagen y el h3 reales dentro de tu estructura .item-trabajos
                const imgOriginal = tarjeta.querySelector('.item-trabajos img');
                const tituloOriginal = tarjeta.querySelector('.item-capa h3');

                if (imgOriginal) {
                    // Copiamos la ruta exacta del src y el texto del h3 al modal
                    lightboxImg.src = imgOriginal.src;
                    lightboxCaption.innerText = tituloOriginal ? tituloOriginal.innerText : "";

                    // Activamos la vista del modal
                    lightbox.style.display = "block";
                    document.body.style.overflow = "hidden"; // Detiene el scroll trasero para mejor UX

                    setTimeout(() => {
                        lightbox.classList.add('abierto');
                    }, 50);
                }
            });
        });

        // Mecanismo de cierre limpio
        const cerrarLightbox = () => {
            lightbox.classList.remove('abierto');
            document.body.style.overflow = "initial"; // Devuelve el scroll a la página

            setTimeout(() => {
                lightbox.style.display = "none";
                lightboxImg.src = ""; // Limpieza de memoria
            }, 300);
        };

        if (botonCerrar) {
            botonCerrar.addEventListener('click', cerrarLightbox);
        }

        // Cerrar si hacen clic en el fondo negro fuera de la foto ampliada
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                cerrarLightbox();
            }
        });
    }
});

// =========================================================================
//  3. SISTEMA DE MODAL PARA ARTÍCULOS DEL BLOG (POR POSICIÓN INFALIBLE)
// =========================================================================

// Base de datos estructurada por el orden de las tarjetas (0 para la primera, 1 para la segunda)
const contenidoConsejosPorIndice = {
    0: `
            <p>Las fallas en los sistemas hidroneumáticos pueden dejar sin agua a cientos de familias en Caracas en cuestión de minutos. Siga este protocolo preventivo técnico desarrollado por nuestros ingenieros para identificar las 3 alertas críticas:</p>
            <ul>
                <li><strong>Alerta 01 - Monitoreo de Ciclos Cortos:</strong> Si la bomba enciende y apaga más de 6 veces por hora de forma intermitente, significa que la membrana del tanque perdió presión de aire o está rota. Debe corregirse inmediatamente para evitar quemar el motor principal por sobrecalentamiento.</li>
                <li><strong>Alerta 02 - Vibraciones Magnéticas en Tableros:</strong> Inspeccione mensualmente el tablero eléctrico de control. Si los contactores emiten ruidos extraños o zumbidos fuertes, indica un desgaste magnético inminente. Recuerde verificar que los relés térmicos de protección estén calibrados exactamente al amperaje nominal del motor.</li>
                <li><strong>Alerta 03 - Caídas Repentinas de Presión:</strong> Mantenga un registro diario de las lecturas de los manómetros. Una pérdida drástica de presión suele alertar sobre fugas ocultas en la válvula de pie (pichón), obstrucción en las tuberías de succión o un desgaste severo en los impulsores internos de la bomba.</li>
            </ul>
        `,
    1: `
            <p>El alto tránsito en los pasillos de condominios destruye el brillo si no se trata adecuadamente. Aplique estos consejos especializados de mantenimiento:</p>
            <ul>
                <li><strong>Elimine Químicos Ácidos:</strong> Nunca permita el uso de cloro puro, desinfectantes comerciales ácidos o vinagre en pisos cristalizados. Estos componentes abren el poro de la piedra y matan el efecto espejo.</li>
                <li><strong>Tratamiento Neutro Semanal:</strong> Utilice exclusivamente jabones de pH neutro diluidos en agua limpia. La mopa debe estar ligeramente húmeda, nunca empapada.</li>
                <li><strong>Barreras Anti-Abrasión:</strong> Coloque alfombras atrapamugre de alta resistencia en las entradas principales del edificio y ascensores. El 80% del desgaste del cristalizado proviene de la arena y polvo arrastrados por los zapatos.</li>
            </ul>
        `
};

const blogModal = document.getElementById('blog-modal');
const modalCategoria = document.getElementById('blog-modal-categoria');
const modalTitulo = document.getElementById('blog-modal-titulo');
const modalCuerpo = document.getElementById('blog-modal-cuerpo');
const cerrarBlogBtn = document.querySelector('.blog-modal-cerrar');
const enlacesBlog = document.querySelectorAll('.blog-link');

if (blogModal && enlacesBlog.length > 0) {
    // Usamos el "index" para saber matemáticamente cuál tarjeta se clickeó
    enlacesBlog.forEach((enlace, index) => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();

            // Detectamos la tarjeta correspondiente
            const tarjetaBlog = enlace.closest('.tarjeta-blog');
            const categoriaOriginal = tarjetaBlog.querySelector('.blog-date').innerText;
            const tituloOriginal = tarjetaBlog.querySelector('.info-blog h3').innerText;

            // Inyectamos el título y categoría reales que tengas escritos en el HTML
            modalCategoria.innerText = categoriaOriginal;
            modalTitulo.innerText = tituloOriginal;

            // Buscamos en la base de datos usando el número de posición (0 o 1)
            if (contenidoConsejosPorIndice[index]) {
                modalCuerpo.innerHTML = contenidoConsejosPorIndice[index];
            } else {
                modalCuerpo.innerHTML = "<p>Consejos técnicos en desarrollo por el equipo de JM Multiservicios...</p>";
            }

            // Desplegamos el modal con la configuración correcta
            blogModal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                blogModal.classList.add('abierto');
            }, 50);
        });
    });

    // Función de cierre unificada
    const cerrarBlogModal = () => {
        blogModal.classList.remove('abierto');
        document.body.style.overflow = 'initial';

        setTimeout(() => {
            blogModal.style.display = 'none';
        }, 300);
    };

    if (cerrarBlogBtn) {
        cerrarBlogBtn.addEventListener('click', cerrarBlogModal);
    }

    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            cerrarBlogModal();
        }
    });
}