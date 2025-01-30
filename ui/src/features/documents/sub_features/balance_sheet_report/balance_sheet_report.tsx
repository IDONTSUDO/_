import { observer } from "mobx-react-lite";
import { useStore } from "../../../../core/helper/use_store";
import { BalanceSheetReportStore } from "./balance_sheet_report_store";
import { DatePicker } from "antd";
import moment from "moment";
import { CoreText, CoreTextType } from "../../../../core/ui/text/text";
import { CoreButton } from "../../../../core/ui/button/button";
import { DocumentsStore } from "../../documents_store";
import { IDocumentStore } from "../../../../core/model/document_store";

export const BalanceSheetReport: React.FC<IDocumentStore> = observer(
  ({ documentStore }) => {
    const store = useStore(BalanceSheetReportStore);

    return (
      <>
        <CoreText text="Начало отчета" type={CoreTextType.header} />
        <DatePicker
          placeholder="начало отчета"
          value={moment(store.viewModel.beginReportDate)}
          onChange={(value) =>
            store.updateForm({ beginReportDate: value?.toDate() })
          }
        />
        <CoreText text="Конец отчета" type={CoreTextType.header} />
        <DatePicker
          placeholder="конец отчета"
          value={moment(store.viewModel.endReportDate)}
          onChange={(value) =>
            store.updateForm({ endReportDate: value?.toDate() })
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
