import { Result } from "../helpers/result";

export class FindPredicateModelAndUpdateDatabaseModelUseCase<D> {
  databaseModel: D;

  constructor(model) {
    this.databaseModel = model;
  }
  async call(conditions: Partial<D>, update: Partial<D>): Promise<Result<void, void>> {
    const dbModel = this.databaseModel as any;
    try {
      // kennels.findOneAndUpdate({}, { age: 5 }, function(err, result) {
      //   if (err) {
      //     res.send(err);
      //   } else {
      //     res.send(result);
      //   }
      // });

      // console.log(dbModel.findOneAndUpdate(conditions, update, function (err, result) {
      //   console.log('ERRR')
      //   console.log(err)
      //   console.log('result')
      //   console.log(result)
      // }));
      return Result.ok();
    } catch (error) {
      return Result.error(undefined);

    }
  }
}
