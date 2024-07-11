"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Trash {
        x;
        y;
        radius;
        constructor(_x, _y, _radius) {
            this.x = 470;
            this.y = 170;
            this.radius = 50;
        }
        draw() {
            //console.log("trash draw");
            // Mülltonne
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#808080';
            Eisdealer.crc2.fill();
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.x, this.y, 40, 0, Math.PI * 2);
            Eisdealer.crc2.strokeStyle = '#363636'; // Graue Farbe
            Eisdealer.crc2.stroke();
            // Griff
            const gripWidth = 35;
            const gripHeight = 8;
            Eisdealer.crc2.fillStyle = '#363636'; // Schwarze Farbe für den Griff
            Eisdealer.crc2.fillRect(this.x - gripWidth / 2, this.y - gripHeight / 2, gripWidth, gripHeight);
            //Details
            const numLines = 8;
            for (let i = 0; i < numLines; i++) {
                const angle = (i * 2 * Math.PI) / numLines;
                const x1 = this.x + (this.radius / 2) * Math.cos(angle);
                const y1 = this.y + (this.radius / 2) * Math.sin(angle);
                const x2 = this.x + this.radius * Math.cos(angle);
                const y2 = this.y + this.radius * Math.sin(angle);
                Eisdealer.crc2.beginPath();
                Eisdealer.crc2.moveTo(x1, y1);
                Eisdealer.crc2.lineTo(x2, y2);
                Eisdealer.crc2.strokeStyle = '#363636'; // Schwarze Linien
                Eisdealer.crc2.stroke();
            }
        }
    }
    Eisdealer.Trash = Trash;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Trash.js.map