import {
    Component,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-up-or-down',
    templateUrl: './up-or-down.component.html',
    styleUrls: ['./up-or-down.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpOrDownComponent {
    @Input() public value: number;
}
