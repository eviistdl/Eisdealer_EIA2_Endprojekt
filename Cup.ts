namespace Eisdealer {

    export class Cup extends Drawables{

    private color: string;

    constructor(_x: number, _y: number) {
        super(_x, _y);
        this.color = "#d2b48c";
    }

    public draw(){
        //console.log("drawCup")
        const x = 800;
        const y = 450;
        const widthTop = 150;
        const widthBottom = 100;
        const height = 100;

        crc2.beginPath();
        crc2.moveTo(x, y); // Starting point (top-left)
        crc2.lineTo(x + widthTop, y); // Top side
        crc2.lineTo(x + (widthTop - widthBottom) / 2 + widthBottom, y + height); // Bottom-right side
        crc2.lineTo(x + (widthTop - widthBottom) / 2, y + height); // Bottom-left side
        crc2.closePath(); // Close the path

        crc2.fillStyle = this.color;
        crc2.fill();
    }
}
}