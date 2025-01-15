import { NavigateFunction } from "react-router-dom";
import { CrudFormStore } from "../../core/store/base_store";
import { ShopModel } from "./shops_model";
import { ShopsRepository } from "./shops_repository";
import makeAutoObservable from "mobx-store-inheritance";

export class ShopsStore extends CrudFormStore<ShopModel, any, ShopsRepository> {
    repository: ShopsRepository = new ShopsRepository();
    viewModel: ShopModel = ShopModel.empty();
    constructor() {
        super();
        makeAutoObservable(this);
    }
    async init(navigate?: NavigateFunction | undefined): Promise<any> {
        this.initCrud()
    }
    closeModalHelper = () => {
        this.viewModel = ShopModel.empty();
    }
}