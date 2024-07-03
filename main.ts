namespace Eisdealer {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("DOMContentLoaded", () => { 
    });

    function handleLoad(_event: Event): void {
        // Zugriff auf das Canvas-Element
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", handleClick);

        setInterval(animate, 20);
    }


    function animate(): void {
        drawBackround();
    }

    function drawBackround(): void {
        crc2.fillStyle = "#edbc8e";
        crc2.fillRect(0, 0, 1000, 600);
    }

    export function handleClick(event: MouseEvent): void {
        let canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect(); 
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;

        console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
}