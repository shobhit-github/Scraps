import {
    IPaginationRequest,
    IPaginationResponse,
} from '../../core/interfaces/pagination.interface';
import {Observable} from 'rxjs';

export interface ICoin {
    id?: string;
    name: string;
    icon: string | File;
    color: string;
    isNew?: boolean;
}

export interface ICoinService {
    getCoins(
        pagination: IPaginationRequest,
    ): Observable<IPaginationResponse<Array<ICoin>>>;

    saveCoin(data: FormData): Observable<any>;

    updateCoin(data: FormData, id: string): Observable<any>;

    deleteCoin(coin: ICoin): Observable<any>;
}
