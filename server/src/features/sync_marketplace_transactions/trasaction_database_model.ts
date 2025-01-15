import { ObjectId, Schema, model } from "mongoose";
import { schemaShop } from "../create_new_shop/shop_database_model";

export interface ITransactionDataBaseModel {
  storeId: ObjectId;
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

export const TransactionSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: schemaShop,
    autopopulate: false,
  },
  operationId: {
    type: Number,
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
  skuProduct: [Number],
  isApply: {
    type: Boolean,
    default: false,
  },
  unixDate: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  origin: {
    type: Schema.Types.Mixed,
  },
  productName: {
    type: String,
  },
});

export const schemaTransaction = "Transaction";
export const TransactionDBModel = model<ITransactionDataBaseModel>(schemaTransaction, TransactionSchema);
