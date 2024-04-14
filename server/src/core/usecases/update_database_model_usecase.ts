import { Result } from "../helpers/result";

interface uuid {
  _id?: string;
}

export class UpdateDataBaseModelUseCase<D, T extends uuid> {
  databaseModel: D;
  constructor(databaseModel) {
    this.databaseModel = databaseModel;
  }

  call = async (updateModel: T): Promise<Result<Error, T>> => {
    try {
      if (updateModel["_id"] === undefined) {
        return Result.error(new Error("need _id at model body"));
      }
      const databaseModel = this.databaseModel as any;
      const model = await databaseModel.findById(updateModel._id);
      if (model === null) {
        throw new Error(
          `we can’t find the model in the database with ID:${updateModel._id} collection: ${databaseModel.modelName}`
        );
      }

      Object.assign(model, updateModel);

      await model.save();
      return Result.ok(model as T);
    } catch (error) {
      return Result.error(error);
    }
  };
}
