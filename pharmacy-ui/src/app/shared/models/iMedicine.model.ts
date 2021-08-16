export interface IMedicine{
    name: string;
    brand: string;
    price: number;
    quantity: number;
    expiryDate: Date;
    notes?: string;
}