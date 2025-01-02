import { CreateNewShopPresentation } from "../../features/create_new_shop/create_new_shop_presentation";
import { CreateTrackingChainPresentation } from "../../features/create_tracking_chain/create_tracking_chain_presentation";
import { DocumentsPresentation } from "../../features/documents/document_presentation";
import { extensions } from "../extensions/extensions";
import { Routes } from "../interfaces/router";

extensions();

export const httpRoutes: Routes[] = []
  .concat(new CreateNewShopPresentation(), new CreateTrackingChainPresentation(), new DocumentsPresentation())
  .map((el) => el.call());
