import { ValidationModel } from "../../core/model/validation_model";

export class ProductModel extends ValidationModel {
    _id: string;
    name: string;
    sku: number;
    images: any[];
    price: string;
    storeId: string;
    __v: number;

    static empty = () => new ProductModel()
}