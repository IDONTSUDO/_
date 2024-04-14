import { Result } from "../helpers/result";
import { FileSystemRepository } from "../repository/file_system_repository";

export class CreateFolderUseCase {
  fileSystemRepository: FileSystemRepository;
  constructor() {
    this.fileSystemRepository = new FileSystemRepository();
  }
  call = async (path: string): Promise<Result<Error, string>> => {
    try {
      if (await this.fileSystemRepository.dirIsExists(path)) {
        return Result.ok("ok");
      }
      await this.fileSystemRepository.createDir(path);

      return Result.ok("ok");
    } catch (error) {
      return Result.error(error as Error);
    }
  };
}
