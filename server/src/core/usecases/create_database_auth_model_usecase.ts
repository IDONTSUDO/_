import { DatabaseAuth } from "../controllers/crud_authorization_controller";
import { Result } from "../helpers/result";
import { ICreateObjectDataBase } from "../interfaces/response";

export class CreateDataBaseAuthModelUseCase {
    databaseModel: any;

    constructor(model) {
        this.databaseModel = model;
    }

    call = async <V extends DatabaseAuth>(validationModel: V, auth: string): Promise<Result<Error, ICreateObjectDataBase>> => {
        try {
            const result = new this.databaseModel(Object.assign(validationModel, { auth: auth }));

            return Result.ok({ id: String((await result.save())._id) });
        } catch (error) {
            return Result.error(error);
        }
    };
}