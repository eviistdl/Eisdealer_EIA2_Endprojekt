namespace Eisdealer {
    export class Customer {
        private x: number;
        private y: number;
        private radius: number;
        private skin: string;
        private hairColor: string;

        constructor(_x: number, _y: number, _hairColor: string) {
            this.x = _x;
            this.y = _y;
            this.radius = 40;
            this.skin = "#e8d3b7";
            this.hairColor = "#52402a";
        }

        draw(): void {
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const skin = this.skin;
            const hairColor = this.hairColor;

            // Haare 
            crc2.beginPath();
            crc2.arc(x, y, radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
            crc2.fillStyle = hairColor;
            crc2.fillRect(x - (radius + 10), y + radius - 40, 100, 50);
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

            // Pony (Viertelkreis oben auf dem Kopf)
            crc2.beginPath();
            crc2.arc(x, y - radius / 8, radius, Math.PI * 1.15, Math.PI * 1.85); // Pony etwas nach oben verschoben
            crc2.fillStyle = hairColor;
            crc2.fill();
        
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
        }
        
        update(): void {
            // Hier könnten z.B. Animationen oder andere Veränderungen des Kunden implementiert werden
        }
    }
}
