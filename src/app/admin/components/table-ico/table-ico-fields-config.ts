import {Validators, ValidatorFn} from '@angular/forms';
import {EIcoTypes} from '../../../ico/containers/ico-list-container/ico-list-container.component';

export interface IIcoFieldsItem {
    name: string;
    type: string;
    options?: Array<string>;
    validator?: ValidatorFn;
    label?: string;
    placeholder?: string;
    required?: boolean;
    // group?: any;
    // isSub?: boolean;
}

export interface IIcoFieldsItemWith<T> {
    name: keyof T;
    type: string;
    options?: Array<string>;
    validator?: ValidatorFn;
    label?: string;
    placeholder?: string;
    required?: boolean;
    // group?: any;
    // isSub?: boolean;
}

export const icoFieldsConfig: Array<IIcoFieldsItem> = [
    // {
    //   name: 'id',
    //   type: 'hidden',
    // },
    {
        name: 'email',
        type: 'email',
        validator: Validators.compose([Validators.email, Validators.required]),
        required: true,
        label: 'Email',
    },
    {
        name: 'ico',
        type: 'select',
        validator: Validators.required,
        required: true,
        label: 'Type',
        options: Object.values(EIcoTypes).filter(item => isNaN(Number(item))),
    },
    {
        name: 'project',
        type: 'text',
        validator: Validators.required,
        required: true,
        label: 'Project Name',
    },
    {
        name: 'contact',
        type: 'email',
        validator: Validators.compose([Validators.email, Validators.required]),
        required: true,
        label: 'Contact Email',
    },
    {
        name: 'logo',
        type: 'file',
        label: 'Logo',
    },
    {
        name: 'pre_ico_start',
        type: 'date',
        label: 'Pre-ICO Start Date',
    },
    {
        name: 'pre_ico_end',
        type: 'date',
        label: 'Pre-ICO End Date',
    },
    {
        name: 'start_date',
        type: 'date',
        label: 'ICO Start Date',
    },
    {
        name: 'end_date',
        type: 'date',
        label: 'ICO End Date',
    },
    {
        name: 'website',
        type: 'text',
        label: 'Website',
        validator: Validators.required,
        required: true,
    },
    {
        name: 'whitepaper',
        type: 'text',
        label: 'Whitepaper',
        validator: Validators.required,
        required: true,
    },
    {
        name: 'telegram',
        type: 'text',
        label: 'Telegram',
    },
    {
        name: 'twitter',
        type: 'text',
        label: 'Twitter',
    },
    {
        name: 'facebook',
        type: 'text',
        label: 'Facebook',
    },
    {
        name: 'bitcointalk',
        type: 'text',
        label: 'Bitcointalk',
    },
    {
        name: 'description',
        type: 'text',
        label: 'Description',
        validator: Validators.required,
        required: true,
    },
    {
        name: 'line_description',
        type: 'text',
        label: 'One Line Description',
        validator: Validators.required,
        required: true,
    },
    {
        name: 'link_team',
        type: 'text',
        label: 'Link Team',
    },
    {
        name: 'video_link',
        type: 'text',
        label: 'Youtube Video ID',
        placeholder: 'c7cE50oAvGE',
    },
    {
        name: 'ico_soft_cap',
        type: 'text',
        label: 'ICO Soft Cap',
        placeholder: '2000000$',
    },
    {
        name: 'ico_hard_cap',
        type: 'text',
        label: 'ICO Hard Cap',
        placeholder: '30000000$',
    },
    {
        name: 'token_symbol',
        type: 'text',
        label: 'Token Symbol',
        placeholder: 'AL',
    },
    {
        name: 'token_type',
        type: 'text',
        label: 'Token Type',
        placeholder: 'ERC20',
    },
    {
        name: 'token_prices',
        type: 'text',
        label: 'Token Prices',
        placeholder: '0.015$, 0.02$, 0.04$, 0.09$',
    },
    {
        name: 'customer',
        type: 'checkbox',
        label: 'KYC Required',
    },
    {
        name: 'intend',
        type: 'checkbox',
        label: 'Intend',
    },
    {
        name: 'accept_currencies',
        type: 'text',
        placeholder: 'ETH',
        label: 'Accept Currencies',
    },
    {
        name: 'ico_location',
        type: 'text',
        label: 'ICO Location',
    },
    {
        name: 'restricted_countries',
        type: 'text',
        label: 'Restricted Countries',
    },
];
