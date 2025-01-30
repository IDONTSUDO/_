import { IsDate } from "class-validator";
import { ValidationModel } from "../../../../core/model/validation_model";

export class BalanceSheetReportModel extends ValidationModel {
    @IsDate()
    beginReportDate: Date;
    @IsDate()
    endReportDate: Date;
    constructor(beginReportDate: Date, endReportDate: Date) {
        super();
        this.beginReportDate = beginReportDate;
        this.endReportDate = endReportDate;
    }
    static empty = () => new BalanceSheetReportModel(new Date(), new Date())
}