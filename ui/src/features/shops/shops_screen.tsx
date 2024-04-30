import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { observer } from "mobx-react-lite";

export const ShopsScreenPath = "/shops";
export const ShopsScreen = observer(() => {
  return <CoreMenu page={MenuItems.STORES} />;
});
