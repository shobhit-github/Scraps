import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoundUpsPageComponent} from './containers/round-ups-page/round-ups-page.component';

const routes: Routes = [
    {
        path: '',
        component: RoundUpsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoundUpsRoutingModule {
}
