import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IRoundUp} from '../../interfaces/round-up.interface';
import {ERoundUpFilter} from '../../interfaces/round-up-filter.enum';
import {IMeta} from 'src/app/admin/interfaces/user-for-admin.interface';

@Component({
    selector: 'app-round-ups-list',
    templateUrl: './round-ups-list.component.html',
    styleUrls: ['./round-ups-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundUpsListComponent {
    @Output()
    public toPage = new EventEmitter<{ page: number; type: ERoundUpFilter }>();
    public ERoundUpFilter = ERoundUpFilter;
    @Input()
    public activeType: ERoundUpFilter = ERoundUpFilter['all'];
    public links = [
        {
            type: 'all',
            hint: 'All',
        },
        {
            type: 'approved',
            hint: 'Approved',
        },
        {
            type: 'pending',
            hint: 'Pending',
        },
    ];
    @Input()
    public list: Array<IRoundUp>;
    @Input()
    public meta: IMeta;

    constructor() {
    }

    select(type: string) {
        this.activeType = ERoundUpFilter[type];
        this.toPage.emit({page: 1, type: this.activeType});
    }
}
