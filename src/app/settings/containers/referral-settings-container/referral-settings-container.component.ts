import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {LoadReferral} from '../../actions/referral.actions';

@Component({
    selector: 'app-referral-settings-container',
    templateUrl: './referral-settings-container.component.html',
    styleUrls: ['./referral-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralSettingsContainerComponent {
    public link$ = this.store.pipe(select(fromStore.getReferralLink));

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadReferral());
    }
}
