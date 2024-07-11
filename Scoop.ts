namespace Eisdealer {
    export class Scoop {
        draw() {
            this.drawScoopStrawberry();
            this.drawScoopPistachio();
            this.drawScoopLemon();
        }

        drawScoopStrawberry() {
            crc2.lineWidth = 8;
            const x = 80;
            const y = 100;
            const color = "#eb3477";

            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.fillStyle = color;
            crc2.fill();

            crc2.lineWidth = 8; // Setze die Stroke-Dicke
            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.strokeStyle = "#c4c3c2";
            crc2.stroke();
            crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }

        drawScoopPistachio() {
            const x = 200;
            const y = 100;
            const color = "#87b07b";

            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.fillStyle = color;
            crc2.fill();

            crc2.lineWidth = 8; // Setze die Stroke-Dicke
            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.strokeStyle = "#c4c3c2";
            crc2.stroke();
            crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }

        drawScoopLemon() {
            const x = 320;
            const y = 100;
            const color = "#f7dd31"; // Farbe für Zitronen-Eis

            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.fillStyle = color;
            crc2.fill();

            crc2.lineWidth = 8; // Setze die Stroke-Dicke
            crc2.beginPath();
            crc2.arc(x, y, 50, 0, Math.PI * 2);
            crc2.strokeStyle = "#c4c3c2";
            crc2.stroke();
            crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
    }
}
