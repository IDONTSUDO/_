// @ts-nocheck
import { makeAutoObservable, observable } from "mobx";
import { Result } from "../../helper/result";
import { v4 as uuidv4 } from "uuid";
import { FormBuilderValidationModel } from "../../model/form_builder_validation_model";

export enum InputType {
  NUMBER = "number",
  STRING = "string",
  ARRAY = "Array",
  ENUM = "Enum",
  OBJECT = "OBJECT",
}

interface IOperation {
  regExp: RegExp;
  result: any;
}

export class InputBuilderViewModel {
  id: string;
  constructor(
    public name: string,
    public type: InputType,
    public defaultValue: string,
    public values: string[] | undefined | InputBuilderViewModel[] = undefined,
    public totalValue: any | undefined = undefined,
    public isOpen: boolean = false,
    public subType: string | undefined = undefined,
    id: string | undefined = undefined
  ) {
    this.id = id ?? uuidv4();
  }
  isReactComponent = () => {
    if (this.name.match(new RegExp(/<.*>/gm)) === null) {
      throw new Error("Is dont react component" + this);
    }
  };
  static fromJSON(json: any) {
    try {
      const value = JSON.parse(json);
      return new InputBuilderViewModel(
        value.name,
        value.type,
        value.defaultValue,
        value.values,
        value.totalValue,
        value.isOpen,
        value.subType,
        value.id
      );
    } catch (error) {
      console.log("InputBuilderViewModel.fromJSON():   " + json);
      throw new Error("InputBuilderViewModel.fromJSON");
    }
  }
  public toJson(): string {
    try {
      return JSON.stringify(this);
    } catch (error) {
      console.log("InputBuilderViewModel.toJson():   " + this.id);
      console.log(error);
      return "";
    }
  }
}

export const tagParse = new RegExp(/\${.*?.*}/g);
export const objectParse = new RegExp(/OBJECT:.*}/gm);
export const bracketParser = new RegExp(/<.*?>/gm);
export const enumParser = new RegExp(/ENUM.*=..*?;/gm);
export const enumBodyParse = new RegExp(/".*?;/gm);
export const enumNameParse = new RegExp(/^(.*?)=/gm);
export const typeBodyParse = new RegExp(/{.*?};/gms);
export const typeNameParse = new RegExp(/type .*?{/gms);
export const typeParse = new RegExp(/type.*?};/gms);
export const objectParseObj = new RegExp(/{.*}/gm);
export const multiTagParse = new RegExp(/\${.*?}/g);
export class FormViewModel {
  @observable
  inputs: InputBuilderViewModel[];

  constructor(inputs: InputBuilderViewModel[], public result: string, public context: string) {
    this.inputs = inputs;
    makeAutoObservable(this);
  }
  public json() {
    const result = this.toResult();
    if (result.isEmpty()) {
      console.log("result is Empty error");
      return;
    }
    try {
      return JSON.parse(
        result
          .replace(/[^\x00-\x7F]/g, "")
          .replaceAll("\n", "")
          .replaceAll("\\", "")
          // .replaceAll("/", "")
      );
    } catch (error) {
      console.log("ERROR: FormViewModel json() " + result);
    }
  }
  public fromFormBuilderValidationModel() {
    return new FormBuilderValidationModel(
      this.context,
      this.result,
      this.inputs.map((el) => el.toJson()),
      this.json() as any
    );
  }
  public toResult(): string {
    const operations: IOperation[] = [];

    this.inputs.forEach((element) => {
      let inputResult = element.totalValue ?? element.defaultValue;

      if (element.type.isEqualMany([InputType.STRING, InputType.ENUM])) {
        inputResult = `"${String(inputResult)}"`;
      }
      if (element.type.isEqual(InputType.NUMBER)) {
        inputResult = Number(inputResult);
      }
      if (element.type.isEqual(InputType.OBJECT)) {
        inputResult = element.totalValue ?? JSON.stringify(element.defaultValue);
      }
      if (element.type.isEqual(InputType.ARRAY)) {
        if (element.totalValue === undefined) {
          inputResult = "[]";
        } else {
          inputResult = [];
          if (element.totalValue instanceof Array) {
            element.totalValue.forEach((el) => {
              const objectUnion = {};
              let objectMapperResult = "";
              if (el instanceof Array) {
                el.forEach((subElement) => {
                  let subResult = subElement.totalValue ?? subElement.defaultValue;
                  if (subElement.type.isEqualMany([InputType.STRING, InputType.ENUM])) {
                    subResult = `"${String(subResult)}"`;
                  }
                  if (subElement.type.isEqual(InputType.NUMBER)) {
                    subResult = Number(subResult);
                  }

                  // @ts-ignore
                  objectUnion[subElement.name] = subResult;
                });
              }

              if (Object.keys(objectUnion).length !== 0) {
                if (element.subType) {
                  objectMapperResult = this.getTypeBody(element.subType);
                  if (objectMapperResult !== undefined) {
                    Object.entries(objectUnion).forEach(([key, value]) => {
                      objectMapperResult = objectMapperResult.replace(new RegExp("\\${" + key + ".*?}"), value as any);
                    });
                  }
                }
                if (objectMapperResult)
                  inputResult.push(
                    objectMapperResult.replaceAll("\n", "").replaceAll("\\", "").replaceAll(";", "")
                  );
              }
            });
          }
        }
      }

      if (inputResult instanceof Array)
        inputResult = JSON.stringify(inputResult.map((el) => JSON.parse(el.replace(/[^\x00-\x7F]/g, ""))));
      operations.push({ regExp: new RegExp("\\${" + element.name + ".*?}"), result: inputResult });
    });

    let result = this.result;

    operations.forEach((el) => {
      result = result.replace(el.regExp, el.result);
    });

    return result;
  }
  getTypeBody(subType: string): string {
    let result;
    this.context.match(typeParse)?.forEach((type) => {
      const matchTypeName = type.match(typeNameParse)?.at(0)?.split(" ").at(1);
      if (matchTypeName?.isEqual(subType)) {
        result = type.match(typeBodyParse)?.at(0);
      }
    });
    return result as unknown as string;
  }
  static fromString(result: string, context: string): Result<void, FormViewModel> {
    try {
      if (result.isEmpty() && context.isEmpty()) {
        return Result.error(undefined);
      }
      const enums = new Map<string, string[]>();
      const types = new Map<string, InputBuilderViewModel[]>();

      context.match(enumParser)?.forEach((el) => {
        const enumMatch = el.match(enumBodyParse)?.at(0);
        if (enumMatch !== undefined) {
          const EnumValue = enumMatch.slice(0, enumMatch.length - 2).split(",");
          const enumBody = EnumValue.map((el) => el.replaceAll('"', ""));
          const enumName = el.match(enumNameParse)?.at(0)?.split(" ").at(1);
          if (enumBody.isNotEmpty() && enumName) enums.set(enumName, enumBody);
        }
      });

      context.match(typeParse)?.forEach((type) => {
        const matchTypeName = type.match(typeNameParse)?.at(0)?.split(" ").at(1);
        const typeBody = type.match(typeBodyParse)?.at(0);

        if (typeBody && matchTypeName) types.set(matchTypeName, this.typeParse(typeBody, enums));
      });

      return Result.ok(new FormViewModel(this.typeParse(result, enums, types), result, context));
    } catch (error) {
      console.log(error);
      return Result.error(undefined);
    }
  }
  static typeParse(
    result: string,
    enums: Map<string, string[]>,
    types: Map<string, InputBuilderViewModel[]> | undefined = undefined
  ) {
    return result
      .match(tagParse)
      ?.map((el) => {
        const multiTag = el.match(multiTagParse);
        const result = [];
        if (multiTag?.length !== 0 && multiTag?.length !== 1) {
          multiTag?.forEach((element) => {
            result.push(this.tagParse(element, enums, types));
          });
        } else {
          result.push(this.tagParse(el, enums, types));
        }
        return result;
      })
      .flat()
      .filter((el) => el !== undefined) as InputBuilderViewModel[];
  }
  public static tagParse = (
    el: string,
    enums: Map<string, string[]>,
    types: Map<string, InputBuilderViewModel[]> | undefined = undefined
  ) => {
    const inputArray = el.replaceMany(["$", "{", "}"], "").split(":");
    if (el.includes(InputType.ENUM)) {
      const enumName = inputArray.at(1)?.replaceMany([InputType.ENUM, "<", ">"], "");

      if (enumName && enums.get(enumName)) {
        return new InputBuilderViewModel(inputArray[0], InputType.ENUM, inputArray[2], enums.get(enumName));
      }
    }
    if (el.includes(InputType.ARRAY) && types) {
      const name = inputArray.at(1)?.replaceMany(["Array<", ">"], "");

      if (name) {
        return new InputBuilderViewModel(
          inputArray[0],
          InputType.ARRAY,
          inputArray[2],
          types.get(name),
          undefined,
          false,
          name
        );
      }
    }
    if (el.includes(InputType.OBJECT)) {
      const objectParseResult = el.match(objectParse)?.at(0);
      const result = objectParseResult?.slice(objectParseResult?.indexOf(":") + 1, objectParseResult.length) as string;

      return new InputBuilderViewModel(inputArray[0], InputType.OBJECT, JSON.parse(result));
    }
    if (el.includes(InputType.NUMBER)) {
      return new InputBuilderViewModel(inputArray[0], InputType.NUMBER, inputArray[2]);
    }
    if (el.includes(InputType.STRING)) {
      return new InputBuilderViewModel(inputArray[0], InputType.STRING, inputArray[2]);
    }
    return el;
  };
}
