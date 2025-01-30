import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../../../core/store/base_store";
import { SyncTransactionModel } from "./sync_transactions_model";

export class SyncTransactionStore extends FormState<SyncTransactionModel, any> {
    viewModel: SyncTransactionModel = SyncTransactionModel.empty();
    async init(navigate?: NavigateFunction | undefined): Promise<any> {

    }

}