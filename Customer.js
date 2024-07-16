"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Customer extends Eisdealer.Moveables {
        radius;
        skin;
        hairColor;
        targetChair;
        allObjects;
        order;
        constructor(_x, _y, _direction, _speed, _type, allObjects) {
            super(_x, _y, _direction, _speed, _type);
            this.radius = 40;
            this.skin = "#e8d3b7";
            this.hairColor = "#52402a";
            this.targetChair = null;
            this.allObjects = allObjects;
            this.order = [];
        }
        move() {
            //console.log("customer move");
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
                    this.speed = new Eisdealer.Vector(0, 0);
                    this.targetChair = null;
                    //Bestellung aufgeben:
                    this.placeOrder();
                }
            }
        }
        findNextUnoccupiedChair() {
            for (const obj of this.allObjects) {
                if (obj instanceof Eisdealer.Chair && !obj.isOccupied()) {
                    this.targetChair = obj;
                    break;
                }
            }
        }
        placeOrder() {
            // Zufällige Anzahl von Kugeln zwischen 3 und 6 auswählen
            const numScoops = Math.floor(Math.random() * 4) + 3; // 3 bis 6 Kugeln
            // Array von verfügbaren Eissorten aus data.ts
            const availableFlavors = Eisdealer.data;
            // Zufällige Auswahl von Eissorten für die Bestellung
            for (let i = 0; i < numScoops; i++) {
                const randomIndex = Math.floor(Math.random() * availableFlavors.length);
                const randomFlavor = availableFlavors[randomIndex];
                this.order.push(randomFlavor);
            }
            //console.log(`Customer placed order: ${JSON.stringify(this.order)}`);
            this.drawOrder();
        }
        receiveIceCream() {
            console.log("Kunde hat das Eis erhalten.");
        }
        drawOrder() {
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
                Eisdealer.crc2.beginPath();
                Eisdealer.crc2.arc(x, y, diameter, Math.PI, 0);
                Eisdealer.crc2.fillStyle = color;
                Eisdealer.crc2.fill();
                Eisdealer.crc2.strokeStyle = "#fcedd7";
                Eisdealer.crc2.stroke();
                this.drawCup();
            }
        }
        drawCup() {
            const x = this.x + 20;
            const y = this.y;
            const widthTop = 60;
            const widthBottom = 45;
            const height = 30;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.moveTo(x, y); // Starting point (top-left)
            Eisdealer.crc2.lineTo(x + widthTop, y); // Top side
            Eisdealer.crc2.lineTo(x + (widthTop - widthBottom) / 2 + widthBottom, y + height); // Bottom-right side
            Eisdealer.crc2.lineTo(x + (widthTop - widthBottom) / 2, y + height); // Bottom-left side
            Eisdealer.crc2.closePath(); // Close the path
            Eisdealer.crc2.fillStyle = "#ebddb9";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.strokeStyle = "#b39b78";
            Eisdealer.crc2.stroke();
        }
        draw() {
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const skin = this.skin;
            const hairColor = this.hairColor;
            // Haare 
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
            Eisdealer.crc2.fillStyle = hairColor;
            Eisdealer.crc2.fillRect(x - (radius + 10), y + radius - 40, 100, 50);
            Eisdealer.crc2.fill();
            // Ohren zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x - radius, y, 10, 0, Math.PI);
            Eisdealer.crc2.arc(x + radius, y, 10, 0, Math.PI);
            Eisdealer.crc2.fillStyle = skin;
            Eisdealer.crc2.strokeStyle = "#52402a";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.stroke();
            // Kopf 
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y, radius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = skin;
            Eisdealer.crc2.strokeStyle = "#52402a";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.stroke();
            // Pony (Viertelkreis oben auf dem Kopf)
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y - radius / 8, radius, Math.PI * 1.15, Math.PI * 1.85); // Pony etwas nach oben verschoben
            Eisdealer.crc2.fillStyle = hairColor;
            Eisdealer.crc2.fill();
            // Augen zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer.crc2.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#000000';
            Eisdealer.crc2.fill();
            // Mund zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(x, y + 10, 15, 0, Math.PI, false);
            Eisdealer.crc2.strokeStyle = '#000000';
            Eisdealer.crc2.stroke();
        }
        update() {
        }
    }
    Eisdealer.Customer = Customer;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Customer.js.map