import { CrudController } from "../../core/controllers/crud_controller";
import { ShopValidationModel } from "./shop_validation_model";
import { ShopDBModel } from "./shop_database_model";
import { DeleteShopUseCase } from "./delete_shop_usecase";

export class CreateNewShopPresentation extends CrudController<ShopValidationModel, typeof ShopDBModel> {
  constructor() {
    super({
      url: "shops",
      validationModel: ShopValidationModel,
      databaseModel: ShopDBModel,
    });
    super.delete(new DeleteShopUseCase());
  }
}
