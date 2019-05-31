import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';

import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';
import * as fromUser from '../reducers/user.reducer';

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    showSidenav$: Observable<boolean>;
    isAuth$: Observable<boolean>;
    user$: Observable<fromUser.State>;
    private hieByRoutes = ['/admin', '/auth', '/email-confirmed', '/auth-quiz'];
    public hide$: Observable<boolean>;
    public routerEvents$: Observable<Event>;

    constructor(
        private store: Store<fromRoot.State>,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private meta: Meta,
    ) {
        this.user$ = this.store.pipe(select(fromRoot.getUserState));
        this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
        this.isAuth$ = this.store.pipe(select(fromAuth.selectAuthIsAuthState));
        this.routerEvents$ = this.router.events;
        this.hide$ = this.routerEvents$.pipe(
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => {
                return this.hieByRoutes.filter(item => {
                    return this.router.isActive(item, false);
                })[0];
            }),
            map(item => !!item),
        );
    }

    ngOnInit() {
        this.routerEvents$.subscribe(evt => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            // Scroll by navigation
            window.scrollTo(0, 0);
        });
        this.routerEvents$
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.route),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data),
                map(({title, desc}) => [title || 'Skraps', desc]),
            )
            .subscribe(([stateTitle, desc]) => {
                if (desc) {
                    const metaDesc = this.meta.getTag('name="description"');
                    if (!metaDesc) {
                        this.meta.addTag({name: 'description', content: desc});
                    } else {
                        this.meta.updateTag({name: 'description', content: desc});
                    }
                }
                this.titleService.setTitle(stateTitle);
            });
    }

    closeSidenav() {
        /**
         * All state updates are handled through dispatched actions in 'container'
         * components. This provides a clear, reproducible history of state
         * updates and user interaction through the life of our
         * application.
         */
        this.store.dispatch(new LayoutActions.CloseSidenav());
    }

    openSidenav() {
        this.store.dispatch(new LayoutActions.OpenSidenav());
    }

    logout() {
        // console.log('this');

        this.closeSidenav();

        this.store.dispatch(new AuthActions.Logout());
    }
}
