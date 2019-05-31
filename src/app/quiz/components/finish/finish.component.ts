import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {Router} from '@angular/router';
import {ETitle, EDesc} from '../../interfaces/risk.interface';

@Component({
    selector: 'app-finish',
    templateUrl: './finish.component.html',
    styleUrls: ['./finish.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishComponent implements OnInit, OnChanges {
    public init = false;
    public initFinish = false;
    @Input()
    public count;
    @Input()
    public isPortfolio = false;
    public title;
    public desc;
    public isQuiz = false;
    public positionList = [
        'translate(884, 488) rotate(-157)',
        'translate(884, 488) rotate(-121)',
        'translate(884, 488) rotate(-82)',
        'translate(884, 488) rotate(-41)',
        'translate(884, 488) rotate(-7)',
    ];

    constructor(public router: Router) {
        if (
            this.router.url === '/quiz/start' ||
            this.router.url === '/quiz/finish'
        ) {
            this.isQuiz = true;
        }
    }

    ngOnInit() {
        this.setInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setInit(changes.count.previousValue);
    }

    setInit(prev?) {
        this.init = !!this.count;
        this.title = ETitle[this.count - 1];
        this.desc = EDesc[this.count - 1];
        this.initFinish = prev && prev >= this.count;
    }
}
