import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
} from '@angular/core';
import {IRoundUpInfo} from '../../interfaces/round-up-info.interface';
import {IChartData} from '../../../core/interfaces/chart.interface';

@Component({
    selector: 'app-round-ups-info',
    templateUrl: './round-ups-info.component.html',
    styleUrls: ['./round-ups-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundUpsInfoComponent implements OnChanges {
    @Input()
    public info: IRoundUpInfo;
    public results: Array<IChartData>;
    public colorScheme = {
        domain: ['#1dc5bf', '#d3dfef', '#637fea', '#444054'],
    };
    public arcWidth = 0.1;
    public animations = false;
    public sumNextRoundUp: number;

    constructor() {
    }

    ngOnChanges() {
        if (this.info) {
            this.sumNextRoundUp = Number((this.info.maxSum - this.info.currentSum).toFixed(2));
            this.results = [
                {
                    value: this.info.currentSum || 0,
                    name: 'current sum',
                },
                {
                    value: this.sumNextRoundUp || 0,
                    name: 'ewfw sum',
                },
            ];
        }
    }
}
