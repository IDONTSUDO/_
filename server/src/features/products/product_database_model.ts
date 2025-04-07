import { ObjectId, Schema, model } from "mongoose";
import { apllyAuth, AuthModel } from "../../core/models/auth_model";

export interface IProduct extends AuthModel {
  name: string;
  sku: number;
  images: string[];
  price: string;
  costPrice: number;
  storeId?: ObjectId;
}

export const ProductSchema = new Schema(apllyAuth({
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
   
  costPrice: {
    default: 0,
    type: Number,
  }
}));

export const schemaProduct = "Product";

export const ProductDBModel = model<IProduct>(schemaProduct, ProductSchema);
