import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Input,
    Output,
    OnDestroy,
} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromStore from '../../reducers';
import {
    LoadEmployments,
    LoadIncome,
    SaveDemographics,
} from '../../actions/demographics.actions';
import {Subscription, Observable} from 'rxjs';
import {IAccountPersonal} from '../../../settings/interfaces/account.insterfaces';

@Component({
    selector: 'app-demographics-container',
    templateUrl: './demographics-container.component.html',
    styleUrls: ['./demographics-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicsContainerComponent implements OnDestroy {
    private subscriptions: Array<Subscription> = [];
    @Output()
    public OnCompleted = new EventEmitter();
    public employmentOptList$ = this.store.pipe(select(fromStore.getEmployments));
    public incomeOptList$ = this.store.pipe(select(fromStore.getIncome));
    private step$: Observable<number>;

    constructor(private store: Store<fromStore.State>) {
        this.step$ = this.store.pipe(select(fromStore.selectStepState));
        this.subscriptions.push(
            this.step$.subscribe(step => {
                if (step === 2) {
                    this.store.dispatch(new LoadEmployments());
                    this.store.dispatch(new LoadIncome());
                }
            }),
        );
        this.subscriptions.push(
            this.store.pipe(select(fromStore.getSuccess)).subscribe(success => {
                if (success) {
                    this.OnCompleted.emit();
                }
            }),
        );
    }

    public onSubmit(event: IAccountPersonal) {
        const pesonal = {
            employment_id: Number(event.employment_id),
            income_id: Number(event.income_id),
            birthday: event.birthday,
        };
        this.store.dispatch(new SaveDemographics(pesonal));
        // this.OnCompleted.emit(event);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => {
            item.unsubscribe();
        });
    }
}
