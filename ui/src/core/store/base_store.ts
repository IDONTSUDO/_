import { NavigateFunction } from "react-router-dom";
import { Result } from "../helper/result";
import { UiBaseError } from "../model/ui_base_error";
import { HttpError } from "../repository/http_repository";
import { message } from "antd";

export type CoreError = HttpError | Error;
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
    return (
      (await this.httpHelper(callBack))
        // eslint-disable-next-line array-callback-return
        .map((el) => {
          // @ts-ignore
          this[property] = el;
        })
    );
  };
  messageHttp = async <T>(callBack: Promise<Result<CoreError, T>>, report?: IMessage) => {
    return (await this.httpHelper(callBack)).fold(
      (s) => {
        if (report && report.successMessage) message.success(report.successMessage);
      },
      (e) => {
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

export abstract class UiErrorState<T> extends UiLoader {
  abstract errorHandingStrategy: (error: T) => void;
  abstract init(navigate?: NavigateFunction): Promise<any>;
  dispose() {}
  errors: UiBaseError[] = [];
}
