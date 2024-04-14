import { ObjectId } from "mongoose";
import { OzonHttpApiRepository } from "../../core/repository/ozon_http_api_repository";
import { ProductDBModel } from "../products/product_database_model";

export class SyncMarketPlaceProductsUsecase {
  ozonHttpRepository: OzonHttpApiRepository;
  storeId: string;
  constructor(clientId: string, apiKey: string, storeDataBaseId: string) {
    this.ozonHttpRepository = new OzonHttpApiRepository(clientId, apiKey);
    this.storeId = storeDataBaseId;
  }
  call = async () => {
    try {
      (await this.ozonHttpRepository.getProducts()).map(async (products) => {
        for await (const el of products.result.items) {
          let productDbModel = await ProductDBModel.findOne({ sku: el.product_id });
          if (productDbModel === null) {
            productDbModel = new ProductDBModel();
          }

          (await this.ozonHttpRepository.getProductInfo(el.product_id)).map(async (productOzonInfo) => {
            const { images, id, price, name } = productOzonInfo.result;
            productDbModel.images = images;
            productDbModel.name = name;
            productDbModel.price = price;
            productDbModel.sku = id;
            productDbModel.storeId = this.storeId as unknown as ObjectId;

            await productDbModel.save();
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
