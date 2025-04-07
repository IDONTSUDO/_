import { Schema } from "mongoose";
import { ITransactionDataBaseModel } from "./trasaction_database_model";

export class TransactionValidationModel implements ITransactionDataBaseModel {
    auth: string;
    quality: number;
    accrualType: string;
    nameOfProductOrService: string;
    storeId: Schema.Types.ObjectId;
    operationId: string;
    amount: number;
    isApply: boolean;
    date: Date;
    skuProduct: string;
    unixDate: number;
    operationType: string;
    origin: any;
    productName: string;

}