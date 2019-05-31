import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {IMenuItem} from '../../interfaces/menu.interface';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent implements OnInit {
    @Input() public links: Array<IMenuItem>;
    @Input() public color: '#ffffff';

    constructor() {
    }

    ngOnInit() {
    }

}
