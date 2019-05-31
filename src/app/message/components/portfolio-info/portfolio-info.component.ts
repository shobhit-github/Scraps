import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {IDialogUser} from '../../interfaces/dialog-list.intefaces';

@Component({
    selector: 'app-portfolio-info',
    templateUrl: './portfolio-info.component.html',
    styleUrls: ['./portfolio-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioInfoComponent implements OnInit {
    @Input()
    user: IDialogUser;
    @Input()
    big = false;
    @Input()
    bigger = false;
    @Input()
    biggest = false;

    constructor() {
    }

    ngOnInit() {
    }
}
