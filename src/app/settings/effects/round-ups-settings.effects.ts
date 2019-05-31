import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    RoundUpsSettingsActionTypes,
    LoadSuccess,
    LoadFail,
    SaveSuccess,
    SaveFail,
    SetStatusSuccess,
    SetStatusFail,
} from '../actions/round-ups-settings.actions';
import {map, mergeMap, catchError, pluck} from 'rxjs/operators';
import {RoundUpsSettingsService} from '../services/round-ups-settings.service';
import {of} from 'rxjs';

import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from 'src/app/core/components/snack-bar/snack-bar.component';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';
import {ERoundUpsStatus} from '../interfaces/round-ups-settings.interfaces';

@Injectable()
export class RoundUpsSettingsEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(RoundUpsSettingsActionTypes.Load),
        mergeMap(() =>
            this.roundUpsSettingsService.getRoundUpsSettings().pipe(
                map(data => new LoadSuccess(data)),
                catchError(() => of(new LoadFail())),
            ),
        ),
    );
    @Effect()
    save$ = this.actions$.pipe(
        ofType(RoundUpsSettingsActionTypes.Save),
        pluck('payload'),
        mergeMap((card: IStripeCard) =>
            this.roundUpsSettingsService.saveCard(card).pipe(
                map(() => new SaveSuccess(card)),
                catchError(() => of(new SaveFail())),
            ),
        ),
    );
    @Effect()
    pause$ = this.actions$.pipe(
        ofType(RoundUpsSettingsActionTypes.SetStatus),
        pluck('payload'),
        mergeMap((status: ERoundUpsStatus) =>
            this.roundUpsSettingsService.setStatus(status).pipe(
                map(() => new SetStatusSuccess(status)),
                catchError(() => of(new SetStatusFail())),
            ),
        ),
    );
    @Effect({dispatch: false})
    success$ = this.actions$.pipe(
        ofType(
            RoundUpsSettingsActionTypes.SetStatusSuccess,
            RoundUpsSettingsActionTypes.SaveSuccess,
        ),
        map(() => {
            this.openSnackBar();
        }),
    );
    @Effect({dispatch: false})
    error$ = this.actions$.pipe(
        ofType(
            RoundUpsSettingsActionTypes.SetStatusFail,
            RoundUpsSettingsActionTypes.SaveFail,
        ),
        map(() => {
            this.openSnackBar(true);
        }),
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
        private roundUpsSettingsService: RoundUpsSettingsService,
        private snackBar: MatSnackBar,
    ) {
    }
}
