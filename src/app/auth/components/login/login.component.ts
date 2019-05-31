import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import {ILoginRequest} from '../../interfaces/login.interface';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    @Output() public OnLogin = new EventEmitter<ILoginRequest>();
    @Output() public OnLogouted = new EventEmitter<undefined>();
    @Output() public OnReset = new EventEmitter<undefined>();
    @Output() public OnNext = new EventEmitter<string>();
    @Output() public OnResend = new EventEmitter<undefined>();
    @Input() public pending: boolean;
    @Input() public loginSuccess: boolean;
    @Input() public codeSuccess: boolean;
    @Input() public isTFA: 0 | 1;
    @Input() public timer: number;

    @Input()
    public set loginFailed(registerFailed: boolean) {
        if (registerFailed) {
            this.login.setErrors({invalid: true});
        } else {
            this.login.setErrors(null);
        }
    }

    @Input()
    public set codeFailed(code: boolean) {
        if (code) {
            this.code.get('code').setErrors({invalid: true});
        } else {
            this.code.get('code').setErrors(null);
        }
    }

    @Input() public isAuth: boolean;
    public login: FormGroup;
    public code: FormGroup;

    constructor(public matcher: MyErrorStateMatcher, private fb: FormBuilder) {
        this.login = this.fb.group({
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
        this.code = this.fb.group({
            code: [
                '',
                Validators.compose([Validators.required, Validators.pattern(/[0-9]+/)]),
            ],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.login.valid) {
            const payload: ILoginRequest = this.login.value;
            this.OnLogin.emit(payload);
        }
    }

    onSubmitCode() {
        if (this.code.valid) {
            const payload: string = this.code.value.code;
            this.OnNext.emit(payload);
        }
    }

    onLogout() {
        this.OnLogouted.emit();
    }

    onReset() {
        this.OnReset.emit();
    }
}
