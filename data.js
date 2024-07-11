"use strict";
var Eisdealer;
(function (Eisdealer) {
    Eisdealer.data = [
        { flavor: "Pistazie" },
        { flavor: "Erdbeere" },
        { flavor: "Zitrone" }
    ];
    class IceCreamFactory {
        static getRandomFlavors(count) {
            let dataCopy = [...Eisdealer.data];
            let result = [];
            for (let i = 0; i < count; i++) {
                let randomIndex = Math.floor(Math.random() * dataCopy.length);
                result.push(dataCopy.splice(randomIndex, 1)[0]);
            }
            return result;
        }
    }
    Eisdealer.IceCreamFactory = IceCreamFactory;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=data.js.map