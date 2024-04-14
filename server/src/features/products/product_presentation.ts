import { CrudController } from "../../core/controllers/crud_controller";
import { ProductDBModel } from "./product_database_model";
import { ProductValidationModel } from "./product_validation_model";

export class ProductPresentation extends CrudController<ProductValidationModel, typeof ProductDBModel> {
  constructor() {
    super({
      url: "products",
      validationModel: ProductValidationModel,
      databaseModel: ProductDBModel,
    });
  }
}
