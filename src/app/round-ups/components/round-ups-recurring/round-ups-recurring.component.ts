import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {numberMask, removeZero} from 'src/app/core/helpers/number.mask';

import {MyErrorStateMatcher} from '../../../auth/helpers/my-error.state-matcher';
import {IRoundUpRecurring} from '../../interfaces/round-up-recurring.interface';
import {AmountComponent} from 'src/app/portfolio/components/amount/amount.component';

@Component({
    selector: 'app-round-ups-recurring',
    templateUrl: './round-ups-recurring.component.html',
    styleUrls: ['./round-ups-recurring.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundUpsRecurringComponent implements OnInit {
    @Input()
    public recurring: IRoundUpRecurring;
    @Output()
    public OnSubmit = new EventEmitter<IRoundUpRecurring>();
    public periodList = ['day', 'week', 'year'];
    public form: FormGroup;
    public numberMask = numberMask;

    constructor(private fb: FormBuilder, public matcher: MyErrorStateMatcher) {
        this.form = this.fb.group({
            sum: ['0'],
            period: this.periodList[1],
        });
    }

    public removeZeroSum() {
        return removeZero('sum', this.form);
    }

    public onSubmit(form: FormGroup) {
        const amount = AmountComponent.convertAmount(form.value.sum);
        this.OnSubmit.emit({period: form.value.period, sum: amount});
    }

    ngOnInit() {
    }
}
