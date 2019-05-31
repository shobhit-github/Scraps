import {
    Component,
    ChangeDetectionStrategy,
    Input,
    HostListener,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter, OnInit,
} from '@angular/core';
import {IChartData} from '../../interfaces/chart.interface';

@Component({
    selector: 'app-doughnut-legend',
    templateUrl: './doughnut-legend.component.html',
    styleUrls: ['./doughnut-legend.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutLegendComponent implements OnInit {
    @Input()
    public isRich: boolean;
    @Input()
    public activeIndex: number;
    @Input()
    public risk = 1;
    @Input()
    public results: Array<IChartData>;
    @ViewChild('jsScroll') jsScroll: ElementRef;
    @ViewChild('jsScrollWrap') jsScrollWrap: ElementRef;
    @Output()
    public OnActivate = new EventEmitter<{
        event: { entries: Array<any>; value: IChartData };
    }>();
    @Output()
    public OnDeactivate = new EventEmitter<{
        event: { entries: Array<any>; value: IChartData };
    }>();
    public countScroll = 0;
    private chart;
    private isFirstTouchMove = true;
    private startY: number;
    private endY: number;
    private heightResult: number;
    private heightResultScroll: number;
    public innerWidth: number;

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
    }

    activeHover(e) {
        this.chart = document.querySelector('.pie-chart').querySelectorAll('g.ng-star-inserted');
        this.chart[e].querySelector('.arc').classList.add('active');
        this.OnActivate.emit(e);
    }

    notActiveHover() {
        for (let i = 0; i < this.chart.length; i++) {
            this.chart[i].querySelector('.arc').classList.remove('active');
        }
        this.OnDeactivate.emit();
    }

    @HostListener('mousewheel', ['$event'])
    @HostListener('wheel', ['$event'])
    scroll(e) {
        e.preventDefault();
        if (this.jsScroll && this.jsScroll.nativeElement && this.jsScrollWrap && this.jsScrollWrap.nativeElement) {
            const delta = e.deltaY || e.detail || e.wheelDelta;
            this.heightResult = this.jsScrollWrap.nativeElement.clientHeight;
            this.heightResultScroll = this.jsScroll.nativeElement.clientHeight;
            if (this.heightResultScroll > this.heightResult) {
                this.countScroll -= delta;
                if (-this.countScroll < 0) {
                    this.countScroll = 0;
                }
                if (-this.countScroll > this.heightResultScroll - this.heightResult) {
                    this.countScroll = -(this.heightResultScroll - this.heightResult);
                }
                this.jsScroll.nativeElement.style.top = this.countScroll + 'px';
            }
        }
    }

    @HostListener('touchmove', ['$event'])
    touchStart(e) {
        if (this.innerWidth > 767) {
            e.preventDefault();
            this.heightResult = this.jsScrollWrap.nativeElement.clientHeight;
            this.heightResultScroll = this.jsScroll.nativeElement.clientHeight;
            if (this.isFirstTouchMove) {
                this.startY = e.changedTouches[0].pageY;
                this.isFirstTouchMove = false;
            }
            this.endY = e.changedTouches[0].pageY;
            if (this.startY !== this.endY) {
                if (this.endY - this.startY > 0) {
                    this.countScroll += 25;
                } else {
                    this.countScroll -= 25;
                }
                if (-this.countScroll < 0) {
                    this.countScroll = 0;
                }
                if (-this.countScroll > this.heightResultScroll - this.heightResult) {
                    this.countScroll = -(this.heightResultScroll - this.heightResult);
                }
                this.jsScroll.nativeElement.style.top = this.countScroll + 'px';
                this.isFirstTouchMove = true;
            }
        }
    }

    @HostListener('window:resize')
    onResize() {
        this.innerWidth = window.innerWidth;
    }
}
