import makeAutoObservable from "mobx-store-inheritance";
import { BaseDocument } from "../documents/document_model";
import { FormState } from "../../core/store/base_store";
import { NavigateFunction } from "react-router-dom";
import { DocumentViewHttpRepository } from "./document_view_http_repository";
import { FormBuilderValidationModel } from "../../core/model/form_builder_validation_model";
import { IBalanceReport } from "./sub_features/balance_report_day/balance_report_model";

export class DocumentViewStore extends FormState<BaseDocument, any> {
    viewModel: BaseDocument;
    formBuilderModel?: FormBuilderValidationModel;

    documentViewHttpRepository: DocumentViewHttpRepository = new DocumentViewHttpRepository();
    constructor() {
        super();
        makeAutoObservable(this)

    }
    async init(navigate?: NavigateFunction | undefined): Promise<void> {
        this.navigate = navigate;
    }

    report?: IBalanceReport;
    async initParam(id: string) {
        await this.mapOk('viewModel', this.documentViewHttpRepository.getDoc(id))
        if (this.viewModel !== undefined) {
            this.report = this.viewModel.result;
            // const result = JSON.parse(this.viewModel.body);
            // this.formBuilderModel = new FormBuilderValidationModel(result.context, result.result, result.form, result.output,)
        }
    }

}

