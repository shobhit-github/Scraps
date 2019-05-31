import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthPageComponent} from '../components/auth-page/auth-page.component';
import {RegisterPageComponent} from '../containers/register-page/register-page.component';
import {RegisterStepperPageComponent} from '../containers/register-stepper-page/register-stepper-page.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginPageComponent} from '../containers/login-page/login-page.component';
import {PublicGuard} from '../guards/public.guard';
import {ForgotPageComponent} from '../containers/forgot-page/forgot-page.component';
import {ResetPageComponent} from '../containers/reset-page/reset-page.component';
import {EmailConfComponent} from '../components/email-conf/email-conf.component';

const routes: Routes = [
    {
        path: '',
        component: AuthPageComponent,
        // pathMatch: 'full',
        children: [
            {
                path: 'login',
                component: LoginPageComponent,
                canActivate: [PublicGuard],
                data: {title: 'Sign In'},
            },
            {
                path: 'forgot',
                component: ForgotPageComponent,
                canActivate: [PublicGuard],
                data: {title: 'Forgot Password'},
            },
            {
                path: 'register',
                component: RegisterPageComponent,
                canActivate: [PublicGuard],
                data: {title: 'Sign Up'},
            },
            {
                path: 'reset/:token/:userId',
                component: ResetPageComponent,
                canActivate: [PublicGuard],
                data: {title: 'Reset Password'},
            },
            {
                path: 'progress',
                component: RegisterStepperPageComponent,
                canActivate: [AuthGuard],
                data: {title: 'Continuation of registration'},
            },
            {
                path: 'confirm/:token',
                component: EmailConfComponent,
                data: {title: 'Email Confirmed!'},
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
