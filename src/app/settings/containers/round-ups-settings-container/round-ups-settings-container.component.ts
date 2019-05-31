import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/round-ups-settings.reducer';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs';
import {State} from '../../reducers/round-ups-settings.reducer';
import {
    Load,
    SetCard,
    Save,
    SetStatus,
} from '../../actions/round-ups-settings.actions';
import {ERoundUpsStatus} from '../../interfaces/round-ups-settings.interfaces';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';

@Component({
    selector: 'app-round-ups-settings-container',
    templateUrl: './round-ups-settings-container.component.html',
    styleUrls: ['./round-ups-settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundUpsSettingsContainerComponent {
    public info$: Observable<State>;
    public ERoundUpsStatus = ERoundUpsStatus;

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new Load());
        this.info$ = this.store.pipe(select(fromRoot.getRoundUps));
    }

    selectCard(card: IStripeCard) {
        this.store.dispatch(new SetCard(card));
    }

    save(card: IStripeCard) {
        this.store.dispatch(new Save(card));
    }

    pause() {
        this.store.dispatch(new SetStatus(ERoundUpsStatus.paused));
    }

    start() {
        this.store.dispatch(new SetStatus(ERoundUpsStatus.started));
    }

    close() {
        this.store.dispatch(new SetStatus(ERoundUpsStatus.closed));
    }
}
