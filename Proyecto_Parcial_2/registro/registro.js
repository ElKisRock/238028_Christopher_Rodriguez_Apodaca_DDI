// Espera a que la página cargue
document.addEventListener("DOMContentLoaded", () => {

    const formularioRegistro = document.getElementById("formularioRegistro");
    const botonIrIniciarSesion = document.getElementById("botonIrIniciarSesion");

    // Función para convertir la imagen a base64
    const convertirImagenABase64 = (archivo) => {
        return new Promise((resolve, reject) => {

            const lector = new FileReader();

            lector.readAsDataURL(archivo);

            lector.onload = () => resolve(lector.result);

            lector.onerror = error => reject(error);
        });
    };

    // Evento cuando se envía el formulario
    formularioRegistro.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nombreCompleto = document.getElementById("nombreCompleto").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const verificarContrasena = document.getElementById("verificarContrasena").value;
        const archivoFoto = document.getElementById("fotoPerfil").files[0];
        const esAdministrador = document.getElementById("esAdministrador").checked;

        // Revisar que las contraseñas coincidan
        if (contrasena !== verificarContrasena) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Convertir la imagen del usuario
        let fotoBase64 = "";

        try {
            fotoBase64 = await convertirImagenABase64(archivoFoto);
        } catch (error) {
            alert("Error al cargar la imagen");
            return;
        }

        // Obtener usuarios guardados
        const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el correo ya existe
        const usuarioExistente = listaUsuarios.find(usuario => usuario.correo === correo);

        if (usuarioExistente) {
            alert("Este correo ya está registrado");
            return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            nombreCompleto: nombreCompleto,
            correo: correo,
            contrasena: contrasena,
            esAdministrador: esAdministrador,
            fotoPerfil: fotoBase64
        };

        // Guardar usuario
        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

        alert("Cuenta creada correctamente");

        // Regresar a iniciar sesión
        window.location.href = "../index.html";
    });

    // Botón para volver al login
    botonIrIniciarSesion.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

});