import makeAutoObservable from "mobx-store-inheritance";
import { AuthorizationModel } from "./authorization_model";
import { message } from "antd";
import {
  AuthorizationHttpRepository,
  AuthorizationLocalStorageRepository,
} from "./authorization_repository";
import { FormState } from "../../core/store/base_store";
import { DocumentsScreenPath } from "../documents/documents_screen";

export class AuthorizationStore extends FormState<AuthorizationModel, any> {
  viewModel: AuthorizationModel = AuthorizationModel.empty();
  authorizationLocalStorageRepository: AuthorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  authorizationHttpRepository = new AuthorizationHttpRepository();
  constructor() {
    super();
    makeAutoObservable(this);
  }
  onTapLogin(): void {
    this.viewModel.isValid()?.fold(
      async () => {
        (await this.authorizationHttpRepository.login(this.viewModel)).fold(
          (token) => {
            this.authorizationLocalStorageRepository.setAuthStatus(true);
            this.authorizationLocalStorageRepository.setJwtToken(token.token);
            if (this.navigate) this.navigate(DocumentsScreenPath);
          },
          (e) => {
            message.error(e.message);
          }
        );
      },
      async (e) => message.error(e)
    );
  }
}
