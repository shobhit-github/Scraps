import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth/guards/auth.guard';
import {MockNewsComponent} from './core/components/mock-news/mock-news.component';
import {NotFoundComponent} from './core/components/not-found/not-found.component';

// import { AuthModule, RootAuthModule } from './auth/auth.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full',
    },

    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        data: {title: 'Admin Panel'},
    },
    {
        path: 'news',
        loadChildren: './news/news.module#NewsModule',
        canActivate: [AuthGuard],
        data: {title: 'News'},
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard],
        data: {title: 'Settings'},
    },
    {
        path: 'banks',
        loadChildren: './banks/banks.module#BanksModule',
        canActivate: [AuthGuard],
        data: {title: 'Banks'},
    },
    {
        path: 'messages',
        loadChildren: './message/message.module#MessageModule',
        // component: MockNewsComponent,
        canActivate: [AuthGuard],
        data: {title: 'Messages'},
    },

    //   {
    //     path: 'performance',
    //     component: MockNewsComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //       title: 'Performance',
    //       desc: `Ready to track your performance? This
    // portion of your profile will bespecifically designed for you to watch the
    // performance of your portfolios, its history andpotential. Increase your
    // performance for a chance to be featured on the leaderboards.`,
    //     },
    //   },

    {
        path: 'portfolios',
        component: MockNewsComponent,
        // loadChildren: './portfolio/portfolio.module#PortfolioModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Portfolios',
            desc: `All of your portfolios in one
easy-to-access place. Never forget what you’reinvesting in and easily check up
on your portfolios whenever you like. Designed to trackthe specification and
risk aversion of each portfolio, investing in cryptocurrency hasnever been so
easy!`,
        },
    },
    {
        path: 'dashboard',
        component: MockNewsComponent,
        // loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Dashboard',
            desc: `Your one-stop-shop to quickly check in on your investments.
      You will beable to access an overview of your performance, portfolios, and other data.
      Cryptocurrency investments have never been so accessible!`,
        },
    },
    {
        path: 'round-ups',
        component: MockNewsComponent,
        // loadChildren: './round-ups/round-ups.module#RoundUpsModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Round-Ups',
            desc: `No need to personally track your
individual round-ups. Swipe your cardlike normal then visit this page to see
each round-up. Created specifically for users toinvest easily and worry-free,
double check your transactions whenever it’s convenientfor you.`,
        },
    },

    {
        path: 'leaderboard',
        component: MockNewsComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Leaderboards',
            desc: `Feeling up to a little competition? This
tab will showcase users with themost profitable portfolios. Skraps will also
feature the top performing portfolios forother users to learn from.`,
        },
    },
    {
        path: 'quiz',
        loadChildren: './quiz/quiz.module#QuizModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Risk Tolerance Quiz',
        },
    },
    {
        path: 'ico',
        loadChildren: './ico/ico.module#IcoModule',
        canActivate: [AuthGuard],
        data: {
            title: 'ICO',
        },
    },
    {
        path: 'performance',
        loadChildren: './performance/performance.module#PerformanceModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Performance',
        },
    },
    {
        path: 'auth-quiz',
        loadChildren: './quiz/quiz.module#QuizModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Risk Tolerance Quiz',
        },
    },
    {
        path: 'invest',
        loadChildren: './invest/invest.module#InvestModule',
        canActivate: [AuthGuard],
        data: {
            title: 'Invest',
        },
    },
    {
        path: '**',
        redirectTo: '/404',
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {title: '404 Not Found'},
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true, enableTracing: true}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
