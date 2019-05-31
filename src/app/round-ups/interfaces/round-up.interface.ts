import {Moment} from 'moment';

export interface IRoundUp {
    amount: string | number;
    round: string | number;
    name: string;
    date: string | Date | Moment;
    status: 'approved' | 'pending';
}
