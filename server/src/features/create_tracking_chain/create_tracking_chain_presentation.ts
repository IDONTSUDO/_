import { CrudController } from "../../core/controllers/crud_controller";
import { TrackingChainDBModel } from "./tracking_chain_database_model";
import { TrackingChainValidationModel } from "./traking_chain_validation_model";

export class CreateTrackingChainPresentation extends CrudController<
  TrackingChainValidationModel,
  typeof TrackingChainDBModel
> {
  constructor() {
    super({
      url: "tracking_chain",
      validationModel: TrackingChainValidationModel,
      databaseModel: TrackingChainDBModel,
    });
  }
}
