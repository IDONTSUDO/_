import mongoose from "mongoose";
import { CrudController } from "./crud_controller";
import { IRouteModel } from "../interfaces/router";
import { DeleteDataBaseModelUseCase } from "../usecases/delete_database_model_usecase";
import { PaginationDataBaseModelUseCase } from "../usecases/pagination_database_model_usecase";
import { UpdateDataBaseModelUseCase } from "../usecases/update_database_model_usecase";
import { CreateDataBaseAuthModelUseCase } from "../usecases/create_database_auth_model_usecase";
export interface DatabaseAuth {
    auth: string;
}
export class CrudAuthorizationController<V, D> extends CrudController<V, D> {
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
            this.routes["POST"] = new CreateDataBaseAuthModelUseCase(this.dataBaseModel).call;
        }
        if (this.routes["GET"] === null) {
            this.routes["GET"] = new PaginationDataBaseModelUseCase<D>(this.dataBaseModel).call;
        }
        if (this.routes["DELETE"] === null) {
            this.routes["DELETE"] = new DeleteDataBaseModelUseCase<D>(this.dataBaseModel).call;
        }
        if (this.routes["PUT"] === null) {
            this.routes["PUT"] = new UpdateDataBaseModelUseCase(this.dataBaseModel).call;
        }
    }
}