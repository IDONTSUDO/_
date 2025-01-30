import { IsDate } from "class-validator";
import { ValidationModel } from "../../../../core/model/validation_model";

export class SyncTransactionModel extends ValidationModel {
    @IsDate()
    startTransactionDay: Date;
    @IsDate()
    endTransactionDay: Date;
    constructor(startTransactionDay: Date, endTransactionDay: Date) {
        super();
        this.startTransactionDay = startTransactionDay;
        this.endTransactionDay = endTransactionDay;
    }
    static empty = () => new SyncTransactionModel(new Date(), new Date())
}