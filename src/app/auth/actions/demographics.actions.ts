import {Action} from '@ngrx/store';
import {ISimpleOpt} from '../interfaces/demographics.interfaces';

export enum DemographicsActionTypes {
    LoadEmployments = '[Demographics] Load Employments',
    LoadEmploymentsSuccess = '[Demographics] Load Employments Success',
    LoadEmploymentsFail = '[Demographics] Load Employments Fail',
    LoadIncome = '[Demographics] Load Income',
    LoadIncomeSuccess = '[Demographics] Load Income Success',
    LoadIncomeFail = '[Demographics] Load Income Fail',
    SaveDemographics = '[Demographics] Save Demographics',
    SaveDemographicsSuccess = '[Demographics] Save Demographics Success',
    SaveDemographicsFail = '[Demographics] Save Demographics Fail',
}

export class LoadEmployments implements Action {
    readonly type = DemographicsActionTypes.LoadEmployments;
}

export class LoadEmploymentsSuccess implements Action {
    readonly type = DemographicsActionTypes.LoadEmploymentsSuccess;

    constructor(public payload: Array<ISimpleOpt>) {
    }
}

export class LoadEmploymentsFail implements Action {
    readonly type = DemographicsActionTypes.LoadEmploymentsFail;
}

export class LoadIncome implements Action {
    readonly type = DemographicsActionTypes.LoadIncome;
}

export class LoadIncomeSuccess implements Action {
    readonly type = DemographicsActionTypes.LoadIncomeSuccess;

    constructor(public payload: Array<ISimpleOpt>) {
    }
}

export class LoadIncomeFail implements Action {
    readonly type = DemographicsActionTypes.LoadIncomeFail;
}

export class SaveDemographics implements Action {
    readonly type = DemographicsActionTypes.SaveDemographics;

    constructor(
        public payload: {
            employment_id: number;
            income_id: number;
            birthday: string;
        },
    ) {
    }
}

export class SaveDemographicsSuccess implements Action {
    readonly type = DemographicsActionTypes.SaveDemographicsSuccess;
}

export class SaveDemographicsFail implements Action {
    readonly type = DemographicsActionTypes.SaveDemographicsFail;
}

export type DemographicsActions =
    | LoadEmployments
    | LoadEmploymentsSuccess
    | LoadEmploymentsFail
    | LoadIncome
    | LoadIncomeSuccess
    | LoadIncomeFail
    | SaveDemographics
    | SaveDemographicsSuccess
    | SaveDemographicsFail;
