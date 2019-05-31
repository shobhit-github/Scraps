import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MyErrorStateMatcher} from 'src/app/auth/helpers/my-error.state-matcher';
import {numberMask, removeZero} from 'src/app/core/helpers/number.mask';

@Component({
    selector: 'app-amount',
    templateUrl: './amount.component.html',
    styleUrls: ['./amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent {
    @Input()
    public size: 'small' | 'normal' = 'normal';
    public numberMask = numberMask;

    @Input()
    public set amount(val: number) {
        this.form.get('amount').setValue(val);
    }

    @Output()
    public settedAmount = new EventEmitter<number>();

    public form = this.fb.group({
        amount: [0],
    });

    static convertAmount(amount: string): number {
        return Number(amount.replace('$', '').replace(/\,/g, ''));
    }

    constructor(private fb: FormBuilder, public matcher: MyErrorStateMatcher) {
    }

    public removeZeroAmount() {
        return removeZero('amount', this.form);
    }

    setAmount() {
        this.settedAmount.emit(
            AmountComponent.convertAmount(this.form.get('amount').value),
        );
    }
}
