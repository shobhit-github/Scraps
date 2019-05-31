import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {SnackBarComponent} from '../../core/components/snack-bar/snack-bar.component';
import {
    AddOrUpdateIco,
    AddOrUpdateIcoFail,
    AddOrUpdateIcoSuccess,
    DeleteIco,
    DeleteIcoFail,
    DeleteIcoSuccess,
    IcoActionTypes,
    LoadIco,
    LoadIcoFail,
    LoadIcoSuccess,
} from '../actions/ico.actions';
import {IcoService} from '../services/ico.service';

@Injectable()
export class IcoEffects {
    constructor(
        private actions$: Actions,
        private icoService: IcoService,
        public snackBar: MatSnackBar,
    ) {
    }

    @Effect()
    public loadIco$ = this.actions$.pipe(
        ofType<LoadIco>(IcoActionTypes.LoadIco),
        mergeMap(action =>
            this.icoService.getIco(action.payload).pipe(
                map(resp => new LoadIcoSuccess(resp)),
                catchError(() => of(new LoadIcoFail())),
            ),
        ),
    );

    @Effect()
    public AddOrUpdateIco$ = this.actions$.pipe(
        ofType<AddOrUpdateIco>(IcoActionTypes.AddOrUpdateIco),
        mergeMap(action =>
            this.icoService.addOrUdateIco(action.payload).pipe(
                map(() => new AddOrUpdateIcoSuccess()),
                catchError(() =>
                    of(new AddOrUpdateIcoFail()).pipe(tap(() => this.openSnackBar(true))),
                ),
            ),
        ),
    );

    @Effect()
    public saveIco$ = this.actions$.pipe(
        ofType<AddOrUpdateIcoSuccess>(IcoActionTypes.AddOrUpdateIcoSuccess),
        map(() => new LoadIco({})),
        tap(() => this.openSnackBar()),
    );

    @Effect()
    public deleteIco$ = this.actions$.pipe(
        ofType<DeleteIco>(IcoActionTypes.DeleteIco),
        switchMap(action =>
            this.icoService.deleteIco(action.payload).pipe(
                map(() => {
                    return new DeleteIcoSuccess(action.payload);
                }),
                tap(() => this.openSnackBar()),
                catchError(() =>
                    of(new DeleteIcoFail()).pipe(tap(() => this.openSnackBar(true))),
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
}
