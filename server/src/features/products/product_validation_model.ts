import { IsNumber, IsString } from "class-validator";
import { IProduct } from "./product_database_model";
import { Schema } from "mongoose";

export class ProductValidationModel implements IProduct {
  @IsNumber()
  costPrice: Number;
  images: string[];
  price: string;
  storeId?: Schema.Types.ObjectId;
  @IsString()
  name: string;
  @IsNumber()
  sku: number;
  imgLink: string;
}
