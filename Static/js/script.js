document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector("h1");
    const busquedaInput = document.getElementById("busqueda"); // Variable para el input de búsqueda

    titulo.style.opacity = "0";
    titulo.style.transform = "translateY(-20px)";
    titulo.style.transition = "opacity 1s ease, transform 1s ease";

    setTimeout(() => {
        titulo.style.opacity = "1";
        titulo.style.transform = "translateY(0)";
    }, 500);

    busquedaInput.addEventListener("input", filtrarPorNombre); // Evento de búsqueda por nombre
});

const productos = document.querySelectorAll(".producto"); // Seleccionar todos los productos

// Función para filtrar por nombre
function filtrarPorNombre() {
    const textoBusqueda = document.getElementById("busqueda").value.toLowerCase(); // Obtener el valor del input

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector(".card-title").textContent.toLowerCase();

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = "block"; // Mostrar el producto si coincide con la búsqueda
        } else {
            producto.style.display = "none"; // Ocultar el producto si no coincide
        }
    });
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    productos.forEach(producto => {
        let categoriaProducto = producto.getAttribute("data-categoria");

        if (categoria === "todos" || categoriaProducto === categoria) {
            producto.style.display = "block"; // Mostrar
        } else {
            producto.style.display = "none"; // Ocultar
        }
    });
}

// Botón para mostrar/ocultar filtros
function toggleFiltros() {
    let filtros = document.getElementById("filtros-container");
    filtros.classList.toggle("oculto"); // Alterna la clase para mostrar u ocultar
}

// Carga dinámica de contenido
fetch('fin.html')
    .then(response => response.text())
    .then(data => document.getElementById('final-container').innerHTML = data);

// Desplazarse arriba
document.getElementById("scrollToTop").addEventListener("click", function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const celular = document.getElementById('celular').value;
    const descripcion = document.getElementById('descripcion').value;

    if (nombre.trim() === "" || correo.trim() === "" || celular.trim() === "" || descripcion.trim() === "") {
        alert("Faltan campos por completar");
        return; // Detener la ejecución del código si hay campos vacíos
    }

    var myModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
    myModal.show();

    document.getElementById('mensajeModal').addEventListener('hidden.bs.modal', function () {
        location.reload();
    });
});
