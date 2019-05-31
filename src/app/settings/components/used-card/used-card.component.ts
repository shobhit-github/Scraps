import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import {ICard} from '../../interfaces/security.interfaces';

@Component({
    selector: 'app-used-card',
    templateUrl: './used-card.component.html',
    styleUrls: ['./used-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsedCardComponent {
    @Input()
    public card: ICard;
    @Input()
    public cardList: Array<ICard>;
    @Input()
    public sub: boolean;

    @Output()
    public selectedCard = new EventEmitter<ICard>();
}
