import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {IDialogListItem} from '../../interfaces/dialog-list.intefaces';

@Component({
    selector: 'app-dialog-list-item',
    templateUrl: './dialog-list-item.component.html',
    styleUrls: ['./dialog-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogListItemComponent implements OnInit {
    @Input()
    public isActive = false;
    @Input()
    public item: IDialogListItem;
    @Input()
    public search: string;
    @Output()
    public OnSelect = new EventEmitter<IDialogListItem>();

    constructor() {
    }

    ngOnInit() {
    }
}
