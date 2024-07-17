namespace Eisdealer {
    export interface IceCream {
        flavor: string;
        price: number;
        color: string;
    }

    export interface Data {
        [category: string]: IceCream[];
    }

    export let iceCreamData: IceCream[] = [
        { flavor: "pistacchio", price: 1, color:"#87b07b" },
        { flavor: "strawberry", price: 2, color:"#eb3477" },
        { flavor: "lemon", price: 3, color:"#f7dd31"}
    ];
}
