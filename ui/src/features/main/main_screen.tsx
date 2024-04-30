import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";

export const MainScreenPath = "/main";
export const MainScreen = () => {
  return (
    <>
      <CoreMenu page={MenuItems.EMPTY} />
    </>
  );
};
