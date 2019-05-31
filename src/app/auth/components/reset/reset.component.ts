import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';
import {IChangePasswordRequest} from '../../interfaces/change.interface';
import {FormControl} from '@angular/forms';

export function matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {
        if (!control.parent) {
            return null;
        }

        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName) as FormControl;
            if (!otherControl) {
                throw new Error(
                    'matchOtherValidator(): other control is not found in parent group',
                );
            }
            otherControl.valueChanges.subscribe(() => {
                thisControl.updateValueAndValidity();
            });
        }

        if (!otherControl) {
            return null;
        }

        if (otherControl.value !== thisControl.value) {
            return {
                matchOther: true,
            };
        }

        return null;
    };
}

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetComponent implements OnInit {
    @Input() public pending = true;
    @Input() public isTokenValid: boolean;
    @Input() public changePasswordSuccess: boolean;
    @Input() public changePasswordFailed: boolean;
    @Output() public OnSubmit = new EventEmitter<IChangePasswordRequest>();
    public form: FormGroup;

    constructor(public matcher: MyErrorStateMatcher, private fb: FormBuilder) {
        this.form = this.fb.group({
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
                    matchOtherValidator('password'),
                ]),
            ],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.form && this.form.valid) {
            const payload: IChangePasswordRequest = this.form.value;
            this.OnSubmit.emit(payload);
        }
    }
}
