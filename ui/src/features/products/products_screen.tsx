import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CoreText, CoreTextType } from "../../core/ui/text/text";
import { CTable } from "@coreui/react";
import { Loader } from "../../core/ui/loader/loader";
import { ProductsStore } from "./product_store";
import { CorePagination } from "../../core/ui/pagination/core_pagination";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { CrudPage } from "../../core/ui/page/crud_page";
import { CoreInput } from "../../core/ui/input/input";
import { CoreButton } from "../../core/ui/button/button";
import { ProductModel } from "./product_model";

export const ProductsScreenPath = "/products";
export const ProductsScreen = observer(() => {
  const store = useStore(ProductsStore);
  return (
    <CrudPage
      pageName={MenuItems.PRODUCTS}
      store={store}
      missingKey={["storeId", "__v", "_id", "images"]}
      instanceModel={ProductModel}
      editableComponent={
        <>
          <CoreInput
            label="себе стоймость"
            value={store.viewModel?.costPrice?.toString() ?? ""}
            onChange={(text) => store.updateForm({ costPrice: Number(text) })}
          />
          <div style={{ height: 10 }} />
          <CoreButton text="сохранить" onClick={async () => store.saveModalButton()} />
        </>
      }
      isEditable={true}
    />
  );
});
