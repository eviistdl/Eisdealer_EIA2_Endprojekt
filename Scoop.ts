namespace Eisdealer {
    export class Scoop extends Drawables {

        private radius: number;
        public color: string;

        constructor(_x: number, _y: number, _color: string) {
            super(_x, _y);
            this.radius = 50;
            this.color = _color;
        }

        draw() {
        crc2.lineWidth = 8;

        crc2.beginPath();
        crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        crc2.fillStyle = this.color;
        crc2.fill();

        crc2.lineWidth = 8; // Setze die Stroke-Dicke
        crc2.beginPath();
        crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        crc2.strokeStyle = "#c4c3c2";
        crc2.stroke();
        crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
            // this.drawScoopStrawberry();
            // this.drawScoopPistachio();
            // this.drawScoopLemon();
        }

    //     drawScoopStrawberry() {
    //         crc2.lineWidth = 8;
    //         const x = 80;
    //         const y = 100;
    //         const color = _color;

    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.fillStyle = _color;
    //         crc2.fill();

    //         crc2.lineWidth = 8; // Setze die Stroke-Dicke
    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.strokeStyle = "#c4c3c2";
    //         crc2.stroke();
    //         crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
    //     }

    //     drawScoopPistachio() {
    //         const x = 200;
    //         const y = 100;
    //         const color = "#87b07b";

    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.fillStyle = color;
    //         crc2.fill();

    //         crc2.lineWidth = 8; // Setze die Stroke-Dicke
    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.strokeStyle = "#c4c3c2";
    //         crc2.stroke();
    //         crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
    //     }

    //     drawScoopLemon() {
    //         const x = 320;
    //         const y = 100;
    //         const color = "#f7dd31"; // Farbe für Zitronen-Eis

    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.fillStyle = color;
    //         crc2.fill();

    //         crc2.lineWidth = 8; // Setze die Stroke-Dicke
    //         crc2.beginPath();
    //         crc2.arc(x, y, 50, 0, Math.PI * 2);
    //         crc2.strokeStyle = "#c4c3c2";
    //         crc2.stroke();
    //         crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
    //     }
    // }
}
