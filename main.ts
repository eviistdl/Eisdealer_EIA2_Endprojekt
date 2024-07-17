namespace Eisdealer {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("DOMContentLoaded", () => { 
    });

    export let allObjects: Drawables[] = [];
    let targetPosition: Vector = new Vector(0, 0);
    let chosenScoops: ScoopChosen[] = [];
    let earningsDisplay: HTMLElement | null;
     
    
    function handleLoad(_event: Event): void {
        console.log("handleLoad")
        // Zugriff auf das Canvas-Element
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        earningsDisplay = document.getElementById('earnings');

        canvas.addEventListener("click", handleClick);

        let trash: Trash = new Trash(470, 170);
        allObjects.push(trash);

        let chair1: Chair = new Chair(120, 400);
        allObjects.push(chair1);
        const chair2: Chair = new Chair(330, 500);
        allObjects.push(chair2);
        const chair3: Chair = new Chair(530, 350);
        allObjects.push(chair3);
        
        // Generiere die Scoops dynamisch basierend auf den Daten
        generateScoops(iceCreamData);

        // Eisdealer erstellen und hinzufügen
        let eisdealer = new Eisdealer(300, 400, new Vector(0, 0), new Vector(5, 5), "Eisdealer");
        allObjects.push(eisdealer);

        setInterval(animate, 20);
        mainLoop();
        // createCustomer();

    }

    // Funktion zum Generieren von Scoops basierend auf den Daten
    function generateScoops(_data: IceCream[]): void {
        let xPositions = [80, 200, 320];
        for (let i = 0; i < _data.length; i++) {
            let iceCream = _data[i];
            let scoop = new Scoop(xPositions[i], 100, iceCream.color);
            allObjects.push(scoop);
        }
    }

    export let customerCount = 0;

    // Funktion zum Zählen der aktuellen Kunden im allObjects Array
    function countCustomers(): number {
        return allObjects.filter(obj => obj instanceof Customer).length;
    }

    // Hauptschleife zum Erstellen von Kunden
    function mainLoop(): void {

        // Setze ein Intervall, um die Kundenanzahl regelmäßig zu prüfen
        setInterval(() => {
            const currentCustomerCount = countCustomers();
            //console.log(currentCustomerCount);
            if (currentCustomerCount < 3) {
                // Rufe die Funktion zum Erstellen von Kunden auf
                const customer = new Customer(0, 0, new Vector(0, 0), new Vector(4, 4), `Customer ${customerCount + 1}`, allObjects);
                customer.createCustomers();
            }
        }, 500); // Intervallzeit in Millisekunden (500ms = 0,5s)
        allObjects.forEach(item => {
            if (item instanceof Customer) {
                item.move();
            }
        });
    }

    // Starte die Hauptschleife
    mainLoop();

    let earningsTotal = 0

        function updateEarnings(amount: number): void {
            //console.log("update earnings");
        earningsTotal += amount;
        if (earningsDisplay) {
            earningsDisplay.innerHTML = `Einnahmen: ${earningsTotal} €`;
            //console.log(`Einnahmen aktualisiert: ${earningsTotal} €`);
        } else {
            console.error("earningsDisplay is null or undefined.");
        }
        }


    // // Funktion, um Kunden zu erstellen
    // function createCustomer(): void {
    //     let maxCustomers = 3;

    //     // Rekursive Funktion zur Erstellung von Kunden
    //     function createCustomersIfNeeded(): void {
            
        
    //         let customerCount = allObjects.filter(obj => obj instanceof Customer).length;

    //         // Wenn weniger als maxCustomers Kunden vorhanden sind, erstelle einen neuen Kunden
    //         if (customerCount < maxCustomers) {
    //             let customerX = 500; 
    //             let customerY = 600; 
    //             let customer = new Customer(customerX, customerY, new Vector(0, 0), new Vector(4, 4), `Customer ${customerCount + 1}`, allObjects);
    //             allObjects.push(customer); // Kunden zu allObjects hinzufügen
    //             customer.state = "walk in";
    //         }

    //         if (customerCount < maxCustomers) {
    //             setTimeout(createCustomersIfNeeded, 3000); // Wartezeit vor dem nächsten Kunden
    //         }
    //     }
    //     createCustomersIfNeeded();
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
                drawable.drawOrder();
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
    }

    // Definition der Hindernisse
    const noGoZone1 = { x: 0, y: 0, width: 1000, height: 240 };

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
        
    function deleteScoopChosen(){
        chosenScoops = [];
        allObjects = allObjects.filter(obj => !(obj instanceof ScoopChosen));
        //console.log("Scoops gelöscht");
    }
    export function handleClick(event: MouseEvent): void {
        let canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect(); 
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;
    
        targetPosition = new Vector(clickX, clickY);// Setze die Zielposition für Eisdealer
    
        allObjects.forEach(item => {// Übergib die Zielposition an den Eisdealer
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
                    deleteScoopChosen();
                    return;
                }
            }
        });

    // Kunden anklicken und checkOrder aufrufen, Array löschen
        allObjects.forEach(item => {
            let customerClicked = false;
            if (item instanceof Customer) {
                customerClicked = true;
                const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                if (customerClicked && distance <= 50) { 
                    checkOrder(item as Customer); //Zugriff auf den bestimmten Customer
                    // customerClicked = false;
                }
                if (customerClicked && distance <= 50 && item.customerPay) {
                    console.log("geld einsammeln");
                    const amount = item.getReceipt();

                    item.getReceipt();
                    updateEarnings(amount); 
                    item.state = "paid";
                    item.orderCompleted = false;
                    customerClicked = false;
                }
            }
        });
    
    //Scoops
        const scoopRadius = 50;
        const maxScoops = 6; 
        const scoopPositions = [
            { x: 875, y: 450 },
            { x: 875, y: 420 },
            { x: 875, y: 390 },
            { x: 875, y: 360 },
            { x: 875, y: 330 },
            { x: 875, y: 300 },
        ];
    
    // Prüfen, ob der Eisdealer sich im richtigen Bereich befindet
        const chooseScoopArea = { xMin: 0, xMax: 400, yMin: 180, yMax: 250 };
        let EisdealerInArea = false;
        
        //überprüfen ob Eisdealer nah genug
        allObjects.forEach(item => {
            if (item instanceof Eisdealer) {
                if (item.x >= chooseScoopArea.xMin && item.x <= chooseScoopArea.xMax &&
                    item.y >= chooseScoopArea.yMin && item.y <= chooseScoopArea.yMax) {
                    EisdealerInArea = true;
                }
            }
        });
        
        // Ausgewählte Sorten rechts zeichnen
    if (EisdealerInArea) {
        if (chosenScoops.length < maxScoops) {
            for (const item of allObjects) {
                if (item instanceof Scoop) {
                    const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                    if (distance <= scoopRadius) {
                        let chosenScoop: ScoopChosen | null = null;

                        // Durchsuche iceCreamData, um die passenden Eigenschaften zu finden
                        for (let i = 0; i < iceCreamData.length; i++) {
                            const iceCream = iceCreamData[i];
                            if (item.color === iceCream.color) {
                                chosenScoop = new ScoopChosen(
                                    scoopPositions[chosenScoops.length].x, 
                                    scoopPositions[chosenScoops.length].y, 
                                    iceCream.color, 
                                    iceCream.flavor
                                );
                                break;
                            }
                        }

                        if (chosenScoop) {
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
    }

    // console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }

    function checkOrder(customer: Customer): void {
        let orderCorrect = true; // Variable zur Überprüfung, ob die Bestellung korrekt ist
    
        // Überprüfe die Anzahl
        if (chosenScoops.length !== customer.order.length) {
            orderCorrect = false;
            //console.log("Eis Kugelanzahl simmt nicht überein");
        } else {
            // Vergleiche die gewählten Scoops mit der Bestellung
            for (let i = 0; i < chosenScoops.length; i++) { //Scoop Array durchgehen und prüfen
                const chosenScoop = chosenScoops[i];
                const customerOrder = customer.order[i];
                //console.log(`Vergleiche gewählten Scoop ${i + 1}: ${chosenScoop.flavor} mit Kundenbestellung: ${customerOrder.flavor}`);

    
                // Suche die entsprechende Eissorte im Datenbestand
                const chosenIceCream = iceCreamData.find(iceCream => iceCream.flavor === chosenScoop.flavor);
                const customerIceCream = iceCreamData.find(iceCream => iceCream.flavor === customerOrder.flavor);
    
                // Überprüfe, ob beide Sorten existieren und ihre Eigenschaften übereinstimmen
                if (!chosenIceCream || !customerIceCream || chosenIceCream.flavor !== customerIceCream.flavor) {
                    //console.log(`Eissorte nicht gefunden. Gewählt: ${chosenIceCream ? chosenIceCream.flavor : 'null'}, Bestellt: ${customerIceCream ? customerIceCream.flavor : 'null'}`);
                    orderCorrect = false;
                    break;
                }
            }
        }
    
        if (!orderCorrect) { // Bestellung ist nicht korrekt
            //console.log(`Order for ${customer.type} is not correct!`);
        } else { // Bestellung ist korrekt
            //console.log(`Order for ${customer.type} is correct!`);
            customer.orderCompleted = true;
            customer.state = "pay";
            deleteScoopChosen();
    
            // Bestellung abgeschlossen und bezahlt
            if (customer.paid) {
                customer.orderCompleted = false;
            }
        }
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