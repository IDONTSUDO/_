import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

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
export class BaseDocument extends ValidationModel implements IBaseDocument<any> {
    body = undefined;
    date: Date = new Date();
    status: StatusDocument = StatusDocument.NEW;
    @IsString()
    type: string;
}
export class SyncProducts extends BaseDocument {
    type: string = 'Синхронизация продуктов';
}
export class SyncTransactions extends BaseDocument {
    type: string = 'Синхронизация транзакций'
}
export class NewTransactionsChain extends BaseDocument {
    type: string = 'Цепочка транзакций';
}


export const types = [new SyncProducts(), new SyncTransactions(), new NewTransactionsChain()];