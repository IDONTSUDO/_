import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
import makeAutoObservable from "mobx-store-inheritance";
import { BalanceSheetReport } from "./sub_features/balance_sheet_report/balance_sheet_report";
import { DocumentsStore } from "./documents_store";
import { SyncTransactions } from "./sub_features/sync_transactions/sync_transactions";

export enum StatusDocument {
  AWAIT = "AWAIT",
  NEW = "NEW",
  END = "END",
  ERROR = "ERROR",
}

export type BaseDocumentTypes = void | String;

export class BaseDocument extends ValidationModel {
  _id: string;
  syncQueue: number = 1;
  date: Date = new Date();
  status: StatusDocument = StatusDocument.NEW;
  body?: (store: DocumentsStore) => React.ReactNode | undefined;
  @IsString()
  type: string;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  queue: number = 0;
  result: any;
  static empty = () => new BaseDocument();
}

export enum DocumentsTypes {
  syncProducts = "Синхронизация продуктов",
  syncTransactions = "Синхронизация транзакций",
  transactionsChain = "Цепочка транзакций",
}

export class SyncProducts extends BaseDocument {
  type: string = "Синхронизация продуктов";
  queue = 1;
}
export class SyncTransactionsDocument extends BaseDocument {
  type: string = "Синхронизация транзакций";
  queue = 1;
  body = (documentStore: DocumentsStore) => (
    <SyncTransactions documentStore={documentStore} />
  );
}
export class BalanceReport extends BaseDocument {
  queue = 2;
  type: string = "Отчет по балансу";
  body = (documentStore: DocumentsStore) => (
    <BalanceSheetReport documentStore={documentStore} />
  );
}

export const types = [
  new SyncProducts(),
  new SyncTransactionsDocument(),
  new BalanceReport(),
];
