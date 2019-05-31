export interface IAccountPersonal {
    name?: string;
    email?: string;
    birthday?: string;
    employment_id?: string;
    income_id?: string;
}

export interface INewAccountPersonal {
    name?: string;
    email?: string;
    birthday?: string;
    employment?: {
        id: number;
        name: string;
    };
    income?: {
        id: number;
        name: string;
    };
}

export interface IAccountAddress {
    id: number;
    user_id: number;
    street: string;
    city: string;
    country: string;
    code: string;
}

export interface IAccountPreference {
    id: number;
    user_id: number;
    timezone: string;
    currency: string;
}

export interface IAccountSettings {
    personal: IAccountPersonal;
    address: IAccountAddress;
    preference: IAccountPreference;
}

export interface INewAccountSettings {
    personal: INewAccountPersonal;
    address: IAccountAddress;
    preference: IAccountPreference;
}
