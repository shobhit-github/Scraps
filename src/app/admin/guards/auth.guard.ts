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
export class AdminAuthGuard implements CanActivate {
    constructor(public adminService: AdminService, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.adminService.isAuth()) {
            console.log('redirect');

            this.router.navigate(['/admin/login']);
            return false;
        }
        console.log('not redirect');
        return true;
    }
}
