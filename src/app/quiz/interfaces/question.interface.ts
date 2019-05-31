export interface IQuestionOption {
    id?: number;
    text: string;
    score: number;
}

export interface IQuestion {
    id: number;
    text: string;
    options: Array<IQuestionOption>;
    temp?: boolean;
    action?: 'delete' | 'update' | 'create';
}
