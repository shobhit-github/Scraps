import {IRoundUpInfo} from './round-up-info.interface';
import {IRoundUp} from './round-up.interface';
import {IRoundUpRecurring} from './round-up-recurring.interface';
import {Observable} from 'rxjs';
import {
    IPaginationResponse,
    IPaginationRequest,
} from 'src/app/core/interfaces/pagination.interface';
import {IPlaidTransactions} from './plaid-transactions.inteface';
import {ERoundUpFilter} from './round-up-filter.enum';

export interface IRoundUpsService {
    getRoundUps(
        params: IPaginationRequest,
        type?: ERoundUpFilter,
    ): Observable<IPaginationResponse<Array<IRoundUp>>>;

    getInfo(): Observable<IRoundUpInfo>;

    getRecurring(): Observable<IRoundUpRecurring>;

    setRecurring(recurring: IRoundUpRecurring): Observable<any>;

    getTransactions(): Observable<IPlaidTransactions>;
}

export interface IRoundUpsServiceMock {
    getRecurring(): Observable<IRoundUpRecurring>;

    setRecurring(recurring: IRoundUpRecurring): Observable<any>;

    getTransactions(): Observable<IPlaidTransactions>;
}
