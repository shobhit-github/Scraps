import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    DetailActions,
    DetailActionTypes,
    LoadDetail,
    LoadDetailSuccess,
    LoadDetailFail,
} from '../actions/detail.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {IcoService} from '../services/ico.service';
import {of} from 'rxjs';

@Injectable()
export class DetailEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType<LoadDetail>(DetailActionTypes.LoadDetail),
        mergeMap(action =>
            this.icoService.getIco(action.payload).pipe(
                map(ico => new LoadDetailSuccess(ico)),
                catchError(() => of(new LoadDetailFail())),
            ),
        ),
    );

    constructor(private actions$: Actions, private icoService: IcoService) {
    }
}
