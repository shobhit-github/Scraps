import {Moment} from 'moment';

export interface IIco {
    id?: string;
    slug?: string;
    timestamp?: string;
    email: string;
    ico: string;
    project: string;
    contact: string;
    logo: string;
    start_date: string | Moment;
    end_date: string | Moment;
    pre_ico_start: string | Moment;
    pre_ico_end: string | Moment;
    website: string;
    whitepaper: string;
    telegram: string;
    twitter: string;
    facebook: string;
    bitcointalk: string;
    description: string;
    line_description: string;
    link_team: string;
    video_link: string;
    ico_soft_cap: string;
    ico_hard_cap: string;
    token_symbol: string;
    token_type: string;
    token_prices: string;
    customer: number;
    intend: number;
    accept_currencies: string;
    restricted_countries: string;
    ico_location: string;
    isNew?: boolean;
}

export interface ITabsLinks {
    link?: string;
    hint: string;
}
