import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'obj',
})
export class ObjPipe implements PipeTransform {
    transform(value: any, method: string = 'keys'): any {
        return Object[method].apply(null, [value]);
    }
}
