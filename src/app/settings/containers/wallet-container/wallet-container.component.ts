import {Component, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {LoadWalletKeys, UpdateWalletKeys} from '../../actions/wallet.actions';

@Component({
    selector: 'app-wallet-container',
    templateUrl: './wallet-container.component.html',
    styleUrls: ['./wallet-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletContainerComponent {
    public walletKeys$ = this.store.pipe(select(fromStore.getWalletKeys));

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadWalletKeys());
    }

    public saveWalletKeys(e) {
        this.store.dispatch(new UpdateWalletKeys(e));
    }
}
