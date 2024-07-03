"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("DOMContentLoaded", () => {
    });
    function handleLoad(_event) {
        // Zugriff auf das Canvas-Element
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eisdealer.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        setInterval(animate, 20);
    }
    function animate() {
        drawBackround();
    }
    function drawBackround() {
        Eisdealer.crc2.fillStyle = "#edbc8e";
        Eisdealer.crc2.fillRect(0, 0, 1000, 600);
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