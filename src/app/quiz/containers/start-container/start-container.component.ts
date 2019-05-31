import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators';

import {LoadQuestions, LoadRisk, Start} from '../../actions/risk.actions';
import * as fromRisk from '../../reducers/risk.reducer';

@Component({
    selector: 'app-start-container',
    templateUrl: './start-container.component.html',
    styleUrls: ['./start-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartContainerComponent {
    public count$: Observable<number>;
    public isQuizStart = false;
    public riskLoaded$: Observable<boolean>;
    public quizLength$: Observable<number>;

    constructor(private store: Store<fromRisk.State>, public router: Router) {
        this.store.dispatch(new LoadQuestions());
        this.quizLength$ = this.store.pipe(
            select(fromRisk.getQuestions),
            map(quizList => quizList.length),
        );
        if (this.router.url === '/quiz/start') {
            this.isQuizStart = true;
        }

        this.store.dispatch(new LoadRisk());
        this.count$ = this.store.pipe(select(fromRisk.getRisk));
        this.riskLoaded$ = this.store.pipe(
            select(fromRisk.getRiskLoaded),
            delay(500),
        );
    }

    begin() {
        this.store.dispatch(new Start());
    }

    onSkip() {
        this.router.navigate(['/news']);
    }
}
