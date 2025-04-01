export class Transaction {
    accrualType: string; //"__EMPTY_2": "Эквайринг", //Тип начисления
    accrualID: string; //"Период: 11.02.2025-11.02.2025": "77189758-0684", //ID начисления
    accrualDate: Date;   //"__EMPTY": 45699, //Дата начисления
    article: string; //   "__EMPTY_3": "26890073", //Артикул
    sum: number;  //   "__EMPTY_12": -4.3 //Сумма итого, руб
    quality: number;   //   "__EMPTY_6": 1, //Количество
    productName: string;  //   "__EMPTY_5": "Ваза Колонна цвет белый", //Название товара
    ozonSKU: string   //   "__EMPTY_4": "1657243290", //Ozon SKU
    groupOfServices: string // "__EMPTY_1": "Услуги агентов", //Группа услуг
    fromExel(exel: {
        string: string;
        __EMPTY: number;
        __EMPTY_1: string;
        __EMPTY_2: string;
        __EMPTY_3: string;
        __EMPTY_4: string;
        __EMPTY_5: string;
        __EMPTY_6: number;
        __EMPTY_7: number;
        __EMPTY_8: number;
        __EMPTY_9: string;
        __EMPTY_10: number;
        __EMPTY_11: number;
        __EMPTY_12: number;
    }
    ) {
        if (Object.values(exel).at(0) === 'ID начисления') {
            return;
        }

        this.accrualID = Object.values(exel).at(0) as any;
        this.accrualType = exel.__EMPTY_2;
        this.accrualDate = exel.__EMPTY.exelToDate();
        this.article = exel.__EMPTY_3;
        this.sum = exel.__EMPTY_12;
        this.quality = exel.__EMPTY_6;
        this.productName = exel.__EMPTY_5;
        this.ozonSKU = exel.__EMPTY_4;
        this.groupOfServices = exel.__EMPTY_1;
        return this;

    }

}