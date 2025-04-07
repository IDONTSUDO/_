import { IsNumber, IsString } from "class-validator";
import { IDocumentsDataBaseModel } from "./documents_database";

export class DocumentsValidationModel implements IDocumentsDataBaseModel {
    auth: string;
    result: any;
    error: any;
    body: any;
    syncQueue: number;
    @IsString()
    status: string;
    @IsString()
    type: string;
    @IsNumber()
    queue: number;
    date: Date;
}