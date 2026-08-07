// ===== Pausa el video del modal cuando se cierra =====
function detenerVideos(modal) {
    const video = modal.querySelector("video");
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// ===== Abrir / cerrar modales de proyectos =====
document.addEventListener("DOMContentLoaded", () => {
    const botonesProyecto = document.querySelectorAll("[data-project]");
    const modales = document.querySelectorAll(".project-modal");

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

    // Abrir al hacer click en "Ver Sistema"
    botonesProyecto.forEach((boton) => {
        boton.addEventListener("click", () => {
            abrirModal(boton.dataset.project);
        });
    });

    modales.forEach((modal) => {
        // Cerrar con la X
        const closeBtn = modal.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => cerrarModal(modal));
        }

        // Cerrar al hacer click fuera del contenido
        modal.addEventListener("click", (evento) => {
            if (evento.target === modal) {
                cerrarModal(modal);
            }
        });
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            const modalAbierto = document.querySelector(".project-modal.activo");
            if (modalAbierto) {
                cerrarModal(modalAbierto);
            }
        }
    });

    // Año dinámico en el footer
    const anioSpan = document.getElementById("anio");
    if (anioSpan) {
        anioSpan.textContent = new Date().getFullYear();
    }
});
