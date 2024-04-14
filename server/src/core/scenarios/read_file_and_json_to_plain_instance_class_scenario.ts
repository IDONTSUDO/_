import { ClassConstructor, plainToInstance } from "class-transformer";
import { ReadFileAndParseJsonUseCase } from "../usecases/read_file_and_parse_json";
import { Result } from "../helpers/result";
import { validate, ValidationError } from "class-validator";
const skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = true;

export class ReadingJsonFileAndConvertingToInstanceClassScenario<T> {
  model: ClassConstructor<T>;
  constructor(cls: ClassConstructor<T>) {
    this.model = cls;
  }
  call = async (path: string): Promise<Result<string, T>> => {
    try {
      const result = await new ReadFileAndParseJsonUseCase().call(path);
      if (result.isFailure()) {
        return result.forward();
      }
      const json = result.value;
      const model = plainToInstance(this.model, json);
      const errors = await validate(model as object, { skipMissingProperties, whitelist, forbidNonWhitelisted });
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
        return Result.error("ReadingJsonFileAndConvertingToInstanceClassScenario:" + message);
      } else {
        return Result.ok(model as T);
      }
    } catch (error) {
      return Result.error("ReadingJsonFileAndConvertingToInstanceClassScenario" + String(error));
    }
  };
}
