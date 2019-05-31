import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import {IAccountPersonal} from '../../interfaces/account.insterfaces';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import * as moment from 'moment';
import {ISimpleOpt} from '../../../auth/interfaces/demographics.interfaces';

@Component({
    selector: 'app-personal-settings',
    templateUrl: './personal-settings.component.html',
    styleUrls: ['./personal-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalSettingsComponent implements OnInit, OnChanges {
    @Input()
    public personal: IAccountPersonal;
    @Input()
    public isTFA: boolean;

    @Input()
    public set failed(fail: boolean) {
        if (fail) {
            this.form.get('email').setErrors({exist: true});
        } else {
            this.form.get('email').setErrors(null);
        }
    }

    @Output()
    public OnSubmit = new EventEmitter<IAccountPersonal>();
    @Output()
    public OnUpdatePassword = new EventEmitter<boolean>();
    public form: FormGroup = this.fb.group({
        name: this.fb.control({value: '', disabled: true}),
        email: '',
        month: '',
        year: '',
        day: '',
        employment_id: '',
        income_id: '',
    });
    @Input()
    public employmentOptList: Array<ISimpleOpt>;
    @Input()
    public incomeOptList: Array<ISimpleOpt>;
    public monthList = moment.months();
    public yearList = this.range(moment().year() - 100, 83).sort(
        (a, b) => (+a < +b ? 1 : +a > +b ? -1 : 0),
    );
    public dayList = this.range(1, 31).map(i => (i.length < 2 ? `0${i}` : i));

    constructor(protected fb: FormBuilder, public matcher: MyErrorStateMatcher) {
    }

    ngOnInit() {
        this.saveToForm(this.personal);
    }

    ngOnChanges() {
        this.saveToForm(this.personal);
    }

    onUpdatePassword(isTFA) {
        this.OnUpdatePassword.emit(isTFA);
    }

    onSubmit(form: FormGroup) {
        const value = form.value;
        const personal: IAccountPersonal = {};
        if (value.name) {
            personal.name = value.name;
        }
        if (value.email) {
            personal.email = value.email;
        }
        if (value.year) {
            personal.birthday = `${value.year}-${value.month}-${value.day}`;
        }
        if (value.employment_id) {
            personal.employment_id = value.employment_id;
        }
        if (value.income_id) {
            personal.income_id = value.income_id;
        }
        this.OnSubmit.emit(personal);
    }

    protected range(start, count): Array<string> {
        return Array.apply(0, Array(count)).map(function (element, index) {
            return String(index + start);
        });
    }

    protected saveToForm(personal: IAccountPersonal): void {
        if (personal) {
            if (personal.birthday) {
                const date = personal.birthday.split('-');
                const [year, month, day] = date;
                this.form.get('year').setValue(year);
                this.form.get('month').setValue(month);
                this.form.get('day').setValue(day);
            }
            this.form.get('name').setValue(personal.name);
            this.form.get('email').setValue(personal.email);
            this.form.get('employment_id').setValue(personal.employment_id);
            this.form.get('income_id').setValue(personal.income_id);
        }
    }

    public setBirthday(event, entity: 'year' | 'month' | 'day'): void {
        if (entity !== 'year') {
            if (!this.form.get('year').value) {
                this.form.get('year').setValue('1980');
            }
        }
        if (entity !== 'month') {
            if (!this.form.get('month').value) {
                this.form
                    .get('month')
                    .setValue(
                        moment(
                            this.monthList[Math.round(this.monthList.length / 2)],
                            'MMMM',
                        ).format('MM'),
                    );
            }
        }
        if (entity !== 'day') {
            if (!this.form.get('day').value) {
                this.form.get('day').setValue(this.dayList[0]);
            }
        }
    }
}
