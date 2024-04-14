import { FullInfoProductOzon } from "../models/full_info_product_ozon";
import { OzonPayments } from "../models/ozon_payments";
import { OzonResult } from "../models/ozon_result";
import { ProductOzon } from "../models/product_ozon";
import { HttpRepository } from "./http_repository";

export class OzonHttpApiRepository extends HttpRepository {
  constructor(clientId: string, apiKey: string) {
    super("https://api-seller.ozon.ru");
    super.getHttpClient().interceptors.request.use(
      (config) => {
        config.headers["Client-Id"] = clientId;
        config.headers["Api-Key"] = apiKey;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  getProducts = () => {
    return this.jsonRequest<OzonResult<ProductOzon>>("/v2/product/list", "POST", {
      filter: {
        visibility: "ALL",
      },
    });
  };

  getProductInfo = (productId: number) => {
    return this.jsonRequest<OzonResult<FullInfoProductOzon>>("/v2/product/info", "POST", {
      offer_id: "",
      product_id: productId,
      sku: 0,
    });
  };
  getTransactions = (year: string, mouth: string, page: number = 1) => {
    if (mouth.length === 1) {
      mouth = "0" + mouth;
    }
    return this.jsonRequest<OzonResult<OzonPayments>>("/v3/finance/transaction/list", "POST", {
      filter: {
        date: {
          from: `${year}-${mouth}-01T00:00:00.000Z`,
          to: `${year}-${mouth}-01T00:00:00.000Z`,
        },
        transaction_type: "all",
      },
      page: page,
      page_size: 1000,
    });
  };
}
