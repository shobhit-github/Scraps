import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {filter, map, share, startWith} from 'rxjs/operators';
import {
    SetPortfolio,
    LoadPortfolioList,
} from 'src/app/portfolio/actions/portfolio.actions';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {IRoundUpRecurring} from 'src/app/round-ups/interfaces/round-up-recurring.interface';
import * as fromRoundUps from 'src/app/round-ups/reducers/round-ups.reducer';
import * as fromPortfolio from 'src/app/portfolio/reducers/portfolio.reducer';

import {
    Invest,
    LoadCurrency,
    LoadFee,
    LoadPayments,
    LoadTotal,
    LoadTotalSuccess,
    SetPayment,
} from '../../actions/invest.actions';
import {ICurrencyData} from '../../interfaces/currency.interface';
import {
    IInvestRequest,
    IStripeCard,
} from '../../interfaces/stripe-card.interface';
import {ITotal} from '../../interfaces/total.interface';
import * as fromStore from '../../reducers/invest.reducer';
import {InvestService} from '../../services/invest.service';
import {IPortfolioRequest} from 'src/app/portfolio/interfaces/request.interface';

@Component({
    selector: 'app-sell-container',
    templateUrl: './sell-container.component.html',
    styleUrls: ['./sell-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellContainerComponent implements OnInit, OnDestroy {
    public content = {
        introTitle: 'YOU ARE SELLING',
        outroTitle: `FROM your Skraps PORTFOLIO`,
    };

    public submit$ = new BehaviorSubject<number>(0);

    public payment$: Observable<IStripeCard>;
    public paymentList$: Observable<Array<IStripeCard>>;

    public total$: Observable<ITotal>;
    public currency$: Observable<ICurrencyData>;
    public data$: Observable<IPortfolioRequest>;

    public recurring$: Observable<IRoundUpRecurring>;
    public isRecurring$: Observable<boolean>;

    public periodList: Array<'day' | 'week' | 'year'> = ['day', 'week', 'year'];
    public period$: Observable<'day' | 'week' | 'year'>;

    public portfolio$: Observable<IPortfolio>;
    public portfolioList$: Observable<Array<IPortfolio>>;

    public form: FormGroup;
    public fee$: Observable<number>;
    public amount$: Observable<number>;
    private subscriptionList: Array<Subscription> = [];

    public isErr$: Observable<boolean>;
    public isPending$: Observable<boolean>;

    constructor(
        private store: Store<fromStore.State>,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private investService: InvestService,
    ) {
        this.store.dispatch(new LoadPayments());
        this.store.dispatch(new LoadPortfolioList());
        this.store.dispatch(new LoadFee());
        this.store.dispatch(new LoadTotal());
        this.store.dispatch(new LoadCurrency());

        this.recurring$ = this.store.pipe(select(fromRoundUps.getRecurring));
        this.paymentList$ = this.store.pipe(select(fromStore.getPaymentList));
        this.payment$ = this.store.pipe(select(fromStore.getPayment));
        this.total$ = this.store.pipe(select(fromStore.getTotal));
        this.currency$ = this.store.pipe(select(fromStore.getCurrency));
        this.fee$ = this.store.pipe(select(fromStore.getFee));
        this.portfolio$ = this.store.pipe(select(fromPortfolio.getPortfolio));
        this.portfolioList$ = this.store.pipe(
            select(fromPortfolio.getPortfolioList),
        );

        this.form = this.fb.group({
            period: [this.periodList[1]],
            isRecurring: [false],
        });

        this.isRecurring$ = this.form.controls.isRecurring.valueChanges.pipe(
            startWith(this.form.get('isRecurring').value),
        );
        this.period$ = this.form.controls.period.valueChanges.pipe(
            startWith(this.form.get('period').value),
        );

        this.amount$ = this.investService.getAmount('sell');

        this.subscriptionList.push(
            combineLatest(this.fee$, this.amount$).subscribe(([fee, amount]) =>
                this.store.dispatch(
                    new LoadTotalSuccess(this.investService.calcTotal(amount, fee)),
                ),
            ),
        );

        this.isErr$ = this.investService.errors$.pipe(
            map(({sell_amount, sell_payment}) => sell_amount || sell_payment),
        );
        this.isPending$ = this.investService.pending$.pipe(map(({sell}) => sell));
        this.data$ = this.investService.getDataSell({
            portfolio$: this.portfolio$.pipe(share()),
            payment$: this.payment$.pipe(share()),
            submit$: this.submit$.pipe(share()),
        });
        this.subscriptionList.push(
            this.data$.pipe(filter(data => !!data)).subscribe(data => {
                // this.store.dispatch(new Sell(data));
                this.submit$.next(0);
                this.setAmount(0);
                console.log('set amount');
            }),
        );
    }

    public ngOnInit() {
        this.subscriptionList.push(
            this.recurring$.subscribe((rec: IRoundUpRecurring) => {
                if (rec && rec.sum > 0) {
                    this.setAmount(rec.sum);
                    this.form.get('period').setValue(rec.period);
                    this.form.get('isRecurring').setValue(true);
                }
                this.cd.detectChanges();
            }),
        );
    }

    public ngOnDestroy() {
        this.subscriptionList.forEach(subscription => subscription.unsubscribe());
    }

    public setPortfolio(value: IPortfolio) {
        this.store.dispatch(new SetPortfolio(value));
    }

    public setPayment(value: IStripeCard) {
        this.store.dispatch(new SetPayment(value));
    }

    onSubmit() {
        this.submit$.next(this.submit$.getValue() + 1);
    }

    setAmount(amount: number) {
        this.investService.setAmount(amount, 'sell');
    }
}
