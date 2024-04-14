import "reflect-metadata";
import { App } from "./core/controllers/app";
import { extensions } from "./core/extensions/extensions";
import { httpRoutes } from "./core/controllers/routes";
import { SyncMarketPlacePresentation } from "./features/sync_marketplace_products/sync_marketplace_presentation";
import { CronController } from "./core/controllers/cron_controller";

const cronProcess: CronController[] = [new SyncMarketPlacePresentation()];

extensions();
new App(httpRoutes, [], cronProcess).listen();
