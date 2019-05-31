import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {merge, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

import {ILinks, IMeta} from '../../interfaces/user-for-admin.interface';
import * as fromStore from '../../reducers';
import {TableItem, EStatusesSource} from '../../interfaces/table.interfaces';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
    public data$: Observable<TableItem[]>;
    public meta$: Observable<IMeta>;
    public links: Observable<ILinks>;

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private store: Store<fromStore.State>,
        private localSort = true,
    ) {
        super();
        // this.store.dispatch(new AdminActions.LoadUsers(200));
        this.data$ = this.store.pipe(select(fromStore.selectUsersState));
        this.meta$ = this.store.pipe(select(fromStore.selectUsersMeta));
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<TableItem[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            this.data$,
            this.paginator.page.pipe(mergeMap(() => this.data$)),
            this.sort.sortChange.pipe(mergeMap(() => this.data$)),
        ];

        return merge(...dataMutations).pipe(
            map(data => {
                return this.getPagedData(this.getSortedData([...data]));
            }),
        );
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {
    }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: TableItem[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: TableItem[]) {
        if (!this.localSort || !this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'legalName':
                    return compare(a.legalName, b.legalName, isAsc);
                case 'id':
                    return compare(+a.id, +b.id, isAsc);
                case 'email':
                    return compare(a.email, b.email, isAsc);
                case 'status':
                    return compare(
                        EStatusesSource[a.status],
                        EStatusesSource[b.status],
                        isAsc,
                    );
                case 'dateCreated':
                    return compare(
                        moment(a.dateCreated)
                            .toDate()
                            .getTime(),
                        moment(b.dateCreated)
                            .toDate()
                            .getTime(),
                        isAsc,
                    );
                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
