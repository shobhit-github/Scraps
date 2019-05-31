import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BuyContainerComponent} from './containers/buy-container/buy-container.component';
import {SellContainerComponent} from './containers/sell-container/sell-container.component';

const routes: Routes = [
    {path: 'buy', component: BuyContainerComponent},
    {path: 'sell', component: SellContainerComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvestRoutingModule {
}
