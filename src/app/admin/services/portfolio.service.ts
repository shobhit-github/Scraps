import {Injectable} from '@angular/core';
import {
    IPaginationRequest,
    IPaginationResponse,
} from '../../core/interfaces/pagination.interface';
import {Observable} from 'rxjs';
import {pluck, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPortfolioAdmin} from '../interfaces/portfolio.interface';
import {ICoin} from '../interfaces/coin.interface';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    getPortfolios({
                      limit,
                      page,
                  }: IPaginationRequest): Observable<IPaginationResponse<Array<IPortfolioAdmin>>> {
        const params = {
            limit: String(limit),
            page: String(page),
        };
        return this.http.get<IPaginationResponse<Array<IPortfolioAdmin>>>(
            `${environment.baseUrl}/admin/portfolio/index`,
            {params},
        );
    }

    savePortfolio(data: IPortfolioAdmin): Observable<any> {
        return this.http.post(`${environment.baseUrl}/admin/portfolio/store`, data);
    }

    updatePortfolio(data: IPortfolioAdmin, id: string): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/admin/portfolio/update/${id}`,
            data,
        );
    }

    deletePortfolio(portfolio: IPortfolioAdmin): Observable<any> {
        return this.http.delete(
            `${environment.baseUrl}/admin/portfolio/destroy/${portfolio.id}`,
        );
    }

    getAllCoins(): Observable<Array<ICoin>> {
        return this.http
            .get(`${environment.baseUrl}/dictionary/get-coin-list`)
            .pipe<Array<ICoin>>(
                pluck('data'),
            );
    }

    constructor(private http: HttpClient) {
    }
}
