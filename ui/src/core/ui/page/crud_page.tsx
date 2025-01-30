import { CrudFormStore } from "../../store/base_store";
import { CoreMenu, MenuItems } from "../menu/menu";
import { CorePagination } from "../pagination/core_pagination";
import { CoreText, CoreTextType } from "../text/text";
import { Loader } from "../loader/loader";
import { observer } from "mobx-react-lite";
import { CoreTable } from "../table/table";
import { ModalV2 } from "../modal/modal";

export const CrudPage: React.FC<{
  store: CrudFormStore<any, any, any>;
  missingKey?: string[];
  pageName: MenuItems;
  instanceModel?: object;
  isEditable?: boolean;
  editableComponent?: React.ReactNode;
}> = observer(
  ({
    store,
    missingKey,
    pageName,
    isEditable,
    editableComponent,
    instanceModel,
  }) => {
    return (
      <div style={{ overflowY: "hidden" }}>
        <CoreMenu
          page={pageName}
          bottom={<CorePagination store={store} />}
          children={
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
                text="Продукция"
              />
              <div style={{ height: "100%" }}>
                {store.isLoading &&
                store.models !== undefined &&
                store.models.at(0) !== undefined ? (
                  <Loader />
                ) : (
                  <CoreTable
                    onClick={(index) => {
                      if (isEditable) {
                        // store.viewModel = store.models?.at(index);
                        store.loadClassInstance(
                          instanceModel as any,
                          store.models?.at(index)
                        );
                        store.modalShow();
                      }
                    }}
                    columns={Object.keys(store.models?.at(0) ?? {}).filter(
                      (el) => !missingKey?.includes(el)
                    )}
                    source={store.models ?? []}
                  />
                )}
              </div>
            </div>
          }
        />
        <ModalV2
          isOpen={store.isModalOpen}
          onClose={() => store.modalCancel()}
          children={<>{editableComponent}</>}
        />
        <CorePagination store={store} />
      </div>
    );
  }
);
