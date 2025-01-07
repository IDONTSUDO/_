import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormBuilderValidationModel } from "../../model/form_builder_validation_model";
import { ModalStore } from "../../store/base_store";
import { CoreButton } from "../button/button";
import { InputV2 } from "../input/input_v2";
import { FormBuilder } from "./form_builder";
import makeAutoObservable from "mobx-store-inheritance";

class FormBuilderTextStore extends ModalStore {
  viewModel = FormBuilderValidationModel.vision();
  constructor() {
    super();
    makeAutoObservable(this);
  }
  init = undefined;
}
export const FormBuildTest = observer(() => {
  const [store] = useState(new FormBuilderTextStore());

  return (
    <div>

      <InputV2 label={"result"} onChange={(text) => (store.viewModel.result = text)} />
      <InputV2 label={"context"} onChange={(text) => (store.viewModel.context = text)} />
      <CoreButton text="click" onClick={() => (store.isModalOpen = true)} />
      <Modal
        destroyOnClose={true}
        open={store.isModalOpen}
        footer={null}
        closable={false}
        closeIcon={null}
        onCancel={() => {
          store.isModalOpen = false;
        }}
      ></Modal>
      <div style={{height:50}}/>
      <FormBuilder
        formBuilder={store.viewModel}
        onChange={(e) => {
          // console.log(e.output);
          console.log(JSON.stringify(e.output))
        }}
      />
    </div>
  );
});
