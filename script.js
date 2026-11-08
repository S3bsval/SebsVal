'use strict';

document.addEventListener("DOMContentLoaded", function () {
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

    // 2. Navegación entre pestañas (Soporta atributo data-nav-link y texto en ES/EN)
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    const pageMap = {
        "sobre mí": "about",
        "about": "about",
        "trayectoria": "resume",
        "resume": "resume",
        "proyectos": "portfolio",
        "portfolio": "portfolio",
        "artículos": "blog",
        "blog": "blog",
        "contacto": "contact",
        "contact": "contact"
    };

    navigationLinks.forEach((link) => {
        link.addEventListener("click", function () {
            const attrValue = this.getAttribute("data-nav-link")?.trim().toLowerCase();
            const textValue = this.textContent.trim().toLowerCase();
            const targetPage = (attrValue && attrValue !== "") ? attrValue : pageMap[textValue];

            if (!targetPage) return;

            // Mostrar solo la sección seleccionada y ocultar las demás
            pages.forEach((page) => {
                const isMatch = page.dataset.page.toLowerCase() === targetPage;
                page.classList.toggle("active", isMatch);
                page.style.display = isMatch ? "block" : "none";
            });

            // Actualizar estado activo del botón
            navigationLinks.forEach((nav) => nav.classList.remove("active"));
            this.classList.add("active");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // Inicializar vista por defecto asegurando que solo 'about' sea visible al cargar
    pages.forEach((page) => {
        const isActive = page.classList.contains("active");
        page.style.display = isActive ? "block" : "none";
    });

    // 3. Filtrado de Proyectos
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const selectedCategory = this.getAttribute("data-filter-btn") || "all";

            filterBtns.forEach((b) => {
                b.classList.remove("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
                b.classList.add("bg-slate-800/60", "text-slate-400", "border-slate-700/60");
            });
            this.classList.add("active", "bg-cyan-500/20", "text-cyan-400", "border-cyan-500/40");
            this.classList.remove("bg-slate-800/60", "text-slate-400", "border-slate-700/60");

            filterItems.forEach((item) => {
                const match = selectedCategory === "all" || item.dataset.category === selectedCategory;
                item.classList.toggle("active", match);
                item.style.display = match ? "flex" : "none";
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