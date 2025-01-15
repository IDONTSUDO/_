import { Schema, model } from "mongoose";

export interface IShop {
  _id?: string;
  shopName: string;
  clientId: string;
  apiKey: string;
  lastParseTransactionPage: number;
  lastMonthTransaction: number;
  lastProcessedTransactionIndex: number;
  productSyncLastId: string;
}
export const ShopSchema = new Schema({
  shopName: {
    type: String,
  },
  clientId: {
    type: String,
  },
  apiKey: {
    type: String,
  },
  lastParseTransactionPage: {
    type: Number,
    default: 1,
  },
  lastMonthTransaction: {
    type: Number,
    default: 0,
  },
  lastProcessedTransactionIndex: {
    type: Number,
    default: 0,
  },
  productSyncLastId: {
    type: String,
    default: ''
  },
});

export const schemaShop = "Shop";

export const ShopDBModel = model<IShop>(schemaShop, ShopSchema);
