"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Scoop {
        draw() {
            this.drawScoopStrawberry();
            this.drawScoopPistachio();
            this.drawScoopLemon();
        }
        drawScoopStrawberry() {
            Eisdealer.crc2.lineWidth = 8;
            const x = 80;
            const y = 100;
            const color = "#ab433a";
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.lineWidth = 8; // Setze die Stroke-Dicke
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.strokeStyle = "#c4c3c2";
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
        drawScoopPistachio() {
            const x = 200;
            const y = 100;
            const color = "#87b07b";
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.lineWidth = 8; // Setze die Stroke-Dicke
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.strokeStyle = "#c4c3c2";
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
        drawScoopLemon() {
            const x = 320;
            const y = 100;
            const color = "#f7dd31"; // Farbe für Zitronen-Eis
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.lineWidth = 8; // Setze die Stroke-Dicke
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.strokeStyle = "#c4c3c2";
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
    }
    Eisdealer.Scoop = Scoop;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Scoop.js.map