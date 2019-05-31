import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
    constructor(private domSan: DomSanitizer) {
    }

    transform(value: any, args: any, id?: string | number): any {
        const res = new RegExp(args, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
        if (id) {
            const dataId = ` data-scroll="${id}"`;
            return this.domSan.bypassSecurityTrustHtml(
                value.replace(res, `<mark${id ? dataId : ''}>${args}</mark>`),
            );
        } else {
            return value.replace(res, `<mark>${args}</mark>`);
        }
    }
}
