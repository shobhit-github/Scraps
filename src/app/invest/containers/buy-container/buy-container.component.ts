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
import {IRoundUpRecurring} from 'src/app/round-ups/interfaces/round-up-recurring.interface';
import * as fromRoundUps from 'src/app/round-ups/reducers/round-ups.reducer';

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

@Component({
    selector: 'app-buy-container',
    templateUrl: './buy-container.component.html',
    styleUrls: ['./buy-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyContainerComponent implements OnInit, OnDestroy {
    public content = {
        introTitle: 'YOU ARE BUYING',
        outroTitle: `FOR your Skraps Account`,
    };

    public submit$ = new BehaviorSubject<number>(0);

    public payment$: Observable<IStripeCard>;
    public paymentList$: Observable<Array<IStripeCard>>;

    public total$: Observable<ITotal>;
    public currency$: Observable<ICurrencyData>;
    public data$: Observable<IInvestRequest>;

    public recurring$: Observable<IRoundUpRecurring>;
    public isRecurring$: Observable<boolean>;

    public periodList: Array<'day' | 'week' | 'year'> = ['day', 'week', 'year'];
    public period$: Observable<'day' | 'week' | 'year'>;

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
        this.store.dispatch(new LoadFee());
        this.store.dispatch(new LoadTotal());
        this.store.dispatch(new LoadCurrency());

        this.recurring$ = this.store.pipe(
            select(fromRoundUps.getRecurring),
        );
        this.paymentList$ = this.store.pipe(select(fromStore.getPaymentList));
        this.payment$ = this.store.pipe(select(fromStore.getPayment));
        this.total$ = this.store.pipe(select(fromStore.getTotal));
        this.currency$ = this.store.pipe(select(fromStore.getCurrency));
        this.fee$ = this.store.pipe(select(fromStore.getFee));

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

        this.amount$ = this.investService.getAmount('buy');

        this.subscriptionList.push(
            combineLatest(this.fee$, this.amount$).subscribe(([fee, amount]) =>
                this.store.dispatch(
                    new LoadTotalSuccess(this.investService.calcTotal(amount, fee)),
                ),
            ),
        );

        this.isErr$ = this.investService.errors$.pipe(
            map(({buy_amount, buy_payment}) => buy_amount || buy_payment),
        );
        this.isPending$ = this.investService.pending$.pipe(map(({buy}) => buy));
        this.data$ = this.investService.getDataBuy({
            payment$: this.payment$.pipe(share()),
            isRecurring$: this.isRecurring$.pipe(share()),
            period$: this.period$.pipe(share()),
            submit$: this.submit$.pipe(share()),
        });
        this.subscriptionList.push(
            this.data$.pipe(filter(data => !!data)).subscribe(data => {
                this.store.dispatch(new Invest(data));
                this.submit$.next(0);
                this.setAmount(0);
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

    public setPayment(value: IStripeCard) {
        this.store.dispatch(new SetPayment(value));
    }

    onSubmit() {
        this.submit$.next(this.submit$.getValue() + 1);
    }

    setAmount(amount: number) {
        this.investService.setAmount(amount, 'buy');
    }
}
