import { CrudHttpRepository } from "../../core/repository/http_repository";
import { ProductModel } from "./product_model";

export class ProductsHttpRepository extends CrudHttpRepository<ProductModel> {
    featurePath: string = '/products'
}