import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    AfterContentChecked,
} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers/ico.reducer';
import {
    LoadIco,
    AddOrUpdateIco,
    AddLocalIco,
    DeleteIco,
    DeleteIcoLocal,
} from '../../actions/ico.actions';
import {Observable} from 'rxjs';
import {IIco} from '../../../ico/interfaces/ico.interface';
import {getIcoList, getIcoMeta} from '../../reducers';
import {
    sortRows,
    paginateRows,
    fromMatSort,
    fromMatPaginator,
} from '../../components/table-ico/table-ico-datasource';
import {Sort, PageEvent} from '@angular/material';
import {map} from 'rxjs/operators';
import {TableIcoComponent} from '../../components/table-ico/table-ico.component';
import {uniqueId} from 'lodash';

@Component({
    selector: 'app-table-ico-container',
    templateUrl: './table-ico-container.component.html',
    styleUrls: ['./table-ico-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableIcoContainerComponent implements AfterContentChecked {
    private loaded = [];
    @ViewChild(TableIcoComponent)
    public table: TableIcoComponent;
    public icoList$: Observable<Array<IIco>>;
    public totalRows$: Observable<number>;

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new LoadIco({}));
    }

    ngAfterContentChecked() {
        const sortEvents$: Observable<Sort> = fromMatSort(this.table.sort);
        const pageEvents$: Observable<PageEvent> = fromMatPaginator(
            this.table.paginator,
        );
        this.icoList$ = this.store.pipe(
            select(getIcoList),
            sortRows(sortEvents$),
            paginateRows(pageEvents$),
        );
        this.totalRows$ = this.store.pipe(
            select(getIcoMeta),
            map(meta => (!!meta ? meta.total : 0)),
        );
    }

    saveIco(data: IIco | FormData) {
        this.store.dispatch(new AddOrUpdateIco(data));
    }

    addLocalIco() {
        const tmpId = uniqueId('new_');
        this.store.dispatch(new AddLocalIco(tmpId));
    }

    deleteIco(ico: IIco) {
        if (!ico.isNew) {
            this.store.dispatch(new DeleteIco(ico.id));
        } else if (ico.isNew) {
            this.store.dispatch(new DeleteIcoLocal(ico.id));
        }
    }

    getPage(e: PageEvent) {
        const page = e.pageIndex + 1;
        if (!this.loaded.includes(page)) {
            const limit = e.pageSize;
            this.loaded.push(page);
            this.store.dispatch(
                new LoadIco({
                    page,
                    limit,
                }),
            );
        }
    }
}
