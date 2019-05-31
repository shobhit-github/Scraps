import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {IBank, IConnect} from '../../../auth/interfaces/banks.interfaces';
import * as BankActions from '../../actions/bank.actions';
import * as fromStore from '../../reducers/bank.reducer';
import * as fromBanks from '../../reducers/bank.reducer';

@Component({
    selector: 'app-add-bank-container',
    templateUrl: './add-bank-container.component.html',
    styleUrls: ['./add-bank-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBankContainerComponent implements OnInit {
    @Input() public activeClass;
    @Output() public OnCompleted = new EventEmitter<undefined>();
    public bank$: Observable<IBank>;
    public step$: Observable<number>;
    public pending$: Observable<boolean>;
    public success$: Observable<boolean>;
    public fail$: Observable<boolean>;
    public bankList$: Observable<Array<IBank>>;
    public form: FormGroup;
    public formBank: FormGroup;

    constructor(private store: Store<fromStore.State>, private fb: FormBuilder) {
        this.bank$ = this.store.select(fromBanks.selectBanksActiveBankState);
        this.step$ = this.store.select(fromBanks.selectBanksStepState);
        this.pending$ = this.store.select(fromBanks.selectBanksPendingState);
        this.success$ = this.store
            .select(fromBanks.selectBanksConnectSuccessState)
            .pipe(tap(() => this.form.setErrors(null)));
        this.fail$ = this.store
            .select(fromBanks.selectBanksConnectFailedState)
            .pipe(tap(() => this.form.setErrors({invalid: true})));
        this.formBank = this.fb.group({
            query: ['', Validators.required],
        });
        this.form = this.fb.group({
            client: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.bankList$ = this.store.select(fromBanks.selectBanksListState);
    }

    onSubmit() {
        if (this.formBank.value.query.length > 1) {
            this.store.dispatch(new BankActions.LoadBanks(this.formBank.value.query));
        }
    }

    onConnect(bank: IBank) {
        if (this.form.valid && bank) {
            const connectData: IConnect = {
                username: this.form.value.client,
                password: this.form.value.password,
                type: bank.type,
            };
            this.store.dispatch(new BankActions.Connect(connectData));
        }
    }

    onBankChange(bank: IBank) {
        this.store.dispatch(new BankActions.ChangeBank(bank));
    }

    onBack() {
        this.store.dispatch(new BankActions.ResetBank());
    }

    ngOnInit() {
    }

    // ngOnDestroy() {}
}
