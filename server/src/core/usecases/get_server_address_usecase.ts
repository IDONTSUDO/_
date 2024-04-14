import { Result } from "../helpers/result";

export class GetServerAddressUseCase {
  call = (): Result<string, string> => {
    return Result.ok("http://localhost:4001");
  };
}
