import { Schema, model } from "mongoose";


export interface IUserDatabaseModel {
    clientId: string;
    apiKey: string;
    fullName: string;
    password: string;
    email: string;
}

export const UsersDbSchema = new Schema<IUserDatabaseModel>({
    clientId: String,
    apiKey: String,
    fullName: String,
    email: String,
    password: String,
});

export const schemaUsersDb = "Users";

export const UsersDBModel = model<IUserDatabaseModel>(schemaUsersDb, UsersDbSchema);
