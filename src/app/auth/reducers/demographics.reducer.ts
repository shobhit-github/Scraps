import {Action} from '@ngrx/store';
import {
    DemographicsActions,
    DemographicsActionTypes,
} from '../actions/demographics.actions';
import {ISimpleOpt} from '../interfaces/demographics.interfaces';

export interface State {
    employmentList: Array<ISimpleOpt>;
    incomeList: Array<ISimpleOpt>;
    success: boolean;
}

export const initialState: State = {
    employmentList: [],
    incomeList: [],
    success: false,
};

export function reducer(
    state = initialState,
    action: DemographicsActions,
): State {
    switch (action.type) {
        case DemographicsActionTypes.LoadEmploymentsSuccess:
            return {...state, employmentList: action.payload};
        case DemographicsActionTypes.LoadIncomeSuccess:
            return {...state, incomeList: action.payload};
        case DemographicsActionTypes.SaveDemographicsSuccess:
            return {...state, success: true};

        default:
            return state;
    }
}
