import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    IStripeCard,
    IStripeCardPlaid,
    StripeCardAdapter,
} from 'src/app/invest/interfaces/stripe-card.interface';

import {IRoundUpsSettingsService} from '../interfaces/round-ups-service.interface';
import {ERoundUpsStatus} from '../interfaces/round-ups-settings.interfaces';
import {State} from '../reducers/round-ups-settings.reducer';
import {environment} from 'src/environments/environment';
import {pluck, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RoundUpsSettingsService implements IRoundUpsSettingsService {
    constructor(private http: HttpClient) {
    }

    getRoundUpsSettings(): Observable<State> {
        return this.http.get(`${environment.baseUrl}/setting/round-up/index`).pipe(
            pluck('data'),
            map(
                ({
                     banks,
                     status,
                     active_bank,
                 }: {
                    banks: Array<IStripeCardPlaid>;
                    status: ERoundUpsStatus;
                    active_bank: IStripeCardPlaid;
                }) => {
                    const cardList = banks.map(item => StripeCardAdapter.fromPlaid(item));
                    const state: State = {
                        cardList,
                        status,
                    };
                    if (active_bank) {
                        state.usedCard = StripeCardAdapter.fromPlaid(active_bank);
                    } else {
                        state.tmpCard = cardList[0];
                    }
                    return state;
                },
            ),
        );
    }

    saveCard(card: IStripeCard): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/setting/round-up/update-active-bank`,
            {active_bank_id: card.id},
        );
    }

    setStatus(status: ERoundUpsStatus): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/setting/round-up/update-round-up-status`,
            {status},
        );
    }
}
