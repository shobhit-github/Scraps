import {IQuestion, IQuestionOption} from './question.interface';

export class Question implements IQuestion {
    constructor(
        public text = '',
        public options = [new QuestionOption()],
        public id = new Date().getTime(),
        public temp = true,
        public action: 'delete' | 'update' | 'create' = 'create',
    ) {
    }
}

export class QuestionOption implements IQuestionOption {
    constructor(
        public id = new Date().getTime(),
        public text = '',
        public score = 0,
    ) {
    }
}
