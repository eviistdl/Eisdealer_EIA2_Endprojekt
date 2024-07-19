"use strict";
var Eisdealer;
(function (Eisdealer_1) {
    class Eisdealer extends Eisdealer_1.Moveables {
        radius;
        skin;
        hairColor;
        mustacheColor;
        target;
        constructor(_x, _y, _direction, _speed, _type) {
            super(_x, _y, _direction, _speed, _type);
            this.radius = 40;
            this.skin = "#f5cda2";
            this.hairColor = "#170f05";
            this.mustacheColor = "#170f05";
            this.target = null;
        }
        setTarget(target) {
            this.target = target;
        }
        move() {
            if (this.target) {
                const dx = this.target.x - this.x;
                const dy = this.target.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const moveDistance = Math.min(this.speed.x, distance);
                const nextX = this.x + (dx / distance) * moveDistance;
                const nextY = this.y + (dy / distance) * moveDistance;
                if (!Eisdealer_1.collisionNoGoZone(nextX, nextY)) {
                    this.x = nextX;
                    this.y = nextY;
                }
                else {
                    this.target = null; // Ziel aufgeben, wenn eine Kollision festgestellt wird
                }
                if (distance < this.speed.x) {
                    this.target = null;
                }
            }
        }
        draw() {
            //console.log("eisdealer draw")
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const skin = this.skin;
            const hairColor = this.hairColor;
            const mustacheColor = this.mustacheColor;
            // Haare 
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.arc(x, (y - 15), radius + 10, 0, Math.PI * 2); // Etwas größerer Kreis
            Eisdealer_1.crc2.fillStyle = hairColor;
            Eisdealer_1.crc2.fill();
            // Ohren zeichnen
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.arc(x - radius, y, 10, 0, Math.PI);
            Eisdealer_1.crc2.arc(x + radius, y, 10, 0, Math.PI);
            Eisdealer_1.crc2.fillStyle = skin;
            Eisdealer_1.crc2.strokeStyle = "#52402a";
            Eisdealer_1.crc2.fill();
            Eisdealer_1.crc2.stroke();
            // Kopf 
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.arc(x, y, radius, 0, Math.PI * 2);
            Eisdealer_1.crc2.fillStyle = skin;
            Eisdealer_1.crc2.strokeStyle = "#52402a";
            Eisdealer_1.crc2.fill();
            Eisdealer_1.crc2.stroke();
            // Schnauzer 
            const mustacheLength = 40;
            const waveAmplitude = 5;
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.moveTo(x - mustacheLength / 2, y + 10);
            for (let i = -mustacheLength / 2; i <= mustacheLength / 2; i++) {
                const waveY = y + 10 - Math.abs(Math.sin((i / mustacheLength) * Math.PI * 2)) * waveAmplitude;
                Eisdealer_1.crc2.lineTo(x + i, waveY);
            }
            Eisdealer_1.crc2.lineWidth = 2;
            Eisdealer_1.crc2.strokeStyle = mustacheColor;
            Eisdealer_1.crc2.stroke();
            // Augen zeichnen
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer_1.crc2.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
            Eisdealer_1.crc2.fillStyle = '#000000';
            Eisdealer_1.crc2.fill();
            // Mund zeichnen
            Eisdealer_1.crc2.beginPath();
            Eisdealer_1.crc2.arc(x, y + 10, 15, 0, Math.PI, false);
            Eisdealer_1.crc2.strokeStyle = '#000000';
            Eisdealer_1.crc2.stroke();
            // Haare 
            const numHairCircles = 10;
            const hairCircleRadius = 15;
            const startAngle = Math.PI * 10; // Startwinkel (45 Grad)
            const endAngle = Math.PI - startAngle; // Endwinkel (135 Grad)
            const angleIncrement = (endAngle - startAngle) / (numHairCircles - 1);
            for (let i = 0; i < numHairCircles; i++) {
                const angle = startAngle + i * angleIncrement;
                const hairX = x + Math.cos(angle) * (radius + hairCircleRadius);
                const hairY = (y + 5) + Math.sin(angle) * (radius + hairCircleRadius);
                Eisdealer_1.crc2.beginPath();
                Eisdealer_1.crc2.arc(hairX, hairY, hairCircleRadius, 0, Math.PI * 2);
                Eisdealer_1.crc2.fillStyle = hairColor;
                Eisdealer_1.crc2.fill();
            }
        }
    }
    Eisdealer_1.Eisdealer = Eisdealer;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Eisdealer.js.map