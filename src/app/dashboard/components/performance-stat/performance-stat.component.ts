import {
    Component,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {IPerformanceItem} from '../../interfaces/dashboard-service';

@Component({
    selector: 'app-performance-stat',
    templateUrl: './performance-stat.component.html',
    styleUrls: ['./performance-stat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceStatComponent {
    @Input()
    public performanceList: Array<IPerformanceItem>;
}
