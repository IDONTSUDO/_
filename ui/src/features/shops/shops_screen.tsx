import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { observer } from "mobx-react-lite";
import { CorePagination } from "../../core/ui/pagination/core_pagination";
import { useStore } from "../../core/helper/use_store";
import { ShopsStore } from "./shops_store";
import { CTable } from "@coreui/react";
import { CoreText, CoreTextType } from "../../core/ui/text/text";
import { Loader } from "../../core/ui/loader/loader";
import { Icon } from "../../core/ui/icon/icon";
import { FormBuilderValidationModel } from "../../core/model/form_builder_validation_model";
import { CoreButton } from "../../core/ui/button/button";
import { ButtonV2 } from "../../core/ui/button/button_v2";
import { FormBuilder } from "../../core/ui/form_builder/form_builder";
import { ModalV2 } from "../../core/ui/modal/modal";
import { types } from "../documents/document_model";

export const ShopsScreenPath = "/shops";
export const ShopsScreen = observer(() => {
  const store = useStore(ShopsStore);
  return (
    <CoreMenu
      page={MenuItems.STORES}
      bottom={<CorePagination store={store} />}
      children={
        <>
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
              text="Магазин"
            />
            <div style={{ height: "100%" }}>
              {store.isLoading && store.models !== undefined ? (
                <Loader />
              ) : (
                <>
                  <Icon
                    type="plus-circle"
                    height={40}
                    onClick={() => store.modalShow()}
                  />
                  <CTable
                    columns={[
                      {
                        key: "name",
                        label: "Название",
                        _props: { scope: "col" },
                      },
                    ]}
                    items={store.models?.map((el) => {
                      return {
                        name: el.shopName,
                      };
                    })}
                  />
                </>
              )}
            </div>
          </div>
          <ModalV2
            isOpen={store.isModalOpen}
            onClose={() => store.closeModalHelper()}
            children={
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <CoreButton
                    text="создать"
                    onClick={() => store.create(store.viewModel)}
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
    />
  );
});
