import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import {Router} from '@angular/router';
import {IForgotRequest} from '../../interfaces/forgot.interface';

@Component({
    selector: 'app-forgot-page',
    templateUrl: './forgot-page.component.html',
    styleUrls: ['./forgot-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPageComponent implements OnInit {

    public pending$: Observable<boolean>;
    public forgotSuccess$: Observable<boolean>;
    public forgotFailed$: Observable<boolean>;
    public step$: Observable<number>;
    public email$: Observable<string>;

    constructor(private store: Store<fromAuth.State>, private router: Router) {
        this.pending$ = this.store.pipe(select(fromAuth.selectAuthPendingState));
        this.forgotSuccess$ = this.store.pipe(
            select(fromAuth.selectAuthForgotSuccessState),
        );
        this.forgotFailed$ = this.store.pipe(
            select(fromAuth.selectAuthForgotFailedState),
        );
        this.step$ = this.store.pipe(
            select(fromAuth.selectAuthStepState),
        );
        this.email$ = this.store.pipe(
            select(fromAuth.selectAuthEmailState),
        );
    }

    onForgot(payload: IForgotRequest) {
        this.store.dispatch(new AuthActions.Forgot(payload));
    }

    onNext() {
        this.store.dispatch(new AuthActions.NextStep);
    }

    ngOnInit() {
    }

}
