export interface InputXL {
    name: string;
    label: string;
    append: string;
    amount: number;
}

export interface InputRange {
    name: string;
    label: string;
    amount: number;
    legend(o: object): string;
    min: number;
    max:number;
}