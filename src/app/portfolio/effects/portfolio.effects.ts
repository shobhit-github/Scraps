import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, tap} from 'rxjs/operators';
import {SnackBarComponent} from 'src/app/core/components/snack-bar/snack-bar.component';
import {InvestService} from 'src/app/invest/services/invest.service';

import {
    InvestPortfolioFail,
    InvestPortfolioSuccess,
    LoadPortfolioListFail,
    LoadPortfolioListSuccess,
    PortfolioActionTypes,
    LoadPortfolioSuccess,
    LoadPortfolioFail,
} from '../actions/portfolio.actions';
import {IPortfolioRequest} from '../interfaces/request.interface';
import {PortfolioService} from '../services/portfolio.service';
import {InvestActionTypes} from '../../invest/actions/invest.actions';
import {Router} from '@angular/router';

@Injectable()
export class PortfolioEffects {
    @Effect()
    loadPortfolio$ = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolio),
        mergeMap(() =>
            this.portfolioService.getCurrent().pipe(
                map(data => new LoadPortfolioSuccess(data)),
                catchError(() => of(new LoadPortfolioFail())),
            ),
        ),
    );
    @Effect()
    loadPortfolioList$ = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolioList),
        mergeMap(() =>
            this.portfolioService.getPortfolioList().pipe(
                map(data => new LoadPortfolioListSuccess(data)),
                catchError(() => of(new LoadPortfolioListFail())),
            ),
        ),
    );
    @Effect({dispatch: false})
    success = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolioFail),
        tap(() => {
            this.router.navigate(['/quiz/start']);
        }),
    );

    @Effect()
    invest$ = this.actions$.pipe(
        ofType(PortfolioActionTypes.InvestPortfolio),
        pluck('payload'),
        mergeMap((payload: IPortfolioRequest) =>
            this.investService.investPortfolio(payload).pipe(
                map(() => {
                    this.openSnackBar(false, `Processing of investment`);
                    return new InvestPortfolioSuccess(payload.amount);
                }),
                catchError(() => {
                    this.openSnackBar(true);
                    return of(new InvestPortfolioFail());
                }),
            ),
        ),
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
        private portfolioService: PortfolioService,
        private investService: InvestService,
        private snackBar: MatSnackBar,
        private router: Router,
    ) {
    }
}
