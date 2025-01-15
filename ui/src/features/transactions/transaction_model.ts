import { ValidationModel } from "../../core/model/validation_model";

export class TransactionModel extends ValidationModel implements ITransaction {
    _id: string;
    skuProduct: number[];
    isApply: boolean;
    unixDate: number;
    amount: number;
    operationId: number;
    storeId: string;
    operationType: string;
    origin: Origin;
    productName: string;
    date: Date;
    __v: number;
    static empty = () => new TransactionModel();
    toTable = () => { }
}
export interface ITransaction {
    _id: string;
    skuProduct: number[];
    isApply: boolean;
    unixDate: number;
    amount: number;
    operationId: number;
    storeId: string;
    operationType: string;
    origin: Origin;
    productName: string;
    date: Date;
    __v: number;
}

export interface Origin {
    operation_id: number;
    operation_type: string;
    operation_date: Date;
    operation_type_name: string;
    delivery_charge: number;
    return_delivery_charge: number;
    accruals_for_sale: number;
    sale_commission: number;
    amount: number;
    type: string;
    posting: Posting;
    items: Item[];
    services: Service[];
}

export interface Item {
    name: string;
    sku: number;
}

export interface Posting {
    delivery_schema: string;
    order_date: Date;
    posting_number: string;
    warehouse_id: number;
}

export interface Service {
    name: string;
    price: number;
}
