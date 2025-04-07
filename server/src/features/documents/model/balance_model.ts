import { IsDate } from "class-validator";
import { ValidationModel } from "./validation_model";


export class Balance {
    item: string = '';
    transactions: number = 0;
    commonBalance: number = 0;
    productCounter = 0;
    constructor(commonBalance: number, item: string) {
        this.transactions = 1;
        this.commonBalance = commonBalance;
        this.item = item;
    }
    update(amount: number) {
        this.transactions += 1
        this.commonBalance += amount;

        this.productCounter += 1;
    }
}

export class BalanceModel extends ValidationModel {
    @IsDate()
    beginReportDate: Date;
    @IsDate()
    endReportDate: Date;
    balance: { [name: string]: Balance } = {};
    transactions?: number;
    balanceResult: number = 0;
    constructor(beginReportDate: Date, endReportDate: Date) {
        super()
        this.beginReportDate = beginReportDate;
        this.endReportDate = endReportDate;
    }
   
}