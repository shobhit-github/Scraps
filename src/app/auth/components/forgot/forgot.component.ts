import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IForgotRequest} from '../../interfaces/forgot.interface';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent implements OnInit {
    @Input() public pending: boolean;
    @Input() public forgotSuccess: boolean;
    @Input() public forgotFailed: boolean;
    @Input() public step = 1;
    @Input() public email: string;
    @Output() public OnForgot = new EventEmitter<IForgotRequest>();
    @Output() public OnNext = new EventEmitter<undefined>();
    public forgot: FormGroup;

    constructor(public matcher: MyErrorStateMatcher, private fb: FormBuilder) {
        this.forgot = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.forgot && this.forgot.valid) {
            const payload: IForgotRequest = this.forgot.value;
            this.OnForgot.emit(payload);
        } else if (this.email) {
            const payload: IForgotRequest = {email: this.email};
            this.OnForgot.emit(payload);
        }
    }

    onNext() {
        this.onSubmit();
        this.OnNext.emit();
    }
}
