document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector("h1");
    const busquedaInput = document.getElementById("busqueda");

    if (titulo) {
        titulo.style.opacity = "0";
        titulo.style.transform = "translateY(-20px)";
        titulo.style.transition = "opacity 1s ease, transform 1s ease";

        setTimeout(() => {
            titulo.style.opacity = "1";
            titulo.style.transform = "translateY(0)";
        }, 500);
    }

    if (busquedaInput) {
        busquedaInput.addEventListener("input", filtrarPorNombre);
    }

    let miElemento = document.getElementById("miElemento");
    if (miElemento) {
        miElemento.addEventListener("click", function () {
            console.log("Elemento clickeado");
        });
    }

    // Carga dinámica de contenido
    fetch('../Template/fin.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar fin.html");
            }
            return response.text();
        })
        .then(data => {
            let finalContainer = document.getElementById('final-container');
            if (finalContainer) {
                finalContainer.innerHTML = data;
            }
        })
        .catch(error => console.error("Error cargando fin.html:", error));

    // Carga dinámica de contenido
    fetch("../Template/Navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo cargar el navbar`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
    })
    .catch(error => console.error("Error cargando el navbar:", error.message));

    // Desplazarse arriba
    let scrollToTopBtn = document.getElementById("scrollToTop");
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", function () {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }

    // Manejo del formulario de contacto
    let contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const celular = document.getElementById('celular').value;
            const descripcion = document.getElementById('descripcion').value;

            if (nombre.trim() === "" || correo.trim() === "" || celular.trim() === "" || descripcion.trim() === "") {
                alert("Faltan campos por completar");
                return;
            }

            let mensajeModal = document.getElementById('mensajeModal');
            if (mensajeModal) {
                var myModal = new bootstrap.Modal(mensajeModal);
                myModal.show();

                mensajeModal.addEventListener('hidden.bs.modal', function () {
                    location.reload();
                });
            }
        });
    }
});

// Función para filtrar por nombre
function filtrarPorNombre() {
    const textoBusqueda = document.getElementById("busqueda").value.toLowerCase();
    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector(".card-title").textContent.toLowerCase();

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let categoriaProducto = producto.getAttribute("data-categoria");

        if (categoria === "todos" || categoriaProducto === categoria) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}

// Botón para mostrar/ocultar filtros
function toggleFiltros() {
    let filtros = document.getElementById("filtros-container");
    if (filtros) {
        filtros.classList.toggle("oculto");
    }
}
