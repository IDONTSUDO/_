 import * as XLSX from 'xlsx';
import * as decode from 'html-entities'
import * as zl from "zip-lib";
import * as fs from 'fs';
import { FindXmlFilesUseCase } from './find_xml_usecase';

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

export class ReadExelUseCase {
    async call(filePath: string, outPath: string) {
        await zl.extract(filePath, outPath)
        new FindXmlFilesUseCase().call(outPath + 'xl/worksheets/').forEach((file) => fs.writeFileSync(file, decode.decode(fs.readFileSync(file, 'utf8'))))
        await zl.archiveFolder(outPath, `${outPath}target.zip`)
        fs.renameSync(`${outPath}target.zip`, `${outPath}target.xlsx`)
        const workbook = XLSX.readFile(filePath);
        return (XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames.at(0)]) as ExelData[])

    }
}

