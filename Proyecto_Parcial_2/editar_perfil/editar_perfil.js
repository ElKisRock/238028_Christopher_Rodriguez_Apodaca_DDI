// Espera a que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    const formularioEditarPerfil = document.getElementById("formularioEditarPerfil");
    const botonVolver = document.getElementById("botonVolver");

    const inputNombre = document.getElementById("nombreCompleto");
    const inputCorreo = document.getElementById("correo");
    const inputContrasena = document.getElementById("nuevaContrasena");
    const inputFoto = document.getElementById("fotoPerfil");

    // Agarramos el usuario que inició sesión
    let usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

    // Si no hay usuario, lo mandamos al login
    if (!usuarioActivo) {
        window.location.href = "index.html";
        return;
    }

    // Mostramos los datos actuales en el formulario
    if (inputNombre) inputNombre.value = usuarioActivo.nombreCompleto;
    if (inputCorreo) inputCorreo.value = usuarioActivo.correo;

    // Función para convertir imagen a base64
    const convertirImagenABase64 = (archivo) => {
        return new Promise((resolve, reject) => {

            const lector = new FileReader();

            lector.readAsDataURL(archivo);

            lector.onload = () => resolve(lector.result);

            lector.onerror = error => reject(error);
        });
    };

    // Guardar cambios del perfil
    if (formularioEditarPerfil) {
        formularioEditarPerfil.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscamos al usuario en la lista
            const indiceUsuario = listaUsuarios.findIndex(usuario =>
                usuario.correo === usuarioActivo.correo
            );

            if (indiceUsuario === -1) {
                alert("Error al actualizar usuario");
                return;
            }

            // Actualizamos nombre y correo
            listaUsuarios[indiceUsuario].nombreCompleto = inputNombre.value;
            listaUsuarios[indiceUsuario].correo = inputCorreo.value;

            // Cambiamos contraseña solo si escribió una nueva
            if (inputContrasena.value !== "") {
                listaUsuarios[indiceUsuario].contrasena = inputContrasena.value;
            }

            // Cambiamos foto si selecciona una nueva
            if (inputFoto.files[0]) {
                try {
                    const nuevaFoto = await convertirImagenABase64(inputFoto.files[0]);
                    listaUsuarios[indiceUsuario].fotoPerfil = nuevaFoto;
                } catch (error) {
                    alert("Error al cargar imagen");
                    return;
                }
            }

            // Guardamos cambios en localStorage
            localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

            // Actualizamos el usuario activo (CAMBIO CLAVE)
            sessionStorage.setItem("usuarioActivo", JSON.stringify(listaUsuarios[indiceUsuario]));

            alert("Perfil actualizado correctamente");

            // Regresamos al inicio
            window.location.href = "../inicio/inicio.html";
        });
    }

    // Botón para volver sin guardar
    if (botonVolver) {
        botonVolver.addEventListener("click", () => {
            window.location.href = "../inicio/inicio.html";
        });
    }

});