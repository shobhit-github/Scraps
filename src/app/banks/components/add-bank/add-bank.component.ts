import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {IBank} from '../../../auth/interfaces/banks.interfaces';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';

@Component({
    selector: 'app-add-bank',
    templateUrl: './add-bank.component.html',
    styleUrls: ['./add-bank.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBankComponent implements OnInit {
    @Input() public activeClass;
    @Input() public plaidStatus: boolean;
    @Input() public bank: IBank;
    @Input() public bankList: Array<IBank>;
    @Input() public step: number;
    @Input() public pending: boolean;

    @Input()
    public set success(success: boolean) {
        if (success) {
            this.form.setErrors(null);
        }
    }

    @Input()
    public set fail(fail: boolean) {
        if (fail) {
            this.form.setErrors({invalid: true});
        }
    }

    @Input() public form: FormGroup;
    @Input() public formBank: FormGroup;
    @Output() public OnBankChange = new EventEmitter<IBank>();
    @Output() public OnBankReset = new EventEmitter<undefined>();
    @Output() public OnSubmit = new EventEmitter<undefined>();
    @Output() public OnConnect = new EventEmitter<IBank>();
    @Output() public OnBack = new EventEmitter<undefined>();

    constructor(public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
    }

    public onSubmit() {
        this.OnSubmit.emit();
    }

    public onConnect(bank: IBank) {
        this.OnConnect.emit(bank);
    }

    public onBack() {
        this.OnBack.emit();
    }

    public onBankChange(event: MatAutocompleteSelectedEvent) {
        const bank: IBank = event.option.value;
        this.OnBankChange.emit(bank);
    }

    public displayFn(bank?: IBank): string | undefined {
        return bank ? bank.name : undefined;
    }
}
