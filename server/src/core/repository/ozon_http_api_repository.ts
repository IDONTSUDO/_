import { Result } from "../helpers/result";
import { FullInfoProductOzon } from "../models/full_info_product_ozon";
import { OzonPayments } from "../models/ozon_payments";
import { OzonResult } from "../models/ozon_result";
import { ProductOzon } from "../models/product_ozon";
import { HttpRepository } from "./http_repository";

export abstract class OzonHttpApiImpl {
  abstract getProducts(): Promise<Result<Error, OzonResult<ProductOzon>>>;
  abstract getProductInfo(productId: number): Promise<Result<Error, OzonResult<FullInfoProductOzon>>>;
  abstract getTransactions(year: string, mouth: string, page: number): Promise<Result<Error, OzonResult<OzonPayments>>>;
}



export class OzonHttpMockRepository implements OzonHttpApiImpl {
  constructor(clientId: string, apiKey: string) {

  }
  async getTransactions(year: string, mouth: string, page: number): Promise<Result<Error, OzonResult<OzonPayments>>> {
    // @ts-expect-error
    return Result.ok({
      "result": {
        "operations": [
          {
            "operation_id": 28583255827,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.87,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 03:08:55",
              "posting_number": "36719380-0115",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.87
              }
            ]
          },
          {
            "operation_id": 28584051248,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -5.78,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 10:26:46",
              "posting_number": "0147548876-0088",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза, 10,5 см , Гипс, 1 шт",
                "sku": 1099936241
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -5.78
              }
            ]
          },
          {
            "operation_id": 28584485913,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -4.74,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 12:26:34",
              "posting_number": "0161954403-0015",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -4.74
              }
            ]
          },
          {
            "operation_id": 28584907371,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.47,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 14:04:22",
              "posting_number": "72730519-0430",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт",
                "sku": 889835113
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.47
              }
            ]
          },
          {
            "operation_id": 28585118830,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -1.88,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 14:48:10",
              "posting_number": "32215292-0278",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт",
                "sku": 889835113
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -1.88
              }
            ]
          },
          {
            "operation_id": 28585510979,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.87,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 16:10:27",
              "posting_number": "66335956-0086",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.87
              }
            ]
          },
          {
            "operation_id": 28585755907,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -9.95,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 17:02:34",
              "posting_number": "87200078-0067",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Подставка-ограничитель для книг \"Колонна\", 2 шт.",
                "sku": 889932582
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -9.95
              }
            ]
          },
          {
            "operation_id": 28585977412,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -7.31,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 17:52:08",
              "posting_number": "0125546867-0273",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -7.31
              }
            ]
          },
          {
            "operation_id": 28585993531,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -4.86,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 17:56:11",
              "posting_number": "30502322-0247",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт",
                "sku": 889835113
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -4.86
              }
            ]
          },
          {
            "operation_id": 28586119819,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.87,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 18:23:03",
              "posting_number": "59094365-0077",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.87
              }
            ]
          },
          {
            "operation_id": 28586534771,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.47,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 19:58:04",
              "posting_number": "53081840-0036",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт",
                "sku": 889835113
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.47
              }
            ]
          },
          {
            "operation_id": 28586827916,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -5.16,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 20:57:27",
              "posting_number": "41983715-0327",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"Безпринта\", 19 см , Гипс, 1 шт",
                "sku": 1095719017
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -5.16
              }
            ]
          },
          {
            "operation_id": 28586859283,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -7.11,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 21:06:45",
              "posting_number": "60793390-0252",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"без принта\", 15.5 см , Гипс, 1 шт",
                "sku": 1452944229
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -7.11
              }
            ]
          },
          {
            "operation_id": 28587078458,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -6.47,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2025-01-01 21:52:09",
              "posting_number": "88435153-0162",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт",
                "sku": 889835113
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": -6.47
              }
            ]
          },
          {
            "operation_id": 28587277260,
            "operation_type": "MarketplaceRedistributionOfAcquiringOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Оплата эквайринга",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": 3.51,
            "type": "other",
            "posting": {
              "delivery_schema": "",
              "order_date": "2024-12-29 18:50:26",
              "posting_number": "38146900-0171",
              "warehouse_id": 0
            },
            "items": [
              {
                "name": "KAIDIHOME Ваза \"без  принта\", 10.5 см , Гипс, 1 шт",
                "sku": 900161740
              }
            ],
            "services": [
              {
                "name": "MarketplaceRedistributionOfAcquiringOperation",
                "price": 3.51
              }
            ]
          },
          {
            "operation_id": 28587793511,
            "operation_type": "MarketplaceSaleReviewsOperation",
            "operation_date": "2025-01-01 00:00:00",
            "operation_type_name": "Приобретение отзывов на платформе",
            "delivery_charge": 0,
            "return_delivery_charge": 0,
            "accruals_for_sale": 0,
            "sale_commission": 0,
            "amount": -288,
            "type": "services",
            "posting": {
              "delivery_schema": "",
              "order_date": "",
              "posting_number": "",
              "warehouse_id": 0
            },
            "items": [],
            "services": []
          }
        ],
        "page_count": 1,
        "row_count": 16
      }
    });
  }

  getProductInfo = async (productId: number): Promise<Result<Error, OzonResult<FullInfoProductOzon>>> => {
    // @ts-expect-error
    return Result.ok({ "result": { "id": 466410226, "name": "Птицы декоративные (на стену, декор, украшение интерьера), 5 шт", "offer_id": "Бел 9999", "barcode": "OZN889835113", "buybox_price": "", "category_id": 17038637, "created_at": "2023-03-10T17:49:47.329627Z", "images": ["https://cdn1.ozone.ru/s3/multimedia-x/6583108173.jpg", "https://cdn1.ozone.ru/s3/multimedia-e/6592858826.jpg", "https://cdn1.ozone.ru/s3/multimedia-v/6583108171.jpg", "https://cdn1.ozone.ru/s3/multimedia-u/6583108170.jpg", "https://cdn1.ozone.ru/s3/multimedia-q/6583108166.jpg", "https://cdn1.ozone.ru/s3/multimedia-w/6583108172.jpg"], "marketing_price": "641.0000", "min_ozon_price": "", "old_price": "2999.0000", "premium_price": "", "price": "799.0000", "recommended_price": "", "min_price": "699.0000", "sources": [], "stocks": { "coming": 0, "present": 23, "reserved": 1 }, "errors": [], "vat": "0.0", "visible": true, "visibility_details": { "has_price": true, "has_stock": true, "active_product": false }, "price_index": "0.00", "commissions": [{ "percent": 18, "min_value": 0, "value": 143.82, "sale_schema": "fbo", "delivery_amount": 0, "return_amount": 0 }, { "percent": 18, "min_value": 0, "value": 143.82, "sale_schema": "fbs", "delivery_amount": 0, "return_amount": 0 }, { "percent": 19, "min_value": 0, "value": 151.81, "sale_schema": "rfbs", "delivery_amount": 0, "return_amount": 0 }, { "percent": 19, "min_value": 0, "value": 151.81, "sale_schema": "fbp", "delivery_amount": 0, "return_amount": 0 }], "volume_weight": 1.7, "is_prepayment": false, "is_prepayment_allowed": true, "images360": [], "color_image": "", "primary_image": "https://cdn1.ozone.ru/s3/multimedia-1/6727717621.jpg", "status": { "state": "price_sent", "state_failed": "", "moderate_status": "approved", "decline_reasons": [], "validation_state": "success", "state_name": "Продается", "state_description": "", "is_failed": false, "is_created": true, "state_tooltip": "", "item_errors": [], "state_updated_at": "2024-07-27T07:07:18.843542Z" }, "state": "", "service_type": "IS_CODE_SERVICE", "fbo_sku": 0, "fbs_sku": 0, "currency_code": "RUB", "is_kgt": false, "discounted_stocks": { "coming": 0, "present": 0, "reserved": 0 }, "is_discounted": false, "has_discounted_item": false, "barcodes": ["OZN889835113"], "updated_at": "2024-10-07T20:21:44.417402Z", "price_indexes": { "price_index": "PROFIT", "external_index_data": { "minimal_price": "611.0000", "minimal_price_currency": "RUB", "price_index_value": 0.97 }, "ozon_index_data": { "minimal_price": "743.0000", "minimal_price_currency": "RUB", "price_index_value": 0.8 }, "self_marketplaces_index_data": { "minimal_price": "", "minimal_price_currency": "RUB", "price_index_value": 0 } }, "sku": 889835113, "description_category_id": 17027906, "type_id": 91995, "is_archived": false, "is_autoarchived": false } });
  };
  getProducts = async (): Promise<Result<Error, OzonResult<ProductOzon>>> => Result.ok({ "result": { "items": [{ "product_id": 466410226, "offer_id": "Бел 9999", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 466433708, "offer_id": "Эк57889", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 466454375, "offer_id": "Dk57889", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 466454652, "offer_id": "CКАНДИ", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 472157400, "offer_id": "Pol5322", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 581809708, "offer_id": "Рука белая ВАЗа", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 581817733, "offer_id": "Озон", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 581827209, "offer_id": "Губы Джоли", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 582939122, "offer_id": "Рельеф", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 584136786, "offer_id": "Мешочек", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 586946693, "offer_id": "Белые с золотом", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 586947878, "offer_id": "Птички золото", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 595980102, "offer_id": "46677р", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 601761934, "offer_id": "Облако поднос", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 602161043, "offer_id": "Дуга 9999", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 622001649, "offer_id": "Руки 00000", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 622009582, "offer_id": "478899", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 664280847, "offer_id": "4688", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 675708965, "offer_id": "7899", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 677623784, "offer_id": "01123", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 727476107, "offer_id": "Рука чёрная 9", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 872738994, "offer_id": "145621111", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 910329650, "offer_id": "Бу442688", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1008977325, "offer_id": "11221176", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1029078688, "offer_id": "3677999643", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1029093106, "offer_id": "4789974", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1067471630, "offer_id": "16800753", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1092823457, "offer_id": "2356789", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1126305326, "offer_id": "423667888", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1143580673, "offer_id": "0742356", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1143589689, "offer_id": "26890073", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1144140195, "offer_id": "097533", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1189913251, "offer_id": "12344532", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1275731533, "offer_id": "12456799", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1275740993, "offer_id": "2345567", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1280487250, "offer_id": "4335678", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1280488387, "offer_id": "43356788", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1280490634, "offer_id": "54477888", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1280491831, "offer_id": "1556788", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1280496175, "offer_id": "423568135", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1292910431, "offer_id": "124567643", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1292966222, "offer_id": "3246789", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1294221971, "offer_id": "256788", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1294227110, "offer_id": "5334677", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1294233018, "offer_id": "324577", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1294236082, "offer_id": "235788", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1294237404, "offer_id": "2467890", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1295484838, "offer_id": "225678", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1321462445, "offer_id": "4335778", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1321463940, "offer_id": "543477888", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1321464321, "offer_id": "5446888", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1329602113, "offer_id": "346788", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1332373610, "offer_id": "123344555", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }, { "product_id": 1335747289, "offer_id": "43356778", "is_fbo_visible": true, "is_fbs_visible": true, "archived": false, "is_discounted": false }], "total": 54, "last_id": "WzEzMzU3NDcyODksMTMzNTc0NzI4OV0=" } });


}
export class OzonHttpApiRepository extends HttpRepository implements OzonHttpApiImpl {
  constructor(clientId: string, apiKey: string) {
    super("https://api-seller.ozon.ru");
    super.getHttpClient().interceptors.request.use(
      (config) => {
        config.headers["Client-Id"] = clientId;
        config.headers["Api-Key"] = apiKey;
        console.log(clientId)
        console.log(apiKey)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  getProducts = () => this.jsonRequest<OzonResult<ProductOzon>>("/v2/product/list", "POST", {
    filter: {
      visibility: "ALL",
    },
  });


  getProductInfo = (productId: number) => this.jsonRequest<OzonResult<FullInfoProductOzon>>("/v2/product/info", "POST", {
    offer_id: "",
    product_id: productId,
    sku: 0,
  });

  getTransactions = (year: string, mouth: string, page: number = 1) => {
    if (mouth.length === 1) {
      mouth = "0" + mouth;
    }
    console.log(JSON.stringify({
      filter: {
        date: {
          from: `${year}-${mouth}-01T00:00:00.000Z`,
          to: `${year}-${mouth}-01T00:00:00.000Z`,
        },
        transaction_type: "all",
      },
      page: page === 0 ? 1 : page,
      page_size: 1000,
    }))

    return this.jsonRequest<OzonResult<OzonPayments>>("/v3/finance/transaction/list", "POST", {
      filter: {
        date: {
          from: `${year}-${mouth}-01T00:00:00.000Z`,
          to: `${year}-${mouth}-01T00:00:00.000Z`,
        },
        transaction_type: "all",
      },
      page: page === 0 ? 1 : page,
      page_size: 1000,
    });
  };
}

