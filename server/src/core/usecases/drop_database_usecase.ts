import mongoose from "mongoose";

export class DropDataBaseUseCase {
  call = async () => {
    await mongoose.connection.dropDatabase();
  };
}
