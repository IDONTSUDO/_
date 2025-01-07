import makeAutoObservable from "mobx-store-inheritance";
import { BaseDocument, BaseDocumentTypes } from "../documents/document_model";
import { FormState } from "../../core/store/base_store";
import { NavigateFunction } from "react-router-dom";
import { DocumentViewHttpRepository } from "./document_view_http_repository";

export class DocumentViewStore extends FormState<BaseDocument<BaseDocumentTypes>, any> {

    viewModel: BaseDocument<BaseDocumentTypes>;
    navigate?: NavigateFunction;
    documentViewHttpRepository: DocumentViewHttpRepository = new DocumentViewHttpRepository();
    constructor() {
        super();
        makeAutoObservable(this)

    }
    async init(navigate?: NavigateFunction | undefined): Promise<void> {
        this.navigate = navigate;
    }
    initParam(id: string) {
        this.mapOk('viewModel', this.documentViewHttpRepository.getDoc(id))
    }

}

