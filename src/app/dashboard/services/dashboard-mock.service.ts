import {Injectable} from '@angular/core';
import {
    IDashboardService,
    IPortfolioBalance,
    IPerformanceItem,
    IStatisticItem,
    IPerformanceFilter,
    IActiveUserPortfolio,
} from '../interfaces/dashboard-service';
import {Observable, of} from 'rxjs';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {
    IFullChartData,
} from 'src/app/core/interfaces/chart.interface';
import {map, pluck} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export class BalanceAdapter implements IPortfolioBalance {
    constructor(
        public total = 0,
        public symbol = '$',
        public changeTo = {
            percent: 0,
            currency: 0,
        },
    ) {
    }
}

@Injectable()
export class DashboardMockService implements IDashboardService {
    constructor(private http: HttpClient) {
    }

    // TODO: move to real service
    getBallance(): Observable<IPortfolioBalance> {
        return this.http.get(`${environment.baseUrl}/checkout/stripe/user-portfolio-balance`)
            .pipe(
                map((data: IActiveUserPortfolio) => (new BalanceAdapter(data.balance))),
            )
            ;
    }

    getAssetBallance(): Observable<IPortfolio> {
        return this.http.get(`${environment.baseUrl}/checkout/asset/balance`)
            .pipe(pluck('data'));
    }

    getPerformance(): Observable<Array<IPerformanceItem>> {
        return this.http.get(`${environment.baseUrl}/performance/coin/rates`).pipe(pluck('data'));
    }

    getStatistic(data): Observable<Array<IStatisticItem>> {
        return this.http.get(`${environment.baseUrl}/portfolio/graph/index?minutes=${data.time}`)
            .pipe(
                pluck('data'),
            );
    }

    getChartData(meta: IPerformanceFilter): Observable<Array<IFullChartData>> {
        return of([
            {
                name: `gain/loss`,
                series: Array(14)
                    .fill(undefined)
                    .map((item, i) => ({
                        name: `${i}`,
                        value: Math.round(Math.random() * 0),
                    })),
            },
        ]);
    }

    getReportLink(): Observable<string> {
        return of('/report');
    }

    getWalletLink(): Observable<string> {
        return of('/wallet');
    }
}
