import { ObjectId, Schema, model } from "mongoose";
import { apllyAuth, AuthModel } from "../../core/models/auth_model";

export interface ITransactionDataBaseModel extends AuthModel {
  storeId: ObjectId;
  operationId: string;
  amount: number;
  isApply: boolean;
  date: Date;
  skuProduct: string;
  unixDate: number;
  operationType: string;
  origin: any;
  productName: string;
  accrualType: string;
  nameOfProductOrService: string;
  quality: number;
}

export const TransactionSchema = new Schema(apllyAuth({
  operationId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  },
  operationType: {
    type: String,
  },
  skuProduct: String,
  quality: {
    type: Number
  },
  origin: {
    type: Schema.Types.Mixed,
  },
  productName: {
    type: String,
  },
  nameOfProductOrService: {
    type: String
  },
  accrualType: {
    type: String
  },
}));

export const schemaTransaction = "Transaction";
export const TransactionDBModel = model<ITransactionDataBaseModel>(schemaTransaction, TransactionSchema);
