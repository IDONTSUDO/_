import makeAutoObservable from "mobx-store-inheritance";
import { AuthorizationModel } from "./authorization_model";
import { message } from "antd";
import { AuthorizationLocalStorageRepository } from "./authorization_local_storage_repository";
import { NavigateFunction } from "react-router-dom";
import { DocumentsScreenPath } from "../documents/documents_screen";

export class AuthorizationStore {
  authorizationModel: AuthorizationModel;
  authorizationLocalStorageRepository: AuthorizationLocalStorageRepository;
  navigate?: NavigateFunction;
  constructor() {
    makeAutoObservable(this);
    this.authorizationModel = AuthorizationModel.empty();
    this.authorizationLocalStorageRepository =
      new AuthorizationLocalStorageRepository();
  }

  init(navigate: NavigateFunction) {
    this.navigate = navigate;
  }
  onTapLogin(): void {
    this.authorizationModel.isValid()?.fold(
      () => {
        this.authorizationLocalStorageRepository.setAuthStatus();
        if (this.navigate) this.navigate(DocumentsScreenPath);
      },
      (e) => message.error(e)
    );
  }
  changePassword(value: string): void {
    this.authorizationModel.password = value;
  }
  changeLogin(value: string): void {
    this.authorizationModel.login = value;
  }
}
