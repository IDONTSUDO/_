import { MenuItems } from "../../core/ui/menu/menu";
import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { ShopsStore } from "./shops_store";
import { CrudPage } from "../../core/ui/page/crud_page";
import { CoreInput } from "../../core/ui/input/input";
import { CoreButton } from "../../core/ui/button/button";

export const ShopsScreenPath = "/shops";
export const ShopsScreen = observer(() => {
  const store = useStore(ShopsStore);

  return (
    <CrudPage
      pageName={MenuItems.STORES}
      store={store}
      // isEditable={true}
      createButton={true}
      // isNeedDelete={true}
      editableComponent={
        <>
          <CoreInput
            label={"API KEY"}
            onChange={(text) => store.updateForm({ apiKey: text })}
          />
          <CoreInput
            label={"clientId"}
            onChange={(text) => store.updateForm({ clientId: text })}
          />
          <CoreInput
            label={"shop name"}
            onChange={(text) => store.updateForm({ shopName: text })}
          />
          <div style={{ height: 20 }} />
          <CoreButton text="new" onClick={() => store.sss()} />
        </>
      }
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
