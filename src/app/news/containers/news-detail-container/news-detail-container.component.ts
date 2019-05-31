import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {Observable, NEVER} from 'rxjs';
import {map, mergeMap, share, catchError, tap} from 'rxjs/operators';

import {INewsItem} from '../../interfaces/news.interface';
import * as fromStore from '../../reducers';
import {NewsService} from '../../services/news.service';
import {NewsListContainerComponent} from '../news-list-container/news-list-container.component';
import * as NewsActions from '../../actions/news.actions';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-news-detail-container',
    templateUrl: './news-detail-container.component.html',
    styleUrls: ['./news-detail-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailContainerComponent extends NewsListContainerComponent
    implements OnInit {
    article$: Observable<INewsItem>;
    public newsTitle = 'More News';
    public limit = 4;
    protected load = false;
    public newsList$ = this.store.pipe(select(fromStore.getNewsList)).pipe(
        map(arr => {
            return arr.slice(0, this.limit * this.page);
        }),
        share(),
    );

    constructor(
        protected store: Store<fromStore.State>,
        protected router: Router,
        protected titleService: Title,
        protected activatedRoute: ActivatedRoute,
        protected newsService: NewsService,
    ) {
        super(store, activatedRoute, router, titleService);
        this.article$ = this.activatedRoute.paramMap.pipe(
            map(paramsMap => ({
                source: paramsMap.get('slug'),
                slug: paramsMap.get('newsSlug'),
            })),
            mergeMap(config =>
                this.newsService.getArticle(config).pipe(
                    tap((article: INewsItem) => {
                        if (article) {
                            const title = `${article.category.toUpperCase()} | ${
                                article.title
                                }`;
                            this.titleService.setTitle(`Skraps | News | ${title}`);
                        }
                    }),
                ),
            ),
            share(),
            catchError(() => {
                this.store.dispatch(new NewsActions.NewsReset());
                this.router.navigate(['/404']);
                return NEVER;
            }),
        );
    }

    ngOnInit() {
    }
}
