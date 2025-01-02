import { observer } from "mobx-react-lite";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { useStore } from "../../core/helper/use_store";
import { MainStore } from "./main_store";
import { match } from "ts-pattern";
import { StatusDocument, types } from "./document_model";
import { Icon } from "../../core/ui/icon/icon";
import { ModalV2 } from "../../core/ui/modal/modal";
import { CoreButton } from "../../core/ui/button/button";

export const MainScreenPath = "/main";
export const MainScreen = observer(() => {
  const store = useStore(MainStore);
  return (
    <>
      <CoreMenu page={MenuItems.EMPTY} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          border: "1px solid",
        }}
      >
        <Icon height={40} type="sync" />
        <Icon
          height={40}
          type="plus-circle"
          onClick={() => store.modalShow()}
        />
      </div>
      {store.documents.isEmpty() ? (
        <div style={{ justifySelf: "center", padding: 10 }}>
          Нету документов
        </div>
      ) : (
        <></>
      )}
      {store.documents.map((el) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid",
          }}
        >
          <div
            style={{
              padding: 10,
              background: match(el.status)
                .with(StatusDocument.AWAIT, () => "red")
                .with(StatusDocument.END, () => "")
                .with(StatusDocument.NEW, () => "")
                .with(StatusDocument.ERROR, () => "")
                .otherwise(() => undefined),
            }}
          >
            {el.status}
          </div>
          <div style={{ paddingRight: 10 }}>{el.type}</div>
        </div>
      ))}
      <ModalV2
        isOpen={store.isModalOpen}
        onClose={() => {}}
        children={
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "200px 200px 200px;",
              }}
            >
              {types.map((el) => (
                <div>{el.type}</div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CoreButton
                text="создать"
                onClick={() => store.clickOnCreate()}
              />
              <div style={{ width: 50 }} />
              <CoreButton text="отменить" onClick={() => store.modalCancel()} />
            </div>
          </div>
        }
      />
    </>
  );
});
