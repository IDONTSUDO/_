import "reflect-metadata";
import { App } from "./core/controllers/app";
import { extensions } from "./core/extensions/extensions";
import { httpRoutes } from "./core/controllers/routes";
import { SyncTransactionModel } from "./features/documents/model/sync_transaction_model";
import { SyncTransactionsUseCase } from "./features/documents/usecases/sync_transaction_usecase";
import { CronController } from "./core/controllers/cron_controller";
import { SyncMarketPlacePresentation } from "./features/sync_marketplace_products/sync_marketplace_presentation";
import { BalanceReportUseCase } from "./features/documents/usecases/balance_report_usecase";
import { BalanceModel } from "./features/documents/model/balance_model";
import { OzonHttpApiRepository } from "./core/repository/ozon_http_api_repository";
import * as XLSX from 'xlsx';

import * as decode from 'html-entities'
import * as zl from "zip-lib";
import * as xlsx from 'xlsx';
import * as xml2js from 'xml2js';
import * as fs from 'fs';

// import * as fs from 'fs';
import * as path from 'path';
import { SyncProductsUseCase } from "./features/documents/usecases/sync_product_usecase";


// export function excelDateToJSDate(excelDate: number): Date {
//     // Excel считает даты начиная с 30 декабря 1899 года

// }


export interface ExelData {
    "Дата начисления": number;
    "Тип начисления": string;
    "Номер отправления или идентификатор услуги": string;
    "Дата принятия заказа в обработку или оказания услуги": number;
    "Склад отгрузки": string;
    SKU: string;
    Артикул: string;
    "Название товара или услуги": string;
    Количество: number;
    "За продажу или возврат до вычета комиссий и услуг": number;
    "Ставка комиссии": number;
    "Комиссия за продажу": number;
    "Сборка заказа": number;
    "Обработка отправления (Drop-off/Pick-up) (разбивается по товарам пропорционально\n                    количеству в отправлении)": number;
    Магистраль: number;
    "Последняя миля (разбивается по товарам пропорционально доле цены товара в сумме\n                    отправления)": number;
    "Обратная магистраль": number;
    "Обработка возврата": number;
    "Обработка отмененного или невостребованного товара (разбивается по товарам в\n                    отправлении в одинаковой пропорции)": number;
    "Обработка невыкупленного товара": number;
    Логистика: number;
    "Индекс локализации": number | string;
    "Обратная логистика": number;
    Итого: number;
}

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

export interface WorksheetClass {
    t: T;
    v: number | string;
    h?: string;
    w?: string;
}

export enum T {
    N = "n",
    S = "s",
}

export class ReadExel {
    async call(filePath: string, outPath: string) {
        await zl.extract(filePath, outPath)
        new FindXmlFilesUseCase().call(outPath + 'xl/worksheets/').forEach((file) => fs.writeFileSync(file, decode.decode(fs.readFileSync(file, 'utf8'))))
        await zl.archiveFolder(outPath, `${outPath}target.zip`)
        fs.renameSync(`${outPath}target.zip`, `${outPath}target.xlsx`)
        const workbook = XLSX.readFile(filePath);
        return (XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames.at(0)]) as ExelData[])

    }
}


const cronProcess: CronController[] = [new SyncMarketPlacePresentation()];

 

extensions();
new App(httpRoutes, [], cronProcess).listen(async () => {

    // new BalanceReportUseCase().call(new BalanceModel(new Date('2025-02-13T00:00:00.000+00:00'), new Date('2025-02-13T00:00:00.000+00:00')))
    // new SyncProductsUseCase().call()
    // new SyncTransactionsUseCase().call(new SyncTransactionModel(new Date('2025-02-13T00:00:00.000+00:00'), new Date('2025-02-13T00:00:00.000+00:00')));
});


