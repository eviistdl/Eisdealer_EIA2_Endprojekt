namespace Eisdealer {
    export class Chair extends Drawables {
        private width: number;
        private height: number;
        private color: string;

        constructor(_x: number, _y: number) {
            super(_x, _y);
            this.width = 100;
            this.height = 100;
            this.color = '#912b23';
        }

        draw(): void {
            //console.log("draw Chair")
            const chairRadius = 25;
            const chairX = this.x + this.width / 2;
            const chairY = this.y + this.height / 2;

            crc2.beginPath();
            crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            crc2.fillStyle = this.color;
            crc2.fill();
        }
    }
}




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
