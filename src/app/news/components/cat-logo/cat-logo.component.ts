import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {ICatItem} from '../../interfaces/cat.interface';

@Component({
    selector: 'app-cat-logo',
    templateUrl: './cat-logo.component.html',
    styleUrls: ['./cat-logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatLogoComponent {
    @Input() public activeCat: ICatItem;
}
