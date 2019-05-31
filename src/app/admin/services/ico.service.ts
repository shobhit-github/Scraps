import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {IIco} from '../../ico/interfaces/ico.interface';
import {IMeta} from '../interfaces/user-for-admin.interface';

@Injectable({
    providedIn: 'root',
})
export class IcoService {
    constructor(private http: HttpClient) {
    }

    private types = ['top', 'active', 'air'];

    public getIco({
                      limit = 100,
                      page = 1,
                      type,
                  }: {
        limit?: number | string;
        page?: number | string;
        type?: string;
    }): Observable<{ meta: IMeta; data: Array<IIco> }> {
        limit = String(limit);
        page = String(page);
        // if (type === 'all') {
        //   return forkJoin(
        //     this.types.map(t => this.getRequest({ limit, page, type: t })),
        //   ).pipe(map(([tops, actives, airs]) => [...tops, ...actives, ...airs]));
        // }
        return this.getRequest({limit, page, type});
    }

    private getRequest({limit, page, type}) {
        const params: {
            limit?: string;
            page?: string;
            type?: string;
        } = {limit, page};
        if (typeof type !== 'undefined') {
            params.type = type;
        }
        return this.http.get<{ meta: IMeta; data: Array<IIco> }>(
            `${environment.baseUrl}/admin/ico/index`,
            {
                params,
            },
        );
        // .pipe(map((resp: { data: Array<IIco>; meta: IMeta }) => resp));
    }

    public addOrUdateIco(data: IIco | FormData) {
        const id = data instanceof FormData ? data.get('id') : data.id;
        const isNew =
            data instanceof FormData ? data.get('isNew') === 'true' : data.isNew;
        if (!isNew) {
            return this.http.post(
                `${environment.baseUrl}/admin/ico/update/${id}`,
                data,
            );
        } else {
            return this.http.post(`${environment.baseUrl}/admin/ico/store`, data);
        }
    }

    public deleteIco(id: number | string) {
        id = String(id);
        // return of<Object>(new HttpResponse({ status: 200 }));
        return this.http.delete(`${environment.baseUrl}/admin/ico/destroy/${id}`);
    }
}
