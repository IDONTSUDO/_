import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { BaseDocument, BaseDocumentTypes } from "./document_model";
import { NavigateFunction } from "react-router-dom";
import { DocumentsHttpRepository } from "./documents_http_repository";
import { ISyncQueue } from "./sync_queue_model";

export class DocumentsStore extends CrudFormStore<BaseDocument<BaseDocumentTypes>, any, DocumentsHttpRepository> {
    repository: DocumentsHttpRepository = new DocumentsHttpRepository();
    viewModel: BaseDocument<BaseDocumentTypes> = BaseDocument.empty();
    page = 0;
    documents: BaseDocument<BaseDocumentTypes>[] = [];
    navigate?: NavigateFunction;
    syncQueue?: ISyncQueue;
    form?: string;
    constructor() {
        super();
        makeAutoObservable(this);
    }
    async init(navigate?: NavigateFunction | undefined) {
        this.navigate = navigate;
        this.getPages();
        this.mapOk("syncQueue", this.repository.lastSyncQueue());
    }
    clickOnCreate = async () => (await this.repository.addModel(this.viewModel)).map(async (_) => (await this.getPages()).map((_) => this.modalCancel()));
    getPages = () => this.mapOk('documents', this.repository.getPage(this.page));

    clickDeleteDocument = (model: BaseDocument<BaseDocumentTypes>) => (this.repository.deleteModel(model._id), this.getPages())
    clickSync = async () => this.messageHttp(this.repository.sync(), { successMessage: "синхронизация запущена", errorMessage: "ошибка синхронизации" })
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
    updateFormCallback = () => (this.viewModel = Object.assign(this.viewModel, this.syncQueue));
};