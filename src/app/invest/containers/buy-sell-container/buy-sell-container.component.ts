// import {
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   OnDestroy,
//   OnInit,
// } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { select, Store } from '@ngrx/store';
// import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
// import { filter, startWith, tap, share } from 'rxjs/operators';
// import {
//   LoadCurrency,
//   LoadTotal,
//   LoadTotalSuccess,
//   SetPayment,
//   SetPortfolio,
//   LoadPortfolioList,
//   LoadPortfolio,
// } from 'src/app/portfolio/actions/portfolio.actions';
// import { IPortfolio } from 'src/app/portfolio/interfaces/portfolio';
// import * as fromPortfolio from 'src/app/portfolio/reducers/portfolio.reducer';
// import { IRoundUpRecurring } from 'src/app/round-ups/interfaces/round-up-recurring.interface';
// import * as fromRoundUps from 'src/app/round-ups/reducers/round-ups.reducer';
// import { ICard } from 'src/app/settings/interfaces/security.interfaces';

// import { Invest, LoadPayments } from '../../actions/invest.actions';
// import {
//   IInvestRequest,
//   IStripeCard,
// } from '../../interfaces/stripe-card.interface';
// import * as fromStore from '../../reducers/invest.reducer';
// import { InvestService, BuySell } from '../../services/invest.service';

// @Component({
//   selector: 'app-buy-sell-container',
//   templateUrl: './buy-sell-container.component.html',
//   styleUrls: ['./buy-sell-container.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class BuySellContainerComponent implements OnInit, OnDestroy {
//   public buyContent = {
//     introTitle: 'YOU ARE BUYING',
//     outroTitle: `FOR your Skraps Account`,
//   };
//   public sellContent = {
//     introTitle: 'YOU ARE SELLING',
//     outroTitle: `FROM your Skraps PORTFOLIO`,
//   };

//   public content = this.buyContent;
//   public activeIndex = 0;

//   public submit$ = new BehaviorSubject<number>(0);

//   public payment$: Observable<IStripeCard>;
//   public paymentList$: Observable<Array<IStripeCard>>;

//   public total$: Observable<fromPortfolio.ITotal>;
//   public currency$: Observable<fromPortfolio.ICurrencyData>;
//   public dataBuy$: Observable<IInvestRequest>;

//   public recurring$: Observable<IRoundUpRecurring>;
//   public isRecurring$: Observable<boolean>;

//   public periodList: Array<'day' | 'week' | 'year'> = ['day', 'week', 'year'];
//   public period$: Observable<'day' | 'week' | 'year'>;

//   public portfolio$: Observable<IPortfolio>;
//   public portfolioList$: Observable<Array<IPortfolio>>;

//   public form: FormGroup;
//   public amountBuy$: Observable<number>;
//   public amountSell$: Observable<number>;
//   private subscriptionList: Array<Subscription> = [];

//   constructor(
//     private store: Store<fromStore.State>,
//     private fb: FormBuilder,
//     private roundUpsStore: Store<fromRoundUps.State>,
//     private cd: ChangeDetectorRef,
//     private investService: InvestService,
//   ) {
//     this.store.dispatch(new LoadPortfolioList());
//     this.store.dispatch(new LoadPortfolio());
//     this.store.dispatch(new LoadPayments());
//     this.store.dispatch(new LoadTotal());
//     this.store.dispatch(new LoadCurrency());

//     this.recurring$ = this.roundUpsStore.pipe(
//       select(fromRoundUps.getRecurring),
//     );
//     this.portfolio$ = this.store.pipe(select(fromPortfolio.getPortfolio));
//     this.portfolioList$ = this.store.pipe(
//       select(fromPortfolio.getPortfolioList),
//     );
//     this.paymentList$ = this.store.pipe(select(fromStore.getPaymentList));
//     this.payment$ = this.store.pipe(select(fromStore.getPayment));
//     this.total$ = this.store.pipe(select(fromPortfolio.getTotal));
//     this.currency$ = this.store.pipe(select(fromPortfolio.getCurrency));

//     this.form = this.fb.group({
//       period: [this.periodList[1]],
//       isRecurring: [false],
//     });

//     this.isRecurring$ = this.form.controls.isRecurring.valueChanges.pipe(
//       startWith(this.form.get('isRecurring').value),
//     );
//     this.period$ = this.form.controls.period.valueChanges.pipe(
//       startWith(this.form.get('period').value),
//     );

//     // this.amountBuy$ = this.investService
//     //   .getAmount('buy')
//     //   .pipe(
//     //     tap(amount =>
//     //       this.store.dispatch(
//     //         new LoadTotalSuccess(this.investService.calcTotal(amount)),
//     //       ),
//     //     ),
//     //   );
//     // this.amountSell$ = this.investService
//     //   .getAmount('sell')
//     //   .pipe(
//     //     tap(amount =>
//     //       this.store.dispatch(
//     //         new LoadTotalSuccess(this.investService.calcTotal(amount)),
//     //       ),
//     //     ),
//     //   );
//     this.dataBuy$ = this.investService.getDataBuy({
//       payment$: this.payment$.pipe(share()),
//       isRecurring$: this.isRecurring$.pipe(share()),
//       period$: this.period$.pipe(share()),
//       submit$: this.submit$.pipe(share()),
//     });
//     this.subscriptionList.push(
//       this.dataBuy$
//         .pipe(filter(data => !!data))
//         .subscribe(data => this.store.dispatch(new Invest(data))),
//     );
//   }
//   public ngOnInit() {
//     this.subscriptionList.push(
//       this.recurring$.subscribe((rec: IRoundUpRecurring) => {
//         if (rec && rec.sum > 0) {
//           this.setAmount(rec.sum, 'buy');
//           this.form.get('period').setValue(rec.period);
//           this.form.get('isRecurring').setValue(true);
//         } else {
//           this.setAmount(500, 'buy');
//         }
//         this.cd.detectChanges();
//       }),
//     );
//   }
//   public ngOnDestroy() {
//     this.subscriptionList.forEach(subscription => subscription.unsubscribe());
//   }

//   public setPortfolio(value: IPortfolio) {
//     this.store.dispatch(new SetPortfolio(value));
//   }
//   public setPayment(value: ICard) {
//     this.store.dispatch(new SetPayment(value));
//   }

//   onSubmit() {
//     this.submit$.next(this.submit$.getValue() + 1);
//   }
//   setActiveIndex(index: number): void {
//     this.activeIndex = index;
//     this.content = index === 0 ? this.buyContent : this.sellContent;
//   }
//   setAmount(amount: number, type: BuySell) {
//     this.investService.setAmount(amount, type);
//   }
// }
