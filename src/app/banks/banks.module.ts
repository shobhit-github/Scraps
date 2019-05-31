import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgxStripeModule} from 'ngx-stripe';

import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {SettingsModule} from '../settings/settings.module';
import {BanksRoutingModule} from './banks-routing.module';
import {AddBankComponent} from './components/add-bank/add-bank.component';
import {AddMenuComponent} from './components/add-menu/add-menu.component';
import {ConnectCardComponent} from './components/connect-card/connect-card.component';
import {StripeFormComponent} from './components/stripe-form/stripe-form.component';
import {AddBankContainerComponent} from './containers/add-bank-container/add-bank-container.component';
import {AddContainerComponent} from './containers/add-container/add-container.component';
import {BankEffects} from './effects/bank.effects';
import * as fromBank from './reducers/bank.reducer';

@NgModule({
    imports: [
        CommonModule,
        BanksRoutingModule,
        CoreModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SettingsModule,
        NgxStripeModule,
    ],
    declarations: [
        AddContainerComponent,
        AddMenuComponent,
        AddBankComponent,
        AddBankContainerComponent,
        ConnectCardComponent,
        StripeFormComponent,
    ],
    // entryComponents: [MatInput],
})
export class BanksModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootBanksModule,
        };
    }
}

@NgModule({
    imports: [
        StoreModule.forFeature('bank', fromBank.reducer),
        EffectsModule.forFeature([BankEffects]),
    ],
})
export class RootBanksModule {
}
