import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {pluck} from 'rxjs/operators';
import {IWalletKeys} from '../interfaces/wallet.interfaces';

@Injectable({
    providedIn: 'root'
})
export class WalletSettingsService {

    constructor(private http: HttpClient) {
    }

    public getWalletKeys(): Observable<IWalletKeys> {
        return this.http
            .get(`${environment.baseUrl}/setting/wallet/index`)
            .pipe(
                pluck('data'),
            );
    }

    public setWalletKeys(data): Observable<any> {
        return this.http
            .post(`${environment.baseUrl}/setting/wallet/update-wallet`, {
                private_key: data.private_key,
                public_key: data.public_key,
            });
    }
}
