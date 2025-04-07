import { IsNumber, IsString } from "class-validator";
import { IProduct } from "./product_database_model";
import { Schema } from "mongoose";

export class ProductValidationModel implements IProduct {
  auth: string;
  @IsNumber()
  costPrice: number;
  images: string[];
  price: string;
  storeId?: Schema.Types.ObjectId;
  @IsString()
  name: string;
  @IsNumber()
  sku: number;
  imgLink: string;
}
