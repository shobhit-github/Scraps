import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromSettings from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {ReferralEffects} from './effects/referral.effects';
import {SettingsRoutingModule} from './modules/settings-routing.module';
import {SettingsPageComponent} from './containers/settings-page/settings-page.component';
import {SettingsMenuComponent} from './components/settings-menu/settings-menu.component';
import {AccountSettingsContainerComponent} from './containers/account-settings-container/account-settings-container.component';
import {ProfileSettingsContainerComponent} from './containers/profile-settings-container/profile-settings-container.component';
import {SecuritySettingsContainerComponent} from './containers/security-settings-container/security-settings-container.component';
// tslint:disable-next-line:max-line-length
import {NotificationSettingsContainerComponent} from './containers/notification-settings-container/notification-settings-container.component';
// tslint:disable-next-line:max-line-length
import {ManageCardsSettingsContainerComponent} from './containers/manage-cards-settings-container/manage-cards-settings-container.component';
import {PersonalSettingsComponent} from './components/personal-settings/personal-settings.component';
import {AddressSettingsComponent} from './components/address-settings/address-settings.component';
import {PreferenceSettingsComponent} from './components/preference-settings/preference-settings.component';
import {MaterialModule} from '../material';
import {CoreModule} from '../core/core.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SnackBarComponent} from '../core/components/snack-bar/snack-bar.component';
import {AccountEffects} from './effects/account.effects';
import {ProfileEffects} from './effects/profile.effects';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {SecurityEffects} from './effects/security.effects';
import {NotificationsSettingsComponent} from './components/notifications-settings/notifications-settings.component';
import {NotificationsEffects} from './effects/notifications.effects';
import {CloseAccountSettingsComponent} from './components/close-account-settings/close-account-settings.component';
import {ChangePasswordSettingsComponent} from './components/change-password-settings/change-password-settings.component';
import {PhoneSettingsComponent} from './components/phone-settings/phone-settings.component';
import {ChangePhoneSettingsComponent} from './components/change-phone-settings/change-phone-settings.component';
import {TextMaskModule} from 'angular2-text-mask';
import {TwoFactorSettingsComponent} from './components/two-factor-settings/two-factor-settings.component';
import {ReferralSettingsComponent} from './components/referral-settings/referral-settings.component';
import {ReferralSettingsContainerComponent} from './containers/referral-settings-container/referral-settings-container.component';
import {BankAccountsSettingsComponent} from './components/bank-accounts-settings/bank-accounts-settings.component';
import {ManageCardsSettingsComponent} from './components/manage-cards-settings/manage-cards-settings.component';
import {IdentitySettingsContainerComponent} from './containers/identity-settings-container/identity-settings-container.component';
import {IdentitySettingsComponent} from './components/identity-settings/identity-settings.component';
import {IdentityEffects} from './effects/identity.effects';
import {IdentityContainerComponent} from '../auth/containers/identity-container/identity-container.component';
import {AuthModule} from '../auth/auth.module';
import {RoundUpsSettingsEffects} from './effects/round-ups-settings.effects';
import {RoundUpsSettingsContainerComponent} from './containers/round-ups-settings-container/round-ups-settings-container.component';
import {UsedCardComponent} from './components/used-card/used-card.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {PortfolioModule} from '../portfolio/portfolio.module';
import {WalletContainerComponent} from './containers/wallet-container/wallet-container.component';
import {WalletComponent} from './components/wallet/wallet.component';
import {WalletEffect} from './effects/wallet.effect';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        AuthModule,
        CoreModule,
        FormsModule,
        StoreModule.forFeature('settings', fromSettings.reducers),
        EffectsModule.forFeature([
            AccountEffects,
            ProfileEffects,
            SecurityEffects,
            NotificationsEffects,
            ReferralEffects,
            IdentityEffects,
            RoundUpsSettingsEffects,
            WalletEffect
        ]),
        SettingsRoutingModule,
        TextMaskModule,
        PortfolioModule,
    ],
    declarations: [
        SettingsPageComponent,
        SettingsMenuComponent,
        AccountSettingsContainerComponent,
        ProfileSettingsContainerComponent,
        SecuritySettingsContainerComponent,
        NotificationSettingsContainerComponent,
        ManageCardsSettingsContainerComponent,
        PersonalSettingsComponent,
        AddressSettingsComponent,
        PreferenceSettingsComponent,
        ProfileSettingsComponent,
        NotificationsSettingsComponent,
        CloseAccountSettingsComponent,
        ChangePasswordSettingsComponent,
        PhoneSettingsComponent,
        ChangePhoneSettingsComponent,
        TwoFactorSettingsComponent,
        ReferralSettingsComponent,
        ReferralSettingsContainerComponent,
        BankAccountsSettingsComponent,
        ManageCardsSettingsComponent,
        IdentitySettingsContainerComponent,
        IdentitySettingsComponent,
        RoundUpsSettingsContainerComponent,
        UsedCardComponent,
        DatePickerComponent,
        WalletContainerComponent,
        WalletComponent,
    ],
    entryComponents: [
        SnackBarComponent,
        ChangePasswordSettingsComponent,
        ChangePhoneSettingsComponent,
        IdentityContainerComponent,
    ],
})
export class SettingsModule {
}
