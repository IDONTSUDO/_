import { IsDate } from "class-validator";
import { ValidationModel } from "../../../../core/model/validation_model";

export class BalanceSheetReportModel extends ValidationModel {
    @IsDate()
    beginReportDate: Date;
    constructor(beginReportDate: Date) {
        super();
        this.beginReportDate = beginReportDate;
    }
    static empty = () => new BalanceSheetReportModel(new Date())
}