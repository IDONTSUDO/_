import { CrudFormStore } from "../../store/base_store";
import { CoreButton } from "../button/button";
import { CoreText, CoreTextType } from "../text/text";

export const CorePagination: React.FC<{
  store: CrudFormStore<any, unknown, any>;
}> = ({ store }) => (
  <>
    <div
      style={{
        display: "flex",
        marginBottom: 20,
        alignSelf: "center",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <CoreButton
        text="назад"
        // style={{ height: 'min-con' }}
        onClick={() => store.prevPage()}
      />
      <div style={{ width: 10 }} />
      <CoreText
        type={CoreTextType.largeV2}
        text={(store.page + 1).toString()}
      />
      <div style={{ width: 10 }} />
      <CoreButton
        text="вперед"
        // style={{ height: 45 }}
        onClick={() => store.nextPage()}
      />
    </div>
  </>
);
