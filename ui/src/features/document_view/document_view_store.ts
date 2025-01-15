import makeAutoObservable from "mobx-store-inheritance";
import { BaseDocument, BaseDocumentTypes } from "../documents/document_model";
import { FormState } from "../../core/store/base_store";
import { NavigateFunction } from "react-router-dom";
import { DocumentViewHttpRepository } from "./document_view_http_repository";
import { FormBuilderValidationModel } from "../../core/model/form_builder_validation_model";

export class DocumentViewStore extends FormState<BaseDocument<BaseDocumentTypes>, any> {
    viewModel: BaseDocument<BaseDocumentTypes>;
    formBuilderModel?: FormBuilderValidationModel;
    navigate?: NavigateFunction;
    documentViewHttpRepository: DocumentViewHttpRepository = new DocumentViewHttpRepository();
    constructor() {
        super();
        makeAutoObservable(this)

    }
    async init(navigate?: NavigateFunction | undefined): Promise<void> {
        this.navigate = navigate;
    }
    async initParam(id: string) {
        await this.mapOk('viewModel', this.documentViewHttpRepository.getDoc(id))
        if (this.viewModel !== undefined) {
            const result = JSON.parse(this.viewModel.body as string);
            this.formBuilderModel = new FormBuilderValidationModel(result.context, result.result, result.form, result.output,)
        }
    }

}

