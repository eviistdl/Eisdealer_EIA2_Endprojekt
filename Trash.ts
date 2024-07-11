namespace Eisdealer {

    export class Trash extends Drawables{
    private radius: number;

    constructor(_x: number, _y: number) {
        super(_x, _y);
        this.radius = 50;
    }

    public draw(){
        //console.log("trash draw");
         // Mülltonne
         crc2.beginPath();
         crc2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         crc2.fillStyle = '#808080'; 
         crc2.fill();
 
         crc2.beginPath();
         crc2.arc(this.x, this.y, 40, 0, Math.PI * 2);
         crc2.strokeStyle = '#363636'; // Graue Farbe
         crc2.stroke();
         
          // Griff
          const gripWidth = 35;
         const gripHeight = 8;
         crc2.fillStyle = '#363636'; // Schwarze Farbe für den Griff
         crc2.fillRect(this.x - gripWidth / 2, this.y - gripHeight / 2, gripWidth, gripHeight);
         
         //Details
         const numLines = 8;
         for (let i = 0; i < numLines; i++) {
             const angle = (i * 2 * Math.PI) / numLines;
             const x1 = this.x + (this.radius / 2) * Math.cos(angle);
             const y1 = this.y + (this.radius / 2) * Math.sin(angle);
             const x2 = this.x + this.radius * Math.cos(angle);
             const y2 = this.y + this.radius * Math.sin(angle);
 
             crc2.beginPath();
             crc2.moveTo(x1, y1);
             crc2.lineTo(x2, y2);
             crc2.strokeStyle = '#363636'; // Schwarze Linien
             crc2.stroke();
         }
 
     }
    }

}
