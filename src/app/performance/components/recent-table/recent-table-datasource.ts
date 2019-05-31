import {DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

export interface IRecentTableItem {
    id: number;
    icon: string;
    type: string;
    date: string;
    dateNumber: number;
    description: string;
    amount: string;
    amount_$: string;
}

const EXAMPLE_DATA: IRecentTableItem[] = [
    {
        id: 1,
        icon: 'bitcoin-icon',
        type: 'Bitcoin',
        date: '05/04/2018',
        dateNumber: 11,
        description: '',
        amount: '0.078 BTC',
        amount_$: '+$567.34',
    },
    {
        id: 2,
        icon: 'invest-icon',
        type: 'Investment',
        date: '03/04/2018',
        dateNumber: 10,
        description: 'Recurring Investment of $500',
        amount: '- - - - - - - ',
        amount_$: '+$500.00',
    },
    {
        id: 3,
        icon: 'litecoin-icon',
        type: 'Litecoin',
        date: '02/08/2018',
        dateNumber: 13,
        description: '',
        amount: '0.078 LTC',
        amount_$: '+$867.34',
    },
    {
        id: 4,
        icon: 'invest-icon',
        type: 'Withdrawl',
        date: '01/08/2018',
        dateNumber: 12,
        description: '',
        amount: '- - - - - - - ',
        amount_$: '-$500.00'
    },
    {
        id: 5,
        icon: 'invest-icon',
        type: 'Round-Up',
        date: '07/08/2018',
        dateNumber: 14,
        description: 'Starbucks Coffee $4.87 Round-Up',
        amount: '- - - - - - - ',
        amount_$: '+$37.00'
    },
    {
        id: 6,
        icon: 'invest-icon',
        type: 'Round-Up',
        date: '01/08/2018',
        dateNumber: 12,
        description: 'Starbucks Coffee $4.87 Round-Up',
        amount: '- - - - - - - ',
        amount_$: '+$37.00'
    }
];

/**
 * Data source for the RecentTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RecentTableDataSource extends DataSource<IRecentTableItem> {
    data: IRecentTableItem[] = EXAMPLE_DATA;

    constructor(private sort: MatSort) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<IRecentTableItem[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data]));
        }));
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
    private getPagedData(data: IRecentTableItem[]) {
        // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        // return data.splice(startIndex, this.paginator.pageSize);
        return data.splice(0, 100);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: IRecentTableItem[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'type':
                    return compare(a.type, b.type, isAsc);
                case 'date':
                    return compare(a.dateNumber, b.dateNumber, isAsc);
                case 'description':
                    return compare(a.description, b.description, isAsc);
                case 'amount':
                    return compare(a.amount, b.amount, isAsc);
                case 'amount_$':
                    return compare(a.amount_$, b.amount_$, isAsc);
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
