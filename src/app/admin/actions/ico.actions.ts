import {Action} from '@ngrx/store';
import {IIco} from '../../ico/interfaces/ico.interface';
import {IMeta} from '../interfaces/user-for-admin.interface';

export enum IcoActionTypes {
    LoadIco = '[Ico] Load Ico',
    LoadIcoSuccess = '[Ico] Load Ico Success',
    LoadIcoFail = '[Ico] Load Ico Fail',
    AddOrUpdateIco = '[Ico] Add or Update Ico',
    AddOrUpdateIcoSuccess = '[Ico] Add or Update Ico Success',
    AddOrUpdateIcoFail = '[Ico] Add or Update Ico Fail',
    AddLocalIco = '[Ico] Add Ico Local',
    DeleteIcoLocal = '[Ico] Delete Ico Local',
    DeleteIco = '[Ico] Delete Ico',
    DeleteIcoSuccess = '[Ico] Delete Ico Success',
    DeleteIcoFail = '[Ico] Delete Ico Fail',
}

export class LoadIco implements Action {
    readonly type = IcoActionTypes.LoadIco;

    constructor(
        public payload: {
            page?: number | string;
            limit?: number | string;
            type?: string;
        },
    ) {
    }
}

export class LoadIcoSuccess implements Action {
    readonly type = IcoActionTypes.LoadIcoSuccess;

    constructor(public payload: { data: Array<IIco>; meta: IMeta }) {
    }
}

export class LoadIcoFail implements Action {
    readonly type = IcoActionTypes.LoadIcoFail;
}

export class AddOrUpdateIco implements Action {
    readonly type = IcoActionTypes.AddOrUpdateIco;

    constructor(public payload: IIco | FormData) {
    }
}

export class AddOrUpdateIcoSuccess implements Action {
    readonly type = IcoActionTypes.AddOrUpdateIcoSuccess;
}

export class AddOrUpdateIcoFail implements Action {
    readonly type = IcoActionTypes.AddOrUpdateIcoFail;
}

export class AddLocalIco implements Action {
    readonly type = IcoActionTypes.AddLocalIco;

    constructor(public payload: string) {
    }
}

export class DeleteIco implements Action {
    readonly type = IcoActionTypes.DeleteIco;

    constructor(public payload: string) {
    }
}

export class DeleteIcoSuccess implements Action {
    readonly type = IcoActionTypes.DeleteIcoSuccess;

    constructor(public payload: string) {
    }
}

export class DeleteIcoFail implements Action {
    readonly type = IcoActionTypes.DeleteIcoFail;
}

export class DeleteIcoLocal implements Action {
    readonly type = IcoActionTypes.DeleteIcoLocal;

    constructor(public payload: string) {
    }
}

export type IcoActions =
    | LoadIco
    | LoadIcoSuccess
    | LoadIcoFail
    | AddOrUpdateIco
    | AddOrUpdateIcoSuccess
    | AddOrUpdateIcoFail
    | AddLocalIco
    | DeleteIco
    | DeleteIcoLocal
    | DeleteIcoSuccess
    | DeleteIcoFail;
