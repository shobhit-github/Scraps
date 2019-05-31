import {Action} from '@ngrx/store';
import {NewsActions, NewsActionTypes} from '../actions/news.actions';
import {INewsItem} from '../interfaces/news.interface';
import {ICatItem} from '../interfaces/cat.interface';

export interface State {
    list: Array<INewsItem>;
    catList: Array<ICatItem>;
}

export const initialState: State = {
    list: [],
    catList: [],
};

export function reducer(state = initialState, action: NewsActions): State {
    switch (action.type) {
        case NewsActionTypes.LoadNews:
            return state;
        case NewsActionTypes.LoadNewsSuccess:
            return {
                ...state,
                list: [...state.list, ...action.payload],
            };
        case NewsActionTypes.NewsReset:
            return {...state, list: []};
        case NewsActionTypes.LoadCatNews:
            return state;
        case NewsActionTypes.LoadCatNewsSuccess:
            return {...state, catList: action.payload};

        default:
            return state;
    }
}
