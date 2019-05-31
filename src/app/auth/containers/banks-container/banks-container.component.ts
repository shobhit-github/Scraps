import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnDestroy,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, merge, of, BehaviorSubject} from 'rxjs';
import {tap, filter, mergeMap, map, withLatestFrom} from 'rxjs/operators';

import {IBank, IConnect} from '../../interfaces/banks.interfaces';
import * as fromBanks from '../../reducers';
import * as BanksActions from '../../actions/banks.actions';
import {BanksService} from '../../services/banks.service';
import {ScriptsService} from '../../../core/services/scripts/scripts.service';

@Component({
    selector: 'app-banks-container',
    templateUrl: './banks-container.component.html',
    styleUrls: ['./banks-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BanksContainerComponent implements OnInit, OnDestroy {
    @Input()
    public activeClass;
    @Input()
    public isReady = false;
    @Output()
    public OnCompleted = new EventEmitter<undefined>();
    public bank$: Observable<IBank>;
    public plaidStatus$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public step$: Observable<number>;
    public pending$: Observable<boolean>;
    public success$: Observable<boolean>;
    public fail$: Observable<boolean>;
    public bankList$: Observable<Array<IBank>>;
    public form: FormGroup;
    public formBank: FormGroup;

    constructor(
        private store: Store<fromBanks.State>,
        private fb: FormBuilder,
        private banksService: BanksService,
        private script: ScriptsService,
    ) {
        // this.script
        //   .load('plaid')
        //   .then(data => {
        //     this.plaidStatus$.next(!!data);
        //   })
        //   .catch(error => console.log(error));
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
            system: ['plaid', Validators.required],
        });
        // console.log(this.form);

        // this.form = this.fb.group({
        //   client: ['', Validators.required],
        //   password: ['', Validators.required],
        // });
        this.bankList$ = this.store.select(fromBanks.selectBanksListState);
    }

    onSubmit() {
        if (this.formBank.value.query.length > 1) {
            this.store.dispatch(
                new BanksActions.LoadBanks(this.formBank.value.query),
            );
        }
    }

    onConnect(bank: IBank) {
        if (this.form.valid && bank) {
            const connectData: IConnect = {
                username: this.form.value.client,
                password: this.form.value.password,
                type: bank.type,
            };
            this.store.dispatch(new BanksActions.Connect(connectData));
        }
    }

    onSkip() {
        this.store.dispatch(new BanksActions.ConnectSuccess());
    }

    onBankChange(bank: IBank) {
        this.store.dispatch(new BanksActions.ChangeBank(bank));
    }

    onBack() {
        this.store.dispatch(new BanksActions.ResetBank());
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
