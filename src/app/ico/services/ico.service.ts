import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IIco} from '../interfaces/ico.interface';
import {map} from 'rxjs/operators';
import {ILinks, IMeta} from '../../admin/interfaces/user-for-admin.interface';

export interface IIcoListResponse {
    data: Array<IIco>;
    links: ILinks;
    meta: IMeta;
}

@Injectable({
    providedIn: 'root',
})
export class IcoService {
    constructor(private http: HttpClient) {
    }

    public getIcoList({
                          limit = 10,
                          page = 1,
                          type = 'top',
                      }: {
        limit?: string | number;
        page?: number | string;
        type?: string;
    }): Observable<IIcoListResponse> {
        limit = String(limit);
        page = String(page);
        return this.http
            .get<IIcoListResponse>(`${environment.baseUrl}/ico/get-ico-list`, {
                params: {limit, page, type},
            })
            .pipe(
                map(resp => {
                    resp.data = resp.data.filter(item => !!item.slug);
                    return resp;
                }),
            );
    }

    public getIco(slug): Observable<IIco> {
        return this.http
            .get<{ data: IIco }>(`${environment.baseUrl}/ico/get-ico`, {
                params: {slug},
            })
            .pipe(map(resp => resp.data));
    }
}
