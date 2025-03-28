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
        <CoreText text="загрузите exel" type={CoreTextType.large} />
        <form id="uploadForm" encType="multipart/form-data">
          <input ref={ref} type="file" id="fileInput" />
        </form>

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
