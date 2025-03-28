

export interface ProductMonthReport {
    header: Header;
    rows: Row[];
}

export interface Header {
    contract_date: string;
    contract_number: string;
    currency_sys_name: string;
    doc_amount: number;
    doc_date: string;
    number: string;
    payer_inn: string;
    payer_kpp: string;
    payer_name: string;
    receiver_inn: string;
    receiver_kpp: string;
    receiver_name: string;
    start_date: string;
    stop_date: string;
    vat_amount: number;
}

export interface Row {
    commission_ratio: number;
    delivery_commission: Commission;
    item: Item;
    return_commission: Commission;
    rowNumber: number;
    seller_price_per_instance: number;
}

export interface Commission {
    amount: number;
    bonus: number;
    commission: number;
    compensation: number;
    price_per_instance: number;
    quantity: number;
    standard_fee: number;
    bank_coinvestment: number;
    stars: number;
    pick_up_point_coinvestment: number;
    total: number;
}

export interface Item {
    barcode: string;
    name: string;
    offer_id: string;
    sku: number;
}
