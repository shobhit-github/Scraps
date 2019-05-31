import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IQuestion} from '../../../quiz/interfaces/question.interface';
import {
    AddOption,
    AddQuestion,
    DeleteOption,
    DeleteQuestion,
    LoadQuiz,
    SaveQuiz,
} from '../../actions/quiz.actions';
import {getQuestions} from '../../reducers';
import * as fromQuiz from '../../reducers/quiz.reducer';
import {
    Question,
    QuestionOption,
} from '../../../quiz/interfaces/question.model';

@Component({
    selector: 'app-quiz-container',
    templateUrl: './quiz-container.component.html',
    styleUrls: ['./quiz-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainerComponent implements OnInit {
    public questionList$: Observable<Array<IQuestion>>;

    constructor(private store: Store<fromQuiz.State>) {
        this.store.dispatch(new LoadQuiz());
        this.questionList$ = this.store.pipe(
            select(getQuestions),
            map(questionList =>
                questionList.filter(question => question.action !== 'delete'),
            ),
        );
    }

    ngOnInit() {
    }

    addQuestion() {
        this.store.dispatch(new AddQuestion());
    }

    addOption(id: number) {
        this.store.dispatch(new AddOption(id));
    }

    removeQuestion(question: IQuestion) {
        this.store.dispatch(new DeleteQuestion(question));
    }

    removeOption(data: { questionId: number; id: number }) {
        this.store.dispatch(new DeleteOption(data));
    }

    save(data: any) {
        this.store.dispatch(new SaveQuiz(this.normalizeData(data)));
    }

    private normalizeData(data: any): { [key: string]: IQuestion } {
        const normData: { [key: string]: IQuestion } = {};
        // console.log(data);

        Object.entries(data)
            .sort(([keya], [keyb]) => (keya < keyb ? -1 : keya > keyb ? 1 : 0))
            .reverse()
            .forEach(([key, val]) => {
                const [type, questionId, optionId] = key.split('_');
                switch (type) {
                    case 'text':
                        normData[questionId] = new Question(String(val));
                        break;
                    case 'opt-text':
                        normData[questionId].options.push(
                            new QuestionOption(Number(optionId), String(val)),
                        );
                        break;
                    case 'opt-score':
                        normData[questionId].options.forEach((opt, i, arr) => {
                            if (opt.id === Number(optionId)) {
                                arr[i].score = Number(val);
                            }
                        });
                        break;
                }
            });
        return normData;
    }
}
