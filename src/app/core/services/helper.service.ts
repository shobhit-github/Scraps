import {Injectable} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {withLatestFrom, filter, map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor() {
    }

    getAnimatedScore(realScore$: Observable<number>): Observable<number> {
        return interval(100).pipe(
            withLatestFrom(realScore$),
            filter(([first, second]) => first > 0 && second > 0),
            map(
                ([first, second]) => (first > second + 1 || first > 5 ? second : first),
            ),
            take(6),
            // tap(val => console.log(val)),
        );
    }
}
