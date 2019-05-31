import {RecentActivityActions, RecentActivityType} from '../actions/recent-activity.actions';

export interface State {
    recentActivityData: any;
    filter: {
        activeType: string;
        page: number;
    };
}

export const initialState: State = {
    recentActivityData: {
        data: [],
        meta: {
            last_page: 1,
        },
    },
    filter: {
        activeType: 'All',
        page: 1,
    },
};

export function reducer(
    state = initialState,
    action: RecentActivityActions,
): State {
    switch (action.type) {
        case RecentActivityType.SuccessLoadRecentActivity:
            return {...state, recentActivityData: action.payload};
        case RecentActivityType.SetActiveType:
            return {...state, filter: action.payload};
        case RecentActivityType.SetActivePage:
            return {...state, filter: action.payload};
        default:
            return state;
    }
}
