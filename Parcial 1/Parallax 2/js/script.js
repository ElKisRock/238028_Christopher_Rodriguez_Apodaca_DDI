const titulo = document.querySelector("#titulo");
const johnny = document.querySelector("#johnny");
const carro = document.querySelector("#carro");
const calle = document.querySelector("#calle");
const ciudad = document.querySelector("#ciudad");

window.addEventListener("scroll", (event) => {
    titulo.style.right = window.scrollY *3 + "px";
    johnny.style.bottom = window.scrollY *.5 + "px";
    carro.style.bottom = window.scrollY *.7 + "px";
    calle.style.bottom = window.scrollY *1 + "px";
    ciudad.style.bottom = window.scrollY *1.2 + "px";
})