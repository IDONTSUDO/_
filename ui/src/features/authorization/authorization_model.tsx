import { Result } from "../../core/helper/result";

export class AuthorizationModel {
  constructor(public login: string, public password: string) {}
  isValid(): Result<string, void> {
    if (this.login.isEmpty()) {
      return Result.error("поле логин пустое");
    }
    if (this.password.isEmpty()) {
      return Result.error("поле пароль пустое");
    }
    if (!this.login.isEqual("123")) {
      return Result.error("логин не совпадает");
    }
    if (!this.password.isEqual("123")) {
      return Result.error("пароль не совпадает");
    }
    return Result.ok();
  }
  static empty() {
    return new AuthorizationModel("", "");
  }
}
