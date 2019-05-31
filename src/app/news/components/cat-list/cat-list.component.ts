import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {ICatItem} from '../../interfaces/cat.interface';

@Component({
    selector: 'app-cat-list',
    templateUrl: './cat-list.component.html',
    styleUrls: ['./cat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatListComponent implements OnInit {
    @Input() public list: Array<ICatItem>;
    @Input() public title: string;

    constructor() {
    }

    ngOnInit() {
    }
}
