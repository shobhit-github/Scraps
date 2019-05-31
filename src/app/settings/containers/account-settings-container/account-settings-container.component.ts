import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromAccount from '../../actions/account.actions';
import {
    IAccountAddress,
    IAccountPersonal,
    IAccountPreference,
} from '../../interfaces/account.insterfaces';
import * as fromStore from '../../reducers';
import {MatDialog} from '@angular/material';
import {ChangePasswordSettingsComponent} from '../../components/change-password-settings/change-password-settings.component';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IChangePasswordSettings} from '../../interfaces/change-password.interfaces';
import {getTFA, getEmployments, getIncome} from '../../../auth/reducers';
import {
    LoadIncome,
    LoadEmployments,
} from '../../../auth/actions/demographics.actions';

@Component({
    selector: 'app-account-settings-container',
    templateUrl: './account-settings-container.component.html',
    styleUrls: ['./account-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsContainerComponent implements OnInit, OnDestroy {
    public personal$ = this.store.pipe(select(fromStore.getPersonal));
    public employmentOptList$ = this.store.pipe(select(getEmployments));
    public incomeOptList$ = this.store.pipe(select(getIncome));
    public isTFA$ = this.store.pipe(select(getTFA));
    public address$ = this.store.pipe(select(fromStore.getAddress));
    public preference$ = this.store.pipe(select(fromStore.getPreference));
    private subscribtion: Subscription;

    constructor(
        private store: Store<fromStore.SettingsState>,
        private dialog: MatDialog,
    ) {
        this.store.dispatch(new fromAccount.LoadAccountSettings());
        this.store.dispatch(new LoadEmployments());
        this.store.dispatch(new LoadIncome());
    }

    public failed$ = this.store.pipe(select(fromStore.getFailed));

    ngOnInit() {
    }

    updatePersonal(personal: IAccountPersonal): void {
        this.store.dispatch(new fromAccount.UpdatePersonal(personal));
    }

    updateAddress(data: IAccountAddress): void {
        this.store.dispatch(new fromAccount.UpdateAddress(data));
    }

    updatePreference(data: IAccountPreference): void {
        this.store.dispatch(new fromAccount.UpdatePreference(data));
    }

    openPasswordDialog(isTFA: boolean): void {
        if (isTFA) {
            this.store.dispatch(new fromAccount.SendCode());
        }
        const dialogRef = this.dialog.open(ChangePasswordSettingsComponent, {
            width: '700px',
            height: 'auto',
            panelClass: 'modal',
        });
        dialogRef.componentInstance.isTFA = isTFA;
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
        this.subscribtion = dialogRef.afterClosed().subscribe((data: FormGroup) => {
            if (data) {
                this.updatePassword(data ? data.value : undefined);
            }
        });
    }

    ngOnDestroy() {
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
    }

    updatePassword(data: IChangePasswordSettings): void {
        this.store.dispatch(new fromAccount.UpdatePassword(data));
    }
}
