import {Action} from '@ngrx/store';

export enum RecentActivityType {
    LoadRecentActivity = '[Recent] Load Recent Activity',
    SuccessLoadRecentActivity = '[Recent] Success Load Recent Activity',
    FailLoadRecentActivity = '[Recent] Fail Load Recent Activity',
    SetActiveType = '[Recent] Set Active Type',
    SetActivePage = '[Recent] Set Active Page',
}

export class LoadRecentActivity implements Action {
    readonly type = RecentActivityType.LoadRecentActivity;

    constructor(public payload: {
        activeType: string,
        page: number,
    }) {
    }
}

export class SuccessLoadRecentActivity implements Action {
    readonly type = RecentActivityType.SuccessLoadRecentActivity;

    constructor(public payload: {
        activeType: string,
        page: number,
    }) {
    }
}

export class FailLoadRecentActivity implements Action {
    readonly type = RecentActivityType.FailLoadRecentActivity;
}

export class SetActiveType {
    readonly type = RecentActivityType.SetActiveType;

    constructor(public payload: {
        activeType: string,
        page: number,
    }) {
    }
}

export class SetActivePage {
    readonly type = RecentActivityType.SetActivePage;

    constructor(public payload: {
        activeType: string,
        page: number,
    }) {
    }
}

export type RecentActivityActions =
    | LoadRecentActivity
    | SuccessLoadRecentActivity
    | FailLoadRecentActivity
    | SetActiveType
    | SetActivePage
    ;
