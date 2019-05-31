import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    EventEmitter,
    Output,
} from '@angular/core';
import {
    IQuestion,
    IQuestionOption,
} from '../../../quiz/interfaces/question.interface';
import {FormGroup, FormBuilder, FormControl, NgForm} from '@angular/forms';
import {deletedDiff, addedDiff} from 'deep-object-diff';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit, OnChanges {
    @Input()
    public questionList: Array<IQuestion>;
    @Output()
    public OnAddQuestion = new EventEmitter<undefined>();
    @Output()
    public OnAddOption = new EventEmitter<number>();
    @Output()
    public OnRemoveQuestion = new EventEmitter<IQuestion>();
    @Output()
    public OnSave = new EventEmitter<any>();
    @Output()
    public OnRemoveOption = new EventEmitter<{
        questionId: number;
        id: number;
    }>();
    public form: FormGroup;
    private config: { [key: string]: any };

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (!this.form) {
            // generate form
            this.config = this.generateConfig();
            this.form = this.fb.group(this.config);
        } else {
            // change form by state
            const newConfig = this.generateConfig();
            const added = addedDiff(this.config, newConfig);
            const deleted = deletedDiff(this.config, newConfig);
            Object.entries(added).forEach(([key, val]) =>
                this.form.addControl(key, new FormControl(val)),
            );
            Object.entries(deleted).forEach(([key, val]) =>
                this.form.removeControl(key),
            );
            this.config = newConfig;
        }
    }

    // trackBy
    public byId(index, item: IQuestion | IQuestionOption) {
        return item.id;
    }

    private generateConfig() {
        const options = this.questionList
        // get options and add parent id
            .map(item => item.options.map(opt => ({...opt, parentId: item.id})))
            // generate flat array all options
            .reduce((memo, pair) => [...memo, ...pair], []);
        const config = {
            // generate text question form group config
            ...this.questionList.reduce(
                (memo, pair) => ({
                    ...memo,
                    [`text_${pair.id}`]: pair.text,
                }),
                {},
            ),
            // generate text option form group config
            ...options.reduce(
                (memo, pair) => ({
                    ...memo,
                    [`opt-text_${pair.parentId}_${pair.id}`]: pair.text,
                }),
                {},
            ),
            // generate score option form group config
            ...options.reduce(
                (memo, pair) => ({
                    ...memo,
                    [`opt-score_${pair.parentId}_${pair.id}`]: pair.score,
                }),
                {},
            ),
        };
        return config;
    }

    onSave(form: FormGroup) {
        this.OnSave.emit(form.value);
    }
}
