import { Result } from "../helpers/result";

export class ReadByIdDataBaseModelUseCase<D> {
  databaseModel: D;

  constructor(model) {
    this.databaseModel = model;
  }
  call = async (id: string): Promise<Result<Error, D>> => {
    try {
      const dbModel = this.databaseModel as any;
      return Result.ok(await dbModel.findById(id));
    } catch (error) {
      return Result.error(error);
    }
  };
}
