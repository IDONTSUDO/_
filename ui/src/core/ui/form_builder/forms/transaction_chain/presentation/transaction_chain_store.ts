import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../../../../store/base_store";
import { TransactionChainModel } from "../model/transaction_chain_model";
import { TransactionChainRepository } from "../data/transaction_chain_repository";
import makeAutoObservable from "mobx-store-inheritance";
import { IProducts } from "../model/product_model";

export class TransactionChainStore extends FormState<TransactionChainModel, any> {
    transactionChainRepository = new TransactionChainRepository();
    viewModel: TransactionChainModel;
    products: IProducts[] = [];
    constructor() {
        super();
        makeAutoObservable(this);
    }
    async init(navigate?: NavigateFunction | undefined): Promise<any> {
        await this.mapOk('products', this.transactionChainRepository.getAllProducts())
    }
}