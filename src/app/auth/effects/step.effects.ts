import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {StepActionTypes, Change} from '../actions/step.actions';
import {State} from '../reducers';

@Injectable()
export class StepEffects {
    // @Effect({ dispatch: false })
    // change$ = this.actions$.pipe(
    //   ofType<StepActions>(
    //     StepActionTypes.LoadStep,
    //     StepActionTypes.Increment,
    //     StepActionTypes.Decrement,
    //   ),
    //   withLatestFrom(this.store$.select(selectStepState)),
    //   map(([action, storeState]) => {
    //     return storeState;
    //   }),
    //   tap(step => {
    //     // this.storageService.saveStep(step);
    //   }),
    // );
    @Effect({dispatch: false})
    changeStep$ = this.actions$.pipe(
        ofType<Change>(StepActionTypes.Change),
        map(action => action.to ? this.router.navigate(action.to) : this.router.navigate(['/auth', 'progress'])),
    );

    constructor(
        private actions$: Actions,
        private store$: Store<State>,
        private router: Router,
    ) {
    }
}
