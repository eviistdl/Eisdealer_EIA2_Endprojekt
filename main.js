"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    Eisdealer.allObjects = [];
    let targetPosition = new Eisdealer.Vector(0, 0);
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
        // Eisdealer erstellen und hinzufügen
        let eisdealer = new Eisdealer.Eisdealer(300, 400, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(5, 5), "Eisdealer");
        Eisdealer.allObjects.push(eisdealer);
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                let customerX = 800 + i * 50; // Versatz für unterschiedliche Startpositionen
                let customerY = 600;
                let customer = new Eisdealer.Customer(customerX, customerY, new Eisdealer.Vector(0, 0), new Eisdealer.Vector(4, 4), `Customer ${i + 1}`, Eisdealer.allObjects);
                Eisdealer.allObjects.push(customer);
            }, i * 3000);
        }
        setInterval(animate, 20);
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
            }
        });
        //Sccops zeichnen
        const scoops = new Eisdealer.Scoop();
        scoops.draw();
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
        });
    }
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
        console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
    Eisdealer.handleClick = handleClick;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=main.js.map