import { AuthPresentation } from "../../features/authorization/auth_presentation";
import { DocumentsPresentation } from "../../features/documents/document_presentation";
import { ExelUploadPresentation } from "../../features/exel_upload/exel_upload";
import { ProductPresentation } from "../../features/products/product_presentation";
import { TransactionsPresentation } from "../../features/sync_marketplace_transactions/sync_marketplace_transactions_presentation";
import { extensions } from "../extensions/extensions";
import { Routes } from "../interfaces/router";

extensions();

export const httpRoutes: Routes[] = []
  .concat(
    new DocumentsPresentation(),
    new ProductPresentation(),
    new TransactionsPresentation(),
    new AuthPresentation(),
    new ExelUploadPresentation(),
  )
  .map((el) => el.call());
