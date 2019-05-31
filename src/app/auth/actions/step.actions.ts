import {Action} from '@ngrx/store';

export enum StepActionTypes {
    LoadStep = '[Step] Load Step',
    Increment = '[Step] Increment Step',
    Decrement = '[Step] Decrement Step',
    Change = '[Step] Change Step',
    Reset = '[Step] Reset Step',
}

export class Load implements Action {
    readonly type = StepActionTypes.LoadStep;
}

export class Change implements Action {
    readonly type = StepActionTypes.Change;

    constructor(public payload: number, public to?: Array<string>) {
    }
}

export class Increment implements Action {
    readonly type = StepActionTypes.Increment;
}

export class Decrement implements Action {
    readonly type = StepActionTypes.Decrement;
}

export class Reset implements Action {
    readonly type = StepActionTypes.Reset;
}

export type StepActions = Load | Change | Increment | Decrement | Reset;
