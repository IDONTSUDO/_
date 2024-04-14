import mongoose from "mongoose";
import { Result } from "../helpers/result";

export class DataBaseConnectUseCase {
  call = async (dataBaseName: string = "test"): Promise<Result<Error, void>> => {
    try {
      await mongoose.connect(`mongodb://127.0.0.1:27017/${dataBaseName}`);
      return Result.ok();
    } catch (error) {
      console.log(error);
      console.log("database connect error");
      return Result.error(error as Error);
    }
  };
}
