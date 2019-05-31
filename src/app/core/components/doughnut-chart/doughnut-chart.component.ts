import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    DoCheck,
} from '@angular/core';
import {IChartData} from '../../interfaces/chart.interface';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, DoCheck {
    @Input()
    public isLock: boolean;
    @Input()
    public animations = true;
    @Input()
    public isRoundUps: boolean;
    @Input()
    public isAdd: boolean;
    @Input()
    public results: Array<IChartData>;
    @Input()
    public arcWidth = 0.15;
    @Input()
    public activeIndex: number;
    @Input()
    public colorScheme = {
        domain: [],
    };
    @Output()
    public OnActivate = new EventEmitter<{
        event: { entries: Array<any>; value: IChartData };
    }>();
    @Output()
    public OnDeactivate = new EventEmitter<{
        event: { entries: Array<any>; value: IChartData };
    }>();
    public showLegend = false;
    public showLabels = false;
    public doughnut = true;
    public gradient = true;
    public lastActiveIndex: number;
    public valueSelectItem;

    ngOnInit() {
        if (this.results) {
            this.results.map(data =>
                this.colorScheme.domain.push(data.color),
            );
        }
    }

    ngDoCheck(): void {
        if (this.lastActiveIndex !== this.activeIndex || this.activeIndex === 0) {
            this.selectItems();
        }
    }

    public onActivate(event) {
        this.selectItems();
        this.lastActiveIndex = this.activeIndex;
        this.OnActivate.emit(event);
    }

    public onDeactivate() {
        this.selectItems();
        this.lastActiveIndex = 0;
        this.OnDeactivate.emit();
    }

    public selectItems() {
        this.valueSelectItem = this.activeIndex >= 0 ? this.results[this.activeIndex].value : '';
    }
}
