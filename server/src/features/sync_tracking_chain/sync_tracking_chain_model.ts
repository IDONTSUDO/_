
// import { IProduct } from "../products/product_database_model";
// import { ITransactionDataBaseModel } from "../sync_marketplace_transactions/trasaction_database_model";

// export class SyncTrackingChainModel {
//   transactions: ITransactionDataBaseModel[];
//   products: IProduct[];
//   trackingChain: ITrackingChainDataBaseModel;
//   constructor(
//     transactions: ITransactionDataBaseModel[],
//     products: IProduct[],
//     trackingChain: ITransactionDataBaseModel
//   ) {
//     this.transactions = transactions;
//     this.products = products;
//     this.trackingChain = trackingChain;
//   }
//   sync() {
//     const [oneProductTransactions, moreThatOneTransactionProducts] = this.transactions
//       .filter((el) => el.skuProduct.length !== 0)
//       .filter((el) => el.skuProduct.includes(this.trackingChain.productSKU))
//       .sortFilter((el: ITransactionDataBaseModel) => el.skuProduct.length === 1);

//     oneProductTransactions.map((el) => {
//       el.isApply = true;
//       this.trackingChain.resultSum += el.amount;
//       if (el.amount.isPositive()) {
//         this.trackingChain.soldProducts += 1;
//       }
//       return el;
//     });
//     // moreThatOneTransactionProducts.map((el) => {
//     //     // if(this.trackingChain.amoun)

//     //   el.isApply = true;
//     //   this.trackingChain.resultSum += el.amount;
//     //   this.trackingChain.soldProducts += 1;
//     // });
//     return oneProductTransactions.concat(moreThatOneTransactionProducts);
//   }
// }
