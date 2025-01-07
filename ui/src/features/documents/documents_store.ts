import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../core/store/base_store";
import { BaseDocument, BaseDocumentTypes } from "./document_model";
import { NavigateFunction } from "react-router-dom";
import { DocumentsHttpRepository } from "./documents_http_repository";

export class DocumentsStore extends FormState<BaseDocument<BaseDocumentTypes>, any> {
    documentsHttpRepository = new DocumentsHttpRepository();
    viewModel: BaseDocument<BaseDocumentTypes> = BaseDocument.empty();
    page = 0;
    documents: BaseDocument<BaseDocumentTypes>[] = [];
    navigate?: NavigateFunction;
    form?: string;
    constructor() {
        super();
        makeAutoObservable(this);
    }
    async init(navigate?: NavigateFunction | undefined) {
        this.navigate = navigate;
        this.getPages();
    }
    clickOnCreate = async () => (await this.documentsHttpRepository.addModel(this.viewModel)).map(async (_) => (await this.getPages()).map((_) => this.modalCancel()));
    getPages = () => this.mapOk('documents', this.documentsHttpRepository.getPage(this.page));
    nextPage = () => ((this.page += 1), this.getPages());
    prevPage = () => ((this.page -= 1), this.getPages());
    clickDeleteDocument = (model: BaseDocument<BaseDocumentTypes>) => (this.documentsHttpRepository.deleteModel(model._id), this.getPages())
    clickSync = async () => this.messageHttp(this.documentsHttpRepository.sync(), { successMessage: "синхронизация запущена", errorMessage: "ошибка синхронизации" })
    selectTypeForm = (el: BaseDocument<BaseDocumentTypes>): void => {
        if (el.body != undefined && (typeof el.body).isEqual('string')) {
            this.form = el.body as string;
        }
        this.updateForm({ type: el.type })
    }
    closeModalHelper = () => {
        this.viewModel = BaseDocument.empty();
        this.form = undefined
    }
};