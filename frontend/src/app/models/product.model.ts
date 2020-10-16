export interface Product {
    productId: number;
    name: string;
    image: string | null;
    stock: number;
    price: number;
    created: Date;
}