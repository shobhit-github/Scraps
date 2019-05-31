import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'substring',
})
export class SubstringPipe implements PipeTransform {
    transform(value: string, {limit = 100, trail = '...'}: { limit: number, trail: string }): string {
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
