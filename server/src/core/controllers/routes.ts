import { CreateNewShopPresentation } from "../../features/create_new_shop/create_new_shop_presentation";
import { DocumentsPresentation } from "../../features/documents/document_presentation";
import { ProductPresentation } from "../../features/products/product_presentation";
import { TransactionsPresentation } from "../../features/sync_marketplace_transactions/sync_marketplace_transactions_presentation";
import { extensions } from "../extensions/extensions";
import { Routes } from "../interfaces/router";

extensions();

export const httpRoutes: Routes[] = []
  .concat(new CreateNewShopPresentation(), new DocumentsPresentation(), new ProductPresentation(), new TransactionsPresentation(),)
  .map((el) => el.call());
