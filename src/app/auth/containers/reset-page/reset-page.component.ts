import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import * as fromAuth from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Router, ActivatedRoute} from '@angular/router';
import {ILoginRequest} from '../../interfaces/login.interface';
import {IChangePasswordRequest} from '../../interfaces/change.interface';

@Component({
    selector: 'app-reset-page',
    templateUrl: './reset-page.component.html',
    styleUrls: ['./reset-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPageComponent implements OnInit {
    public pending$: Observable<boolean>;
    public changePasswordSuccess$: Observable<boolean>;
    public changePasswordFailed$: Observable<boolean>;
    private token: string;
    private userId: number;
    public isTokenValid$: Observable<boolean>;

    constructor(
        private store: Store<fromAuth.State>,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
        this.pending$ = this.store.pipe(select(fromAuth.selectAuthPendingState));
        this.changePasswordSuccess$ = this.store.pipe(
            select(fromAuth.selectAuthChangePasswordSuccessState),
        );
        this.changePasswordFailed$ = this.store.pipe(
            select(fromAuth.selectAuthChangePasswordFailedState),
        );
        this.token = this.activeRoute.snapshot.paramMap.get('token');
        this.userId = +this.activeRoute.snapshot.paramMap.get('userId');
        if (!this.token || !this.userId) {
            this.store.dispatch(new AuthActions.CheckTokenFail());
        } else {
            this.store.dispatch(
                new AuthActions.CheckToken({
                    token: this.token,
                    user_id: this.userId,
                }),
            );
        }
        this.isTokenValid$ = this.store.pipe(select(fromAuth.getIsTokenValid));
    }

    onSubmit(payload: IChangePasswordRequest) {
        payload.token = this.token;
        payload.user_id = this.userId;
        this.store.dispatch(new AuthActions.ChangePassword(payload));
    }

    ngOnInit() {
    }
}
