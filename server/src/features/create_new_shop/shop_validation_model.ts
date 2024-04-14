import { IsString } from "class-validator";
import { IShop } from "./shop_database_model";

export class ShopValidationModel implements IShop {
  lastParseTransactionPage: number;
  lastMonthTransaction: number;
  lastProcessedTransactionIndex: number;
  _id?: string;
  @IsString()
  public shopName: string;
  @IsString()
  public apiKey: string;
  @IsString()
  public clientId: string;
}
