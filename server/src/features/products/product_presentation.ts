import { CrudAuthorizationController } from "../../core/controllers/crud_authorization_controller";
import { ProductDBModel } from "./product_database_model";
import { ProductValidationModel } from "./product_validation_model";

export class ProductPresentation extends CrudAuthorizationController<ProductValidationModel, typeof ProductDBModel> {
  constructor() {
    super({
      url: "products",
      validationModel: ProductValidationModel,
      databaseModel: ProductDBModel,
    });
  }
}
