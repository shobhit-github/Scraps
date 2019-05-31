import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
    Input,
    OnChanges,
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {
    FormBuilder,
    FormControl,
    ValidatorFn,
    Validators,
    AbstractControl,
    NG_VALIDATORS,
    FormGroup,
} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';

export function confirmValidator(controlName: string): ValidatorFn {
    return function (input: FormControl) {
        // console.log(input.root.get(controlName));
        if (
            input.root.get(controlName) &&
            input.root.get(controlName).value !== input.value
        ) {
            return {notEqual: true};
        }
        return null;
    };
}

@Component({
    selector: 'app-change-password-settings',
    templateUrl: './change-password-settings.component.html',
    styleUrls: ['./change-password-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // providers: [
    //   { provide: NG_VALIDATORS, useFactory: confirmValidator, multi: true },
    // ],
})
export class ChangePasswordSettingsComponent implements OnInit, OnChanges {
    @Input() public isTFA: boolean;
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ChangePasswordSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        public matcher: MyErrorStateMatcher,
    ) {
    }

    ngOnInit() {
        this.setForm();
    }

    ngOnChanges() {
        this.setForm();
    }

    setForm() {
        const config: {
            password: Array<any>;
            password_confirmation: Array<any>;
            current_password: Array<any>;
            code?: Array<any>;
        } = {
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
            current_password: [
                '',
                Validators.compose([
                    // Validators.minLength(8),
                    Validators.required,
                    // Validators.pattern(
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@#!%*?&]{8,}$/,
                    // ),
                ]),
            ],
        };
        if (this.isTFA) {
            config.code = ['', Validators.required];
        }
        this.form = this.fb.group(config);
    }
}
