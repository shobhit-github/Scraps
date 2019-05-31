import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class VerifyService {
    constructor(private http: HttpClient) {
    }

    public sendPhone({
                         phone,
                         country,
                     }: {
        phone: string;
        country: string;
    }): Observable<{}> {
        if (!phone || !/\+[0-9]{11,20}/.test(phone)) {
            throw new Error(`Invalid phone(${phone})`);
        }
        return this.http.post(`${environment.baseUrl}/identity/send-code`, {
            phone,
            country,
        });
    }

    public sendCode(code_confirmation: string): Observable<any> {
        if (!code_confirmation || !/[0-9]{4}/.test(code_confirmation.toString())) {
            throw new Error(`Invalid code (${code_confirmation})`);
        }
        return this.http.post(`${environment.baseUrl}/auth/confirm-email`, {
            code_confirmation,
        });
    }

    public reSendCode(): Observable<any> {
        return this.http.post(`${environment.baseUrl}/auth/send-email-token`, {});
    }

    public sendCodeSms(code: string): Observable<any> {
        if (!code || !/[0-9]{4}/.test(code.toString())) {
            throw new Error(`Invalid code(${code})`);
        }
        return this.http.post<HttpResponse<any>>(`${environment.baseUrl}/identity/verify-phone`, {
            code,
        });
    }
}
