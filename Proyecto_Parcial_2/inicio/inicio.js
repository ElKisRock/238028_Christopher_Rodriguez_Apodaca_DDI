// Espera a que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    const nombreUsuario = document.getElementById("nombreUsuario");
    const imagenPerfil = document.getElementById("imagenPerfil");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");
    const botonEditarPerfil = document.getElementById("botonEditarPerfil");
    const seccionAdmin = document.getElementById("seccionAdmin");
    const contenedorTarjetas = document.getElementById("contenedorTarjetas");
    const botonCargarJson = document.getElementById("botonCargarJson");
    const inputJson = document.getElementById("inputJson");

    // Obtener el usuario que inició sesión
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario, regresar al login
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    // Mostrar nombre y foto del usuario
    nombreUsuario.textContent = usuarioActivo.nombreCompleto;
    imagenPerfil.src = usuarioActivo.fotoPerfil;

    // Ocultar opciones de admin si no lo es
    if (!usuarioActivo.esAdministrador) {
        seccionAdmin.style.display = "none";
    }

    // Botón para cerrar sesión
    botonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../index.html";
    });

    // Botón para ir a editar perfil
    botonEditarPerfil.addEventListener("click", () => {
        window.location.href = "../editar_perfil/editar_perfil.html";
    });

    // Cargar tarjetas guardadas al iniciar
    const tarjetasGuardadas = JSON.parse(localStorage.getItem("tarjetas")) || [];
    mostrarTarjetas(tarjetasGuardadas);

    // Botón para cargar archivo JSON
    botonCargarJson.addEventListener("click", () => {

        const archivo = inputJson.files[0];

        if (!archivo) {
            alert("Selecciona un archivo JSON");
            return;
        }

        // Leer el archivo
        const lector = new FileReader();

        lector.onload = (evento) => {
            try {
                const datos = JSON.parse(evento.target.result);

                // Guardar tarjetas en localStorage
                localStorage.setItem("tarjetas", JSON.stringify(datos));

                mostrarTarjetas(datos);
            } catch (error) {
                alert("JSON inválido");
            }
        };

        lector.readAsText(archivo);
    });

    // Función para mostrar las tarjetas en pantalla
    function mostrarTarjetas(lista) {
        contenedorTarjetas.innerHTML = "";

        lista.forEach((monstruo, indice) => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <img src="${monstruo.imagen}">
                <h3>${monstruo.nombre}</h3>
                <p>${monstruo.descripcion}</p>
            `;

            // Botón para eliminar tarjeta (solo admin)
            if (usuarioActivo.esAdministrador) {
                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";

                botonEliminar.addEventListener("click", () => {
                    eliminarTarjeta(indice);
                });

                tarjeta.appendChild(botonEliminar);
            }

            contenedorTarjetas.appendChild(tarjeta);
        });
    }

    // Función para eliminar una tarjeta
    function eliminarTarjeta(indice) {
        const tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];

        tarjetas.splice(indice, 1);

        localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

        mostrarTarjetas(tarjetas);
    }

});