import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../reducers';

@Component({
    selector: 'app-manage-cards-settings-container',
    templateUrl: './manage-cards-settings-container.component.html',
    styleUrls: ['./manage-cards-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCardsSettingsContainerComponent implements OnInit {

    constructor(private store: Store<fromStore.State>) {
    }

    ngOnInit() {
    }

}
