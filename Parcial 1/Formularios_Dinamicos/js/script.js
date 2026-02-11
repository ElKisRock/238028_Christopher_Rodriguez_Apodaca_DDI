const nombre = document.querySelector("#input-txt-nombre");
const apellido = document.querySelector("#input-txt-apellido");
const boton = document.querySelector("#boton-guardar");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);
    const nom_info = document.createElement("h2");
    nom_info.textContent = usuario.nombre;
    document.body.appendChild(nom_info);
})

class Usuario {
    constructor(nom, ape) {
        this.nombre = nom;
        this.apellido = ape;
    }
}