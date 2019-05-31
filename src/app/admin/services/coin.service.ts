import {Injectable} from '@angular/core';
import {ICoinService, ICoin} from '../interfaces/coin.interface';
import {
    IPaginationRequest,
    IPaginationResponse,
} from '../../core/interfaces/pagination.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CoinService implements ICoinService {
    getCoins({
                 limit,
                 page,
             }: IPaginationRequest): Observable<IPaginationResponse<Array<ICoin>>> {
        const params = {
            limit: String(limit),
            page: String(page),
        };
        return this.http.get<IPaginationResponse<Array<ICoin>>>(
            `${environment.baseUrl}/admin/coin/index`,
            {params},
        );
    }

    saveCoin(data: FormData): Observable<any> {
        return this.http.post(`${environment.baseUrl}/admin/coin/store`, data);
    }

    updateCoin(data: FormData, id: string): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/admin/coin/update/${id}`,
            data,
        );
    }

    deleteCoin(coin: ICoin): Observable<any> {
        return this.http.delete(
            `${environment.baseUrl}/admin/coin/destroy/${coin.id}`,
        );
    }

    constructor(private http: HttpClient) {
    }
}
