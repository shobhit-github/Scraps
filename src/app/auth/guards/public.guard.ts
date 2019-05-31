import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PublicGuard implements CanActivate {
    // TODO: store
    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuth()) {
            this.router.navigate(['/news']);
            return false;
        }
        return true;
    }
}
