import { ResponseBase } from "../../../core/controllers/http_controller";
import { Result } from "../../../core/helpers/result";
import { OzonHttpApiRepository } from "../../../core/repository/ozon_http_api_repository";
import { UsersDBModel } from "../../authorization/users_model";
import { ProductDBModel } from "../../products/product_database_model";

export class SyncProductsUseCase {
    call = async (authId: string): ResponseBase => {
        let isError = false;
        const shop = await UsersDBModel.findById(authId);

        const ozonHttpApiRepository = new OzonHttpApiRepository(shop.clientId, shop.apiKey);
        await (await ozonHttpApiRepository.attributesProducts()).fold(
            async (ozonProducts) => {
                ozonProducts.result.map((el) => {
                    return {
                        'name': el.name,
                        'sku': el.sku,
                        'storeId': shop._id,
                        'auth': authId,
                    }
                }).map(async (productModel) => {
                    const model = await ProductDBModel.findOne({ name: productModel.name });
                    if (model === null) {
                        await new ProductDBModel(productModel).save()
                    } else {
                        model.save()
                    }
                })

            },
            async () => {
                isError = true;
            }

        );
        if (isError) return Result.error(undefined);
        return Result.ok();
    }
}
