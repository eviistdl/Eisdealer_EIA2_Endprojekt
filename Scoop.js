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
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Scoop.js.map