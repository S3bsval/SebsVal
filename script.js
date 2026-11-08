'use strict';

// 1. Mostrar/Ocultar contactos del Sidebar en Móvil y Tablet
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarBtnText = document.querySelector("[data-sidebar-btn-text]");

if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        if (sidebarBtnText) {
            sidebarBtnText.textContent = sidebar.classList.contains("active")
                ? "Ocultar"
                : "Contactos";
        }
    });
}

// 2. Navegación entre pestañas (Sobre mí, Trayectoria, Proyectos, Artículos, Contacto)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
        const targetPage = this.dataset.navLink;

        pages.forEach((page) => {
            if (page.dataset.page === targetPage) {
                page.classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                page.classList.remove("active");
            }
        });

        navigationLinks.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

// 3. Filtrado de Proyectos por categoría (Todos, RF & GIS, IoT & Hardware, Software)
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        const selectedCategory = this.dataset.filterBtn;

        // Actualizar estilo visual de los botones de filtro
        filterBtns.forEach((b) => {
            b.classList.remove("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
            b.classList.add("bg-slate-800/60", "text-slate-400", "border-slate-700/60");
        });
        this.classList.add("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
        this.classList.remove("bg-slate-800/60", "text-slate-400", "border-slate-700/60");

        // Mostrar u ocultar proyectos según la categoría
        filterItems.forEach((item) => {
            if (selectedCategory === "all" || item.dataset.category === selectedCategory) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    });
});

// 4. Validación en tiempo real del formulario de contacto
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