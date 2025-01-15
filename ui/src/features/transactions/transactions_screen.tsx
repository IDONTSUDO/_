import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { CoreButton } from "../../core/ui/button/button";
import { CoreText, CoreTextType } from "../../core/ui/text/text";
import { TransactionStore } from "./transactions_store";
import { CTable } from "@coreui/react";
import { Loader } from "../../core/ui/loader/loader";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { CorePagination } from "../../core/ui/pagination/core_pagination";

export const TransactionsScreenPath = "/transactions";
export const TransactionsScreen = observer(() => {
  const store = useStore(TransactionStore);
  return (
    <CoreMenu
      page={MenuItems.TRANSACTIONS}
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
            text="Транзакции"
          />
          <div style={{ height: "100%" }}>
            {store.isLoading && store.models !== undefined ? (
              <Loader />
            ) : (
              <>
                <CTable
                  columns={[
                    {
                      key: "sum",
                      label: "Сумма",
                      _props: { scope: "col" },
                    },
                    {
                      key: "NameProduct",
                      label: "Имя продукта",
                      _props: { scope: "col" },
                    },
                    {
                      key: "TypeOperation",
                      label: "Тип операции",
                      _props: { scope: "col" },
                    },
                  ]}
                  items={store.models?.map((el) => {
                    return {
                      id: 1,
                      sum: el.amount.toString() ?? "Mark",
                      NameProduct: el.productName,
                      TypeOperation: el.operationType,
                      _cellProps: { id: { scope: "row" } },
                    };
                  })}
                />
              </>
            )}
          </div>
        </div>
      }
      bottom={<CorePagination store={store} />}
    />
  );
});
