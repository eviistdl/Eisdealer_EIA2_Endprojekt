namespace Eisdealer {
    export interface IceCream {
        flavor: string;
        price: number;
    }

    export let data: IceCream[] = [
        { flavor: "pistacchio", price: 0.5 },
        { flavor: "strawberry", price: 0.3 },
        { flavor: "lemon", price: 0.4 }
    ];
}
