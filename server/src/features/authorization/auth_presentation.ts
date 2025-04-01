import { CoreHttpController } from "../../core/controllers/http_controller";
import { AuthUseCase } from "./auth_usecase";
import { AuthValidationModel } from "./auth_validation_model";
 
 export class AuthPresentation extends CoreHttpController<AuthValidationModel> {
    constructor() {
        super({
            url: "auth",
            validationModel: AuthValidationModel,
        });
        this.post(new AuthUseCase().call);

    }
}