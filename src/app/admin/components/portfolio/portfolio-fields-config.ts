import {IIcoFieldsItemWith} from '../table-ico/table-ico-fields-config';
import {Validators} from '@angular/forms';
import {ETitle} from '../../../quiz/interfaces/risk.interface';
import {IPortfolioAdmin} from '../../interfaces/portfolio.interface';

export const portfolioFieldsConfig: Array<IIcoFieldsItemWith<IPortfolioAdmin>> = [
    {
        name: 'package_name',
        type: 'text',
        validator: Validators.required,
        required: true,
        label: 'Package Name',
    },
    {
        name: 'risk_name',
        type: 'select',
        validator: Validators.required,
        required: true,
        label: 'Risk Name',
        options: Object.keys(ETitle).filter(item => isNaN(Number(item))),
    },

    // {
    //   name: 'risk_value',
    //   type: 'text',
    //   validator: Validators.required,
    //   required: true,
    //   label: 'Risk Value',
    // },

    // {
    //   name: 'suggest',
    //   type: 'checkbox',
    //   required: true,
    //   label: 'Suggest',
    // },
    {
        name: 'options',
        type: 'coins',
        required: true,
        label: 'Options',
    },
];
