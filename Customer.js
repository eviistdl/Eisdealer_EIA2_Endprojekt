"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Customer {
        x;
        y;
        radius;
        skin;
        hairColor;
        constructor(_x, _y, _hairColor) {
            this.x = _x;
            this.y = _y;
            this.radius = 40;
            this.skin = "#e8d3b7";
            this.hairColor = "#52402a";
        }
        draw() {
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const skin = this.skin;
            const hairColor = this.hairColor;
            // Haare 
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
            Eisdealer.crc2.fillStyle = hairColor;
            Eisdealer.crc2.fillRect(x - (radius + 10), y + radius - 40, 100, 50);
            Eisdealer.crc2.fill();
            // Ohren zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x - radius, y, 10, 0, Math.PI);
            Eisdealer.crc2.arc(x + radius, y, 10, 0, Math.PI);
            Eisdealer.crc2.fillStyle = skin;
            Eisdealer.crc2.strokeStyle = "#52402a";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.stroke();
            // Kopf 
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, radius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = skin;
            Eisdealer.crc2.strokeStyle = "#52402a";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.stroke();
            // Pony (Viertelkreis oben auf dem Kopf)
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y - radius / 8, radius, Math.PI * 1.15, Math.PI * 1.85); // Pony etwas nach oben verschoben
            Eisdealer.crc2.fillStyle = hairColor;
            Eisdealer.crc2.fill();
            // Augen zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer.crc2.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#000000';
            Eisdealer.crc2.fill();
            // Mund zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y + 10, 15, 0, Math.PI, false);
            Eisdealer.crc2.strokeStyle = '#000000';
            Eisdealer.crc2.stroke();
        }
    }
    Eisdealer.Customer = Customer;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Customer.js.map