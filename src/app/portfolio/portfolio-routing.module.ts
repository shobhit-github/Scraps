import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioPageComponent} from './containers/portfolio-page/portfolio-page.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioRoutingModule {
}
