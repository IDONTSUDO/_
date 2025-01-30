import { CrudHttpRepository, HttpMethod } from "../../core/repository/http_repository";
import { BaseDocument, BaseDocumentTypes } from "./document_model";

export class DocumentsHttpRepository extends CrudHttpRepository<BaseDocument> {
    featurePath: string = '/documents'
    sync = () => this._jsonRequest(HttpMethod.GET, this.featurePath + '/sync')
    lastSyncQueue = () => this._jsonRequest(HttpMethod.GET, this.featurePath + '/last/syncQueue')
}