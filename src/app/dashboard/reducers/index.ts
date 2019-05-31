import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromBalance from './balance.reducer';
import * as fromPerformance from './performance.reducer';

export interface State {
    balance: fromBalance.State;
    performance: fromPerformance.State;
}

export const reducers: ActionReducerMap<State> = {
    balance: fromBalance.reducer,
    performance: fromPerformance.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getDashboard = createFeatureSelector('dashboard');
export const getPerformance = createSelector(
    getDashboard,
    (state: State) => state.performance,
);
export const getBalance = createSelector(
    getDashboard,
    (state: State) => state.balance,
);
export const getStats = createSelector(
    getPerformance,
    (state: fromPerformance.State) => state.stats,
);
export const getFilter = createSelector(
    getPerformance,
    (state: fromPerformance.State) => state.filter,
);
export const getPerformanceList = createSelector(
    getPerformance,
    (state: fromPerformance.State) => state.performanceList,
);
export const getChartData = createSelector(
    getPerformance,
    (state: fromPerformance.State) => state.chartData,
);
export const getPortfolioBalance = createSelector(
    getBalance,
    (state: fromBalance.State) => state.portfolioBalance,
);
export const getAssetBalance = createSelector(
    getBalance,
    (state: fromBalance.State) => state.assetBalance,
);
