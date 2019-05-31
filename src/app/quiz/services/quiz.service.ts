import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {IQuestion} from '../interfaces/question.interface';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(private http: HttpClient) {
    }

    public getQuestions() {
        return this.http
            .get(`${environment.baseUrl}/question/list`)
            .pipe(map((resp: { data: Array<IQuestion> }) => resp.data));
    }

    public saveResult(score: number) {
        return this.http
            .post(`${environment.baseUrl}/question/result`, {score})
            .pipe(map((resp: { risk: number }) => resp.risk));
    }

    public getRisk() {
        return this.http
            .get(`${environment.baseUrl}/question/get-risk`)
            .pipe(map((resp: { risk: number }) => resp.risk || 0));
    }
}
