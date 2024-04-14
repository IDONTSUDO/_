import { Schema } from "mongoose";
import { ITrackingChainDataBaseModel } from "./tracking_chain_database_model";
import { IsMongoId, IsNumber } from "class-validator";

export class TrackingChainValidationModel implements ITrackingChainDataBaseModel {
  @IsMongoId()
  productId: Schema.Types.ObjectId;
  @IsNumber()
  amount: number;
  @IsNumber()
  total: number;
  resultSum: number;
  soldProducts: number;
  isFinished: boolean;
  @IsMongoId()
  storeId: Schema.Types.ObjectId;
  @IsNumber()
  productSKU: number;
}
