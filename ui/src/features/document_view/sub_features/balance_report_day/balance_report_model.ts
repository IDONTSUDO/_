export interface IBalanceReport {
    report: Report;
    source: Source[];
    dates: Date[];
    transactions: number;
}

export interface Report {
    ozonShouldSend: number;
    expensesMinusIncome: number;
    productionСosts: number;
}

export interface Source {
    productName: string;
    netProfit: number;
    siteBalance: number;
    quality: number;
}
 