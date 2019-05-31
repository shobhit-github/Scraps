import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
    transform(date: string | Date): string {
        let time = '';
        if (date) {
            time = moment().to(moment(date));
        }
        return time;
    }
}
