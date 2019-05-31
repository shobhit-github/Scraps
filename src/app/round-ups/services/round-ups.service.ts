import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRoundUpsService} from '../interfaces/round-ups-service.interface';
import {IRoundUp} from '../interfaces/round-up.interface';
import {Observable} from 'rxjs';
import {IRoundUpInfo} from '../interfaces/round-up-info.interface';
import {IRoundUpRecurring} from '../interfaces/round-up-recurring.interface';
import {
    IPaginationRequest,
    IPaginationResponse,
} from 'src/app/core/interfaces/pagination.interface';
import {
    IPlaidTransactions,
    ITransaction,
} from '../interfaces/plaid-transactions.inteface';
import {environment} from 'src/environments/environment';
import {pluck, map, tap} from 'rxjs/operators';
import {IMeta} from 'src/app/admin/interfaces/user-for-admin.interface';
import {RoundUpAdapter} from '../helpers/round-up.adapter';
import {
    IOriginRoundUpsInfo,
    RoundUpInfoAdapter,
} from '../helpers/round-up-info.adapter';
import {ERoundUpFilter} from '../interfaces/round-up-filter.enum';

@Injectable({
    providedIn: 'root',
})
export class RoundUpsService implements IRoundUpsService {
    constructor(private http: HttpClient) {
    }

    getRoundUps(
        params: IPaginationRequest,
        type?: ERoundUpFilter,
    ): Observable<IPaginationResponse<Array<IRoundUp>>> {
        const {page, limit} = params;
        const paramsWithFilter: {
            page: string;
            per_page: string;
            pending?: '0' | '1';
        } = {page: String(page), per_page: String(limit)};
        if (type !== ERoundUpFilter.all) {
            paramsWithFilter.pending = type === ERoundUpFilter.pending ? '1' : '0';
        }
        return this.http
            .get(`${environment.baseUrl}/round-up/transactions`, {
                params: paramsWithFilter,
            })
            .pipe(
                map(
                    (data: {
                        transactions: Array<ITransaction>;
                        total_transactions: number;
                    }) => ({
                        meta: <IMeta>{
                            current_page: page,
                            per_page: limit,
                            total: Math.ceil(data.total_transactions / limit),
                        },
                        data: data.transactions.map(
                            transaction => new RoundUpAdapter(transaction),
                        ),
                    }),
                ),
            );
    }

    getInfo(): Observable<IRoundUpInfo> {
        return this.http.get(`${environment.baseUrl}/round-up/index`).pipe(
            pluck('data'),
            map((data: IOriginRoundUpsInfo) => new RoundUpInfoAdapter(data)),
        );
    }

    getRecurring(): Observable<IRoundUpRecurring> {
        throw new Error('Method not implemented.');
    }

    setRecurring(recurring: IRoundUpRecurring): Observable<any> {
        throw new Error('Method not implemented.');
    }

    getTransactions(): Observable<IPlaidTransactions> {
        throw new Error('Method not implemented.');
    }
}
