import { DatabaseAuth } from "../controllers/crud_authorization_controller";
import { Result } from "../helpers/result";

export class AuthPaginationDataBaseModelUseCase<D extends DatabaseAuth> {
    databaseModel: D;
    perPage: number;

    constructor(model: any, perPage = 10) {
        this.databaseModel = model;
        this.perPage = perPage;
    }

    call = async (pageNumber: number, auth: string): Promise<Result<Error, [D]>> => {
        try {
            const page = Math.max(0, pageNumber);
            const model = this.databaseModel as any;
            return Result.ok(
                await model
                    .find({auth:auth})
                    .limit(this.perPage)
                    .skip(this.perPage * page)
            );
        } catch (error) {
            return Result.error(error);
        }
    };
}
