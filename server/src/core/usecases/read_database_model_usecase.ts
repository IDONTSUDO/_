import { Result } from "../helpers/result";

export class ReadByIdDataBaseModelUseCase<D> {
  databaseModel: D;

  constructor(model) {
    this.databaseModel = model;
  }
  call = async (id: string): Promise<Result<Error, D>> => {
    try {
      const r = this.databaseModel as any;

      const model = await r.findById(id);
      return Result.ok(model);
    } catch (error) {
      return Result.error(error);
    }
  };
}
