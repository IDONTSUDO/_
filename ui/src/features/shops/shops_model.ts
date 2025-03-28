import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class ShopModel extends ValidationModel {
    productSyncLastId: string;
    _id: string;
    @IsString()
    shopName: string;
    @IsString()
    clientId: string;
    @IsString()
    apiKey: string;
    lastParseTransactionPage: number;
    lastMonthTransaction: number;
    lastProcessedTransactionIndex: number;
    __v: number;
    static empty = () => new ShopModel()
}