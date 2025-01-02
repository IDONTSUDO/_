import { Schema, model } from "mongoose";


export interface IDocumentsDataBaseModel {
    type: string;
    date: Date;
    status: string;
}

export const DocumentDbSchema = new Schema({
    type: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
    },
    body: {
        type: Schema.Types.Mixed,
    }
});

export const schemaDocumentDb = "Document";

export const DocumentDBModel = model<IDocumentsDataBaseModel>(schemaDocumentDb, DocumentDbSchema);
