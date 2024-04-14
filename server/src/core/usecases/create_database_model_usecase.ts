import { Result } from "../helpers/result";
import { ICreateObjectDataBase } from "../interfaces/response";

export class CreateDataBaseModelUseCase<V> {
  databaseModel: any;

  constructor(model) {
    this.databaseModel = model;
  }

  call = async (validationModel: V): Promise<Result<Error, ICreateObjectDataBase>> => {
    try {
      const result = new this.databaseModel(validationModel);

      return Result.ok({ id: String((await result.save())._id) });
    } catch (error) {
      return Result.error(error);
    }
  };
}
