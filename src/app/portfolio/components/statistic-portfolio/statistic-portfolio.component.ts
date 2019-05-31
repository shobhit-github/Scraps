import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {IPortfolio} from '../../interfaces/portfolio';
import {ITotal} from 'src/app/invest/interfaces/total.interface';
import {ICurrencyData} from 'src/app/invest/interfaces/currency.interface';

@Component({
    selector: 'app-statistic-portfolio',
    templateUrl: './statistic-portfolio.component.html',
    styleUrls: ['./statistic-portfolio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticPortfolioComponent implements OnInit {
    @Input()
    public total: ITotal;
    @Input()
    public content = {
        introTitle: 'You are investing',
        outroTitle: ``,
    };

    @Input()
    public set portfolio(val: IPortfolio) {
        if (val) {
            this.content.outroTitle = `To ${val.package_name}`;
        }
    }

    @Input()
    public currency: ICurrencyData;

    constructor() {
    }

    ngOnInit() {
    }
}
