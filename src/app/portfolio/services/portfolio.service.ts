import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPortfolio} from '../interfaces/portfolio';
import {environment} from '../../../environments/environment';
import {pluck} from 'rxjs/operators';
import {ICard} from 'src/app/settings/interfaces/security.interfaces';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    constructor(private http: HttpClient) {
    }

    getPortfolioList(): Observable<Array<IPortfolio>> {
        return this.http
            .get<Array<IPortfolio>>(`${environment.baseUrl}/portfolio/skrap/index`, {
                params: {limit: '5', page: '1'},
            })
            .pipe(pluck('data'));
    }

    getUsersPortfolioList(): Observable<Array<IPortfolio>> {
        return this.http
            .get<Array<IPortfolio>>(`${environment.baseUrl}/portfolio/user/index`, {
                params: {limit: '4', page: '1'},
            })
            .pipe(pluck('data'));
    }

    getSuggest(risk: number): Observable<IPortfolio> {
        return this.http
            .get(`${environment.baseUrl}/portfolio/skrap/suggest/${risk}`)
            .pipe(pluck('data'));
    }

    getCurrent(): Observable<IPortfolio> {
        return this.http.get(`${environment.baseUrl}/portfolio/skrap/current-portfolio`)
            .pipe(pluck('data'));
    }

    usePortfolio(portfolioId: string): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/portfolio/skrap/copy/${portfolioId}`,
            {},
        );
    }

    confirmPortfolio(data: {
        portfolio: IPortfolio;
        payment: ICard;
        amount: number;
    }): Observable<any> {
        return this.http.post(`${environment.baseUrl}/portfolio/`, data);
    }
}
