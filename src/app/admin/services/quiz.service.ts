import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {IQuestion} from '../../quiz/interfaces/question.interface';

@Injectable()
export class QuizService {
    constructor(private http: HttpClient) {
    }

    public getQuestions() {
        return this.http
            .get(`${environment.baseUrl}/admin/question/index`)
            .pipe(map((resp: { data: Array<IQuestion> }) => resp.data));
    }

    public deleteQuestion({id}: IQuestion) {
        return this.http.delete(
            `${environment.baseUrl}/admin/question/destroy/${id}`,
        );
    }

    public createQuestion(question: IQuestion) {
        const req = this.makeRequest(question);
        return this.http.post(`${environment.baseUrl}/admin/question/store`, req);
    }

    public updateQuestion(question: IQuestion) {
        const req = this.makeRequest(question);
        return this.http.put(
            `${environment.baseUrl}/admin/question/update/${question.id}`,
            req,
        );
    }

    private makeRequest(
        question: IQuestion,
    ): {
        text: string;
        options: Array<string>;
        scores: Array<number>;
    } {
        return {
            text: question.text,
            options: question.options.map(opt => opt.text),
            scores: question.options.map(opt => opt.score),
        };
    }
}
