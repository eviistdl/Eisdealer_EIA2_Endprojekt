"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Customer extends Eisdealer.Moveables {
        state;
        emotion;
        radius;
        skin;
        hairColor;
        targetChair;
        assignedChair;
        allObjects;
        order;
        orderCompleted = false;
        customerPay = false;
        paid = false;
        orderCorrect = false;
        constructor(_x, _y, _direction, _speed, _type, allObjects) {
            super(_x, _y, _direction, _speed, _type);
            this.radius = 40;
            this.skin = "#e8d3b7";
            this.hairColor = "#52402a";
            this.targetChair = null;
            this.assignedChair = null;
            this.allObjects = allObjects;
            this.order = [];
            this.orderCompleted = false;
        }
        move() {
            switch (this.state) {
                case "walk in":
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
                            this.assignedChair = this.targetChair;
                            this.targetChair = null;
                            // Bestellung aufgeben:
                            this.placeOrder();
                            this.state = "sit";
                        }
                    }
                    break;
                case "paid":
                    const targetX = 500;
                    const targetY = 700;
                    const dx = targetX - this.x;
                    const dy = targetY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    this.speed = new Eisdealer.Vector(2, 2);
                    const moveDistance = Math.min(this.speed.x, distance);
                    this.x += (dx / distance) * moveDistance;
                    this.y += (dy / distance) * moveDistance;
                    if (this.y > 699) {
                        if (this.assignedChair) {
                            this.assignedChair.free();
                        }
                        this.allObjects = this.allObjects.filter(obj => obj !== this);
                        this.createSingleCustomer();
                    }
                    break;
            }
        }
        findNextUnoccupiedChair() {
            console.log("find next unoccupied chair");
            for (const obj of this.allObjects) {
                if (obj instanceof Eisdealer.Chair && !obj.isOccupied()) {
                    this.targetChair = obj;
                    break;
                }
            }
        }
        createCustomers() {
            this.createSingleCustomer();
        }
        createSingleCustomer() {
            console.log("create single customer");
            let customerX = 500;
            let customerY = 600;
            let customer = new Customer(customerX, customerY, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(4, 4), `Customer ${Eisdealer.customerCount + 1}`, Eisdealer.allObjects);
            Eisdealer.allObjects.push(customer); // Kunden zu allObjects hinzufügen
            customer.state = "walk in";
            customer.emotion = "happy";
            Eisdealer.customerCount++; // Erhöhe die Kundenanzahl
        }
        placeOrder() {
            // Zufällige Anzahl von Kugeln zwischen 3 und 6 auswählen
            const numScoops = Math.floor(Math.random() * 4) + 3; // 3 bis 6 Kugeln
            // Array von verfügbaren Eissorten aus data.ts
            const availableFlavors = Eisdealer.iceCreamData;
            // Zufällige Auswahl von Eissorten für die Bestellung
            for (let i = 0; i < numScoops; i++) {
                const randomIndex = Math.floor(Math.random() * availableFlavors.length);
                const randomFlavor = availableFlavors[randomIndex];
                this.order.push(randomFlavor);
            }
            //console.log(`Customer placed order: ${JSON.stringify(this.order)}`);
            this.drawOrder();
        }
        getReceipt() {
            let amount = 0;
            let receiptContent = "<h3>Receipt</h3><ul>";
            // Durchlaufe alle Kugeln in der Bestellung und addiere ihre Preise zum Gesamtpreis
            for (let scoop of this.order) {
                receiptContent += `${scoop.flavor}: ${scoop.price} € <br>`;
                amount += scoop.price;
            }
            receiptContent += `</ul><p>Total: ${amount} €</p>`;
            //console.log(`Receipt for ${this.type}: Total Price = ${amount} credits`);
            // Füge den Receipt-Content in das HTML-Element mit der ID "receipt" ein
            const receiptElement = document.getElementById("receipt");
            if (receiptElement) {
                receiptElement.innerHTML = receiptContent;
            }
            return amount;
        }
        drawOrder() {
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
                    const iceCream = Eisdealer.iceCreamData.find(iceCream => iceCream.flavor === this.order[i].flavor);
                    if (iceCream) {
                        color = iceCream.color;
                    }
                    else {
                        color = '#000000'; // Fallback-Farbe, falls die Sorte nicht gefunden wird
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
        drawCustomerHappy() {
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
            Eisdealer.crc2.strokeStyle = '#000000'; // Schwarzer Mund, wenn der Kunde glücklich ist
            Eisdealer.crc2.stroke();
        }
        drawCustomerAngry() {
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
            Eisdealer.crc2.arc(x, y + 10, 15, Math.PI, 2 * Math.PI, false);
            Eisdealer.crc2.strokeStyle = '#ff0000'; // Roter Mund, wenn der Kunde nicht glücklich ist
            Eisdealer.crc2.stroke();
        }
        drawCustomer() {
            switch (this.emotion) {
                case "happy":
                    this.drawCustomerHappy();
                    break;
                default:
                    this.drawCustomerAngry();
            }
        }
        drawReceiptDelayed() {
            setTimeout(() => {
                this.drawReceipt();
                if (this.orderCorrect) {
                    this.emotion = "happy";
                }
                else {
                    this.emotion = "angry";
                }
            }, 5000);
        }
        drawReceipt() {
            if (this.state === "paid")
                return;
            this.customerPay = true;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.rect(this.x + 30, this.y - 30, 20, 25);
            Eisdealer.crc2.fillStyle = "#ffffff";
            Eisdealer.crc2.strokeStyle = "#808080";
            Eisdealer.crc2.lineWidth = 2;
            Eisdealer.crc2.fill();
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.closePath();
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.moveTo(this.x + 40, this.y - 35);
            Eisdealer.crc2.lineTo(this.x + 40, this.y - 45);
            Eisdealer.crc2.strokeStyle = "#ff0000";
            Eisdealer.crc2.lineWidth = 3;
            Eisdealer.crc2.stroke();
            Eisdealer.crc2.closePath();
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(this.x + 40, this.y - 30, 2, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = "#ff0000";
            Eisdealer.crc2.fill();
            Eisdealer.crc2.closePath();
            Eisdealer.crc2.lineWidth = 1;
        }
        draw() {
            switch (this.state) {
                case "sit":
                    this.drawCustomer();
                    break;
                case "pay":
                    this.drawCustomerHappy();
                    this.drawReceiptDelayed();
                    this.orderCompleted = true;
                    break;
                case "paid":
                    this.drawCustomerHappy();
                    this.orderCompleted = true;
                default:
                    this.drawCustomer();
            }
        }
        update() {
        }
    }
    Eisdealer.Customer = Customer;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Customer.js.map