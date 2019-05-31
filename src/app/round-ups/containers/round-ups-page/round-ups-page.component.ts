import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/round-ups.reducer';
import {
    LoadInfo,
    LoadList,
    LoadRecurring,
    SetRecurring,
} from '../../actions/round-ups.actions';
import {Observable} from 'rxjs';
import {IRoundUp} from '../../interfaces/round-up.interface';
import {IRoundUpInfo} from '../../interfaces/round-up-info.interface';
import {IRoundUpRecurring} from '../../interfaces/round-up-recurring.interface';
import {IMeta} from 'src/app/admin/interfaces/user-for-admin.interface';
import {ERoundUpFilter} from '../../interfaces/round-up-filter.enum';

@Component({
    selector: 'app-round-ups-page',
    templateUrl: './round-ups-page.component.html',
    styleUrls: ['./round-ups-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundUpsPageComponent {
    public list$: Observable<Array<IRoundUp>>;
    public info$: Observable<IRoundUpInfo>;
    public recurring$: Observable<IRoundUpRecurring>;
    public meta$: Observable<IMeta>;
    public ERoundUpFilter = ERoundUpFilter;

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadInfo());
        this.store.dispatch(
            new LoadList({params: {page: 1, limit: 8}, type: ERoundUpFilter.all}),
        );
        this.store.dispatch(new LoadRecurring());
        this.list$ = this.store.pipe(select(fromStore.getList));
        this.info$ = this.store.pipe(select(fromStore.getInfo));
        this.recurring$ = this.store.pipe(select(fromStore.getRecurring));
        this.meta$ = this.store.pipe(select(fromStore.getMeta));
    }

    toPage({page, type}: { page: number; type: ERoundUpFilter }) {
        this.store.dispatch(new LoadList({params: {page, limit: 8}, type}));
    }

    setRecurring(data: IRoundUpRecurring) {
        this.store.dispatch(new SetRecurring(data));
    }
}
