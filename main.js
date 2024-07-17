"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    Eisdealer.allObjects = [];
    let targetPosition = new Eisdealer.Vector(0, 0);
    let chosenScoops = [];
    let earningsDisplay;
    function handleLoad(_event) {
        console.log("handleLoad");
        // Zugriff auf das Canvas-Element
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdealer.crc2 = canvas.getContext("2d");
        earningsDisplay = document.getElementById('earnings');
        canvas.addEventListener("click", handleClick);
        let trash = new Eisdealer.Trash(470, 170);
        Eisdealer.allObjects.push(trash);
        let chair1 = new Eisdealer.Chair(120, 400);
        Eisdealer.allObjects.push(chair1);
        const chair2 = new Eisdealer.Chair(330, 500);
        Eisdealer.allObjects.push(chair2);
        const chair3 = new Eisdealer.Chair(530, 350);
        Eisdealer.allObjects.push(chair3);
        // Generiere die Scoops dynamisch
        generateScoops(Eisdealer.iceCreamData);
        // Eisdealer erstellen
        let eisdealer = new Eisdealer.Eisdealer(300, 400, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(5, 5), "Eisdealer");
        Eisdealer.allObjects.push(eisdealer);
        mainLoop();
        setInterval(animate, 20);
    }
    //Generieren von Scoops basierend auf den Daten
    function generateScoops(_data) {
        let xPositions = [80, 200, 320];
        for (let i = 0; i < _data.length; i++) {
            let iceCream = _data[i];
            let scoop = new Eisdealer.Scoop(xPositions[i], 100, iceCream.color);
            Eisdealer.allObjects.push(scoop);
        }
    }
    Eisdealer.customerCount = 0;
    //Zählen der aktuellen Kunden im allObjects Array
    function countCustomers() {
        return Eisdealer.allObjects.filter(obj => obj instanceof Eisdealer.Customer).length;
    }
    // Hauptschleife zum Erstellen von Kunden
    function mainLoop() {
        // Setze ein Intervall, um die Kundenanzahl regelmäßig zu prüfen
        setInterval(() => {
            const currentCustomerCount = countCustomers();
            if (currentCustomerCount < 3) {
                const customer = new Eisdealer.Customer(0, 0, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(4, 4), `Customer ${Eisdealer.customerCount + 1}`, Eisdealer.allObjects);
                customer.createCustomers();
            }
        }, 500); // Intervallzeit
    }
    // Starte die Hauptschleife
    mainLoop();
    let earningsTotal = 0;
    function updateEarnings(amount) {
        //console.log("update earnings");
        earningsTotal += amount;
        if (earningsDisplay) {
            earningsDisplay.innerHTML = `Einnahmen: ${earningsTotal} €`;
            //console.log(`Einnahmen aktualisiert: ${earningsTotal} €`);
        }
        else {
            console.error("earningsDisplay is null or undefined.");
        }
    }
    function animate() {
        drawBackround();
        Eisdealer.allObjects.forEach(drawable => {
            drawable.draw();
            if (drawable instanceof Eisdealer.Eisdealer) {
                drawable.move();
            }
            if (drawable instanceof Eisdealer.Customer) {
                drawable.move();
                drawable.drawOrder();
            }
        });
        chosenScoops.forEach(scoop => {
            scoop.draw();
        });
    }
    // Definition der Hindernisse
    const noGoZone1 = { x: 0, y: 0, width: 1000, height: 240 };
    // Funktion zur Kollisionserkennung
    function collisionNoGoZone(x, y) {
        // Prüfen, ob der Punkt im Bereich des Eiswagens liegt
        if (x > noGoZone1.x && x < noGoZone1.x + noGoZone1.width &&
            y > noGoZone1.y && y < noGoZone1.y + noGoZone1.height) {
            return true;
        }
        return false;
    }
    Eisdealer.collisionNoGoZone = collisionNoGoZone;
    function deleteScoopChosen() {
        chosenScoops = [];
        Eisdealer.allObjects = Eisdealer.allObjects.filter(obj => !(obj instanceof Eisdealer.ScoopChosen));
        //console.log("Scoops gelöscht");
    }
    function handleClick(event) {
        let canvasRect = event.target.getBoundingClientRect();
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;
        targetPosition = new Eisdealer.Vector(clickX, clickY); // Setze die Zielposition für Eisdealer
        Eisdealer.allObjects.forEach(item => {
            if (item instanceof Eisdealer.Eisdealer) {
                item.setTarget(targetPosition);
            }
        });
        // // Mülleimer anklicken
        Eisdealer.allObjects.forEach((item) => {
            if (item instanceof Eisdealer.Trash) {
                const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                if (distance <= 50) {
                    deleteScoopChosen(); // Lösche alle ausgewählten Eiskugeln
                    return;
                }
            }
        });
        // Kunden anklicken und checkOrder aufrufen, Array löschen
        Eisdealer.allObjects.forEach(item => {
            let customerClicked = false;
            if (item instanceof Eisdealer.Customer) {
                customerClicked = true;
                const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                if (customerClicked && distance <= 50) {
                    checkOrder(item); //Zugriff auf den bestimmten Customer
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
        Eisdealer.allObjects.forEach(item => {
            if (item instanceof Eisdealer.Eisdealer) {
                if (item.x >= chooseScoopArea.xMin && item.x <= chooseScoopArea.xMax &&
                    item.y >= chooseScoopArea.yMin && item.y <= chooseScoopArea.yMax) {
                    EisdealerInArea = true;
                }
            }
        });
        // Ausgewählte Sorten rechts zeichnen
        if (EisdealerInArea) {
            if (chosenScoops.length < maxScoops) {
                for (const item of Eisdealer.allObjects) {
                    if (item instanceof Eisdealer.Scoop) {
                        const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                        if (distance <= scoopRadius) {
                            let chosenScoop = null;
                            // Durchsuche iceCreamData, um die passenden Eigenschaften zu finden
                            for (let i = 0; i < Eisdealer.iceCreamData.length; i++) {
                                const iceCream = Eisdealer.iceCreamData[i];
                                if (item.color === iceCream.color) {
                                    chosenScoop = new Eisdealer.ScoopChosen(scoopPositions[chosenScoops.length].x, scoopPositions[chosenScoops.length].y, iceCream.color, iceCream.flavor);
                                    break;
                                }
                            }
                            if (chosenScoop) {
                                chosenScoops.push(chosenScoop);
                                Eisdealer.allObjects.push(chosenScoop);
                                // Cup wird direkt nach dem ersten ScoopChosen gezeichnet
                                if (chosenScoops.length === 1) {
                                    let cup = new Eisdealer.Cup(800, 400);
                                    Eisdealer.allObjects.push(cup);
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
    Eisdealer.handleClick = handleClick;
    function checkOrder(customer) {
        customer.orderCorrect = true; // Variable zur Überprüfung, ob die Bestellung korrekt ist
        // Überprüfe die Anzahl
        if (chosenScoops.length !== customer.order.length) {
            customer.orderCorrect = false;
        }
        else {
            // Vergleiche die gewählten Scoops mit der Bestellung
            for (let i = 0; i < chosenScoops.length; i++) {
                const chosenScoop = chosenScoops[i];
                const customerOrder = customer.order[i];
                // Suche die entsprechende Eissorte in data
                const chosenIceCream = Eisdealer.iceCreamData.find(iceCream => iceCream.flavor === chosenScoop.flavor);
                const customerIceCream = Eisdealer.iceCreamData.find(iceCream => iceCream.flavor === customerOrder.flavor);
                // Überprüfe Übereinstimmung der Arrays
                if (!chosenIceCream || !customerIceCream || chosenIceCream.flavor !== customerIceCream.flavor) {
                    customer.orderCorrect = false;
                    break;
                }
            }
        }
        if (!customer.orderCorrect) { //stimmt nicht überien
            customer.emotion = "angry";
            customer.state = "paid";
            console.log(`Order for ${customer.type} is not correct!`);
        }
        else { //stimmt überein
            console.log(`Order for ${customer.type} is correct!`);
            customer.emotion = "happy";
            customer.orderCompleted = true;
            customer.state = "pay";
            deleteScoopChosen();
            if (customer.paid) { //setze orderCompleted zurück auf false
                customer.orderCompleted = false;
            }
        }
    }
    function drawBackround() {
        //Hintergrund
        const tileSize = 50; // Größe der Kacheln
        for (let y = 0; y < 600; y += tileSize) {
            for (let x = 0; x < 1000; x += tileSize) {
                Eisdealer.crc2.fillStyle = (x / tileSize + y / tileSize) % 2 === 0 ? '#c0c7a3' : '#cdd1bc'; // Abwechselnd Schwarz und Weiß
                Eisdealer.crc2.fillRect(x, y, tileSize, tileSize);
            }
        }
        //Eisdiele
        Eisdealer.crc2.fillStyle = '#656661';
        Eisdealer.crc2.fillRect(0, 0, 400, 200);
        //Tische
        const tables = [
            { x: 40, y: 400, width: 100, height: 100 },
            { x: 250, y: 500, width: 100, height: 100 },
            { x: 450, y: 350, width: 100, height: 100 }
        ];
        tables.forEach(table => {
            // Tischplatte zeichnen
            Eisdealer.crc2.fillStyle = '#8B4513'; // Holzfarbe
            Eisdealer.crc2.fillRect(table.x, table.y, table.width, table.height);
            // Tischdecke zeichnen
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(table.x + table.width / 2, table.y + table.height / 2, table.width / 3, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#FFFFFF'; // Weiße Tischdecke
            Eisdealer.crc2.fill();
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
                Eisdealer.crc2.beginPath();
                Eisdealer.crc2.moveTo(x1, y1);
                Eisdealer.crc2.lineTo(x2, y2);
                Eisdealer.crc2.strokeStyle = '#FFFFFF';
                Eisdealer.crc2.stroke();
            }
            Eisdealer.crc2.fillStyle = '#ffffff';
            Eisdealer.crc2.fillRect(700, 0, 300, 600);
        });
    }
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=main.js.map