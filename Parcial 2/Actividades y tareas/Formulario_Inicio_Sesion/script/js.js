const formulario = document.querySelector("#formIniciarSesion");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const contraseña = document.querySelector("#contraseña");

class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.correo = correo;
        this.contraseña = contra;
    }
    MostrarDatos() {
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}

function leerDatos(){
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());
    const algunCampoVacio = Object.values(datos).some(
        valor => valor.trim() === ""
    );
    if (algunCampoVacio) {
        alert("Debes llenar todos los campos");
        return;
    }
    let usuarioNuevo = new Usuario(
        datos.nombre,
        "",
        datos.correo,
        datos.contraseña
    );
    console.log(usuarioNuevo);
    alert("¡Has iniciado sesión correctamente!");
}