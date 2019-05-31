import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {
    ILoginRequest,
    ILoginResponse,
} from '../../auth/interfaces/login.interface';
import {AuthService} from '../../auth/services/auth.service';
import {EStatusesSource} from '../interfaces/table.interfaces';
import {IUserForAdminResponse} from '../interfaces/user-for-admin.interface';
import {INewsAdmin} from '../interfaces/table-news.interface';
import {Sort} from '@angular/material';

@Injectable({
    providedIn: 'root',
})
export class AdminService extends AuthService {
    // constructor(protected http: HttpClient, protected jwt: JwtHelperService) {
    //   super(http, jwt, undefined);
    // }
    protected logoutUrl = `${environment.baseUrl}/admin/auth/sign-out`;

    login(loginRequest: ILoginRequest): Observable<any> | any {
        return this.http
            .post(`${environment.baseUrl}/admin/auth/sign-in`, loginRequest)
            .pipe(
                tap((resp: ILoginResponse) => {
                    // this.saveLoginData(resp);
                    // this.storageService.setAdmin();
                }),
            );
    }

    public isAuth(): boolean {
        const isAuth = super.isAuth();
        const isAdmin = this.storageService.isAdmin();
        return isAdmin && isAuth;
    }

    public setUserStatus(
        status: EStatusesSource,
        userId: string,
    ): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/admin/user-identity/update/${userId}`,
            {status},
        );
    }

    public updateNewsCat(data: FormData): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}/admin/crypto-category/update`,
            data,
        );
    }

    public getUsers({
                        limit,
                        page,
                        sort,
                    }: {
        limit: number;
        page: number;
        sort?: Sort;
    }): Observable<IUserForAdminResponse> {
        const fullSort: Sort = {active: 'id', direction: 'desc'};
        if (sort && sort.active) {
            switch (sort.active) {
                case 'dateCreated':
                    fullSort.active = 'created_at';
                    break;
                case 'legalName':
                    fullSort.active = 'name';
                    break;
            }
        }
        if (sort && sort.direction) {
            fullSort.direction = sort.direction;
        }
        return this.http.get<IUserForAdminResponse>(
            `${environment.baseUrl}/admin/user-identity/index`,
            {
                params: {
                    limit: String(limit),
                    page: String(page),
                    field: fullSort.active,
                    sort: fullSort.direction,
                },
            },
        );
    }

    public getNews(): Observable<Array<INewsAdmin>> {
        return this.http
            .get<{ data: Array<INewsAdmin> }>(
                `${environment.baseUrl}/admin/crypto-category/index`,
            )
            .pipe(map(resp => resp.data));
    }

    public downloadFile(type: string): Observable<Blob> {
        return this.http.get(
            `${environment.baseUrl}/admin/user-identity/export?extension=${type}`,
            {responseType: 'blob'},
        );
    }

    public SearchUsers({
                           limit,
                           page,
                           sort,
                           q,
                       }: {
        limit: number;
        page: number;
        sort?: Sort;
        q?: string;
    }): Observable<IUserForAdminResponse> {
        const fullSort: Sort = {active: 'id', direction: 'desc'};
        if (sort && sort.active) {
            switch (sort.active) {
                case 'dateCreated':
                    fullSort.active = 'created_at';
                    break;
                case 'legalName':
                    fullSort.active = 'name';
                    break;
            }
        }
        if (sort && sort.direction) {
            fullSort.direction = sort.direction;
        }
        return this.http.get<IUserForAdminResponse>(
            `${environment.baseUrl}/admin/user-identity/search/${q}`,
            {
                params: {
                    limit: String(limit),
                    page: String(page),
                    field: fullSort.active,
                    sort: fullSort.direction,
                },
            },
        );
    }
}
