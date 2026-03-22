// Espera a que la página cargue
document.addEventListener("DOMContentLoaded", () => {

    const formularioIniciarSesion = document.getElementById("formularioIniciarSesion");

    // Si ya hay un usuario activo, lo manda directo al inicio
    if (sessionStorage.getItem("usuarioActivo")) {
        window.location.href = "inicio/inicio.html";
    }

    // Evento cuando se envía el formulario
    if (formularioIniciarSesion) {
        formularioIniciarSesion.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;

            // Obtener lista de usuarios guardados
            const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscar si existe un usuario con esos datos
            const usuarioEncontrado = listaUsuarios.find(usuario =>
                usuario.correo === correo && usuario.contrasena === contrasena
            );

            if (usuarioEncontrado) {
                // Guardar sesión en sessionStorage
                sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

                alert("Bienvenido " + usuarioEncontrado.nombreCompleto);

                window.location.href = "index.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

});
