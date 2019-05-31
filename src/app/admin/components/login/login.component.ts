import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';
import {ILoginRequest} from '../../../auth/interfaces/login.interface';
import {FormGroup} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    @Output() public OnLogin = new EventEmitter<undefined>();
    @Input() public pending: boolean;
    @Input() public success: boolean;
    @Input() public form: FormGroup;

    @Input()
    public set fail(fail: boolean) {
        if (fail) {
            this.form.setErrors({invalid: true});
        } else {
            this.form.setErrors(null);
        }
    }

    constructor(public matcher: MyErrorStateMatcher) {
    }

    onSubmit() {
        this.OnLogin.emit();
    }

    ngOnInit() {
    }
}
