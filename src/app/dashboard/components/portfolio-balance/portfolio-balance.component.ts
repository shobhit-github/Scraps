import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {IPortfolioBalance} from '../../interfaces/dashboard-service';

@Component({
    selector: 'app-portfolio-balance',
    templateUrl: './portfolio-balance.component.html',
    styleUrls: ['./portfolio-balance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioBalanceComponent {
    @Input()
    public balance: IPortfolioBalance;
}
