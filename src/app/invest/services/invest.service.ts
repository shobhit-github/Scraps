import {Injectable} from '@angular/core';
import {
    Observable,
    throwError,
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import {pluck, map, catchError, share, tap} from 'rxjs/operators';
import {
    ISripeInfo,
    IOriginSripeInfo,
    StripeCardAdapter,
    IInvestRequest,
    IStripeCard,
} from '../interfaces/stripe-card.interface';
import {ITotal} from '../interfaces/total.interface';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';
import {IPortfolioRequest} from 'src/app/portfolio/interfaces/request.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

export type InvestError =
    | 'buy_amount'
    | 'buy_payment'
    | 'sell_payment'
    | 'sell_amount'
    | 'portfolio'
    | 'portfolio_payment'
    | 'portfolio_amount';

export type BuySell = 'buy' | 'sell' | 'portfolio';

// TODO: refactor submit, make it not number
@Injectable({
    providedIn: 'root',
})
export class InvestService {
    private amount_buy$ = new BehaviorSubject<number>(0);
    private amount_sell$ = new BehaviorSubject<number>(0);
    private amount_portfolio$ = new BehaviorSubject<number>(0);
    private _errors$ = new BehaviorSubject<{ [key in InvestError]: boolean }>({
        buy_amount: true,
        sell_amount: true,
        buy_payment: false,
        sell_payment: false,
        portfolio: false,
        portfolio_payment: false,
        portfolio_amount: true,
    });
    private _pending$ = new BehaviorSubject<{ [key in BuySell]: boolean }>({
        buy: false,
        sell: false,
        portfolio: false,
    });

    public get errors$() {
        return this._errors$.asObservable().pipe(share());
    }

    public get pending$() {
        return this._pending$.asObservable().pipe(share());
    }

    public data_buy$: Observable<IInvestRequest>;

    constructor(private http: HttpClient) {
    }

    public getFee(): Observable<number> {
        return this.http.get(`${environment.baseUrl}/checkout/stripe/skraps-fee`).pipe(
            pluck('data', 'value'),
            map((feePercent: number) => feePercent / 100),
        );
    }

    public getAmount(type: BuySell): Observable<number> {
        return this[`amount_${type}$`].asObservable();
    }

    public getDataBuy({
                          payment$,
                          isRecurring$,
                          period$,
                          submit$,
                      }: {
        payment$: Observable<IStripeCard>;
        isRecurring$: Observable<boolean>;
        period$: Observable<'day' | 'week' | 'year'>;
        submit$: Observable<number>;
    }): Observable<IInvestRequest> {
        return combineLatest(
            payment$,
            isRecurring$,
            period$,
            this.getAmount('buy'),
            submit$,
            (payment, isRecurring, period, amount, submit): IInvestRequest => {
                this._errors$.next({
                    ...this._errors$.getValue(),
                    buy_payment: !payment,
                });

                let minutes = 0;
                // FIXME: for tests changed periods
                switch (period) {
                    case 'day':
                        minutes = 1;
                        // minutes = 60 * 24;
                        break;
                    case 'week':
                        minutes = 5;
                        // minutes = 60 * 24 * 7;
                        break;
                    case 'year':
                        minutes = 10;
                        // minutes = 60 * 24 * 365;
                        break;
                }
                if (!payment || !submit) {
                    return;
                }

                const req: IInvestRequest = {
                    paymentId: payment.id,
                    amount,
                    currency: 'usd',
                    recurring: <0 | 1>Number(isRecurring),
                    minutes,
                };

                return req;
            },
        );
    }

    public getDataPortfolio({
                                payment$,
                                portfolio$,
                                submit$,
                            }: {
        payment$: Observable<IStripeCard>;
        portfolio$: Observable<IPortfolio>;
        submit$: Observable<number>;
    }): Observable<IPortfolioRequest> {
        return combineLatest(
            payment$,
            portfolio$,
            this.getAmount('portfolio'),
            submit$,
            (payment, portfolio, amount, submit): IPortfolioRequest => {
                this._errors$.next({
                    ...this._errors$.getValue(),
                    portfolio_payment: !payment,
                    portfolio: !portfolio,
                });

                if (!payment || !submit || !portfolio) {
                    return;
                }

                const req: IPortfolioRequest = {
                    paymentId: payment.id,
                    amount,
                    portfolioId: portfolio.id,
                };

                return req;
            },
        );
    }

    public getDataSell({
                           payment$,
                           portfolio$,
                           submit$,
                       }: {
        payment$: Observable<IStripeCard>;
        portfolio$: Observable<IPortfolio>;
        submit$: Observable<number>;
    }): Observable<IPortfolioRequest> {
        return combineLatest(
            payment$,
            portfolio$,
            this.getAmount('sell'),
            submit$,
            (payment, portfolio, amount, submit): IPortfolioRequest => {
                this._errors$.next({
                    ...this._errors$.getValue(),
                    sell_payment: !payment,
                });

                if (!payment || !submit || !portfolio) {
                    return;
                }

                const req: IPortfolioRequest = {
                    paymentId: payment.id,
                    amount,
                    portfolioId: portfolio.id,
                };

                return req;
            },
        );
    }

    getPayments(): Observable<ISripeInfo> {
        return this.http.get(`${environment.baseUrl}/checkout/stripe/cards`)
            .pipe(
                map((data: IOriginSripeInfo | null) => {
                    if (data == null) {
                        throwError('empty cards list');
                    }
                    const active_card = StripeCardAdapter.fromActive(data.active_card);
                    return {stripe_card_list: data.stripe_card_list, active_card};
                }),
            );
    }

    invest(data: IInvestRequest): Observable<any> {
        this._pending$.next({...this._pending$.getValue(), buy: true});
        return this.http.post(`${environment.baseUrl}/checkout/stripe/invest-recurring`, {
            buy_card_id: data.paymentId,
            amount: data.amount,
            currency: data.currency,
            recurring: data.recurring,
            minutes: data.minutes
        })
            .pipe(
                tap(() =>
                    this._pending$.next({...this._pending$.getValue(), buy: false}),
                ),
                catchError(err => {
                    this._pending$.next({...this._pending$.getValue(), buy: false});
                    return throwError(err);
                }),
            );
    }

    investPortfolio(data: IPortfolioRequest): Observable<any> {
        this._pending$.next({...this._pending$.getValue(), portfolio: true});
        return this.http.post(`${environment.baseUrl}/checkout/stripe/invest-portfolio`, {
            payment_id: data.paymentId,
            package_id: data.portfolioId,
            amount: data.amount
        })
            .pipe(
                tap(() =>
                    this._pending$.next({
                        ...this._pending$.getValue(),
                        portfolio: true,
                    }),
                ),
                catchError(err => {
                    this._pending$.next({
                        ...this._pending$.getValue(),
                        portfolio: true,
                    });
                    return throwError(err);
                }),
            );
    }

    public setAmount(value: number, type: BuySell) {
        this._errors$.next({
            ...this._errors$.getValue(),
            [`${type}_amount`]: value <= 0,
        });
        this[`amount_${type}$`].next(value);
    }

    public calcTotal(amount: number, feePercent: number) {
        const fee = Number((amount * feePercent).toFixed(2));
        const total: ITotal = {
            amount: Number((amount - fee).toFixed(2)),
            fee,
            value: amount,
        };
        return total;
    }
}
