import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnChanges,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    IAccountPreference,
    IAccountAddress,
} from '../../interfaces/account.insterfaces';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import * as momentTimezone from 'moment-timezone';
import * as countryData from 'country-currency-map';

@Component({
    selector: 'app-preference-settings',
    templateUrl: './preference-settings.component.html',
    styleUrls: ['./preference-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferenceSettingsComponent implements OnInit, OnChanges {
    @Input() public data: IAccountPreference;
    @Input() public subData: IAccountAddress;

    @Input()
    public set failed(fail: boolean) {
        if (fail) {
            this.form.setErrors({some: true});
        } else {
            this.form.setErrors(null);
        }
    }

    @Output() public OnSubmit = new EventEmitter<IAccountPreference>();
    public form: FormGroup = this.fb.group({
        id: 0,
        user_id: 0,
        timezone: '',
        currency: '',
    });
    public timezoneList = momentTimezone.tz.names();
    private currentCountry;
    public currencyList;

    constructor(private fb: FormBuilder, public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        this.saveToForm(this.data);
    }

    ngOnChanges() {
        this.saveToForm(this.data);
    }

    onSubmit(form: FormGroup) {
        this.OnSubmit.emit(form.value);
    }

    private saveToForm(data: IAccountPreference): void {
        if (data) {
            this.currentCountry = countryData.getCountry(this.subData.country);
            this.currencyList = countryData
                .getCurrencyList()
                .sort(
                    a =>
                        this.currentCountry
                            ? a.abbr === this.currentCountry.currency
                            ? -1
                            : 1
                            : 0,
                )
                .map(currencyObj => currencyObj.abbr);
            this.form.setValue(data);
        }
    }
}
