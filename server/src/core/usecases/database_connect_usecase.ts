import mongoose from "mongoose";
import { Result } from "../helpers/result";



export class DataBaseConnectUseCase {
  call = async (): Promise<Result<Error, void>> => {
    try {
      await mongoose.connect('mongodb://myUser:myPassword@localhost:27017/myDatabase', {
      }); return Result.ok();
    } catch (error) {
      console.log(error);
      console.log("database connect error");
      return Result.error(error as Error);
    }
  };
}



