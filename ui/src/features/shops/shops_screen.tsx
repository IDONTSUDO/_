import { MenuItems } from "../../core/ui/menu/menu";
import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { ShopsStore } from "./shops_store";
import { CrudPage } from "../../core/ui/page/crud_page";

export const ShopsScreenPath = "/shops";
export const ShopsScreen = observer(() => {
  const store = useStore(ShopsStore);
  return (
    <CrudPage
      pageName={MenuItems.STORES}
      store={store}
      missingKey={[
        "productSyncLastId",
        "__v",
        "_id",
        "lastParseTransactionPage",
        "lastMonthTransaction",
        "lastProcessedTransactionIndex",
      ]}
    />
  );
});
