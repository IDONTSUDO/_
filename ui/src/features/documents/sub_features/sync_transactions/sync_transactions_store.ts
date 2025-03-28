import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../../../core/store/base_store";
import { SyncTransactionModel } from "./sync_transactions_model";
import { message } from "antd";
import { SyncTransactionRepository } from "./sync_transaction_repository";

export class SyncTransactionStore extends FormState<SyncTransactionModel, any> {
    repository: SyncTransactionRepository = new SyncTransactionRepository();
    async uploadExel(endCallback: Function) {
        if (this.file === undefined) {
            message.error('upload file');
            return
        }
        await this.repository.uploadExel(this.file)
        message.info('Exel upload');
        endCallback();
    }
    file?: File;
    uploadFile(files: any) {
        this.file = (files[0] as File)
    }
    viewModel: SyncTransactionModel = SyncTransactionModel.empty();
    async init(navigate?: NavigateFunction | undefined): Promise<any> {

    }

}