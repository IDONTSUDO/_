import makeAutoObservable from "mobx-store-inheritance";
import { AuthorizationModel } from "./authorization_model";
import { message } from "antd";
import { AuthorizationLocalStorageRepository } from "./authorization_local_storage_repository";
import { NavigateFunction } from "react-router-dom";
import { MainScreenPath } from "../main/main_screen";

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
        console.log(201)
        this.authorizationLocalStorageRepository.setAuthStatus();
        if (this.navigate) this.navigate(MainScreenPath);
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
