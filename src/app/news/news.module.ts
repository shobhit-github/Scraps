import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NewsEffects} from './effects/news.effects';
import * as fromNews from './reducers';
import {NewsListContainerComponent} from './containers/news-list-container/news-list-container.component';
import {NewsListComponent} from './components/news-list/news-list.component';
import {NewsRoutingModule} from './modules/news-routing.module';
import {CoreModule} from '../core/core.module';
import {SubstringPipe} from './pipes/substring.pipe';
import {CatListComponent} from './components/cat-list/cat-list.component';
import {CatLogoComponent} from './components/cat-logo/cat-logo.component';
import {NewsDetailContainerComponent} from './containers/news-detail-container/news-detail-container.component';
import {NewsDetailComponent} from './components/news-detail/news-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        EffectsModule.forFeature([NewsEffects]),
        StoreModule.forFeature('news', fromNews.reducers, {
            metaReducers: fromNews.metaReducers,
        }),
        NewsRoutingModule,
    ],
    declarations: [
        NewsListContainerComponent,
        NewsListComponent,
        SubstringPipe,
        CatListComponent,
        CatLogoComponent,
        NewsDetailContainerComponent,
        NewsDetailComponent,
    ],
})
export class NewsModule {
}
