import { NavigateFunction } from "react-router-dom";
import { CrudFormStore } from "../../core/store/base_store";
import { ProductModel } from "./product_model";
import { ProductsHttpRepository } from "./products_http_repository";
import makeAutoObservable from "mobx-store-inheritance";

export class ProductsStore extends CrudFormStore<ProductModel, any, ProductsHttpRepository> {
    constructor() {
        super()
        makeAutoObservable(this)

    }
    repository: ProductsHttpRepository = new ProductsHttpRepository();
    viewModel: ProductModel = ProductModel.empty();
    async init(navigate?: NavigateFunction | undefined): Promise<any> {
        this.initCrud()
    }


}