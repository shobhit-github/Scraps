export interface ISecuritySettings {
    status: number;
    phone: string;
    two_factor_auth: 0 | 1;
    banks: Array<{ type: string }>;
    plaid_ids: Array<{ id: number }>;
    banksContent?: Array<Array<IBankSettings>>;
    plaidContent?: Array<IPlaidSettings>;
}

export interface ISecuritySettingsPhone {
    phone: string;
    code: string;
    country?: string;
}

export interface IBankSettings {
    _id: string;
    _item: string;
    _user: string;
    balance: {
        available: number;
        current: number;
    };
    institution_type: string;
    meta: {
        name: string;
        number: string;
    };
    numbers: {
        routing: string;
        account: string;
        wireRouting: string;
    };
    subtype: string;
    type: string;
}

export interface ICard {
    account_id: string;
    balances: {
        available: number;
        current: number;
        iso_currency_code: string;
        limit: number;
        unofficial_currency_code: string;
    };
    mask: string;
    name: string;
    official_name: string;
    subtype: string;
    type: string;
}

export interface IPlaidSettings {
    accounts: Array<ICard>;
    item: {
        available_products: Array<string>;
        billed_products: Array<string>;
        error: any;
        institution_id: string;
        item_id: string;
        webhook: string;
    };
    numbers: {
        ach: Array<{
            account: string;
            account_id: string;
            routing: string;
            wire_routing: any;
        }>;
        eft: Array<any>;
    };
    request_id: string;
}
