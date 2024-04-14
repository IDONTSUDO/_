import { IsNumber, IsString } from "class-validator";
import { IProduct } from "./product_database_model";
import { Schema } from "mongoose";

export class ProductValidationModel implements IProduct {
  images: string[];
  price: string;
  storeId?: Schema.Types.ObjectId;
  @IsString()
  name: string;
  @IsNumber()
  sku: number;
  @IsString()
  imgLink: string;
}
