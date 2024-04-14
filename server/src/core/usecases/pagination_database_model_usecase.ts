import { Result } from "../helpers/result";

export class PaginationDataBaseModelUseCase<D> {
  databaseModel: D;
  perPage: number;

  constructor(model: any, perPage = 10) {
    this.databaseModel = model;
    this.perPage = perPage;
  }

  call = async (pageNumber: number): Promise<Result<Error, [D]>> => {
    try {
      const page = Math.max(0, pageNumber);
      const model = this.databaseModel as any;
      return Result.ok(
        await model
          .find()
          .limit(this.perPage)
          .skip(this.perPage * page)
      );
    } catch (error) {
      return Result.error(error);
    }
  };
}
