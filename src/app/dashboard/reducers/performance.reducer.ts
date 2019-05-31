import {
    PerformanceActions,
    PerformanceActionTypes,
} from '../actions/performance.actions';
import {
    IStatisticItem,
    IPerformanceFilter,
    EPeriodFilter,
    IPerformanceItem,
} from '../interfaces/dashboard-service';
import {IFullChartData} from 'src/app/core/interfaces/chart.interface';

export interface State {
    stats: Array<IStatisticItem>;
    filter: IPerformanceFilter;
    chartData: Array<IFullChartData>;
    reportLink?: string;
    performanceList: Array<IPerformanceItem>;
}

export const initialState: State = {
    stats: [],
    filter: {
        type: 'history',
        period: EPeriodFilter.week,
        time: 10080,
    },
    chartData: [],
    performanceList: [],
};

export function reducer(
    state = initialState,
    action: PerformanceActions,
): State {
    switch (action.type) {
        case PerformanceActionTypes.LoadStatsSuccess:
            return {...state, stats: action.payload};
        case PerformanceActionTypes.SetFilter:
            return {...state, filter: action.payload};
        case PerformanceActionTypes.LoadPerformanceSuccess:
            return {...state, performanceList: action.payload};
        case PerformanceActionTypes.LoadChartSuccess:
            return {...state, chartData: action.payload};

        default:
            return state;
    }
}
