import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    ReferralActionTypes,
    LoadReferral,
} from '../actions/referral.actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import {of} from 'rxjs';

@Injectable()
export class ReferralEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType<LoadReferral>(ReferralActionTypes.LoadReferral),
        mergeMap(() => {
            return this.settingsService.getReferral().pipe(
                map(data => {
                    return {
                        type: ReferralActionTypes.SuccessLoadReferral,
                        payload: {link: data.referral},
                    };
                }),
                catchError(() => of({type: ReferralActionTypes.FailedLoadReferral})),
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private settingsService: SettingsService,
    ) {
    }
}
