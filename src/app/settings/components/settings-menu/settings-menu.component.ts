import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {IMenuItem} from '../../../core/interfaces/menu.interface';

@Component({
    selector: 'app-settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['./settings-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsMenuComponent {
    @Input() public links: Array<IMenuItem>;
    @Input() public activeUrl: string;
}
