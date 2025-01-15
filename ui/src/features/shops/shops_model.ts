import { ValidationModel } from "../../core/model/validation_model";

export class ShopModel extends ValidationModel {
    productSyncLastId: string;
    _id: string;
    shopName: string;
    clientId: string;
    apiKey: string;
    lastParseTransactionPage: number;
    lastMonthTransaction: number;
    lastProcessedTransactionIndex: number;
    __v: number;
    static empty = () => new ShopModel()
}