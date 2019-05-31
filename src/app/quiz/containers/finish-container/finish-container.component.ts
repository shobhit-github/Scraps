import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {HelperService} from '../../../core/services/helper.service';
import {Finish, LoadRisk} from '../../actions/risk.actions';
import {getRisk, getTotal, State} from '../../reducers/risk.reducer';

@Component({
    selector: 'app-finish-container',
    templateUrl: './finish-container.component.html',
    styleUrls: ['./finish-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishContainerComponent implements OnDestroy {
    // private test = Math.round(Math.random() * 4) + 1;
    // private test = 4;
    public result$: Observable<number>;
    public count$: Observable<number>;
    private subscribtion: Subscription;

    constructor(
        private store: Store<State>,
        private helperService: HelperService,
    ) {
        this.subscribtion = this.store.pipe(select(getTotal)).subscribe(total => {
            if (total) {
                this.store.dispatch(new Finish(total));
            } else {
                this.store.dispatch(new LoadRisk());
            }
        });

        this.result$ = this.store.pipe(select(getRisk));
        this.count$ = this.helperService.getAnimatedScore(this.result$);
    }

    ngOnDestroy() {
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
    }

    finish() {
    }
}
