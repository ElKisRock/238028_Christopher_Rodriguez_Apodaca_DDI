import { Cuadrado, Circulo, Linea, Sticker, FiguraExtra } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

let imagenOriginal = null;
let imagenTemporal = null;
let historial = [];
let historialIndex = -1;

const posicionCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
};

let presionado = false;
let herramienta = "pincel";

const inputColorLinea = document.querySelector("#colorLinea");
const inputColorRelleno = document.querySelector("#colorRelleno");
const inputGrosorLinea = document.querySelector("#grosorLinea");
const inputArchivo = document.querySelector("#inputArchivo");

let colorLinea = inputColorLinea.value || "#000000";
let colorRelleno = inputColorRelleno.value || "#ffffff";
let grosorLinea = inputGrosorLinea.value || 5;
let urlStickerSeleccionado = "../recursos/pepega.jpeg";

document.querySelector("#btnPincel").onclick = () => herramienta = "pincel";
document.querySelector("#btnLinea").onclick = () => herramienta = "linea";
document.querySelector("#btnCuadro").onclick = () => herramienta = "cuadro";
document.querySelector("#btnCirculo").onclick = () => herramienta = "circulo";
document.querySelector("#btnFiguraExtra").onclick = () => herramienta = "figuraExtra";
document.querySelector("#btnSticker").onclick = () => herramienta = "sticker";
document.querySelector("#btnBorrador").onclick = () => herramienta = "borrador";

document.querySelector("#btnBN").onclick = () => aplicarFiltro("blancoNegro");
document.querySelector("#btnRojos").onclick = () => aplicarFiltro("rojos");
document.querySelector("#btnVerdes").onclick = () => aplicarFiltro("verdes");
document.querySelector("#btnAzules").onclick = () => aplicarFiltro("azules");
document.querySelector("#btnSepia").onclick = () => aplicarFiltro("sepia");
document.querySelector("#btnOriginal").onclick = () => restaurarOriginal();

document.querySelector("#btnLimpiar").onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    guardarAccion();
};

document.querySelector("#btnGuardar").onclick = () => {
    const link = document.createElement("a");
    link.download = "canvas.jpg";
    link.href = canvas.toDataURL();
    link.click();
};

document.querySelector("#btnDeshacer").onclick = () => {
    if (historialIndex > 0) {
        historialIndex--;
        ctx.putImageData(historial[historialIndex], 0, 0);
    } else if (historialIndex === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        historialIndex = -1;
    }
};

document.querySelector("#btnRehacer").onclick = () => {
    if (historialIndex < historial.length - 1) {
        historialIndex++;
        ctx.putImageData(historial[historialIndex], 0, 0);
    }
};

inputColorLinea.addEventListener("input", () => colorLinea = inputColorLinea.value);
inputColorRelleno.addEventListener("input", () => colorRelleno = inputColorRelleno.value);
inputGrosorLinea.addEventListener("input", () => grosorLinea = inputGrosorLinea.value);

inputArchivo.addEventListener("change", (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
        const reader = new FileReader();
        reader.onload = (ev) => urlStickerSeleccionado = ev.target.result;
        reader.readAsDataURL(archivo);
    }
});

canvas.addEventListener("mousedown", alPresionarClick);
canvas.addEventListener("mousemove", mientrasPresionaClick);
canvas.addEventListener("mouseup", alSoltarClick);

function guardarAccion() {
    historial = historial.slice(0, historialIndex + 1);
    historial.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    historialIndex++;
}

function alPresionarClick(event) {
    posicionCursor.iniciales.x = event.offsetX;
    posicionCursor.iniciales.y = event.offsetY;
    presionado = true;

    if (herramienta !== "pincel" && herramienta !== "borrador") {
        imagenTemporal = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}

function mientrasPresionaClick(event) {
    if (!presionado) return;

    posicionCursor.finales.x = event.offsetX;
    posicionCursor.finales.y = event.offsetY;

    if (herramienta === "pincel") {
        const linea = new Linea(posicionCursor, colorLinea, grosorLinea);
        linea.Dibujar(ctx);

        posicionCursor.iniciales.x = posicionCursor.finales.x;
        posicionCursor.iniciales.y = posicionCursor.finales.y;
    }

    else if (herramienta === "borrador") {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(posicionCursor.finales.x, posicionCursor.finales.y, grosorLinea / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    else {
        if (imagenTemporal) ctx.putImageData(imagenTemporal, 0, 0);

        let figuraPreview;

        switch (herramienta) {
            case "linea":
                figuraPreview = new Linea(posicionCursor, colorLinea, grosorLinea);
                break;

            case "cuadro":
                figuraPreview = new Cuadrado(posicionCursor, colorLinea, colorRelleno, grosorLinea);
                break;

            case "circulo":
                figuraPreview = new Circulo(posicionCursor, colorLinea, colorRelleno, grosorLinea);
                break;

            case "figuraExtra":
                figuraPreview = new FiguraExtra(posicionCursor, colorLinea, grosorLinea);
                break;

            case "sticker":
                figuraPreview = new Sticker(posicionCursor, urlStickerSeleccionado);
                break;
        }

        if (figuraPreview) figuraPreview.Dibujar(ctx);
    }
}

function alSoltarClick(event) {
    if (!presionado) return;

    posicionCursor.finales.x = event.offsetX;
    posicionCursor.finales.y = event.offsetY;

    if (imagenTemporal && herramienta !== "pincel" && herramienta !== "borrador") {
        ctx.putImageData(imagenTemporal, 0, 0);
    }

    let figuraFinal;

    switch (herramienta) {
        case "linea":
            figuraFinal = new Linea(posicionCursor, colorLinea, grosorLinea);
            figuraFinal.Dibujar(ctx);
            guardarAccion();
            break;

        case "cuadro":
            figuraFinal = new Cuadrado(posicionCursor, colorLinea, colorRelleno, grosorLinea);
            figuraFinal.Dibujar(ctx);
            guardarAccion();
            break;

        case "circulo":
            figuraFinal = new Circulo(posicionCursor, colorLinea, colorRelleno, grosorLinea);
            figuraFinal.Dibujar(ctx);
            guardarAccion();
            break;

        case "figuraExtra":
            figuraFinal = new FiguraExtra(posicionCursor, colorLinea, grosorLinea);
            figuraFinal.Dibujar(ctx);
            guardarAccion();
            break;

        case "sticker":
            figuraFinal = new Sticker(posicionCursor, urlStickerSeleccionado);
            figuraFinal.Dibujar(ctx);
            guardarAccion();
            break;

        case "pincel":
        case "borrador":
            guardarAccion();
            break;
    }

    imagenOriginal = ctx.getImageData(0, 0, canvas.width, canvas.height);
    presionado = false;
}

function aplicarFiltro(tipoFiltro) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        switch (tipoFiltro) {
            case "blancoNegro":
                let promedio = (r + g + b) / 3;
                data[i] = data[i + 1] = data[i + 2] = promedio;
                break;

            case "rojos":
                data[i] = r + 50;
                data[i + 1] = g / 2;
                data[i + 2] = b / 2;
                break;

            case "verdes":
                data[i] = r / 2;
                data[i + 1] = g + 50;
                data[i + 2] = b / 2;
                break;

            case "azules":
                data[i] = r / 2;
                data[i + 1] = g / 2;
                data[i + 2] = b + 50;
                break;

            case "sepia":
                data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
                break;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    guardarAccion();
}

function restaurarOriginal() {
    if (imagenOriginal) {
        ctx.putImageData(imagenOriginal, 0, 0);
    }
}