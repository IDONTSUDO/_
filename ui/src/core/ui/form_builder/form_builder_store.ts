import clone from "just-clone";
import { makeAutoObservable } from "mobx";
import { FormViewModel, InputBuilderViewModel } from "./form_view_model";
import { TypedEvent } from "../../helper/typed_event";
import { FormBuilderValidationModel } from "../../model/form_builder_validation_model";

export class ChangerForm extends TypedEvent<FormBuilderValidationModel | undefined> {}

export class FormBuilderStore {
  isError = false;
  formViewModel?: FormViewModel;
  changerForm: ChangerForm;
  numberValidation: RegExp = new RegExp(/^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/);
  constructor() {
    makeAutoObservable(this);
    this.changerForm = new ChangerForm();
  }

  changeTotalSubValue(id: string, subIndex: number, value: string, arrayIndex: number | undefined = undefined) {
    if (this.formViewModel?.inputs) {
      this.formViewModel.inputs = this.formViewModel?.inputs.map((el) => {
        if (!el.id.isEqual(id)) {
          return el;
        } else {
      
          if (el.totalValue instanceof Array) {
            el.totalValue.atR(arrayIndex).map((array) =>
              array.atR(subIndex).map((element: InputBuilderViewModel) => {
                
                element.totalValue = value;
              })
            );
          }
          return el;
        }
      });
       

      this.changerForm.emit(this.formViewModel?.fromFormBuilderValidationModel());
    }
  }

  changeTotalValue(id: string, value: any) {
    if (this.formViewModel?.inputs)
      this.formViewModel.inputs = this.formViewModel?.inputs.map((el) => {
        if (!el.id.isEqual(id)) {
          return el;
        }
        if (typeof value === "string") {
          el.totalValue = value;
        } else {
          el.totalValue = JSON.stringify(value);
        }
        return el;
      });
    this.changerForm.emit(this.formViewModel?.fromFormBuilderValidationModel());
  }

  deleteTotalValueSubItem(id: string, index: number): void {
    if (this.formViewModel?.inputs)
      this.formViewModel.inputs = this.formViewModel?.inputs.map((el) => {
        if (!el.id.isEqual(id)) {
          return el;
        } else {
          if (el.totalValue instanceof Array) {
            el.totalValue = el.totalValue.filter((_, i) => index !== i);
            return el;
          }
          return el;
        }
      });
    this.changerForm.emit(this.formViewModel?.fromFormBuilderValidationModel());
  }

  open = (id: string) => {
    if (this.formViewModel)
      this.formViewModel.inputs = this.formViewModel?.inputs.map((el) => {
        if (!el.id.isEqual(id)) {
          return el;
        }

        el.isOpen = true;

        if (!(el.totalValue instanceof Array)) {
          el.totalValue = [];
        }
        el.totalValue.push(clone(el.values as object));
        return el;
      });
    this.changerForm.emit(this.formViewModel?.fromFormBuilderValidationModel());
  };

  init(context: string, result: string) {
    FormViewModel.fromString(result, context).fold(
      (model) => {
        this.formViewModel = model;
      },
      () => (this.isError = true)
    );
  }
}
