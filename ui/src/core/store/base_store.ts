import { NavigateFunction } from "react-router-dom";
import { Result } from "../helper/result";
import { UiBaseError } from "../model/ui_base_error";
import { message } from "antd";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { CrudHttpRepository, HttpError } from "../repository/http_repository";
import { ValidationModel } from "../model/validation_model";

export type CoreError = HttpError | Error;

export interface Drawer {
  name: string;
  status: boolean;
}

interface IMessage {
  successMessage?: string;
  errorMessage?: string;
}
export abstract class UiLoader {
  isLoading = false;
  async httpHelper<T>(callBack: Promise<Result<any, T>>) {
    this.isLoading = true;

    const result = await callBack;
    if (result.isFailure()) {
      this.isLoading = false;
      this.errorHandingStrategy(result.error);
      return result.forward();
    }

    this.isLoading = false;
    return result;
  }
  abstract errorHandingStrategy: (error?: any) => void;

  mapOk = async <T>(property: string, callBack: Promise<Result<CoreError, T>>) => {
    return (await this.httpHelper(callBack)).map((el) => {
      // @ts-ignore
      this[property] = el;
    });
  };
  messageHttp = async <T>(callBack: Promise<Result<CoreError, T>>, report?: IMessage) => {
    return (await this.httpHelper(callBack)).fold(
      (_s) => {
        if (report && report.successMessage) message.success(report.successMessage);
      },
      (_e) => {
        if (report && report.errorMessage) message.error(report.errorMessage);
      }
    );
  };
}
export class SimpleErrorState extends UiLoader {
  errorHandingStrategy = () => {
    this.isError = true;
  };
  isError = false;
}
export class ModalStore extends SimpleErrorState {
  isModalOpen: boolean = false;
  modalShow = () => {
    this.isModalOpen = true;
  };

  modalClickOk = () => {
    this.isModalOpen = false;
  };

  modalCancel = () => {
    this.isModalOpen = false;
  };
}
export abstract class UiErrorState<T> extends UiLoader {
  errorHandingStrategy = (error: T) => {
    console.log(error);
  };
  abstract init(navigate?: NavigateFunction): Promise<any>;
  dispose() { }
  errors: UiBaseError[] = [];
}

export abstract class DrawerState<E> extends UiErrorState<E> {
  titleDrawer: string = "";
  drawers: Drawer[];
  constructor(drawerEnum: Object) {
    super();
    this.drawers = Object.entries(drawerEnum).map((k, v) => {
      return {
        name: k.at(1) ?? "",
        status: false,
      };
    });
  }
  editDrawer(drawerName: string, status: boolean): void {
    this.titleDrawer = drawerName;
    this.drawers = this.drawers.map((el) => {
      if (el.name === drawerName) {
        el.status = status;
      }
      return el;
    });
  }
}
export abstract class UiDrawerFormState<V, E> extends DrawerState<E> {
  abstract viewModel: V;
  updateForm(value: Partial<V>) {
    //@ts-ignore
    this.viewModel = Object.assign(this.viewModel, value);
  }
  loadDependency = (viewModel: V) => {
    this.viewModel = viewModel;
  };
  loadClassInstance = (instance: ClassConstructor<V>, viewModel: V) => {
    this.viewModel = plainToInstance(instance, viewModel);
  };
}
export abstract class FormState<V, E> extends UiErrorState<E> {
  abstract viewModel: V;

  updateFormCallback = () => {
  }
  updateForm(value: Partial<V>) {
    //@ts-ignore
    this.viewModel = Object.assign(this.viewModel, value);
    this.updateFormCallback()
  }
  loadDependency = (viewModel: V | undefined) => {
    if (viewModel) this.viewModel = viewModel;
  };
  loadClassInstance = (instance: ClassConstructor<V>, viewModel: V) => {
    this.viewModel = plainToInstance(instance, viewModel);
  };
  isModalOpen: boolean = false;
  modalShow = () => {
    this.isModalOpen = true;
  };

  modalClickOk = () => {
    this.isModalOpen = false;
  };

  modalCancel = () => {
    this.isModalOpen = false;
  };
}

export abstract class CrudFormStore<V extends ValidationModel, E, R extends CrudHttpRepository<V>> extends FormState<V, E> {
  page: number = 0;
  models?: V[];
  abstract repository: R;
  create = (model: V) => this.repository.addModel(model);
  delete = (id: string) => this.repository.deleteModel(id);
  update = (model: V) => this.repository.edit(model);
  read = () => this.repository.getPage(this.page)
  nextPage = async () => {
    this.page = this.page += 1;
    await this.mapOk('models', this.read())
  }
  prevPage = async () => {
    this.page = this.page -= 1;
    await this.mapOk('models', this.read())
  }
  async initCrud() {
    await this.mapOk('models', this.read())
  }

}