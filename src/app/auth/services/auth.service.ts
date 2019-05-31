import {Injectable} from '@angular/core';
import {RootAuthModule} from '../auth.module';
import {IRegisterInfo} from '../interfaces/register.interface';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, NEVER, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ILoginResponse, ILoginRequest} from '../interfaces/login.interface';
import {IForgotRequest} from '../interfaces/forgot.interface';
import {Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as AuthActions from '../actions/auth.actions';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {IChangePasswordRequest} from '../interfaces/change.interface';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    protected logoutUrl = `${environment.baseUrl}/auth/sign-out`;

    constructor(
        protected http: HttpClient,
        protected jwtHelper: JwtHelperService,
        protected storageService: StorageService,
    ) {
        // this.store.dispatch()
        // TODO: store
    }

    public registerUser(registerData: IRegisterInfo): Observable<any> {
        // this.storageService.deleteAdmin();
        return this.http.post(`${environment.baseUrl}/auth/sign-up`, registerData);
    }

    public login(loginData: ILoginRequest) {
        // this.storageService.deleteAdmin();
        return this.http.post(`${environment.baseUrl}/auth/sign-in`, loginData);
    }

    public logout() {
        if (this.isAuth()) {
            return this.http.get(this.logoutUrl);
        } else {
            return of({fake: true});
        }
    }

    public forgot(forgotData: IForgotRequest) {
        return this.http.post(
            `${environment.baseUrl}/auth/forgot-password`,
            forgotData,
        );
    }

    public reset(forgotData: IChangePasswordRequest) {
        return this.http.post(
            `${environment.baseUrl}/auth/change-password`,
            forgotData,
        );
    }

    // public saveLoginData(loginData: ILoginResponse) {
    //   // this.storageService.saveLoginData(loginData);
    // }
    public isAuth(): boolean {
        return !this.jwtHelper.isTokenExpired();
    }

    public refreshToken() {
        return this.http.get(`${environment.baseUrl}/auth/refresh-token`);
    }

    public confirmCodeTFA(code: string) {
        return this.http.put(
            `${environment.baseUrl}/two-factor-auth/confirm-code`,
            {code},
        );
    }

    public resendCodeTFA() {
        return this.http.get(`${environment.baseUrl}/two-factor-auth/send-code`);
    }

    public confirmEmail(token: string) {
        return this.http.post(`${environment.baseUrl}/auth/confirm-email`, {
            token,
        });
    }

    public checkToken(data: { token: string; user_id: number | string }) {
        return this.http.post(`${environment.baseUrl}/auth/check-token`, data);
    }

    public checkTFA() {
        return this.http.get(`${environment.baseUrl}/auth/check-two-factor-auth`);
    }
}
