import {
    ChangeDetectionStrategy,
    Component,
    ChangeDetectorRef,
} from '@angular/core';
import invert from 'invert-color';
import {ADynamicForms} from '../../helpers/dynamic-forms.abstract';
import {ICoin} from '../../interfaces/coin.interface';
import {coinFieldsConfig} from './coin-fields-config';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-coin',
    templateUrl: './coin.component.html',
    styleUrls: ['./coin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    ...ADynamicForms.metaData,
})
export class CoinComponent extends ADynamicForms<ICoin> {
    public fieldsConfig = coinFieldsConfig;

    constructor(protected fb: FormBuilder, protected cd: ChangeDetectorRef) {
        super(fb, cd);
    }

    public setColor(event, name, form) {
        form.get(name).setValue(event);
    }

    public invert(color: string, bw?: boolean): string {
        if (color) {
            return invert(color, bw);
        } else {
            return '#000000';
        }
    }
}
