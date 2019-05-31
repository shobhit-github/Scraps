import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {
    catchError,
    map,
    mergeMap,
    pluck,
    switchMap,
    tap,
} from 'rxjs/operators';

import {SnackBarComponent} from '../../core/components/snack-bar/snack-bar.component';
import {IPaginationRequest} from '../../core/interfaces/pagination.interface';
import {
    AddOrUpdatePortfolio,
    AddOrUpdatePortfolioFail,
    AddOrUpdatePortfolioSuccess,
    DeletePortfolio,
    DeletePortfolioFail,
    DeletePortfolioSuccess,
    LoadPortfolios,
    LoadPortfoliosFail,
    LoadPortfoliosSuccess,
    PortfolioActionTypes,
    LoadAllCoinsSuccess,
    LoadAllCoinsFail,
} from '../actions/portfolio.actions';
import {PortfolioService} from '../services/portfolio.service';
import {IPortfolioAdmin} from '../interfaces/portfolio.interface';

@Injectable()
export class PortfolioEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadPortfolios),
        pluck('payload'),
        mergeMap((payload: IPaginationRequest) =>
            this.portfolioService
                .getPortfolios(payload)
                .pipe(
                    map(
                        data => new LoadPortfoliosSuccess(data),
                        catchError(() => of(new LoadPortfoliosFail())),
                    ),
                ),
        ),
    );
    @Effect()
    loadCoins$ = this.actions$.pipe(
        ofType(PortfolioActionTypes.LoadAllCoins),
        mergeMap(() =>
            this.portfolioService
                .getAllCoins()
                .pipe(
                    map(
                        data => new LoadAllCoinsSuccess(data),
                        catchError(() => of(new LoadAllCoinsFail())),
                    ),
                ),
        ),
    );
    @Effect()
    public addOrUpdatePortfolio$ = this.actions$.pipe(
        ofType<AddOrUpdatePortfolio>(PortfolioActionTypes.AddOrUpdatePortfolio),
        pluck('payload'),
        mergeMap((data: IPortfolioAdmin) => {
            const isNew = data.isNew;
            const id = data.id;
            if (isNew) {
                return this.portfolioService.savePortfolio(data);
            } else {
                return this.portfolioService.updatePortfolio(data, <string>id);
            }
        }),
        map(() => new AddOrUpdatePortfolioSuccess()),
        catchError(() =>
            of(new AddOrUpdatePortfolioFail()).pipe(
                tap(() => this.openSnackBar(true)),
            ),
        ),
    );

    @Effect()
    public savePortfolio$ = this.actions$.pipe(
        ofType<AddOrUpdatePortfolioSuccess>(
            PortfolioActionTypes.AddOrUpdatePortfolioSuccess,
        ),
        map(() => new LoadPortfolios({limit: 100, page: 1})),
        tap(() => this.openSnackBar()),
    );

    @Effect()
    public deletePortfolio$ = this.actions$.pipe(
        ofType<DeletePortfolio>(PortfolioActionTypes.DeletePortfolio),
        switchMap(action =>
            this.portfolioService.deletePortfolio(action.payload).pipe(
                map(() => {
                    return new DeletePortfolioSuccess(action.payload);
                }),
                tap(() => this.openSnackBar()),
                catchError(() =>
                    of(new DeletePortfolioFail()).pipe(
                        tap(() => this.openSnackBar(true)),
                    ),
                ),
            ),
        ),
    );

    openSnackBar(isError = false) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: {isError},
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: isError ? ['snack', 'snack_err'] : ['snack'],
        });
    }

    constructor(
        private actions$: Actions,
        private portfolioService: PortfolioService,
        public snackBar: MatSnackBar,
    ) {
    }
}
