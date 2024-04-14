import { CronController } from "../../core/controllers/cron_controller";
import { ShopDBModel } from "../create_new_shop/shop_database_model";
import { SyncMarketPlaceProductsUsecase } from "./sync_market_products_usecase";

export class SyncMarketPlacePresentation extends CronController {
  name = "syncMarketProducts";

  job = async (): Promise<void> => {
    (await ShopDBModel.find()).forEach(async (shop) => {
      await new SyncMarketPlaceProductsUsecase(shop.apiKey, shop.clientId, shop.shopName).call();
    });
  };
}
