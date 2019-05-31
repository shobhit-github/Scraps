import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IPortfolio} from '../../interfaces/portfolio';

@Component({
    selector: 'app-choose',
    templateUrl: './choose.component.html',
    styleUrls: ['./choose.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseComponent implements OnInit {
    @Input()
    public size: 'small' | 'normal' = 'small';
    @Input()
    public portfolio: IPortfolio;
    @Input()
    public portfolioList: Array<IPortfolio>;
    @Input()
    public sub: boolean;
    @Output()
    public selectedPortfolio = new EventEmitter<IPortfolio>();

    constructor() {
    }

    ngOnInit() {
    }
}
