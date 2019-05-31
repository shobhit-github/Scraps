import {Action} from '@ngrx/store';
import {IYodleeCreds} from '../reducers/yodlee.reducer';

export enum YodleeActionTypes {
    LoadYodlee = '[Yodlee] Load Yodlee',
    LoadYodleeSuccess = '[Yodlee] Load Yodlee Success',
    LoadYodleeFial = '[Yodlee] Load Yodlee Fial',
    LoadForm = '[Yodlee] Load Form',
    LoadFormSuccess = '[Yodlee] Load Form Success',
    LoadFormFail = '[Yodlee] Load Form Fail',
}

export class LoadYodlee implements Action {
    readonly type = YodleeActionTypes.LoadYodlee;
}

export class LoadYodleeSuccess implements Action {
    readonly type = YodleeActionTypes.LoadYodleeSuccess;

    constructor(public payload: IYodleeCreds) {
    }
}

export class LoadYodleeFial implements Action {
    readonly type = YodleeActionTypes.LoadYodleeFial;
}

export class LoadForm implements Action {
    readonly type = YodleeActionTypes.LoadForm;

    constructor(public payload: IYodleeCreds) {
    }
}

export class LoadFormSuccess implements Action {
    readonly type = YodleeActionTypes.LoadFormSuccess;

    constructor(public payload: string) {
    }
}

export class LoadFormFail implements Action {
    readonly type = YodleeActionTypes.LoadFormFail;
}

export type YodleeActions =
    | LoadYodlee
    | LoadYodleeSuccess
    | LoadYodleeFial
    | LoadForm
    | LoadFormSuccess
    | LoadFormFail;
