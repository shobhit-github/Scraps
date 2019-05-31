import {createNumberMask} from 'text-mask-addons';
import {FormGroup} from '@angular/forms';

export const numberMask = {
    mask: createNumberMask({
        prefix: '$',
        suffix: '',
        integerLimit: 6
    }),
};

export function removeZero(controlName: string, form: FormGroup) {
    const control = form.get(controlName);
    if (String(control.value) === '0' || String(control.value) === '$0') {
        control.setValue('');
    }
}
