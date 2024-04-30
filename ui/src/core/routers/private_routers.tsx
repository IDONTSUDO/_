import { MainScreen, MainScreenPath } from "../../features/main/main_screen";
import { ShopsScreen, ShopsScreenPath } from "../../features/shops/shops_screen";
import { IRouter } from "./routers";

export const privateRouters: IRouter[] = [
  {
    path: MainScreenPath,
    element: <MainScreen />,
  },
  {
    path: ShopsScreenPath,
    element: <ShopsScreen/>,
  },
];
