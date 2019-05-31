import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    IdentityActionTypes,
    SuccessLoadIdentity,
    FailedLoadIdentity,
} from '../actions/identity.actions';
import {
    mergeMap,
    map,
    catchError,
} from '../../../../node_modules/rxjs/operators';
import {IdentitySettingsService} from '../services/identity-settings.service';
import {IdentityService} from '../../auth/services/identity.service';
import {of} from '../../../../node_modules/rxjs';

@Injectable()
export class IdentityEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(IdentityActionTypes.LoadIdentity),
        mergeMap(() =>
            this.identitySettingsService
                .getIdentity()
                .pipe(
                    map(
                        identityData => new SuccessLoadIdentity(identityData),
                    ),
                    catchError(() => of(new FailedLoadIdentity())),
                ),
        ),
    );

    constructor(
        private actions$: Actions,
        private identitySettingsService: IdentitySettingsService,
        private identityService: IdentityService,
    ) {
    }
}
