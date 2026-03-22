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

    // Agarramos el usuario que inició sesión
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

    // Si no hay usuario, lo mandamos al login
    if (!usuarioActivo) {
        window.location.href = "index.html";
        return;
    }

    // Mostramos nombre y foto del usuario
    if (nombreUsuario) nombreUsuario.textContent = usuarioActivo.nombreCompleto;
    if (imagenPerfil) imagenPerfil.src = usuarioActivo.fotoPerfil;

    // Si no es admin, ocultamos esa sección
    if (!usuarioActivo.esAdministrador && seccionAdmin) {
        seccionAdmin.style.display = "none";
    }

    // Botón para cerrar sesión
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => {
            sessionStorage.removeItem("usuarioActivo");
            window.location.href = "../index.html";
        });
    }

    // Botón para ir a editar perfil
    if (botonEditarPerfil) {
        botonEditarPerfil.addEventListener("click", () => {
            window.location.href = "../editar_perfil/editar_perfil.html";
        });
    }

    // Cargamos las tarjetas guardadas al entrar
    const tarjetasGuardadas = JSON.parse(localStorage.getItem("tarjetas")) || [];
    mostrarTarjetas(tarjetasGuardadas);

    // Botón para subir JSON
    if (botonCargarJson) {
        botonCargarJson.addEventListener("click", () => {

            const archivo = inputJson.files[0];

            // Si no selecciona archivo
            if (!archivo) {
                alert("Selecciona un archivo JSON");
                return;
            }

            const lector = new FileReader();

            lector.onload = (evento) => {
                try {
                    const datos = JSON.parse(evento.target.result);

                    // Agarramos lo que ya había guardado
                    const tarjetasActuales = JSON.parse(localStorage.getItem("tarjetas")) || [];

                    // Juntamos lo nuevo con lo viejo
                    const nuevasTarjetas = [...tarjetasActuales, ...datos];

                    // Guardamos todo junto
                    localStorage.setItem("tarjetas", JSON.stringify(nuevasTarjetas));

                    // Mostramos todas las tarjetas
                    mostrarTarjetas(nuevasTarjetas);

                } catch (error) {
                    alert("JSON inválido");
                }
            };

            lector.readAsText(archivo);
        });
    }

    // Función que dibuja las tarjetas en pantalla
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

            // Botón para eliminar (solo admin)
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