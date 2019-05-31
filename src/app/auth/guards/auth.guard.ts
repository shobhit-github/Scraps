import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.auth.isAuth()) {
            return this.auth.refreshToken().pipe(
                map(() => true),
                catchError(() => {
                    this.router.navigate(['/auth/login']);
                    return of(false);
                }),
            );
        }
        return true;
    }
}
