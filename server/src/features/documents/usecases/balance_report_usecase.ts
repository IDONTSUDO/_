import { toBeginDate, toEndDate } from "../../../core/extensions/date";
import { Result } from "../../../core/helpers/result";
import { ProductDBModel } from "../../products/product_database_model";
import { TransactionDBModel } from "../../sync_marketplace_transactions/trasaction_database_model";
import { BalanceModel } from "../model/balance_model";

interface BalanceReport {
    [name: string]: { siteBalance: number, quality: number, productName: string, netProfit: number };
}
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
export class BalanceReportUseCase {
    call = async (balanceModel: BalanceModel): Promise<Result<void, any>> => {
        const documents = await TransactionDBModel.find({
            date: {
                $gte: toBeginDate(new Date(formatDate(balanceModel.beginReportDate))),
                $lte: toEndDate(new Date(formatDate(balanceModel.endReportDate)))
            }
        });

        const result: BalanceReport = {}

        documents.forEach((el) => {
            if (el.skuProduct === '') {

                if (result['общие расходы'] === undefined) {
                    result['общие расходы'] = {
                        siteBalance: el.amount,
                        netProfit: 0,
                        productName: '',
                        quality: el.nameOfProductOrService === 'Продажи' ? el.quality : 0,
                    }
                } else {
                    result['общие расходы'].siteBalance += el.amount;
                    if (el.nameOfProductOrService === 'Продажи') {
                        result[el.skuProduct].quality += el.quality;
                    }
                }
                return;
            }
            if (result[el.skuProduct] === undefined) {
                result[el.skuProduct] = {
                    productName: '',
                    netProfit: 0,
                    siteBalance: el.amount,
                    quality: el.nameOfProductOrService === 'Продажи' ? el.quality : 0,
                }
            } else {
                result[el.skuProduct].siteBalance += el.amount;
                if (el.nameOfProductOrService === 'Продажи') {
                    result[el.skuProduct].quality += el.quality;
                }
            }

        })


        await Promise.all(Object.entries(result).map(async ([k, v]) => {
            if (k === 'общие расходы') {
                return;
            } else {
                const r = await ProductDBModel.findOne({ sku: Number(k) });
                if (r !== null) {
                    result[k].productName = r.name;
                    result[k].netProfit = v.quality * r.costPrice;
                }
            }
        }));





        let ozonShouldSend = 0;
        let productionСosts = 0;
        Object.entries(result).forEach(([_, v]) => {
            ozonShouldSend += v.siteBalance
            productionСosts += v.netProfit;
        })

        const report = {
            'ozonShouldSend': ozonShouldSend,
            'expensesMinusIncome': ozonShouldSend - productionСosts,
            'productionСosts': productionСosts,
        }

        return Result.ok({
            report: report,
            source: Object.entries(result).map(([_, v]) => v),
            dates: [toBeginDate(new Date(formatDate(balanceModel.beginReportDate))), toEndDate(new Date(formatDate(balanceModel.endReportDate)))],
            transactions: documents.length,
        })
    }
}
export class SyncDayBalance {
    call = async (dateStr: string): Promise<Result<void, BalanceReport>> => {
        const resultDateCheck: Date[] = []
        const date = new Date(dateStr);
        const daysSync = [{ day: 'воскресенье', days: null, }, { day: 'понедельник', days: 4, }, { day: 'суббота', days: null, }, { day: 'пятница', days: null, }, { day: 'вторник', days: 1, }, { day: "среда", days: 1, }, { day: 'четверг', days: 1 }].find((el) => el.day === ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'][date.getDay()])
        if (daysSync.days === null) {
            // TODO:
            return;
        }

        for (let i = 0; i < daysSync.days; i++) {
            const dateCheck = new Date(date);
            dateCheck.setDate(dateCheck.getDate() - 1);
            resultDateCheck.push(dateCheck)
        }

        return (await new BalanceReportUseCase().call(new BalanceModel(resultDateCheck.at(0), resultDateCheck.at(resultDateCheck.length - 1))))

    }
}
