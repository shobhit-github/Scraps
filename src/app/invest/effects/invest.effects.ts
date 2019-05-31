import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    InvestActionTypes,
    LoadPaymentsSuccess,
    LoadPaymentsFail,
    InvestSuccess,
    InvestFail,
    LoadFeeSuccess,
    LoadFeeFail,
} from '../actions/invest.actions';
import {mergeMap, map, catchError, pluck, tap} from 'rxjs/operators';
import {InvestService} from '../services/invest.service';
import {of} from 'rxjs';
import {IInvestRequest} from '../interfaces/stripe-card.interface';
import {Router} from '@angular/router';
import {SnackBarComponent} from 'src/app/core/components/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';
import {InvestPortfolioFail, InvestPortfolioSuccess} from '../../portfolio/actions/portfolio.actions';


@Injectable()
export class InvestEffects {
    @Effect()
    loadPayments$ = this.actions$.pipe(
        ofType(InvestActionTypes.LoadPayments),
        mergeMap(() =>
            this.investService.getPayments().pipe(
                map(data => new LoadPaymentsSuccess(data)),
                catchError(() => of(new LoadPaymentsFail())),
            ),
        ),
    );
    @Effect()
    loadFee$ = this.actions$.pipe(
        ofType(InvestActionTypes.LoadFee),
        mergeMap(() =>
            this.investService.getFee().pipe(
                map(fee => new LoadFeeSuccess(fee)),
                catchError(() => of(new LoadFeeFail())),
            ),
        ),
    );
    @Effect()
    invest$ = this.actions$.pipe(
        ofType(InvestActionTypes.Invest),
        pluck('payload'),
        mergeMap((payload: IInvestRequest) =>
            this.investService.invest(payload).pipe(
                map(() => {
                    this.openSnackBar(false, `Processing of investment`);
                    return new InvestPortfolioSuccess(payload.amount);
                    // new InvestSuccess()
                }),
                // catchError(() => of(new InvestFail())),
                catchError(() => {
                    this.openSnackBar(true);
                    return of(new InvestPortfolioFail());
                }),
            ),
        ),
    );

    @Effect({dispatch: false})
    success = this.actions$.pipe(
        ofType(InvestActionTypes.InvestSuccess),
        tap(() => {
            this.router.navigate(['/dashboard']);
        }),
    );

    openSnackBar(isError = false, text?: string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: {isError, text},
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: isError ? ['snack', 'snack_err'] : ['snack'],
        });
    }

    constructor(
        private actions$: Actions,
        private investService: InvestService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
    }
}
