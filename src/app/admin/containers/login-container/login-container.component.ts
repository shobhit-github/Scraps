import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import * as AdminActions from '../../actions/admin.actions';

@Component({
    selector: 'app-login-container',
    templateUrl: './login-container.component.html',
    styleUrls: ['./login-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent implements OnInit {

    public pending$: Observable<boolean>;
    public success$: Observable<boolean>;
    public fail$: Observable<boolean>;
    public form: FormGroup;

    constructor(private store: Store<fromStore.State>, private fb: FormBuilder) {
        this.success$ = this.store.pipe(select(fromStore.selectSuccess));
        this.fail$ = this.store.pipe(select(fromStore.selectFail));
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: [
                '',
                Validators.compose([
                    // Validators.minLength(8),
                    Validators.required,
                    // Validators.pattern(
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@#!%*?&]{8,}$/,
                    // ),
                ]),
            ],
        });
    }

    public onLogin() {
        this.store.dispatch(new AdminActions.Login(this.form.value));
    }

    ngOnInit(): void {
    }
}
