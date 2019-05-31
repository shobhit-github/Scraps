import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import {
    MatPaginator,
    MatSort,
    MatSortable,
    PageEvent,
    Sort,
} from '@angular/material';
import {Store} from '@ngrx/store';

import * as AdminActions from '../../actions/admin.actions';
import {EStatusesSource, EStatuses} from '../../interfaces/table.interfaces';
import * as fromStore from '../../reducers';
import {TableDataSource} from './table-datasource';
import {Subscription} from 'rxjs';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
    @Input()
    pageSize = 10;
    @Input()
    pageSizeOptions = [10];
    @Input()
    shadow = true;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    localSort = false;
    dataSource: TableDataSource;
    EStatusesSource = EStatusesSource;
    EStatuses = EStatuses;
    isSearch = false;
    pageIndex = 0;
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'dateCreated',
        'email',
        'legalName',
        'attachedDocs',
        'status',
        'referral_link',
        'id',
    ];
    private subscriptions: Array<Subscription> = [];
    public searchFormControl = new FormControl('', [
        Validators.minLength(3),
    ]);

    constructor(
        private store: Store<fromStore.State>,
        public matcher: MyErrorStateMatcher,
    ) {
        this.store.dispatch(
            new AdminActions.LoadUsers({limit: this.pageSize, page: this.pageIndex + 1}),
        );
    }

    ngOnInit() {
        this.resetUsers('desc');
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public setUserStatus(status: EStatusesSource, userId: string) {
        this.store.dispatch(new AdminActions.Update({status, userId}));
    }

    // public downloadFile(type: string) {
    //   this.store.dispatch(new AdminActions.DownloadFile({ type }));
    // }

    public changePage({pageIndex, previousPageIndex, pageSize}: PageEvent) {
        if (pageIndex > previousPageIndex) {
            this.pageIndex++;
            if (this.searchFormControl.value && this.isSearch) {
                this.store.dispatch(new AdminActions.SearchUsers({
                        limit: this.pageSize,
                        page: this.pageIndex + 1,
                        sort: {direction: this.sort.direction, active: this.sort.active},
                        q: this.searchFormControl.value,
                    }),
                );
            } else {
                this.store.dispatch(
                    new AdminActions.LoadUsers({
                        limit: this.pageSize,
                        page: this.pageIndex + 1,
                        sort: {direction: this.sort.direction, active: this.sort.active},
                    }),
                );
            }
        } else {
            this.pageIndex--;
        }
    }

    public searchUsers() {
        this.pageIndex = 0;
        this.store.dispatch(new AdminActions.SearchUsers({
                limit: this.pageSize,
                page: this.pageIndex + 1,
                sort: {direction: this.sort.direction, active: this.sort.active},
                q: this.searchFormControl.value,
            }),
        );
        this.isSearch = true;
    }

    public resetUsers(searchSort) {
        this.pageIndex = 0;
        this.subscriptions = [];
        this.sort.sort(<MatSortable>{
            id: 'dateCreated',
            start: searchSort,
        });
        this.dataSource = new TableDataSource(
            this.paginator,
            this.sort,
            this.store,
            this.localSort,
        );
        this.subscriptions.push(
            this.sort.sortChange.subscribe((sort: Sort) => {
                this.store.dispatch(
                    new AdminActions.LoadUsers({
                        limit: this.pageSize,
                        page: this.pageIndex + 1,
                        sort,
                    }),
                );
            }),
        );
        this.searchFormControl.setValue('');
        this.isSearch = false;
    }
}
