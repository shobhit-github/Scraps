import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/detail.reducer';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import {filter, first, mergeMap, map} from 'rxjs/operators';
import {LoadDetail} from '../../actions/detail.actions';
import {IIco} from '../../interfaces/ico.interface';
import {getIco, getIcoList} from '../../reducers';
import {LoadList} from '../../actions/list.actions';

@Component({
    selector: 'app-ico-detail-container',
    templateUrl: './ico-detail-container.component.html',
    styleUrls: ['../../styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoDetailContainerComponent implements OnDestroy {
    private sub: Subscription;
    public ico$: Observable<IIco>;
    public icoList$: Observable<Array<IIco>>;

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
                map(params => params.get('slug')),
            )
            .subscribe(slug => {
                this.store.dispatch(new LoadDetail(slug));
            });
        this.ico$ = this.store.pipe(select(getIco));
        this.icoList$ = this.store.pipe(select(getIcoList));
        this.store.dispatch(new LoadList({page: 1, limit: 3, type: 'top'}));
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
