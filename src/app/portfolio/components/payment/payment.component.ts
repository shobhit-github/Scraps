import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import {ICard} from 'src/app/settings/interfaces/security.interfaces';
import {IStripeCard} from 'src/app/invest/interfaces/stripe-card.interface';
import {IPortfolioBalance} from 'src/app/dashboard/interfaces/dashboard-service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnChanges, OnInit {
    @Input()
    public isSettings: boolean;
    @Input()
    public balance: IPortfolioBalance;
    @Input()
    public size: 'small' | 'normal' = 'normal';
    @Input()
    public payment: ICard | IStripeCard;
    @Input()
    public paymentList: Array<ICard | IStripeCard>;
    @Input()
    public sub: boolean;
    @Output()
    public selectedPayment = new EventEmitter<ICard | IStripeCard>();
    public isStripe = false;
    public isInited = false;

    constructor() {
    }

    ngOnInit() {
        this.isInited = true;
    }

    ngOnChanges() {
        this.isStripe =
            this.payment && (!!(<IStripeCard>this.payment).id || !!this.balance);
    }
}
