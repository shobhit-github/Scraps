import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
    ActivatedRoute,
    Router,
    convertToParamMap,
    NavigationEnd,
} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
    concatMap,
    map,
    share,
    tap,
    startWith,
    filter,
    mergeMap,
} from 'rxjs/operators';

import * as NewsActions from '../../actions/news.actions';
import {ICatItem} from '../../interfaces/cat.interface';
import {INewsItem} from '../../interfaces/news.interface';
import * as fromStore from '../../reducers';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-news-list-container',
    templateUrl: './news-list-container.component.html',
    styleUrls: ['./news-list-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListContainerComponent implements OnInit {
    public page = 1;
    public catList$: Observable<Array<ICatItem>> = this.store.pipe(
        select(fromStore.getCatList),
        share(),
    );
    public activeCat$: Observable<ICatItem> = this.router.events.pipe(
        startWith(new NavigationEnd(0, '/', '/')),
        filter(event => event instanceof NavigationEnd),
        mergeMap(() => this.activatedRoute.paramMap),
        map(params => params.get('slug')),
        mergeMap(slug => {
            this.store.dispatch(new NewsActions.NewsReset());
            if (!slug) {
                this.store.dispatch(new NewsActions.LoadNews());
            } else {
                this.store.dispatch(
                    new NewsActions.LoadNews({
                        limit: this.limit,
                        page: (this.page = 1),
                        source: slug,
                    }),
                );
            }
            return this.catList$.pipe(
                map(catList => {
                    return catList.filter(catFromList => catFromList.slug === slug)[0];
                }),
            );
        }),
        mergeMap(activeCat =>
            this.newsList$.pipe(
                tap((news: Array<INewsItem>) => {
                    if (news && news.length > 0 && activeCat) {
                        const itemForTitle = news.filter(
                            item => item.type === activeCat.slug,
                        )[0];
                        const title = itemForTitle ? itemForTitle.category : '';
                        if (title) {
                            this.titleService.setTitle(
                                `Skraps | News | ${title.toUpperCase()}`,
                            );
                        }
                    }
                }),
                map(() => activeCat),
            ),
        ),
        share(),
    );
    public newsList$: Observable<Array<INewsItem>> = this.store
        .pipe(select(fromStore.getNewsList))
        .pipe(
            map(arr => {
                return arr.slice(0, this.limit * this.page);
            }),
            share(),
        );
    public newsTitle = 'Trending News';

    public catTitle = 'Choose your News';

    public limit = 5;

    constructor(
        protected store: Store<fromStore.State>,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected titleService: Title,
    ) {
        this.store.dispatch(new NewsActions.LoadCatNews());
    }

    ngOnInit() {
    }

    onScrollDown(source: string) {
        this.store.dispatch(
            new NewsActions.LoadNews({
                limit: this.limit,
                page: ++this.page,
                source,
            }),
        );
    }
}
