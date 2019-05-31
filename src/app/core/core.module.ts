import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppComponent} from './containers/app.component';
import {
    ReactiveFormsModule,
    FormsModule,
    NG_ASYNC_VALIDATORS,
    NG_VALIDATORS,
} from '@angular/forms';
import {MaterialModule} from '../material';
import {DisplayDatePipe} from './pipes/display-date.pipe';
import {HeaderContainerComponent} from './containers/header-container/header-container.component';
import {LogoComponent} from './components/logo/logo.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {MenuComponent} from './components/menu/menu.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {AvatarComponent} from './components/avatar/avatar.component';
import {AvatarByNamePipe} from './pipes/avatar-by-name.pipe';
// import { GoogleBooksService } from './services/google-books.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MobileMenuComponent} from './components/mobile-menu/mobile-menu.component';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './effects/user.effects';
import {FooterComponent} from './components/footer/footer.component';
import {MomentPipe} from './pipes/moment.pipe';
import {ScriptsService} from './services/scripts/scripts.service';
import {PlaidContainerComponent} from './containers/plaid-container/plaid-container.component';
import {PlaidComponent} from './components/plaid/plaid.component';
import {PlaidWrapComponent} from './components/plaid-wrap/plaid-wrap.component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {TimeAgoPipe} from './pipes/time-ago.pipe';
import {TimeFromPipe} from './pipes/time-from.pipe';
import {ScrollbarModule} from 'ngx-scrollbar';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DefaultDirective} from './directives/default.directive';
import {NoDataPipe} from './pipes/no-data.pipe';
import {PortfolioItemComponent} from './components/portfolio-item/portfolio-item.component';
import {PieChartModule, NgxChartsModule} from '@swimlane/ngx-charts';
import {DoughnutChartComponent} from './components/doughnut-chart/doughnut-chart.component';
import {DoughnutLegendComponent} from './components/doughnut-legend/doughnut-legend.component';
import {LineChartComponent} from './components/line-chart/line-chart.component';
import {NotYetModalComponent} from './components/not-yet-modal/not-yet-modal.component';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {ObjPipe} from './pipes/obj.pipe';
import {YodleeModule} from '../yodlee/yodlee.module';
import {PanelWrapComponent} from './components/panel-wrap/panel-wrap.component';
import {UpOrDownComponent} from './components/up-or-down/up-or-down.component';

export const COMPONENTS = [
    AppComponent,
    NotFoundComponent,
    DisplayDatePipe,
    HeaderContainerComponent,
    LogoComponent,
    UserMenuComponent,
    MenuComponent,
    MobileMenuComponent,
    ToolbarComponent,
    AvatarComponent,
    AvatarByNamePipe,
    MomentPipe,
    FooterComponent,
    PlaidContainerComponent,
    PlaidComponent,
    PlaidWrapComponent,
    TimeAgoPipe,
    TimeFromPipe,
    DefaultDirective,
    NoDataPipe,
    PortfolioItemComponent,
    DoughnutChartComponent,
    DoughnutLegendComponent,
    LineChartComponent,
    NotYetModalComponent,
    PreloaderComponent,
    ObjPipe,
    SnackBarComponent,
    PanelWrapComponent,
    UpOrDownComponent,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule,
        PieChartModule,
        CommonModule,
        RouterModule,
        MaterialModule,
        ScrollbarModule,
        InfiniteScrollModule,
        YodleeModule,
        EffectsModule.forFeature([UserEffects]),
    ],
    declarations: COMPONENTS,
    exports: [...COMPONENTS, InfiniteScrollModule, ScrollbarModule, YodleeModule],
    entryComponents: [SnackBarComponent, NotYetModalComponent],
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [ScriptsService],
        };
    }
}
