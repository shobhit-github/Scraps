import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ISimpleOpt} from '../interfaces/demographics.interfaces';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DemographicsService {
    constructor(private http: HttpClient) {
    }

    setDemographics(data) {
        return this.http.post(
            `${environment.baseUrl}/personal/save-personal-info`,
            data,
        );
    }

    getEmployments(): Observable<Array<ISimpleOpt>> {
        return this.http
            .get(`${environment.baseUrl}/dictionary/get-employment-list`)
            .pipe(map((resp: { data: Array<ISimpleOpt> }) => resp.data));
    }

    getIncome(): Observable<Array<ISimpleOpt>> {
        return this.http
            .get(`${environment.baseUrl}/dictionary/get-income-list`)
            .pipe(map((resp: { data: Array<ISimpleOpt> }) => resp.data));
    }
}
