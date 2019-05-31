import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    RiskActions,
    RiskActionTypes,
    LoadQuestionsSuccess,
    LoadQuestionsFail,
    Finish,
    FinishSuccess,
    FinishFail,
    LoadRiskSuccess,
    LoadRiskFail,
} from '../actions/risk.actions';
import {
    mergeMap,
    map,
    catchError,
    tap,
    switchMap,
    first,
} from 'rxjs/operators';
import {QuizService} from '../services/quiz.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {
    State,
    getIndex,
    getQuestions,
} from '../reducers/risk.reducer';
import {Title} from '@angular/platform-browser';

@Injectable()
export class RiskEffects {
    @Effect()
    loadQuestions$ = this.actions$.pipe(
        ofType(RiskActionTypes.LoadQuestions),
        mergeMap(() =>
            this.quizService.getQuestions().pipe(
                map(data => new LoadQuestionsSuccess(data)),
                catchError(() => of(new LoadQuestionsFail())),
            ),
        ),
    );
    @Effect({dispatch: false})
    answerQuiz$ = this.actions$.pipe(
        ofType(RiskActionTypes.Answer),
        mergeMap(() =>
            this.store.pipe(
                select(getIndex),
                first(),
                mergeMap(index =>
                    this.store.select(getQuestions).pipe(
                        first(),
                        tap(questions => {
                            if (questions.length <= index) {
                                this.router.url.includes('auth-quiz')
                                    ? this.router.navigate(['/auth-quiz', 'finish'])
                                    : this.router.navigate(['/quiz', 'finish']);
                            }
                        }),
                    ),
                ),
            ),
        ),
    );
    @Effect({dispatch: false})
    startQuiz$ = this.actions$.pipe(
        ofType(RiskActionTypes.Start),
        tap(() => {
            this.router.url.includes('auth-quiz')
                ? this.router.navigate(['/auth-quiz', 'progress'])
                : this.router.navigate(['/quiz', 'progress']);
        }),
    );
    @Effect()
    finish$ = this.actions$.pipe(
        ofType<Finish>(RiskActionTypes.Finish),
        switchMap(action => this.quizService.saveResult(action.payload)),
        map(risk => new FinishSuccess(risk)),
        catchError(() => of(new FinishFail())),
    );
    @Effect()
    getRisk = this.actions$.pipe(
        ofType(RiskActionTypes.LoadRisk),
        switchMap(action => this.quizService.getRisk()),
        map(risk => new LoadRiskSuccess(risk)),
        catchError(() => of(new LoadRiskFail())),
    );

    // @Effect()
    // all$ = this.actions$.pipe(ofType(RiskActionTypes.Start, RiskActionTypes.Answer, RiskActionTypes))

    constructor(
        private store: Store<State>,
        private actions$: Actions,
        public quizService: QuizService,
        private router: Router,
        private title: Title,
    ) {
    }
}
