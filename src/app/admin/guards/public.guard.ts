import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminService} from '../services/admin.service';

@Injectable({
    providedIn: 'root'
})
export class AdminPublicGuard implements CanActivate {
    // TODO: store
    constructor(public adminService: AdminService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.adminService.isAuth()) {
            this.router.navigate(['/admin/users']);
            return false;
        }
        return true;
    }
}
