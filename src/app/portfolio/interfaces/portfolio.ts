import {IChartData} from '../../core/interfaces/chart.interface';
import {IDialogUser} from '../../message/interfaces/dialog-list.intefaces';

export interface IPortfolio {
    id?: string;
    package_name?: string;
    risk_name?: string;
    suggest?: number;
    risk_value?: number;
    owner?: IDialogUser;
    options?: Array<IChartData>;
    isNew?: boolean;
}
