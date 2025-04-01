import { Result } from "../../core/helpers/result";
import { AuthValidationModel } from "./auth_validation_model";
import { UsersDBModel } from "./users_model";
import jwt from 'jsonwebtoken';

export class AuthUseCase {
    async call(model: AuthValidationModel): Promise<Result<string, { token: string }>> {
        const usersDBModel = await UsersDBModel.findOne({ email: model.email, password: model.password });

        if (usersDBModel === null) {
            return Result.error('auth error');
        }

        return Result.ok({
            token: jwt.sign(({ id: usersDBModel._id }), 's', {
                expiresIn: '365d',
            }),
        });
    }
}
