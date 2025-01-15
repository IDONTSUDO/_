import { Schema } from "mongoose";
import { ITransactionDataBaseModel } from "./trasaction_database_model";

export class TransactionValidationModel implements ITransactionDataBaseModel {
    storeId: Schema.Types.ObjectId;
    operationId: number;
    amount: number;
    isApply: boolean;
    date: Date;
    skuProduct: number[];
    unixDate: number;
    operationType: string;
    origin: any;
    productName: string;

}