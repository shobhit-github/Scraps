import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {IFullChartData} from '../../interfaces/chart.interface';
import {curveNatural, CurveFactory} from 'd3';
import abbreviate from 'number-abbreviate';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit {
    @Input()
    public results: Array<IFullChartData>;
    @Input()
    public yAxisTicks: Array<number> = [0, 2000, 4000, 6000, 8000];
    public showLegend = false;
    public showXAxis = true;
    public colorScheme = {
        domain: ['#adc9f0', '#789499', '#637fea', '#444054'],
    };
    public showYAxis = true;
    public autoScale = false;
    public xScaleMin;
    public xScaleMax;
    public yScaleMin;
    public yScaleMax;
    public timeline;
    public showGridLines = true;
    @Input()
    public curve: CurveFactory = curveNatural;
    public rangeFillOpacity;
    public roundDomains = false;
    public tooltipDisabled;

    constructor() {
    }

    ngOnInit() {
    }

    onLegendLabelClick() {
    }

    select() {
    }

    yAxisTickFormatting(val: number) {
        return abbreviate(val);
    }
}
