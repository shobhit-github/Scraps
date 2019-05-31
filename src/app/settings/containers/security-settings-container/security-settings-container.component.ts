import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import * as fromSecurity from '../../reducers/security.reducer';
import {
    UpdateCloseAccount,
    Load,
    UpdateTFA,
    InitUpdatePhone,
    ResetUpdatePhone,
    UpdatePhone,
    UpdatePhoneWithCode,
} from '../../actions/security.actions';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ChangePhoneSettingsComponent} from '../../components/change-phone-settings/change-phone-settings.component';
import {Subscription, Observable} from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {map, tap, startWith} from 'rxjs/operators';
import {ICountry} from '../../../auth/interfaces/verify.interface';
import * as countryData from 'country-telephone-data';
import {
    ISecuritySettings,
    ISecuritySettingsPhone,
    IBankSettings,
} from '../../interfaces/security.interfaces';

@Component({
    selector: 'app-security-settings-container',
    templateUrl: './security-settings-container.component.html',
    styleUrls: ['./security-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecuritySettingsContainerComponent {
    private _step: number;
    private _dialogRef: MatDialogRef<ChangePhoneSettingsComponent>;
    public securitySettings$ = this.store.pipe(
        select(fromStore.getSecurity),
        tap(securitySettings => {
            this.openChangePhone(securitySettings);
            if (securitySettings.step === 0 && this._dialogRef) {
                this._dialogRef.close();
            }
        }),
    );
    public error$ = this.store.pipe(select(fromStore.getSecurityError));
    public countryList: Array<ICountry> = countryData.allCountries;
    public countryList$: Observable<Array<ICountry>>;
    public defultCountry: ICountry = countryData.allCountries.filter(
        (country: ICountry) => Number(country.dialCode) === 44,
    )[0];
    private changePhoneConfig = {
        defultCountry: this.defultCountry,
        formPhone: this.fb.group({
            countryControl: this.defultCountry,
            number: [
                '',
                Validators.compose([
                    Validators.minLength(10),
                    Validators.maxLength(11),
                    Validators.pattern(/[0-9]{10,11}/),
                    Validators.required,
                ]),
            ],
        }),
        formCode: this.fb.group({
            code: [
                '',
                Validators.compose([
                    Validators.minLength(4),
                    Validators.maxLength(4),
                    Validators.pattern(/[0-9]{4}/),
                    Validators.required,
                ]),
            ],
        }),
    };
    public step$ = this.store.pipe(select(fromStore.getSecurityStep));
    private subscribtion: Subscription;

    constructor(
        private store: Store<fromStore.State>,
        public dialog: MatDialog,
        private fb: FormBuilder,
    ) {
        this.store.dispatch(new ResetUpdatePhone());
        this.store.dispatch(new Load());
        this.countryList$ = this.changePhoneConfig.formPhone
            .get('countryControl')
            .valueChanges.pipe(
                startWith<string | ICountry>(''),
                map(value => (typeof value === 'string' ? value : value.name)),
                map((name: string) => (name ? this.filter(name) : this.countryList)),
            );
    }

    onCloseAccount() {
        this.store.dispatch(new UpdateCloseAccount());
    }

    openChangePhone(securitySettings: fromSecurity.State) {
        if (securitySettings.step === 1 && !this._step) {
            this._dialogRef = this.dialog.open(ChangePhoneSettingsComponent, {
                width: '700px',
                height: 'auto',
                panelClass: 'modal',
            });
        }
        this._step = securitySettings.step;
        if (this._dialogRef && this._dialogRef.componentInstance) {
            Object.entries({
                ...this.changePhoneConfig,
                ...securitySettings,
                countryList: this.countryList,
                countryList$: this.countryList$,
                // error: this._error,
                onUpdatePhone: this.updatePhone.bind(this),
                onUpdatePhoneWithCode: this.updatePhoneWithCode.bind(this),
            }).forEach(([key, val]) => {
                this._dialogRef.componentInstance[key] = val;
            });
        }
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
        if (this._dialogRef) {
            this.subscribtion = this._dialogRef
                .afterClosed()
                .subscribe((data: FormGroup) => {
                    this.store.dispatch(new ResetUpdatePhone());
                    this.resetForm();
                });
        }
    }

    toggleTFA(status: 0 | 1) {
        this.store.dispatch(new UpdateTFA(status));
    }

    initChangePhone() {
        this.store.dispatch(new InitUpdatePhone());
    }

    filter(name: string): ICountry[] {
        return this.countryList.filter(
            option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0,
        );
    }

    public updatePhone(phoneConfig: ISecuritySettingsPhone) {
        this.store.dispatch(new UpdatePhone(phoneConfig));
    }

    public updatePhoneWithCode(phoneConfig: ISecuritySettingsPhone) {
        this.store.dispatch(new UpdatePhoneWithCode(phoneConfig));
    }

    public removeBank(bank: IBankSettings) {
        // console.log(bank);
    }

    public resetForm() {
        this.changePhoneConfig = {
            defultCountry: this.defultCountry,
            formPhone: this.fb.group({
                countryControl: this.defultCountry,
                number: [
                    '',
                    Validators.compose([
                        Validators.minLength(10),
                        Validators.maxLength(11),
                        Validators.pattern(/[0-9]{10,11}/),
                        Validators.required,
                    ]),
                ],
            }),
            formCode: this.fb.group({
                code: [
                    '',
                    Validators.compose([
                        Validators.minLength(4),
                        Validators.maxLength(4),
                        Validators.pattern(/[0-9]{4}/),
                        Validators.required,
                    ]),
                ],
            }),
        };
        this.countryList$ = this.changePhoneConfig.formPhone
            .get('countryControl')
            .valueChanges.pipe(
                startWith<string | ICountry>(''),
                map(value => (typeof value === 'string' ? value : value.name)),
                map((name: string) => (name ? this.filter(name) : this.countryList)),
            );
    }
}
