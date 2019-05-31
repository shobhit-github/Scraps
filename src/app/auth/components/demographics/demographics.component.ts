import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    Input,
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {PersonalSettingsComponent} from '../../../settings/components/personal-settings/personal-settings.component';
import {MyErrorStateMatcher} from '../../helpers/my-error.state-matcher';

@Component({
    selector: 'app-demographics',
    templateUrl: './demographics.component.html',
    styleUrls: ['./demographics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicsComponent extends PersonalSettingsComponent {
    @Output()
    public OnSkip = new EventEmitter<undefined>();
    @Input()
    public isPending: boolean;
}
