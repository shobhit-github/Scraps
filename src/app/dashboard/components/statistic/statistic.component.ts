import {
    Component,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {IStatisticItem} from '../../interfaces/dashboard-service';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticComponent {
    @Input()
    public stats: Array<IStatisticItem>;
    public statsTitle = ['', 'current', 'gain/loss', 'invested', 'previous', 'round-ups'];
}
