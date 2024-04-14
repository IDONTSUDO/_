import { IRouteModel } from "../interfaces/router";
import { CreateDataBaseModelUseCase } from "../usecases/create_database_model_usecase";
import { DeleteDataBaseModelUseCase } from "../usecases/delete_database_model_usecase";
import { PaginationDataBaseModelUseCase } from "../usecases/pagination_database_model_usecase";
import { UpdateDataBaseModelUseCase } from "../usecases/update_database_model_usecase";

import { CoreHttpController } from "./http_controller";
import mongoose from "mongoose";

export class CrudController<V, D> extends CoreHttpController<V> {
  dataBaseModel: mongoose.Model<D>;

  constructor(routerModel: IRouteModel) {
    super(routerModel);
    this.mainURL = "/" + routerModel.url;
    this.validationModel = routerModel.validationModel;
    this.dataBaseModel = routerModel.databaseModel;
    this.init();
  }
  init() {
    if (this.routes["POST"] === null) {
      this.routes["POST"] = new CreateDataBaseModelUseCase<D>(this.dataBaseModel).call;
    }
    if (this.routes["GET"] === null) {
      this.routes["GET"] = new PaginationDataBaseModelUseCase<D>(this.dataBaseModel).call;
    }
    if (this.routes["DELETE"] === null) {
      this.routes["DELETE"] = new DeleteDataBaseModelUseCase<D>(this.dataBaseModel).call;
    }
    if (this.routes["PUT"] === null) {
      this.routes["PUT"] = new UpdateDataBaseModelUseCase<V, D>(this.dataBaseModel).call;
    }
  }
}
