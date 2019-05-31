import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IBank} from '../../interfaces/banks.interfaces';
import {FormGroup} from '@angular/forms';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BanksComponent implements OnInit {
    public mbConnected: boolean;

    @Input()
    public activeClass;
    @Input()
    public isReady: boolean;
    @Input()
    public bank: IBank;
    @Input()
    public bankList: Array<IBank>;
    @Input()
    public step: number;
    @Input()
    public pending: boolean;

    @Input()
    public set success(success: boolean) {
        // if (success) {
        //   this.form.setErrors(null);
        // }
    }

    @Input()
    public set fail(fail: boolean) {
        // if (fail) {
        //   this.form.setErrors({ invalid: true });
        // }
    }

    @Input()
    public form: FormGroup;
    @Input()
    public formBank: FormGroup;
    @Output()
    public OnBankChange = new EventEmitter<IBank>();
    @Output()
    public OnBankReset = new EventEmitter<undefined>();
    @Output()
    public OnSubmit = new EventEmitter<undefined>();
    @Output()
    public OnConnect = new EventEmitter<IBank>();
    @Output()
    public OnBack = new EventEmitter<undefined>();
    @Output()
    public OnSkip = new EventEmitter<undefined>();

    constructor(public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        // console.log(this.form);
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
