// Selecciono el botón
const botonIngresar = document.querySelector(".boton-ingresar");

// Evento al hacer click
botonIngresar.addEventListener("click", function(){

    // Obtengo los valores
    const usuario = document.querySelector("#usuario").value;
    const correo = document.querySelector("#correo").value;

    // Estructura de control
    if(usuario !== "" && correo !== ""){
        
        // Solo redirige, no guarda nada
        window.location.href = "Pagina principal/principal.html";

    }else{

        alert("Por favor completa los campos");

    }

});