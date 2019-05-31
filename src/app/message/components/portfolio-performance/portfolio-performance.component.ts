import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

import {IFullChartData} from '../../../core/interfaces/chart.interface';
import {CurveFactory, curveNatural} from 'd3';

@Component({
    selector: 'app-portfolio-performance',
    templateUrl: './portfolio-performance.component.html',
    styleUrls: ['./portfolio-performance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPerformanceComponent implements OnInit {
    @Input()
    public isFull = false;
    @Input()
    public curve: CurveFactory = curveNatural;
    @Input()
    public isMax = false;
    @Input()
    public yAxisTicks: Array<number>;
    @Input()
    public filterName: string;
    @Input()
    public results: any = {
        '1H': [
            {
                name: 'Portfolio Performance',
                series: [
                    {
                        name: '11:25',
                        value: 0,
                    },
                    {
                        name: '11:35',
                        value: 0,
                    },
                    {
                        name: '11:45',
                        value: 0,
                    },
                    {
                        name: '11:55',
                        value: 0,
                    },
                    {
                        name: '12:05',
                        value: 0,
                    },
                    {
                        name: '12:15',
                        value: 0,
                    },
                    {
                        name: '12:25',
                        value: 0,
                    },
                ],
            },
        ],
        '1D': [
            {
                name: 'Portfolio Performance',
                series: [
                    {
                        name: '12pm 10 Jan',
                        value: 0,
                    },
                    {
                        name: '6pm 10 Jan',
                        value: 0,
                    },
                    {
                        name: '12am 11 Jan',
                        value: 0,
                    },
                    {
                        name: '6am 11 Jan',
                        value: 0,
                    },
                    {
                        name: '12pm 11 Jan',
                        value: 0,
                    },
                ],
            },
        ],
        '7D': [
            {
                name: 'Portfolio Performance',
                series: [
                    {
                        name: '5 Jan',
                        value: 0,
                    },
                    {
                        name: '6 Jan',
                        value: 0,
                    },
                    {
                        name: '7 Jan',
                        value: 0,
                    },
                    {
                        name: '8 Jan',
                        value: 0,
                    },
                    {
                        name: '9 Jan',
                        value: 0,
                    },
                    {
                        name: '10 Jan',
                        value: 0,
                    },
                    {
                        name: '11 Jan',
                        value: 0,
                    },
                ],
            },
        ],
        '1M': [
            {
                name: 'Portfolio Performance',
                series: [
                    {
                        name: '13 Dec',
                        value: 0,
                    },
                    {
                        name: '19 Dec',
                        value: 0,
                    },
                    {
                        name: '25 Dec',
                        value: 0,
                    },
                    {
                        name: '31 Dec',
                        value: 0,
                    },
                    {
                        name: '5 Jan',
                        value: 0,
                    },
                    {
                        name: '11 Jan',
                        value: 0,
                    },
                ],
            },
        ],
        '1Y': [
            {
                name: 'Portfolio Performance',
                series: [
                    {
                        name: 'Jan 18',
                        value: 0,
                    },
                    {
                        name: 'Feb 18',
                        value: 0,
                    },
                    {
                        name: 'Mar 18',
                        value: 0,
                    },
                    {
                        name: 'Apr 18',
                        value: 0,
                    },
                    {
                        name: 'May 18',
                        value: 0,
                    },
                    {
                        name: 'Jun 18',
                        value: 0,
                    },
                    {
                        name: 'Jul 18',
                        value: 0,
                    },
                    {
                        name: 'Aug 18',
                        value: 0,
                    },
                    {
                        name: 'Sep 18',
                        value: 0,
                    },
                    {
                        name: 'Oct 18',
                        value: 0,
                    },
                    {
                        name: 'Nov 18',
                        value: 0,
                    },
                    {
                        name: 'Dec 18',
                        value: 0,
                    },
                    {
                        name: 'Jan 19',
                        value: 0,
                    },
                ],
            },
        ],
    };

    constructor() {
    }

    ngOnInit() {
    }
}
