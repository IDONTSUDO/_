import { observer } from "mobx-react-lite";
import { useStore } from "../../../../core/helper/use_store";
import { SyncTransactionStore } from "./sync_transactions_store";
import { IDocumentStore } from "../../../../core/model/document_store";
import { CoreButton } from "../../../../core/ui/button/button";
import { CoreText, CoreTextType } from "../../../../core/ui/text/text";
import { useEffect, useRef } from "react";

export const SyncTransactions: React.FC<IDocumentStore> = observer(
  ({ documentStore }) => {
    const ref = useRef<any>();
    const store = useStore(SyncTransactionStore);
    useEffect(() => {
      ref.current?.addEventListener("change", function () {
        store.uploadFile(ref.current!.files);
      });
    }, []);
    return (
      <>
        <CoreText
          style={{ fontSize: 38 }}
          text="загрузите exel"
          type={CoreTextType.large}
        />

        {store.isLoading ? (
          <>Загрузка...</>
        ) : (
          <>
            <div style={{ height: 100 }} />
            <label className="input-file">
              <input
                ref={ref}
                type="file"
                name="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <span className="input-file-btn">Выберите файл</span>
            </label>
            <div style={{ height: 100 }} />
            {store.file === undefined ? (
              <div style={{ justifySelf: "center" }}>Exel не загружен</div>
            ) : (
              <div style={{ justifySelf: "center" }}>
                загружен файл {store.file.name}
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <CoreButton
            text="создать"
            onClick={() => store.uploadExel(documentStore.modalCancel)}
          />
          <div style={{ width: 50 }} />
          <CoreButton text="отменить" onClick={() => store.modalCancel()} />
        </div>
      </>
    );
  }
);
