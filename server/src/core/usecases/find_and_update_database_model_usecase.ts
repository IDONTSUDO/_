export class FindPredicateModelAndUpdateDatabaseModelUseCase<D> {
  databaseModel: D;

  constructor(model) {
    this.databaseModel = model;
  }
  async call(conditions: Partial<D>, update: Partial<D>) {
    const dbModel = this.databaseModel as any;
    dbModel.findOneAndUpdate(conditions, update);
  }
}
