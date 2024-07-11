namespace Eisdealer {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("DOMContentLoaded", () => { 
    });

    export let allObjects: Drawables[] = [];
    let targetPosition: Vector = new Vector(0, 0);

    function handleLoad(_event: Event): void {
        console.log("handleLoad")
        // Zugriff auf das Canvas-Element
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", handleClick);

        let trash: Trash = new Trash(470, 170);
        allObjects.push(trash);

        let chair1: Chair = new Chair(120, 400);
        allObjects.push(chair1);
        const chair2: Chair = new Chair(330, 500);
        allObjects.push(chair2);
        const chair3: Chair = new Chair(530, 350);
        allObjects.push(chair3);

        // Eisdealer erstellen und hinzufügen
        let eisdealer = new Eisdealer(300, 400, new Vector(0, 0), new Vector(5, 5), "Eisdealer");
        allObjects.push(eisdealer);

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                let customerX = 800 + i * 50; // Versatz für unterschiedliche Startpositionen
                let customerY = 600;
                let customer = new Customer(customerX, customerY, new Vector(0, 0), new Vector(4, 4), `Customer ${i + 1}`, allObjects);
                allObjects.push(customer);
    
            }, i * 3000); 
        }

        setInterval(animate, 20);

    }

    function animate(): void {
        drawBackround();

        allObjects.forEach(drawable => {
            drawable.draw();
            if (drawable instanceof Eisdealer) {
                drawable.move();
            }
            if (drawable instanceof Customer) {
                drawable.move();
            }
        });

        //Sccops zeichnen
        const scoops = new Scoop();
        scoops.draw();
    }

    // Definition der Hindernisse
    const noGoZone1 = { x: 0, y: 0, width: 440, height: 240 };

     // Funktion zur Kollisionserkennung
     export function collisionNoGoZone(x: number, y: number): boolean {
        // Prüfen, ob der Punkt im Bereich des Eiswagens liegt
        if (
            x > noGoZone1.x && x < noGoZone1.x + noGoZone1.width &&
            y > noGoZone1.y && y < noGoZone1.y + noGoZone1.height
        ) {
            return true;
        }

        return false;
    }
    

    function drawBackround(): void {
        //Hintergrund
        const tileSize = 50; // Größe der Kacheln
        for (let y = 0; y < 600; y += tileSize) {
            for (let x = 0; x < 1000; x += tileSize) {
                crc2.fillStyle = (x / tileSize + y / tileSize) % 2 === 0 ? '#c0c7a3' : '#cdd1bc'; // Abwechselnd Schwarz und Weiß
                crc2.fillRect(x, y, tileSize, tileSize);
            }
        }

        //Eisdiele
        crc2.fillStyle = '#656661'; 
        crc2.fillRect(0, 0, 400, 200); 

        //Tische
        const tables = [
            { x: 40, y: 400, width: 100, height: 100 },
            { x: 250, y: 500, width: 100, height: 100 },
            { x: 450, y: 350, width: 100, height: 100 }
        ];
    
        tables.forEach(table => {
        // Tischplatte zeichnen
        crc2.fillStyle = '#8B4513'; // Holzfarbe
        crc2.fillRect(table.x, table.y, table.width, table.height);
    
        // Tischdecke zeichnen
        crc2.beginPath();
        crc2.arc(table.x + table.width / 2, table.y + table.height / 2, table.width / 3, 0, Math.PI * 2);
        crc2.fillStyle = '#FFFFFF'; // Weiße Tischdecke
        crc2.fill();

        // Spitze am Rand der Tischdecke zeichnen
        const radius = table.width / 3;
        const numSpikes = 12;
        const spikeLength = 5;
        for (let i = 0; i < numSpikes; i++) {
            const angle = (i * 2 * Math.PI) / numSpikes;
            const x1 = (table.x + table.width / 2) + radius * Math.cos(angle);
            const y1 = (table.y + table.height / 2) + radius * Math.sin(angle);
            const x2 = (table.x + table.width / 2) + (radius + spikeLength) * Math.cos(angle);
            const y2 = (table.y + table.height / 2) + (radius + spikeLength) * Math.sin(angle);

            crc2.beginPath();
            crc2.moveTo(x1, y1);
            crc2.lineTo(x2, y2);
            crc2.strokeStyle = '#FFFFFF';
            crc2.stroke();
            }
        }); 
    }
        

    export function handleClick(event: MouseEvent): void {
        let canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect(); 
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;

         // Setze die Zielposition für Eisdealer
         targetPosition = new Vector(clickX, clickY);

         // Übergib die Zielposition an den Eisdealer
            allObjects.forEach(item => {
            if (item instanceof Eisdealer) {
            item.setTarget(targetPosition);
            }
        });

        console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
}