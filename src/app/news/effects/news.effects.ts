import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {
    LoadCatNews,
    LoadNews,
    LoadNewsFailed,
    NewsActionTypes,
} from '../actions/news.actions';
import {NewsService} from '../services/news.service';
import {Router} from '../../../../node_modules/@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class NewsEffects {
    @Effect()
    loadNews$ = this.actions$.pipe(
        ofType<LoadNews>(NewsActionTypes.LoadNews),
        mergeMap(action =>
            this.newsService.getNewsList(action.payload).pipe(
                map(newsList => ({
                    type: NewsActionTypes.LoadNewsSuccess,
                    payload: newsList,
                })),
                catchError((err: HttpErrorResponse) => {
                    if (err.status !== 401) {
                        this.router.navigate(['/404']);
                    }
                    return of(new LoadNewsFailed());
                }),
            ),
        ),
    );
    @Effect()
    loadCats$ = this.actions$.pipe(
        ofType<LoadCatNews>(NewsActionTypes.LoadCatNews),
        mergeMap(action =>
            this.newsService.getCatList().pipe(
                map(catList => ({
                    type: NewsActionTypes.LoadCatNewsSuccess,
                    payload: catList,
                })),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private newsService: NewsService,
        private router: Router,
    ) {
    }
}
