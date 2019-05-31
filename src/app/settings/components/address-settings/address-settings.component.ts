import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import {IAccountAddress} from '../../interfaces/account.insterfaces';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';

@Component({
    selector: 'app-address-settings',
    templateUrl: './address-settings.component.html',
    styleUrls: ['./address-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressSettingsComponent implements OnInit, OnChanges {
    @Input() public data: IAccountAddress;

    @Input()
    public set failed(fail: boolean) {
        if (fail) {
            this.form.setErrors({some: true});
        } else {
            this.form.setErrors(null);
        }
    }

    @Output() public OnSubmit = new EventEmitter<IAccountAddress>();
    public form: FormGroup = this.fb.group({
        id: 0,
        user_id: 0,
        street: ['', Validators.maxLength(50)],
        city: ['', Validators.maxLength(50)],
        country: this.fb.control({value: '', disabled: true}),
        code: [
            '',
            Validators.compose([Validators.minLength(6), Validators.maxLength(12)]),
        ],
    });

    constructor(private fb: FormBuilder, public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        this.saveToForm(this.data);
    }

    ngOnChanges() {
        this.saveToForm(this.data);
    }

    onSubmit(form: FormGroup) {
        this.OnSubmit.emit(form.value);
    }

    private saveToForm(data: IAccountAddress): void {
        if (data) {
            this.form.setValue(data);
        }
    }
}
