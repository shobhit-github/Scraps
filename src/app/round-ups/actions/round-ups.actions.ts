import {Action} from '@ngrx/store';
import {IRoundUpInfo} from '../interfaces/round-up-info.interface';
import {IRoundUp} from '../interfaces/round-up.interface';
import {ERoundUpFilter} from '../interfaces/round-up-filter.enum';
import {IRoundUpRecurring} from '../interfaces/round-up-recurring.interface';
import {
    IPaginationResponse,
    IPaginationRequest,
} from 'src/app/core/interfaces/pagination.interface';

export enum RoundUpsActionTypes {
    LoadInfo = '[RoundUps] Load Info',
    LoadInfoSuccess = '[RoundUps] Load Info Success',
    LoadInfoFail = '[RoundUps] Load Info Fail',
    LoadList = '[RoundUps] Load List',
    LoadListSuccess = '[RoundUps] Load List Success',
    LoadListFail = '[RoundUps] Load List Fail',
    SetActive = '[RoundUps] Set Active Cat',
    SetRecurring = '[RoundUps] Set Recurring Investment',
    SetRecurringSuccess = '[RoundUps] Set Recurring Investment Success',
    SetRecurringFail = '[RoundUps] Set Recurring Investment Fail',
    LoadRecurring = '[RoundUps] Load Recurring Investment',
    LoadRecurringSuccess = '[RoundUps] Load Recurring Investment Success',
    LoadRecurringFail = '[RoundUps] Load Recurring Investment Fail',
}

export class LoadInfo implements Action {
    readonly type = RoundUpsActionTypes.LoadInfo;
}

export class LoadInfoSuccess implements Action {
    readonly type = RoundUpsActionTypes.LoadInfoSuccess;

    constructor(public payload: IRoundUpInfo) {
    }
}

export class LoadInfoFail implements Action {
    readonly type = RoundUpsActionTypes.LoadInfoFail;
}

export class LoadList implements Action {
    readonly type = RoundUpsActionTypes.LoadList;

    constructor(
        public payload: { params: IPaginationRequest; type?: ERoundUpFilter },
    ) {
    }
}

export class LoadListSuccess implements Action {
    readonly type = RoundUpsActionTypes.LoadListSuccess;

    constructor(public payload: IPaginationResponse<Array<IRoundUp>>) {
    }
}

export class LoadListFail implements Action {
    readonly type = RoundUpsActionTypes.LoadListFail;

    constructor(public payload: Error) {
        console.error(this.payload);
    }
}

export class SetActive implements Action {
    readonly type = RoundUpsActionTypes.SetActive;

    constructor(public payload: ERoundUpFilter) {
    }
}

export class SetRecurring implements Action {
    readonly type = RoundUpsActionTypes.SetRecurring;

    constructor(public payload: IRoundUpRecurring) {
    }
}

export class SetRecurringSuccess implements Action {
    readonly type = RoundUpsActionTypes.SetRecurringSuccess;
}

export class SetRecurringFail implements Action {
    readonly type = RoundUpsActionTypes.SetRecurringFail;
}

export class LoadRecurring implements Action {
    readonly type = RoundUpsActionTypes.LoadRecurring;
}

export class LoadRecurringSuccess implements Action {
    readonly type = RoundUpsActionTypes.LoadRecurringSuccess;

    constructor(public payload: IRoundUpRecurring) {
    }
}

export class LoadRecurringFail implements Action {
    readonly type = RoundUpsActionTypes.LoadRecurringFail;
}

export type RoundUpsActions =
    | LoadInfo
    | LoadInfoSuccess
    | LoadInfoFail
    | LoadList
    | LoadListSuccess
    | LoadListFail
    | SetActive
    | SetRecurring
    | SetRecurringSuccess
    | SetRecurringFail
    | LoadRecurring
    | LoadRecurringSuccess
    | LoadRecurringFail;
