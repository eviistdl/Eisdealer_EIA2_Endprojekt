namespace Eisdealer {
    export class Scoop extends Drawables {

        private radius: number;
        public color: string;

        constructor(_x: number, _y: number, _color: string) {
            super(_x, _y);
            this.radius = 50;
            this.color = _color;
        }

        draw() {
        crc2.lineWidth = 8;

        crc2.beginPath();
        crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        crc2.fillStyle = this.color;
        crc2.fill();

        crc2.lineWidth = 8; // Setze die Stroke-Dicke
        crc2.beginPath();
        crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        crc2.strokeStyle = "#c4c3c2";
        crc2.stroke();
        crc2.lineWidth = 1; // Setze die Stroke-Dicke zurück
        }
        }

   
}
