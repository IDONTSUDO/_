import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { BaseDocument } from "./document_model";
import { NavigateFunction } from "react-router-dom";
import { DocumentsHttpRepository } from "./documents_http_repository";
import { ISyncQueue } from "./sync_queue_model";
import { ValidationModel } from "../../core/model/validation_model";

export class DocumentsStore extends CrudFormStore<
  BaseDocument,
  any,
  DocumentsHttpRepository
> {
  repository: DocumentsHttpRepository = new DocumentsHttpRepository();
  viewModel: BaseDocument = BaseDocument.empty();
  page = 0;
  documents: BaseDocument[] = [];
  navigate?: NavigateFunction;
  syncQueue?: ISyncQueue;
  form?: React.ReactNode;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  async init(navigate?: NavigateFunction | undefined) {
    this.navigate = navigate;
    this.getPages();
    this.mapOk("syncQueue", this.repository.lastSyncQueue());
  }
  clickOnCreate = async <T extends ValidationModel>(model: T) =>
    (await model.validMessage<T>()).map(
      async (model) => (
        this.updateForm({ result: model }),
        (await this.repository.addModel(this.viewModel)).map(async (_) =>
          (await this.getPages()).map((_) => this.modalCancel())
        )
      )
    );

  getPages = () => this.mapOk("documents", this.repository.getPage(this.page));

  clickDeleteDocument = (model: BaseDocument) => (
    this.repository.deleteModel(model._id), this.getPages()
  );
  clickSync = async () =>
    this.messageHttp(this.repository.sync(), {
      successMessage: "синхронизация запущена",
      errorMessage: "ошибка синхронизации",
    });
  selectTypeForm = (el: BaseDocument): void => {
    this.form = undefined;
    if (el.body != undefined) {
      this.form = el.body(this);
    }
    this.updateForm({ type: el.type });
    if (this.form === undefined) {
      this.repository.addModel(this.viewModel);
      this.initCrud()
    }
  };
  closeModalHelper = () => {
    this.viewModel = BaseDocument.empty();
    this.form = undefined;
    this.modalCancel();
  };
  updateFormCallback = () =>
    (this.viewModel = Object.assign(this.viewModel, this.syncQueue));
}
