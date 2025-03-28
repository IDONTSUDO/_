import { observer } from "mobx-react-lite";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { useStore } from "../../core/helper/use_store";
import { DocumentViewStore } from "./document_view_store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../core/ui/loader/loader";
import { CoreTable } from "../../core/ui/table/table";
function formatDate(date?: Date): string {
  if (date === undefined) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export const DocumentViewScreenPath = "/document/view";
export const DocumentViewScreen = observer(() => {
  const store = useStore(DocumentViewStore);
  const id = useParams().id as string;
  useEffect(() => {
    store.initParam(id);
  }, []);
  console.log(store.report?.dates.at(0));
  return (
    <>
      <CoreMenu
        children={
          <>
            {store.isLoading ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <div>
                    <div>
                      начало{" "}
                      {formatDate(new Date(store.report?.dates.at(0) ?? ""))}
                    </div>

                    <div>
                      конец{" "}
                      {formatDate(new Date(store.report?.dates.at(1) ?? ""))}
                    </div>
                  </div>
                  <div>количество тразакций: {store.report?.transactions}</div>
                  <div>
                    ozon должен прислать {store.report?.report.ozonShouldSend}
                  </div>
                  <div>
                    производственные расходы{" "}
                    {store.report?.report.productionСosts}
                  </div>
                  <div>
                    расход минус доход{" "}
                    {store.report?.report.expensesMinusIncome}
                  </div>
                </div>
                <div>как считалось</div>
                <CoreTable
                  columns={Object.keys(store.report?.source?.at(0) ?? {})}
                  source={store.report?.source ?? []}
                  replacedColumns={[
                    { name: "productName", replace: "Имя продукта" },
                    { name: "netProfit", replace: "Затраты себестоймости" },
                    { name: "siteBalance", replace: "Баланс озона" },
                    { name: "quality", replace: "Количество продаж" },
                  ]}
                />
              </div>
            )}
          </>
        }
        bottom={<>132</>}
        page={MenuItems.DOCUMENTS}
      />
    </>
  );
});
