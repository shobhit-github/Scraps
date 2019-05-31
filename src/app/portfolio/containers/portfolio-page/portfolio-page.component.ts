import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    Subscription,
} from 'rxjs';
import {filter, map, share, take, tap} from 'rxjs/operators';
import {
    LoadCurrency,
    LoadFee,
    LoadTotal,
    LoadTotalSuccess,
    SetPayment,
    LoadPayments,
} from 'src/app/invest/actions/invest.actions';
import {ICurrencyData} from 'src/app/invest/interfaces/currency.interface';
import {
    IStripeCard,
} from 'src/app/invest/interfaces/stripe-card.interface';
import {ITotal} from 'src/app/invest/interfaces/total.interface';
import {
    getCurrency,
    getFee,
    getTotal,
    getPayment,
    getPaymentList,
} from 'src/app/invest/reducers/invest.reducer';
import {InvestService} from 'src/app/invest/services/invest.service';

import {
    InvestPortfolio,
    LoadPortfolioList,
    SetPortfolio,
    LoadPortfolio,
} from '../../actions/portfolio.actions';
import {IPortfolio} from '../../interfaces/portfolio';
import {IPortfolioRequest} from '../../interfaces/request.interface';
import * as fromStore from '../../reducers/portfolio.reducer';
import * as fromStoreDashboard from '../../../dashboard/reducers';
import {CurveFactory, curveMonotoneX} from 'd3-shape';
import {IPerformanceFilter} from '../../../dashboard/interfaces/dashboard-service';
import {Init, SetFilter} from '../../../dashboard/actions/performance.actions';
import {IFullChartData} from '../../../core/interfaces/chart.interface';

export enum ETabStatus {
    overview,
    breakdown,
}

@Component({
    selector: 'app-portfolio-page',
    templateUrl: './portfolio-page.component.html',
    styleUrls: ['./portfolio-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent implements OnDestroy {
    public portfolio$: Observable<IPortfolio>;
    public portfolioList$: Observable<Array<IPortfolio>>;
    public payment$: Observable<IStripeCard>;
    public paymentList$: Observable<Array<IStripeCard>>;
    public total$: Observable<ITotal>;
    public currency$: Observable<ICurrencyData>;
    private subscriptionList: Array<Subscription> = [];
    public ETabStatus = ETabStatus;
    public tabStatus: ETabStatus = ETabStatus.overview;
    private subscription: Subscription;
    public fee$: Observable<number>;
    public isErr$: Observable<boolean>;
    public isPending$: Observable<boolean>;
    public amount$: Observable<number>;
    public submit$ = new BehaviorSubject<number>(0);
    public data$: Observable<IPortfolioRequest>;
    public curve: CurveFactory = curveMonotoneX;
    public filter$: Observable<IPerformanceFilter>;
    private init$: Observable<IPerformanceFilter>;
    private sub: Subscription;
    public chartData$: Observable<Array<IFullChartData>>;
    public filterName = '7D';

    constructor(
        private store: Store<fromStore.State>,
        private investService: InvestService,
    ) {
        this.store.dispatch(new LoadPortfolioList());
        this.store.dispatch(new LoadPortfolio());
        this.store.dispatch(new LoadFee());
        this.store.dispatch(new LoadPayments());
        this.store.dispatch(new LoadTotal());
        this.store.dispatch(new LoadCurrency());

        this.portfolio$ = this.store.pipe(select(fromStore.getPortfolio));
        this.portfolioList$ = this.store.pipe(select(fromStore.getPortfolioList));
        this.payment$ = this.store.pipe(select(getPayment));
        this.paymentList$ = this.store.pipe(select(getPaymentList));
        this.total$ = this.store.pipe(select(getTotal));
        this.currency$ = this.store.pipe(select(getCurrency));
        this.fee$ = this.store.pipe(select(getFee));
        this.amount$ = this.investService.getAmount('portfolio');
        this.chartData$ = this.store.pipe(select(fromStoreDashboard.getChartData));
        this.filter$ = this.store.pipe(select(fromStoreDashboard.getFilter));
        this.init$ = this.filter$.pipe(
            take(1),
            tap(filter => this.store.dispatch(new Init(filter))),
        );
        this.sub = this.init$.subscribe();
        this.subscriptionList.push(
            combineLatest(this.fee$, this.amount$).subscribe(([fee, amount]) =>
                this.store.dispatch(
                    new LoadTotalSuccess(this.investService.calcTotal(amount, fee)),
                ),
            ),
        );
        this.isErr$ = this.investService.errors$.pipe(
            map(
                ({portfolio_payment, portfolio}) =>
                    portfolio_payment || portfolio,
            ),
        );
        this.isPending$ = this.investService.pending$.pipe(
            map(({portfolio}) => portfolio),
        );
        this.data$ = this.investService.getDataPortfolio({
            portfolio$: this.portfolio$.pipe(share()),
            payment$: this.payment$.pipe(share()),
            submit$: this.submit$.pipe(share()),
        });
        this.subscriptionList.push(
            this.data$.pipe(filter(data => !!data)).subscribe(data => {
                this.store.dispatch(new InvestPortfolio(data));
                this.submit$.next(0);
                this.setAmount(0);
                console.log('set amount');
            }),
        );
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public setAmount(value: number) {
        this.investService.setAmount(value, 'portfolio');
    }

    public setPortfolio(value: IPortfolio) {
        this.store.dispatch(new SetPortfolio(value));
    }

    public setPayment(value: IStripeCard) {
        this.store.dispatch(new SetPayment(value));
    }

    public investPortfolio() {
        this.submit$.next(this.submit$.getValue() + 1);
    }

    public setFilter(filter: IPerformanceFilter) {
        this.filterName = filter.period;
        this.store.dispatch(new SetFilter(filter));
    }
}
