import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IYodleeService} from '../interfaces/yodlee-service';
import {IYodleeCreds} from '../reducers/yodlee.reducer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {environment as prod} from 'src/environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class YodleeService implements IYodleeService {
    constructor(private http: HttpClient) {
    }

    getCreds(): Observable<IYodleeCreds> {
        return this.http
            .get(`${prod.baseUrl}/connect-bank/get-yodlee-info`)
            .pipe(map((res: { data: IYodleeCreds }) => res.data));
    }

    getForm(creds: IYodleeCreds): Observable<string> {
        // const credsWithoutUrl = Object.keys(creds)
        //   // .filter(key => key !== 'NODE_URL')
        //   .reduce(
        //     (memo, key: keyof IYodleeCreds) => ({
        //       ...memo,
        //       [key]: creds[key],
        //     }),
        //     {},
        //   );
        const body = new URLSearchParams();
        Object.entries(creds).forEach(([key, val]) =>
            body.set(key, String(val)),
        );
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        });

        return <Observable<string>>this.http.post(creds.NODE_URL, body.toString(), {
            headers,
            withCredentials: true,
            responseType: 'text',
        });
    }
}
