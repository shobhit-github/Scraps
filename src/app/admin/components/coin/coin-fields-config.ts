import {Validators} from '@angular/forms';

import {IIcoFieldsItem} from '../table-ico/table-ico-fields-config';

export const coinFieldsConfig: Array<IIcoFieldsItem> = [
    {
        name: 'name',
        type: 'text',
        validator: Validators.required,
        required: true,
        label: 'Name',
    },
    {
        name: 'icon',
        type: 'file',
        validator: Validators.required,
        required: true,
        label: 'Icon',
    },
    {
        name: 'color',
        type: 'color',
        validator: Validators.required,
        required: true,
        label: 'Color',
    },
];
