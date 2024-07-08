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
        setInterval(animate, 20);
        drawBackround();
    }
    function animate() {
        drawBackround();
    }
    function drawBackround() {
        //Hintergrund
        Eisdealer.crc2.fillStyle = "#edbc8e";
        Eisdealer.crc2.fillRect(0, 0, 1000, 600);
        //Eisdiele
        Eisdealer.crc2.fillStyle = '#b3afb1';
        Eisdealer.crc2.fillRect(0, 0, 400, 200);
        //Eissorten
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
            // Stuhl zeichnen
            const chairRadius = 25;
            const chairX = table.x + table.width + chairRadius + 10; // Stuhl rechts neben dem Tisch
            const chairY = table.y + table.height / 2;
            Eisdealer.crc2.beginPath();
            Eisdealer.crc2.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            Eisdealer.crc2.fillStyle = '#912b23';
            Eisdealer.crc2.fill();
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