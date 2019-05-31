import {Action} from '@ngrx/store';
import {IQuestion} from '../../quiz/interfaces/question.interface';

export enum QuizActionTypes {
    LoadQuiz = '[Quiz] Load Quiz',
    LoadQuizSuccess = '[Quiz] Load Quiz Success',
    LoadQuizFail = '[Quiz] Load Quiz Fail',
    SetQuiz = '[Quiz] Set Quiz',
    SetQuizSuccess = '[Quiz] Set Quiz Success',
    SetQuizFail = '[Quiz] Set Quiz Fail',
    UpdateQuestion = '[Quiz] Update Question',
    UpdateQuestionSuccess = '[Quiz] Update Question Success',
    UpdateQuestionFail = '[Quiz] Update Question Fail',
    DeleteOption = '[Quiz] Delete Option',
    DeleteQuestion = '[Quiz] Delete Question',
    DeleteQuestionSuccess = '[Quiz] Delete Question Success',
    DeleteQuestionFail = '[Quiz] Delete Question Fail',
    AddQuestion = '[Quiz] Add Question',
    AddOption = '[Quiz] Add Option',
    UpdateQuestionLocal = '[Quiz] Update Local Text Question',
    MarkAs = '[Quiz] Mark Question For Action',
    SaveQuiz = '[Quiz] Save Quiz',
    SaveQuizSuccess = '[Quiz] Save Quiz Success',
    SaveQuizFail = '[Quiz] Save Quiz Fail',
}

export class LoadQuiz implements Action {
    readonly type = QuizActionTypes.LoadQuiz;
}

export class LoadQuizSuccess implements Action {
    readonly type = QuizActionTypes.LoadQuizSuccess;

    constructor(public payload: Array<IQuestion>) {
    }
}

export class LoadQuizFail implements Action {
    readonly type = QuizActionTypes.LoadQuizFail;
}

export class SetQuiz implements Action {
    readonly type = QuizActionTypes.SetQuiz;

    constructor(public payload: Array<IQuestion>) {
    }
}

export class SetQuizSuccess implements Action {
    readonly type = QuizActionTypes.SetQuizSuccess;
}

export class SetQuizFail implements Action {
    readonly type = QuizActionTypes.SetQuizFail;
}

export class UpdateQuestion implements Action {
    readonly type = QuizActionTypes.UpdateQuestion;

    constructor(public payload: IQuestion) {
    }
}

export class UpdateQuestionSuccess implements Action {
    readonly type = QuizActionTypes.UpdateQuestionSuccess;
}

export class UpdateQuestionFail implements Action {
    readonly type = QuizActionTypes.UpdateQuestionFail;
}

export class DeleteQuestion implements Action {
    readonly type = QuizActionTypes.DeleteQuestion;

    constructor(public payload: IQuestion) {
    }
}

export class UpdateQuestionLocal implements Action {
    readonly type = QuizActionTypes.UpdateQuestionLocal;

    constructor(public payload: { id: number; text: string }) {
    }
}

export class DeleteOption implements Action {
    readonly type = QuizActionTypes.DeleteOption;

    constructor(public payload: { questionId: number; id: number }) {
    }
}

export class MarkAs implements Action {
    readonly type = QuizActionTypes.MarkAs;

    constructor(
        public payload: {
            questionId: number;
            action: 'create' | 'update' | 'delete';
        },
    ) {
    }
}

export class DeleteQuestionSuccess implements Action {
    readonly type = QuizActionTypes.DeleteQuestionSuccess;

    constructor(public payload: IQuestion) {
    }
}

export class DeleteQuestionFail implements Action {
    readonly type = QuizActionTypes.DeleteQuestionFail;
}

export class AddQuestion implements Action {
    readonly type = QuizActionTypes.AddQuestion;
}

export class AddOption implements Action {
    readonly type = QuizActionTypes.AddOption;

    constructor(public payload: number) {
    }
}

export class SaveQuiz implements Action {
    readonly type = QuizActionTypes.SaveQuiz;

    constructor(public payload: { [key: string]: IQuestion }) {
    }
}

export class SaveQuizSuccess implements Action {
    readonly type = QuizActionTypes.SaveQuizSuccess;
}

export class SaveQuizFail implements Action {
    readonly type = QuizActionTypes.SaveQuizFail;
}

export type QuizActions =
    | DeleteOption
    | LoadQuiz
    | LoadQuizSuccess
    | LoadQuizFail
    | SetQuiz
    | SetQuizSuccess
    | SetQuizFail
    | UpdateQuestion
    | UpdateQuestionSuccess
    | UpdateQuestionFail
    | DeleteQuestion
    | DeleteQuestionSuccess
    | DeleteQuestionFail
    | AddQuestion
    | AddOption
    | UpdateQuestionLocal
    | MarkAs
    | SaveQuiz
    | SaveQuizSuccess
    | SaveQuizFail;
