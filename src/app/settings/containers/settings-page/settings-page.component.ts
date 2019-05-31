import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {IMenuItem} from '../../../core/interfaces/menu.interface';
import {Observable} from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';
import {filter, map, startWith, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../../../core/components/snack-bar/snack-bar.component';
import {LoadIdentity} from '../../actions/identity.actions';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements OnInit, OnDestroy {
    public menuLinks: Array<IMenuItem> = [
        {link: '/settings/account', hint: 'Account Settings'},
        {link: '/settings/profile', hint: 'Profile Settings'},
        {link: '/settings/security', hint: 'Security'},
        {link: '/settings/notifications', hint: 'Notifications'},
        {link: '/settings/referral', hint: 'Referral System'},
        {link: '/quiz/start', hint: 'Risk Tolerance Quiz'},
        // { link: '/settings/round-ups', hint: 'Round Ups Settings' },
        // { link: '/settings/wallet', hint: 'Wallet' },
    ];
    public activeUrl$: Observable<string>;

    constructor(
        private store: Store<fromStore.State>,
        private router: Router,
        public snackBar: MatSnackBar,
    ) {
        this.store.dispatch(new LoadIdentity());
        this.store.pipe(select(fromStore.getIdentity)).subscribe(identity => {
            if (Number(identity.status) !== 1 && !this.menuLinks.filter(item => item.link === '/settings/identity')[0]) {
                this.menuLinks.push({link: '/settings/identity', hint: 'Identity'});
            }
        });
    }

    public success$ = this.store
        .pipe(select(fromStore.getSuccess))
        .subscribe(result => {
            if (result) {
                this.openSnackBar();
            }
        });
    public failed$ = this.store
        .pipe(select(fromStore.getFailed))
        .subscribe(result => {
            if (result) {
                this.openSnackBar(true);
            }
        });

    ngOnDestroy() {
        this.success$.unsubscribe();
        this.failed$.unsubscribe();
    }

    ngOnInit() {
        this.activeUrl$ = this.router.events.pipe(
            startWith(new NavigationEnd(0, '/', '/')),
            filter(event => event instanceof NavigationEnd),
            map(() => {
                return this.menuLinks.filter(item => {
                    return this.router.isActive(item.link, false);
                })[0];
            }),
            map(item => (item && item.link ? item.link : '')),
        );
    }

    openSnackBar(isError: boolean = false) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: {isError},
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: isError ? ['snack', 'snack_err'] : ['snack'],
        });
    }
}
