import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/identity.reducer';
import {Observable, Subscription} from '../../../../../node_modules/rxjs';
import {IFileMessageResponse} from '../../../message/interfaces/chat.interfaces';
import {getImages} from '../../reducers';
import {
    MatDialogRef,
    MatDialog,
} from '../../../../../node_modules/@angular/material';
import {IdentityContainerComponent} from '../../../auth/containers/identity-container/identity-container.component';
import {ResetType} from '../../../auth/actions/identity.actions';
import {LoadIdentity} from '../../actions/identity.actions';

@Component({
    selector: 'app-identity-settings-container',
    templateUrl: './identity-settings-container.component.html',
    styleUrls: ['./identity-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentitySettingsContainerComponent implements OnInit {
    public fileList$: Observable<Array<IFileMessageResponse>>;
    private dialogRef: MatDialogRef<IdentityContainerComponent>;
    private subscription: Subscription;

    constructor(
        private store: Store<fromStore.State>,
        private dialog: MatDialog,
    ) {
        this.fileList$ = this.store.pipe(select(getImages));
    }

    upload() {
        this.dialogRef = this.dialog.open(IdentityContainerComponent, {
            width: '700px',
            height: 'auto',
            panelClass: 'modal',
        });
        this.dialogRef.componentInstance.isPopup = true;
        this.dialogRef.componentInstance.dialogRef = this.dialogRef;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new ResetType());
            this.store.dispatch(new LoadIdentity());
        });
    }

    ngOnInit() {
    }
}
