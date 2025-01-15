import { observer } from "mobx-react-lite";
import { CoreMenu, MenuItems } from "../../core/ui/menu/menu";
import { useStore } from "../../core/helper/use_store";
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
            {store.isLoading || store.formBuilderModel === undefined ? (
              <Loader />
            ) : (
              <FormBuilder
                formBuilder={store.formBuilderModel!}
                onChange={function (
                  change: FormBuilderValidationModel
                ): void {}}
              />
            )}
          </>
        }
        bottom={<>132</>}
        page={MenuItems.DOCUMENTS}
      />
    </>
  );
});
