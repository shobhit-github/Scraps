import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Upload, IdentityActionTypes} from '../actions/identity.actions';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {IIdentityRequest} from '../interfaces/identity.interface';
import {IdentityService} from '../services/identity.service';

@Injectable()
export class IdentityEffects {
    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<Upload>(IdentityActionTypes.upload),
        map(action => action.payload),
        mergeMap(({identityData, type}) => {
            return this.identityService.uploadPhoto(identityData, type).pipe(
                // If successful, dispatch success action with result
                map((data: any) => {
                    return {
                        type: IdentityActionTypes.uploadSuccess,
                    };
                }),
                // If request fails, dispatch failed action
                catchError(() => {
                    return of({type: IdentityActionTypes.uploadFailed});
                }),
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private identityService: IdentityService,
    ) {
    }
}
