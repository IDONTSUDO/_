import axios from "axios";
import { Result } from "../helpers/result";
import { HttpMethodType } from "../controllers/http_controller";

export class HttpRepository {
  serverUrl = "http://localhost:4001";

  constructor(serverURL: string) {
    this.serverUrl = serverURL;
  }

  async jsonRequest<T>(url: string, method: HttpMethodType, reqBody?: any, skilServerUrl?: boolean): Promise<Result<Error, T>> {
    try {
      const u  = skilServerUrl ? url : this.serverUrl + url;
      const result = await axios(u, { method: method, data: reqBody });

      if (result.status !== 200) {
        return Result.error(Error("status code" + String(result.status)));
      }
      return Result.ok(result.data);
    } catch (error) {
      console.log(error);
      return Result.error(error);
    }
  }
  getHttpClient() {
    return axios;
  }
}
