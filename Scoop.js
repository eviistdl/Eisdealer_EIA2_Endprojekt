"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Scoop extends Eisdealer.Drawables {
        radius;
        color;
        constructor(_x, _y, _color) {
            super(_x, _y);
            this.radius = 50;
            this.color = _color;
        }
        draw() {
            Eisdealer.crc2.lineWidth = 8;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.lineWidth = 8; // Setze die Stroke-Dicke
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            Eisdealer.crc2.strokeStyle = "#c4c3c2";
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
    }
    Eisdealer.Scoop = Scoop;
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
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Scoop.js.map