import {Injectable} from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from '../../../../node_modules/rxjs/operators';
import {IFileMessageResponse} from '../../message/interfaces/chat.interfaces';
import {Observable} from '../../../../node_modules/rxjs';
import {EStatusesSource} from '../../admin/interfaces/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export class IdentitySettingsService {
    constructor(private http: HttpClient) {
    }

    public getIdentity(): Observable<{
        images: Array<IFileMessageResponse>;
        status: EStatusesSource;
    }> {
        return this.http.get(`${environment.baseUrl}/setting/identity/index`).pipe(
            map(
                (resp: {
                    data: {
                        images: Array<IFileMessageResponse>;
                        status: EStatusesSource;
                    };
                }) => resp.data,
            ),
        );
    }
}
