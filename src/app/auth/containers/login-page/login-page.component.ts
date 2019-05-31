import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import * as fromAuth from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import {Observable, of, timer} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Router} from '@angular/router';
import {ILoginRequest} from '../../interfaces/login.interface';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

    public pending$: Observable<boolean>;
    public loginSuccess$: Observable<boolean>;
    public loginFailed$: Observable<boolean>;
    public codeSuccess$: Observable<boolean>;
    public codeFailed$: Observable<boolean>;
    public isAuth$: Observable<boolean>;
    public isTFA$: Observable<0 | 1>;
    public timer$: Observable<number>;

    constructor(private store: Store<fromAuth.State>, private router: Router) {
        this.pending$ = this.store.pipe(select(fromAuth.selectAuthPendingState));
        this.loginSuccess$ = this.store.pipe(
            select(fromAuth.selectAuthLoginSuccessState),
        );
        this.loginFailed$ = this.store.pipe(
            select(fromAuth.selectAuthLoginFailedState),
        );
        this.codeSuccess$ = this.store.pipe(
            select(fromAuth.selectAuthCodeSuccessState),
        );
        this.codeFailed$ = this.store.pipe(
            select(fromAuth.selectAuthCodeFailedState),
        );
        this.isAuth$ = this.store.pipe(select(fromAuth.selectAuthIsAuthState));
        this.isTFA$ = this.store.pipe(select(fromAuth.getTFA));
    }

    onLogin(payload: ILoginRequest) {
        this.store.dispatch(new AuthActions.Login(payload));
    }

    onLogouted() {
        this.store.dispatch(new AuthActions.Logout());
    }

    onReset() {
        this.store.dispatch(new AuthActions.Logout());
        // this.store.dispatch(new AuthActions.Reset());
    }

    onNext(payload: string) {
        this.store.dispatch(new AuthActions.LoginCode(payload));
    }

    onResend() {
        this.store.dispatch(new AuthActions.ResendLoginCode());
        const start = 60;
        this.timer$ = timer(1000, 1000).pipe(
            map(i => start - i),
            take(start + 1)
        );
    }

    ngOnInit(): void {
    }
}
