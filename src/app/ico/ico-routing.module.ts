import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IcoListContainerComponent} from './containers/ico-list-container/ico-list-container.component';
import {IcoDetailContainerComponent} from './containers/ico-detail-container/ico-detail-container.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list/top/1',
        pathMatch: 'prefix',
    },
    {
        path: 'list',
        redirectTo: 'list/top/1',
        pathMatch: 'prefix',
    },
    {
        path: 'list/top',
        redirectTo: 'list/top/1',
        pathMatch: 'prefix',
    },
    {
        path: 'list/:filter/:page',
        component: IcoListContainerComponent,
        data: {title: 'ICO List'},
    },
    {
        path: ':slug',
        component: IcoDetailContainerComponent,
        data: {title: 'ICO Detail'},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IcoRoutingModule {
}
