import { observer } from "mobx-react-lite";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { useStore } from "../../core/helper/use_store";
import { match } from "ts-pattern";
import { Icon } from "../../core/ui/icon/icon";
import { ModalV2 } from "../../core/ui/modal/modal";
import { CoreButton } from "../../core/ui/button/button";
import { ButtonV2 } from "../../core/ui/button/button_v2";
import { FormBuilder } from "../../core/ui/form_builder/form_builder";
import { FormBuilderValidationModel } from "../../core/model/form_builder_validation_model";
import { DocumentViewStore } from "./document_view_store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../core/ui/loader/loader";

export const DocumentViewScreenPath = "/document/view";
export const DocumentViewScreen = observer(() => {
  const store = useStore(DocumentViewStore);
  const id = useParams().id as string;
  useEffect(() => {
    store.initParam(id);
  }, []);
  return (
    <>
      <CoreMenu
        children={
          <>
            {store.isLoading ? (
              <Loader />
            ) : (
              <FormBuilder
                //   formBuilder={FormB}
                formBuilder={
                  new FormBuilderValidationModel(
                    "",
                    (store.viewModel?.body as string) ?? "",
                    [],
                    ""
                  )
                }
                onChange={function (change: FormBuilderValidationModel): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
          </>
        }
        bottom={<>132</>}
        page={MenuItems.EMPTY}
      />
    </>
  );
});
