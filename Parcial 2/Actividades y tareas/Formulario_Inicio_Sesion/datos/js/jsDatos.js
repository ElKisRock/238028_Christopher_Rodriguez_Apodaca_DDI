// verificar si existe una sesión activa
const sesion = localStorage.getItem("usuarioActivo");

if (!sesion) {
    // si no hay sesión, regresar al login
    window.location.href = "index.html";
}

// botón para cerrar sesión
const botonCerrar = document.getElementById("cerrarSesion");

botonCerrar.addEventListener("click", () => {

    // eliminar sesión guardada
    localStorage.removeItem("usuarioActivo");

    // regresar al inicio de sesión
    window.location.href = "index.html";

});

// contenedor donde se mostrarán las tarjetas
const contenedor = document.getElementById("contenedor");

// obtener usuarios guardados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// simular un fetch con los datos guardados
const datosBlob = new Blob([JSON.stringify(usuarios)], { type: "application/json" });
const url = URL.createObjectURL(datosBlob);

fetch(url)
    .then(res => res.json())
    .then(data => {

        // crear una tarjeta por cada usuario
        data.forEach(usuario => {
            crearTarjeta(usuario);
        });

        activarObserver();

    })
    .catch(error => console.error(error));

// función para crear las tarjetas
function crearTarjeta(usuario) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
<h2>${usuario.nombre} ${usuario.apellido}</h2>
<p>${usuario.correo}</p>
`;

    contenedor.appendChild(card);

}

// observer para detectar cuando las tarjetas aparecen en pantalla
function activarObserver() {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.style.border = "2px solid #00f7ff";
            }

        });

    });

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(card => observer.observe(card));

}