import { ObjectId, Schema, model } from "mongoose";
import { schemaShop } from "../create_new_shop/shop_database_model";

export interface IProduct {
  name: string;
  sku: number;
  images: string[];
  price: string;
  storeId?: ObjectId;
}

export const ProductSchema = new Schema({
  name: {
    type: String,
  },
  sku: {
    type: Number,
  },
  images: [String],
  price: {
    type: String,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: schemaShop,
    autopopulate: false,
  },
});

export const schemaProduct = "Product";

export const ProductDBModel = model<IProduct>(schemaProduct, ProductSchema);
