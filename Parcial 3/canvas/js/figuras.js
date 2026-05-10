class Figura {
    constructor(posicionCursor = {}, color_linea = "black", color_relleno = "black", grosor_linea = 5) {
        this.posicionCursor = posicionCursor;

        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grosor_linea = grosor_linea;

        this.posicion_X = posicionCursor.iniciales.x;
        this.posicion_Y = posicionCursor.iniciales.y;

        this.ancho = posicionCursor.finales.x - posicionCursor.iniciales.x;
        this.alto = posicionCursor.finales.y - posicionCursor.iniciales.y;
    }
}

export class Cuadrado extends Figura {
    Dibujar(ctx) {
        ctx.beginPath();

        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.fillRect(this.posicion_X, this.posicion_Y, this.ancho, this.alto);
        ctx.strokeRect(this.posicion_X, this.posicion_Y, this.ancho, this.alto);
    }
}

export class Circulo extends Figura {
    Dibujar(ctx) {
        ctx.beginPath();

        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        const radio = Math.sqrt(Math.pow(this.ancho, 2) + Math.pow(this.alto, 2)) / 2;
        const centroX = this.posicion_X + (this.ancho / 2);
        const centroY = this.posicion_Y + (this.alto / 2);

        ctx.arc(centroX, centroY, Math.abs(radio), 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

export class Linea {
    constructor(posicionCursor = {}, color_linea = "black", grosor_linea = 5) {
        this.posicionCursor = posicionCursor;
        this.color_linea = color_linea;
        this.grosor_linea = grosor_linea;
    }

    Dibujar(ctx) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grosor_linea;

        ctx.moveTo(this.posicionCursor.iniciales.x, this.posicionCursor.iniciales.y);
        ctx.lineTo(this.posicionCursor.finales.x, this.posicionCursor.finales.y);

        ctx.stroke();
    }
}

export class Sticker extends Figura {
    constructor(posicionCursor, urlImagen) {
        super(posicionCursor);
        this.imagen = new Image();
        this.imagen.src = urlImagen;
    }

    Dibujar(ctx) {
        const render = () => {
            ctx.drawImage(
                this.imagen,
                this.posicion_X,
                this.posicion_Y,
                this.ancho,
                this.alto
            );
        };

        if (this.imagen.complete) {
            render();
        } else {
            this.imagen.onload = render;
        }
    }
}

export class FiguraExtra extends Figura {
    constructor(posicionCursor = {}, color_linea = "black", color_relleno = "red", grosor_linea = 5) {
        super(posicionCursor, color_linea, color_relleno, grosor_linea);
    }

    Dibujar(ctx) {
        ctx.save();

        ctx.strokeStyle = this.color_linea;
        ctx.fillStyle = this.color_relleno;
        ctx.lineWidth = this.grosor_linea;

        const x = this.posicion_X;
        const y = this.posicion_Y;
        const w = this.ancho;
        const h = this.alto;

        const cx = x + w / 2;
        const cy = y + h / 2;
        const r = Math.min(w, h) / 2;

        const angulos = [];
        for (let i = 0; i < 12; i++) {
            angulos.push(i * Math.PI / 6);
        }

        const rExterior = r;
        const rInterior = r * 0.4;

        const puntos = angulos.map((a, i) => {
            const radio = i % 2 === 0 ? rExterior : rInterior;
            return [
                cx + radio * Math.cos(a - Math.PI / 2),
                cy + radio * Math.sin(a - Math.PI / 2)
            ];
        });

        ctx.beginPath();
        ctx.moveTo(puntos[0][0], puntos[0][1]);

        for (let i = 1; i < puntos.length; i++) {
            ctx.lineTo(puntos[i][0], puntos[i][1]);
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
}