"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    Eisdealer.allObjects = [];
    let targetPosition = new Eisdealer.Vector(0, 0);
    let chosenScoops = [];
    function handleLoad(_event) {
        console.log("handleLoad");
        // Zugriff auf das Canvas-Element
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        let trash = new Eisdealer.Trash(470, 170);
        Eisdealer.allObjects.push(trash);
        let chair1 = new Eisdealer.Chair(120, 400);
        Eisdealer.allObjects.push(chair1);
        const chair2 = new Eisdealer.Chair(330, 500);
        Eisdealer.allObjects.push(chair2);
        const chair3 = new Eisdealer.Chair(530, 350);
        Eisdealer.allObjects.push(chair3);
        const pistacchio = new Eisdealer.Scoop(80, 100, "#87b07b");
        Eisdealer.allObjects.push(pistacchio);
        const strawberry = new Eisdealer.Scoop(200, 100, "#eb3477");
        Eisdealer.allObjects.push(strawberry);
        const lemon = new Eisdealer.Scoop(320, 100, "#f7dd31");
        Eisdealer.allObjects.push(lemon);
        // Eisdealer erstellen und hinzufügen
        let eisdealer = new Eisdealer.Eisdealer(300, 400, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(5, 5), "Eisdealer");
        Eisdealer.allObjects.push(eisdealer);
        setInterval(animate, 20);
        createCustomer();
    }
    function createCustomer() {
        let customerCount = 0;
        let maxCustomers = 3;
        function createSingleCustomer() {
            if (customerCount < maxCustomers) {
                let customerX = 500;
                let customerY = 600;
                let customer = new Eisdealer.Customer(customerX, customerY, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(4, 4), `Customer ${customerCount + 1}`, Eisdealer.allObjects);
                Eisdealer.allObjects.push(customer);
                customerCount++;
                // Warte 3 Sekunden, bevor der nächste Kunde erstellt wird
                setTimeout(createSingleCustomer, 3000);
            }
        }
        // Starte die Erstellung des ersten Kunden sofort
        createSingleCustomer();
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
        // Zeichne den Cup, falls ScoopChosen vorhanden sind
        if (chosenScoops.length > 0) {
            let cup = new Eisdealer.Cup(800, 400);
            Eisdealer.allObjects.push(cup);
            cup.draw();
        }
        //createCustomer();
    }
    // Definition der Hindernisse
    const noGoZone1 = { x: 0, y: 0, width: 440, height: 240 };
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
    function handleClick(event) {
        let canvasRect = event.target.getBoundingClientRect();
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;
        // Setze die Zielposition für Eisdealer
        targetPosition = new Eisdealer.Vector(clickX, clickY);
        // Übergib die Zielposition an den Eisdealer
        Eisdealer.allObjects.forEach(item => {
            if (item instanceof Eisdealer.Eisdealer) {
                item.setTarget(targetPosition);
            }
        });
        // // Mülleimer
        Eisdealer.allObjects.forEach((item) => {
            if (item instanceof Eisdealer.Trash) {
                const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                if (distance <= 50) {
                    // Lösche alle ausgewählten Eiskugeln
                    chosenScoops = [];
                    Eisdealer.allObjects = Eisdealer.allObjects.filter(obj => !(obj instanceof Eisdealer.ScoopChosen));
                    console.log("Scoops gelöscht");
                    return;
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
        let iceDealerInArea = false;
        Eisdealer.allObjects.forEach(item => {
            if (item instanceof Eisdealer.Eisdealer) {
                if (item.x >= chooseScoopArea.xMin && item.x <= chooseScoopArea.xMax &&
                    item.y >= chooseScoopArea.yMin && item.y <= chooseScoopArea.yMax) {
                    iceDealerInArea = true;
                }
            }
        });
        if (iceDealerInArea) {
            if (chosenScoops.length < maxScoops) {
                for (const item of Eisdealer.allObjects) {
                    if (item instanceof Eisdealer.Scoop) {
                        const distance = Math.sqrt(Math.pow(clickX - item.x, 2) + Math.pow(clickY - item.y, 2));
                        if (distance <= scoopRadius) {
                            let chosenScoop = new Eisdealer.ScoopChosen(scoopPositions[chosenScoops.length].x, scoopPositions[chosenScoops.length].y, item.color);
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
        //console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
    Eisdealer.handleClick = handleClick;
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