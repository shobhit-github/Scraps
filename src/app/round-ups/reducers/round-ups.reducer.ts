import {Action, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    RoundUpsActions,
    RoundUpsActionTypes,
} from '../actions/round-ups.actions';
import {IRoundUp} from '../interfaces/round-up.interface';
import {IRoundUpInfo} from '../interfaces/round-up-info.interface';
import {IRoundUpRecurring} from '../interfaces/round-up-recurring.interface';
import {ERoundUpFilter} from '../interfaces/round-up-filter.enum';
import {IMeta} from 'src/app/admin/interfaces/user-for-admin.interface';

export interface State {
    meta?: IMeta;
    roundUps: Array<IRoundUp>;
    info?: IRoundUpInfo;
    recurring: IRoundUpRecurring;
    activeCat: ERoundUpFilter;
}

export const initialState: State = {
    roundUps: [],
    // info: {
    //   currentSum: 0,
    //   maxSum: 0,
    //   totalCount: 0,
    //   totalAmount: 0,
    // },
    recurring: {
        sum: 0,
        period: 'week',
    },
    activeCat: ERoundUpFilter['all'],
};

export function reducer(state = initialState, action: RoundUpsActions): State {
    switch (action.type) {
        case RoundUpsActionTypes.LoadInfoSuccess:
            return {...state, info: action.payload};
        case RoundUpsActionTypes.LoadInfoFail:
            return {...state, info: undefined};
        case RoundUpsActionTypes.LoadListSuccess:
            return {
                ...state,
                roundUps:
                    action.payload.meta.current_page === 1
                        ? action.payload.data
                        : [...state.roundUps, ...action.payload.data],
                meta: action.payload.meta,
            };
        case RoundUpsActionTypes.LoadRecurringSuccess:
            return {...state, recurring: action.payload};
        case RoundUpsActionTypes.SetRecurring:
            return {...state, recurring: action.payload};
        case RoundUpsActionTypes.SetRecurringSuccess:
            return {...state, recurring: {...initialState.recurring}};
        case RoundUpsActionTypes.SetActive:
            return {...state, activeCat: action.payload};
        default:
            return state;
    }
}

export const getRoundUpsState = createFeatureSelector('roundUps');

export const getList = createSelector(
    getRoundUpsState,
    (state: State) => {
        if (state.meta) {
            return state.roundUps.slice(
                (state.meta.current_page - 1) * state.meta.per_page,
                state.meta.current_page * state.meta.per_page,
            );
        }
        return state.roundUps;
    },
);
export const getInfo = createSelector(
    getRoundUpsState,
    (state: State) => state.info,
);
export const getRecurring = createSelector(
    getRoundUpsState,
    (state: State) => {
        return state.recurring;
    },
);
export const getMeta = createSelector(
    getRoundUpsState,
    (state: State) => state.meta,
);
