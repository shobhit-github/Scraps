import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    QuizActions,
    QuizActionTypes,
    LoadQuizSuccess,
    LoadQuizFail,
    DeleteQuestion,
    DeleteQuestionSuccess,
    DeleteQuestionFail,
    MarkAs,
    SaveQuiz,
    SaveQuizFail,
    SaveQuizSuccess,
    LoadQuiz,
} from '../actions/quiz.actions';
import {map, mergeMap, catchError, tap, switchMap, first} from 'rxjs/operators';
import {QuizService} from '../services/quiz.service';
import {of, forkJoin} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {State} from '../reducers/quiz.reducer';
import {getQuestions} from '../reducers';
import {
    IQuestion,
    IQuestionOption,
} from '../../quiz/interfaces/question.interface';

@Injectable()
export class QuizEffects {
    @Effect()
    load$ = this.actions$.pipe(
        ofType(QuizActionTypes.LoadQuiz),
        mergeMap(() =>
            this.quizService.getQuestions().pipe(
                map(res => new LoadQuizSuccess(res)),
                catchError(() => of(new LoadQuizFail())),
            ),
        ),
    );
    @Effect()
    delete$ = this.actions$.pipe(
        ofType<DeleteQuestion>(QuizActionTypes.DeleteQuestion),
        map(action => {
            if (action.payload.temp) {
                return new DeleteQuestionSuccess(action.payload);
            } else {
                return new MarkAs({questionId: action.payload.id, action: 'delete'});
            }
        }),
    );
    @Effect()
    save$ = this.actions$.pipe(
        ofType<SaveQuiz>(QuizActionTypes.SaveQuiz),
        switchMap(action =>
            this.store.pipe(
                select(getQuestions),
                map(questions => {
                    const newQuestions = questions.map(question => {
                        const newQuestion = {...question};

                        if (action.payload[newQuestion.id]) {
                            newQuestion.text = action.payload[newQuestion.id].text;
                        }

                        if (action.payload[newQuestion.id]) {
                            newQuestion.options = action.payload[newQuestion.id].options
                                .filter(({text}) => !!text)
                                .map(({score, text}): IQuestionOption => ({score, text}));
                        }

                        if (newQuestion.temp) {
                            delete newQuestion.id;
                        } else if (newQuestion.action !== 'delete') {
                            newQuestion.action = 'update';
                        }
                        // console.log(newQuestion);
                        return newQuestion;
                    });
                    return newQuestions;
                }),
                first(),
            ),
        ),
        switchMap(newQuestions => {
            const deletes = newQuestions
                .filter(question => question.action === 'delete')
                .map(question => this.quizService.deleteQuestion(question));

            const updates = newQuestions
                .filter(question => question.action === 'update')
                .map(question => this.quizService.updateQuestion(question));
            const creates = newQuestions
                .filter(question => question.action === 'create')
                .map(question => this.quizService.createQuestion(question));
            return forkJoin([...deletes, ...updates, ...creates]).pipe(
                map(res => new SaveQuizSuccess()),
                catchError(err => of(new SaveQuizFail())),
            );
        }),
    );
    @Effect()
    success$ = this.actions$.pipe(
        ofType(QuizActionTypes.SaveQuizSuccess),
        map(() => new LoadQuiz()),
    );

    constructor(
        private actions$: Actions,
        private quizService: QuizService,
        private store: Store<State>,
    ) {
    }
}
