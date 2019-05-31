import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartContainerComponent} from './containers/start-container/start-container.component';
import {ProgressContainerComponent} from './containers/progress-container/progress-container.component';
import {FinishContainerComponent} from './containers/finish-container/finish-container.component';
import {RiskPageComponent} from './containers/risk-page/risk-page.component';

const routes: Routes = [
    {
        path: '',
        // pathMatch: 'prefix',
        component: RiskPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'start',
                pathMatch: 'prefix',
            },
            {
                path: 'start',
                component: StartContainerComponent,
                data: {
                    title: 'Risk Tolerance Quiz',
                },
            },
            {
                path: 'finish',
                component: FinishContainerComponent,
                data: {
                    title: 'Risk Tolerance Quiz',
                },
            },
            {
                path: 'progress',
                component: ProgressContainerComponent,
                data: {
                    title: 'Risk Tolerance Quiz',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizRoutingModule {
}
