import {Action} from '@ngrx/store';

import {
    IPerformanceFilter,
    IStatisticItem,
    IPerformanceItem,
} from '../interfaces/dashboard-service';
import {IFullChartData} from 'src/app/core/interfaces/chart.interface';

export enum PerformanceActionTypes {
    LoadPerformance = '[Performance] Load Performance',
    LoadPerformanceSuccess = '[Performance] Load Performance Success',
    LoadPerformanceFail = '[Performance] Load Performance Fail',
    LoadStats = '[Performance] Load Stats',
    LoadStatsSuccess = '[Performance] Load Stats Success',
    LoadStatsFail = '[Performance] Load Stats Fail',
    LoadChart = '[Performance] Load Chart',
    LoadChartSuccess = '[Performance] Load Chart Success',
    LoadChartFail = '[Performance] Load Chart Fail',
    SetFilter = '[Performance] Set Filter',
    Init = '[Performance] Init',
}

export class Init implements Action {
    readonly type = PerformanceActionTypes.Init;

    constructor(public payload: IPerformanceFilter) {
    }
}

export class LoadPerformance implements Action {
    readonly type = PerformanceActionTypes.LoadPerformance;
}

export class LoadPerformanceSuccess implements Action {
    readonly type = PerformanceActionTypes.LoadPerformanceSuccess;

    constructor(public payload: Array<IPerformanceItem>) {
    }
}

export class LoadPerformanceFail implements Action {
    readonly type = PerformanceActionTypes.LoadPerformanceFail;
}

export class LoadStats implements Action {
    readonly type = PerformanceActionTypes.LoadStats;

    constructor(public payload: IPerformanceFilter) {
    }
}

export class LoadStatsSuccess implements Action {
    readonly type = PerformanceActionTypes.LoadStatsSuccess;

    constructor(public payload: Array<IStatisticItem>) {
    }
}

export class LoadStatsFail implements Action {
    readonly type = PerformanceActionTypes.LoadStatsFail;
}

export class LoadChart implements Action {
    readonly type = PerformanceActionTypes.LoadChart;

    constructor(public payload: IPerformanceFilter) {
    }
}

export class LoadChartSuccess implements Action {
    readonly type = PerformanceActionTypes.LoadChartSuccess;

    constructor(public payload: Array<IFullChartData>) {
    }
}

export class LoadChartFail implements Action {
    readonly type = PerformanceActionTypes.LoadChartFail;
}

export class SetFilter implements Action {
    readonly type = PerformanceActionTypes.SetFilter;

    constructor(public payload: IPerformanceFilter) {
    }
}

export type PerformanceActions =
    | LoadPerformance
    | LoadPerformanceSuccess
    | LoadPerformanceFail
    | LoadStats
    | LoadStatsSuccess
    | LoadStatsFail
    | LoadChart
    | LoadChartSuccess
    | LoadChartFail
    | SetFilter
    | Init;
