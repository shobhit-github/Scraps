import {Component, ChangeDetectorRef} from '@angular/core';

import {IIco} from '../../../ico/interfaces/ico.interface';
import {ADynamicForms} from '../../helpers/dynamic-forms.abstract';
import {icoFieldsConfig, IIcoFieldsItem} from './table-ico-fields-config';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-table-ico',
    templateUrl: './table-ico.component.html',
    styleUrls: ['./table-ico.component.scss'],
    ...ADynamicForms.metaData,
})
export class TableIcoComponent extends ADynamicForms<IIco> {
    public fieldsConfig: Array<IIcoFieldsItem> = icoFieldsConfig;

    constructor(protected fb: FormBuilder, protected cd: ChangeDetectorRef) {
        super(fb, cd);
    }
}
