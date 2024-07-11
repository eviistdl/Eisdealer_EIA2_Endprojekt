"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Chair {
        x;
        y;
        width;
        height;
        color;
        constructor(_x, _y, _width, _height, _color = '#912b23') {
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
            this.color = _color;
        }
        draw() {
            const chairRadius = 25;
            const chairX = this.x + this.width / 2;
            const chairY = this.y + this.height / 2;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = this.color;
            Eisdealer.crc2.fill();
        }
    }
    Eisdealer.Chair = Chair;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Chair.js.map