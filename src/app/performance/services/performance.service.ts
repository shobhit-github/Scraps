import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PerformanceService {
    constructor(private http: HttpClient) {
    }

    getRecentActivity(
        {
            activeType,
            page
        }: {
            activeType: string;
            page: number;
        }): Observable<any> {
        return this.http.post(`${environment.baseUrl}/event/activity/recent`,
            {
                orders: [
                    {
                        'name': 'created_at',
                        'sort': 'desc',
                    },
                ],
            },
            {
                params: {
                    limit: '6',
                    page: String(page),
                    type: activeType,
                },
            },
        );
    }
}
