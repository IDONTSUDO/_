import * as fs from 'fs';
import * as path from 'path';

export class DeleteFolderRecursiveContent {
    call(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            console.log(`Папка не найдена: ${folderPath}`);
            return;
        }

        const files = fs.readdirSync(folderPath);

        if (files.length > 0) {
            files.forEach(file => {
                const currentPath = path.join(folderPath, file);
                if (fs.lstatSync(currentPath).isDirectory()) {
                    new DeleteFolderRecursiveContent().call(currentPath);
                    fs.rmdirSync(currentPath);

                } else {
                    fs.unlinkSync(currentPath);

                }
            });
        } else {
            console.log(`Папка пуста: ${folderPath}`);
        }
    }
}

