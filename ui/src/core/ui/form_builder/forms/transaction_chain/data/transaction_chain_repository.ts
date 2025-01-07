import { CoreHttpRepository, HttpMethod } from "../../../../../repository/http_repository";


export class TransactionChainRepository extends CoreHttpRepository {
    featurePath: string = '/products';
    getAllProducts = () => this._jsonRequest(HttpMethod.GET, this.featurePath)
}