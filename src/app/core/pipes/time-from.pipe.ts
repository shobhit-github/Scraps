import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timeFrom',
})
export class TimeFromPipe implements PipeTransform {
    transform(date: string | Date, utc = false): string {
        let transformMoment;
        let currentMoment;
        if (utc) {
            transformMoment = moment.utc(date);
            currentMoment = moment.utc();
        } else {
            transformMoment = moment(date);
            currentMoment = moment();
        }
        if (currentMoment.diff(transformMoment, 'day') > 1) {
            return transformMoment.format('lll');
        } else if (currentMoment.diff(transformMoment, 'day') === 1) {
            return 'Yesterday';
        } else if (currentMoment.diff(transformMoment, 'hour') > 0) {
            return `${currentMoment.diff(transformMoment, 'hour')}h`;
        } else if (currentMoment.diff(transformMoment, 'minute') > 0) {
            return `${currentMoment.diff(transformMoment, 'minute')}m`;
        } else if (currentMoment.diff(transformMoment, 'second') > 0) {
            return `${currentMoment.diff(transformMoment, 'second')}s`;
        } else if (currentMoment.diff(transformMoment, 'second') === 0) {
            return `Just now`;
        }
    }
}
