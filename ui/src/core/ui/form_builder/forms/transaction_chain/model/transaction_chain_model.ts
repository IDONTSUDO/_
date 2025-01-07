import { IsNumber, IsObject, IsString } from "class-validator";
import { ValidationModel } from "../../../../../model/validation_model";


 
export class TransactionChainModel extends ValidationModel   {
    @IsString()
    productName: string;
    @IsNumber()
    productSKU: number;
    // производственные затраты на партию
    @IsNumber()
    productionCostsPerBatch: number;
    // заработанное количество денег
    @IsNumber()
    productTotal: number = 0;
}