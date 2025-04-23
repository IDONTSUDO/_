import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../../../core/store/base_store";
import { SyncTransactionModel } from "./sync_transactions_model";
import { message } from "antd";
import { SyncTransactionRepository } from "./sync_transaction_repository";
import makeAutoObservable from "mobx-store-inheritance";

export class SyncTransactionStore extends FormState<SyncTransactionModel, any> {
    repository: SyncTransactionRepository = new SyncTransactionRepository();
    constructor() {
        super()
            ; makeAutoObservable(this);
    }
    async uploadExel(endCallback: Function) {
        if (this.file === undefined) {
            message.error('upload file');
            return
        }
        await (await this.repository.uploadExel(this.file)).fold((_) => message.info('Exel загружен'), (_) => message.error('Не предвиденная ошибка'))
        // console.log(endCallback);
        endCallback();
    }
    file?: File = undefined;
    fileName = '';
    uploadFile(files: any) {
        this.file = (files[0] as File)

    }
    viewModel: SyncTransactionModel = SyncTransactionModel.empty();
    async init(navigate?: NavigateFunction | undefined): Promise<any> {

    }

}