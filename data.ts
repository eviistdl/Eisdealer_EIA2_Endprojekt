namespace Eisdealer {
    export interface IceCream {
        flavor: string;
    }

    export let data: IceCream[] = [
        { flavor: "Pistazie" },
        { flavor: "Erdbeere" },
        { flavor: "Zitrone" }
    ];

    export class IceCreamFactory {
        static getRandomFlavors(count: number): IceCream[] {
            let dataCopy = [...data];
            let result: IceCream[] = [];
            for (let i = 0; i < count; i++) {
                let randomIndex = Math.floor(Math.random() * dataCopy.length);
                result.push(dataCopy.splice(randomIndex, 1)[0]);
            }
            return result;
        }
    }
}
