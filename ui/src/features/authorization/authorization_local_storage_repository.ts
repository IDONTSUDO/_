import { LocalStorageRepository } from "../../core/repository/local_storage_repository";

export class AuthorizationLocalStorageRepository extends LocalStorageRepository {
  setAuthStatus = () => this._setItem("auth", "true");
  isAuth = () => this._getItem("auth").map((s: any) => Boolean(s));
}
