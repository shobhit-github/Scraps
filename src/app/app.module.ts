import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {BrowserModule, DomSanitizer, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JWT_OPTIONS, JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ShareButtonModule} from '@ngx-share/button';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {PushNotificationsModule} from 'ng-push';
import {NgxStripeModule} from 'ngx-stripe';

import {environment} from '../environments/environment';
import {AdminModule} from './admin/admin.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {ILoginResponse} from './auth/interfaces/login.interface';
import {AuthService} from './auth/services/auth.service';
import {MockNewsComponent} from './core/components/mock-news/mock-news.component';
import {AppComponent} from './core/containers/app.component';
import {CoreModule} from './core/core.module';
import {effects} from './effects';
import {MaterialModule} from './material';
import {metaReducers, reducers} from './reducers';
import {RefreshTokenInterceptor} from './refresh-token.interceptor';
import {InvestModule} from './invest/invest.module';
import {PortfolioModule} from './portfolio/portfolio.module';

export function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({uri: `${environment.baseUrl}/graphql/private`}),
        cache: new InMemoryCache(),
    };
}

// import { BanksModule } from './banks/banks.module';
export function jwtOptionsFactory() {
    return {
        tokenGetter: () => {
            const authStr = localStorage.getItem('authContainer');
            const authContainer: any = authStr ? JSON.parse(authStr) : null;
            let loginData: ILoginResponse;
            if (authContainer && authContainer.auth) {
                loginData = authContainer.auth.loginData;
            }
            return loginData ? loginData.access_token : '';
        },
        whitelistedDomains: [
            '192.168.88.183',
            'localhost',
            'localhost:4200',
            'skraps.eu-central-1.elasticbeanstalk.com',
            'skraps-backend.eu-central-1.elasticbeanstalk.com',
            '116.203.24.202',
            '116.203.24.202:3006',
            'api.skraps.io',
            'backend.skraps.io',
            'dckr-back.skraps.io',
        ],
        blacklistedRoutes: [
            '192.168.88.183/api/admin/auth/sign-in',
            'localhost/api/admin/auth/sign-in',
            'localhost:4200/api/admin/auth/sign-in',
            'skraps.eu-central-1.elasticbeanstalk.com/api/admin/auth/sign-in',
            'skraps-backend.eu-central-1.elasticbeanstalk.com/api/admin/auth/sign-in',
            '116.203.24.202/api/admin/auth/sign-in',
            '116.203.24.202:3006/api/admin/auth/sign-in',
            'api.skraps.io/api/admin/auth/sign-in',
            'backend.skraps.io/api/admin/auth/sign-in',
            '/authenticate/restserver/',
            'dckr-back.skraps.io/api/admin/auth/sign-in',
        ],
        skipWhenExpired: true,
    };
}

@NgModule({
    declarations: [MockNewsComponent],
    imports: [
        MaterialModule,
        PushNotificationsModule,
        CoreModule.forRoot(),
        ApolloModule,
        HttpLinkModule,
        NgxStripeModule.forRoot(),
        AuthModule.forRoot(),
        AdminModule.forRoot(),
        PortfolioModule.forRoot(),
        InvestModule.forRoot(),
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot(effects),
        ShareButtonModule.forRoot(),

        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
            },
        }),
    ],
    providers: [
        AuthService,
        JwtInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: JwtInterceptor,
            multi: true,
        },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true,
        },
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
        Title,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        public matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {
        matIconRegistry.registerFontClassAlias('skraps-icons', 'si');
        matIconRegistry.addSvgIcon(
            'plus',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../assets/svg/add-icon.svg',
            ),
        );
    }
}
