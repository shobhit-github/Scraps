import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TextMaskModule} from 'angular2-text-mask';

import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {BanksComponent} from './components/banks/banks.component';
import {DemographicsComponent} from './components/demographics/demographics.component';
import {EmailConfComponent} from './components/email-conf/email-conf.component';
import {ForgotComponent} from './components/forgot/forgot.component';
import {IdentityComponent} from './components/identity/identity.component';
import {LoginComponent} from './components/login/login.component';
import {MobileAppComponent} from './components/mobile-app/mobile-app.component';
import {RegisterStepperComponent} from './components/register-stepper/register-stepper.component';
import {RegisterComponent} from './components/register/register.component';
import {ResetComponent} from './components/reset/reset.component';
import {VerifyNumberComponent} from './components/verify-number/verify-number.component';
import {BanksContainerComponent} from './containers/banks-container/banks-container.component';
import {DemographicsContainerComponent} from './containers/demographics-container/demographics-container.component';
import {ForgotPageComponent} from './containers/forgot-page/forgot-page.component';
import {IdentityContainerComponent} from './containers/identity-container/identity-container.component';
import {LoginPageComponent} from './containers/login-page/login-page.component';
import {RegisterPageComponent} from './containers/register-page/register-page.component';
import {RegisterStepperPageComponent} from './containers/register-stepper-page/register-stepper-page.component';
import {ResetPageComponent} from './containers/reset-page/reset-page.component';
import {VerifyNumberContainerComponent} from './containers/verify-number-container/verify-number-container.component';
import {AuthEffects} from './effects/auth.effects';
import {BanksEffects} from './effects/banks.effects';
import {DemographicsEffects} from './effects/demographics.effects';
import {IdentityEffects} from './effects/identity.effects';
import {StepEffects} from './effects/step.effects';
import {VerifyEffects} from './effects/verify.effects';
import {AuthRoutingModule} from './modules/auth-routing.module';
import {reducersAuth} from './reducers';

export const COMPONENTS = [
    RegisterComponent,
    AuthPageComponent,
    RegisterPageComponent,
    MobileAppComponent,
    RegisterStepperPageComponent,
    RegisterStepperComponent,
    VerifyNumberComponent,
    VerifyNumberContainerComponent,
    IdentityComponent,
    IdentityContainerComponent,
    LoginComponent,
    LoginPageComponent,
    ForgotPageComponent,
    ForgotComponent,
    ResetPageComponent,
    ResetComponent,
    BanksContainerComponent,
    BanksComponent,
    EmailConfComponent,
    DemographicsContainerComponent,
    DemographicsComponent,
    IdentityContainerComponent,
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        CommonModule,
        AuthRoutingModule,
        TextMaskModule,
        CoreModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootAuthModule,
        };
    }
}

@NgModule({
    imports: [
        StoreModule.forFeature('authContainer', reducersAuth),
        EffectsModule.forFeature([
            AuthEffects,
            VerifyEffects,
            IdentityEffects,
            BanksEffects,
            StepEffects,
            DemographicsEffects,
        ]),
    ],
})
export class RootAuthModule {
}
