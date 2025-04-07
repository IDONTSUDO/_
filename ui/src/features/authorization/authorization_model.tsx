import { IsNotEmpty, IsString } from "class-validator";
import { Result } from "../../core/helper/result";

export class AuthorizationModel {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  isValid(): Result<string, void> {
    if (this.email.isEmpty()) {
      return Result.error("поле логин пустое");
    }
    if (this.password.isEmpty()) {
      return Result.error("поле пароль пустое");
    }

    return Result.ok();
  }
  static empty() {
    return new AuthorizationModel("", "");
  }
}
