import {Action} from '@ngrx/store';
import {IQuestion} from '../interfaces/question.interface';

export enum RiskActionTypes {
    Reset = '[Risk] Reset',
    Finish = '[Risk] Finish',
    FinishSuccess = '[Risk] Finish Success',
    FinishFail = '[Risk] Finish Fail',
    Start = '[Risk] Start Quiz',
    QuestionIncrement = '[Risk] Question Increment',
    LoadQuestions = '[Risk] Load Questions',
    LoadQuestionsSuccess = '[Risk] Load Questions Success',
    LoadQuestionsFail = '[Risk] Load Questions Fail',
    Answer = '[Risk] Answer',
    SetActive = '[Risk] Set Active',
    LoadRisk = '[Risk] Load Risk',
    LoadRiskSuccess = '[Risk] Load Risk Success',
    LoadRiskFail = '[Risk] Load Risk Fail',
}

export class SetActive implements Action {
    readonly type = RiskActionTypes.SetActive;

    constructor(public payload: number) {
    }
}

export class Finish implements Action {
    readonly type = RiskActionTypes.Finish;

    constructor(public payload: number) {
    }
}

export class FinishSuccess implements Action {
    readonly type = RiskActionTypes.FinishSuccess;

    constructor(public payload: number) {
    }
}

export class FinishFail implements Action {
    readonly type = RiskActionTypes.FinishFail;
}

export class LoadQuestions implements Action {
    readonly type = RiskActionTypes.LoadQuestions;
}

export class LoadQuestionsSuccess implements Action {
    readonly type = RiskActionTypes.LoadQuestionsSuccess;

    constructor(public payload: Array<IQuestion>) {
    }
}

export class LoadQuestionsFail implements Action {
    readonly type = RiskActionTypes.LoadQuestionsFail;
}

export class Answer implements Action {
    readonly type = RiskActionTypes.Answer;

    constructor(public payload: { id: number; score: number }) {
    }
}

export class Reset implements Action {
    readonly type = RiskActionTypes.Reset;
}

export class Start implements Action {
    readonly type = RiskActionTypes.Start;
}

export class QuestionIncrement implements Action {
    readonly type = RiskActionTypes.QuestionIncrement;
}

export class LoadRisk implements Action {
    readonly type = RiskActionTypes.LoadRisk;
}

export class LoadRiskSuccess implements Action {
    readonly type = RiskActionTypes.LoadRiskSuccess;

    constructor(public payload: number) {
    }
}

export class LoadRiskFail implements Action {
    readonly type = RiskActionTypes.LoadRiskFail;
}

export type RiskActions =
    | SetActive
    | Finish
    | FinishSuccess
    | FinishFail
    | Reset
    | Start
    | QuestionIncrement
    | Answer
    | LoadQuestions
    | LoadQuestionsSuccess
    | LoadQuestionsFail
    | LoadRisk
    | LoadRiskSuccess
    | LoadRiskFail;
