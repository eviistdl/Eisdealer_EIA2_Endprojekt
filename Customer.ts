namespace Eisdealer {    
    export class Customer extends Moveables {
    public state: "walk in" | "sit" | "pay" | "leave"; 
    public emotion: "happy" | "angry";
    private radius: number;
    private skin: string;
    private hairColor: string;

    private targetChair: Chair | null;
    public assignedChair: Chair | null;
    private allObjects: Drawables[];

    public order: IceCream[];
    public orderCompleted: boolean = false;
    public customerPay: boolean = false;
    public paid: boolean = false;
    public orderCorrect: boolean = false;
    public orderChecked : boolean = false;

    constructor(_x: number, _y: number, _direction: Vector, _speed: Vector, _type: string, allObjects: Drawables[]) {
        super (_x, _y, _direction, _speed, _type)
        this.radius = 40;
        this.skin = "#e8d3b7";
        this.hairColor = "#52402a";

        this.targetChair = null;
        this.assignedChair = null; 
        this.allObjects = allObjects;

        this.order = [];
        this.orderCompleted = false;
        this.orderChecked = false;
    }

    public move(): void {
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
                        this.speed = new Vector(0, 0);
                        this.assignedChair = this.targetChair;
                        this.targetChair = null;
                        
    
                        // Bestellung aufgeben:
                        this.placeOrder();
                        this.state = "sit";
                    }
                }
                break;
    
            case "leave":
                const targetX = 500;
                const targetY = 700;
                const dx = targetX - this.x;
                const dy = targetY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                this.speed = new Vector(2, 2);
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

    private findNextUnoccupiedChair(): void {
        //console.log("find next unoccupied chair")
        for (const obj of this.allObjects) {
            if (obj instanceof Chair && !obj.isOccupied()) {
                this.targetChair = obj;
                break;
            }
        }
    }

    public createCustomers():void {
        this.createSingleCustomer();
    }

    public createSingleCustomer(): void {
        console.log("create single customer");
        let customerX = 500;
        let customerY = 600;
        let customer = new Customer(customerX, customerY, new Vector(0, 0), new Vector(4, 4), `Customer ${customerCount + 1}`, allObjects);
        allObjects.push(customer); // Kunden zu allObjects hinzufügen
        this.orderChecked = false;
        customer.state = "walk in";
        customer.emotion ="happy";
        customerCount++; // Erhöhe die Kundenanzahl
    }


    private placeOrder(): void {
        // Zufällige Anzahl von Kugeln zwischen 3 und 6 auswählen
        const numScoops = Math.floor(Math.random() * 4) + 3; // 3 bis 6 Kugeln

        // Array von verfügbaren Eissorten aus data.ts
        const availableFlavors = iceCreamData;

        // Zufällige Auswahl von Eissorten für die Bestellung
        for (let i = 0; i < numScoops; i++) {
            const randomIndex = Math.floor(Math.random() * availableFlavors.length);
            const randomFlavor = availableFlavors[randomIndex];
            this.order.push(randomFlavor);
        }

        //console.log(`Customer placed order: ${JSON.stringify(this.order)}`);
        this.drawOrder();
    }

    public getReceipt(): number {
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
                const iceCream = iceCreamData.find(iceCream => iceCream.flavor === this.order[i].flavor);
                if (iceCream) {
                    color = iceCream.color;
                } else {
                    color = '#000000'; // Fallback-Farbe, falls die Sorte nicht gefunden wird
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

    private drawCustomerHappy() {
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
    crc2.strokeStyle = '#000000'; // Schwarzer Mund, wenn der Kunde glücklich ist
    crc2.stroke();
    }

    private drawCustomerAngry() {
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
        crc2.arc(x, y + 10, 15, Math.PI, 2 * Math.PI, false);
        crc2.strokeStyle = '#ff0000'; // Roter Mund, wenn der Kunde nicht glücklich ist
        crc2.stroke();
    }

    public drawCustomer() {
        switch (this.emotion) {
            case "happy":
                this.drawCustomerHappy();
                break;
            default:
                this.drawCustomerAngry();
            }
            
    }
    

    public drawReceiptDelayed(): void {
        setTimeout(() => {
            this.drawReceipt();
            if (this.orderCorrect) {
                this.emotion = "happy";
            } else {
                this.emotion = "angry";
            }
        }, 3000); 
    }
    
    public drawReceipt(): void {
        if (this.state === "leave") return;
    
        this.customerPay = true;
        crc2.beginPath();
        crc2.rect(this.x + 30, this.y - 30, 20, 25);
        crc2.fillStyle = "#ffffff";
        crc2.strokeStyle = "#808080";
        crc2.lineWidth = 2;
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
    
        crc2.beginPath();
        crc2.moveTo(this.x + 40, this.y - 35);
        crc2.lineTo(this.x + 40, this.y - 45);
        crc2.strokeStyle = "#ff0000";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();
    
        crc2.beginPath();
        crc2.arc(this.x + 40, this.y - 30, 2, 0, Math.PI * 2);
        crc2.fillStyle = "#ff0000";
        crc2.fill();
        crc2.closePath();
        crc2.lineWidth = 1;
    }

    draw(): void {
        switch (this.state) {
            case "sit":
                this.drawCustomer();
                break;
            case "pay":
                this.drawCustomerHappy();
                this.drawReceiptDelayed();
                this.orderCompleted = true;
                break;
            case "leave":
                this.drawCustomerHappy();
                this.orderCompleted = true;
            default:
                this.drawCustomer();
            }
    }
    
    update(): void {
    }
    }
}
