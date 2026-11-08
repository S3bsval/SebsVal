'use strict';

document.addEventListener("DOMContentLoaded", function () {
    // 1. Mostrar/Ocultar ficha del Sidebar en Móvil y Tablet
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    const sidebarBtnText = document.querySelector("[data-sidebar-btn-text]");

    if (sidebar && sidebarBtn) {
        sidebarBtn.addEventListener("click", function () {
            sidebar.classList.toggle("active");
            if (sidebarBtnText) {
                sidebarBtnText.textContent = sidebar.classList.contains("active")
                    ? "Ocultar"
                    : "Ficha";
            }
        });
    }

    // 2. Navegación entre pestañas (Perfil, Experiencia & CV, Stack & Certificaciones, Proyectos, Contacto)
    const navButtons = document.querySelectorAll("[data-target]");
    const pages = document.querySelectorAll("[data-page]");

    navButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-target");

            // Activar solo la sección elegida
            pages.forEach((page) => {
                if (page.getAttribute("data-page") === targetPage) {
                    page.classList.add("active");
                } else {
                    page.classList.remove("active");
                }
            });

            // Resaltar el botón activo en la barra de navegación
            navButtons.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // 3. Filtrado de Proyectos por categoría
    const filterBtns = document.querySelectorAll("[data-filter]");
    const projectItems = document.querySelectorAll(".project-item");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const selectedFilter = this.getAttribute("data-filter");

            // Actualizar estilos de los botones de filtro
            filterBtns.forEach((b) => {
                b.classList.remove("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
                b.classList.add("bg-slate-800/60", "text-slate-400", "border-slate-700/60");
            });
            this.classList.add("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
            this.classList.remove("bg-slate-800/60", "text-slate-400", "border-slate-700/60");

            // Mostrar u ocultar tarjetas de proyectos
            projectItems.forEach((item) => {
                const itemCategory = item.getAttribute("data-category");
                if (selectedFilter === "all" || itemCategory === selectedFilter) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        });
    });

    // 4. Validación del formulario de contacto
    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");

    if (form && formBtn) {
        formInputs.forEach((input) => {
            input.addEventListener("input", function () {
                if (form.checkValidity()) {
                    formBtn.removeAttribute("disabled");
                } else {
                    formBtn.setAttribute("disabled", "");
                }
            });
        });
    }
});