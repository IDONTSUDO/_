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
import { FormBuilder } from "../../core/ui/form_builder/form_builder";
import { FormBuilderValidationModel } from "../../core/model/form_builder_validation_model";
import { DocumentViewScreenPath } from "../document_view/document_view_screen";

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
              }}
            >
              <Icon height={40} type="sync" onClick={() => store.clickSync()} />
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
                  alignItems: "center",
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  {el.body !== undefined ? (
                    <>
                      <CoreButton
                        text="посмотреть документ"
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
                    height={30}
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
                      <>
                        <FormBuilder
                          formBuilder={
                            new FormBuilderValidationModel(
                              "",
                              store.form ?? "",
                              [],
                              ""
                            )
                          }
                          onChange={(change: FormBuilderValidationModel) =>
                            store.updateForm({ body: JSON.stringify(change) })
                          }
                        />
                      </>
                    ) : (
                      <>
                        {types.map((el) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              padding: "10px",
                              border: store.viewModel?.type?.isEqual(el.type)
                                ? "1px solid"
                                : "",
                            }}
                          >
                            <div>{el.type}</div>
                            <ButtonV2
                              text="выбрать"
                              onClick={() => store.selectTypeForm(el)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <CoreButton
                      text="создать"
                      onClick={() => store.clickOnCreate()}
                    />
                    <div style={{ width: 50 }} />
                    <CoreButton
                      text="отменить"
                      onClick={() => store.modalCancel()}
                    />
                  </div>
                </div>
              }
            />
          </>
        }
        bottom={<>132</>}
        page={MenuItems.EMPTY}
      />
    </>
  );
});
