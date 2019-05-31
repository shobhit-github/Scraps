import {IPortfolio} from '../interfaces/portfolio';
import {IChartData} from '../../core/interfaces/chart.interface';
import {IDialogUser} from '../../message/interfaces/dialog-list.intefaces';

export class Portfolio implements IPortfolio {
    constructor(
        public risk_value?: number,
        public options?: Array<IChartData>,
        public package_name?: string,
        public risk_name?: string,
        public owner?: IDialogUser,
        public badge?: string,
        public suggest?: number,
    ) {
    }
}
