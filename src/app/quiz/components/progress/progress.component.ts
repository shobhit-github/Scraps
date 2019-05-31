import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import {IQuestion} from '../../interfaces/question.interface';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnChanges, OnInit {
    public score = -1;
    public activeId = 0;
    @Input()
    public alreadyAnswer: { id: number; score: number };
    @Input()
    public question: IQuestion;
    @Input()
    public prevId: number;
    @Input()
    public nextId: number;

    @Input()
    public set percents(val) {
        this.percentStyle = `calc(92px + ${val}%)`;
    }

    public percentStyle = '1px';
    @Output()
    public OnAnswer = new EventEmitter<{ id: number; score: number }>();
    @Output()
    public OnChage = new EventEmitter<number>();

    constructor() {
    }

    public answer() {
        this.OnAnswer.emit({id: this.question.id, score: this.score});
    }

    ngOnChanges() {
        this.score = -1;
        this.activeId = 0;
        if (this.alreadyAnswer && this.question) {
            this.score = this.alreadyAnswer.score;
            this.activeId = this.question.options.filter(item => item.score === this.alreadyAnswer.score).map(item => item.id)[0];
        }
    }

    ngOnInit() {
        this.score = -1;
        this.activeId = 0;
    }
}
