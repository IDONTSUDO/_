import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
import makeAutoObservable from "mobx-store-inheritance";
import { FormBuilder } from "../../core/ui/form_builder/form_builder";

export enum StatusDocument {
    AWAIT = "AWAIT",
    NEW = "NEW",
    END = "END",
    ERROR = "ERROR",
}

export interface IBaseDocument<T> {
    date: Date;
    status: StatusDocument;
    type: string;
    body?: T;
}

export type BaseDocumentTypes = void | String;

export class BaseDocument<T> extends ValidationModel implements IBaseDocument<T> {
    _id: string;

    date: Date = new Date();
    status: StatusDocument = StatusDocument.NEW;
    body?: T | undefined;
    @IsString()
    type: string;
    constructor() {
        super()
        makeAutoObservable(this);
    }
    static empty = () => new BaseDocument<BaseDocumentTypes>();
}
export class SyncProducts extends BaseDocument<void> {
    type: string = 'Синхронизация продуктов';
}
export class SyncTransactions extends BaseDocument<void> {
    type: string = 'Синхронизация транзакций'
}
export class NewTransactionsChain extends BaseDocument<string> {
    type: string = 'Цепочка транзакций';
    body = `{
        "transaction":\${<TransactionChain/>:OBJECT:{"productTotal": 0, "productSKU":null, "productName":null,"productionCostsPerBatch":null }
    }`;
}

export const types = [new SyncProducts(), new SyncTransactions(), new NewTransactionsChain()];