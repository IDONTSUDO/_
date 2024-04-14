import { Result } from "../helpers/result";
import { FileSystemRepository } from "../repository/file_system_repository";

export class CreateFileUseCase {
  fileSystemRepository: FileSystemRepository;
  constructor() {
    this.fileSystemRepository = new FileSystemRepository();
  }
  async call(path: string, buffer: Buffer): Promise<Result<Error, void>> {
    try {
      await this.fileSystemRepository.writeFileAsync(path.pathNormalize(), buffer);

      return Result.ok();
    } catch (err) {
      return Result.error(err as Error);
    }
  }
}
