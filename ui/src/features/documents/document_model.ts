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
    syncQueue: number = 1;
    date: Date = new Date();
    status: StatusDocument = StatusDocument.NEW;
    body?: T | undefined;
    @IsString()
    type: string;
    constructor() {
        super()
        makeAutoObservable(this);
    }
    queue: number = 0;
    static empty = () => new BaseDocument<BaseDocumentTypes>();
}

export enum DocumentsTypes {
    syncProducts = 'Синхронизация продуктов',
    syncTransactions = 'Синхронизация транзакций',
    transactionsChain = 'Цепочка транзакций'
}

export class SyncProducts extends BaseDocument<void> {
    type: string = 'Синхронизация продуктов';
    queue = 1;
}
export class SyncTransactions extends BaseDocument<void> {
    type: string = 'Синхронизация транзакций'
    queue = 1;
}
export class NewTransactionsChain extends BaseDocument<string> {
    queue = 2;
    type: string = 'Цепочка транзакций';
    body = `{
        "transaction":\${<TransactionChain/>:OBJECT:{"productSKU":null, "productName":null },
        "productTotal": \${всего продуктов:number:0},
        "productionCostsPerBatch": \${стоимость одного продукта:number:0}
    }`;
}

export const types = [new SyncProducts(), new SyncTransactions(), new NewTransactionsChain()];