export interface InputXL {
    name: string;
    label: string;
    append: string;
    montant: number;
}

export interface InputRange {
    name: string;
    label: string;
    montant: number;
    legend(o: object): string;
    min: number;
    max:number;
}