import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PerformanceListContainerComponent} from './containers/performance-list-container/performance-list-container.component';

const routes: Routes = [
    {
        path: '',
        component: PerformanceListContainerComponent,
        data: {title: 'Performance'},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PerformanceRoutingModule {
}
