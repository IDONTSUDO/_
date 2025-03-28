import { ObjectId, Schema, model } from "mongoose";
import { schemaShop } from "../create_new_shop/shop_database_model";

export interface ITransactionDataBaseModel {
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

export const TransactionSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: schemaShop,
    autopopulate: false,
  },
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
});

export const schemaTransaction = "Transaction";
export const TransactionDBModel = model<ITransactionDataBaseModel>(schemaTransaction, TransactionSchema);
