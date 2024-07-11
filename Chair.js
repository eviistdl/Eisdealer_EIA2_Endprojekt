"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Chair extends Eisdealer.Drawables {
        width;
        height;
        color;
        constructor(_x, _y) {
            super(_x, _y);
            this.width = 100;
            this.height = 100;
            this.color = '#912b23';
        }
        draw() {
            //console.log("draw Chair")
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
// namespace Eisdealer {
//     export class Chair extends Drawables {
//         private width: number;
//         private height: number;
//         private color: string;
//         constructor(_x: number, _y: number) {
//             super (_x, _y);
//             this.width = 100;
//             this.height = 100;
//             this.color = '#912b23';
//         }
//         draw(): void {
//             console.log("draw Chair")
//             const chairRadius = 25;
//             const chairX = this.x + this.width / 2;
//             const chairY = this.y + this.height / 2;
//             crc2.beginPath();
//             crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
//             crc2.fillStyle = this.color;
//             crc2.fill();
//         }
//     }
// }
//# sourceMappingURL=Chair.js.map