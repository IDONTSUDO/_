import { ObjectId } from "mongoose";
import { ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { OzonHttpApiRepository, OzonHttpApiImpl } from "../../../core/repository/ozon_http_api_repository";
import { ShopDBModel } from "../../create_new_shop/shop_database_model";
import { TransactionDBModel } from "../../sync_marketplace_transactions/trasaction_database_model";
import { SyncTransactionModel } from "../model/sync_transaction_model";
function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    const result = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    if(result === 0){
        return 1
    }
    return result;
}
export class SyncTransactionsUseCase {
    call = async (result: SyncTransactionModel): ResponseBase => {
        let isError = false;
        const shop = await ShopDBModel.findOne();
        const ozonHttpApiRepository = new OzonHttpApiRepository(shop.clientId, shop.apiKey);
        let startDate: Date;
        let endDate: Date;
        if (new Date(result.startTransactionDay).getTime() > new Date(result.endTransactionDay).getTime()) {
            startDate = new Date(result.endTransactionDay);
            endDate = new Date(result.startTransactionDay);
        } else {
            startDate = new Date(result.startTransactionDay);
            endDate = new Date(result.endTransactionDay);
        }
        const diff = dateDiffInDays(startDate, endDate) ;
        // console.log(diff);
        for (const el of Array.from(({ length: diff }), (_, i) => i).map((el) => {
            console.log(200);
            const nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + el);
            return nextDate;
        })) {
            (await this.syncDate(ozonHttpApiRepository, el, shop)).fold((_) => { }, (error) => (isError = true));
        }
        if (isError) {
            return Result.error(undefined);
        }
        return Result.ok(undefined);
    }

    async syncDate(ozonHttpApiRepository: OzonHttpApiImpl, date: Date, shop: any): ResponseBase {
        let isError = false;
        (await ozonHttpApiRepository.getTransactions(date, shop.lastParseTransactionPage)).fold(async (ozonPayment) => {
            for await (const el of ozonPayment.result.operations.slice(
                shop.lastParseTransactionPage,
                ozonPayment.result.operations.length
            )) {
                console.log(200);
                if ((await TransactionDBModel.findOne({ operationId: el.operation_id })) === null) {
                    const transaction = new TransactionDBModel();
                    if (el.items.isNotEmpty() && el.amount) {
                        transaction.amount = el.amount;
                        // transaction.operationId = el.operation_id;
                        transaction.storeId = shop._id as unknown as ObjectId;
                        transaction.operationType = el.type;
                        transaction.origin = el;
                        transaction.productName = el.items.map((el) => el.name).join("");
                        transaction.unixDate = new Date(el.operation_date).getTime() / 1000;
                        transaction.date = new Date(el.operation_date);
                        await transaction.save();
                    }
                }
            }
        }, async (_) => {
            isError = true;
        }), (_) => {
            isError = true
        }
        if (isError) {
            return Result.error(undefined)
        }
        return Result.ok(undefined)
    }
}
