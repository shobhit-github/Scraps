import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../reducers/bank.reducer';

@Component({
    selector: 'app-add-container',
    templateUrl: './add-container.component.html',
    styleUrls: ['./add-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddContainerComponent implements OnInit {

    constructor(private store: Store<fromStore.State>) {
    }

    ngOnInit() {
    }

}
