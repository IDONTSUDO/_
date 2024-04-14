import { Result } from "../helpers/result";

export class DeleteDataBaseModelUseCase<D> {
  databaseModel: D | any;
  constructor(model) {
    this.databaseModel = model;
  }
  call = async (id: string): Promise<Result<Error, any>> => {
    try {
      const model = this.databaseModel as any;

      const result = await model.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return Result.error(Error(`the database does not have a collection with this ID:${id}`));
      }

      return Result.ok({ ok: "model delete" });
    } catch (error) {
      return Result.error(error);
    }
  };
}
