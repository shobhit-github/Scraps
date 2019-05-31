import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-connect-card',
    templateUrl: './connect-card.component.html',
    styleUrls: ['./connect-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectCardComponent {
}
