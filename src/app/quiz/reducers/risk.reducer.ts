import {Action, createSelector, createFeatureSelector} from '@ngrx/store';
import {RiskActions, RiskActionTypes} from '../actions/risk.actions';
import {IQuestion} from '../interfaces/question.interface';

export interface State {
    questions: Array<IQuestion>;
    total: Array<{ id: number; score: number }>;
    activeIndex: number;
    title: string;
    risk: number;
    riskLoaded: boolean;
}

export const initialState: State = {
    total: [],
    questions: [],
    activeIndex: 0,
    title: 'Risk Tolerance Quiz',
    risk: 0,
    riskLoaded: false,
};

export function reducer(state = initialState, action: RiskActions): State {
    switch (action.type) {
        case RiskActionTypes.LoadQuestionsSuccess:
            return {...state, questions: action.payload};
        case RiskActionTypes.LoadQuestions:
            return {
                ...state,
                activeIndex: 0,
                total: [],
                title: 'Risk Tolerance Quiz',
                risk: 0,
                questions: [],
            };
        case RiskActionTypes.SetActive:
            const newIndex = state.questions.findIndex(
                item => item.id === action.payload,
            );
            return {
                ...state,
                activeIndex: newIndex,
                title:
                    newIndex + 1 <= state.questions.length
                        ? `Question ${newIndex + 1}/${state.questions.length}`
                        : 'Risk Score Results',
            };
        case RiskActionTypes.Start:
            return {
                ...state,
                risk: 0,
                title:
                    state.activeIndex < state.questions.length
                        ? `Question ${state.activeIndex + 1}/${state.questions.length}`
                        : 'Risk Score Results',
            };
        case RiskActionTypes.Answer:
            return {
                ...state,
                activeIndex: state.activeIndex + 1,
                total: [
                    ...state.total.filter(item => item.id !== action.payload.id),
                    action.payload,
                ],
                title:
                    state.activeIndex + 2 <= state.questions.length
                        ? `Question ${state.activeIndex + 2}/${state.questions.length}`
                        : 'Risk Score Results',
            };
        case RiskActionTypes.FinishSuccess:
            return {
                ...state,
                risk: action.payload,
                total: [],
                questions: [],
                activeIndex: 0,
                title: 'Risk Tolerance Quiz',
                riskLoaded: false,
            };
        case RiskActionTypes.LoadRisk:
            return {
                ...state,
                risk: 0,
                riskLoaded: false,
            };
        case RiskActionTypes.LoadRiskSuccess:
            return {
                ...state,
                risk: action.payload,
                riskLoaded: true,
            };

        default:
            return state;
    }
}

export const getState = createFeatureSelector('risk');
export const getQuestions = createSelector(
    getState,
    (state: State) => state.questions,
);
export const getActive = createSelector(
    getState,
    (state: State) => state.questions[state.activeIndex],
);
export const getIndex = createSelector(
    getState,
    (state: State) => state.activeIndex,
);
export const getTotal = createSelector(
    getState,
    (state: State) => state.total.reduce((memo, pair) => memo + pair.score, 0),
);
export const getTotalRaw = createSelector(
    getState,
    (state: State) => state.total,
);
export const getTitle = createSelector(
    getState,
    (state: State) => state.title,
);
export const getRisk = createSelector(
    getState,
    (state: State) => state.risk,
);
export const getRiskLoaded = createSelector(
    getState,
    (state: State) => state.riskLoaded,
);
