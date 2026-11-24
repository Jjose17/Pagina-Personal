/**
 * SCRIPT PRINCIPAL - PORTAFOLIO JUAN JOSÉ ACEVEDO
 * Gestión de:
 * 1. Modales de proyectos y control de videos
 * 2. Copiado rápido de correo con Toast Notification
 * 3. Menú móvil interactivo (Hamburguesa)
 * 4. Filtro por categorías de proyectos (Tabs)
 * 5. ScrollSpy en el Navbar
 * 6. Micro-animaciones de entrada (Reveal on Scroll)
 * 7. Navegación suave
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. MODALES DE PROYECTOS Y CONTROL DE VIDEOS
    // =========================================================================
    const botonesProyecto = document.querySelectorAll("[data-project]");
    const modales = document.querySelectorAll(".project-modal");

    function detenerVideos(modal) {
        const video = modal.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    function abrirModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add("activo");
        document.body.style.overflow = "hidden";
    }

    function cerrarModal(modal) {
        modal.classList.remove("activo");
        detenerVideos(modal);
        document.body.style.overflow = "";
    }

    botonesProyecto.forEach((boton) => {
        boton.addEventListener("click", () => {
            const targetId = boton.dataset.project;
            abrirModal(targetId);
        });
    });

    modales.forEach((modal) => {
        const closeBtn = modal.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => cerrarModal(modal));
        }

        modal.addEventListener("click", (evento) => {
            if (evento.target === modal) {
                cerrarModal(modal);
            }
        });
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            const modalAbierto = document.querySelector(".project-modal.activo");
            if (modalAbierto) {
                cerrarModal(modalAbierto);
            }
        }
    });

    // =========================================================================
    // 2. COPIADO DE CORREO AL PORTAPAPELES CON TOAST NOTIFICATION
    // =========================================================================
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMessage");
    let toastTimeout = null;

    function mostrarToast(mensaje) {
        if (!toast) return;
        toastMsg.textContent = mensaje;
        toast.classList.add("show");

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    function copiarCorreo(email) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email).then(() => {
                mostrarToast(`¡Correo copiado: ${email}! 📋`);
            }).catch(() => {
                fallbackCopiar(email);
            });
        } else {
            fallbackCopiar(email);
        }
    }

    function fallbackCopiar(email) {
        const inputTemp = document.createElement("input");
        inputTemp.value = email;
        document.body.appendChild(inputTemp);
        inputTemp.select();
        try {
            document.execCommand("copy");
            mostrarToast(`¡Correo copiado: ${email}! 📋`);
        } catch (err) {
            mostrarToast(`Correo: ${email}`);
        }
        document.body.removeChild(inputTemp);
    }

    const btnQuickCopy = document.getElementById("btnQuickCopy");
    if (btnQuickCopy) {
        btnQuickCopy.addEventListener("click", () => {
            copiarCorreo(btnQuickCopy.dataset.email || "juanjoseacevedodeveloper@gmail.com");
        });
    }

    const btnCopyBanner = document.getElementById("btnCopyEmailBanner");
    if (btnCopyBanner) {
        btnCopyBanner.addEventListener("click", () => {
            copiarCorreo(btnCopyBanner.dataset.email || "juanjoseacevedodeveloper@gmail.com");
        });
    }

    // =========================================================================
    // 3. MENÚ MÓVIL INTERACTIVO (HAMBURGUESA)
    // =========================================================================
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("open");
                navMenu.classList.remove("open");
            });
        });

        // Cerrar menú al hacer clic fuera del navbar
        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove("open");
                navMenu.classList.remove("open");
            }
        });
    }

    // =========================================================================
    // 4. FILTRO INTERACTIVO POR CATEGORÍAS (TABS)
    // =========================================================================
    const filterTabs = document.querySelectorAll(".filter-tab");
    const allProjectCards = document.querySelectorAll(".project-card-featured, .secondary-card");

    filterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            filterTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const filtro = tab.dataset.filter;

            allProjectCards.forEach((card) => {
                const categoria = card.dataset.category;

                if (filtro === "all" || categoria === filtro) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }
            });
        });
    });

    // =========================================================================
    // 5. SCROLLSPY EN EL NAVBAR
    // =========================================================================
    const secciones = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-item");

    function actualizarScrollSpy() {
        const scrollY = window.pageYOffset;

        secciones.forEach((seccion) => {
            const seccionTop = seccion.offsetTop - 120;
            const seccionHeight = seccion.offsetHeight;
            const seccionId = seccion.getAttribute("id");

            if (scrollY >= seccionTop && scrollY < seccionTop + seccionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${seccionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", actualizarScrollSpy, { passive: true });

    // =========================================================================
    // 6. MICRO-ANIMACIONES DE ENTRADA (REVEAL ON SCROLL)
    // =========================================================================
    const elementosReveal = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observerReveal = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Solo anima una vez
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        elementosReveal.forEach((el) => observerReveal.observe(el));
    } else {
        elementosReveal.forEach((el) => el.classList.add("visible"));
    }

    // =========================================================================
    // 7. NAVEGACIÓN SUAVE
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});