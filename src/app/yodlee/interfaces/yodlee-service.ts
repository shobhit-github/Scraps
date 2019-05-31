import {Observable} from 'rxjs';
import {IYodleeCreds} from '../reducers/yodlee.reducer';

export interface IYodleeService {
    getCreds(): Observable<IYodleeCreds>;

    getForm(creds: IYodleeCreds): Observable<string>;
}
