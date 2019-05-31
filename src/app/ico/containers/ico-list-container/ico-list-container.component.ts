import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter, first, map, mergeMap} from 'rxjs/operators';

import {LoadList} from '../../actions/list.actions';
import {IIco} from '../../interfaces/ico.interface';
import {getCount, getIcoList, getPage} from '../../reducers';
import * as fromStore from '../../reducers/list.reducer';

export enum EIcoTypes {
    'top' = 'Premium (Top Picks)',
    'active' = 'Silver (Active ICOs)',
    'air' = 'Airdrop',
}

@Component({
    selector: 'app-ico-list-container',
    templateUrl: './ico-list-container.component.html',
    styleUrls: ['../../styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoListContainerComponent implements OnDestroy {
    public icoList$: Observable<Array<IIco>>;
    public activePage$: Observable<number>;
    public count$: Observable<number>;
    public activeCat: string;
    private sub: Subscription;

    constructor(
        private store: Store<fromStore.State>,
        private router: Router,
        private activatedRouter: ActivatedRoute,
    ) {
        this.sub = this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                first(),
                mergeMap(() => this.activatedRouter.paramMap),
                map(params => {
                    return {
                        page: Number(params.get('page')),
                        activeCat: params.get('filter'),
                    };
                }),
                // filter(page => page > 0),
            )
            .subscribe(({page, activeCat}) => {
                this.activeCat = activeCat;
                this.store.dispatch(new LoadList({page, limit: 5, type: activeCat}));
            });
        this.icoList$ = this.store.pipe(select(getIcoList));
        this.activePage$ = this.store.pipe(select(getPage));
        this.count$ = this.store.pipe(select(getCount));
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
