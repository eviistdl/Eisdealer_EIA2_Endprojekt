namespace Eisdealer {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("DOMContentLoaded", () => { 
    });

    export let allObjects: Drawables[] = [];
    let targetPosition: Vector = new Vector(0, 0);
    let chosenScoops: ScoopChosen[] = [];

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

        const pistacchio: Scoop = new Scoop(80, 100, "#87b07b")
        allObjects.push(pistacchio);
        const strawberry: Scoop = new Scoop(200, 100, "#eb3477")
        allObjects.push(strawberry);
        const lemon: Scoop = new Scoop(320, 100, "#f7dd31")
        allObjects.push(lemon);

        // Eisdealer erstellen und hinzufügen
        let eisdealer = new Eisdealer(300, 400, new Vector(0, 0), new Vector(5, 5), "Eisdealer");
        allObjects.push(eisdealer);

        setInterval(animate, 20);
        createCustomer();

    }

    function createCustomer(): void {
        let customerCount = 0;
        let maxCustomers = 3;
    
        function createSingleCustomer(): void {
            if (customerCount < maxCustomers) {
                let customerX = 500;
                let customerY = 600;
                let customer = new Customer(customerX, customerY, new Vector(0, 0), new Vector(4, 4), `Customer ${customerCount + 1}`, allObjects);
                allObjects.push(customer);
                customerCount++;
    
                // Warte 3 Sekunden, bevor der nächste Kunde erstellt wird
                setTimeout(createSingleCustomer, 3000);
            }
        }
    
        // Starte die Erstellung des ersten Kunden sofort
        createSingleCustomer();
    }

    // function createCustomer(): void {
    //     setInterval(() => {
    //         let customerCount = allObjects.filter(item => item instanceof Customer).length;
    //         if (customerCount < 3) { // Anzahl Customer festlegen
    //             let customerX = 500;
    //             let customerY = 600;
    //             let customer = new Customer(customerX, customerY, new Vector(0, 0), new Vector(4, 4), `Customer ${customerCount + 1}`, allObjects);
    //             allObjects.push(customer);
    //         }
    //     }, 3000); // Kunden alle 3 Sekunden erstellen
    // }
    

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

        chosenScoops.forEach(scoop => {
            scoop.draw();
        });
        
        // Zeichne den Cup, falls ScoopChosen vorhanden sind
        if (chosenScoops.length > 0) {
            let cup = new Cup(800, 400);
            allObjects.push(cup);
            cup.draw();
        }

         //createCustomer();
 
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

        // // Mülleimer
        allObjects.forEach((item) => {
            if (item instanceof Trash) {
                const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                if (distance <= 50) {
                    // Lösche alle ausgewählten Eiskugeln
                    chosenScoops = [];
                    allObjects = allObjects.filter(obj => !(obj instanceof ScoopChosen));
                    console.log("Scoops gelöscht");
                    return;
                }
            }
        });
    
        // Prüfen ob ein Scoop angeklickt wurde und ob noch Platz für weitere Scoops ist
        const scoopRadius = 50;
        const maxScoops = 4; 
        const scoopPositions = [
            { x: 875, y: 450 },
            { x: 875, y: 420 },
            { x: 875, y: 390 },
            { x: 875, y: 360 }
        ];
    
        // Prüfen, ob der Eisdealer sich im richtigen Bereich befindet
        const chooseScoopArea = { xMin: 0, xMax: 400, yMin: 180, yMax: 250 };
        let iceDealerInArea = false;
    
        allObjects.forEach(item => {
            if (item instanceof Eisdealer) {
                if (item.x >= chooseScoopArea.xMin && item.x <= chooseScoopArea.xMax &&
                    item.y >= chooseScoopArea.yMin && item.y <= chooseScoopArea.yMax) {
                    iceDealerInArea = true;
                }
            }
        });
    
        if (iceDealerInArea) {
            if (chosenScoops.length < maxScoops) {
                for (const item of allObjects) {
                    if (item instanceof Scoop) {
                        const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                        if (distance <= scoopRadius) {
                            let chosenScoop = new ScoopChosen(scoopPositions[chosenScoops.length].x, scoopPositions[chosenScoops.length].y, item.color);
                            chosenScoops.push(chosenScoop);
                            allObjects.push(chosenScoop);
    
                            // Cup wird direkt nach dem ersten ScoopChosen gezeichnet
                            if (chosenScoops.length === 1) {
                                let cup = new Cup(800, 400);
                                allObjects.push(cup);
                            }
    
                            break;
                        }
                    }
                }
            }
        }
    
        //console.log(`Clicked at position: (${clickX}, ${clickY})`);
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

        crc2.fillStyle = '#ffffff'; 
        crc2.fillRect(700, 0, 300, 600); 

        }); 
    }
}