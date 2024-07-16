namespace Eisdealer {
    export class Customer extends Moveables {
        private radius: number;
        private skin: string;
        private hairColor: string;
        private targetChair: Chair | null;
        private allObjects: Drawables[];
        public order: IceCream[];
        public orderCompleted: boolean = false;

        constructor(_x: number, _y: number, _direction: Vector, _speed: Vector, _type: string, allObjects: Drawables[]) {
            super (_x, _y, _direction, _speed, _type)
            this.radius = 40;
            this.skin = "#e8d3b7";
            this.hairColor = "#52402a";
            this.targetChair = null;
            this.allObjects = allObjects;
            this.order = [];
            this.orderCompleted = false;
        }

        
        public move(): void {
            if (!this.targetChair || this.targetChair.isOccupied()) {
                this.findNextUnoccupiedChair();
            }
        
            if (this.targetChair) {
                const dx = this.targetChair.x - this.x + 50;
                const dy = this.targetChair.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const moveDistance = Math.min(this.speed.x, distance);
        
                this.x += (dx / distance) * moveDistance;
                this.y += (dy / distance) * moveDistance;
        
                if (distance < this.speed.x) {
                    this.targetChair.occupy();
                    this.speed = new Vector(0, 0);
                    this.targetChair = null;

                    //Bestellung aufgeben:
                    this.placeOrder();
                }
            }
        
            if (this.orderCompleted) {
                this.speed = new Vector(1, 1); // Beispiel für Änderungen in der Geschwindigkeit
                this.leave();
            }
        }
        

        private findNextUnoccupiedChair(): void {
            for (const obj of this.allObjects) {
                if (obj instanceof Chair && !obj.isOccupied()) {
                    this.targetChair = obj;
                    break;
                }
            }
        }

        private placeOrder(): void {
            // Zufällige Anzahl von Kugeln zwischen 3 und 6 auswählen
            const numScoops = Math.floor(Math.random() * 4) + 3; // 3 bis 6 Kugeln

            // Array von verfügbaren Eissorten aus data.ts
            const availableFlavors = data;

            // Zufällige Auswahl von Eissorten für die Bestellung
            for (let i = 0; i < numScoops; i++) {
                const randomIndex = Math.floor(Math.random() * availableFlavors.length);
                const randomFlavor = availableFlavors[randomIndex];
                this.order.push(randomFlavor);
            }

            //console.log(`Customer placed order: ${JSON.stringify(this.order)}`);
            this.drawOrder();
        }

        public leave(): void {
            this.speed = new Vector(4, 4); // Geschwindigkeit auf 4 setzen

            // Bewegungsberechnung zum Ziel (500, 700)
            const dx = 500 - this.x;
            const dy = 610 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const moveDistance = Math.min(distance, Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y));

            this.x += (dx / distance) * moveDistance;
            this.y += (dy / distance) * moveDistance;

            // Wenn der Kunde die Zielkoordinaten erreicht hat, aus allObjects entfernen
            if (this.y > 609) {
                this.allObjects = this.allObjects.filter(obj => obj !== this);
                console.log(`${this.type} left the shop.`);
            }
        }


        public drawOrder(): void {
            if (!this.orderCompleted) {
                //console.log("draw order")
                const startX = this.x + 50;
                const startY = this.y;
                const diameter = 25;
                const yOffset = -15;

                for (let i = 0; i < this.order.length; i++) {
                    const x = startX;
                    const y = startY + i * yOffset;
                    let color = '';

                    // Farbe basierend auf der Eiscremesorte setzen
                    switch (this.order[i].flavor) {
                        case 'pistacchio':
                            color = '#87b07b';
                            break;
                        case 'strawberry':
                            color = '#eb3477';
                            break;
                        case 'lemon':
                            color = '#f7dd31';
                            break;
                        default:
                            color = '#000000'; 
                            break;
                    }

                    // Eiskugeln
                    crc2.beginPath();
                    crc2.arc(x, y, diameter, Math.PI, 0); 
                    crc2.fillStyle = color;
                    crc2.fill();
                    crc2.strokeStyle = "#fcedd7";
                    crc2.stroke();

                    this.drawCup ();
            }
        }
        }

        private drawCup(){
            const x = this.x + 20;
            const y = this.y;
            const widthTop = 60;
            const widthBottom = 45;
            const height = 30;

            crc2.beginPath();
            crc2.moveTo(x, y); // Starting point (top-left)
            crc2.lineTo(x + widthTop, y); // Top side
            crc2.lineTo(x + (widthTop - widthBottom) / 2 + widthBottom, y + height); // Bottom-right side
            crc2.lineTo(x + (widthTop - widthBottom) / 2, y + height); // Bottom-left side
            crc2.closePath(); // Close the path

            crc2.fillStyle = "#ebddb9";
            crc2.fill();
            crc2.strokeStyle = "#b39b78";
            crc2.stroke();
        }

        draw(): void {
            if (this.allObjects.includes(this)) {
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
        }
        
        update(): void {
        }
    }
}
