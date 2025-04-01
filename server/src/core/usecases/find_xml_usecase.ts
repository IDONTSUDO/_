
import * as fs from 'fs';
import * as path from 'path';

export class FindXmlFilesUseCase {
    call(folderPath: string) {
        let xlmFiles: string[] = [];
        if (!fs.existsSync(folderPath)) {
            console.log(`Папка не найдена: ${folderPath}`);
            return xlmFiles;
        }
        const files = fs.readdirSync(folderPath);
        files.forEach(file => {
            const currentPath = path.join(folderPath, file);

            if (fs.lstatSync(currentPath).isDirectory()) {
                xlmFiles = xlmFiles.concat(new FindXmlFilesUseCase().call(currentPath));
            } else if (file.endsWith('.xml')) {
                xlmFiles.push(currentPath);
            }
        });

        return xlmFiles;
    }
}