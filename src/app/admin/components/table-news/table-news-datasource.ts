import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {merge, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import * as fromStore from '../../reducers';
import {INewsAdmin} from '../../interfaces/table-news.interface';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableNewsDataSource extends DataSource<INewsAdmin> {
    public data$: Observable<INewsAdmin[]>;

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private store: Store<fromStore.State>,
    ) {
        super();
        // this.store.dispatch(new AdminActions.LoadUsers(200));
        this.data$ = this.store.pipe(select(fromStore.selectNewsCatState));
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<INewsAdmin[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            this.data$,
            this.paginator.page.pipe(mergeMap(() => this.data$)),
            this.sort.sortChange.pipe(mergeMap(() => this.data$)),
        ];

        return merge(...dataMutations).pipe(
            map(data => {
                // Set the paginators length
                this.paginator.length = data.length;
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
    private getPagedData(data: INewsAdmin[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: INewsAdmin[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'id':
                    return compare(+a.id, +b.id, isAsc);
                case 'show':
                    return compare(a.show, b.show, isAsc);
                case 'image':
                    return compare(a.image, b.image, isAsc);
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
