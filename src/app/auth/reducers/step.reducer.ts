import {Action} from '@ngrx/store';
import {StepActions, StepActionTypes} from '../actions/step.actions';

export interface State {
    step: number;
}

export const initialState: State = {
    step: 1,
};

export function reducer(state = initialState, action: StepActions): State {
    switch (action.type) {
        case StepActionTypes.LoadStep:
            return state;
        case StepActionTypes.Change:
            return {...state, step: action.payload};
        case StepActionTypes.Increment:
            return {...state, step: state.step + 1};
        case StepActionTypes.Decrement:
            return {...state, step: state.step - 1};
        case StepActionTypes.Reset:
            return {...initialState};
        default:
            return state;
    }
}
