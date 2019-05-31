import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

import {IMenuItem} from '../../interfaces/menu.interface';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
    @Input()
    public links: Array<IMenuItem>;
    @Input()
    public activeUrl: string;

    constructor() {
    }

    public isOut(url: string): boolean {
        return url.slice(0, 4) === 'http';
    }
}
