import { observer } from "mobx-react-lite";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { useStore } from "../../core/helper/use_store";
import { DocumentsStore } from "./documents_store";
import { match } from "ts-pattern";
import { StatusDocument, types } from "./document_model";
import { Icon } from "../../core/ui/icon/icon";
import { ModalV2 } from "../../core/ui/modal/modal";
import { CoreButton } from "../../core/ui/button/button";
import { ButtonV2 } from "../../core/ui/button/button_v2";
import { DocumentViewScreenPath } from "../document_view/document_view_screen";
import { CorePagination } from "../../core/ui/pagination/core_pagination";

export const DocumentsScreenPath = "/documents";
export const DocumentsScreen = observer(() => {
  const store = useStore(DocumentsStore);
  return (
    <>
      <CoreMenu
        children={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
                border: "1px solid",
                height: 150,
              }}
            >
              <Icon
                height={100}
                type="sync"
                onClick={() => store.clickSync()}
              />
              <Icon
                height={100}
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
                  alignItems: "center",
                  height: 109,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      height: "100%",
                      fontSize: 28,
                      alignContent: "center",
                      background: match(el.status)
                        .with(StatusDocument.AWAIT, () => "red")
                        .with(StatusDocument.END, () => "chartreuse")
                        .with(StatusDocument.NEW, () => "")
                        .with(StatusDocument.ERROR, () => "")
                        .otherwise(() => undefined),
                    }}
                  >
                    {el.status}
                  </div>
                  <div
                    style={{ paddingRight: 10, paddingLeft: 10, fontSize: 38 }}
                  >
                    {el.type}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {el.result !== undefined ? (
                    <>
                      <CoreButton
                        text="посмотреть"
                        filled={true}
                        onClick={() =>
                          store.navigate?.(
                            DocumentViewScreenPath + "/" + el._id
                          )
                        }
                      />
                      <div style={{ width: 20 }} />
                    </>
                  ) : (
                    <></>
                  )}
                  <Icon
                    height={100}
                    type="delete_bucket"
                    onClick={() => store.clickDeleteDocument(el)}
                  />
                </div>
              </div>
            ))}
            <ModalV2
              isOpen={store.isModalOpen}
              onClose={() => store.closeModalHelper()}
              children={
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "200px 200px 200px;",
                    }}
                  >
                    {store.form !== undefined ? (
                      <>{store.form}</>
                    ) : (
                      <>
                        {types.map((el) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px",
                              border: store.viewModel?.type?.isEqual(el.type)
                                ? "1px solid"
                                : "",
                            }}
                          >
                            <div style={{fontSize:40}}>{el.type}</div>
                            <ButtonV2
                              text="выбрать"
                              onClick={() => store.selectTypeForm(el)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              }
            />
          </>
        }
        bottom={<CorePagination store={store} />}
        page={MenuItems.DOCUMENTS}
      />
    </>
  );
});
