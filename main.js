"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    let drawable = [];
    function handleLoad(_event) {
        console.log("handleLoad");
        // Zugriff auf das Canvas-Element
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        let trash = new Eisdealer.Trash(470, 170);
        drawable.push(trash);
        let chair1 = new Eisdealer.Chair(120, 400);
        drawable.push(chair1);
        const chair2 = new Eisdealer.Chair(330, 500);
        drawable.push(chair2);
        const chair3 = new Eisdealer.Chair(530, 350);
        drawable.push(chair3);
        setInterval(animate, 20);
    }
    function animate() {
        drawBackround();
        drawable.forEach(drawable => {
            drawable.draw();
        });
        // // Trash zeichnen
        // const trash = new Trash(470, 170, 50);
        // trash.draw();
        //Sccops zeichnen
        const scoops = new Eisdealer.Scoop();
        scoops.draw();
        // //Stühle zeichnen
        // const chair1 = new Chair(120, 400);
        // chair1.draw();
        // const chair2 = new Chair(330, 500);
        // chair2.draw();
        // const chair3 = new Chair(530, 350);
        // chair3.draw();
        const eisdealer = new Eisdealer.Eisdealer(300, 400);
        eisdealer.draw();
        const customer = new Eisdealer.Customer(700, 400, "#52402a");
        customer.draw();
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
        });
    }
    function handleClick(event) {
        let canvasRect = event.target.getBoundingClientRect();
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;
        console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
    Eisdealer.handleClick = handleClick;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=main.js.map