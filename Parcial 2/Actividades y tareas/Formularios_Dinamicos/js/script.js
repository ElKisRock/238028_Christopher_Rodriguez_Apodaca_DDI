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

function cambiarNumero(event) {
    console.log(event.target.value);
    const numeroElementos = event.target.value;
    const contenido = document.querySelector("#contenedpr_correos")
    contenido.innerHTML = " "; //Limpia la etiqueta y el contenido antes de agregar.
    for (let i = 1; i <= event.target.value; i++) {
        //Se agrega contenido usando la insercion de html por medio del innerHTML, que agregará todo lo que está dentro de htmlAgregar.
        //Este método reemplaza todo lo que está dentro de la etiqueta por lo nuevo que se quiere agregar.
        const htmlAgregar = $`<label for="correo-${i}">Ingrese el correo ${i}</label>
            <input type="email" name="correo-${i}" id="correo-${i}">
            <br>`;
        contenido.innerHTML += htmlAgregar;
    }
}
class Usuario {
    constructor(nom, ape) {
        this.nombre = nom;
        this.apellido = ape;
    }
}