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
    AddOrUpdateCoin,
    AddOrUpdateCoinFail,
    AddOrUpdateCoinSuccess,
    CoinActionTypes,
    DeleteCoin,
    DeleteCoinFail,
    DeleteCoinSuccess,
    LoadCoins,
    LoadCoinsFail,
    LoadCoinsSuccess,
} from '../actions/coin.actions';
import {CoinService} from '../services/coin.service';

@Injectable()
export class CoinEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(CoinActionTypes.LoadCoins),
        pluck('payload'),
        mergeMap((payload: IPaginationRequest) =>
            this.coinService
                .getCoins(payload)
                .pipe(
                    map(
                        data => new LoadCoinsSuccess(data),
                        catchError(() => of(new LoadCoinsFail())),
                    ),
                ),
        ),
    );
    @Effect()
    public AddOrUpdateCoin$ = this.actions$.pipe(
        ofType<AddOrUpdateCoin>(CoinActionTypes.AddOrUpdateCoin),
        pluck('payload'),
        mergeMap((data: FormData) => {
            const isNew = data.get('isNew') === 'true';
            const id = data.get('id');
            if (isNew) {
                return this.coinService.saveCoin(data);
            } else {
                return this.coinService.updateCoin(data, <string>id);
            }
        }),
        map(() => new AddOrUpdateCoinSuccess()),
        catchError(() =>
            of(new AddOrUpdateCoinFail()).pipe(tap(() => this.openSnackBar(true))),
        ),
    );

    @Effect()
    public saveCoin$ = this.actions$.pipe(
        ofType<AddOrUpdateCoinSuccess>(CoinActionTypes.AddOrUpdateCoinSuccess),
        map(() => new LoadCoins({limit: 100, page: 1})),
        tap(() => this.openSnackBar()),
    );

    @Effect()
    public deleteCoin$ = this.actions$.pipe(
        ofType<DeleteCoin>(CoinActionTypes.DeleteCoin),
        switchMap(action =>
            this.coinService.deleteCoin(action.payload).pipe(
                map(() => {
                    return new DeleteCoinSuccess(action.payload);
                }),
                tap(() => this.openSnackBar()),
                catchError(() =>
                    of(new DeleteCoinFail()).pipe(tap(() => this.openSnackBar(true))),
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
        private coinService: CoinService,
        public snackBar: MatSnackBar,
    ) {
    }
}
