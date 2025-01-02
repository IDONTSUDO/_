import { IsString } from "class-validator";
import { IDocumentsDataBaseModel } from "./documents_database";

export class DocumentsValidationModel implements IDocumentsDataBaseModel {
    @IsString()
    status: string;
    @IsString()
    type: string;
    date: Date;
}