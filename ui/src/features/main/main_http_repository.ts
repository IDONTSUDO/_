import { CrudHttpRepository } from "../../core/repository/http_repository";
import { BaseDocument } from "./document_model";

export class MainHttpRepository extends CrudHttpRepository<BaseDocument> {
    featurePath: string = '/documents'
}