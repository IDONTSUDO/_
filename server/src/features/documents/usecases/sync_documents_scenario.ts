import { plainToInstance } from "class-transformer";
import { CallbackStrategyWithEmpty, ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { DocumentDBModel } from "../documents_database";
import { BalanceReportUseCase, SyncDayBalance } from "./balance_report_usecase";
import { SyncProductsUseCase } from "./sync_product_usecase";
import { SyncTransactionsUseCase } from "./sync_transaction_usecase";
import { BalanceModel } from "../model/balance_model";

export enum StatusDocument {
    AWAIT = "AWAIT",
    NEW = "NEW",
    END = "END",
    ERROR = "ERROR",
}




export enum DocumentsTypes {
    syncProducts = "Синхронизация продуктов",
    syncTransactions = "Синхронизация транзакций",
    balanceReport = "Отчет по балансу",
}


export class SyncDocumentsUseCase extends CallbackStrategyWithEmpty {
    async call(): ResponseBase {
        (await DocumentDBModel.find({
            $or: [
                { status: StatusDocument.NEW },
                { status: StatusDocument.AWAIT },
            ]
        }).sort('queue')).forEach(async (element) => {

            switch (element.type) {
                case (DocumentsTypes.syncProducts):
                    (await new SyncProductsUseCase().call()).fold(async (_) => {
                        element.status = StatusDocument.END;
                        await element.save()
                    }, async (error) => {
                        element.error = error;
                        element.status = StatusDocument.ERROR;
                        await element.save()
                    });
                    return
                case (DocumentsTypes.syncTransactions):
                    (await new SyncTransactionsUseCase().call(element.result)).fold(async (_) => {
                        element.status = StatusDocument.END;
                        await element.save()
                    }, async (error) => {
                        element.error = error;
                        element.status = StatusDocument.ERROR;
                        await element.save()
                    });

                    return
                case (DocumentsTypes.balanceReport):
                    (await new SyncDayBalance().call(element.result.beginReportDate)).fold(async (el) => {
                        element.result = el;
                        element.status = StatusDocument.END;
                        await element.save()
                    }, async (_) => {
                        
                        element.error = undefined;
                        element.status = StatusDocument.ERROR;
                        await element.save()
                    })
                    return
            }
        });

        return Result.ok(200);
    }
}