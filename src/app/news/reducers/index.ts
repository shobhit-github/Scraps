import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromNews from './news.reducer';

export interface State {
    news: fromNews.State;
}

export const reducers: ActionReducerMap<State> = {
    news: fromNews.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

export const getNewsState = createFeatureSelector<State>('news');

export const getNewsList = createSelector(
    getNewsState,
    (state: State) => state.news.list,
);

export const getCatList = createSelector(
    getNewsState,
    (state: State) => state.news.catList,
);
