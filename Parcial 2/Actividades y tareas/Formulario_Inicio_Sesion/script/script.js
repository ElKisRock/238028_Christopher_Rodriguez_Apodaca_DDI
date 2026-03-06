// Revisar si ya existe una sesión guardada
const sesion = localStorage.getItem("usuarioActivo");

if (sesion) {
    // Si hay sesión activa, ir directo a la página de datos
    window.location.href = "datos/html/datos.html";
}

const formulario = document.getElementById("formIniciarSesion");

// Obtener usuarios guardados o crear arreglo vacío
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

formulario.addEventListener("submit", function (e) {

    // Evitar recargar la página
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contraseña").value.trim();

    // Validar que los campos tengan datos
    if (!correo || !contrasena) {
        alert("Debes llenar todos los campos");
        return;
    }

    // Buscar usuario que coincida con correo y contraseña
    const usuarioEncontrado = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioEncontrado) {

        // Guardar sesión activa
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

        alert(`¡Bienvenido, ${usuarioEncontrado.nombre}! Has iniciado sesión correctamente.`);

        // Ir a la página de datos
        window.location.href = "datos/html/datos.html";

    } else {
        alert("Los datos ingresados son incorrectos o la cuenta no existe");
    }
});