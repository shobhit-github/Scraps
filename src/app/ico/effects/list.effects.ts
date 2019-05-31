import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    ListActions,
    ListActionTypes,
    LoadList,
    LoadListSuccess,
    LoadListFail,
} from '../actions/list.actions';
import {map, mergeMap, switchMap, catchError} from 'rxjs/operators';
import {IcoService} from '../services/ico.service';
import {of} from 'rxjs';

@Injectable()
export class ListEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType<LoadList>(ListActionTypes.LoadList),
        switchMap(action =>
            this.icoService.getIcoList(action.payload).pipe(
                map(icoList => new LoadListSuccess(icoList)),
                catchError(() => of(new LoadListFail())),
            ),
        ),
    );

    constructor(private actions$: Actions, private icoService: IcoService) {
    }
}
