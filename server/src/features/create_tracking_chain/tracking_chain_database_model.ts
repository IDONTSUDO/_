import { ObjectId, Schema, model } from "mongoose";
import { schemaShop } from "../create_new_shop/shop_database_model";
import { schemaProduct } from "../products/product_database_model";

export interface ITrackingChainDataBaseModel {
  //количество SKU товаров
  amount: number;
  // общие затраты на все товары
  total: number;
  // итоговое количество заработаных денег с товара
  resultSum: number;
  // количество реализованных продуктов
  soldProducts: number;
  isFinished: boolean;
  storeId: ObjectId;
  productId: ObjectId;
  productSKU: number;
}

export const TrackingChainSchema = new Schema({
  amount: {
    type: Number,
  },
  total: {
    type: Number,
  },
  resultSum: {
    type: Number,
    default: 0,
  },
  soldProducts: {
    type: Number,
    default: 0,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: schemaShop,
    autopopulate: false,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: schemaProduct,
    autopopulate: true,
  },
  productSKU: {
    type: Number,
    require: true,
  },
});

export const schemaTrackingChain = "TrackingChain";

export const TrackingChainDBModel = model<ITrackingChainDataBaseModel>(schemaTrackingChain, TrackingChainSchema);
