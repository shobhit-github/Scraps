import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SaveUser, UserActionTypes} from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions) {
    }

    // @Effect()
    // public userLoad = this.actions$.pipe(
    //   ofType<SaveUser>(UserActionTypes.SaveUser),
    // );
}
