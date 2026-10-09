document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const btnCompromiso = document.getElementById("btnCompromiso");
    const mensajeCompromiso = document.getElementById("mensajeCompromiso");
    const contadorCompromisos = document.getElementById("contadorCompromisos");

    const CLAVE_COMPROMISO = "inframen_compromiso_filas";
    const CLAVE_CONTADOR = "inframen_contador_compromisos";

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const abierto = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(abierto));
            menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
            menuToggle.textContent = abierto ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            });
        });
    }

    let contador = Number(localStorage.getItem(CLAVE_CONTADOR)) || 0;
    const comprometido = localStorage.getItem(CLAVE_COMPROMISO) === "true";

    if (contadorCompromisos) {
        contadorCompromisos.textContent = contador;
    }

    if (comprometido && btnCompromiso) {
        btnCompromiso.disabled = true;
        btnCompromiso.textContent = "Compromiso realizado";
        mensajeCompromiso.textContent = "¡Gracias por comprometerte a respetar las filas!";
    }

    if (btnCompromiso) {
        btnCompromiso.addEventListener("click", () => {
            if (localStorage.getItem(CLAVE_COMPROMISO) === "true") {
                mensajeCompromiso.textContent = "Ya registraste tu compromiso. ¡Gracias!";
                return;
            }

            localStorage.setItem(CLAVE_COMPROMISO, "true");
            contador += 1;
            localStorage.setItem(CLAVE_CONTADOR, String(contador));

            contadorCompromisos.textContent = contador;
            mensajeCompromiso.textContent = "¡Gracias! Tu compromiso ayuda a mejorar la convivencia.";
            btnCompromiso.textContent = "Compromiso realizado";
            btnCompromiso.disabled = true;
        });
    }
});
