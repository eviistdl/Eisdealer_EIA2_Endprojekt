namespace Eisdealer {

    export class Chair {
        
        private x: number;
        private y: number;
        private width: number;
        private height: number;
        private color: string;

        constructor(_x: number, _y: number, _width: number, _height: number, _color: string = '#912b23') {
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
            this.color = _color;
        }

        draw(): void {
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
