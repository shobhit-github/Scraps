import {Injectable} from '@angular/core';
import {IIdentityRequest} from '../interfaces/identity.interface';
import {Observable, forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, mergeMap} from '../../../../node_modules/rxjs/operators';
import {EIdentity} from '../interfaces/identity.enum';

@Injectable({
    providedIn: 'root',
})
export class IdentityService {
    constructor(private http: HttpClient) {
    }

    public uploadPhoto(list: Array<FormData>, type: EIdentity): Observable<any> {
        return forkJoin(
            list.map(data =>
                this.http.post(`${environment.baseUrl}/identity/image`, data),
            ),
        ).pipe(
            mergeMap((photoList: Array<number>) => this.savePhotos(photoList, type)),
        );
    }

    public savePhotos(photoList: Array<number>, type: EIdentity) {
        return this.http.post(`${environment.baseUrl}/identity/check-identity`, {
            images: photoList,
            type,
        });
    }
}
