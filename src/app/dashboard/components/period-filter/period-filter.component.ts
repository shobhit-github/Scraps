import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    EPeriodFilter,
    IPerformanceFilter,
} from '../../interfaces/dashboard-service';

@Component({
    selector: 'app-period-filter',
    templateUrl: './period-filter.component.html',
    styleUrls: ['./period-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodFilterComponent {
    @Input()
    public filter: IPerformanceFilter;
    @Output()
    public changedFilter = new EventEmitter<IPerformanceFilter>();

    public ePeriodFilter = EPeriodFilter;
    public links = Object.entries(this.ePeriodFilter).map(([value, text]) => ({
        text,
        value,
    }));

    private filterTime = {
        '1H': 60,
        '1D': 1440,
        '7D': 10080,
        '1M': 40320,
        '1Y': 483840,
    };

    changeFilter(period: EPeriodFilter) {
        const time = this.filterTime[period];
        const newFilter = {...this.filter, period, time};
        this.changedFilter.emit(newFilter);
    }
}
