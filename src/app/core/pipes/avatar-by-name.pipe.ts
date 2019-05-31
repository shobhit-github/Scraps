import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'avatarByName',
})
export class AvatarByNamePipe implements PipeTransform {
    transform(value: string, args?: any): any {
        // let avatarText = '';
        // if (value) {
        //   avatarText = value
        //     .split(' ')
        //     .map(name => (name[0] ? name[0].toUpperCase() : '?'))
        //     .join('');
        // }
        // if (avatarText.length === 3) {
        //   avatarText = `${avatarText[0]}${avatarText[2]}`;
        // }
        // return avatarText;
        return value ? value[0].toUpperCase() : '';
    }
}
