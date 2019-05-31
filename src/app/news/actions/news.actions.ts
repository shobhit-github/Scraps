import {Action} from '@ngrx/store';
import {IPagination, INewsItem} from '../interfaces/news.interface';
import {ICatItem} from '../interfaces/cat.interface';

export enum NewsActionTypes {
    LoadNews = '[News] Load News',
    NewsReset = '[News] Load News Reset',
    LoadNewsSuccess = '[News] Load News success',
    LoadNewsFailed = '[News] Load News Failed',
    LoadCatNews = '[News] Load categories list',
    LoadCatNewsSuccess = '[News] Load categories list success',
}

export class LoadNews implements Action {
    readonly type = NewsActionTypes.LoadNews;

    constructor(public payload: IPagination = {limit: 5, page: 1, source: ''}) {
        // console.log('%c loadnews', 'color:blue');
        // console.log(payload);
    }
}

export class LoadNewsSuccess implements Action {
    readonly type = NewsActionTypes.LoadNewsSuccess;

    constructor(public payload: Array<INewsItem>) {
        // console.log('%c loadnews', 'color:green');
    }
}

export class LoadNewsFailed implements Action {
    readonly type = NewsActionTypes.LoadNewsFailed;
}

export class NewsReset implements Action {
    readonly type = NewsActionTypes.NewsReset;
}

export class LoadCatNews implements Action {
    readonly type = NewsActionTypes.LoadCatNews;
}

export class LoadCatNewsSuccess implements Action {
    readonly type = NewsActionTypes.LoadCatNewsSuccess;

    constructor(public payload: Array<ICatItem>) {
    }
}

export type NewsActions =
    | NewsReset
    | LoadNews
    | LoadCatNews
    | LoadNewsSuccess
    | LoadNewsFailed
    | LoadCatNewsSuccess;
