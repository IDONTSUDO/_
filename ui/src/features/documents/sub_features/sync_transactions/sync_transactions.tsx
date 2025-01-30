import { observer } from "mobx-react-lite";
import { useStore } from "../../../../core/helper/use_store";
import { SyncTransactionStore } from "./sync_transactions_store";
import { IDocumentStore } from "../../../../core/model/document_store";
import { DatePicker } from "antd";
import moment from "moment";
import { CoreButton } from "../../../../core/ui/button/button";
import { CoreText, CoreTextType } from "../../../../core/ui/text/text";

export const SyncTransactions: React.FC<IDocumentStore> = observer(
  ({ documentStore }) => {
    const store = useStore(SyncTransactionStore);
    return (
      <>
        <CoreText text="Начало синхронизации" type={CoreTextType.header} />
        <DatePicker
          placeholder="начало отчета"
          value={moment(store.viewModel.startTransactionDay)}
          onChange={(value) =>
            store.updateForm({ startTransactionDay: value?.toDate() })
          }
        />
        <CoreText text="Конец синхронизации" type={CoreTextType.header} />
        <DatePicker
          placeholder="конец синхронизации"
          value={moment(store.viewModel.endTransactionDay)}
          onChange={(value) =>
            store.updateForm({ endTransactionDay: value?.toDate() })
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <CoreButton
            text="создать"
            onClick={() => documentStore.clickOnCreate(store.viewModel)}
          />
          <div style={{ width: 50 }} />
          <CoreButton text="отменить" onClick={() => store.modalCancel()} />
        </div>
      </>
    );
  }
);
