import {
  AuthorizationScreen,
  AuthorizationScreenPath,
} from "../../features/authorization/authorization_screen";
import {
  TransactionsScreen,
  TransactionsScreenPath,
} from "../../features/transactions/transactions_screen";
import { IRouter } from "./routers";

export const publicRouters: IRouter[] = [
  {
    path: AuthorizationScreenPath,
    element: <AuthorizationScreen />,
  },
  {
    path: "/",
    element: <AuthorizationScreen />,
  },
  {
    path: TransactionsScreenPath,
    element: <TransactionsScreen />,
  },
];
