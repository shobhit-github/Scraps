// tslint:disable
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {confirmValidator} from '../../../settings/components/change-password-settings/change-password-settings.component';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';
import {IRegisterInfo} from '../../interfaces/register.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
    public register: FormGroup;
    @Output()
    public OnSubmited = new EventEmitter<IRegisterInfo>();
    @Output()
    public OnLogouted = new EventEmitter<undefined>();
    @Output()
    public OnReset = new EventEmitter<undefined>();
    @Output()
    public OnNext = new EventEmitter<undefined>();
    @Input()
    public pending: boolean;
    @Input()
    public registerSuccess: boolean;

    @Input()
    public set registerFailed(registerFailed: boolean) {
        if (registerFailed) {
            this.register.get('email').setErrors({exist: true});
        } else {
            this.register.get('email').setErrors(null);
        }
    }

    @Input()
    public isAuth: boolean;

    constructor(public matcher: MyErrorStateMatcher, private fb: FormBuilder) {
        this.register = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: [
                '',
                Validators.compose([
                    Validators.minLength(8),
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@#!%*?&]{8,}$/,
                    ),
                ]),
            ],
            password_confirmation: [
                '',
                Validators.compose([
                    Validators.minLength(8),
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@#!%*?&]{8,}$/,
                    ),
                    confirmValidator('password'),
                ]),
            ],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            // middle_name: [''],
            agreement: ['', Validators.required],
        });
        // this.scriptsService.loadScript('autopilot').then(res => {
        // const autoPilot = (window.AutopilotAnywhere = {
        //   _runQueue: [],
        //   run: function() {
        //     this._runQueue.push(arguments);
        //   },
        // });
        // if (!window.Autopilot) {
        //   window.Autopilot = autoPilot;
        // }
        // });
    }

    ngOnDestroy() {
        // if (this.registerSuccessSubscr) {
        //   this.registerSuccessSubscr.unsubscribe();
        // }
    }

    ngOnInit() {
    }

    public onSubmit() {
        if (this.register.valid) {
            const payload: IRegisterInfo = this.register.value;
            if (!payload.agreement) {
                throw new Error('agreement must be set');
            }
            payload.agreement = '1';
            this.OnSubmited.emit(payload);
        }
    }

    onLogout() {
        this.OnLogouted.emit();
    }

    onReset() {
        this.OnReset.emit();
    }

    onNext() {
        this.OnNext.emit();
    }
}
