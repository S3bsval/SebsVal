'use strict';

document.addEventListener("DOMContentLoaded", function () {
    // =========================================================
    // 0. EFECTO DE BYTES / HEX CORRIENDO EN LA IMAGEN DE PERFIL
    // =========================================================
    const canvas = document.getElementById("avatar-byte-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const chars = ["0", "1", "01", "10", "FF", "A5", "RF", "78", "C4", "0x"];
        const fontSize = 9;
        let columns = 0;
        let drops = [];

        const initCanvas = () => {
            canvas.width = canvas.offsetWidth || 144;
            canvas.height = canvas.offsetHeight || 144;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        };

        initCanvas();
        window.addEventListener("resize", initCanvas);

        const drawBytes = () => {
            ctx.fillStyle = "rgba(6, 11, 22, 0.22)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = i % 3 === 0 ? "#a78bfa" : "#10b981";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.92) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let timer = null;
        const start = () => { if (!timer && !reduceMotion) timer = setInterval(drawBytes, 70); };
        const stop = () => { clearInterval(timer); timer = null; };

        if (reduceMotion) drawBytes(); else start();
        document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    }

    // =========================================================
    // 1. MOSTRAR/OCULTAR FICHA DEL SIDEBAR EN MÓVIL Y TABLET
    // =========================================================
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

    // =========================================================
    // 2. NAVEGACIÓN ENTRE PESTAÑAS
    // =========================================================
    const navButtons = document.querySelectorAll("[data-target]");
    const pages = document.querySelectorAll("[data-page]");

    navButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-target");

            pages.forEach((page) => {
                if (page.getAttribute("data-page") === targetPage) {
                    page.classList.add("active");
                } else {
                    page.classList.remove("active");
                }
            });

            document.querySelectorAll(".navbar-link").forEach((b) => {
                b.classList.toggle("active", b.getAttribute("data-target") === targetPage);
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // =========================================================
    // 3. FILTRADO DE PROYECTOS POR CATEGORÍA
    // =========================================================
    const filterBtns = document.querySelectorAll("[data-filter]");
    const projectItems = document.querySelectorAll(".project-item");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const selectedFilter = this.getAttribute("data-filter");

            filterBtns.forEach((b) => {
                b.classList.remove("active", "bg-emerald-500/20", "text-emerald-400", "border-emerald-500/40");
                b.classList.add("bg-slate-900/80", "text-slate-400", "border-slate-800");
            });
            this.classList.add("active", "bg-emerald-500/20", "text-emerald-400", "border-emerald-500/40");
            this.classList.remove("bg-slate-900/80", "text-slate-400", "border-slate-800");

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

    // =========================================================
    // 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // =========================================================
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