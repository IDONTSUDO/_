import { CrudController } from "../../core/controllers/crud_controller";
import { TransactionValidationModel } from "./transaction_validation_model";
import { TransactionDBModel } from "./trasaction_database_model";



export class TransactionsPresentation extends CrudController<typeof TransactionDBModel, TransactionValidationModel> {
  constructor() {
    super(
      {
        validationModel: TransactionValidationModel,
        url: 'transactions',
        databaseModel: TransactionDBModel
      }
    )
  }

}
