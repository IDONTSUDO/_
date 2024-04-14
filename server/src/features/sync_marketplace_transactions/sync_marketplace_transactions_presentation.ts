import { CronController } from "../../core/controllers/cron_controller";
import { ShopDBModel } from "../create_new_shop/shop_database_model";
import { SyncMarketPlaceTransactionsUseCase } from "./sync_marketplace_transactions_usecase";

export class SyncMarketPlaceCronPresentation extends CronController {
  name = "SyncMarketPlaceCronP";
  job = async (): Promise<void> => {
    this.call();
  };
  call = async () => {
    for (const shop of await ShopDBModel.find()) {
      new SyncMarketPlaceTransactionsUseCase(shop.clientId, shop.apiKey, shop.id).call();
    }
  };
}
