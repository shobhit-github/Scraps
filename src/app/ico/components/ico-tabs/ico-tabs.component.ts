import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {ITabsLinks} from '../../interfaces/ico.interface';

@Component({
    selector: 'app-ico-tabs',
    templateUrl: './ico-tabs.component.html',
    styleUrls: ['./ico-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcoTabsComponent {
    @Input() links: Array<ITabsLinks> = [
        {
            link: 'top',
            hint: 'Top Picks',
        },
        {
            link: 'active',
            hint: 'Active ICOs',
        },
        {
            link: 'air',
            hint: 'Airdrops',
        }
    ];
    @Input() activeCat = 'top';
    @Input() cat = '/ico';
    @Output() activeLink = new EventEmitter<string>();
}
