import {Action} from '@ngrx/store';
import {QuizActions, QuizActionTypes} from '../actions/quiz.actions';
import {IQuestion} from '../../quiz/interfaces/question.interface';
import {Question, QuestionOption} from '../../quiz/interfaces/question.model';

export interface State {
    questions: Array<IQuestion>;
}

export const initialState: State = {
    questions: [],
};

export function reducer(state = initialState, action: QuizActions): State {
    switch (action.type) {
        case QuizActionTypes.LoadQuiz:
            return {...state, questions: []};
        case QuizActionTypes.MarkAs:
            return {
                ...state,
                questions: state.questions.map(q => {
                    if (q.id !== action.payload.questionId) {
                        return q;
                    } else {
                        const newQ = {...q};
                        newQ.action = action.payload.action;
                        return newQ;
                    }
                }),
            };
        case QuizActionTypes.LoadQuizSuccess:
            return {...state, questions: action.payload};
        case QuizActionTypes.AddQuestion:
            return {...state, questions: [...state.questions, new Question()]};
        case QuizActionTypes.AddOption:
            return {
                ...state,
                questions: state.questions.map(question => {
                    if (question.id === action.payload) {
                        const newQuestion = {...question};
                        newQuestion.options = [
                            ...newQuestion.options,
                            new QuestionOption(),
                        ];
                        return newQuestion;
                    }
                    return question;
                }),
            };
        case QuizActionTypes.DeleteOption:
            return {
                ...state,
                questions: state.questions.map(question => {
                    if (question.id === action.payload.questionId) {
                        const newQuestion = {...question};
                        newQuestion.options = newQuestion.options.filter(
                            opt => opt.id !== action.payload.id,
                        );
                        return newQuestion;
                    }
                    return question;
                }),
            };
        case QuizActionTypes.DeleteQuestionSuccess:
            return {
                ...state,
                questions: state.questions.filter(
                    question => question.id !== action.payload.id,
                ),
            };

        default:
            return state;
    }
}
