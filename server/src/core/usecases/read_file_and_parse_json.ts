import { Result } from "../helpers/result";
import { FileSystemRepository } from "../repository/file_system_repository";

export class ReadFileAndParseJsonUseCase {
  fileSystemRepository: FileSystemRepository;

  constructor() {
    this.fileSystemRepository = new FileSystemRepository();
  }
  async call<T>(path: string): Promise<Result<string, T>> {
    try {
      if (RegExp(path).test("^(.+)/([^/]+)$")) {
        return Result.error(`ReadFileAndParseJsonUseCase got the bad way: ${path}`);
      }
      const file = await this.fileSystemRepository.readFileAsync(path);
      try {
        return Result.ok(JSON.parse(file.toString()));
      } catch {
        return Result.error(`ReadFileAndParseJsonUseCase is not json type file parse path: ${path}`);
      }
    } catch (error) {
      return Result.error(`ReadFileAndParseJsonUseCase error:${error}`);
    }
  }
}
