import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IYodleeCreds} from '../reducers/yodlee.reducer';
import {IYodleeService} from '../interfaces/yodlee-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class YodleeMockService implements IYodleeService {
    constructor(private http: HttpClient) {
    }

    getCreds(): Observable<IYodleeCreds> {
        return of({
            // NODE_URL: '/authenticate/restserver/',
            NODE_URL: 'https://node.developer.yodlee.com/authenticate/restserver/',
            RSESSION:
            // tslint:disable-next-line:max-line-length
                '08062013_1:6417132b6249a44148a844d4af629cc669c31f6fe1889e2028307eb1e5815ac9c38ba12b94a18d34afad221c0918c897fd16a4126b5ee064aea80f78303d08f0',
            FINAPP_ID: '10003600',
            TOKEN: '25421d60b8b6a59a8e2be2ffc31484ac58c9462d2702acbdbd32d96db748b976',
            EXTRA_PARAMS: '',
        });
    }

    getForm(creds: IYodleeCreds): Observable<string> {
        const credsWithoutUrl = Object.keys(creds)
        // .filter(key => key !== 'NODE_URL')
            .reduce(
                (memo, key: keyof IYodleeCreds) => ({
                    ...memo,
                    [key]: creds[key],
                }),
                {},
            );
        const body = new URLSearchParams();
        Object.entries(credsWithoutUrl).forEach(([key, val]) =>
            body.set(key, String(val)),
        );
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        });

        return <Observable<string>>this.http.post(
            `${environment.baseUrl}/authenticate/restserver/`,
            body.toString(),
            {
                headers,
                withCredentials: true,
                responseType: 'text',
            },
        );
    }
}
