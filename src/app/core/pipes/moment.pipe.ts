import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {

    transform(value: any, method?: string, arg?: any): any {
        return moment(value)[method](arg);
    }

}
