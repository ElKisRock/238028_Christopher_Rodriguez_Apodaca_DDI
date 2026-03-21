// Espera a que la página cargue
document.addEventListener("DOMContentLoaded", () => {

    const formularioIniciarSesion = document.getElementById("formularioIniciarSesion");
    const botonIrRegistro = document.getElementById("botonIrRegistro");

    // Si ya hay un usuario activo, lo manda directo al inicio
    if (localStorage.getItem("usuarioActivo")) {
        window.location.href = "../inicio/inicio.html";
    }

    // Evento cuando se envía el formulario
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
            // Guardar sesión del usuario
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

            alert("Bienvenido " + usuarioEncontrado.nombreCompleto);

            // Ir a la página principal
            window.location.href = "../index.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });

    // Botón para ir a la página de registro
    botonIrRegistro.addEventListener("click", () => {
        window.location.href = "../registro/registro.html";
    });

});