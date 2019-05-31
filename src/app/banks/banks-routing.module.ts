import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddContainerComponent} from './containers/add-container/add-container.component';
import {AddBankContainerComponent} from './containers/add-bank-container/add-bank-container.component';
import {PlaidContainerComponent} from '../core/containers/plaid-container/plaid-container.component';
import {ConnectCardComponent} from './components/connect-card/connect-card.component';
import {AuthGuard} from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full',
    },
    {
        path: 'add',
        component: AddContainerComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'bank',
                pathMatch: 'full',
            },
            {
                path: 'bank-old',
                component: AddBankContainerComponent,
                data: {title: 'Connecting a bank account'},
            },
            {
                path: 'bank',
                component: PlaidContainerComponent,
                data: {title: 'Connecting a bank account'},
            },
            {
                path: 'card',
                component: ConnectCardComponent,
                data: {title: 'Connecting a card'},
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BanksRoutingModule {
}
