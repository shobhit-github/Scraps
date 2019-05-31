import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromUser from '../../reducers/user.reducer';
import {Router, NavigationEnd} from '@angular/router';
import {filter, map, mergeMap, startWith} from 'rxjs/operators';
import {IMenuItem} from '../../interfaces/menu.interface';
import {Observable} from 'rxjs';
import {Logout} from '../../../auth/actions/auth.actions';

@Component({
    selector: 'app-header-container',
    templateUrl: './header-container.component.html',
    styleUrls: ['./header-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush, // mb default
})
export class HeaderContainerComponent implements OnInit {
    public user$;
    public menuLinks: Array<IMenuItem> = [
        {link: '/dashboard', hint: 'Dashboard', icon: 'home'},
        {link: '/performance', hint: 'Performance', icon: 'performance'},
        {link: '/portfolios', hint: 'Portfolios', icon: 'diamond'},
        {link: '/round-ups', hint: 'Round-Ups', icon: 'round-ups'},
        {link: 'https://skraps.io/blog', hint: 'Blog', icon: 'edit'},
        {link: '/messages', hint: 'Messages', icon: 'messages'},
        {link: '/news', hint: 'News', icon: 'news'},
        {link: '/ico', hint: 'ICO List', icon: 'coins'},
    ];
    public activeUrl$: Observable<string>;

    constructor(private store: Store<fromUser.State>, private router: Router) {
        this.user$ = this.store.pipe(select('user'));
        this.activeUrl$ = this.router.events.pipe(
            startWith(new NavigationEnd(0, '/', '/')),
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => {
                return this.menuLinks.filter(item => {
                    return this.router.isActive(item.link, false);
                })[0];
            }),
            map(item => (item && item.link ? item.link : '')),
        );
    }

    ngOnInit() {
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}
