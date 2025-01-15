import * as React from "react";
import {
  FormViewModel,
  InputBuilderViewModel,
  InputType,
} from "./form_view_model";
import { observer } from "mobx-react-lite";
import { FormBuilderStore } from "./form_builder_store";
import { CoreSelect } from "../select/select";
import { CoreInput } from "../input/input";
import { CoreText, CoreTextType } from "../text/text";
import { getFormBuilderComponents } from "./forms/form_builder_components";

import { Icon } from "../icon/icon";
import { FormBuilderValidationModel } from "../../model/form_builder_validation_model";

export const FormBuilder = observer(
  (props: {
    formBuilder: FormBuilderValidationModel;
    onChange: (change: FormBuilderValidationModel) => void;
  }) => {
    const [store] = React.useState(() => new FormBuilderStore());

    React.useEffect(() => {
      console.log(props.formBuilder);
      store.init(props.formBuilder.context, props.formBuilder.result);
      if (props.formBuilder.form.isNotEmpty()) {
        store.formViewModel = new FormViewModel(
          props.formBuilder.form.map((el) =>
            InputBuilderViewModel.fromJSON(el)
          ),
          props.formBuilder.result,
          props.formBuilder.context
        );
        props.formBuilder.form.map((el) => InputBuilderViewModel.fromJSON(el));
      }
      store.changerForm.on((event) => {
        if (event) props.onChange(event);
      });
    }, []);

    return (
      <div>
        {store.isError ? (
          <>Error</>
        ) : (
          <div>
            {store.formViewModel?.inputs?.map((element, index) => {
              if (element.type?.isEqual(InputType.ENUM)) {
                const values = element.values as string[];
                return (
                  <CoreSelect
                    key={index}
                    items={values}
                    value={element.totalValue ?? element.defaultValue}
                    onChange={(value) =>
                      store.changeTotalValue(element.id, value)
                    }
                    label={element.name}
                    style={{ margin: 20 }}
                  />
                );
              }
              if (element.type?.isEqual(InputType.ARRAY)) {
                return (
                  <div
                    key={index}
                    style={{ border: "1px black solid", margin: 20 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: 20,
                        alignItems: "center",
                        paddingRight: 20,
                      }}
                      onClick={() => {
                        store.open(element.id);
                      }}
                    >
                      <CoreText text={element.name} type={CoreTextType.large} />
                      <Icon type="PlusCircle" style={{ width: 33 }} />
                    </div>

                    {element.isOpen ? (
                      <div style={{ margin: 20 }}>
                        {element.totalValue instanceof Array
                          ? element.totalValue?.map((subArray, index) => {
                              return (
                                <div style={{ margin: 20 }}>
                                  <div style={{ display: "flex" }}>
                                    <CoreText
                                      text={
                                        (element.subType ?? "") + ` ${index}`
                                      }
                                      type={CoreTextType.medium}
                                    />
                                    <Icon
                                      style={{ paddingLeft: 20 }}
                                      type="DeleteCircle"
                                      onClick={() =>
                                        store.deleteTotalValueSubItem(
                                          element.id,
                                          index
                                        )
                                      }
                                    />
                                  </div>

                                  {subArray.map(
                                    (
                                      subSubArrayItem: InputBuilderViewModel,
                                      subIndex: number
                                    ) => {
                                      if (
                                        subSubArrayItem.type.isEqual(
                                          InputType.ENUM
                                        )
                                      ) {
                                        return (
                                          <>
                                            <CoreSelect
                                              items={
                                                subSubArrayItem.values?.map(
                                                  (el) => String(el)
                                                ) ?? []
                                              }
                                              value={
                                                subSubArrayItem.totalValue ??
                                                subSubArrayItem.defaultValue
                                              }
                                              onChange={(value) =>
                                                console.log(subSubArrayItem.id)
                                              }
                                              label={element.name}
                                              style={{ margin: 5 }}
                                            />
                                          </>
                                        );
                                      }
                                      if (
                                        subSubArrayItem.type.isEqualMany([
                                          InputType.NUMBER,
                                          InputType.STRING,
                                        ])
                                      )
                                        return (
                                          <div>
                                            <CoreInput
                                              isFormBuilder={true}
                                              style={{ margin: 5 }}
                                              onChange={(e) =>
                                                store.changeTotalSubValue(
                                                  element.id,
                                                  subIndex,
                                                  e,
                                                  index
                                                )
                                              }
                                              validation={
                                                subSubArrayItem.type.isEqual(
                                                  InputType.NUMBER
                                                )
                                                  ? (el) => Number().isValid(el)
                                                  : undefined
                                              }
                                              error="только числа"
                                              value={
                                                subSubArrayItem.totalValue ??
                                                subSubArrayItem.defaultValue
                                              }
                                              label={subSubArrayItem.name}
                                            />
                                          </div>
                                        );

                                      return <>Error</>;
                                    }
                                  )}
                                </div>
                              );
                            })
                          : null}
                      </div>
                    ) : null}
                  </div>
                );
              }

              if (
                element.type?.isEqualMany([InputType.NUMBER, InputType.STRING])
              )
                return (
                  <div>
                    <CoreInput
                      isFormBuilder={true}
                      validation={
                        element.type.isEqual(InputType.NUMBER)
                          ? (el) => Number().isValid(el)
                          : undefined
                      }
                      onChange={(e) => {
                        store.changeTotalValue(element.id, e);
                      }}
                      value={element.totalValue ?? element.defaultValue}
                      error="только числа"
                      label={element.name}
                      style={{ margin: 20 }}
                    />
                  </div>
                );
              if (element.type?.isEqual(InputType.OBJECT))
                return (
                  <>
                    {getFormBuilderComponents(
                      element.name
                        .replace(">", "")
                        .replace("<", "")
                        .replace("/", ""),
                      element.totalValue ?? element.defaultValue,
                      (text) => store.changeTotalValue(element.id, text)
                    ).fold(
                      (s) => (
                        <>{s}</>
                      ),
                      (error) => (
                        <>{error}</>
                      )
                    )}
                  </>
                );
              return <div>Error {String(element)}</div>;
            })}
          </div>
        )}
      </div>
    );
  }
);
