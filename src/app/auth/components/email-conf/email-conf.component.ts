import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import {
    Router,
    ActivatedRoute,
    NavigationEnd,
} from '../../../../../node_modules/@angular/router';
import {
    Subscription,
    merge,
    of,
    NEVER,
} from '../../../../../node_modules/rxjs';
import {
    startWith,
    filter,
    mergeMap,
    map,
    catchError,
} from '../../../../../node_modules/rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-email-conf',
    templateUrl: './email-conf.component.html',
    styleUrls: ['./email-conf.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfComponent implements OnDestroy {
    private subscription: Subscription;
    private token: string;
    public isError: boolean;
    public pending = true;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
    ) {
        this.subscription = this.router.events
            .pipe(
                startWith(new NavigationEnd(0, '/', '/')),
                filter(event => event instanceof NavigationEnd),
                mergeMap(() => this.activeRoute.paramMap),
                map(params => params.get('token')),
                mergeMap(token => {
                    if (token !== this.token) {
                        this.token = token;
                        return this.authService.confirmEmail(token);
                    } else {
                        return NEVER;
                    }
                }),
                map(resp => {
                    this.isError = false;
                    this.pending = false;
                    this.cd.detectChanges();
                    return resp;
                }),
                catchError(() => {
                    this.isError = true;
                    this.pending = false;
                    this.cd.detectChanges();
                    return of({});
                }),
            )
            .subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
