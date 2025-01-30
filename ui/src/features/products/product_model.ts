import { IsNumber, IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class ProductModel extends ValidationModel {
    @IsNumber()
    costPrice: number;
    _id: string;
    @IsString()
    name: string;
    sku: number;
    images: any[];
    price: string;
    storeId: string;
    __v: number;

    static empty = () => new ProductModel()
}