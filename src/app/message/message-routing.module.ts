import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MessagePageComponent} from './containers/message-page/message-page.component';

const routes: Routes = [
    {
        path: '',
        component: MessagePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessageRoutingModule {
}
