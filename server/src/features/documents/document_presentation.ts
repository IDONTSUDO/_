import { CrudController } from "../../core/controllers/crud_controller";
import { DocumentsValidationModel } from "./documents_validation_model";
import { DocumentDBModel, IDocumentsDataBaseModel } from "./documents_database";
import { CallbackStrategyWithEmpty, CallbackStrategyWithIdQuery, ResponseBase } from "../../core/controllers/http_controller";
import { Result } from "../../core/helpers/result";
import { CoreValidation } from "../../core/validations/core_validation";
import { MongoIdValidation } from "../../core/validations/mongo_id_validation";
import { ReadByIdDataBaseModelUseCase } from "../../core/usecases/read_database_model_usecase";
import { GetTheLargestNumberFromACollectionUseCase } from "../../core/usecases/get_the_largest_number_from_a_collection_model_usecase";
import { ShopDBModel } from "../create_new_shop/shop_database_model";
import { OzonHttpApiRepository, OzonHttpMockRepository } from "../../core/repository/ozon_http_api_repository";
import { ProductDBModel } from "../products/product_database_model";
import { ObjectId } from "mongoose";
import { TransactionDBModel } from "../sync_marketplace_transactions/trasaction_database_model";
import { SyncTransactionModel } from "./model/sync_transaction_model";


export enum StatusDocument {
    AWAIT = "AWAIT",
    NEW = "NEW",
    END = "END",
    ERROR = "ERROR",
}




export enum DocumentsTypes {
    syncProducts = 'Синхронизация продуктов',
    syncTransactions = 'Синхронизация транзакций',
    transactionsChain = 'Цепочка транзакций'
}
export class SyncProductsUseCase {
    call = async (): ResponseBase => {
        const shop = await ShopDBModel.findOne();
        const ozonHttpApiRepository = new OzonHttpMockRepository(shop.clientId, shop.apiKey);
        await (await ozonHttpApiRepository.getProducts()).map(async (ozonProducts) => {
            if (shop.productSyncLastId === ozonProducts.result.last_id) {
                return Result.ok();
            } else {
                shop.productSyncLastId = ozonProducts.result.last_id;
                await shop.save();
                return (await ozonProducts.result.items.map(async (el) => {
                    return (await ozonHttpApiRepository.getProductInfo(el.product_id)).map((s) => {
                        return {
                            'name': el.offer_id,
                            'sku': el.product_id,
                            'price': s.result.price,
                            'storeId': shop._id,
                        }
                    })
                })).map(async (productsPromise) => (await productsPromise).map(async (productModel) => {
                    const model = await ProductDBModel.findOne({ name: productModel.name });
                    if (model === null) {
                        await new ProductDBModel(productModel).save()
                    } else {
                        model.save()
                    }
                }));
            }
        });

        return Result.ok();
    }
}

function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


export class SyncTransactions {
    call = async (result: SyncTransactionModel): ResponseBase => {
        const shop = await ShopDBModel.findOne();
        const ozonHttpApiRepository = new OzonHttpMockRepository(shop.clientId, shop.apiKey);
        // result.startTransactionDay.
        console.log(JSON.stringify(result));
        console.log(dateDiffInDays(new Date(result.startTransactionDay), new Date(result.endTransactionDay)));

        // (await ozonHttpApiRepository.getTransactions(String(date.getFullYear()), String(date.getMonth() + 1), shop.lastParseTransactionPage)).fold(async (ozonPayment) => {
        //     for await (const el of ozonPayment.result.operations.slice(
        //         shop.lastParseTransactionPage,
        //         ozonPayment.result.operations.length
        //     )) {
        //         if ((await TransactionDBModel.findOne({ operationId: el.operation_id })) === null) {
        //             const transaction = new TransactionDBModel();
        //             if (el.items.isNotEmpty() && el.amount) {
        //                 transaction.amount = el.amount;
        //                 transaction.operationId = el.operation_id;
        //                 transaction.skuProduct = el.items.map((el) => el.sku).unique();
        //                 transaction.storeId = shop._id as unknown as ObjectId;
        //                 transaction.operationType = el.type;
        //                 transaction.origin = el;
        //                 transaction.productName = el.items.map((el) => el.name).join("");
        //                 transaction.date = new Date();
        //                 await transaction.save();
        //             }
        //         }
        //     }
        // }, async (e) => {

        // }), (e) => console.log(e)
        return Result.ok(299)
    }
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


                    (await new SyncTransactions().call(element.result)).fold(async (_) => {
                        element.status = StatusDocument.END;
                        await element.save()
                    }, async (error) => {
                        element.error = error;
                        element.status = StatusDocument.ERROR;
                        await element.save()
                    });

                    return
                case (DocumentsTypes.transactionsChain):
                    console.log("C")
                    return
            }
        });

        return Result.ok(200);
    }
}
export class GetDocumentById extends CallbackStrategyWithIdQuery {
    idValidationExpression: CoreValidation = new MongoIdValidation();
    call = async (id: string): ResponseBase => new ReadByIdDataBaseModelUseCase(DocumentDBModel).call(id);
}

export class GetLastSyncQueue extends CallbackStrategyWithEmpty {
    call = async (): ResponseBase => (await new GetTheLargestNumberFromACollectionUseCase<IDocumentsDataBaseModel>(DocumentDBModel).call('syncQueue')).map((number) => Result.ok({ syncQueue: number }))


}
export class DocumentsPresentation extends CrudController<DocumentsValidationModel, typeof DocumentDBModel> {
    constructor() {
        super({
            validationModel: DocumentsValidationModel,
            url: 'documents',
            databaseModel: DocumentDBModel,
        });
        this.subRoutes.push({ method: "GET", subUrl: "sync", fn: new SyncDocumentsUseCase() });
        this.subRoutes.push({ method: "GET", subUrl: 'by', fn: new GetDocumentById() })
        this.subRoutes.push({ method: "GET", subUrl: "last/syncQueue", fn: new GetLastSyncQueue() })
    }

}