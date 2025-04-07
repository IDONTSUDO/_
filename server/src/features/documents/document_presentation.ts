import { CrudController } from "../../core/controllers/crud_controller";
import { DocumentsValidationModel } from "./documents_validation_model";
import { DocumentDBModel, IDocumentsDataBaseModel } from "./documents_database";
import { CallbackStrategyWithEmpty, CallbackStrategyWithIdQuery, ResponseBase } from "../../core/controllers/http_controller";
import { Result } from "../../core/helpers/result";
import { CoreValidation } from "../../core/validations/core_validation";
import { MongoIdValidation } from "../../core/validations/mongo_id_validation";
import { ReadByIdDataBaseModelUseCase } from "../../core/usecases/read_database_model_usecase";
import { GetTheLargestNumberFromACollectionUseCase } from "../../core/usecases/get_the_largest_number_from_a_collection_model_usecase";
import { SyncDocumentsUseCase } from "./usecases/sync_documents_scenario";
import { CrudAuthorizationController } from "../../core/controllers/crud_authorization_controller";
 






export class GetDocumentById extends CallbackStrategyWithIdQuery {
    idValidationExpression: CoreValidation = new MongoIdValidation();
    call = async (id: string): ResponseBase => new ReadByIdDataBaseModelUseCase(DocumentDBModel).call(id);
}

export class GetLastSyncQueue extends CallbackStrategyWithEmpty {
    call = async (): ResponseBase => (await new GetTheLargestNumberFromACollectionUseCase<IDocumentsDataBaseModel>(DocumentDBModel).call('syncQueue')).map((number) => Result.ok({ syncQueue: number }))


}
export class DocumentsPresentation extends CrudAuthorizationController<DocumentsValidationModel, typeof DocumentDBModel> {
    constructor() {
        super({
            validationModel: DocumentsValidationModel,
            url: 'documents',
            databaseModel: DocumentDBModel,
        });
        this.subRoutes.push({ method: "GET", subUrl: "sync", fn: new SyncDocumentsUseCase() });
        this.subRoutes.push({ method: "GET", subUrl: 'by', fn: new GetDocumentById() })
        this.subRoutes.push({ method: "GET", subUrl: "last/syncQueue", fn: new GetLastSyncQueue() })
    }

}