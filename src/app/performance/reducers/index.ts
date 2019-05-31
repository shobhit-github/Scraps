import * as fromRecentActivity from './recent.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
    recentActivity?: fromRecentActivity.State;
}

export const reducers: ActionReducerMap<State> = {
    recentActivity: fromRecentActivity.reducer,
};

export const getPerformance = createFeatureSelector('performance');
export const getRecentActivity = createSelector(
    getPerformance,
    (state: State) => state.recentActivity,
);
