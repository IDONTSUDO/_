import { validationModelMiddleware } from "../middlewares/validation_model";
import { Result } from "../helpers/result";
import { Router, Request, Response } from "express";
import { IRouteModel, Routes } from "../interfaces/router";
import { CoreValidation } from "../validations/core_validation";

export type HttpMethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "PATCH" | "HEAD";

export type ResponseBase = Promise<Result<any, any>>;
export abstract class CallbackStrategyWithEmpty {
  abstract call(): ResponseBase;
}
export abstract class CallbackStrategyWithValidationModel<V> {
  abstract validationModel: V;
  abstract call(model: V): ResponseBase;
}
export abstract class CallbackStrategyWithIdQuery {
  abstract idValidationExpression: CoreValidation;
  abstract call(id: string): ResponseBase;
}
export abstract class CallBackStrategyWithQueryPage {
  abstract validationPageExpression: RegExp | null;
  abstract call(page: string): ResponseBase;
}

export abstract class CallbackStrategyWithFileUpload {
  abstract checkingFileExpression: RegExp;
  abstract idValidationExpression: CoreValidation;
  abstract call(file: File, id: string, description: string): ResponseBase;
}

interface ISubSetFeatureRouter<T> {
  method: HttpMethodType;
  subUrl: string;
  fn:
  | CallbackStrategyWithValidationModel<T>
  | CallbackStrategyWithEmpty
  | CallbackStrategyWithIdQuery
  | CallBackStrategyWithQueryPage
  | CallbackStrategyWithFileUpload;
}

abstract class ICoreHttpController {
  abstract mainURL: string;
  public router = Router();
  abstract call(): Routes;
}

export class CoreHttpController<V> implements ICoreHttpController {
  mainURL: string;
  validationModel: any;
  subRoutes: ISubSetFeatureRouter<V>[] = [];

  routes = {
    POST: null,
    GET: null,
    DELETE: null,
    PUT: null,
  };

  public router = Router();

  constructor(routerModel: IRouteModel) {
    this.mainURL = "/" + routerModel.url;
    this.validationModel = routerModel.validationModel;
  }
  async responseHelper(res: Response, fn: ResponseBase) {
    (await fn).fold(
      (ok) => {
        res.json(ok);
        return;
      },
      (err) => {
        res.status(400).json({ error: String(err) });
        return;
      }
    );
  }
  call(): Routes {
    if (this.subRoutes.isNotEmpty()) {
      this.subRoutes.map((el) => {
        this.router[el.method.toLowerCase()](this.mainURL + "/" + el.subUrl, async (req, res) => {
          if (el.fn instanceof CallbackStrategyWithValidationModel) {
            // // TODO(IDONTSUDO):
            throw Error("needs to be implimed");
            // await validationModelMiddleware(el.fn.validationModel, req.body)
            // console.log(req.model)
            // return res.status(200);
          }
          if (el.fn instanceof CallbackStrategyWithIdQuery) {
            if (req.query.id === undefined) {
              res.status(400).json("request query id is null, need query id ?id={id:String}");
              return;
            }
            if (el.fn.idValidationExpression !== undefined) {
              if (!el.fn.idValidationExpression.regExp.test(req.query.id)) {
                res
                  .status(400)
                  .json(
                    `request query id  must fall under the pattern: ${el.fn.idValidationExpression.regExp} message: ${el.fn.idValidationExpression.message} `
                  );
                return;
              } else {
                await this.responseHelper(res, el.fn.call(req.query.id));
              }
            } else {
              await this.responseHelper(res, el.fn.call(req["files"]["file"]));
            }
          }
          if (el.fn instanceof CallBackStrategyWithQueryPage) {
            throw Error("needs to be implimed");
          }
          if (el.fn instanceof CallbackStrategyWithEmpty) {
            await this.responseHelper(res, el.fn.call());
            return;
          }

          if (el.fn instanceof CallbackStrategyWithFileUpload) {
            if (req["files"] === undefined) {
              res.status(400).json("need files to form-data request");
              return;
            }

            if (req["files"]["file"] === undefined) {
              res.status(400).json("need file to form data request");
              return;
            }
            if (req.query.description === undefined) {
              res
                .status(400)
                .json("request query description is null, need query description &description={description:String}");
              return;
            }
            if (req.query.id === undefined) {
              res.status(400).json("request query id is null, need query id ?id={id:String}");
              return;
            }
            if (!el.fn.idValidationExpression.regExp.test(req.query.id)) {
              res.status(400).json(el.fn.idValidationExpression.message);
              return;
            }
            if (el.fn instanceof CallbackStrategyWithFileUpload) {
              if (!el.fn.checkingFileExpression.test(req["files"]["file"]["name"])) {
                res.status(400).json("a file with this extension is expected: " + String(el.fn.checkingFileExpression));
                return;
              }
            }
            await this.responseHelper(res, el.fn.call(req["files"]["file"], req.query.id, req.query.description));
          }
        });
      });
    }

    if (this.routes["POST"] != null) {
      this.router.post(this.mainURL, validationModelMiddleware(this.validationModel), (req, res) =>
        this.requestResponseController<V>(req, res, this.routes["POST"])
      );
    }
    if (this.routes["DELETE"] != null) {
      this.router.delete(this.mainURL, (req, res) =>
        this.requestResponseController<V>(req, res, this.routes["DELETE"])
      );
    }
    if (this.routes["PUT"] != null) {
      this.router.put(this.mainURL, validationModelMiddleware(this.validationModel), (req, res) =>
        this.requestResponseController<V>(req, res, this.routes["PUT"])
      );
    }
    if (this.routes["GET"] != null) {
      this.router.get(this.mainURL, (req, res) => this.requestResponseController<V>(req, res, this.routes["GET"]));
    }

    return {
      router: this.router,
    };
  }
  public put(usecase: CallbackStrategyWithValidationModel<V>) {
    this.routes["PUT"] = usecase;
  }
  public delete(usecase: CallbackStrategyWithValidationModel<V>) {
    this.routes["DELETE"] = usecase;
  }
  public async requestResponseController<T>(
    req: Request,
    res: Response,
    usecase: CallbackStrategyWithValidationModel<T>
  ) {
    let payload = null;
    const useCase = usecase as any;
    if (req["model"] != undefined) {
      payload = req.body as T;
    }

    if (req.query.page !== undefined) {
      payload = String(req.query.page);
    }

    if (req.query.id !== undefined) {
      payload = String(req.query.id);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (await useCase(payload, req.authId)).fold(
      (ok) => {
        res.json(ok);
        return;
      },
      (err) => {
        res.status(400).json({ error: String(err) });
        return;
      }
    );
  }
  // TODO(IDONTSUDO):need fix to CallbackStrategyWithValidationModel<V>
  public post(usecase: any) {
    this.routes["POST"] = usecase;
  }

  public get(usecase: any) {
    this.routes["GET"] = usecase;
  }
}
