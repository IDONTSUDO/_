import { Result } from "../helpers/result";
import { FileSystemRepository } from "../repository/file_system_repository";

export class WriteFileSystemFileUseCase {
  call = async (path: string, fileData: string): Promise<Result<string, void>> => {
    try {
      await new FileSystemRepository().writeFileAsync(path, fileData);
      return Result.ok(undefined);
    } catch (error) {
      return Result.error(`WriteFileSystemFileUseCase error: ${error}`);
    }
  };
}
