import { Schema, model } from "mongoose";


export interface IDocumentsDataBaseModel {
    type: string;
    date: Date;
    status: string;
    body: any;
    queue: number;
    syncQueue: number;
    error: any;
}

export const DocumentDbSchema = new Schema<IDocumentsDataBaseModel>({
    error: {
        type: Schema.Types.Mixed,
    },
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
    },
    queue: {
        type: Number,
    },
    syncQueue: {
        type: Number,
    }
});

export const schemaDocumentDb = "Document";

export const DocumentDBModel = model<IDocumentsDataBaseModel>(schemaDocumentDb, DocumentDbSchema);
