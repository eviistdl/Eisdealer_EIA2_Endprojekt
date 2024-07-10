"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    function handleLoad(_event) {
        console.log("handleLoad");
        // Zugriff auf das Canvas-Element
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        //setInterval(animate, 20);
        drawBackround();
        drawTrash();
        drawScoop();
        drawChair();
        drawCustomer();
        drawEisdealer();
    }
    function drawTrash() {
        const x = 470;
        const y = 170;
        const radius = 50;
        // Mülltonne
        Eisdealer.crc2.beginPath();
        Eisdealer.crc2.arc(x, y, radius, 0, Math.PI * 2);
        Eisdealer.crc2.fillStyle = '#808080';
        Eisdealer.crc2.fill();
        Eisdealer.crc2.beginPath();
        Eisdealer.crc2.arc(x, y, 40, 0, Math.PI * 2);
        Eisdealer.crc2.strokeStyle = '#363636'; // Graue Farbe
        Eisdealer.crc2.stroke();
        // Griff
        const gripWidth = 35;
        const gripHeight = 8;
        Eisdealer.crc2.fillStyle = '#363636'; // Schwarze Farbe für den Griff
        Eisdealer.crc2.fillRect(x - gripWidth / 2, y - gripHeight / 2, gripWidth, gripHeight);
        //Details
        const numLines = 8;
        for (let i = 0; i < numLines; i++) {
            const angle = (i * 2 * Math.PI) / numLines;
            const x1 = x + (radius / 2) * Math.cos(angle);
            const y1 = y + (radius / 2) * Math.sin(angle);
            const x2 = x + radius * Math.cos(angle);
            const y2 = y + radius * Math.sin(angle);
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.moveTo(x1, y1);
            Eisdealer.crc2.lineTo(x2, y2);
            Eisdealer.crc2.strokeStyle = '#363636'; // Schwarze Linien
            Eisdealer.crc2.stroke();
        }
    }
    function drawScoop() {
        const colors = ['#6f9c5a', '#FFD700', '#b03775'];
        const positions = [
            { x: 80, y: 100 },
            { x: 200, y: 100 },
            { x: 320, y: 100 }
        ];
        colors.forEach((color, index) => {
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(positions[index].x, positions[index].y, 50, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = color;
            Eisdealer.crc2.fill();
        });
    }
    function drawChair() {
        // Positionen und Größen der Stühle
        const chairs = [
            { x: 120, y: 400, width: 100, height: 100 },
            { x: 330, y: 500, width: 100, height: 100 },
            { x: 530, y: 350, width: 100, height: 100 }
        ];
        chairs.forEach(chair => {
            const chairRadius = 25;
            const chairX = chair.x + chair.width / 2;
            const chairY = chair.y + chair.height / 2;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#912b23';
            Eisdealer.crc2.fill();
        });
    }
    function drawEisdealer() {
        const x = 300;
        const y = 450;
        const radius = 40;
        const skin = "#f5cda2";
        const hairColor = "#170f05";
        const mustacheColor = "#170f05";
        // Haare 
        Eisdealer.crc2.beginPath();
        Eisdealer.crc2.arc(x, (y - 15), radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
        Eisdealer.crc2.fillStyle = hairColor;
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
        // Schnauzer 
        const mustacheLength = 40;
        const waveAmplitude = 5;
        Eisdealer.crc2.beginPath();
        Eisdealer.crc2.moveTo(x - mustacheLength / 2, y + 10);
        for (let i = -mustacheLength / 2; i <= mustacheLength / 2; i++) {
            const waveY = y + 10 - Math.abs(Math.sin((i / mustacheLength) * Math.PI * 2)) * waveAmplitude;
            Eisdealer.crc2.lineTo(x + i, waveY);
        }
        Eisdealer.crc2.lineWidth = 2;
        Eisdealer.crc2.strokeStyle = mustacheColor;
        Eisdealer.crc2.stroke();
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
        // Haare 
        const numHairCircles = 8;
        const hairCircleRadius = 15;
        const startAngle = Math.PI * 8; // Startwinkel (45 Grad)
        const endAngle = Math.PI - startAngle; // Endwinkel (135 Grad)
        const angleIncrement = (endAngle - startAngle) / (numHairCircles - 1);
        for (let i = 0; i < numHairCircles; i++) {
            const angle = startAngle + i * angleIncrement;
            const hairX = x + Math.cos(angle) * (radius + hairCircleRadius);
            const hairY = (y + 5) + Math.sin(angle) * (radius + hairCircleRadius);
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(hairX, hairY, hairCircleRadius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = hairColor;
            Eisdealer.crc2.fill();
        }
    }
    function drawCustomer() {
        const x = 700;
        const y = 450;
        const radius = 40;
        let skin = "#e8d3b7";
        let hairColor = "#52402a";
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
    function animate() {
        drawBackround();
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