//Investigar los diferentes eventos de javascript,
//Investigar los diferentes que hay usando addEventListener
//Seleccionar uno de cada uno (js y addeventlistener) y realizar una acción como cambiar colores, contenido, etc.
let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");

let banderaIntervalo = false;
let banderaBoton = false;

function cambiarColor(color) {
    contenido.style.background = color;
}

function cambiarTamaño(ancho, alto) {
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

setInterval(() => {
    if (banderaIntervalo) {
        cambiarColor("red");
        cambiarTamaño("500px", "500px");
        banderaIntervalo = false;
    } else {
        cambiarColor("blue");
        cambiarTamaño("300px", "300px");
        banderaIntervalo = true;
    }
}, 1000);

function mouseEncima() {
    contenido.textContent = "ratón encima";
    contenido.style.borderColor = "green";
}

function mouseFuera() {
    contenido.textContent = "ratón fuera";
    contenido.style.borderColor = "darkred";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "arco-arriba") {
        cambiarTamaño("600px", "600px");
    }

    if (event.key === "arco-abajo") {
        cambiarTamaño("300px", "300px");
    }
});

