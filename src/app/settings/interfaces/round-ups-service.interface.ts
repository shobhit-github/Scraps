import {Observable} from 'rxjs';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';

import {State} from '../reducers/round-ups-settings.reducer';
import {ERoundUpsStatus} from './round-ups-settings.interfaces';

export interface IRoundUpsSettingsService {
    getRoundUpsSettings(): Observable<State>;

    saveCard(card: IStripeCard): Observable<any>;

    setStatus(status: ERoundUpsStatus): Observable<any>;
}
