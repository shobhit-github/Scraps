import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as fromAuth from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import {IRegisterInfo} from '../../interfaces/register.interface';
import {Router, ActivatedRoute} from '@angular/router';
import * as StepActions from '../../actions/step.actions';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit {
    public pending$: Observable<boolean>;
    public registerSuccess$: Observable<boolean>;
    public registerFailed$: Observable<boolean>;
    public isAuth$: Observable<boolean>;
    private referral: string;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private store: Store<fromAuth.State>,
        private router: Router,
        private activeRouter: ActivatedRoute,
    ) {
        this.store.dispatch(new StepActions.Reset());
        this.subscriptions.push(
            this.activeRouter.queryParamMap.subscribe(paramsMap => {
                this.referral = paramsMap.get('ref');
            }),
        );
        this.store.dispatch(new AuthActions.Logout());
        this.pending$ = this.store.pipe(select(fromAuth.selectAuthPendingState));
        this.registerSuccess$ = this.store.pipe(
            select(fromAuth.selectAuthRegisterSuccessState),
        );
        this.registerFailed$ = this.store.pipe(
            select(fromAuth.selectAuthRegisterFailedState),
        );
        this.isAuth$ = this.store.pipe(select(fromAuth.selectAuthIsAuthState));

    }

    onRegister(payload: IRegisterInfo) {
        if (this.referral) {
            payload.ref = this.referral;
        }
        this.store.dispatch(new AuthActions.Register(payload));
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    onReset() {
        this.store.dispatch(new AuthActions.Logout());
        this.store.dispatch(new AuthActions.RegisterReset());
    }

    onNext() {
        this.router.navigate(['/auth', 'progress']);
    }

    ngOnInit() {
    }
}
