import {Action} from '@ngrx/store';
import {IIco} from '../interfaces/ico.interface';
import {IIcoListResponse} from '../services/ico.service';

export enum ListActionTypes {
    LoadList = '[List] Load Lists',
    LoadListSuccess = '[List] Load Lists Success',
    LoadListFail = '[List] Load Lists Fail',
}

export class LoadList implements Action {
    readonly type = ListActionTypes.LoadList;

    constructor(
        public payload: { page: number; limit: number; type: string },
    ) {
    }
}

export class LoadListSuccess implements Action {
    readonly type = ListActionTypes.LoadListSuccess;

    constructor(public payload: IIcoListResponse) {
    }
}

export class LoadListFail implements Action {
    readonly type = ListActionTypes.LoadListFail;
}

export type ListActions = LoadList | LoadListSuccess | LoadListFail;
