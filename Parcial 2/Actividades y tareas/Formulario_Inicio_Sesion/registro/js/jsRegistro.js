// Clase para crear objetos de tipo Usuario
class Usuario {
    constructor(nombre, apellido, correo, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
    }
}

// Obtener usuarios guardados en localStorage o crear arreglo vacío
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formulario = document.getElementById("formRegistro");

// Escuchar el envío del formulario
formulario.addEventListener("submit", function (e) {

    // Evitar que la página se recargue
    e.preventDefault();

    // Obtener los datos ingresados
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    // Validar que todos los campos estén llenos
    if (!nombre || !apellido || !correo || !contrasena) {
        alert("Debes llenar todos los campos");
        return;
    }

    // Verificar si el correo ya está registrado
    const correoExistente = usuarios.some(user => user.correo === correo);
    if (correoExistente) {
        alert("Este correo ya está registrado");
        return;
    }

    // Crear nuevo usuario y guardarlo
    const nuevoUsuario = new Usuario(nombre, apellido, correo, contrasena);
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Cuenta creada correctamente!");

    // Regresar al inicio de sesión
    window.location.href = "../../index.html";
});