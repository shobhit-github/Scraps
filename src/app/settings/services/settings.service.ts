import {Injectable} from '@angular/core';
import {Observable, forkJoin, of} from 'rxjs';
import {
    IAccountSettings,
    IAccountPersonal,
    IAccountAddress,
    IAccountPreference,
    INewAccountSettings,
} from '../interfaces/account.insterfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, pluck, catchError} from 'rxjs/operators';
import {IProfileSettings} from '../interfaces/profile.interfaces';
import {
    INotificationsSettings,
    INotificationsRequest,
} from '../interfaces/notifications.interfaces';
import {IChangePasswordSettings} from '../interfaces/change-password.interfaces';
import {
    ISecuritySettingsPhone,
    IBankSettings,
    IPlaidSettings,
} from '../interfaces/security.interfaces';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    constructor(private http: HttpClient) {
    }

    public getAccount(): Observable<IAccountSettings> {
        return this.http.get(`${environment.baseUrl}/setting/account/index`).pipe(
            map(data => data),
            pluck('data'),
            map((newData: INewAccountSettings) => {
                const data: IAccountSettings = {
                    personal: Object.entries(newData.personal)
                        .map(([newKey, newVal]) => {
                            let val = newVal;
                            let key = newKey;
                            if ((newKey === 'employment' || newKey === 'income') && newVal) {
                                key = `${newKey}_id`;
                                val = newVal.id;
                            }
                            return [key, val];
                        })
                        .reduce((memo, [key, val]) => {
                            return {...memo, [key]: val};
                        }, {}),
                    address: newData.address,
                    preference: newData.preference,
                };
                return data;
            }),
        );
    }

    public updatePersonal(personal: IAccountPersonal): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/account/update-personal`,
            personal,
        );
    }

    public updateAddress(address: IAccountAddress): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/account/update-address/${address.id}`,
            address,
        );
    }

    public updatePreference(preference: IAccountPreference): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/account/update-preference/${
                preference.id
                }`,
            preference,
        );
    }

    public getProfile(): Observable<IProfileSettings> {
        return this.http
            .get(`${environment.baseUrl}/setting/profile/index`)
            .pipe(map((resp: { data: IProfileSettings }) => resp.data));
    }

    public updateProfile(data: FormData): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/setting/profile/update`,
            data,
        );
    }

    public getSecurity(): Observable<IProfileSettings> {
        return this.http
            .get(`${environment.baseUrl}/setting/security/index`)
            .pipe(map((resp: { data: IProfileSettings }) => resp.data));
    }

    public updatePhone(phoneConfig: ISecuritySettingsPhone): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/security/update-phone`,
            phoneConfig,
        );
    }

    public closeAccount(): Observable<any> {
        return this.http.get(
            `${environment.baseUrl}/setting/security/update-close-account`,
        );
    }

    public getNotifications(): Observable<INotificationsSettings> {
        return this.http
            .get(`${environment.baseUrl}/setting/notification/index`)
            .pipe(map((resp: { data: INotificationsSettings }) => resp.data));
    }

    public getReferral(): Observable<{ referral: string }> {
        return this.http
            .get(`${environment.baseUrl}/setting/referral/index`)
            .pipe(map((resp: { data: { referral: string } }) => resp.data));
    }

    public updateNotifications(
        list: Array<INotificationsRequest>,
    ): Observable<any> {
        return forkJoin(
            list.map(item =>
                this.http.put(
                    `${environment.baseUrl}/setting/notification/update-notification`,
                    item,
                ),
            ),
        );
    }

    public updateDesktopNotifications(status: 0 | 1): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/notification/update-desktop-notification`,
            {desktop_notification: status},
        );
    }

    public updatePassword(data: IChangePasswordSettings): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/account/update-password`,
            data,
        );
    }

    public updatePasswordSendCode(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/setting/account/send-code`);
    }

    public updateTFA(status: 0 | 1): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/setting/security/update-two-factor-auth`,
            {two_factor_auth: status},
        );
    }

    public getBanks(type: string): Observable<Array<IBankSettings>> {
        return this.http
            .get(`${environment.baseUrl}/setting/security/get-bank-info`, {
                params: {
                    type,
                },
            })
            .pipe(
                map((resp: { accounts: Array<IBankSettings> }) => {
                    return resp.accounts;
                }),
            );
    }

    public getBanksByList(
        typeList: Array<{ type: string }>,
    ): Observable<Array<Array<IBankSettings>>> {
        return forkJoin(
            typeList
                .map(item => item.type)
                .map(type => this.getBanks(type))
                .reduce((obsArray, obs) => {
                    obsArray.push(obs);
                    return obsArray;
                }, new Array<Observable<Array<IBankSettings>>>()),
        );
    }

    public getBanksPlaid(id: number): Observable<IPlaidSettings> {
        return this.http
            .get(`${environment.baseUrl}/setting/security/get-plaid-account`, {
                params: {
                    id: String(id),
                },
            })
            .pipe(
                map((resp: { data: IPlaidSettings }) => {
                    return resp.data;
                }),
                catchError(err => of(null)),
            );
    }

    public getBanksPlaidByList(
        idList: Array<{ id: number }>,
    ): Observable<Array<IPlaidSettings>> {
        return forkJoin(
            idList
                .map(item => item.id)
                .map(id => this.getBanksPlaid(id))
                .reduce((obsArray, obs) => {
                    obsArray.push(obs);
                    return obsArray;
                }, new Array<Observable<IPlaidSettings>>()),
        );
    }
}
