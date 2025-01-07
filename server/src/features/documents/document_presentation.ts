import { CrudController } from "../../core/controllers/crud_controller";
import { DocumentsValidationModel } from "./documents_validation_model";
import { DocumentDBModel } from "./documents_database";
import { CallbackStrategyWithEmpty, CallbackStrategyWithIdQuery, ResponseBase } from "../../core/controllers/http_controller";
import { Result } from "../../core/helpers/result";
import { CoreValidation } from "../../core/validations/core_validation";
import { MongoIdValidation } from "../../core/validations/mongo_id_validation";
import { ReadByIdDataBaseModelUseCase } from "../../core/usecases/read_database_model_usecase";
export class SyncDocumentsUseCase extends CallbackStrategyWithEmpty {
    async call(): ResponseBase {
        return Result.ok('132')
    }
}
export class GetDocumentById extends CallbackStrategyWithIdQuery {
    idValidationExpression: CoreValidation = new MongoIdValidation();
    call = async (id: string): ResponseBase => new ReadByIdDataBaseModelUseCase(DocumentDBModel).call(id);
}
export class DocumentsPresentation extends CrudController<DocumentsValidationModel, typeof DocumentDBModel> {
    constructor() {
        super({
            validationModel: DocumentsValidationModel,
            url: 'documents',
            databaseModel: DocumentDBModel,
        });
        this.subRoutes.push({ method: "GET", subUrl: "sync", fn: new SyncDocumentsUseCase() });
        this.subRoutes.push({ method: "GET", subUrl: 'by', fn: new GetDocumentById() })
    }

}