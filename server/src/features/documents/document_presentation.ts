import { CrudController } from "../../core/controllers/crud_controller";
import { DocumentsValidationModel } from "./documents_validation_model";
import { DocumentDBModel } from "./documents_database";

export class DocumentsPresentation extends CrudController<DocumentsValidationModel, typeof DocumentDBModel> {
    constructor() {
        super({
            validationModel: DocumentsValidationModel,
            url: '/documents',
            databaseModel: DocumentDBModel,
        });
    }

}