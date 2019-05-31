import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {MatDialog} from '@angular/material';
import {LightboxComponent} from '../../components/lightbox/lightbox.component';
import {EStatusesSource} from '../../interfaces/table.interfaces';
import * as AdminActions from '../../actions/admin.actions';

@Component({
    selector: 'app-lightbox-container',
    templateUrl: './lightbox-container.component.html',
    styleUrls: ['./lightbox-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxContainerComponent implements OnInit {
    @Input() public disabled: boolean;
    @Input() public userId: number;
    @Input() public attachedDocs: Array<string>;

    constructor(
        private store: Store<fromStore.State>,
        private dialog: MatDialog,
    ) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(LightboxComponent, {
            width: '90%',
            data: this.attachedDocs,
        });

        dialogRef
            .afterClosed()
            .subscribe((result: { status: EStatusesSource } | undefined) => {
                if (result) {
                    this.store.dispatch(
                        new AdminActions.Update({
                            status: result.status,
                            userId: String(this.userId),
                        }),
                    );
                }
            });
    }

    ngOnInit() {
    }
}
