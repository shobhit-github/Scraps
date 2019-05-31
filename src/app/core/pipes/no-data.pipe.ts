import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'noData'
})
export class NoDataPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value || 'No Data';
    }

}
