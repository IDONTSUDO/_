// import { SyncTrackingChainModel } from "../src/features/sync_tracking_chain/sync_tracking_chain_model";
import { assert } from "chai";

import { extensions } from "../src/core/extensions/extensions";
extensions();
// storeId: ObjectId;
// operationId: number;
// amount: number;
// isApply: boolean;
// skuProduct: number[];
// unixDate: number;
// const syncTrackingChainModel = new SyncTrackingChainModel(
//   [
//     {
//       storeId: "" as any,
//       operationId: 123,
//       amount: 10.0,
//       isApply: false,
//       skuProduct: [1231],
//       unixDate: 123123312,
//       operationType: "order",
//       origin: "",
//       productName: "132",
//     },

//     {
//       storeId: "" as any,
//       operationId: 123,
//       amount: 10.0,
//       isApply: false,
//       skuProduct: [1231],
//       unixDate: 123123312,
//       operationType: "order",
//       origin: "",
//       productName: "132",
//     },
//     {
//       storeId: "" as any,
//       operationId: 123,
//       amount: -10.0,
//       isApply: false,
//       skuProduct: [1231],
//       unixDate: 123123312,
//       operationType: "service",
//       origin: "",
//       productName: "132",
//     },
//   ],
//   [],
//   {
//     amount: 6,
//     total: 0,
//     resultSum: 0,
//     soldProducts: 0,
//     isFinished: false,
//     storeId: "" as any,
//     productSKU: 1231,
//     productId: "" as any,
//   }
// ).sync();
// // тест на то что не трогаются лишние транзакции
// // тест на то что соблюдается
// // тест на переполнение amount === soldProducts
// // тест на
