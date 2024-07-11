namespace Eisdealer {
    export class Eisdealer {
        private x: number;
        private y: number;
        private radius: number;
        private skin: string;
        private hairColor: string;
        private mustacheColor: string;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
            this.radius = 40;
            this.skin = "#f5cda2";
            this.hairColor = "#170f05";
            this.mustacheColor = "#170f05";
        }

        draw(): void {
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const skin = this.skin;
            const hairColor = this.hairColor;
            const mustacheColor = this.mustacheColor;

                // Haare 
        crc2.beginPath();
        crc2.arc(x, (y-15), radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
        crc2.fillStyle = hairColor;
        crc2.fill();
    
        // Ohren zeichnen
        crc2.beginPath();
        crc2.arc(x - radius, y, 10, 0, Math.PI); 
        crc2.arc(x + radius, y, 10, 0, Math.PI); 
        crc2.fillStyle = skin;
        crc2.strokeStyle = "#52402a"; 
        crc2.fill();
        crc2.stroke();
    
        // Kopf 
        crc2.beginPath();
        crc2.arc(x, y, radius, 0, Math.PI * 2);
        crc2.fillStyle = skin;
        crc2.strokeStyle = "#52402a"; 
        crc2.fill();
        crc2.stroke();
    
        // Schnauzer 
        const mustacheLength = 40;
        const waveAmplitude = 5;

        crc2.beginPath();
        crc2.moveTo(x - mustacheLength / 2, y + 10);
        for (let i = -mustacheLength / 2; i <= mustacheLength / 2; i++) {
            const waveY = y + 10 - Math.abs(Math.sin((i / mustacheLength) * Math.PI * 2)) * waveAmplitude;
            crc2.lineTo(x + i, waveY);
        }
        crc2.lineWidth = 2;
        crc2.strokeStyle = mustacheColor;
        crc2.stroke();
        
    
        // Augen zeichnen
        crc2.beginPath();
        crc2.arc(x - 15, y - 10, 5, 0, Math.PI * 2); 
        crc2.arc(x + 15, y - 10, 5, 0, Math.PI * 2); 
        crc2.fillStyle = '#000000'; 
        crc2.fill();
    
        // Mund zeichnen
        crc2.beginPath();
        crc2.arc(x, y + 10, 15, 0, Math.PI, false); 
        crc2.strokeStyle = '#000000';
        crc2.stroke();

        // Haare 
        const numHairCircles = 10;
        const hairCircleRadius = 15;
        const startAngle = Math.PI * 10; // Startwinkel (45 Grad)
        const endAngle = Math.PI - startAngle; // Endwinkel (135 Grad)
        const angleIncrement = (endAngle - startAngle) / (numHairCircles - 1);

        for (let i = 0; i < numHairCircles; i++) {
            const angle = startAngle + i * angleIncrement;
            const hairX = x + Math.cos(angle) * (radius + hairCircleRadius);
            const hairY = (y + 5) + Math.sin(angle) * (radius + hairCircleRadius);

            crc2.beginPath();
            crc2.arc(hairX, hairY, hairCircleRadius, 0, Math.PI * 2);
            crc2.fillStyle = hairColor;
            crc2.fill();
        }
        }
    }
}
