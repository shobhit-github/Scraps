import {Pipe, PipeTransform} from '@angular/core';
import {ICoin} from '../interfaces/coin.interface';
import {FormGroup} from '@angular/forms';

@Pipe({
    name: 'coinValue',
})
export class CoinValuePipe implements PipeTransform {
    transform(coin: ICoin, form: FormGroup, name: string): any {
        const control = form.get(name);
        if (control) {
            const opt = control.value.find(item => item.id === coin.id);
            if (opt) {
                return opt.value;
            }
        }

        return 0;
    }
}
