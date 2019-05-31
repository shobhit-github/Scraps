import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'displayDate',
})
export class DisplayDatePipe implements PipeTransform {
    transform(date: string | Date, format: string = 'll', parseFormat?: string): string {
        const displayDate = moment(date, parseFormat).format(format);
        return displayDate.toLowerCase() !== 'invalid date' ? displayDate : 'No Date';
    }
}
