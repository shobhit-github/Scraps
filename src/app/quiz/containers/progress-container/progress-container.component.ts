import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Answer, LoadQuestions, SetActive} from '../../actions/risk.actions';
import {IQuestion} from '../../interfaces/question.interface';
import {
    getActive,
    getIndex,
    getQuestions,
    getTotalRaw,
} from '../../reducers/risk.reducer';

@Component({
    selector: 'app-progress-container',
    templateUrl: './progress-container.component.html',
    styleUrls: ['./progress-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressContainerComponent {
    public activeQuestion$: Observable<IQuestion>;
    public activeQuestionAnswer$: Observable<{ score: number; id: number }>;
    public activeIndex$: Observable<number>;
    public percents$: Observable<number>;
    public prevId$: Observable<number>;
    public nextId$: Observable<number>;
    private qLust$: Observable<Array<IQuestion>>;

    constructor(public router: Router, private store: Store<any>) {
        if (this.router.url === '/quiz/progress') {
            this.store.dispatch(new LoadQuestions());
        }
        this.activeQuestion$ = this.store.pipe(select(getActive));
        this.activeQuestionAnswer$ = combineLatest(
            this.store.pipe(select(getTotalRaw)),
            this.activeQuestion$,
        ).pipe(
            map(([totalList, activeQuestion]) => {
                if (activeQuestion) {
                    return totalList.find(item => activeQuestion.id === item.id);
                } else {
                    return totalList[totalList.length - 1];
                }
            }),
        );
        this.activeIndex$ = this.store.pipe(select(getIndex));
        this.qLust$ = this.store.pipe(select(getQuestions));
        this.prevId$ = combineLatest(this.activeIndex$, this.qLust$).pipe(
            map(this.getId('prev')),
        );
        this.nextId$ = combineLatest(this.activeIndex$, this.qLust$).pipe(
            map(this.getId('next')),
        );
        this.percents$ = this.qLust$.pipe(
            map(items => items.length),
            mergeMap(count =>
                this.activeIndex$.pipe(
                    map(active => Math.round(((active + 1) / count) * 100)),
                ),
            ),
        );
    }

    answer(data: { score: number; id: number }) {
        this.store.dispatch(new Answer(data));
    }

    onChange(id: number) {
        this.store.dispatch(new SetActive(id));
    }

    getId(type: 'prev' | 'next') {
        return ([index, list]) => {
            const item = list[type === 'next' ? index + 1 : index - 1];
            return item ? item.id : 0;
        };
    }
}
