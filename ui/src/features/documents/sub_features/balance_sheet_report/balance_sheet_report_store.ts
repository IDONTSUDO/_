import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../../../core/store/base_store";
import { BalanceSheetReportModel } from "./balance_sheet_report_model";
import { NavigateFunction } from "react-router-dom";

export class BalanceSheetReportStore extends FormState<BalanceSheetReportModel, any> {
    viewModel: BalanceSheetReportModel = BalanceSheetReportModel.empty();
    async init(navigate?: NavigateFunction | undefined): Promise<any> {

    }
    constructor() {
        super();
        makeAutoObservable(this);
    }
}