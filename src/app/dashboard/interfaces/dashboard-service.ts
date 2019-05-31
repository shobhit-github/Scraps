import {Observable} from 'rxjs';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {
    IFullChartData,
} from 'src/app/core/interfaces/chart.interface';

export enum EPeriodFilter {
    hour = '1H',
    day = '1D',
    week = '7D',
    month = '1M',
    year = '1Y',
}

export interface IPercentAndCurrency {
    percent: number;
    currency: number;
}

export interface IPortfolioBalance {
    symbol: string;
    total: number;
    changeTo: IPercentAndCurrency;
}

export interface IPerformanceItem {
    id: string;
    name: string;
    symbol: string;
    value: IPercentAndCurrency;
}

export interface IStatisticItem {
    value: number;
    increase?: boolean;
}

export interface IPerformanceFilter {
    type: string;
    period?: EPeriodFilter;
    time?: number;
}

export interface IActiveUserPortfolio {
    balance: number;
}

export interface IDashboardService {
    getBallance(): Observable<IPortfolioBalance>;

    getAssetBallance(): Observable<IPortfolio>;

    getPerformance(): Observable<Array<IPerformanceItem>>;

    getStatistic(meta: IPerformanceFilter): Observable<Array<IStatisticItem>>;

    getChartData(meta: IPerformanceFilter): Observable<Array<IFullChartData>>;

    getReportLink(): Observable<string>;

    getWalletLink(): Observable<string>;
}
