export interface IBalance {
    available: number;
    current: number;
    iso_currency_code: string;
    limit?: any;
    unofficial_currency_code?: any;
}

export interface IAccount {
    account_id: string;
    balances: IBalance;
    mask: string;
    name: string;
    official_name?: any;
    subtype: string;
    type: string;
}

export interface IItem {
    available_products: string[];
    billed_products: string[];
    error?: any;
    institution_id: string;
    item_id: string;
    webhook: string;
}

export interface ILocation {
    address?: any;
    city?: any;
    lat?: any;
    lon?: any;
    state?: any;
    store_number?: any;
    zip?: any;
}

export interface IPaymentMeta {
    by_order_of?: any;
    payee?: any;
    payer?: any;
    payment_method?: any;
    payment_processor?: any;
    ppd_id?: any;
    reason?: any;
    reference_number?: any;
}

export interface ITransaction {
    different: number;
    account_id: string;
    account_owner?: any;
    amount: number;
    category: string[];
    category_id: string;
    date: string;
    iso_currency_code: string;
    location: ILocation;
    name: string;
    payment_meta: IPaymentMeta;
    pending: boolean;
    pending_transaction_id?: any;
    transaction_id: string;
    transaction_type: string;
    unofficial_currency_code?: any;
}

export interface IPlaidTransactions {
    accounts: IAccount[];
    item: IItem;
    request_id: string;
    total_transactions: number;
    transactions: ITransaction[];
}
