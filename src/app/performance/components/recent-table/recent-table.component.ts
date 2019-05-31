import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {IRecentActivity} from '../../interfaces/performance.interface';

@Component({
    selector: 'app-recent-table',
    templateUrl: './recent-table.component.html',
    styleUrls: ['./recent-table.component.scss'],
})
export class RecentTableComponent {
    @Input()
    recentActivity?: Observable<Array<IRecentActivity>>;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'icon',
        'type',
        'date',
        'description',
        'amount',
        'amount_$'
    ];
}
