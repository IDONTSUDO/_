import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CoreText, CoreTextType } from "../../core/ui/text/text";
import { CTable } from "@coreui/react";
import { Loader } from "../../core/ui/loader/loader";
import { ProductsStore } from "./product_store";
import { CorePagination } from "../../core/ui/pagination/core_pagination";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";

export const ProductsScreenPath = "/products";
export const ProductsScreen = observer(() => {
  const store = useStore(ProductsStore);
  return (
    <CoreMenu
      page={MenuItems.STORES}
      bottom={<CorePagination store={store} />}
      children={
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CoreText
            style={{ alignSelf: "center" }}
            type={CoreTextType.largeV2}
            text="Продукция"
          />
          <div style={{ height: "100%" }}>
            {store.isLoading && store.models !== undefined ? (
              <Loader />
            ) : (
              <>
                <CTable
                  columns={[
                    {
                      key: "name",
                      label: "Название",
                      _props: { scope: "col" },
                    },
                  ]}
                  items={store.models?.map((el) => {
                    console.log(200);
                    return {
                      name: el.name,
                    };
                  })}
                />
              </>
            )}
          </div>
        </div>
      }
    />
  );
});
