import { App } from "../controllers/app";
import { FileSystemRepository } from "../repository/file_system_repository";
import { CreateFolderUseCase } from "./create_folder_usecase";

export class CheckAndCreateStaticFilesFolderUseCase {
    fileSystemRepository: FileSystemRepository = new FileSystemRepository();
    call = async (): Promise<void> => {

        if (await this.fileSystemRepository.dirIsExists(App.staticFilesStoreDir())) {
            return;
        }
        await new CreateFolderUseCase().call(App.staticFilesStoreDir());
    };
}
