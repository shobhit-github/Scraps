import {Injectable} from '@angular/core';
import {IBanksService, IBank, IConnect} from '../interfaces/banks.interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BanksService implements IBanksService {
    constructor(private http: HttpClient) {
    }

    getAccess(
        public_token: string,
        metadata: any,
    ): Observable<{
        access_token: string;
        item_id: string;
        request_id: string;
    }> {
        return this.http
            .post(`${environment.baseUrl}/connect-bank/get-access-token`, {
                public_token,
                institution_id: metadata.institution.institution_id,
            })
            .pipe(
                map(
                    (resp: {
                        data: {
                            access_token: string;
                            item_id: string;
                            request_id: string;
                        };
                    }) => resp.data,
                ),
            );
    }

    getPublic(): Observable<{
        plaid_public_key: string;
        plaid_environment: string;
    }> {
        return this.http
            .get(`${environment.baseUrl}/connect-bank/info`)
            .pipe(
                map(
                    (resp: { plaid_public_key: string; plaid_environment: string }) =>
                        resp,
                ),
            );
    }

    getBanksList(query: string): Observable<Array<IBank>> {
        return this.http
            .get(`${environment.baseUrl}/connect-bank/search`, {
                params: {
                    search: query,
                },
            })
            .pipe(map((data: { search: Array<IBank> }) => data.search));
    }

    getTopBanksList(): Observable<Array<IBank>> {
        const bank: Observable<Array<IBank>> = of([
            {name: '', type: '', logo: ''},
        ]);
        return bank;
    }

    connectToBank(connectData: IConnect): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/connect-bank/connect`,
            connectData,
        );
    }
}
