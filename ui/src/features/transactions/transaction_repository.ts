import { CrudHttpRepository } from "../../core/repository/http_repository";

export class TransactionHttpRepository extends CrudHttpRepository<any> {
    featurePath: string = '/transactions';
}