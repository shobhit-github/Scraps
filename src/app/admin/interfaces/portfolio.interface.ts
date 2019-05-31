import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';

export interface IPortfolioOption {
    coin_id: string;
    option_id?: string;
    value: string;
    isNew?: boolean;
}

export interface IPortfolioAdmin {
    id?: string;
    package_name: string;
    risk_name: string;
    suggest: number;
    risk_value: number;
    options: IPortfolioOption[];
    isNew?: boolean;
}
