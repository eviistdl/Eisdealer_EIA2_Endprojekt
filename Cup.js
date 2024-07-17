"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Cup extends Eisdealer.Drawables {
        color;
        constructor(_x, _y) {
            super(_x, _y);
            this.color = "#d2b48c";
        }
        draw() {
            const x = 800;
            const y = 450;
            const widthTop = 150;
            const widthBottom = 100;
            const height = 100;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.moveTo(x, y);
            Eisdealer.crc2.lineTo(x + widthTop, y);
            Eisdealer.crc2.lineTo(x + (widthTop - widthBottom) / 2 + widthBottom, y + height);
            Eisdealer.crc2.lineTo(x + (widthTop - widthBottom) / 2, y + height);
            Eisdealer.crc2.closePath();
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
        }
    }
    Eisdealer.Cup = Cup;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Cup.js.map