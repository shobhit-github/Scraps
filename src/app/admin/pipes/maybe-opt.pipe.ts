import {Pipe, PipeTransform} from '@angular/core';
import {IChartData} from '../../core/interfaces/chart.interface';

@Pipe({
    name: 'maybeOpt',
})
export class MaybeOptPipe implements PipeTransform {
    transform(
        value: Array<IChartData> | string | number,
        args?: any,
    ): string | number {
        if (value instanceof Array) {
            return value
                .map(item => item.name)
                .join(', ');
        } else {
            return value;
        }
    }
}
