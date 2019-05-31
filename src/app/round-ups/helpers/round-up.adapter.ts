import {Moment} from 'moment';
import {IRoundUp} from '../interfaces/round-up.interface';
import {ITransaction} from '../interfaces/plaid-transactions.inteface';

export class RoundUpAdapter implements IRoundUp {
    public amount: string | number;
    public round: string | number;
    public name: string;
    public date: string | Date | Moment;
    public status: 'approved' | 'pending';

    constructor(transaction: ITransaction) {
        this.amount = transaction.amount;
        // let round = (Math.ceil(transaction.amount) - transaction.amount).toFixed(2);
        // if (round.length === 3) {
        //   round += '0';
        // } else if (round === '0') {
        //   round = '0.00';
        // }
        this.round = transaction.different;
        this.name = transaction.name;
        this.date = transaction.date;
        this.status = transaction.pending ? 'pending' : 'approved';
    }
}
