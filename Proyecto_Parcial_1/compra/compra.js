// Datos de todos los productos
const productos = [
    { nombre: 'Spider-Man', categoria: 'marvel', precio: 450, imagen: '../compra/recursos/Spiderman.png' },
    { nombre: 'Iron Man', categoria: 'marvel', precio: 500, imagen: '../compra/recursos/Iron Man.png' },
    { nombre: 'Batman', categoria: 'dc', precio: 480, imagen: '../compra/recursos/Batman.png' },
    { nombre: 'Wonder Woman', categoria: 'dc', precio: 470, imagen: '../compra/recursos/Wonder Woman.png' },
    { nombre: 'Goku', categoria: 'anime', precio: 430, imagen: '../compra/recursos/Goku.png' },
    { nombre: 'Naruto', categoria: 'anime', precio: 420, imagen: '../compra/recursos/Naruto.png' },
    { nombre: 'Thor', categoria: 'marvel', precio: 490, imagen: '../compra/recursos/Thor.png' },
    { nombre: 'Superman', categoria: 'dc', precio: 460, imagen: '../compra/recursos/Superman.png' },
    { nombre: 'Sailor Moon', categoria: 'anime', precio: 440, imagen: '../compra/recursos/Sailor Moon.png' }
];
// Función para mostrar los productos usando forEach
function mostrarProductos(lista) {
    const contenedor = document.querySelector('#grid-productos');
    contenedor.innerHTML = ''; // Limpiar contenedor

    // Usamos forEach para recorrer la lista
    lista.forEach(function(producto) {
        // Crear tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        
        // Asignar atributo data-categoria para posible uso
        tarjeta.setAttribute('data-categoria', producto.categoria);

        // Llenar contenido
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="categoria">${producto.categoria}</p>
            <p class="precio">$${producto.precio}</p>
        `;

        // Agregar evento de clic a la tarjeta (estructura switch)
        tarjeta.addEventListener('click', function() {
            let mensaje = '';
            // Usamos switch según la categoría
            switch(producto.categoria) {
                case 'marvel':
                    mensaje = '¡Gran héroe de Marvel!';
                    break;
                case 'dc':
                    mensaje = 'Leyenda de DC Comics';
                    break;
                case 'anime':
                    mensaje = 'Ícono del anime';
                    break;
                default:
                    mensaje = 'Figura de colección';
            }
            alert(producto.nombre + ': ' + mensaje);
        });

        contenedor.appendChild(tarjeta);
    });
}
// Filtrado de productos usando if/else y for
function filtrarProductos(categoria) {
    let productosFiltrados = [];

    if (categoria === 'todo') {
        // Si es 'todo', mostramos todos (usando for para copiar)
        for (let i = 0; i < productos.length; i++) {
            productosFiltrados.push(productos[i]);
        }
    } else {
        // Filtramos por categoría (usando for y if)
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].categoria === categoria) {
                productosFiltrados.push(productos[i]);
            }
        }
    }

    mostrarProductos(productosFiltrados);
}

// Configurar botones de filtro
const botonesFiltro = document.querySelectorAll('.filtro-btn');

botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function(evento) {
        // Remover clase activo de todos
        botonesFiltro.forEach(btn => btn.classList.remove('activo'));
        // Añadir clase activo al botón clickeado
        evento.target.classList.add('activo');

        // Obtener categoría del atributo data
        const categoria = evento.target.getAttribute('data-categoria');
        filtrarProductos(categoria);
    });
});

// Parallax con javascript (evento scroll)
const capaDesplazamiento = document.querySelector('#capaDesplazamiento');
const seccionParallax = document.querySelector('#parallax-js');

function moverCapa() {
    // Obtener posición de la sección parallax
    const rect = seccionParallax.getBoundingClientRect();
    const ventanaAlto = window.innerHeight;

    // Calcular cuánto ha entrado la sección en la pantalla
    if (rect.top < ventanaAlto && rect.bottom > 0) {
        // Desplazamiento relativo: cuanto más cerca del centro, más movimiento
        let progreso = (ventanaAlto - rect.top) / (ventanaAlto + rect.height);
        progreso = Math.max(0, Math.min(1, progreso)); // entre 0 y 1

        // Mover la capa en sentido inverso (efecto parallax)
        let movimiento = 100 - (progreso * 200); // rango de -100px a 100px
        capaDesplazamiento.style.transform = 'translateY(' + movimiento + 'px)';
    }
}

window.addEventListener('scroll', moverCapa);
// Llamar una vez al inicio
moverCapa();

// Evento de tecla (ejemplo: presionar flecha abajo)
document.addEventListener('keydown', function(evento) {
    // Si presionan la tecla "f", aplicamos filtro 'marvel' como ejemplo
    if (evento.key === 'm' || evento.key === 'M') {
        // Buscar botón de Marvel y hacer clic
        const botonMarvel = document.querySelector('.filtro-btn[data-categoria="marvel"]');
        if (botonMarvel) {
            botonMarvel.click();
        }
    }
    if (evento.key === 'd' || evento.key === 'D') {
        // Buscar botón de DC y hacer clic
        const botonMarvel = document.querySelector('.filtro-btn[data-categoria="dc"]');
        if (botonMarvel) {
            botonMarvel.click();
        }
    }
    if (evento.key === 'a' || evento.key === 'A') {
        // Buscar botón de Anime y hacer clic
        const botonMarvel = document.querySelector('.filtro-btn[data-categoria="anime"]');
        if (botonMarvel) {
            botonMarvel.click();
        }
    }
    // Si presionan "t", filtro todo
    if (evento.key === 't' || evento.key === 'T') {
        const botonTodo = document.querySelector('.filtro-btn[data-categoria="todo"]');
        if (botonTodo) {
            botonTodo.click();
        }
    }
});

// Inicializar mostrando todos los productos
filtrarProductos('todo');