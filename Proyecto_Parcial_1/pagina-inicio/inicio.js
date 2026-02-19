// Parallax con js

const capaMovil = document.querySelector('#capaMovil');

// Función que actualiza la posición de la capa basada en el scroll
function actualizarParallax() {
    let desplazamiento = window.scrollY;

    let movimiento = desplazamiento * 0.3; // factor 0.3 para que sea más lento

    capaMovil.style.transform = 'translateY(' + movimiento + 'px)';
}

window.addEventListener('scroll', function() {
    // Llamamos a la función que mueve la capa
    actualizarParallax();
});

// Llamamos una vez al cargar para que se posicione correctamente
actualizarParallax();

// Estructura con forEach y if/else
const tarjetas = document.querySelectorAll('.tarjeta');

tarjetas.forEach(function(tarjeta, indice) {
    tarjeta.addEventListener('click', function() {
        // Usamos if/else para mostrar un mensaje diferente según el índice
        if (indice === 0) {
            alert('Hiciste clic en Spider-Man');
        } else if (indice === 1) {
            alert('Hiciste clic en Goku');
        } else if (indice === 2) {
            alert('Hiciste clic en Batman');
        } else if (indice === 3) {
            alert('Hiciste clic en Darth Vader');
        } else if (indice === 4) {
            alert('Hiciste clic en Wonder Woman');
        } else {
            alert('Hiciste clic en Mario');
        }
    });
});

document.addEventListener('keydown', function(evento) {
    console.log('Tecla presionada: ' + evento.key);
});