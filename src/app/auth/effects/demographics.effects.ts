import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    DemographicsActions,
    DemographicsActionTypes,
    LoadEmploymentsSuccess,
    LoadEmploymentsFail,
    LoadIncomeSuccess,
    LoadIncomeFail,
    SaveDemographics,
    SaveDemographicsSuccess,
    SaveDemographicsFail,
} from '../actions/demographics.actions';
import {DemographicsService} from '../services/demographics.service';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class DemographicsEffects {
    @Effect()
    employments$ = this.actions$.pipe(
        ofType(DemographicsActionTypes.LoadEmployments),
        switchMap(() => this.demographicsService.getEmployments()),
        map(data => new LoadEmploymentsSuccess(data)),
        catchError(() => of(new LoadEmploymentsFail())),
    );
    @Effect()
    income$ = this.actions$.pipe(
        ofType(DemographicsActionTypes.LoadIncome),
        switchMap(() => this.demographicsService.getIncome()),
        map(data => new LoadIncomeSuccess(data)),
        catchError(() => of(new LoadIncomeFail())),
    );
    @Effect()
    save$ = this.actions$.pipe(
        ofType<SaveDemographics>(DemographicsActionTypes.SaveDemographics),
        switchMap(action =>
            this.demographicsService.setDemographics(action.payload),
        ),
        map(() => new SaveDemographicsSuccess()),
        catchError(() => of(new SaveDemographicsFail())),
    );

    constructor(
        private actions$: Actions,
        private demographicsService: DemographicsService,
    ) {
    }
}
