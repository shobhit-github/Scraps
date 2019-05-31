import {Observable} from 'rxjs';

export interface IBank {
    name: string;
    type: string;
    logo: string | null;
}

export interface IConnect {
    type: string;
    username: string;
    password: string;
    pin?: string;
}

export interface IBanksService {
    getBanksList(query: string): Observable<Array<IBank>>;

    getTopBanksList(): Observable<Array<IBank>>;

    connectToBank(connectData: IConnect): Observable<any>;
}
