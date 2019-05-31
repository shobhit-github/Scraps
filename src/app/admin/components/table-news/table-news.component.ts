import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import {MatPaginator, MatSort, MatSortable} from '@angular/material';
import {Store} from '@ngrx/store';

import * as AdminActions from '../../actions/admin.actions';
import {EStatusesSource, EStatuses} from '../../interfaces/table.interfaces';
import * as fromStore from '../../reducers';
import {TableNewsDataSource} from './table-news-datasource';

@Component({
    selector: 'app-table-news',
    templateUrl: './table-news.component.html',
    styleUrls: ['./table-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableNewsComponent implements OnInit {
    @Input() pageSize = 20;
    @Input() pageSizeOptions = [25, 50, 100, 250];
    @Input() shadow = true;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: TableNewsDataSource;
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'slug', 'image', 'show'];

    constructor(private store: Store<fromStore.State>) {
        this.store.dispatch(new AdminActions.LoadNewsCats());
    }

    ngOnInit() {
        this.sort.sort(<MatSortable>{
            id: 'id',
            start: 'asc',
        });
        this.dataSource = new TableNewsDataSource(
            this.paginator,
            this.sort,
            this.store,
        );
    }

    public onSubmit({id, show, event}) {
        const data = new FormData();
        if (event) {
            data.append('image', (event.target || event.srcElement).files[0]);
        }
        data.append('id', String(id));
        data.append('show', !!show ? '1' : '0');
        this.store.dispatch(new AdminActions.UpdateCat(data));
    }
}
