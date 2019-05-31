import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginResponse} from '../interfaces/login.interface';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor(protected http: HttpClient) {
    }

    // saveStep(step: number): void {
    //   localStorage.setItem('globalRegisterStep', String(step));
    // }
    // setAdmin() {
    //   localStorage.setItem('isAdmin', 'true');
    // }
    // setPhoneSuccess() {
    //   localStorage.setItem('phoneSuccess', 'true');
    // }
    // setPhoneFail() {
    //   localStorage.removeItem('phoneSuccess');
    // }
    // setCodeSuccess() {
    //   localStorage.setItem('codeSuccess', 'true');
    // }
    // setCodeFail() {
    //   localStorage.removeItem('codeSuccess');
    // }
    isAdmin(): boolean {
        const adminStr = localStorage.getItem('admin');
        const admin = adminStr ? JSON.parse(adminStr) : null;
        let isAdmin: boolean;
        if (admin && admin.login) {
            isAdmin = admin.login.isAdmin;
        }
        return !!isAdmin;
    }

    // deleteAdmin(): void {
    //   localStorage.removeItem('isAdmin');
    // }
    // deleteLogin(): void {
    //   localStorage.removeItem('loginData');
    // }
    // saveLoginData(loginData: ILoginResponse): void {
    //   localStorage.setItem('loginData', JSON.stringify(loginData));
    // }
}
