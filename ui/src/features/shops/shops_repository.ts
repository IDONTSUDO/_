import { CrudHttpRepository } from "../../core/repository/http_repository";
import { ShopModel } from "./shops_model";

export class ShopsRepository extends CrudHttpRepository<ShopModel> {
    featurePath: string = '/shops'
}