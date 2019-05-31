import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    IDashboardService,
    IPortfolioBalance,
    IPerformanceItem,
    IPerformanceFilter,
    IStatisticItem,
} from '../interfaces/dashboard-service';
import {Observable} from 'rxjs';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {IFullChartData} from 'src/app/core/interfaces/chart.interface';

@Injectable({
    providedIn: 'root',
})
export class DashboardService implements IDashboardService {
    getBallance(): Observable<IPortfolioBalance> {
        throw new Error('Method not implemented.');
    }

    getAssetBallance(): Observable<IPortfolio> {
        throw new Error('Method not implemented.');
    }

    getPerformance(): Observable<Array<IPerformanceItem>> {
        throw new Error('Method not implemented.');
    }

    getStatistic(meta: IPerformanceFilter): Observable<Array<IStatisticItem>> {
        throw new Error('Method not implemented.');
    }

    getChartData(meta: IPerformanceFilter): Observable<Array<IFullChartData>> {
        throw new Error('Method not implemented.');
    }

    getReportLink(): Observable<string> {
        throw new Error('Method not implemented.');
    }

    getWalletLink(): Observable<string> {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient) {
    }
}
