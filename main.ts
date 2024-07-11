namespace Eisdealer {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    window.addEventListener("DOMContentLoaded", () => { 
    });

    let drawable: Drawables[] = [];

    function handleLoad(_event: Event): void {
        console.log("handleLoad")
        // Zugriff auf das Canvas-Element
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", handleClick);

        let trash: Trash = new Trash(470, 170);
        drawable.push(trash);

        let chair1: Chair = new Chair(120, 400);
        drawable.push(chair1);
        const chair2: Chair = new Chair(330, 500);
        drawable.push(chair2);
        const chair3: Chair = new Chair(530, 350);
        drawable.push(chair3);

        setInterval(animate, 20);

    }

    function animate(): void {
        drawBackround();

        drawable.forEach(drawable => {
            drawable.draw();
        });

        // // Trash zeichnen
        // const trash = new Trash(470, 170, 50);
        // trash.draw();

        //Sccops zeichnen
        const scoops = new Scoop();
        scoops.draw();

        // //Stühle zeichnen
        // const chair1 = new Chair(120, 400);
        // chair1.draw();
        // const chair2 = new Chair(330, 500);
        // chair2.draw();
        // const chair3 = new Chair(530, 350);
        // chair3.draw();

        const eisdealer = new Eisdealer(300, 400);
        eisdealer.draw();

        const customer = new Customer(700, 400, "#52402a");
        customer.draw();
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
        }); 
    }
        

    export function handleClick(event: MouseEvent): void {
        let canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect(); 
        let clickX = event.clientX - canvasRect.left;
        let clickY = event.clientY - canvasRect.top;

        console.log(`Clicked at position: (${clickX}, ${clickY})`);
    }
}