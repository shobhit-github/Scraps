import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {Moment} from 'moment';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
    @Input()
    public dateTime: number;
    @Output()
    public changedDate = new EventEmitter<Moment>();
}
