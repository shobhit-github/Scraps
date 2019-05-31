import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsListContainerComponent} from '../containers/news-list-container/news-list-container.component';
import {NewsDetailContainerComponent} from '../containers/news-detail-container/news-detail-container.component';

const routes: Routes = [
    {
        path: '',
        component: NewsListContainerComponent,
        data: {title: 'News | Skraps'},
    },
    {
        path: ':slug',
        component: NewsListContainerComponent,
        data: {title: 'News | Skraps'},
    },
    {
        path: ':slug/:newsSlug',
        component: NewsDetailContainerComponent,
        data: {title: 'News | Skraps'},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsRoutingModule {
}
