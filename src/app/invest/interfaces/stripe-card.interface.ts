export interface IActiveStripeCard {
    card_id: string;
    card_brand: string;
    card_last_four: string;
    card_funding: string;
}

export class StripeCardAdapter implements IStripeCard {
    public id = '';
    public object = '';
    public address_city = '';
    public address_country = '';
    public address_line1 = '';
    public address_line1_check = '';
    public address_line2 = '';
    public address_state = '';
    public address_zip = '';
    public address_zip_check = '';
    public brand = '';
    public country = '';
    public customer = '';
    public cvc_check = '';
    public dynamic_last4 = '';
    public exp_month = 0;
    public exp_year = 0;
    public fingerprint = '';
    public funding = '';
    public last4 = '';
    public metadata: any[] = [];
    public name = '';
    public tokenization_method = '';

    constructor(config: { [key in keyof IStripeCard]?: any }) {
        Object.assign(this, config);
    }

    static fromActive(card: IActiveStripeCard): IStripeCard {
        if (card) {
            const {
                card_id: id,
                card_brand: brand,
                card_last_four: last4,
                card_funding: funding,
            } = card;
            return new StripeCardAdapter({id, brand, last4, funding});
        }
        return;
    }

    static fromStripe(card: IStripeCard): IStripeCard {
        if (card) {
            return new StripeCardAdapter({...card});
        }
        return;
    }

    static fromPlaid(card: IStripeCardPlaid): IStripeCard {
        if (card) {
            const {id, bank_name: brand, last4} = card;
            return new StripeCardAdapter({id, brand, last4});
        }
        return;
    }
}

export interface IStripeCard {
    id: string;
    object: string;
    address_city: string;
    address_country?: any;
    address_line1: string;
    address_line1_check: string;
    address_line2: string;
    address_state: string;
    address_zip: string;
    address_zip_check: string;
    brand: string;
    country: string;
    customer: string;
    cvc_check: string;
    dynamic_last4?: any;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    last4: string;
    metadata: any[];
    name: string;
    tokenization_method?: any;
}

export interface IStripeCardPlaid {
    id: string;
    object: string;
    account_holder_name?: any;
    account_holder_type?: any;
    bank_name: string;
    country: string;
    currency: string;
    customer: string;
    fingerprint: string;
    last4: string;
    metadata: any[];
    routing_number: string;
    status: string;
}

export interface ISripeInfo {
    active_card: IStripeCard;
    stripe_card_list: Array<IStripeCard>;
}

export interface IOriginSripeInfo {
    active_card: IActiveStripeCard;
    stripe_card_list: Array<IStripeCard>;
}

export interface IInvestRequest {
    amount: number;
    currency: 'usd' | 'eur';
    recurring: 0 | 1;
    minutes: number;
    paymentId: string;
    portfolioId?: string;
}
