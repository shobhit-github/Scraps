import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Store, select} from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import {Observable} from 'rxjs';
import {EStatuses, EStatusesSource} from '../../../admin/interfaces/table.interfaces';

@Component({
    selector: 'app-not-yet-modal',
    templateUrl: './not-yet-modal.component.html',
    styleUrls: ['./not-yet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotYetModalComponent implements OnInit {
    // public EStatusesSource = EStatusesSource;
    // public userStatus$: Observable<EStatuses>;
    constructor(
        public ref: MatDialogRef<NotYetModalComponent>,
        // private store: Store<fromAuth.State>,
    ) {
        // this.userStatus$ = this.store.pipe(select(fromAuth.getUserStatus));
    }

    ngOnInit() {
    }
}
