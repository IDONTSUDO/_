import makeAutoObservable from "mobx-store-inheritance";
import { CrudFormStore } from "../../core/store/base_store";
import { TransactionHttpRepository } from "./transaction_repository";
import { TransactionModel } from "./transaction_model";
import { NavigateFunction } from "react-router-dom";

export class TransactionStore extends CrudFormStore<TransactionModel, any, TransactionHttpRepository> {
    repository: TransactionHttpRepository = new TransactionHttpRepository();
    viewModel: TransactionModel = TransactionModel.empty();
    async init(navigate?: NavigateFunction | undefined) {
        this.initCrud();
    }
    constructor() {
        super();
        makeAutoObservable(this);
    }
}