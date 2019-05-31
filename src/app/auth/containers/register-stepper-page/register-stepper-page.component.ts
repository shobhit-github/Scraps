import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromAuth from '../../reducers';
import {Observable} from 'rxjs';
import * as StepActions from '../../actions/step.actions';

@Component({
    selector: 'app-register-stepper-page',
    templateUrl: './register-stepper-page.component.html',
    styleUrls: ['./register-stepper-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepperPageComponent implements OnInit {
    public step$: Observable<any>;

    constructor(private store: Store<fromAuth.State>) {
        this.store.dispatch(new StepActions.Load());
        this.step$ = this.store.pipe(select(fromAuth.selectStepState));
    }

    ngOnInit() {
    }

    onStepChanged(step: number) {
        this.store.dispatch(new StepActions.Change(step));
    }
}
