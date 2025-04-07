import { Schema, model } from "mongoose";
import { apllyAuth } from "../../core/models/auth_model";


export interface IDocumentsDataBaseModel {
    type: string;
    date: Date;
    status: string;
    body: any;
    queue: number;
    syncQueue: number;
    error: any;
    result: any;
    auth: string;
}

export const DocumentDbSchema = new Schema<IDocumentsDataBaseModel>(apllyAuth({
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
    },
    result: {
        type: Schema.Types.Mixed,
    },
}));

export const schemaDocumentDb = "Document";

export const DocumentDBModel = model<IDocumentsDataBaseModel>(schemaDocumentDb, DocumentDbSchema);
