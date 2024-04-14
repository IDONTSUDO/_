import { ObjectId } from "mongoose";
import { OzonHttpApiRepository } from "../../core/repository/ozon_http_api_repository";
import { ShopDBModel } from "../create_new_shop/shop_database_model";
import { TransactionDBModel } from "./trasaction_database_model";

export class SyncMarketPlaceTransactionsUseCase {
  ozonHttpRepository?: OzonHttpApiRepository;
  storeId: string;
  constructor(clientId: string, apiKey: string, storeDataBaseId: string) {
    this.ozonHttpRepository = new OzonHttpApiRepository(clientId, apiKey);
    this.storeId = storeDataBaseId;
  }
  call = async () => {
    const date = new Date();

    const shop = await ShopDBModel.findById(this.storeId);
    if (shop === null) {
      return "shop is null";
    }
    if (shop.lastMonthTransaction !== date.getMonth()) {
      shop.lastMonthTransaction = date.getMonth();
      shop.lastParseTransactionPage = 1;
      shop.lastProcessedTransactionIndex = 0;
      await shop.save();
    }

    (
      await this.ozonHttpRepository.getTransactions(
        String(date.getFullYear()),
        String(date.getMonth() + 1),
        shop.lastParseTransactionPage
      )
    ).fold(
      async (transactions) => {
        console.log(transactions.result.operations.length);
        if (transactions.result.row_count === 1000) {
          shop.lastParseTransactionPage += 1;
          await shop.save();
        }
        for await (const el of transactions.result.operations.slice(
          shop.lastParseTransactionPage,
          transactions.result.operations.length
        )) {
          if ((await TransactionDBModel.findOne({ operationId: el.operation_id })) === null) {
            const transaction = new TransactionDBModel();
            if (el.items.isNotEmpty() && el.amount) {
              transaction.amount = el.amount;
              transaction.operationId = el.operation_id;
              transaction.skuProduct = el.items.map((el) => el.sku).unique();
              transaction.storeId = this.storeId as unknown as ObjectId;
              transaction.operationType = el.type;
              transaction.origin = el;
              transaction.productName = el.items.map((el) => el.name).join("");
              await transaction.save();
            }
          }
        }

        shop.lastProcessedTransactionIndex = transactions.result.row_count;
        await shop.save();
      },
      async (error) => console.log(error)
    );
  };
}
