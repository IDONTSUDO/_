import { Result } from "../helper/result";
import { ValidationModel } from "../model/validation_model";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}
export class HttpError extends Error {
  status: number;
  error: any;
  constructor(error: any, status: number) {
    super(error);
    this.error = error;
    this.status = status;
  }
}

export class HttpRepository {
  private server = "http://localhost:4001";
  public async _formDataRequest<T>(method: HttpMethod, url: string, data?: any): Promise<Result<HttpError, T>> {
    let formData = new FormData();
    formData.append("file", data);

    const reqInit = {
      body: formData,
      method: method,
    };

    const response = await fetch(this.server + url, reqInit);
    if (response.status !== 200) {
      throw Result.error(new Error(await response.json()));
    }
    return Result.ok(response.text as T);
  }
  public async _jsonRequest<T>(method: HttpMethod, url: string, data?: any): Promise<Result<HttpError, T>> {
    try {
      const reqInit = {
        body: data,
        method: method,
        headers: { "Content-Type": "application/json" },
      };
      if (data !== undefined) {
        reqInit["body"] = JSON.stringify(data);
      }
      const response = await fetch(this.server + url, reqInit);

      if (response.status !== 200) {
        return Result.error(new HttpError(this.server + url, response.status));
      }

      return Result.ok(await response.json());
    } catch (error) {
      return Result.error(new HttpError(error, 0));
    }
  }

  public async _request<T>(method: HttpMethod, url: string, data?: any): Promise<Result<HttpError, T>> {
    const reqInit = {
      body: data,
      method: method,
    };

    if (data !== undefined) {
      reqInit["body"] = data;
    }
    const response = await fetch(this.server + url, reqInit);
    if (response.status !== 200) {
      throw Result.error(new Error(await response.json()));
    }
    return Result.ok(response.text as T);
  }

}
export abstract class CoreHttpRepository extends HttpRepository {
  abstract featurePath: string;
}
export abstract class CrudHttpRepository<M extends ValidationModel> extends CoreHttpRepository {
  getPage = (page = 0) => this._jsonRequest<M[]>(HttpMethod.GET, this.featurePath);
  edit = async (model: M) => (await model.validMessage<M>()).map((validationModel) => this._jsonRequest(HttpMethod.PUT, this.featurePath, validationModel));
  newModel = async (model: M) => (await model.validMessage<M>()).map((validationModel) => this._jsonRequest(HttpMethod.POST, this.featurePath, validationModel));

}