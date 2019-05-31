import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError, NEVER} from 'rxjs';
import {catchError, mergeMap, first} from 'rxjs/operators';
import {JwtInterceptor} from '@auth0/angular-jwt';
import {AuthService} from './auth/services/auth.service';
import {Store} from '@ngrx/store';
import * as fromStore from './reducers';
import {
    Logout,
    RegisterSuccess,
    RefreshToken,
} from './auth/actions/auth.actions';
import {Router} from '@angular/router';
import {Change} from './auth/actions/step.actions';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotYetModalComponent} from './core/components/not-yet-modal/not-yet-modal.component';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    public fileNameDialogRef;

    constructor(
        private authorizationService: AuthService,
        private jwtInterceptor: JwtInterceptor,
        private store: Store<fromStore.State>,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (
            this.jwtInterceptor.isWhitelistedDomain(req) &&
            !this.jwtInterceptor.isBlacklistedRoute(req)
        ) {
            return next.handle(req).pipe(
                catchError(err => {
                    const errorResponse = err as HttpErrorResponse;
                    if (typeof errorResponse.error.error === 'string') {
                        console.error(
                            `back-end error message: ${errorResponse.error.error}`,
                        );
                    } else {
                        console.error(`back-end response`, errorResponse);
                    }
                    if (
                        errorResponse.error.error === 'Phone has not been verified' ||
                        errorResponse.error.error === 'Email has not been confirmed'
                    ) {
                        this.store.dispatch(new Change(1));
                    } else if (
                        errorResponse.error.error === 'Identity files has not been uploaded'
                    ) {
                        // this.store.dispatch(new Change(3));
                        this.store.dispatch(new Change(3, ['/settings', 'identity']));
                    } else if (errorResponse.error.error === 'User account is pending') {
                        if (this.fileNameDialogRef === undefined) {
                            this.fileNameDialogRef = this.dialog.open(NotYetModalComponent, {
                                width: '700px',
                                height: 'auto',
                                panelClass: 'modal',
                                closeOnNavigation: true,
                                disableClose: true,
                            });
                            this.fileNameDialogRef
                                .afterClosed()
                                .subscribe(() => (this.fileNameDialogRef = undefined));
                        }
                        return NEVER;
                    } else if (errorResponse.error.error === 'Access deny') {
                        this.router.navigate(['/404']);
                        return NEVER;
                    } else if (
                        (errorResponse.status === 401 ||
                            errorResponse.error.error === 'Unauthenticated.') &&
                        window.location.hash !== '#/auth/login'
                    ) {
                        this.store.dispatch(
                            new RefreshToken(
                                this.jwtInterceptor.intercept.bind(this, req, next),
                            ),
                        );
                    }
                    if (
                        errorResponse.error.error === 'The token has been blacklisted' ||
                        errorResponse.error.error === 'Too Many Attempts.'
                    ) {
                        this.store.dispatch(new Logout());
                    }
                    return throwError(err);
                }),
            );
        } else {
            return next.handle(req);
        }
    }
}
