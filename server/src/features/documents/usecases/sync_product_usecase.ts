import { ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { OzonHttpApiRepository } from "../../../core/repository/ozon_http_api_repository";
import { ShopDBModel } from "../../create_new_shop/shop_database_model";
import { ProductDBModel } from "../../products/product_database_model";

export class SyncProductsUseCase {
    call = async (): ResponseBase => {
        let isError = false;
        const shop = await ShopDBModel.findOne();

        const ozonHttpApiRepository = new OzonHttpApiRepository(shop.clientId, shop.apiKey);
        await (await ozonHttpApiRepository.attributesProducts()).fold(
            async (ozonProducts) => {
                // console.log(ozonProducts);
                ozonProducts.result.map((el) => {
                    // el.sku
                    return {
                        'name': el.name,
                        'sku': el.sku,
                        'storeId': shop._id,
                    }
                }).map(async (productModel) => {
                    const model = await ProductDBModel.findOne({ name: productModel.name });
                    if (model === null) {
                        await new ProductDBModel(productModel).save()
                    } else {
                        model.save()
                    }
                })
                // shop.productSyncLastId = ozonProducts.result.last_id;
                // await shop.save();
                // (await ozonHttpApiRepository.getProductsFullInfo(ozonProducts.result.items.map((el) => String(el.product_id)))).fold((ozonResultFullInfoProductOzon) => {
                //     ozonResultFullInfoProductOzon.items.map((el) => {

                //         return {
                //             'name': el.name,
                //             // 'sku': el,
                //             'price': el.price,
                //             'storeId': shop._id,
                //         }

                //     }) 
                // },
                //     () => {
                //         isError = true;
                //     })
            },
            async () => {
                isError = true;
            }

        );
        if (isError) return Result.error(undefined);
        return Result.ok();
    }
}
