import { Result } from "../helpers/result";

export class SearchDataBaseModelUseCase<T> {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  call = async (findFilter: Partial<T>): Promise<Result<null, T>> => {
    const result = await this.model.findOne(findFilter);
    if (result === null) {
      return Result.error(null);
    } else {
      return Result.ok(result);
    }
  };
}
