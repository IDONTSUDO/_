import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { TransactionStore } from "./transactions_store";
import { MenuItems } from "../../core/ui/menu/menu";
import { CrudPage } from "../../core/ui/page/crud_page";

export const TransactionsScreenPath = "/transactions";
export const TransactionsScreen = observer(() => {
  const store = useStore(TransactionStore);
  return (
    <CrudPage
      pageName={MenuItems.TRANSACTIONS}
      store={store}
      missingKey={[
        "productSyncLastId",
        "__v",
        "_id",
        "origin",
        "isApply",
        "images",
        "store",
      ]}
    />
  );
});
