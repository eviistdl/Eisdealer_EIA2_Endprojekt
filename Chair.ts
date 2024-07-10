namespace Eisdealer {

    export class Chair{
    public draw(){
         // Positionen und Größen der Stühle
         const chairs = [
            { x: 120, y: 400, width: 100, height: 100 },
            { x: 330, y: 500, width: 100, height: 100 },
            { x: 530, y: 350, width: 100, height: 100 }
        ];
    
        chairs.forEach(chair => {
            const chairRadius = 25;
            const chairX = chair.x + chair.width / 2;
            const chairY = chair.y + chair.height / 2;
    
            crc2.beginPath();
            crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            crc2.fillStyle = '#912b23'; 
            crc2.fill();
        });
    }

    }   
}