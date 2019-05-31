import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountSettingsContainerComponent} from '../containers/account-settings-container/account-settings-container.component';
import {IdentitySettingsContainerComponent} from '../containers/identity-settings-container/identity-settings-container.component';
import {
    ManageCardsSettingsContainerComponent
} from '../containers/manage-cards-settings-container/manage-cards-settings-container.component';
import {
    NotificationSettingsContainerComponent
} from '../containers/notification-settings-container/notification-settings-container.component';
import {ProfileSettingsContainerComponent} from '../containers/profile-settings-container/profile-settings-container.component';
import {ReferralSettingsContainerComponent} from '../containers/referral-settings-container/referral-settings-container.component';
import {SecuritySettingsContainerComponent} from '../containers/security-settings-container/security-settings-container.component';
import {SettingsPageComponent} from '../containers/settings-page/settings-page.component';
import {RoundUpsSettingsContainerComponent} from '../containers/round-ups-settings-container/round-ups-settings-container.component';
import {WalletContainerComponent} from '../containers/wallet-container/wallet-container.component';

export const routes: Routes = [
    {
        path: '',
        component: SettingsPageComponent,
        children: [
            {
                path: 'account',
                component: AccountSettingsContainerComponent,
                data: {title: 'Account Settings'},
            },
            {
                path: 'manage-cards',
                component: ManageCardsSettingsContainerComponent,
            },
            {
                path: 'referral',
                component: ReferralSettingsContainerComponent,
                data: {title: 'Referral Settings'},
            },
            {
                path: 'notifications',
                component: NotificationSettingsContainerComponent,
                data: {title: 'Notifications Settings'},
            },
            {
                path: 'profile',
                component: ProfileSettingsContainerComponent,
                data: {title: 'Profile Settings'},
            },
            {
                path: 'security',
                component: SecuritySettingsContainerComponent,
                data: {title: 'Security Settings'},
            },
            {
                path: 'round-ups',
                component: RoundUpsSettingsContainerComponent,
                data: {title: 'Round Ups Settings'},
            },
            {
                path: 'identity',
                component: IdentitySettingsContainerComponent,
                data: {title: 'Identity Settings'},
            },
            {
                path: 'wallet',
                component: WalletContainerComponent,
                data: {title: 'Wallet Settings'},
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {
}
