import {Action} from '@ngrx/store';
import {IIco} from '../interfaces/ico.interface';

export enum DetailActionTypes {
    LoadDetail = '[Detail] Load Detail',
    LoadDetailSuccess = '[Detail] Load Detail Success',
    LoadDetailFail = '[Detail] Load Detail Fail',
}

export class LoadDetail implements Action {
    readonly type = DetailActionTypes.LoadDetail;

    constructor(public payload: string) {
    }
}

export class LoadDetailSuccess implements Action {
    readonly type = DetailActionTypes.LoadDetailSuccess;

    constructor(public payload: IIco) {
    }
}

export class LoadDetailFail implements Action {
    readonly type = DetailActionTypes.LoadDetailFail;
}

export type DetailActions = LoadDetail | LoadDetailSuccess | LoadDetailFail;
