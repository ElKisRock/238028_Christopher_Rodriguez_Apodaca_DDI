// Espera a que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    const formularioEditarPerfil = document.getElementById("formularioEditarPerfil");
    const botonVolver = document.getElementById("botonVolver");

    const inputNombre = document.getElementById("nombreCompleto");
    const inputCorreo = document.getElementById("correo");
    const inputContrasena = document.getElementById("nuevaContrasena");
    const inputFoto = document.getElementById("fotoPerfil");

    // Obtener el usuario que inició sesión
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario, regresar al login
    if (!usuarioActivo) {
        window.location.href = "../index.html";
        return;
    }

    // Mostrar los datos actuales en el formulario
    inputNombre.value = usuarioActivo.nombreCompleto;
    inputCorreo.value = usuarioActivo.correo;

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
    formularioEditarPerfil.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscar al usuario en la lista
        const indiceUsuario = listaUsuarios.findIndex(usuario => 
            usuario.correo === usuarioActivo.correo
        );

        if (indiceUsuario === -1) {
            alert("Error al actualizar usuario");
            return;
        }

        // Actualizar nombre y correo
        listaUsuarios[indiceUsuario].nombreCompleto = inputNombre.value;
        listaUsuarios[indiceUsuario].correo = inputCorreo.value;

        // Cambiar contraseña solo si escribe una nueva
        if (inputContrasena.value !== "") {
            listaUsuarios[indiceUsuario].contrasena = inputContrasena.value;
        }

        // Cambiar foto si selecciona una nueva
        if (inputFoto.files[0]) {
            try {
                const nuevaFoto = await convertirImagenABase64(inputFoto.files[0]);
                listaUsuarios[indiceUsuario].fotoPerfil = nuevaFoto;
            } catch (error) {
                alert("Error al cargar imagen");
                return;
            }
        }

        // Guardar cambios en localStorage
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

        // Actualizar el usuario activo
        localStorage.setItem("usuarioActivo", JSON.stringify(listaUsuarios[indiceUsuario]));

        alert("Perfil actualizado correctamente");

        // Regresar a la página de inicio
        window.location.href = "../inicio/inicio.html";
    });

    // Botón para volver sin guardar
    botonVolver.addEventListener("click", () => {
        window.location.href = "../inicio/inicio.html";
    });

});