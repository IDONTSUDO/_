import { CallbackStrategyWithValidationModel } from "../../core/controllers/http_controller";
import { Result } from "../../core/helpers/result";
import { ProductDBModel } from "../products/product_database_model";
import { ShopDBModel } from "./shop_database_model";
import { ShopValidationModel } from "./shop_validation_model";

export class DeleteShopUseCase extends CallbackStrategyWithValidationModel<ShopValidationModel> {
  validationModel: ShopValidationModel;
  call = async (): Promise<Result<string, string>> => {
    const id = this.validationModel._id;
    if (id === undefined) {
      return Result.error("DeleteShopUseCase model id is unknown");
    }
    await ProductDBModel.deleteMany({ storeId: id });
    await ShopDBModel.findByIdAndRemove(id);
    return Result.ok("delete");
  };
}
