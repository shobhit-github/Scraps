import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IPortfolio} from '../../../portfolio/interfaces/portfolio';
import {IDialogUser} from '../../../message/interfaces/dialog-list.intefaces';

@Component({
    selector: 'app-portfolio-item',
    templateUrl: './portfolio-item.component.html',
    styleUrls: ['./portfolio-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioItemComponent implements IPortfolio {
    @Input()
    public isPanel = false;
    @Input()
    public isCurrent = false;
    @Input()
    public isMainPortfolio = false;
    @Input()
    public isLock = true;
    @Input()
    public isAdd = true;
    @Input()
    public isOwner = false;
    @Input()
    public portfolio: any;
    @Output()
    public usePortfolio = new EventEmitter<string>();
    public activeIndex: number;
    public risk_value = 1;
    public package_name: string;
    public risk_name: string;
    public owner?: IDialogUser;
    public id?: string;
    public colorScheme = {
        domain: ['#5c3ac5', '#d3dfef', '#637fea', '#444054'],
    };

    onActivate(e) {
        if (typeof e === 'object') {
            this.activeIndex = this.portfolio.findIndex(
                item => item.name === e.value.name,
            );
        } else {
            this.activeIndex = e;
        }
    }

    onDeactivate() {
        this.activeIndex = -1;
    }
}
