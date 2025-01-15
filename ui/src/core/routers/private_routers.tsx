import {
  DocumentViewScreen,
  DocumentViewScreenPath,
} from "../../features/document_view/document_view_screen";
import {
  DocumentsScreen,
  DocumentsScreenPath,
} from "../../features/documents/documents_screen";
import {
  ProductsScreen,
  ProductsScreenPath,
} from "../../features/products/products_screen";
import {
  ShopsScreen,
  ShopsScreenPath,
} from "../../features/shops/shops_screen";
import { IRouter } from "./routers";

export const privateRouters: IRouter[] = [
  {
    path: DocumentsScreenPath,
    element: <DocumentsScreen />,
  },
  {
    path: ShopsScreenPath,
    element: <ShopsScreen />,
  },
  {
    path: DocumentViewScreenPath + "/" + ":id",
    element: <DocumentViewScreen />,
  },
  {
    path: ProductsScreenPath,
    element: <ProductsScreen />,
  },
];
