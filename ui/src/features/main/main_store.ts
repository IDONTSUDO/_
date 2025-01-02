import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../core/store/base_store";
import { BaseDocument } from "./document_model";
import { NavigateFunction } from "react-router-dom";
import { MainHttpRepository } from "./main_http_repository";

export class MainStore extends FormState<BaseDocument, any> {
    mainHttpRepository = new MainHttpRepository();
    viewModel: BaseDocument;
    page = 0;
    documents: BaseDocument[] = [];
    navigate?: NavigateFunction;
    constructor() {
        super();
        makeAutoObservable(this);
    }
    async init(navigate?: NavigateFunction | undefined) {
        this.navigate = navigate;
        this.mapOk('documents', this.mainHttpRepository.getPage(this.page))
    }
    clickOnCreate = async () => this.mainHttpRepository.newModel(this.viewModel);
    nextPage = () => ((this.page += 1), this.mapOk('documents', this.mainHttpRepository.getPage(this.page)))

}