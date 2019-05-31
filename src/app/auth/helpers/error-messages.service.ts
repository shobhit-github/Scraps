import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {IError} from '../interfaces/errors.interface';

@Injectable({
    providedIn: 'root',
})
export class ErrorMessagesService {
    constructor() {
    }

    getError(error: HttpErrorResponse): IError {
        const err: IError = {
            field: 'global',
            message: '',
        };
        return err;
    }
}
